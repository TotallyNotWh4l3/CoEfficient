import WeatherModuleContainer from "../Weather/WeatherModuleContainer";
import AnnouncementCard from "../Announcement/AnnouncementCard";

const MODULE_COMPONENTS = {
    weather: WeatherModuleContainer,
    announcement: AnnouncementCard,
    // announcement: AnnouncementModule,
};

export default function ModuleRenderer({ module, onSelect }) {
    const Component = MODULE_COMPONENTS[module.type];

    if (!Component) {
        return null;
    }

    return (
        <div onClick={() => onSelect(module.id)}>
            <Component module={module} />
        </div>
    );
}
