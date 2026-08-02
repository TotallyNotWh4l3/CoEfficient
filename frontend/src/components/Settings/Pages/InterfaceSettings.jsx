import "./interface-settings.css";

import { useSettings } from "../../../hooks/useSettings";
import { useLanguage } from "../../../hooks/useLanguage";
import { useLocation } from "../../../hooks/useLocation";
import { useDialog } from "../../../hooks/useDialog";

import Settings from "../Components/SettingsComponents";
import LocationList from "../Components/LocationList";

import { LANGUAGE_OPTIONS } from "../../../constants/interface";

import { Computer } from "lucide-react";

export default function InterfaceSettings() {
    const { loading, settings, updatePreference, applyTheme, applyLocation } = useSettings();

    if (loading || !settings) {
        return null;
    }

    const { locationOptions } = useLocation();
    const { openDialog } = useDialog();

    const T = useLanguage();

    const themeOptions = (settings.themes ?? []).map((theme) => ({
        id: theme.id,
        label: theme.name,
    }));

    return (
        <div className="interface-settings">
            <Settings.Title Icon={Computer}>{T.settings.interface.title}</Settings.Title>

            <Settings.Description>{T.settings.interface.description}</Settings.Description>

            <Settings.Divider mod="thick" />

            {/* =======================
                LANGUAGE
            ======================== */}

            <Settings.Section>
                <Settings.SectionTitle>{T.settings.interface.language.title}</Settings.SectionTitle>

                <Settings.Description>
                    {T.settings.interface.language.description}
                </Settings.Description>

                <Settings.Select
                    value={settings.preferences.language}
                    options={LANGUAGE_OPTIONS}
                    onChange={(event) => updatePreference("language", event.target.value)}
                />
            </Settings.Section>

            <Settings.Divider />

            {/* =======================
                APPEARANCE
            ======================== */}

            <Settings.Section>
                <Settings.SectionTitle>
                    {T.settings.interface.appearance.title}
                </Settings.SectionTitle>

                <Settings.Description>
                    {T.settings.interface.appearance.description}
                </Settings.Description>

                <Settings.Select
                    value={settings.preferences.appearance.currentTheme}
                    options={themeOptions}
                    onChange={(event) => applyTheme(event.target.value)}
                />
            </Settings.Section>

            <Settings.Divider />

            {/* =======================
                LOCATION
            ======================== */}

            <Settings.Section>
                <Settings.SectionTitle>{T.settings.interface.location.title}</Settings.SectionTitle>

                <Settings.Description>
                    {T.settings.interface.location.description}
                </Settings.Description>

                <Settings.Select
                    value={settings.preferences.locationId}
                    options={locationOptions}
                    onChange={(event) => applyLocation(event.target.value)}
                />

                {/* <LocationList
                    locations={settings.locations}
                    defaultLocationId={settings.preferences.locationId}
                    onEdit={(location) =>
                        openDialog({
                            type: "location",
                            props: {
                                mode: "edit",
                                location,
                            },
                        })
                    }
                    onDelete={(location) =>
                        openDialog({
                            type: "confirm-delete-location",
                            props: {
                                location,
                            },
                        })
                    }
                /> */}

                <Settings.Button
                    variant="secondary"
                    onClick={() =>
                        openDialog({
                            type: "location",
                            props: {
                                mode: "create",
                            },
                        })
                    }
                >
                    {T.settings.interface.location.add}
                </Settings.Button>
            </Settings.Section>
        </div>
    );
}
