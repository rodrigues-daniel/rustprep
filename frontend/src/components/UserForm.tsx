import type { MutableRefObject } from "react";
import type { User } from "../types/user";
import { s } from "../styles";
import { Spinner } from "./Spinner";
import type { Breakpoint } from "../hooks/useBreakpoint";

const API = "http://localhost:3000";

interface Props {
    editing: User | null;
    form: { nome: string; email: string };
    busy: boolean;
    bp: Breakpoint;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    totalUsers: number;
    onChange: (field: "nome" | "email", value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onDeleteClick: () => void;
    // Mobile: controle de visibilidade do drawer
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function UserForm({
    editing, form, busy, bp, inputRef,
    totalUsers, onChange, onSubmit, onCancel, onDeleteClick,
    mobileOpen, onMobileClose,
}: Props) {
    const isMobile = bp === "mobile";
    const isTablet = bp === "tablet";

    const sidebarStyle = isMobile
        ? s.sidebarMobile
        : isTablet
            ? s.sidebarTablet
            : s.sidebar;

    const formContent = (
        <>
            {/* Handle para fechar no mobile */}
            {isMobile && <div style={s.drawerHandle} />}

            {/* Logo — oculto no mobile (já está no header) */}
            {!isMobile && (
                <div style={s.logoWrap}>
                    <div style={s.logoDot} />
                    <span style={s.logoText}>UserFlow</span>
                </div>
            )}

            {/* Contador */}
            <div style={s.stat}>
                <span style={s.statNum}>{totalUsers}</span>
                <span style={s.statLabel}>usuários cadastrados</span>
            </div>

            {/* Formulário */}
            <div style={s.formCard}>
                <p style={s.formTitle}>
                    {editing ? "✦ Editar usuário" : "✦ Novo usuário"}
                </p>

                <label style={s.label}>Nome</label>
                <input
                    ref={inputRef}
                    style={s.input}
                    placeholder="Ana Souza"
                    value={form.nome}
                    onChange={(e) => onChange("nome", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />

                <label style={{ ...s.label, marginTop: 14 }}>E-mail</label>
                <input
                    style={s.input}
                    type="email"
                    placeholder="ana@email.com"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                />

                <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                    <button
                        style={{ ...s.btnPrimary, flex: 1, opacity: busy ? 0.5 : 1 }}
                        onClick={onSubmit}
                        disabled={busy}
                    >
                        {busy ? <Spinner /> : editing ? "Salvar" : "Criar"}
                    </button>
                    {editing && (
                        <button style={s.btnGhost} onClick={onCancel}>✕</button>
                    )}
                </div>

                {editing && (
                    <button style={s.btnDanger} onClick={onDeleteClick}>
                        Excluir este usuário
                    </button>
                )}
            </div>

            {!isMobile && (
                <div style={s.sidebarFooter}>
                    API: <code style={s.apiUrl}>{API}</code>
                </div>
            )}
        </>
    );

    // Mobile: drawer sobre a tela
    if (isMobile) {
        if (!mobileOpen) return null;
        return (
            <>
                {/* Overlay fecha o drawer */}
                <div style={s.drawerOverlay} onClick={onMobileClose} />
                <div style={sidebarStyle}>{formContent}</div>
            </>
        );
    }

    // Tablet e desktop: sidebar lateral fixa
    return <aside style={sidebarStyle}>{formContent}</aside>;
}