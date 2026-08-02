import apiClient from "./apiClient";

export async function getWeather() {
    const { data } = await apiClient.get("/weather");
    return data;
}
