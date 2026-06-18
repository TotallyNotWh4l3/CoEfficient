import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

export default function ForecastGraph({ data, settings }) {
    const { data: graphData, xAxis, yAxis, temperature, style } = settings;

    const rawLabels =
        data.time[graphData.dayIndex]?.slice(0, graphData.hours) ?? [];

    const temperatures =
        data.temperature[graphData.dayIndex]?.slice(0, graphData.hours) ?? [];

    const formattedLabels = rawLabels.map((time) =>
        new Date(time).toLocaleTimeString([], xAxis.timeFormat),
    );

    const chartData = {
        labels: formattedLabels,

        datasets: [
            {
                label: "Temperature",

                data: temperatures,

                borderColor: style.line.color,

                borderWidth: style.line.width,

                tension: style.line.smoothness,

                pointBackgroundColor: style.point.color,

                pointRadius: style.point.radius,

                pointHoverRadius: style.point.hoverRadius,

                fill: style.fill.enabled,

                backgroundColor: style.fill.color,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
            duration: style.animation.duration,
        },

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                enabled: style.tooltip.enabled,

                callbacks: {
                    label: (context) =>
                        `${context.parsed.y}${temperature.unit}`,
                },
            },
        },

        scales: {
            x: {
                display: xAxis.show,

                grid: {
                    color: style.grid.color,
                },

                ticks: {
                    display: xAxis.labels.show,

                    color: xAxis.labels.style.color,

                    maxTicksLimit: xAxis.labels.count,

                    autoSkip: true,

                    maxRotation: 0,
                    minRotation: 0,

                    font: {
                        size: xAxis.labels.style.size,
                        weight: xAxis.labels.style.weight,
                    },
                },
            },

            y: {
                display: yAxis.show,

                min: yAxis.min,

                max: yAxis.max,

                grid: {
                    color: style.grid.color,
                },

                ticks: {
                    display: yAxis.labels.show,

                    maxTicksLimit: yAxis.labels.count,

                    color: yAxis.labels.style.color,

                    font: {
                        size: yAxis.labels.style.size,

                        weight: yAxis.labels.style.weight,
                    },

                    callback: (value) => `${value}${temperature.unit}`,
                },
            },
        },
    };

    return (
        <div className="forecast__graph">
            <Line data={chartData} options={options} />
        </div>
    );
}
