import type { User } from "../types/user";
import { s } from "../styles";
import { Spinner } from "./Spinner";
import type { Breakpoint } from "../hooks/useBreakpoint";

interface Props {
    user: User;
    busy: boolean;
    bp: Breakpoint;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteModal({ user, busy, bp, onConfirm, onCancel }: Props) {
    const isMobile = bp === "mobile";
    const modalStyle = isMobile ? s.modalMobile : s.modal;

    return (
        <div style={s.overlay} onClick={onCancel}>
            {/* Handle visual no mobile */}
            {isMobile && (
                <div
                    style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <div style={s.drawerHandle} />
                        <ModalContent user={user} busy={busy} onConfirm={onConfirm} onCancel={onCancel} />
                    </div>
                </div>
            )}

            {!isMobile && (
                <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                    <ModalContent user={user} busy={busy} onConfirm={onConfirm} onCancel={onCancel} />
                </div>
            )}
        </div>
    );
}

function ModalContent({ user, busy, onConfirm, onCancel }: Omit<Props, "bp">) {
    return (
        <>
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
        </>
    );
}