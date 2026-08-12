import API from "./apiClient";

export async function login(username, password) {
    const { data } = await API.post("/auth/login", {
        username,
        password,
    });

    return data;
}

export async function getCurrentUser() {
    const { data } = await API.get("/auth/me");

    return data;
}
