import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import type { LogEntry } from "../../features/logs/logsSlice";

const LOG_STYLE: Record<string, { border: string; label: string }> = {
  SYSTEM: { border: "border-hospital-green", label: "text-hospital-green" },
  INFO: { border: "border-blue-400", label: "text-blue-400" },
  WARN: { border: "border-amber-400", label: "text-amber-400" },
  WAIT: { border: "border-hospital-muted", label: "text-hospital-muted" },
};

const LogLine = ({ entry }: { entry: LogEntry }) => {
  const style = LOG_STYLE[entry.level] ?? LOG_STYLE.WAIT;
  const body = entry.message.replace(/^\[[A-Z_]+\]\s*/, "");

  return (
    <p className={`border-l-2 ${style.border} pl-2 mb-1`}>
      <span className={`${style.label} opacity-70`}>[{entry.level}]</span>{" "}
      {body}
    </p>
  );
};

export const SystemLogsCard = () => {
  const entries = useAppSelector((state) => state.logs.entries);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries.length]);

  const chronological = [...entries].reverse();

  return (
    <section className="bento-card md:col-span-2 flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Live Execution Logs</h2>
      <div className="flex-1 overflow-y-auto font-mono text-xs text-hospital-muted bg-black/5 dark:bg-black/20 p-4 rounded-xl border border-[var(--color-glass-border)]">
        {chronological.map((entry, i) => (
          <LogLine key={`${entry.timestamp}-${i}`} entry={entry} />
        ))}
        <div ref={bottomRef} />
      </div>
    </section>
  );
};
