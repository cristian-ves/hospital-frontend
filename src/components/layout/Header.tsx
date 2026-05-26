import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        OS1 <span className="text-hospital-green">Emergency Engine</span>
      </h1>
      <ThemeToggle />
    </header>
  );
};
