import type { Toast } from "../types/user";
import { s, toastDotStyle } from "../styles";

interface Props {
    toasts: Toast[];
}

export function ToastStack({ toasts }: Props) {
    return (
        <div style={s.toastStack}>
            {toasts.map((t) => (
                <div
                    key={t.id}
                    style={{ ...s.toast, ...(t.kind === "err" ? s.toast_err : {}) }}
                >
                    <span style={toastDotStyle(t.kind)} />
                    {t.msg}
                </div>
            ))}
        </div>
    );
}