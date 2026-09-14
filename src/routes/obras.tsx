import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-shell";
import { ProjectGrid } from "@/components/project-grid";
import { meta } from "@/lib/site-data";
export const Route=createFileRoute("/obras")({head:()=>meta("Obras VRV/VRF | THÉRMICA","Conheça obras representativas de instalação e retrofit VRV/VRF executadas pela THÉRMICA."),component:Obras});
function Obras(){return <><PageHero eyebrow="Portfólio" title="Obras em diferentes escalas e contextos." description="Uma seleção representativa da atuação THÉRMICA, preservando a confidencialidade dos contratantes."/><section className="section"><div className="mx-auto max-w-7xl px-5 lg:px-8"><ProjectGrid/></div></section></>}