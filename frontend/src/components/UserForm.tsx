import type { RefObject, MutableRefObject } from "react";
import type { User } from "../types/user";
import { s } from "../styles";
import { Spinner } from "./Spinner";

const API = "http://localhost:3000";

interface Props {
    editing: User | null;
    form: { nome: string; email: string };
    busy: boolean;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    onChange: (field: "nome" | "email", value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onDeleteClick: () => void;
    totalUsers: number;
}

export function UserForm({
    editing, form, busy, inputRef,
    onChange, onSubmit, onCancel, onDeleteClick, totalUsers,
}: Props) {
    return (
        <aside style={s.sidebar} >
            {/* Logo */}
            < div style={s.logoWrap} >
                <div style={s.logoDot} />
                < span style={s.logoText} > UserFlow </span>
            </div>

            {/* Contador */}
            <div style={s.stat}>
                <span style={s.statNum}> {totalUsers} </span>
                < span style={s.statLabel} > usuários cadastrados </span>
            </div>

            {/* Formulário */}
            <div style={s.formCard}>
                <p style={s.formTitle}>
                    {editing ? "✦ Editar usuário" : "✦ Novo usuário"}
                </p>

                < label style={s.label} > Nome </label>
                < input
                    ref={inputRef}
                    style={s.input}
                    placeholder="Ana Souza"
                    value={form.nome}
                    onChange={(e) => onChange("nome", e.target.value)
                    }
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />

                < label style={{ ...s.label, marginTop: 14 }}> E - mail </label>
                < input
                    style={s.input}
                    type="email"
                    placeholder="ana@email.com"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />

                < div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                    <button
                        style={{ ...s.btnPrimary, flex: 1, opacity: busy ? 0.5 : 1 }}
                        onClick={onSubmit}
                        disabled={busy}
                    >
                        {busy ? <Spinner /> : editing ? "Salvar" : "Criar"}
                    </button>
                    {
                        editing && (
                            <button style={s.btnGhost} onClick={onCancel} >✕</button>
                        )
                    }
                </div>

                {
                    editing && (
                        <button style={s.btnDanger} onClick={onDeleteClick} >
                            Excluir este usuário
                        </button>
                    )
                }
            </div>

            < div style={s.sidebarFooter} >
                API: <code style={s.apiUrl}> {API} </code>
            </div>
        </aside>
    );
}