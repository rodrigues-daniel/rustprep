import type { User } from "../types/user";
import { s } from "../styles";
import { Spinner } from "./Spinner";

interface Props {
    user: User;
    busy: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteModal({ user, busy, onConfirm, onCancel }: Props) {
    return (
        <div style={s.overlay} onClick={onCancel}>
            <div style={s.modal} onClick={(e) => e.stopPropagation()}>
                <div style={s.modalIcon}>⚠️</div>
                <p style={s.modalTitle}>Remover usuário?</p>
                <p style={s.modalSub}>
                    <strong>{user.nome}</strong> ({user.email}) será excluído permanentemente.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ ...s.btnGhost, flex: 1 }} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button
                        style={{ ...s.btnDangerSolid, flex: 1, opacity: busy ? 0.5 : 1 }}
                        onClick={onConfirm}
                        disabled={busy}
                    >
                        {busy ? <Spinner /> : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    );
}