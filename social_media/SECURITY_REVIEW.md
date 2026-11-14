# Revisão de segurança do piloto

Escopo: código social_media, workflows dedicados e versões do `.env` alcançáveis nos refs locais clonados do GitHub em 14/11/2026. Sem alteração do site, main, banco Supabase ou histórico publicado.

## Correções verificadas

- Data impossível ou sem horário não passa mais pela normalização de Date.parse. Testes incluem fevereiro impossível, ano bissexto, hora 24, segundos 60 e offset inválido.
- OAuth Instagram e Pages têm state/cookie com uso único, TTL e escopos separados. Callback não ativa publicação. Tokens não são retornados ao navegador.
- Cofre D1 AES-GCM usa AAD por nome de registro. Lease expira e fencing impede escrita tardia por processo anterior; gravação de publishing antecede rede. Leitura da mídia não tenta adquirir a lease do publicador, evitando bloqueio no fetch da Meta.
- Teste real em workerd detectou e corrigiu necessidade de Buffer explícito na cifra. Smoke cobre persistência no runtime, além dos mocks em Node.
- Workflow com secrets só permite dispatch/schedule em branch confiável do repositório original, environment dedicado e chave de ativação. PR/fork não recebe secrets. Checkout não conserva credenciais; não há artifacts ou upload público de mídia privada. CI de testes não usa secrets de produção.
- Drive privado não vira público por consentimento de leitura. Campo separado de autorização pública obrigatório. URLs temporárias assinadas só servem assets ainda aprovados. Download limita bytes e não segue redirects. Inventário/recibos/credenciais não entram no Git.
- Falhas 429/5xx não acionam reenvio cego. Retry ocorre no próximo cron, com tentativas limitadas por ciclo e orçamento diário. Container terminal falho não prende todos os demais itens.

## .env e histórico

Foi encontrada uma revisão do `.env` nos refs alcançáveis. Classificação feita em memória, sem imprimir valores: duas publishable keys Supabase e quatro entradas de metadados de configuração. Não foi detectado service_role/sb_secret nesses valores. Publishable keys são destinadas ao cliente; sua presença não comprova acesso administrativo nem dispensa RLS correta.

Não se alterou o arquivo para evitar impacto no build/site autorizado. Essa inspeção não é auditoria de todos os blobs, refs apagados, logs externos, políticas RLS ou permissões do Supabase. Se credencial privilegiada for descoberta em qualquer desses locais, revogar/rotacionar; exclusão do Git atual não revoga histórico. Não declarar ausência absoluta de segredos.

## Riscos residuais e bloqueios

- App Review, conta profissional, consentimento, IDs de destino e tokens reais ainda não homologados. Não publicar sem autorização inicial do calendário.
- Cloudflare Free não implica capacidade ilimitada. Homologar CPU (10 ms), cotas globais da conta e tamanho do estado. Excesso bloqueia; não escalar para plano pago automaticamente.
- Um sistema externo e D1 não partilham transação. Reconciliação com legenda e janela estreita só aceita evidência única; operação ambígua permanece bloqueada. Recuperação de backup antigo requer conferir Meta antes de reativar.
- A lease dura cinco minutos; chamadas e lotes são limitados. Publicação em voo pode terminar após pausa. Fencing impede atualizar estado com lease vencida; o recibo será reconciliado, nunca reenviado automaticamente.
- Não habilitar logs de URL/query/headers em proxy ou plataforma. `ALERT_WEBHOOK_URL` deve ser privado e autorizado. Não há webhook provisionado sem configuração.
- Chave perdida impede decifrar estado; chave comprometida requer migração cifrada e rotação de tokens. Backup externo ainda precisa ser configurado na conta do proprietário.
- Monitor de health externo e billing real não estão instalados. Report registra consumo lógico e falhas, não métricas publicitárias nem faturamento da conta.
- LinkedIn continua sem publicador. Schedules GitHub só operam na branch padrão; nenhum merge automático será feito para contornar essa regra.
