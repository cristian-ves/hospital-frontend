import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import type { PatientStatus } from "../../features/patients/patientsSlice";

/** Ticks up every second from a fixed start point. */
const LiveTimer = ({
  startTime,
  label,
}: {
  startTime: number;
  label: string;
}) => {
  const [elapsed, setElapsed] = useState(
    Math.floor((Date.now() - startTime) / 1000),
  );
  useEffect(() => {
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTime) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [startTime]);

  return (
    <div className="flex flex-col items-end">
      <span className="text-[10px] uppercase tracking-wider text-hospital-muted">
        {label}
      </span>
      <span className="text-xs font-mono tabular-nums text-hospital-muted">
        {elapsed}s
      </span>
    </div>
  );
};

/**
 * For IN_PROGRESS patients: shows static wait duration + live treatment timer.
 * The wait is frozen at the moment resources were acquired (startedAt - admittedAt).
 * The treatment timer ticks from startedAt onward.
 */
const DualTimer = ({
  admittedAt,
  startedAt,
}: {
  admittedAt: number;
  startedAt: number;
}) => {
  const waitedSeconds = Math.floor((startedAt - admittedAt) / 1000);
  const [treating, setTreating] = useState(
    Math.floor((Date.now() - startedAt) / 1000),
  );
  useEffect(() => {
    const id = setInterval(
      () => setTreating(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <div className="flex items-center gap-3 shrink-0">
      {/* Static: how long they waited in the queue */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-wider text-hospital-muted">
          waited
        </span>
        <span className="text-xs font-mono tabular-nums text-hospital-muted line-through opacity-60">
          {waitedSeconds}s
        </span>
      </div>
      {/* Arrow separator */}
      <span className="text-hospital-muted opacity-40 text-xs">→</span>
      {/* Live: time in active treatment */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-wider text-hospital-green">
          treating
        </span>
        <span className="text-xs font-mono tabular-nums text-hospital-green">
          {treating}s
        </span>
      </div>
    </div>
  );
};

const TRIAGE_STYLE: Record<
  string,
  { label: string; color: string; border: string }
> = {
  CRITICAL: {
    label: "Critical",
    color: "text-red-400",
    border: "border-red-500/40",
  },
  EMERGENCY: {
    label: "Emergency",
    color: "text-orange-400",
    border: "border-orange-500/40",
  },
  URGENT: {
    label: "Urgent",
    color: "text-yellow-400",
    border: "border-yellow-500/40",
  },
  LESS_URGENT: {
    label: "Less Urgent",
    color: "text-blue-400",
    border: "border-blue-500/40",
  },
  NON_URGENT: {
    label: "Non-Urgent",
    color: "text-hospital-green",
    border: "border-hospital-green/40",
  },
};

const StatusBadge = ({ status }: { status: PatientStatus["status"] }) => {
  const styles =
    status === "IN_PROGRESS"
      ? "bg-hospital-green/10 text-hospital-green border-hospital-green/30"
      : "bg-amber-500/10 text-amber-400 border-amber-500/30";
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles}`}
    >
      {status === "IN_PROGRESS" ? "In Progress" : "Queued"}
    </span>
  );
};

const PatientRow = ({ patient }: { patient: PatientStatus }) => {
  const triage = TRIAGE_STYLE[patient.triageLevel] ?? TRIAGE_STYLE.NON_URGENT;

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${triage.border} bg-black/5 dark:bg-white/5`}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-text-main truncate">
          {patient.name}
        </span>
        <span className={`text-xs font-medium ${triage.color}`}>
          {triage.label}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {patient.status === "IN_PROGRESS" ? (
          // Show both phases: frozen wait + live treatment tick
          <DualTimer
            admittedAt={patient.admittedAt}
            startedAt={patient.startedAt}
          />
        ) : (
          // Show only how long they've been sitting in the queue
          <LiveTimer startTime={patient.admittedAt} label="waiting" />
        )}
        <StatusBadge status={patient.status} />
      </div>
    </div>
  );
};

export const PatientQueueCard = () => {
  const activePatients = useAppSelector(
    (state) => state.patients.activePatients,
  );

  const sorted = [...activePatients].sort((a, b) => {
    if (a.status === "IN_PROGRESS" && b.status !== "IN_PROGRESS") return -1;
    if (b.status === "IN_PROGRESS" && a.status !== "IN_PROGRESS") return 1;
    return a.triageLevel.localeCompare(b.triageLevel);
  });

  return (
    <section className="bento-card md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Patient Dispatch Queue</h2>
        <span className="text-xs font-bold text-hospital-muted bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
          {activePatients.length} active
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-glass-border)] rounded-2xl">
          <p className="text-hospital-muted text-sm font-medium">
            No active patients
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {sorted.map((p) => (
            <PatientRow key={p.patientId} patient={p} />
          ))}
        </div>
      )}
    </section>
  );
};
