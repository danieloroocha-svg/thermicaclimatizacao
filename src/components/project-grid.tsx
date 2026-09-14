import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site-data";

export function ProjectGrid({ limit }: { limit?: number }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.slice(0, limit).map((project) => <Link key={project.slug} to="/obras/$slug" params={{ slug: project.slug }} className="group overflow-hidden border border-border bg-card">
      <div className="aspect-[4/3] overflow-hidden"><img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
      <div className="flex items-start justify-between gap-4 p-5"><div><p className="text-xs font-semibold uppercase text-accent">{project.type}</p><h3 className="mt-2 text-lg font-semibold">{project.title}</h3><p className="mt-1 text-sm text-muted-foreground">{project.system}</p></div><ArrowUpRight className="mt-1 size-5 shrink-0 text-accent" /></div>
    </Link>)}
  </div>;
}