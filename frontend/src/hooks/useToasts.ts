import { useState, useCallback } from "react";
import type { Toast, ToastKind } from "../types/user";

let _tid = 0;

export function useToasts() {
    const [list, setList] = useState<Toast[]>([]);

    const push = useCallback((msg: string, kind: ToastKind = "ok") => {
        const id = ++_tid;
        setList((l) => [...l, { id, msg, kind }]);
        setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 3500);
    }, []);

    return { list, push };
}