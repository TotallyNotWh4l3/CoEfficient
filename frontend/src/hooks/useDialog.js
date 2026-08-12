import { useCallback, useState } from "react";
import { useContext } from "react";

import { DialogContext } from "../context/DialogContext";

export function useDialogState() {
    const [dialogs, setDialogs] = useState([]);

    const openDialog = useCallback((dialog) => {
        setDialogs((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                ...dialog,
            },
        ]);
    }, []);

    const closeDialog = useCallback((id) => {
        setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
    }, []);

    const closeTopDialog = useCallback(() => {
        setDialogs((prev) => prev.slice(0, -1));
    }, []);

    const closeAllDialogs = useCallback(() => {
        setDialogs([]);
    }, []);

    return {
        dialogs,

        openDialog,
        closeDialog,
        closeTopDialog,
        closeAllDialogs,
    };
}

export function useDialog() {
    return useContext(DialogContext);
}
