# Hospital Emergency System — Frontend

A real-time dashboard for visualizing a concurrent hospital emergency simulation, built with React, TypeScript, and Redux Toolkit. The interface reflects the exact in-memory state of the backend simulation through a live WebSocket connection — no polling, no manual refresh.

**Live demo:** [click here](https://hospital-emergency-room.netlify.app)
**Backend repository:** [hospital-backend](https://github.com/cristian-ves/hospital-backend)

---

## Overview

This client visualizes a multi-threaded resource allocation simulation running on a Spring Boot backend. Patients arrive with a priority-based triage level, compete for limited medical resources (operating rooms, surgeons, nurses, ventilators), and the dashboard reflects every state change — admissions, queue reordering, resource allocation, and deadlock conditions — as they happen on the server.

## Architecture

The frontend is purely reactive. Rather than fetching data on an interval, it maintains a single duplex WebSocket connection (STOMP over SockJS) to the backend. Every message received from the server dispatches a Redux action that updates the relevant state slice, which components subscribe to directly.

```
Backend (Spring Boot)  ──STOMP/WS──>  useHospitalSocket hook  ──dispatch──>  Redux slices  ──>  UI
```

This approach minimizes browser CPU usage — there are no repeated network requests, only a continuous stream of deltas pushed by the server.

## Module Structure

```
src
├── app
│   ├── hooks.ts                 # Typed Redux hooks (useAppDispatch, useAppSelector)
│   └── store.ts                 # Central Redux store configuration
├── components
│   ├── dashboard
│   │   ├── AdmissionsCard.tsx     # New patient admission form (REST)
│   │   ├── PatientQueueCard.tsx   # Live queue visualization (queued / in-progress)
│   │   ├── ResourcePoolCard.tsx   # Real-time semaphore-backed resource availability
│   │   ├── StatisticsCard.tsx     # Aggregated metrics (avg wait time, occupancy)
│   │   └── SystemLogsCard.tsx     # Streaming event log console
│   └── layout
└── hooks
    └── useHospitalSocket.ts     # WebSocket/STOMP connection and Redux dispatch bridge
```

## WebSocket Integration

The `useHospitalSocket` hook owns the entire WebSocket lifecycle — connecting on mount, subscribing to backend topics, and dispatching the corresponding Redux action for each incoming message:

| Topic                    | Action dispatched                  |
| ------------------------ | ---------------------------------- |
| `/topic/resource-status` | `updateResources`                  |
| `/topic/patients`        | `setActivePatients`, `updateStats` |
| `/topic/logs`            | `appendLog`                        |
| `/topic/deadlock`        | deadlock state update              |

The connection automatically reconnects on drop (e.g. backend redeploy) with a configured retry delay, and cleanly deactivates on component unmount.

## Tech Stack

-   **React** with **TypeScript**
-   **Redux Toolkit** — state management via feature slices
-   **@stomp/stompjs** + **sockjs-client** — WebSocket transport with browser fallback support
-   **Vite** — build tooling

## Running Locally

```bash
# clone the repository
git clone https://github.com/cristian-ves/hospital-frontend.git
cd hospital-frontend

# install dependencies
npm install

# run the dev server
npm run dev
```

By default the app connects to the deployed backend WebSocket URL. To point it at a local backend instance, update the `WS_URL` constant in `src/hooks/useHospitalSocket.ts` to `http://localhost:8080/ws-hospital`.

## Related

This is the frontend half of the Hospital Emergency System. The backend (Spring Boot, Java concurrency) is available at:
**[hospital-backend](https://github.com/cristian-ves/hospital-backend)**

## Author

**Cristian Vásquez** — [LinkedIn](https://linkedin.com/in/cristian-vasquez-web-developer) · [GitHub](https://github.com/cristian-ves)
