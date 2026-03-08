interface Props {
    size?: number;
}

export function Spinner({ size = 16 }: Props) {
    return (
        <svg
            width={size} height={size}
            viewBox="0 0 24 24"
            style={{ animation: "spin .7s linear infinite", display: "block" }}
        >
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.2)" strokeWidth="3" fill="none" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
    );
}