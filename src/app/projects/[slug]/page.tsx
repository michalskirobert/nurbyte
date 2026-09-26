import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/projects";
import { ArcadeBackground } from "@/components/effects/arcade-background";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    p = projects.find((x) => x.slug === slug);
  return p
    ? {
        title: p.name,
        description: p.description,
        alternates: { canonical: `/projects/${p.slug}` },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <ArcadeBackground />
      <main className={`project-detail project-detail--${p.accent}`}>
        <Link className="back" href="/#projects">
          <ArrowLeft size={17} /> BACK TO PROJECTS
        </Link>
        <p className="eyebrow">{p.kicker}</p>
        <h1>{p.name}</h1>
        <p className="project-detail__lead">{p.longDescription}</p>
        <div className="tags">
          {p.tags.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="feature-panel">
          <h2>MISSION LOADOUT</h2>
          {p.features.map((x) => (
            <p key={x}>
              <Check size={17} />
              {x}
            </p>
          ))}
        </div>
        {p.href && (
          <a
            className="project-link"
            href={p.href}
            target="_blank"
            rel="noreferrer"
          >
            LAUNCH {p.name.toUpperCase()} <ArrowUpRight size={17} />
          </a>
        )}
      </main>
    </>
  );
}
