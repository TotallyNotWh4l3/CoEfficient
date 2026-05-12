import "./dashboard-module.css";

export default function DashboardModule({children}) {
    return (
        <div className="dashboard-module">
            <div className="dashboard-module__content">
                {children}
            </div>
        </div>
    );
}
