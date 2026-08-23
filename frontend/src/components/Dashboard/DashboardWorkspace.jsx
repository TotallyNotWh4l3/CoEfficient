import { useDashboard } from "../../hooks/useDashboard";
import ModuleRenderer from "../Modules/core/ModuleRenderer";
import "./dashboard-workspace.css";

export default function DashboardWorkspace() {
    const { dashboard, selectModule } = useDashboard();
    const columnCount = dashboard.layout.columns;

    const columns = Array.from({ length: columnCount }, () => []);
    dashboard.modules.forEach((module, index) => {
        columns[index % columnCount].push(module);
    });

    return (
        <div
            className="dashboard__workspace"
            style={{
                "--workspace-columns": columnCount,
                "--workspace-gap": `${dashboard.layout.gap}px`,
                "--workspace-padding": `${dashboard.layout.padding}px`,
            }}
        >
            {columns.map((columnModules, colIndex) => (
                <div className="dashboard__column" key={colIndex}>
                    {columnModules.map((module) => (
                        <ModuleRenderer key={module.id} module={module} onSelect={selectModule} />
                    ))}
                </div>
            ))}
        </div>
    );
}
