import dayjs from "dayjs";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/types";
import { generateTicks } from "~/client/libs/utils";

export type ChartData = {
    timestamp: number;
    value: number;
};

export type LineChartComponentProps = {
    data: ChartData[];
};

export default function LineChartComponent({ data }: LineChartComponentProps) {
    const yValues = data.map((d) => d.value);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yDiff = Math.round(((yMin + yMax) / 2) * 0.1);
    const yTicks = generateTicks(yMin - yDiff, yMax + yDiff, 8);
    const yWidth = 10 * `${yMax}`.length;

    const xValues = data.map((d) => d.timestamp);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);

    const onMouseMove = (_: CategoricalChartState) => {
        //console.log(e);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                onMouseMove={onMouseMove}
                margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <XAxis
                    reversed
                    className="text-xs"
                    dataKey="timestamp"
                    axisLine={false}
                    tickLine={false}
                    domain={[xMin, xMax]}
                    tickFormatter={(tick) => `${dayjs(tick).format("HH")}h`}
                />
                <YAxis
                    orientation="right"
                    className="text-xs"
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    domain={[yMin - yDiff, yMax + yDiff]}
                    ticks={yTicks}
                    width={yWidth}
                />
                <CartesianGrid
                    className="stroke-foreground"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth={0.1}
                />
                <Line
                    className="stroke-foreground"
                    type="linear"
                    dataKey="value"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    stroke="currentColor"
                    dot={false}
                    animationDuration={0}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
