import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import LineChartComponent from "~/client/components/custom/LineChart";
import PairSelectorComponent from "~/client/components/custom/PairSelector";
import TradeList from "~/client/components/custom/TradeList";
import { cn } from "~/client/libs/utils";

const data = [
    {
        timestamp: dayjs().valueOf(),
        value: 300,
    },
    {
        timestamp: dayjs().subtract(1, "hour").valueOf(),
        value: 205,
    },
    {
        timestamp: dayjs().subtract(2, "hour").valueOf(),
        value: 305,
    },
    {
        timestamp: dayjs().subtract(3, "hour").valueOf(),
        value: 255,
    },
    {
        timestamp: dayjs().subtract(4, "hour").valueOf(),
        value: 505,
    },
    {
        timestamp: dayjs().subtract(5, "hour").valueOf(),
        value: 305,
    },
    {
        timestamp: dayjs().subtract(6, "hour").valueOf(),
        value: 150,
    },
    {
        timestamp: dayjs().subtract(7, "hour").valueOf(),
        value: 1500,
    },
];

const pairs = [
    {
        value: "eur_mga",
        label: "EUR/MGA",
    },
    {
        value: "eur_usd",
        label: "EUR/USD",
    },
];

export default function MarketPage() {
    const { pair } = useParams();
    const navigate = useNavigate();

    return (
        <div
            className={cn(
                "w-full h-full min-h-0 min-w-0 border rounded flex flex-wrap divide-y overflow-hidden"
            )}
        >
            <div
                className={cn(
                    "w-full h-4/6 flex flex-wrap flex-col min-h-0 min-w-0",
                    "md:flex-row"
                )}
            >
                <div className={cn("w-full border-b", "md:hidden")}>
                    <PairSelectorComponent
                        pairs={pairs}
                        defaultPair={pair}
                        onPairSelected={(pair) =>
                            navigate(`/market/${pair?.value ?? ""}`)
                        }
                    />
                </div>
                <div
                    className={cn(
                        "w-1/4 h-full hidden flex-wrap flex-col divide-y border-r min-h-0 min-w-0",
                        "md:flex"
                    )}
                >
                    <PairSelectorComponent
                        pairs={pairs}
                        defaultPair={pair}
                        onPairSelected={(pair) =>
                            navigate(`/market/${pair?.value ?? ""}`)
                        }
                    />
                    <div
                        className={cn("flex flew-wrap flex-1 min-h-0 min-w-0")}
                    >
                        <div className="w-full h-full max-h-full min-h-0 overflow-auto divide-y">
                            <TradeList />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        "w-full pl-2 py-2 flex-1 min-w-0 min-h-0",
                        "md:w-3/4"
                    )}
                >
                    <LineChartComponent data={data} />
                </div>
            </div>
            <div className={cn("w-full h-2/6 grid grid-cols-2")}>
                <div>2.1</div>
                <div>2.2</div>
            </div>
        </div>
    );
}
