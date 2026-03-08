import type { User, UserCreatePayload, UserUpdatePayload } from "./types/user";

const API = "http://localhost:3000";

const apiFetch = (path: string, opts: RequestInit = {}): Promise<Response> =>
    fetch(`${API}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...opts,
    });

export const usersApi = {
    list: (): Promise<Response> =>
        apiFetch("/users"),

    get: (id: string): Promise<Response> =>
        apiFetch(`/users/${id}`),

    create: (body: UserCreatePayload): Promise<Response> =>
        apiFetch("/users", { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: UserUpdatePayload): Promise<Response> =>
        apiFetch(`/users/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string): Promise<Response> =>
        apiFetch(`/users/${id}`, { method: "DELETE" }),
};