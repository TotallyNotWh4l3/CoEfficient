import Placeholder from "../Placeholder/Placeholder";

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderPlaceholder({ mainClassName, loading, error, data }) {
    const moduleName = `${capitalizeFirstLetter(mainClassName)} Module`;

    if (loading) {
        return (
            <Placeholder
                moduleName={moduleName}
                className={`${mainClassName} placeholder--loading`}
                message="Loading..."
            />
        );
    }

    if (error) {
        return (
            <Placeholder
                moduleName={moduleName}
                className={`${mainClassName} placeholder--error`}
                message="Error Occurred..."
                errMessage={error}
            />
        );
    }

    if (!data) {
        return (
            <Placeholder
                moduleName={moduleName}
                className={`${mainClassName} placeholder--data-not-found`}
                message="Data Not Found"
            />
        );
    }

    return null;
}
