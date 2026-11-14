import { readFileSync, appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { preview } from "./lib.mjs";

if (process.argv.includes("--publish")) {
  console.error("Publicação real BLOQUEADA neste piloto: falta autenticação oficial, validação de formato de mídia e ledger privado contra duplicações.");
  process.exit(2);
}
const base = dirname(fileURLToPath(import.meta.url));
const queue = JSON.parse(readFileSync(join(base, "queue.example.json"), "utf8"));
const rows = preview(queue, process.env.SOCIAL_NOW ? new Date(process.env.SOCIAL_NOW) : new Date());
const report = ["# THÉRMICA — prévia do social media", "", "Nenhuma publicação foi enviada.", "", "| ID | Situação | Canais | Data |", "|---|---|---|---|", ...rows.map(r => "| " + r.id + " | " + r.status + " | " + r.canais.join(", ") + " | " + r.agendado_em + " |"), ""].join("\n");
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
