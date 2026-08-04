import WeatherModuleContainer from "../Weather/WeatherModuleContainer";

const MODULE_COMPONENTS = {
    weather: WeatherModuleContainer,
    // schedule: ScheduleModule,
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
