export default function TradeList() {
    return Array(10)
        .fill(0)
        .map((_, i) => (
            <div className="w-full scrollbar-w-1" key={`trade-${i}`}>
                {i}
            </div>
        ));
}
