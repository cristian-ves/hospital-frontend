export const PatientQueueCard = () => {
  return (
    <section className="bento-card md:col-span-3 md:row-span-2 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Patient Dispatch Queue</h2>
      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-glass-border)] rounded-2xl">
        <p className="text-hospital-muted text-sm font-medium">
          Awaiting WebSocket integration...
        </p>
      </div>
    </section>
  );
};
