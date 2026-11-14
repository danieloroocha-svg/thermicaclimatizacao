# Instalação gratuita, conexões e ativação

Esta é a rota principal. `server.mjs` é uma alternativa local/legada: não é mais necessário manter servidor ou disco contratado. O worker serve callback HTTPS, executa cron, guarda estado AES-GCM no D1 e entrega somente JPEG aprovado com URL assinada por 48 horas. O preparo Pillow fica em runner Linux padrão do GitHub. Não existe API de IA paga.

## Uma etapa externa do proprietário

**Conectar as contas oficiais**, sem enviar senhas, chaves ou tokens pelo chat: entrar em uma conta Cloudflare no plano Workers Free, disponibilizar acesso de implantação limitado ao worker/D1, conceder à conta de serviço Google leitura da planilha/pastas e concluir o consentimento Meta pela página `/connect` do worker. Isso exige login/consentimento do titular e não pode ser feito legitimamente pelo código sozinho. O provisionamento técnico abaixo deve ser executado pelo engenheiro após esses acessos; o proprietário não precisa escolher arquitetura, formato, scheduler ou banco.

Não ativar publicação durante essa conexão. A autorização inicial explícita do primeiro calendário é separada e continua obrigatória; pode ser concedida pelo proprietário junto da conexão, indicando o calendário aprovado. Se não for concedida, manter envio desligado.

## Provisionamento técnico

Usar Wrangler **4.162.0** (testado), em instalação isolada ou `npx --yes wrangler@4.162.0`. Login interativo `wrangler login` somente pelo titular, ou API token restrito via secret manager. Nunca usar token global. Confirmar no painel **Workers Free**, sem habilitar Workers Paid, Images, R2 pago ou upgrade automático. Não criar serviço se a conta exigir assinatura paga.

1. Copiar `wrangler.example.jsonc` para `wrangler.jsonc` local ignorado pelo Git. Criar um D1 `thermica-social-state` com `wrangler d1 create thermica-social-state`, registrar seu UUID apenas no arquivo local e aplicar `wrangler d1 execute thermica-social-state --remote --config social_media/cloud/wrangler.jsonc --file social_media/cloud/schema.sql` a partir da raiz.
2. Instalar secrets no worker com `wrangler secret put NOME --config social_media/cloud/wrangler.jsonc` via entrada segura ou secret manager. Não colocar valores em flags shell, PR, commit ou logs:
   - `SOCIAL_ENCRYPTION_KEY`: 32 bytes aleatórios em hex; backup separado do banco.
   - `SOCIAL_ADMIN_TOKEN`, `MEDIA_SIGNING_KEY`: segredos aleatórios distintos de pelo menos 32 caracteres.
   - `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEET_ID`: JSON privado da conta de serviço e ID da planilha existente. Habilitar Sheets API e Drive API; compartilhar somente planilha/pastas necessárias como leitor. JWT RS256 de uma hora é renovado automaticamente em cada sincronização, sem autorização diária. Essa conta não recebe permissão de escrita e não altera sharing de arquivos.
   - `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI`.
   - `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, `FACEBOOK_PAGE_ID`, `FACEBOOK_REDIRECT_URI` (página pretendida explicitamente, nunca a primeira encontrada).
   - `PUBLIC_BASE_URL`: HTTPS do worker, sem barra final.
   - `ALERT_WEBHOOK_URL`: opcional, canal HTTPS privado previamente autorizado; mensagem genérica sem IDs/credenciais. Sem webhook, alerta continua disponível em `/report`; não alegar notificação externa instalada.
3. `wrangler deploy --config social_media/cloud/wrangler.jsonc`. Usar o subdomínio gratuito workers.dev; cadastrar o callback exato `https://SUBDOMINIO.workers.dev/oauth/callback` em ambos os fluxos Meta. Atualizar URI/base após conhecer o endereço. Não habilitar logs de requisição no proxy: query OAuth e URLs assinadas são sensíveis.
4. No app Meta configurar Instagram API with Instagram Login e Facebook Login/Pages conforme painel, conta profissional, acesso e App Review exigidos. Abrir `/connect`, informar o token administrativo no formulário local e autorizar cada rede. Cookie Secure/HttpOnly, state com expiração e uso único, autorização independente por canal. Não há publicação no callback. Não usar o token administrativo em links.
5. A planilha é lida pelas abas existentes **Resumo**, **Mídia do site**, **Mídia no Drive**, **Fila editorial**. O parser foi validado com exportação real em 14/11/2026 (3 rascunhos, 75 mídias). Nenhuma edição foi efetuada. A API ao vivo exige o compartilhamento com a conta de serviço; a conexão do Google Drive no chat não concede automaticamente acesso ao robô.
6. No environment GitHub `social-media`, cadastrar `SOCIAL_WORKER_URL`, `SOCIAL_ADMIN_TOKEN`, `GOOGLE_SERVICE_ACCOUNT_JSON` como Secrets, limitar deployment branches à branch do PR e main. Definir variável de repositório `SOCIAL_PREPARE_ENABLED=true` somente após as autorizações. Executar uma vez o workflow **THERMICA Social Media - Preparacao autonoma** na branch do PR. Preparação não publica; baixa fontes aprovadas, limita downloads a 15 MB, elimina EXIF, gera JPEG, calcula SHA-256 e envia ao cofre. Não cria artifacts/cache de dados privados.

Schedules do GitHub precisam existir na branch padrão. Enquanto este PR estiver em rascunho, não alegar que o cron GitHub está ativo: executar o preparo inicial por workflow_dispatch. Depois da inclusão manual/revisada do workflow na branch padrão, o preparo roda diariamente às 10:15 UTC / 07:15 São Paulo. Não fazer merge automático. O cron Cloudflare independe disso e pode operar a biblioteca já preparada e seus conteúdos recorrentes sem comando diário ou computador ligado. Mídias novas ainda exigem aprovação e preparo.

## Contrato da planilha e recorrência

Campos originais são preservados. `Uso aprovado?` aceita apenas sim/aprovado/true. No Drive, `Direito de uso` também precisa estar aprovado e é necessária uma coluna adicional **Publicação pública autorizada?** com sim; autorização de acesso ao Drive não é autorização de divulgação. O código não adiciona essa coluna automaticamente. Na mídia do site, aprovação de uso é autorização de publicar a derivação de uma imagem que já é pública. Para editar o inventário ou calendário, usar a planilha privada.

A fila usa IDs estáveis, legenda completa, canais separados por vírgula/ponto e vírgula, data ISO completa com fuso, situação e referência de imagem por ID de mídia. Para recorrência do material já aprovado, são suportadas colunas opcionais **Recorrente?** e **Intervalo dias** (30–366; default 90). Sem opt-in não há repetição automática. IDs dos ciclos são derivados da data âncora, impedindo duplicação em reexecuções. Preparar um conjunto de legendas/imagens aprovado uma única vez; o calendário privado é calculado a cada ciclo, sem gerar alegações novas ou depender de IA paga. Reutilização de legenda tem intervalo mínimo de 90 dias por canal; imagem, 30 dias. Se o pool não comportar a cadência, o sistema bloqueia em vez de inventar conteúdo.

O serviço sincroniza as quatro abas a cada 30 minutos; Sheets indisponível bloqueia envio, sem continuar usando aprovação antiga indefinidamente. A leitura é limitada a 2.000 linhas/aba e 26 colunas; limite atingido interrompe para não truncar silenciosamente. Alteração de fonte ou revogação de aprovação invalida o asset. URLs de fontes aceitas pelo preparador: domínio oficial e arquivos do próprio repositório; Drive por API autenticada. Sem redirects que possam carregar Authorization a terceiros.

## Ativação e operação

Somente após consentimento Meta e autorização explícita do calendário: preencher `SOCIAL_CALENDAR_APPROVED_AT` com data ISO dessa autorização e mudar `SOCIAL_PUBLISH_ENABLED=true` no config privado, redeploy. Cada item também precisa de status aprovado e mídia aprovada. Começar com um item/canal piloto, verificar recibo real, então liberar o lote previamente autorizado. A homologação real não foi executada nesta implementação.

Cron a cada 30 minutos, 48 ciclos/dia; teto de 60 ciclos/dia, uma tentativa de publicação por ciclo, até dois recibos rechecados por ciclo e até quatro consultas incluindo reconciliação. Um canal pendente não trava permanentemente os demais. Datas vencidas há mais de 168 horas são bloqueadas por padrão. Ajustar por política editorial, nunca por erro de parser. Limite de 80 assets ativos e teto preventivo de 100 MB de ciphertext no D1; até 400 KB/JPEG e 12 imagens por preparo. Limites excedidos falham fechados, sem contratar capacidade.

`GET /report` com Bearer administrativo mostra recibos, último ciclo, sincronização, pausa e contadores de ciclos/sync/publicações. Contadores são consumo lógico do robô, **não faturamento medido da conta Cloudflare**. Conferir painel do provedor; não há integração com Billing. `POST /pause` pausa de forma persistente; `POST /resume` remove a pausa, respeitando os switches e aprovação. `SOCIAL_AUTOMATION_PAUSED=true` impede todo ciclo antes de acessar o banco. Envio já em voo pode terminar. Revogar token na Meta em emergência.

Tokens Instagram são renovados quando faltam sete dias, respeitando 24h mínimas. Tokens Pages não têm refresh token: são derivados de user token longo, validados via debug_token na conexão e consultados diariamente; expiração de token/data_access ou revogação exige novo consentimento. Token sem expiração declarada pode ser invalidado por mudanças de acesso; não prometer perpetuidade.

## Segurança, reconciliação e recuperação

AES-256-GCM vincula ciphertext ao nome da linha (AAD). Lease D1 de cinco minutos tem dono aleatório e fencing em cada escrita; todos os gravadores usam a mesma lease, exceto leitura de JPEG que não bloqueia o fetch da Meta durante publicação. Estado `publishing` é gravado e confirmado **antes** da chamada externa. Se execução morre, um novo processo espera a expiração e encontra esse estado; não envia novamente. Falha de persistência antes de enviar impede a chamada.

Envio incerto consulta a API oficial: Instagram exige container PUBLISHED e uma legenda idêntica em janela estreita; Facebook procura legenda exata no período da tentativa. Somente uma correspondência, sem paginação pendente, produz recibo. Ausência/ambiguidade nunca autoriza retry. Isso privilegia não duplicar: casos ambíguos permanecem bloqueados e geram alerta, exigindo conferência humana rara, não intervenção diária. Nenhuma API oferece transação atômica conjunta com D1. Edição de legenda/imagem depois da tentativa é bloqueada; não apagar ledger para contornar erro.

Fazer backup privado do D1 e guardar chave separada; restaurar chave errada bloqueia autenticação dos registros. Não há agendamento de backup externo provisionado por este PR. Em desastre, não reativar a fila sem conferir os recibos na Meta: perda/restauração antiga de ledger pode causar duplicação. Rotação de chave exige migrar ciphertext com chave antiga, sem apagar estado ou expor plaintext. Não copiar D1 ou tokens para Git/artifacts públicos.

## Limites gratuitos conferidos em 14/11/2026

- Workers Free: 100.000 requisições/dia e 10 ms de CPU por execução, inclusive cron. HTTPS workers.dev e cron estão incluídos. I/O de rede não equivale a CPU; o teste local **não comprova** consumo de CPU em produção. Homologar pelo painel no plano Free. Se ultrapassar, reduzir lote/carga e bloquear; não fazer upgrade pago.
- D1 Free: 5 milhões de linhas lidas/dia, 100.000 escritas/dia e 5 GB totais da conta. Outros aplicativos compartilham a franquia. O teto preventivo não mede a franquia global da conta. Exceder franquia Free provoca falha de serviço; esta implementação não habilita cobrança/upgrade.
- GitHub: runners padrão Linux em repositório público são gratuitos; não usar larger runners ou artifacts privados. O workflow de preparo dura no máximo oito minutos/dia. GitHub pode atrasar/desativar schedules por suas políticas; a publicação não depende de runner ativo continuamente.

Fontes oficiais consultadas:
https://developers.cloudflare.com/workers/platform/pricing/
https://developers.cloudflare.com/workers/platform/limits/
https://developers.cloudflare.com/d1/platform/pricing/
https://docs.github.com/en/billing/concepts/product-billing/github-actions

## Validação e bloqueios reais

Testes sem rede social real: `node --test social_media/tests.mjs social_media/runtime-tests.mjs social_media/cloud-tests.mjs`. Smoke do workerd: instalar Wrangler isoladamente e executar `WRANGLER_BIN=/caminho/wrangler node social_media/smoke-cloud.mjs`. O smoke cria banco/config temporários sintéticos e não faz deploy. CI do PR executa ambos. Composição Pillow 13.0.0 validada localmente; imagem sintética de teste não é material editorial.

Bloqueios externos restantes: conta/acesso Cloudflare Free, service account Google compartilhada, app Meta e consentimento das redes, aprovação de mídia/calendário. Sem esses acessos não afirmar que o robô foi implantado ou autenticado. LinkedIn continua preparado como canal, sem envio real. Não foram realizados deploy, post ou merge em main.
