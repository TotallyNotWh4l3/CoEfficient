// WeatherSettingsModal.jsx

import { useState } from "react";
import "./weather-settings-modal.css";

export default function WeatherSettingsModal({ isOpen, onClose }) {
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleSave = () => {
        // TODO: Save location data
        console.log("Saving location:", { location, latitude, longitude });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal--weather-settings">
            <div className="modal__overlay" onClick={onClose}></div>

            <div className="modal__content">
                <div className="modal__header">
                    <h2 className="modal__title">Weather Settings</h2>
                    <button className="modal__close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal__body">
                    <div className="setting-group">
                        <label className="setting-label">Location Name</label>
                        <input
                            type="text"
                            className="setting-input"
                            placeholder="e.g., Tokyo, Japan"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="setting-group">
                        <label className="setting-label">Latitude</label>
                        <input
                            type="number"
                            className="setting-input"
                            placeholder="e.g., 34.666166"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            step="0.000001"
                        />
                    </div>

                    <div className="setting-group">
                        <label className="setting-label">Longitude</label>
                        <input
                            type="number"
                            className="setting-input"
                            placeholder="e.g., 136.50195"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            step="0.000001"
                        />
                    </div>
                </div>

                <div className="modal__footer">
                    <button
                        className="modal__btn modal__btn--cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="modal__btn modal__btn--save"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
