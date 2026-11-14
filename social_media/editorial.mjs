import {createHash} from 'node:crypto';
export const themes=[
 ['vrf','Instalação VRF/VRV em São Paulo','A instalação de sistemas VRF/VRV exige compatibilização entre projeto, infraestrutura elétrica, tubulações e condições de operação. Definir esses requisitos no planejamento ajuda a organizar a execução em edifícios corporativos.'],
 ['retrofit','Retrofit de climatização','A avaliação de um retrofit começa pelo diagnóstico da instalação existente: capacidade, estado dos componentes, operação e limitações do edifício. O escopo de modernização deve partir desses dados.'],
 ['projetos','Projetos executivos de HVAC','Um projeto executivo de HVAC deve coordenar cargas térmicas, distribuição de ar, infraestrutura e acesso para manutenção. A compatibilização com as demais disciplinas ajuda a antecipar interferências.'],
 ['comissionamento','Comissionamento e testes funcionais','O comissionamento reúne inspeções, testes funcionais e registros dos parâmetros de operação. Critérios de aceitação definidos em projeto ajudam a avaliar a entrega técnica do sistema.'],
 ['pmoc','PMOC e manutenção técnica','O planejamento da manutenção deve considerar o inventário de equipamentos, as condições de uso e as responsabilidades técnicas aplicáveis. Registros consistentes apoiam o acompanhamento da instalação.'],
 ['eficiencia','Eficiência energética','Avaliar eficiência energética exige observar consumo, carga térmica, horários e condições de operação. Medições e diagnóstico técnico ajudam a identificar oportunidades sem prometer economias antes da análise.'],
 ['hospitalar','Climatização hospitalar e corporativa','Ambientes hospitalares e corporativos apresentam requisitos distintos de operação, qualidade do ar e manutenção. A solução de climatização precisa considerar o uso do ambiente e os requisitos técnicos aplicáveis.']
];
export function calendar({start, count=12,media=[],history=[]}) {
 if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!Number.isInteger(count)||count<1||count>52) throw new Error('Início ou quantidade inválida');
 const used=new Set(history); const out=[];const date=new Date(start+'T12:00:00Z');
 if(Number.isNaN(date.getTime())) throw new Error('Data inválida');
 for(let i=0;i<count;i++) {
  while(![2,4].includes(date.getUTCDay())) date.setUTCDate(date.getUTCDate()+1);
  const [key,tema,text]=themes[i%themes.length];const day=date.toISOString().slice(0,10);
  const image=media.find(m=>m.approved===true&&m.categories?.includes(key)&&!used.has(m.sha256));if(image) used.add(image.sha256);
  out.push({id:`${key}_${day}`,status:'rascunho',tema,texto:`${text} Converse com a THÉRMICA sobre o seu projeto: https://thermicaclimatizacao.com.br/`,channels:['instagram','facebook'],scheduled_at:`${day}T09:00:00-03:00`,media_id:image?.id||'',media_url:image?.public_url||'',media_sha256:image?.sha256||'',media_approved:!!image,editorial_hash:createHash('sha256').update(text).digest('hex')});date.setUTCDate(date.getUTCDate()+1);
 }
 return out;
}
