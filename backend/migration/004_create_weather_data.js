import weatherDataSchema from "../database/schema/weatherData.js";

export default function createWeatherDataTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(weatherDataSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
