import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addPatient } from "../../features/patients/patientsSlice";

const TRIAGE_OPTIONS = [
  { value: 1, label: "1 — Critical" },
  { value: 2, label: "2 — Emergency" },
  { value: 3, label: "3 — Urgent" },
  { value: 4, label: "4 — Less Urgent" },
  { value: 5, label: "5 — Non-Urgent" },
];

export const AdmissionsCard = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [triageLevel, setTriageLevel] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setSubmitting(true);

    const patient = {
      id: crypto.randomUUID(),
      name: name.trim(),
      triageLevel,
    };

    try {
      await fetch(
        "https://hospital-backend-production-c052.up.railway.app/api/patients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patient),
        },
      );
      dispatch(addPatient(patient));
      setName("");
      setTriageLevel(3);
      setIsOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <section
        className="bento-card flex flex-col justify-center items-center cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <h2 className="text-xl font-semibold mb-3 transition-transform group-hover:-translate-y-1">
          Admissions
        </h2>
        <div className="w-16 h-16 rounded-full bg-hospital-green/10 border border-hospital-green/30 flex items-center justify-center transition-all group-hover:bg-hospital-green/20 group-hover:scale-110">
          <span className="text-hospital-green text-3xl font-bold">+</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bento-card flex flex-col justify-center gap-3">
      <h2 className="text-xl font-semibold">New Patient</h2>

      <input
        autoFocus
        type="text"
        placeholder="Patient name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="w-full bg-black/10 dark:bg-white/5 border border-[var(--color-glass-border)] rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-hospital-muted focus:outline-none focus:border-hospital-green/50"
      />

      <select
        value={triageLevel}
        onChange={(e) => setTriageLevel(Number(e.target.value))}
        className="w-full bg-black/10 dark:bg-white/5 border border-[var(--color-glass-border)] rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-hospital-green/50"
      >
        {TRIAGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || submitting}
          className="cursor-pointer flex-1 bg-hospital-green/20 hover:bg-hospital-green/30 border border-hospital-green/40 text-hospital-green text-sm font-bold py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Admitting..." : "Admit"}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer px-4 bg-black/10 dark:bg-white/5 border border-[var(--color-glass-border)] text-hospital-muted text-sm font-bold py-2 rounded-lg transition-colors hover:text-text-main"
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
