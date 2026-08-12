export default function DialogContainer({ zIndex, children }) {
    return (
        <div className="dialog-container" style={{ zIndex }}>
            {children}
        </div>
    );
}
