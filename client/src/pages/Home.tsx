import { useApi } from "~/client/contexts/api/hook";

export default function HomePage() {
    const { webSocket, webSocketReconnect } = useApi();
    return (
        <div className="w-full h-full min-h-0 min-w-0">
            home<button onClick={() => webSocket().test.mutate({})}>zob</button>
            <button onClick={() => webSocketReconnect()}>bozo</button>
            <button onClick={() => webSocket()["test/zob"].query({})}>
                zob
            </button>
        </div>
    );
}
