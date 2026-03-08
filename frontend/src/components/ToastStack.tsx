import type { Toast } from "../types/user";
import { s, toastDotStyle } from "../styles";
import type { Breakpoint } from "../hooks/useBreakpoint";

interface Props {
    toasts: Toast[];
    bp: Breakpoint;
}

export function ToastStack({ toasts, bp }: Props) {
    const stackStyle = bp === "mobile" ? s.toastStackMobile : s.toastStack;

    return (
        <div style={stackStyle}>
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