import Placeholder from "./Placeholder";

export default function useErrorPlaceholder(mainClassName, loading, error, data) {
    if (loading || error || !data) {
        let message,
            errorMsg = null;

        // Create module name from mainClassName
        const moduleName =
            mainClassName.charAt(0).toUpperCase() +
            mainClassName.slice(1) +
            " Module";

        if (loading) {
            message = "Loading..";
        } else if (error) {
            message = "Error Occurred..";
            errorMsg = error;
        } else {
            message = "Data Not Found";
        }

        const stateClass = loading
            ? "loading"
            : error
              ? "error"
              : "data-not-found";
        const className = `${mainClassName} placeholder placeholder--${stateClass}`;
        console.log(`${moduleName}: ${stateClass}, ${className}`)
        return {
            isError: true,
            component: (
                <Placeholder
                    moduleName={moduleName}
                    className={className}
                    message={message}
                    errMessage={errorMsg}
                />
            ),
        };
    }

    return { isError: false };
}
