export default function LinearGradient({ gradient, children, style }) {
    const [direction, colors] = gradient;

    return (
        <span
            style={{
                background: `linear-gradient(${direction}, ${colors})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                ...style,
            }}
        >
            {children}
        </span>
    );
}
