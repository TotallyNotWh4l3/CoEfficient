import { useState, useEffect, useCallback } from "react";
import userService from "../services/userService";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async ({ silent = false } = {}) => {
        if (!silent) setIsLoading(true);
        setError(null);
        try {
            const data = await userService.getAll();
            setUsers(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.response?.data?.message || e.message || "Failed to load users.");
        } finally {
            if (!silent) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const createUser = useCallback(async (payload) => {
        const created = await userService.create(payload);
        setUsers((prev) => [...prev, created].sort((a, b) => a.username.localeCompare(b.username)));
        return created;
    }, []);

    const updateUserRole = useCallback(async (id, role) => {
        await userService.updateRole(id, role);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    }, []);

    const deleteUser = useCallback(async (id) => {
        await userService.remove(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }, []);

    return { users, isLoading, error, reload: load, createUser, updateUserRole, deleteUser };
}
