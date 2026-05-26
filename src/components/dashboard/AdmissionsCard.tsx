export const AdmissionsCard = () => {
  const handleAdmit = () => {
    console.log("Trigger patient admission...");
  };

  return (
    <section
      className="bento-card flex flex-col justify-center items-center cursor-pointer group"
      onClick={handleAdmit}
    >
      <h2 className="text-xl font-semibold mb-3 transition-transform group-hover:-translate-y-1">
        Admissions
      </h2>
      <div className="w-16 h-16 rounded-full bg-hospital-green/10 border border-hospital-green/30 flex items-center justify-center transition-all group-hover:bg-hospital-green/20 group-hover:scale-110">
        <span className="text-hospital-green text-3xl font-bold">+</span>
      </div>
    </section>
  );
};
