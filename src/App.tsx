import { Header } from "./components/layout/Header";
import {
  PatientQueueCard,
  AdmissionsCard,
  SystemLogsCard,
  StatisticsCard,
  ResourcePoolCard,
} from "./components/dashboard";
import { useTheme } from "./hooks/useTheme";
import { useHospitalSocket } from "./hooks/useHospitalSocket";

const App = () => {
  useTheme();
  useHospitalSocket();

  return (
    <div className="min-h-screen w-screen md:h-screen p-4 md:p-6 flex flex-col">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full gap-4">
        <Header />

        <main className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[0.8fr_1.2fr_1fr] gap-4 md:gap-6 flex-1 min-h-0 pb-2 [&>div>section]:h-full [&>section]:h-full">
          <div className="md:col-span-2 md:row-span-2 min-h-0">
            <PatientQueueCard />
          </div>

          <div className="md:col-span-1 md:row-span-1 min-h-0">
            <AdmissionsCard />
          </div>

          <div className="md:col-span-1 md:row-span-1 min-h-0">
            <StatisticsCard />
          </div>

          <div className="md:col-span-2 md:row-span-1 min-h-0">
            <ResourcePoolCard />
          </div>

          <div className="md:col-span-2 md:row-span-1 min-h-0">
            <SystemLogsCard />
          </div>

          <div className="md:col-span-2 md:row-span-1">
            <section className="bento-card flex flex-col justify-center items-center border-dashed border-2 border-rose-500/20 bg-rose-500/5 group hover:bg-rose-500/10 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-500/70 group-hover:text-rose-500 transition-colors">
                Deadlock Detector
              </h3>
              <p className="text-xs text-hospital-muted mt-2 font-mono bg-black/10 dark:bg-black/30 px-3 py-1 rounded-full shadow-inner">
                Status: Awaiting WebSocket graph data...
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
