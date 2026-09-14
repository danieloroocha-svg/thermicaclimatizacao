import { CheckCircle2 } from "lucide-react";
import { ContactBand, PageHero } from "@/components/site-shell";

export function ContentPage({ eyebrow, title, description, intro, sections }: { eyebrow: string; title: string; description: string; intro: string; sections: { title: string; text: string }[] }) {
  return <><PageHero eyebrow={eyebrow} title={title} description={description} /><section className="section"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8"><div><p className="eyebrow text-primary">Abordagem técnica</p><p className="mt-5 text-xl leading-8">{intro}</p></div><div className="grid gap-8 sm:grid-cols-2">{sections.map((s) => <article key={s.title} className="border-t-2 border-accent pt-5"><CheckCircle2 className="size-5 text-accent"/><h2 className="mt-4 text-xl font-semibold">{s.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{s.text}</p></article>)}</div></div></section><ContactBand /></>;
}