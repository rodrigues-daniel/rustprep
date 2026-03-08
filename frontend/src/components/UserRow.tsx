import { useState } from "react";
import type { User } from "../types/user";
import { s, avatarFor } from "../styles";
import type { Breakpoint } from "../hooks/useBreakpoint";

interface Props {
    user: User;
    selected: boolean;
    index: number;
    bp: Breakpoint;
    onEdit: () => void;
    onDelete: () => void;
}

export function UserRow({ user, selected, index, bp, onEdit, onDelete }: Props) {
    const [hov, setHov] = useState(false);
    const av = avatarFor(user.nome);
    const isMobile = bp === "mobile";

    // Mobile: ações sempre visíveis; desktop/tablet: só no hover
    const showActions = isMobile || hov || selected;

    return (
        <div
            style={{
                ...(isMobile ? s.rowMobile : s.row),
                ...(selected ? s.rowSelected : {}),
                ...(hov && !selected ? s.rowHov : {}),
                animationDelay: `${index * 40}ms`,
            }}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            {/* Avatar */}
            <div style={{
                ...(isMobile ? s.avatarSmall : s.avatar),
                background: av.bg, color: av.fg,
            }}>
                {av.initial}
            </div>

            {/* Info */}
            <div style={s.userInfo}>
                <div style={isMobile ? s.userNameMobile : s.userName}>
                    {user.nome}
                </div>
                <div style={isMobile ? s.userEmailMobile : s.userEmail}>
                    {user.email}
                </div>
            </div>

            {/* Ações */}
            <div style={{ ...(isMobile ? s.actionsMobile : s.actions), opacity: showActions ? 1 : 0 }}>
                <button style={s.btnEdit} onClick={onEdit} title="Editar">✎</button>
                <button style={s.btnDelRow} onClick={onDelete} title="Excluir">✕</button>
            </div>
        </div>
    );
}