export const SystemLogsCard = () => {
  return (
    <section className="bento-card md:col-span-2 flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Live Execution Logs</h2>
      <div className="flex-1 overflow-y-auto font-mono text-xs text-hospital-muted bg-black/5 dark:bg-black/20 p-4 rounded-xl border border-[var(--color-glass-border)]">
        <p className="border-l-2 border-hospital-green pl-2 mb-1">
          <span className="text-hospital-dark dark:text-hospital-light opacity-50">
            [SYSTEM]
          </span>{" "}
          Engine initialized.
        </p>
        <p className="border-l-2 border-hospital-muted pl-2 opacity-70">
          <span className="text-hospital-dark dark:text-hospital-light opacity-50">
            [WAIT]
          </span>{" "}
          Awaiting incoming requests...
        </p>
      </div>
    </section>
  );
};
