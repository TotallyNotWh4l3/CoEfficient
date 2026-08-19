import "./location-dialog.css";

import { useMemo, useState } from "react";

import { MapPin, Search } from "lucide-react";

import { useLocation } from "../../../hooks/useLocation";
import geocodingService from "../../../services/geocodingService";

import Settings from "../Components/SettingsComponents";

export default function LocationDialog({ initialLocation = null, onClose, onSave }) {
    const { requestCurrentLocation } = useLocation();

    // =====================================================
    // State
    // =====================================================

    const [mode, setMode] = useState("coordinates");

    const [name, setName] = useState(initialLocation?.name ?? "");
    const [latitude, setLatitude] = useState(initialLocation?.latitude ?? "");
    const [longitude, setLongitude] = useState(initialLocation?.longitude ?? "");

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const [loadingGps, setLoadingGps] = useState(false);
    const [saving, setSaving] = useState(false);

    const [saveError, setSaveError] = useState(null);

    // =====================================================
    // Validation
    // =====================================================
    // Name is no longer required up front — it's auto-filled from
    // coordinates on save if left blank. Only coordinates are required.

    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);

    const errors = useMemo(
        () => ({
            latitude:
                latitude === ""
                    ? "Latitude is required."
                    : Number.isNaN(latitudeNumber)
                      ? "Latitude must be a number."
                      : latitudeNumber < -90 || latitudeNumber > 90
                        ? "Latitude must be between -90 and 90."
                        : null,

            longitude:
                longitude === ""
                    ? "Longitude is required."
                    : Number.isNaN(longitudeNumber)
                      ? "Longitude must be a number."
                      : longitudeNumber < -180 || longitudeNumber > 180
                        ? "Longitude must be between -180 and 180."
                        : null,
        }),
        [latitude, longitude],
    );

    const isValid = Object.values(errors).every((error) => error === null);

    // =====================================================
    // GPS
    // =====================================================

    async function handleUseCurrentLocation() {
        try {
            setLoadingGps(true);

            const coords = await requestCurrentLocation();

            setLatitude(coords.latitude.toFixed(6));
            setLongitude(coords.longitude.toFixed(6));
            setMode("coordinates");

            // Prefill the name from the coordinates if the user hasn't typed one.
            if (!name.trim()) {
                try {
                    const { name: reverseName } = await geocodingService.reverse(
                        coords.latitude,
                        coords.longitude,
                    );
                    setName(reverseName);
                } catch (e) {
                    console.error("[LocationDialog] Reverse geocode after GPS failed:", e);
                    // Non-fatal — name stays blank, gets resolved again on save.
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingGps(false);
        }
    }

    // =====================================================
    // Search (Option 1: name -> coordinates)
    // =====================================================

    async function handleSearch() {
        const query = searchQuery.trim();
        if (!query) return;

        setSearching(true);
        setSearchError(null);
        setSearchResults([]);

        try {
            const results = await geocodingService.search(query);
            if (results.length === 0) {
                setSearchError("No matching locations found.");
            }
            setSearchResults(results);
        } catch (e) {
            console.error(e);
            setSearchError("Search failed. Please try again.");
        } finally {
            setSearching(false);
        }
    }

    function handleSelectSearchResult(result) {
        setName(result.name);
        setLatitude(String(result.latitude));
        setLongitude(String(result.longitude));
        setSearchResults([]);
        setMode("coordinates");
    }

    // =====================================================
    // Save
    // =====================================================

    async function handleSave() {
        if (!isValid || saving) return;

        let finalName = name.trim();

        setSaving(true);
        setSaveError(null);
        try {
            if (!finalName) {
                try {
                    const { name: reverseName } = await geocodingService.reverse(
                        latitudeNumber,
                        longitudeNumber,
                    );
                    finalName = reverseName;
                } catch (e) {
                    console.error("[LocationDialog] Reverse geocode on save failed:", e);
                    finalName = `${latitudeNumber.toFixed(4)}, ${longitudeNumber.toFixed(4)}`;
                }
            }

            await onSave({
                id: initialLocation?.id ?? crypto.randomUUID(),
                name: finalName,
                latitude: latitudeNumber,
                longitude: longitudeNumber,
                builtIn: initialLocation?.builtIn ?? false,
            });
            // On success, onSave (DialogManager) closes the dialog itself.
        } catch (error) {
            console.error("[LocationDialog] Save failed:", error);
            setSaveError(error?.message || t.footer.saveFailed);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="location-dialog">
            <Settings.Title className="location-dialog__title">
                {initialLocation ? "Edit Location" : "Add Location"}
            </Settings.Title>

            <Settings.Divider />

            {/* =====================================================
                MODE
            ====================================================== */}

            <Settings.Section className="location-dialog__section">
                <Settings.Row className="location-dialog__mode">
                    <Settings.Button
                        variant={mode === "search" ? "primary" : "secondary"}
                        className="location-dialog__mode-button"
                        onClick={() => setMode("search")}
                    >
                        <Search size={16} />
                        Search Location
                    </Settings.Button>

                    <Settings.Button
                        variant={mode === "coordinates" ? "primary" : "secondary"}
                        className="location-dialog__mode-button"
                        onClick={() => setMode("coordinates")}
                    >
                        <MapPin size={16} />
                        Coordinates
                    </Settings.Button>
                </Settings.Row>
            </Settings.Section>

            <Settings.Divider />

            {/* =====================================================
                SEARCH MODE (Option 1)
            ====================================================== */}

            {mode === "search" && (
                <Settings.Section className="location-dialog__search">
                    <Settings.Row>
                        <Settings.RowContent>
                            <Settings.RowLabel>Search</Settings.RowLabel>

                            <Settings.RowDescription>
                                Search for a city or place — selecting a result fills in its
                                coordinates.
                            </Settings.RowDescription>
                        </Settings.RowContent>
                    </Settings.Row>

                    <Settings.TextInput
                        className="location-dialog__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Tokyo"
                    />

                    <Settings.Button
                        className="location-dialog__search-button"
                        onClick={handleSearch}
                        disabled={searching || !searchQuery.trim()}
                    >
                        {searching ? "Searching..." : "Search"}
                    </Settings.Button>

                    {searchError && (
                        <Settings.Description className="location-dialog__error">
                            {searchError}
                        </Settings.Description>
                    )}

                    {searchResults.length > 0 && (
                        <ul className="location-dialog__results">
                            {searchResults.map((result) => (
                                <li key={`${result.latitude},${result.longitude}`}>
                                    <button
                                        type="button"
                                        className="location-dialog__result"
                                        onClick={() => handleSelectSearchResult(result)}
                                    >
                                        <span className="location-dialog__result-name">
                                            {result.name}
                                        </span>
                                        <span className="location-dialog__result-coords">
                                            {result.latitude.toFixed(4)},{" "}
                                            {result.longitude.toFixed(4)}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Settings.Section>
            )}

            {/* =====================================================
                COORDINATE MODE (Option 2 + Option 3)
            ====================================================== */}

            {mode === "coordinates" && (
                <>
                    <Settings.Section className="location-dialog__section">
                        <Settings.Row>
                            <Settings.RowContent>
                                <Settings.RowLabel>Name</Settings.RowLabel>
                                <Settings.RowDescription>
                                    Optional — auto-filled from coordinates if left blank.
                                </Settings.RowDescription>
                            </Settings.RowContent>
                        </Settings.Row>

                        <Settings.TextInput
                            className="location-dialog__input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Auto-filled from coordinates"
                        />
                    </Settings.Section>

                    <Settings.Section className="location-dialog__section">
                        <Settings.Row>
                            <Settings.RowContent>
                                <Settings.RowLabel>Latitude</Settings.RowLabel>
                            </Settings.RowContent>
                        </Settings.Row>

                        <Settings.TextInput
                            className="location-dialog__input"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />

                        {errors.latitude && (
                            <Settings.Description className="location-dialog__error">
                                {errors.latitude}
                            </Settings.Description>
                        )}
                    </Settings.Section>

                    <Settings.Section className="location-dialog__section">
                        <Settings.Row>
                            <Settings.RowContent>
                                <Settings.RowLabel>Longitude</Settings.RowLabel>
                            </Settings.RowContent>
                        </Settings.Row>

                        <Settings.TextInput
                            className="location-dialog__input"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />

                        {errors.longitude && (
                            <Settings.Description className="location-dialog__error">
                                {errors.longitude}
                            </Settings.Description>
                        )}
                    </Settings.Section>

                    <Settings.Button
                        className="location-dialog__gps-button"
                        variant="secondary"
                        onClick={handleUseCurrentLocation}
                        disabled={loadingGps}
                    >
                        <MapPin size={16} />

                        {loadingGps ? "Locating..." : "Use Current Location"}
                    </Settings.Button>
                </>
            )}

            <Settings.Divider />

            {saveError && (
                <Settings.Description className="location-dialog__error location-dialog__save-error">
                    {saveError}
                </Settings.Description>
            )}

            <div className="location-dialog__footer">
                <Settings.Button
                    className="location-dialog__cancel"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Settings.Button>

                <Settings.Button
                    className="location-dialog__save"
                    onClick={handleSave}
                    disabled={!isValid || saving}
                >
                    {saving ? "Saving..." : "Save"}
                </Settings.Button>
            </div>
        </div>
    );
}
