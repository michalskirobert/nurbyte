import type { ReactNode } from "react";
export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
