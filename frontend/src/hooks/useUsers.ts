import { useState, useCallback } from "react";
import type { User } from "../types/user";
import { usersApi } from "../api";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const r = await usersApi.list();
            const data: User[] = await r.json();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    }, []);

    return { users, loading, load };
}