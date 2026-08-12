import "./location-dialog.css";

import { useMemo, useState } from "react";

import { MapPin, Search } from "lucide-react";

import { useLocation } from "../../../hooks/useLocation";

import Settings from "../Components/SettingsComponents";

export default function LocationDialog({
    initialLocation = null,
    onClose,
    onSave,
}) {
    const { requestCurrentLocation } = useLocation();

    // =====================================================
    // State
    // =====================================================

    const [mode, setMode] = useState("coordinates");

    const [name, setName] = useState(initialLocation?.name ?? "");
    const [latitude, setLatitude] = useState(initialLocation?.latitude ?? "");
    const [longitude, setLongitude] = useState(initialLocation?.longitude ?? "");

    const [searchQuery, setSearchQuery] = useState(initialLocation?.name ?? "");

    const [loadingGps, setLoadingGps] = useState(false);

    // =====================================================
    // Validation
    // =====================================================

    const trimmedName = name.trim();

    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);

    const errors = useMemo(
        () => ({
            name: trimmedName.length === 0 ? "Location name is required." : null,

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
        [trimmedName, latitude, longitude],
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
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingGps(false);
        }
    }

    // =====================================================
    // Search (TODO)
    // =====================================================

    async function handleSearch() {
        // TODO:
        // Call Geocoding API
        //
        // setName(...)
        // setLatitude(...)
        // setLongitude(...)
    }

    // =====================================================
    // Save
    // =====================================================

    function handleSave() {
        if (!isValid) return;

        onSave({
            id: initialLocation?.id ?? crypto.randomUUID(),

            name: trimmedName,

            latitude: latitudeNumber,
            longitude: longitudeNumber,

            builtIn: initialLocation?.builtIn ?? false,
        });
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
                SEARCH MODE
            ====================================================== */}

            {mode === "search" && (

                <Settings.Section className="location-dialog__search">

                    <Settings.Row>

                        <Settings.RowContent>

                            <Settings.RowLabel>
                                Location Name
                            </Settings.RowLabel>

                            <Settings.RowDescription>
                                Search for a city or place.
                            </Settings.RowDescription>

                        </Settings.RowContent>

                    </Settings.Row>

                    <Settings.TextInput
                        className="location-dialog__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tokyo"
                    />

                    <Settings.Button
                        className="location-dialog__search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </Settings.Button>

                </Settings.Section>

            )}

            {/* =====================================================
                COORDINATE MODE
            ====================================================== */}

            {mode === "coordinates" && (

                <>
                    <Settings.Section className="location-dialog__section">

                        <Settings.Row>
                            <Settings.RowContent>
                                <Settings.RowLabel>Name</Settings.RowLabel>
                            </Settings.RowContent>
                        </Settings.Row>

                        <Settings.TextInput
                            className="location-dialog__input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && (
                            <Settings.Description className="location-dialog__error">
                                {errors.name}
                            </Settings.Description>
                        )}

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

                        {loadingGps
                            ? "Locating..."
                            : "Use Current Location"}
                    </Settings.Button>
                </>
            )}

            <Settings.Divider />

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
                    disabled={!isValid}
                >
                    Save
                </Settings.Button>

            </div>

        </div>
    );
}