// components/UI/Dialog/DialogManager.jsx

import Dialog from "./Dialog";

import { useDialog } from "../../../../../hooks/useDialog";
import { useLocation } from "../../../../../hooks/useLocation";

// Dialogs
import LocationDialog from "../../../Dialogs/LocationDialog";
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";

export default function DialogManager() {
    const { dialogs, closeDialog } = useDialog();

    // Locations are now a shared, server-backed list (see useLocation.js) —
    // not a per-user settings.locations blob — so create/update go through
    // the API instead of useSettings' old saveLocation/updateLocation.
    // Delete is triggered from InterfaceSettings via a "confirm" dialog
    // whose onConfirm callback calls deleteLocation directly, so it's not
    // needed here.
    const { createLocation, updateLocation } = useLocation();

    return (
        <>
            {dialogs.map((dialog, index) => {
                const zIndex = 1100 + index * 10;

                let content = null;

                switch (dialog.type) {
                    // =====================================================
                    // LOCATION
                    // =====================================================

                    case "location":
                        content = (
                            <LocationDialog
                                initialLocation={dialog.props?.location}
                                onClose={() => closeDialog(dialog.id)}
                                onSave={async (location) => {
                                    try {
                                        if (dialog.props?.location) {
                                            await updateLocation(location.id, location);
                                        } else {
                                            await createLocation(location);
                                        }
                                    } catch (error) {
                                        console.error(
                                            "[DialogManager] Failed to save location:",
                                            error,
                                        );
                                    }

                                    closeDialog(dialog.id);
                                }}
                            />
                        );
                        break;

                    // =====================================================
                    // CONFIRM
                    // =====================================================

                    case "confirm":
                        content = (
                            <ConfirmDialog
                                {...dialog.props}
                                onClose={() => closeDialog(dialog.id)}
                                onConfirm={() => {
                                    dialog.props?.onConfirm?.();
                                    closeDialog(dialog.id);
                                }}
                            />
                        );
                        break;

                    // =====================================================
                    // UNKNOWN
                    // =====================================================

                    default:
                        console.warn(`[DialogManager] Unknown dialog type: ${dialog.type}`);

                        return null;
                }

                return (
                    <Dialog key={dialog.id} zIndex={zIndex} onClose={() => closeDialog(dialog.id)}>
                        {content}
                    </Dialog>
                );
            })}
        </>
    );
}
