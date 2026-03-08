import { useState } from "react";
import type { User } from "../types/user";
import { s, avatarFor } from "../styles";

interface Props {
    user: User;
    selected: boolean;
    index: number;
    onEdit: () => void;
    onDelete: () => void;
}

export function UserRow({ user, selected, index, onEdit, onDelete }: Props) {
    const [hov, setHov] = useState(false);
    const av = avatarFor(user.nome);

    return (
        <div
            style={{
                ...s.row,
                ...(selected ? s.rowSelected : {}),
                ...(hov && !selected ? s.rowHov : {}),
                animationDelay: `${index * 40}ms`,
            }}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            <div style={{ ...s.avatar, background: av.bg, color: av.fg }}>
                {av.initial}
            </div>

            <div style={s.userInfo}>
                <div style={s.userName}>{user.nome}</div>
                <div style={s.userEmail}>{user.email}</div>
            </div>

            <div style={{ ...s.actions, opacity: hov || selected ? 1 : 0 }}>
                <button style={s.btnEdit} onClick={onEdit} title="Editar">✎</button>
                <button style={s.btnDelRow} onClick={onDelete} title="Excluir">✕</button>
            </div>
        </div>
    );
}