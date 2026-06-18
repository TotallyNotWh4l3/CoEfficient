export const DEFAULT_GRAPH_SETTINGS = {
    data: {
        dayIndex: 0,
        hours: 24,
    },

    xAxis: {
        show: true,

        labels: {
            show: true,

            // "count" or "interval"
            mode: "count",

            count: 4,

            interval: 6,

            style: {
                color: "rgba(255,255,255,0.85)",
                size: 12,
                weight: "normal",
            },
        },

        timeFormat: {
            hour: "numeric",
            hour12: true,
        },
    },

    yAxis: {
        show: true,

        min: undefined,
        max: undefined,

        labels: {
            show: true,

            count: 5,

            style: {
                color: "rgba(255,255,255,0.85)",
                size: 12,
                weight: "normal",
            },
        },
    },

    temperature: {
        unit: "°C",

        labels: {
            show: true,

            count: 5,

            style: {
                color: "#ffffff",
                size: 12,
                weight: "bold",
            },
        },
    },

    style: {
        line: {
            color: "#ffffff",
            width: 3,
            smoothness: 0.4,
        },

        point: {
            color: "#ffffff",
            radius: 2,
            hoverRadius: 5,
        },

        fill: {
            enabled: false,
            color: "rgba(255,255,255,0.15)",
        },

        grid: {
            color: "rgba(255,255,255,0.08)",
        },

        tooltip: {
            enabled: true,
        },

        animation: {
            duration: 750,
        },
    },
};