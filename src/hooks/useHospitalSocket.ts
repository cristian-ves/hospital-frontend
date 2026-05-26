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

const WS_URL =
  "https://hospital-backend-production-c052.up.railway.app/ws-hospital";

export const useHospitalSocket = () => {
  const dispatch = useAppDispatch();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,
      onConnect: () => {
        client.subscribe("/topic/resource-status", ({ body }) =>
          dispatch(updateResources(JSON.parse(body))),
        );
        client.subscribe("/topic/patients", ({ body }) =>
          dispatch(setActivePatients(JSON.parse(body))),
        );
        client.subscribe("/topic/logs", ({ body }) =>
          dispatch(appendLog(JSON.parse(body))),
        );
        client.subscribe("/topic/stats", ({ body }) =>
          dispatch(updateStats(JSON.parse(body))),
        );
      },
    });

    client.activate();
    clientRef.current = client;
    return () => {
      client.deactivate();
    };
  }, [dispatch]);
};
