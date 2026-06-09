import "./placeholder.css";

export default function Placeholder({
    moduleName = null,
    className = "placeholder--loading",
    message = "Loading...",
    errMessage = null,
}) {
    let class_name = "module placeholder " + className;
    return (
        <div className={class_name}>
            <h1>{moduleName}</h1>
            <p>{message}</p>
        </div>
    );
}
