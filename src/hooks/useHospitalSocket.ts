import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAppDispatch } from "../app/hooks";
import { updateResources } from "../features/resources/resourcesSlice";
import { appendLog } from "../features/logs/logsSlice";
import {
    setActivePatients,
    updateStats,
} from "../features/patients/patientsSlice";
import { setConnectionStatus } from "../features/connection/connectionSlice";

const WS_URL = `${import.meta.env.VITE_API_BASE_URL}/ws-hospital`;

export const useHospitalSocket = () => {
    const dispatch = useAppDispatch();
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        dispatch(setConnectionStatus("connecting"));

        const client = new Client({
            webSocketFactory: () => new SockJS(WS_URL),
            reconnectDelay: 3000,
            onConnect: () => {
                dispatch(setConnectionStatus("connected"));

                client.subscribe("/topic/resource-status", ({ body }) =>
                    dispatch(updateResources(JSON.parse(body)))
                );
                client.subscribe("/topic/patients", ({ body }) =>
                    dispatch(setActivePatients(JSON.parse(body)))
                );
                client.subscribe("/topic/logs", ({ body }) =>
                    dispatch(appendLog(JSON.parse(body)))
                );
                client.subscribe("/topic/stats", ({ body }) =>
                    dispatch(updateStats(JSON.parse(body)))
                );
            },
            onDisconnect: () => {
                dispatch(setConnectionStatus("disconnected"));
            },
            onWebSocketError: () => {
                dispatch(setConnectionStatus("connecting"));
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [dispatch]);
};
