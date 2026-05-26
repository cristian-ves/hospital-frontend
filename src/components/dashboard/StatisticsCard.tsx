import { useAppSelector } from "../../app/hooks";

export const StatisticsCard = () => {
  const { totalAttended, avgWaitSeconds } = useAppSelector(
    (state) => state.patients.stats,
  );

  return (
    <section className="bento-card flex flex-col justify-between">
      <h2 className="text-xl font-bold tracking-tight mb-4">Live Stats</h2>
      <div className="space-y-4 flex-1">
        <div>
          <p className="text-xs text-hospital-muted uppercase font-bold">
            Total Attended
          </p>
          <p className="text-3xl font-black text-hospital-dark dark:text-hospital-light">
            {totalAttended}
          </p>
        </div>
        <div>
          <p className="text-xs text-hospital-muted uppercase font-bold">
            Avg Wait Time
          </p>
          <p className="text-3xl font-black text-hospital-dark dark:text-hospital-light">
            {avgWaitSeconds.toFixed(1)}s
          </p>
        </div>
      </div>
    </section>
  );
};
