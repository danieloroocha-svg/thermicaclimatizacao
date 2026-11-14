// Instagram-only: public, versioned editorial material. No account identifiers, passwords or tokens.
import {validateQueue} from './lib.mjs';
const BASE={
  "queue": [
    {
      "id": "vrf_retrofit_001",
      "status": "rascunho",
      "tema": "Quando avaliar um retrofit de climatização?",
      "texto": "Em edifícios corporativos, o retrofit de climatização começa por um diagnóstico técnico: capacidade instalada, desempenho, consumo, operação e compatibilidade do sistema existente. Uma análise criteriosa ajuda a definir o escopo da modernização. Conheça a atuação da THÉRMICA em sistemas VRF/VRV e projetos de engenharia. https://thermicaclimatizacao.com.br",
      "channels": [
        "instagram"
      ],
      "scheduled_at": "2026-11-17T09:00:00-03:00",
      "media_id": "img_de9fad0abd43",
      "recurring": false,
      "interval_days": 90
    },
    {
      "id": "comissionamento_vrf_002",
      "status": "rascunho",
      "tema": "Comissionamento de sistemas VRF",
      "texto": "A entrega técnica de um sistema VRF envolve mais do que verificar se o equipamento liga. Inspeções, testes funcionais, registros de instalação e verificação de parâmetros fazem parte de um processo de comissionamento consistente. A THÉRMICA atua com engenharia aplicada à climatização corporativa. https://thermicaclimatizacao.com.br",
      "channels": [
        "instagram"
      ],
      "scheduled_at": "2026-11-19T09:00:00-03:00",
      "media_id": "img_ae4a1a95860d",
      "recurring": false,
      "interval_days": 90
    },
    {
      "id": "pmoc_empresas_003",
      "status": "rascunho",
      "tema": "PMOC para edificações",
      "texto": "Manutenção de climatização e documentação técnica precisam caminhar juntas. O PMOC deve refletir os equipamentos, a operação e as responsabilidades aplicáveis à instalação. Para projetos corporativos, a análise técnica evita soluções genéricas. Saiba mais sobre a THÉRMICA: https://thermicaclimatizacao.com.br",
      "channels": [
        "instagram"
      ],
      "scheduled_at": "2026-11-21T09:00:00-03:00",
      "media_id": "img_76973014cdd3",
      "recurring": false,
      "interval_days": 90
    }
  ],
  "media": [
    {
      "id": "img_de9fad0abd43",
      "source": "site",
      "url": "https://raw.githubusercontent.com/danieloroocha-svg/thermicaclimatizacao/main/src/assets/seo/retrofit-chiller-para-vrf-01.webp",
      "approved": false,
      "public_approved": false,
      "notes": "Ilustração técnica; verificar direitos antes de aprovar."
    },
    {
      "id": "img_ae4a1a95860d",
      "source": "site",
      "url": "https://raw.githubusercontent.com/danieloroocha-svg/thermicaclimatizacao/main/src/assets/seo/comissionamento-de-sistemas-hvac-01.webp",
      "approved": false,
      "public_approved": false,
      "notes": "Ilustração técnica; não apresentar como prova de obra."
    },
    {
      "id": "img_76973014cdd3",
      "source": "site",
      "url": "https://raw.githubusercontent.com/danieloroocha-svg/thermicaclimatizacao/main/src/assets/seo/lei-do-pmoc-ar-condicionado-13589-01.webp",
      "approved": false,
      "public_approved": false,
      "notes": "Ilustração técnica; verificar direitos antes de aprovar."
    }
  ]
};
const SOURCE_PREFIX='https://raw.githubusercontent.com/danieloroocha-svg/thermicaclimatizacao/main/src/assets/';
export function instagramOnlyBook() {
  // Return a fresh copy so callers cannot modify the in-memory source catalog.
  const book=JSON.parse(JSON.stringify(BASE));
  validateQueue(book.queue);
  const ids=new Set();
  if(book.media.length>80||book.queue.length>80) throw new Error('Limite preventivo do catálogo');
  for(const m of book.media) {
    if(typeof m.id!=='string'||!/^img_[a-f0-9]{12}$/.test(m.id)||ids.has(m.id)) throw new Error('Mídia local inválida');
    ids.add(m.id);
    if(m.source!=='site'||typeof m.url!=='string'||!m.url.startsWith(SOURCE_PREFIX)||!/\.(jpe?g|webp|png)$/.test(m.url)) throw new Error('Fonte de mídia não autorizada');
    if(typeof m.approved!=='boolean'||typeof m.public_approved!=='boolean') throw new Error('Aprovação de mídia inválida');
  }
  for(const p of book.queue) {
    if(p.channels.length!==1||p.channels[0]!=='instagram') throw new Error('Modo Instagram não permite outros canais');
    if(!ids.has(p.media_id)) throw new Error('Publicação sem mídia cadastrada');
  }
  return book;
}
