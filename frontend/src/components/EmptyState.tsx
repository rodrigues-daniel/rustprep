import type { ReactNode } from "react";
import { s } from "../styles";
import type { Breakpoint } from "../hooks/useBreakpoint";

interface Props {
    icon: ReactNode;
    title: string;
    sub?: string;
    bp?: Breakpoint;
}

export function EmptyState({ icon, title, sub, bp }: Props) {
    const wrapStyle = bp === "mobile" ? s.emptyWrapMobile : s.emptyWrap;

    return (
        <div style={wrapStyle}>
            <div style={s.emptyIcon}>{icon}</div>
            <div style={s.emptyTitle}>{title}</div>
            {sub && <div style={s.emptySub}>{sub}</div>}
        </div>
    );
}