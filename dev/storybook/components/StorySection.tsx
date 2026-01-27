import type { ReactNode } from 'react';

type StorySectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function StorySection({ id, title, description, children }: StorySectionProps) {
  return (
    <section className="sb-section" id={id}>
      <header className="sb-section__header">
        <div>
          <p className="sb-section__kicker">component</p>
          <h2 className="sb-section__title">{title}</h2>
        </div>
        {description ? <p className="sb-section__description">{description}</p> : null}
      </header>
      <div className="sb-section__content">{children}</div>
    </section>
  );
}
