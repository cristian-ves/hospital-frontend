import { useAppSelector } from "../../app/hooks";

export const ConnectionOverlay = () => {
    const status = useAppSelector((state) => state.connection.status);

    if (status === "connected") return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="w-8 h-8 border-2 border-hospital-green/30 border-t-hospital-green rounded-full animate-spin" />
                <p className="text-text-main font-semibold">
                    {status === "connecting" ? "Connecting to backend..." : "Connection lost — retrying..."}
                </p>
                <p className="text-sm text-hospital-muted max-w-xs">
                    This demo runs on a free-tier server that sleeps when inactive. First connection may take up to 50 seconds or more, please be patient.
                </p>
            </div>
        </div>
    );
};