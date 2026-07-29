import apiClient from "./apiClient";

export async function getWeather(token) {
    const { data } = await apiClient.get("/weather", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}
