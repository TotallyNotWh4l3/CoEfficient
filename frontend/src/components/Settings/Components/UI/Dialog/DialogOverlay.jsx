export default function DialogOverlay({ zIndex, onClose }) {
    return <div className="dialog-overlay" style={{ zIndex }} onClick={onClose} />;
}
