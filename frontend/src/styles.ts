import type { CSSProperties } from "react";
import type { Breakpoint } from "./hooks/useBreakpoint";

export const FONT_DISPLAY = "'Syne', sans-serif";
export const FONT_BODY = "'Epilogue', sans-serif";

export interface AvatarStyle {
    initial: string;
    fg: string;
    bg: string;
}

const COLORS: Array<{ fg: string; bg: string }> = [
    { fg: "#4f6ef7", bg: "#0f1a3e" },
    { fg: "#10b981", bg: "#022c22" },
    { fg: "#f59e0b", bg: "#2d1b00" },
    { fg: "#f43f5e", bg: "#2d0a14" },
    { fg: "#a78bfa", bg: "#1e1040" },
    { fg: "#22d3ee", bg: "#042030" },
];

export const avatarFor = (name: string): AvatarStyle => ({
    initial: (name[0] ?? "?").toUpperCase(),
    ...COLORS[name.charCodeAt(0) % COLORS.length],
});

// Reset e keyframes globais
const sheet = document.createElement("style");
sheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Epilogue:wght@300;400;500&display=swap');
  @keyframes fadeRow  { from { opacity:0; transform:translateY(6px)  } }
  @keyframes slideUp  { from { opacity:0; transform:translateY(14px) } }
  @keyframes slideInUp { from { opacity:0; transform:translateY(100%) } to { opacity:1; transform:translateY(0) } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  input:focus { border-color: #4f6ef7 !important; box-shadow: 0 0 0 3px rgba(79,110,247,.15); }
  button:active { transform: scale(.96); }
  ::-webkit-scrollbar       { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1c2236; border-radius: 4px; }
  body { overflow-x: hidden; }
`;
document.head.appendChild(sheet);

type Styles = Record<string, CSSProperties>;

// ── Estilos base (desktop) ─────────────────────────────────────────
export const s: Styles = {
    root: {
        display: "flex",
        minHeight: "100vh",
        background: "#080b12",
        color: "#dde1ed",
        fontFamily: FONT_BODY,
        fontSize: 14,
    },

    // Sidebar desktop
    sidebar: {
        width: 300, flexShrink: 0,
        borderRight: "1px solid #1c2236",
        display: "flex", flexDirection: "column",
        padding: "32px 24px", gap: 24,
        background: "#0b0e18",
        position: "sticky", top: 0,
        height: "100vh", overflowY: "auto",
    },

    // Sidebar mobile — drawer deslizante na parte inferior
    sidebarMobile: {
        position: "fixed", bottom: 0, left: 0, right: 0,
        zIndex: 300,
        background: "#0b0e18",
        borderTop: "1px solid #1c2236",
        borderRadius: "20px 20px 0 0",
        padding: "20px 20px 32px",
        display: "flex", flexDirection: "column", gap: 16,
        maxHeight: "85vh", overflowY: "auto",
        animation: "slideInUp .3s cubic-bezier(.34,1.2,.64,1)",
        boxShadow: "0 -8px 40px rgba(0,0,0,.5)",
    },

    // Sidebar tablet — painel lateral compacto
    sidebarTablet: {
        width: 260, flexShrink: 0,
        borderRight: "1px solid #1c2236",
        display: "flex", flexDirection: "column",
        padding: "24px 16px", gap: 20,
        background: "#0b0e18",
        position: "sticky", top: 0,
        height: "100vh", overflowY: "auto",
    },

    logoWrap: { display: "flex", alignItems: "center", gap: 10 },
    logoDot: {
        width: 10, height: 10, borderRadius: "50%",
        background: "linear-gradient(135deg,#4f6ef7,#7c3aed)",
        boxShadow: "0 0 14px #4f6ef7",
    },
    logoText: {
        fontFamily: FONT_DISPLAY, fontWeight: 800,
        fontSize: 18, letterSpacing: "-0.4px",
    },
    stat: {
        background: "#111526", border: "1px solid #1c2236",
        borderRadius: 14, padding: "16px 18px",
    },
    statNum: {
        display: "block", fontFamily: FONT_DISPLAY,
        fontSize: 36, fontWeight: 800,
        color: "#4f6ef7", lineHeight: 1,
    },
    statLabel: {
        display: "block", color: "#4b5675", fontSize: 12,
        marginTop: 4, textTransform: "uppercase", letterSpacing: "0.6px",
    },
    formCard: {
        background: "#111526", border: "1px solid #1c2236",
        borderRadius: 16, padding: "20px 18px", flex: 1,
    },
    formTitle: {
        fontFamily: FONT_DISPLAY, fontWeight: 700,
        fontSize: 13, color: "#4f6ef7",
        marginBottom: 16, letterSpacing: "0.2px",
    },
    label: {
        display: "block", fontSize: 11,
        textTransform: "uppercase", letterSpacing: "0.8px",
        color: "#4b5675", marginBottom: 6,
    },
    input: {
        width: "100%", background: "#0b0e18",
        border: "1.5px solid #1c2236", borderRadius: 10,
        padding: "10px 13px", color: "#dde1ed",
        fontFamily: FONT_BODY, fontSize: 14,
        outline: "none", boxSizing: "border-box",
        transition: "border-color .2s",
    },
    btnPrimary: {
        background: "linear-gradient(135deg,#4f6ef7,#7c3aed)",
        border: "none", borderRadius: 10,
        padding: "11px 18px", color: "#fff",
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13,
        cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        gap: 8, transition: "filter .2s",
    },
    btnGhost: {
        background: "transparent", border: "1.5px solid #1c2236",
        borderRadius: 10, padding: "11px 16px",
        color: "#4b5675", fontFamily: FONT_BODY,
        fontSize: 13, cursor: "pointer",
    },
    btnDanger: {
        width: "100%", marginTop: 12,
        background: "transparent",
        border: "1.5px solid rgba(244,63,94,.25)",
        borderRadius: 10, padding: "9px 16px",
        color: "#f43f5e", fontFamily: FONT_BODY,
        fontSize: 12, cursor: "pointer",
    },
    btnDangerSolid: {
        background: "#f43f5e", border: "none",
        borderRadius: 10, padding: "11px 18px", color: "#fff",
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13,
        cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
    },
    btnRefresh: {
        background: "#111526", border: "1.5px solid #1c2236",
        borderRadius: 10, width: 38, height: 38,
        color: "#4b5675", fontSize: 18,
        cursor: "pointer", flexShrink: 0,
    },
    btnEdit: {
        background: "rgba(79,110,247,.12)",
        border: "1px solid rgba(79,110,247,.25)",
        borderRadius: 7, width: 30, height: 30,
        color: "#4f6ef7", fontSize: 14, cursor: "pointer",
    },
    btnDelRow: {
        background: "rgba(244,63,94,.1)",
        border: "1px solid rgba(244,63,94,.2)",
        borderRadius: 7, width: 30, height: 30,
        color: "#f43f5e", fontSize: 12, cursor: "pointer",
    },
    sidebarFooter: { fontSize: 11, color: "#4b5675", marginTop: "auto" },
    apiUrl: { fontFamily: "monospace", color: "#4f6ef7", fontSize: 11 },

    // Main desktop
    main: {
        flex: 1, display: "flex", flexDirection: "column",
        padding: "32px 36px", gap: 20, minWidth: 0,
    },

    // Main mobile — padding menor + espaço pro FAB
    mainMobile: {
        flex: 1, display: "flex", flexDirection: "column",
        padding: "16px 16px 100px", gap: 16, minWidth: 0,
    },

    // Main tablet
    mainTablet: {
        flex: 1, display: "flex", flexDirection: "column",
        padding: "24px 24px", gap: 18, minWidth: 0,
    },

    toolbar: { display: "flex", gap: 10, alignItems: "center" },
    searchWrap: { position: "relative", flex: 1 },
    searchIcon: {
        position: "absolute", left: 13, top: "50%",
        transform: "translateY(-50%)", color: "#4b5675",
        fontSize: 16, pointerEvents: "none",
    },
    searchInput: {
        width: "100%", background: "#111526",
        border: "1.5px solid #1c2236", borderRadius: 12,
        padding: "10px 14px 10px 38px", color: "#dde1ed",
        fontFamily: FONT_BODY, fontSize: 14,
        outline: "none", boxSizing: "border-box",
    },
    listWrap: {
        background: "#0b0e18", border: "1px solid #1c2236",
        borderRadius: 18, overflow: "hidden", flex: 1,
    },
    row: {
        display: "grid", gridTemplateColumns: "44px 1fr auto",
        gap: 14, alignItems: "center",
        padding: "14px 20px", borderBottom: "1px solid #111526",
        transition: "background .15s", animation: "fadeRow .3s ease both",
    },
    rowMobile: {
        display: "grid", gridTemplateColumns: "38px 1fr auto",
        gap: 10, alignItems: "center",
        padding: "12px 14px", borderBottom: "1px solid #111526",
        transition: "background .15s", animation: "fadeRow .3s ease both",
    },
    rowHov: { background: "rgba(255,255,255,.025)" },
    rowSelected: { background: "rgba(79,110,247,.07)", borderLeft: "2px solid #4f6ef7" },
    avatar: {
        width: 44, height: 44, borderRadius: 13,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 17,
    },
    avatarSmall: {
        width: 38, height: 38, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 15,
    },
    userInfo: { minWidth: 0 },
    userName: { fontWeight: 500, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    userNameMobile: { fontWeight: 500, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    userEmail: { fontSize: 12, color: "#4b5675", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    userEmailMobile: { fontSize: 11, color: "#4b5675", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    actions: { display: "flex", gap: 6, transition: "opacity .15s" },
    // Mobile: ações sempre visíveis (sem hover)
    actionsMobile: { display: "flex", gap: 6 },
    emptyWrap: {
        padding: "80px 32px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
    },
    emptyWrapMobile: {
        padding: "48px 20px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
    },
    emptyIcon: { fontSize: 40, opacity: 0.3 },
    emptyTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, color: "#4b5675" },
    emptySub: { fontSize: 12, color: "#2a3050" },
    overlay: {
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200,
    },
    modal: {
        background: "#111526", border: "1px solid #1c2236",
        borderRadius: 20, padding: 32,
        maxWidth: 360, width: "90%",
        boxShadow: "0 32px 80px rgba(0,0,0,.6)",
    },
    modalMobile: {
        background: "#111526", border: "1px solid #1c2236",
        borderRadius: "20px 20px 0 0",
        padding: "24px 20px 36px",
        width: "100%",
        position: "fixed", bottom: 0, left: 0, right: 0,
        boxShadow: "0 -8px 40px rgba(0,0,0,.6)",
        animation: "slideInUp .25s ease",
    },
    modalIcon: { fontSize: 36, marginBottom: 14 },
    modalTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, marginBottom: 8 },
    modalSub: { fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 },
    toastStack: {
        position: "fixed", bottom: 24, right: 24,
        display: "flex", flexDirection: "column", gap: 8, zIndex: 999,
    },
    toastStackMobile: {
        position: "fixed", bottom: 80, left: 16, right: 16,
        display: "flex", flexDirection: "column", gap: 8, zIndex: 999,
    },
    toast: {
        background: "#111526", border: "1px solid #1c2236",
        borderRadius: 12, padding: "12px 16px", fontSize: 13,
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,.45)",
        animation: "slideUp .3s cubic-bezier(.34,1.56,.64,1)",
        minWidth: 220,
    },
    toast_err: { borderColor: "rgba(244,63,94,.3)" },

    // FAB mobile — botão flutuante para abrir o form
    fab: {
        position: "fixed", bottom: 24, right: 24,
        width: 56, height: 56, borderRadius: "50%",
        background: "linear-gradient(135deg,#4f6ef7,#7c3aed)",
        border: "none", color: "#fff",
        fontSize: 24, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(79,110,247,.5)",
        zIndex: 200,
    },

    // Header mobile
    headerMobile: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 16px 0",
    },

    // Overlay para fechar o drawer mobile
    drawerOverlay: {
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,.5)",
        backdropFilter: "blur(3px)",
        zIndex: 299,
    },

    // Handle do drawer mobile
    drawerHandle: {
        width: 40, height: 4, borderRadius: 2,
        background: "#1c2236", margin: "0 auto 16px",
    },
};

export const toastDotStyle = (kind: string): CSSProperties => ({
    width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
    background: kind === "ok" ? "#10b981" : kind === "warn" ? "#f59e0b" : "#f43f5e",
    boxShadow: `0 0 8px ${kind === "ok" ? "#10b981" : kind === "warn" ? "#f59e0b" : "#f43f5e"}`,
});

// Helper para selecionar estilo por breakpoint
export function rs<K extends string>(
    bp: Breakpoint,
    styles: Partial<Record<Breakpoint, K>>,
    base: K
): K {
    return styles[bp] ?? base;
}