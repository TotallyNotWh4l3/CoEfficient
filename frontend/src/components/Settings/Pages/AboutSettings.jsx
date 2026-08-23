import "./about-settings.css";

import { Info, RotateCcw } from "lucide-react";

import { useSettings } from "../../../hooks/useSettings";
import { useDialog } from "../../../hooks/useDialog";
import { useLanguage } from "../../../hooks/useLanguage";

import Settings from "../Components/SettingsComponents";

const APP_VERSION = "0.1.0"; // placeholder — swap for a real version source later

export default function AboutSettings() {
    const { resetToDefaults } = useSettings();
    const { openDialog } = useDialog();

    const T = useLanguage();
    const copy = T?.settings?.about ?? {};

    const handleReset = () => {
        openDialog({
            type: "confirm",
            props: {
                title: copy.resetTitle ?? "Reset settings?",
                description:
                    copy.resetMessage ??
                    "This will reset your preferences, theme, and module defaults. This can't be undone.",
                confirmText: copy.resetConfirm ?? "Reset",
                danger: true,
                onConfirm: () => resetToDefaults(),
            },
        });
    };

    return (
        <div className="about-settings">
            <Settings.Title Icon={Info}>{copy.title ?? "About"}</Settings.Title>

            <Settings.Description>
                {copy.description ?? "App information and credits"}
            </Settings.Description>

            <Settings.Divider mod="thick" />

            <Settings.Section>
                <Settings.SectionTitle>{copy.versionTitle ?? "Version"}</Settings.SectionTitle>

                <Settings.Row>
                    <Settings.RowContent>
                        <Settings.RowLabel>Co:Efficient</Settings.RowLabel>
                        <Settings.RowDescription>{APP_VERSION}</Settings.RowDescription>
                    </Settings.RowContent>
                </Settings.Row>
            </Settings.Section>

            <Settings.Divider />

            <Settings.Section>
                <Settings.SectionTitle>{copy.resetSectionTitle ?? "Reset"}</Settings.SectionTitle>

                <Settings.Description>
                    {copy.resetSectionDescription ??
                        "Restore all settings to their default values."}
                </Settings.Description>

                <Settings.Button variant="secondary" onClick={handleReset}>
                    <RotateCcw size={16} />
                    {copy.resetButton ?? "Reset to Defaults"}
                </Settings.Button>
            </Settings.Section>
        </div>
    );
}
