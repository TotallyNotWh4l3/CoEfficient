import "./placeholder.css";

export default function Placeholder(props) {
    const { moduleName, className, message, errMessage } = props;
    return (
        <div className={className}>
            <h1>{moduleName}</h1>
            <p>{message}</p>
            {errMessage && <p className="placeholder__error">{errMessage}</p>}
        </div>
    );
}
