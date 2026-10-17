export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="max-w-[720px]">
      {eyebrow ? (
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2.25rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-base text-muted">{description}</p>
      ) : null}
    </div>
  );
}
