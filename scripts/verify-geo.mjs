import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const robots = read("public/robots.txt");
assert.ok(robots.includes("User-agent: OAI-SearchBot\nAllow: /"), "Liberar OAI-SearchBot");
assert.ok(robots.includes("User-agent: *\nAllow: /"), "Manter acesso dos demais robôs");

const sitemap = read("public/sitemap.xml");
const urls = sitemap.split("<loc>").slice(1).map((part) => part.split("</loc>")[0]);
assert.equal(urls.length, 121, "Preservar as 121 URLs do sitemap");
assert.equal(new Set(urls).size, urls.length, "Sitemap sem URLs duplicadas");

const directory = read("src/lib/seo-site-directory.ts");
const seoPaths = [...directory.matchAll(/"path": "([^"]+)"/g)].map((match) => match[1]);
assert.equal(seoPaths.length, 100, "Preservar 100 páginas comerciais");
assert.equal(new Set(seoPaths).size, 100, "Rotas comerciais sem duplicação");
for (const path of seoPaths) {
  assert.ok(existsSync("src/routes" + path + ".tsx"), "Arquivo de rota ausente: " + path);
  assert.ok(urls.includes("https://thermicaclimatizacao.com.br" + path), "URL ausente no sitemap: " + path);
}
assert.equal(readdirSync("src/routes").filter((file) => file.endsWith(".tsx")).length, 115, "Preservar arquivos de rotas TSX");

for (const path of [
  "src/components/seo-keyword-landing.tsx",
  "src/routes/instalacao-ar-condicionado-vrf-para-empresas.tsx",
]) {
  const source = read(path);
  assert.ok(!source.includes("municipiosPorEstado"), "Listagem nacional ainda presente: " + path);
  assert.ok(!source.includes("coverageRegions.map") && !source.includes("regions.map"), "Loop geográfico ainda presente: " + path);
}

const identity = read("src/lib/site-data.ts");
assert.ok(identity.includes('export const ORGANIZATION_ID = BASE_URL + "/#organization";'));
assert.ok(identity.includes('export const WEBSITE_ID = BASE_URL + "/#website";'));
assert.ok(identity.includes('"@type": ["Organization", "HVACBusiness"]'));
assert.ok(identity.includes('"@type": "WebSite"'));
assert.ok(read("src/routes/__root.tsx").includes("JSON.stringify(siteIdentityJsonLd)"));
assert.ok(!read("src/routes/index.tsx").includes('"@type": "HVACBusiness"'), "A home não deve duplicar a organização");
assert.ok(read("src/components/seo-keyword-landing.tsx").includes('areaServed: { "@type": "Country", name: "Brasil" }'));
assert.ok(read("src/components/seo-keyword-landing.tsx").includes('const provider = { "@id": ORGANIZATION_ID };'));
assert.ok(read("src/routes/instalacao-ar-condicionado-vrf-para-empresas.tsx").includes('provider: { "@id": ORGANIZATION_ID }'));
assert.ok(read("src/routes/conteudo.$slug.tsx").includes('publisher:{"@id":ORGANIZATION_ID}'));

console.log("GEO OK: 100 páginas comerciais, 121 URLs, 115 rotas TSX, schema unificado e listagem geográfica removida.");
