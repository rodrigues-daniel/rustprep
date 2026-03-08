import type { ReactNode } from "react";
import { s } from "../styles";

interface Props {
    icon: ReactNode;
    title: string;
    sub?: string;
}

export function EmptyState({ icon, title, sub }: Props) {
    return (
        <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>{icon}</div>
            <div style={s.emptyTitle}>{title}</div>
            {sub && <div style={s.emptySub}>{sub}</div>}
        </div>
    );
}