import { Header } from "./components/layout/Header";
import {
  PatientQueueCard,
  AdmissionsCard,
  ResourceCard,
  SystemLogsCard,
} from "./components/dashboard";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  useTheme();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header />

      <main className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-[800px] max-w-7xl mx-auto">
        <PatientQueueCard />

        <AdmissionsCard />

        <ResourceCard title="Operating Rooms" value={3} total={3} />
        <ResourceCard title="Surgeons" value={4} total={4} />

        <SystemLogsCard />

        {/* Placeholder for the Deadlock Resolution Panel we'll build later */}
        <section className="bento-card md:col-span-2 flex items-center justify-center bg-hospital-muted/5">
          <p className="text-hospital-muted text-sm font-medium tracking-wide">
            Deadlock Monitoring Offline
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;
