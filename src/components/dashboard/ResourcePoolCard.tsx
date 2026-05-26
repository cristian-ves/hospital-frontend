export const ResourcePoolCard = () => {
  const resources = [
    { name: "Rooms", current: 0, max: 10 },
    { name: "ORs", current: 0, max: 3 },
    { name: "Doctors", current: 0, max: 8 },
    { name: "Surgeons", current: 0, max: 4 },
    { name: "Nurses", current: 0, max: 10 },
    { name: "Ventilators", current: 0, max: 5 },
    { name: "Monitors", current: 0, max: 8 },
  ];

  return (
    <section className="bento-card md:col-span-2 flex flex-col">
      <h2 className="text-xl font-bold tracking-tight mb-4">Semaphore Pool</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
        {resources.map((res) => (
          <div
            key={res.name}
            className="flex flex-col justify-center p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-[var(--color-glass-border)]"
          >
            <span className="text-xs uppercase tracking-wider text-hospital-muted font-bold mb-1">
              {res.name}
            </span>
            <span className="text-xl font-black text-text-main">
              {res.current}{" "}
              <span className="text-sm font-medium text-hospital-muted">
                / {res.max}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
