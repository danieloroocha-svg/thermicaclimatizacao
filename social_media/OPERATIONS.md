# Operação e limites — runtime local anterior

**Atualização:** a rota principal passou a ser Cloudflare Workers Free + D1, sem servidor permanente contratado. Ver [cloud/SETUP.md](cloud/SETUP.md). As limitações abaixo descrevem a implementação c74c1af, anterior à continuidade do PR, e não substituem o guia atual.

## Estado verificável

O PR continua sendo piloto: nenhuma publicação real, nenhuma conexão OAuth concluída, nenhum servidor contratado ou agendamento de publicação ativado. O serviço implementado precisa de um host HTTPS sempre ligado e volume privado persistente. Não depende do computador do proprietário depois de hospedado. O workflow existente executa testes/prévia; schedules do GitHub só passam a operar quando presentes na branch padrão. Não usar artifacts públicos, cache ou commits como banco de tokens/recibos.

Implementado: OAuth Instagram Login, troca para token longo e renovação, cofre AES-256-GCM, worker Instagram e Facebook, recibos, lock de instância única, calendário determinístico, leitura Google paginada, composição JPEG local e testes com mocks. LinkedIn permanece canal previsto, sem publicador. Recibos Instagram são reconsultados diariamente enquanto o worker está habilitado. Não há métricas de alcance/engajamento. O catálogo do site existente continua preservado; o leitor Drive/Sheets não foi executado com conta real nem está conectado automaticamente à fila.

## Serviço

Node 22+, sem dependências npm adicionais. `node social_media/server.mjs`. Variáveis obrigatórias:

- `SOCIAL_DATA_DIR`: diretório em volume privado, proprietário do processo, modo 0700.
- `SOCIAL_ENCRYPTION_KEY`: 64 caracteres hex aleatórios; armazenar em secret manager separado do volume. Perder essa chave impede recuperação; rotação requer recriptografar os arquivos.
- `SOCIAL_ADMIN_TOKEN`: segredo aleatório de pelo menos 32 caracteres.
- `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI`: configuração do app Meta; callback HTTPS exato `/oauth/callback`.
- `SOCIAL_QUEUE_PATH`: JSON privado conforme queue.example.json e campos de mídia abaixo.
- `META_API_VERSION`: versão Graph suportada pelo aplicativo (default v25.0; validar no painel).
- `SOCIAL_PUBLISH_ENABLED`: default desligado; somente `true` habilita envio.
- `SOCIAL_CALENDAR_APPROVED_AT`: preencher data da autorização explícita inicial do proprietário.

Configurar uma única réplica com disco montado em `/data`, gravável pelo UID do usuário `node` (1000). Dockerfile deve usar contexto da raiz. TLS no proxy, proibir logs de query strings/Authorization, acesso administrativo restrito. Backup cifrado externo ao host; não contratar serviço pago sem consentimento. O timer verifica a fila a cada minuto enquanto o processo está vivo. Supervisor deve reiniciar o serviço e monitor externo deve verificar `/health` e `/report`; esses recursos externos ainda não foram provisionados.

## Autorização Meta

1. Proprietário cria/configura aplicativo Meta com Instagram API with Instagram Login, confirma conta profissional, redirect HTTPS e requisitos do painel (App Review/Advanced Access conforme contas atendidas). Esses itens não podem ser comprovados sem acesso ao app.
2. No MESMO navegador que fará o consentimento, um console administrativo privado envia POST `/oauth/start` com header `Authorization: Bearer ...` e segue `authorization_url`. O cookie HttpOnly/Secure emitido deve permanecer nesse navegador. Não expor token administrativo em URL, repositório ou console compartilhado.
3. Somente `instagram_business_basic` e `instagram_business_content_publish` são pedidos. Callback verifica state de uso único e cookie, troca tokens e grava no cofre. Recusa não habilita publicação.
4. Token longo normalmente tem duração de 60 dias e só é renovável após 24h. O worker renova a menos de sete dias da expiração quando ativado. Token expirado requer novo consentimento. Verificar duração retornada pela API, nunca presumir validade permanente.

Documentação consultada: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login/ (HTTP 200 em 14/11/2026). Referências complementares para homologação real: https://developers.facebook.com/docs/instagram-platform/content-publishing/ e https://developers.facebook.com/docs/pages-api/posts/.

Instagram Login não fornece token de Página Facebook. O conector Facebook requer autorização Pages própria (`pages_show_list`, `pages_read_engagement`, `pages_manage_posts` conforme fluxo Meta). Não solicitar esses escopos pelo OAuth Instagram. O fluxo OAuth Pages ainda precisa ser implementado/homologado; o método de publicação já aceita token oficial de Página via cofre interno `tokens.facebook = {page_id, access_token}`. Nunca enviar token via fila.

## Conteúdo e mídia

`calendar({start:'2026-11-16',count:12,media:[...]})` em editorial.mjs cria rascunhos terça/quinta às 09h America/Sao_Paulo, offset atual -03. Aprovar textos-base e direito de uso uma vez antes de liberar um calendário. Seleção só considera mídia explicitamente aprovada e categorizada. Não há reposição automática infinita: gerar e revisar próximo lote antes do fim; textos idênticos são bloqueados no mesmo canal, exigindo variações editoriais adicionais.

Mídia para publicação exige `media_approved: true`, `media_url` HTTPS pública de JPEG validado e `media_sha256` do arquivo final. Hospedagem pública deve ser autorizada. O worker não baixa nem prova tipo, resolução, disponibilidade ou direitos da URL: homologar arquivo e hosting antes de ativar. O digest é informado pela etapa de preparação. A API confirma aceitação do container. Intervalo de reutilização de imagem: 30 dias no mesmo canal; legenda idêntica é bloqueada permanentemente. Canais são tratados separadamente.

`python3 social_media/compose.py FOTO SAIDA.jpg --title 'Projetos executivos de HVAC'` usa Pillow e fonte DejaVu, remove EXIF e produz 1080x1350. Instalar Pillow no ambiente de preparação (não necessário no serviço Node). As cores são derivadas dos tokens existentes em src/styles.css. O teste com favicon é apenas prova técnica de renderização, não material aprovado para postagem.

`integrations.mjs` lê imagens de uma pasta Drive e ranges Sheets com token OAuth Google fornecido pelo secret manager. Não torna arquivos privados públicos. Escopos mínimos de leitura: drive.readonly e spreadsheets.readonly; refresh Google e sincronização editorial automática ainda pendentes. MD5 do Drive é metadado; baixar arquivo aprovado e calcular SHA-256 antes da fila. Nunca versionar resultados privados.

## Falhas, recibos e desligamento

GET `/report` autenticado retorna status, identificador e URL quando disponíveis. POST `/run` autenticado dispara um ciclo. Health é público e não contém estado privado. Não há retentativa cega de publicação: estado `publishing` é persistido ANTES do envio; timeout ou interrupção deixa `uncertain`/`publishing`, bloqueando reenvio. Conferir na rede social e reparar ledger por procedimento privado antes de liberar item; reconciliação automática e alertas externos ainda pendentes. Container em processamento é consultado no ciclo seguinte. Erros 429/5xx de consulta/criação voltam no ciclo seguinte (um minuto), sem loop imediato. Criação duplicada de container após timeout não publica por si só.

Se erro ocorrer depois do recibo mas antes de obter permalink, o ID publicado permanece salvo; o ciclo seguinte tenta recuperar a URL pelo ID e depois revalida diariamente. O relatório é operacional, não análise de desempenho. Para parar: `SOCIAL_PUBLISH_ENABLED=false` e reiniciar; envio já em voo pode terminar. Conferir recibos antes de rollback. Lock residual após crash exige confirmar ausência de processo antes de removê-lo. Disco cheio/corrompido bloqueia execução; testar recuperação de backup no host escolhido.

## Segurança do repositório

O .env já versionado contém nomes de configuração Supabase, inclusive publishable keys, que não são por si só credenciais administrativas. Nenhum valor foi copiado para logs/documentos. Não houve auditoria de RLS nem de todo o histórico, portanto não declarar ausência total de segredos. Valores privilegiados eventualmente encontrados devem ser rotacionados; apagar arquivo não revoga valores históricos. Não alterado fora do escopo autorizado.

## Validação

`node social_media/tests.mjs` e `node social_media/runtime-tests.mjs`: 16 testes, sem post real. Cobrem fila, fuso, mocks Meta, persistência cifrada, exclusão mútua, pausa, retomada, duplicação, timeout e renovação. Composição executada com Pillow local. Ainda requer homologação OAuth ponta a ponta, arquivo público aprovado, autorização inicial de publicação e provisionamento do host. Nenhum custo de geração IA adicionado.
