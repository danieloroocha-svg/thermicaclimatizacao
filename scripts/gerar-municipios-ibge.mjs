/**
 * Converte uma base de localidades com código IBGE em um conjunto mínimo para
 * a seção de cobertura nacional. Uso:
 *
 *   node scripts/gerar-municipios-ibge.mjs caminho/municipios.json caminho/estados.json
 *
 * Os arquivos de entrada seguem o formato de
 * https://github.com/kelvins/municipios-brasileiros/tree/main/json
 * e devem ser conferidos com a tabela oficial de códigos do IBGE ao atualizar.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [municipiosFile, estadosFile] = process.argv.slice(2);
if (!municipiosFile || !estadosFile) {
  throw new Error("Informe os arquivos JSON de municípios e estados (códigos IBGE).");
}

const loadJSON = (path) => JSON.parse(readFileSync(resolve(path), "utf8").replace(/^\uFEFF/, ""));
const municipios = loadJSON(municipiosFile);
const estados = loadJSON(estadosFile);
const collator = new Intl.Collator("pt-BR", { sensitivity: "base" });
const resultado = Object.fromEntries(
  estados
    .sort((a, b) => a.uf.localeCompare(b.uf))
    .map((estado) => [
      estado.uf,
      municipios
        .filter((municipio) => municipio.codigo_uf === estado.codigo_uf)
        .map((municipio) => municipio.nome)
        .sort(collator.compare),
    ]),
);

const qtdMunicipios = Object.values(resultado).reduce((total, nomes) => total + nomes.length, 0);
if (estados.length !== 27 || qtdMunicipios !== municipios.length || qtdMunicipios < 5571) {
  throw new Error(`Base incompleta: ${estados.length} UFs e ${qtdMunicipios} localidades.`);
}

const output = resolve("src/data/municipios-por-estado.json");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(resultado, null, 2)}\n`, "utf8");
console.log(`Geradas ${qtdMunicipios} localidades de ${estados.length} UFs em ${output}.`);
