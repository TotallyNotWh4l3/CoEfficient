import WeatherModuleContainer from "../Weather/WeatherModuleContainer";
import AnnouncementCard from "../Announcement/AnnouncementModule";
import ScheduleModule from "../Schedule/ScheduleModule";
const MODULE_COMPONENTS = {
    weather: WeatherModuleContainer,
    announcement: AnnouncementCard,
    schedule: ScheduleModule,
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
