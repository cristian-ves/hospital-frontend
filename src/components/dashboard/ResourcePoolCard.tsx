import { useAppSelector } from "../../app/hooks";
import type { ResourceState } from "../../features/resources/resourcesSlice";

const RESOURCE_CONFIG: {
  key: keyof Omit<ResourceState, "total">;
  label: string;
}[] = [
  { key: "emergencyRooms", label: "Rooms" },
  { key: "operatingRooms", label: "ORs" },
  { key: "generalDoctors", label: "Doctors" },
  { key: "surgeons", label: "Surgeons" },
  { key: "nurses", label: "Nurses" },
  { key: "ventilators", label: "Ventilators" },
  { key: "monitors", label: "Monitors" },
];

export const ResourcePoolCard = () => {
  const resources = useAppSelector((state) => state.resources);

  return (
    <section className="bento-card md:col-span-2 flex flex-col">
      <h2 className="text-xl font-bold tracking-tight mb-4">Semaphore Pool</h2>

      <div
        className="
      flex-1
      overflow-y-auto
      pr-1
    "
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {RESOURCE_CONFIG.map(({ key, label }) => {
            const available = resources[key] as number;
            const total = resources.total[key as keyof typeof resources.total];
            const inUse = total - available;
            const pct = total > 0 ? inUse / total : 0;

            const accentColor =
              pct >= 1
                ? "border-red-500/60 bg-red-500/10"
                : pct >= 0.7
                  ? "border-amber-500/60 bg-amber-500/10"
                  : "border-[var(--color-glass-border)] bg-black/5 dark:bg-white/5";

            return (
              <div
                key={key}
                className={`
              flex flex-col justify-center
              p-3 rounded-xl border
              transition-colors
              min-h-[92px]
              ${accentColor}
            `}
              >
                <span className="text-xs uppercase tracking-wider text-hospital-muted font-bold mb-1">
                  {label}
                </span>

                <span className="text-xl font-black text-text-main">
                  {available}{" "}
                  <span className="text-sm font-medium text-hospital-muted">
                    / {total}
                  </span>
                </span>

                <span className="text-xs text-hospital-muted mt-1">
                  {inUse} in use
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
