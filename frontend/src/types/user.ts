// Tipos centrais — usados em toda a aplicação
export interface User {
    id: string;
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface UserCreatePayload {
    nome: string;
    email: string;
}

export interface UserUpdatePayload {
    nome?: string;
    email?: string;
}

export type ToastKind = "ok" | "warn" | "err";

export interface Toast {
    id: number;
    msg: string;
    kind: ToastKind;
}