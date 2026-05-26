interface ResourceCardProps {
  title: string;
  value: number;
  total?: number;
}

export const ResourceCard = ({ title, value, total }: ResourceCardProps) => {
  return (
    <section className="bento-card flex flex-col justify-center items-center">
      <h3 className="text-sm uppercase tracking-widest text-hospital-muted font-bold">
        {title}
      </h3>
      <p className="text-5xl font-black text-hospital-green mt-1">
        {value}
        {total && (
          <span className="text-2xl text-hospital-muted">/{total}</span>
        )}
      </p>
    </section>
  );
};
