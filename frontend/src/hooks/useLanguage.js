import { useSettings } from "./useSettings";
import { LANGUAGES } from "../constants/i18n";

export function useLanguage() {
    const { settings } = useSettings();

    const language = settings?.preferences?.language ?? "en";

    return LANGUAGES[language];
}
