import "./theme-dialog.css";

import { useMemo, useState } from "react";

import { useLanguage } from "../../../hooks/useLanguage";

import Settings from "../Components/SettingsComponents";

const COLOR_GROUPS = [
    {
        key: "accent",
        fields: ["accent", "accentHover", "accentActive", "accentMuted", "accentBorder"],
    },
    {
        key: "surface",
        fields: ["bg", "bgElevated", "surface", "surfaceElevated", "surfaceFloating"],
    },
    {
        key: "element",
        fields: ["element", "elementHover", "elementActive", "elementSelected", "elementDisabled"],
    },
    {
        key: "border",
        fields: ["border", "borderHover", "borderActive", "borderFocus"],
    },
    {
        key: "text",
        fields: ["text", "textSecondary", "textMuted", "textDisabled", "textAccent"],
    },
    {
        key: "input",
        fields: ["inputBg", "inputHover", "inputFocus", "inputDisabled"],
    },
    {
        key: "status",
        fields: ["success", "successHover", "warning", "warningHover", "error", "errorHover"],
    },
];

const SHADOW_FIELDS = ["sm", "md", "lg"];

function ColorField({ label, value, onChange }) {
    return (
        <div className="theme-dialog__color-field">
            <span className="theme-dialog__swatch" style={{ background: value || "transparent" }} />
            <div className="theme-dialog__color-inputs">
                <span className="theme-dialog__color-label">{label}</span>
                <input
                    type="text"
                    className="theme-dialog__color-text"
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                />
            </div>
        </div>
    );
}

export default function ThemeDialog({
    initialTheme = null,
    baseTheme = null,
    onClose,
    onSave,
    onDelete,
}) {
    const t = useLanguage().settings.interface.appearance;

    const seed = initialTheme ?? baseTheme;

    const [name, setName] = useState(initialTheme?.name ?? `${baseTheme?.name ?? "Custom"} Copy`);
    const [colors, setColors] = useState({ ...(seed?.appearance?.colors ?? {}) });
    const [shadows, setShadows] = useState({ ...(seed?.appearance?.shadows ?? {}) });
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const isEditing = Boolean(initialTheme);
    const isBuiltIn = Boolean(initialTheme?.builtIn);

    const trimmedName = name.trim();
    const isValid = trimmedName.length > 0;

    const updateColor = (key, value) => {
        setColors((prev) => ({ ...prev, [key]: value }));
    };

    const updateShadow = (key, value) => {
        setShadows((prev) => ({ ...prev, [key]: value }));
    };

    async function handleSave() {
        if (!isValid || saving || isBuiltIn) return;

        setSaving(true);
        setSaveError(null);
        try {
            const themePayload = {
                id: initialTheme?.id ?? crypto.randomUUID(),
                name: trimmedName,
                builtIn: false,
                basedOn: initialTheme?.basedOn ?? baseTheme?.id ?? null,
                appearance: { colors, shadows },
            };

            if (isEditing) {
                await onSave(initialTheme.id, themePayload);
            } else {
                await onSave(themePayload);
            }
        } catch (error) {
            console.error("[ThemeDialog] Save failed:", error);
            setSaveError(error?.message || t.dialog.saveFailed);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!isEditing || isBuiltIn) return;
        setSaving(true);
        setSaveError(null);
        try {
            await onDelete(initialTheme.id);
        } catch (error) {
            console.error("[ThemeDialog] Delete failed:", error);
            setSaveError(error?.message || t.dialog.deleteFailed);
            setSaving(false);
        }
    }

    return (
        <div className="theme-dialog">
            <Settings.Title className="theme-dialog__title">
                {isEditing ? t.dialog.titleEdit : t.dialog.titleCreate}
            </Settings.Title>

            <Settings.Divider />

            {isBuiltIn && (
                <Settings.Description className="theme-dialog__builtin-note">
                    {t.dialog.builtInNote}
                </Settings.Description>
            )}

            <Settings.Section className="theme-dialog__section">
                <Settings.Row>
                    <Settings.RowContent>
                        <Settings.RowLabel>{t.dialog.nameLabel}</Settings.RowLabel>
                    </Settings.RowContent>
                </Settings.Row>
                <Settings.TextInput
                    className="theme-dialog__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isBuiltIn}
                />
            </Settings.Section>

            <Settings.Divider />

            {COLOR_GROUPS.map((group) => (
                <Settings.Section key={group.key} className="theme-dialog__section">
                    <Settings.SectionTitle>
                        {t.dialog.groups[group.key] ?? group.key}
                    </Settings.SectionTitle>

                    <div className="theme-dialog__color-grid">
                        {group.fields.map((field) => (
                            <ColorField
                                key={field}
                                label={field}
                                value={colors[field]}
                                onChange={(value) => updateColor(field, value)}
                            />
                        ))}
                    </div>
                </Settings.Section>
            ))}

            <Settings.Section className="theme-dialog__section">
                <Settings.SectionTitle>{t.dialog.groups.shadows}</Settings.SectionTitle>
                <div className="theme-dialog__color-grid">
                    {SHADOW_FIELDS.map((field) => (
                        <div className="theme-dialog__shadow-field" key={field}>
                            <span className="theme-dialog__color-label">{field}</span>
                            <input
                                type="text"
                                className="theme-dialog__color-text"
                                value={shadows[field] ?? ""}
                                onChange={(e) => updateShadow(field, e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                    ))}
                </div>
            </Settings.Section>

            <Settings.Divider />

            {saveError && (
                <Settings.Description className="theme-dialog__error">
                    {saveError}
                </Settings.Description>
            )}

            <div className="theme-dialog__footer">
                {isEditing && !isBuiltIn && (
                    <Settings.Button
                        variant="secondary"
                        className="theme-dialog__delete"
                        onClick={handleDelete}
                        disabled={saving}
                    >
                        {t.dialog.delete}
                    </Settings.Button>
                )}

                <div className="theme-dialog__footer-right">
                    <Settings.Button variant="secondary" onClick={onClose}>
                        {t.dialog.cancel}
                    </Settings.Button>

                    {!isBuiltIn && (
                        <Settings.Button onClick={handleSave} disabled={!isValid || saving}>
                            {saving ? t.dialog.saving : t.dialog.save}
                        </Settings.Button>
                    )}
                </div>
            </div>
        </div>
    );
}
