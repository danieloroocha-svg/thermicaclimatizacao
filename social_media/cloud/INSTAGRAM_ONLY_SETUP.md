# THÉRMICA — ativação somente Instagram (sem Work)

## O que já existe

- Cloudflare Workers Free + D1, publicado em `workers.dev` com execução agendada de 30 em 30 minutos
- Fonte editorial integrada ao próprio repositório: `social_media/instagram-only.mjs`
- Três rascunhos de Instagram com três imagens distintas existentes no site, **todos sem aprovação**
- OAuth oficial com Instagram Login, cifragem e recibos/antiduplicação
- Publicação real **desligada** e automação **pausada** pelo instalador, mesmo após deploy
- Testes do modo local sem `GOOGLE_*` ou `FACEBOOK_*`

Este modo usa `SOCIAL_SOURCE_MODE=instagram_only`. As integrações Google e Facebook permanecem no código, mas não são requisitos de execução do Instagram. O manifesto integrado é estático e só muda quando uma versão revisada for implantada.

## Verificação sem credenciais

Localizar a URL `https://thermica-social.<subdominio>.workers.dev` nos logs da execução mais recente do workflow `THERMICA Social Media - Implantar pausado`. Verificar `GET /health`: deve retornar `{"status":"ok","source":"github"}`. Health confirma serviço, **não confirma** login Instagram nem aprovação de calendário.

## Únicas ações externas ainda obrigatórias

1. **Meta for Developers**: criar/configurar o aplicativo e o produto `Instagram API with Instagram Login` para a conta Instagram profissional proprietária. Definir o redirect HTTPS EXATO `https://thermica-social.<subdominio>.workers.dev/oauth/callback` e autorizar somente `instagram_business_basic` e `instagram_business_content_publish`. Validação/App Review depende das exigências da conta e do painel Meta; sem autorização real não publicar.
2. **Cloudflare Worker Secrets**: configurar por interface segura do Cloudflare `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI` e confirmar `PUBLIC_BASE_URL` (esse é variável não secreta). Nunca colocar valores no repositório, chat, logs ou capturas.
3. **Acesso administrativo da página /connect**: o instalador criou `SOCIAL_ADMIN_TOKEN` aleatório, mas Cloudflare não permite ler secrets de volta. Para usar a página, o proprietário deverá substituir **somente** `SOCIAL_ADMIN_TOKEN` por um novo segredo forte em Cloudflare → Worker → Settings → Variables and Secrets, guardá-lo em seu gerenciador de senhas, e usar esse valor no formulário HTTPS `/connect`. Isso não altera `SOCIAL_ENCRYPTION_KEY`, que **nunca** deve ser trocada sem migração de dados. Não é preciso entregar o token ao Codex/ChatGPT.
4. **Autorização editorial e imagem**: o proprietário aprova explicitamente os direitos das imagens selecionadas, as três legendas e o calendário; sem isso os arquivos permanecem em `rascunho` e `approved: false`. Só então modificar o manifesto, aprovar a agenda, preparar JPEG e validar um post piloto. É vedada aprovação implícita por login.

As etapas 1-3 exigem interação com contas pessoais e não são acessíveis apenas pelo GitHub. O sistema não conhece a senha do Instagram. O Instagram autoriza por tela oficial.

## Mídia

As fontes de `instagram-only.mjs` são arquivos WebP já públicos no site. Para a API Instagram é necessário preparar JPEG válido e hospedá-lo em HTTPS. O preparador existente em `social_media/prepare-media.mjs` suporta fontes `site` sem conta Google: consulta `POST /prepare`, baixa só imagens publicamente aprovadas, converte com Pillow e envia ao cofre D1 por `POST /assets`.

Para automatizar o preparador via GitHub Actions, ainda serão necessários `SOCIAL_WORKER_URL` e `SOCIAL_ADMIN_TOKEN` em um **environment secret** privado `social-media` do repositório, e ativar a variável `SOCIAL_PREPARE_ENABLED=true`; os valores não são exigidos para implantar o Worker pausado. **Atenção**: o admin token deve ser introduzido somente via interface Secrets, jamais em prompt. O cron GitHub de preparo só opera se o workflow estiver na branch padrão, mediante merge revisado. A preparação pode ser executada manualmente depois de aprovar o material, sem publicação real. Não usar imagens de obras como provas de execução sem autorização.

## Ativação real

**Não alterar** `SOCIAL_PUBLISH_ENABLED`, `SOCIAL_AUTOMATION_PAUSED` ou `SOCIAL_CALENDAR_APPROVED_AT` sem aprovação explícita do proprietário do conteúdo e da publicação piloto. O deploy de segurança sempre restaura `false/true` para `SOCIAL_PUBLISH_ENABLED/SOCIAL_AUTOMATION_PAUSED`; é intencional. Planejar promoção de ambiente por workflow diferente ou configuração privada revisada, sem fazer merge automático do PR. O serviço é seguro ao falhar: sem OAuth, JPEG, aprovação de mídia ou calendário não publica.

Depois de autorizar e homologar um post piloto, conferir o recibo de publicação em `GET /report` (Bearer admin). Só então liberar o calendário autorizado. O cron Cloudflare não depende do Work ou Codex aberto, mas depende da continuidade de acesso à conta Meta e da franquia gratuita. O material local **não cria textos novos indefinidamente**: sem novas variantes aprovadas, o agendador bloqueia repetição excessiva.

## Segurança

- Repositório do site permanece público; não colocar chaves ou arquivos privados nele
- Rotacionar o token Cloudflare de bootstrap após a implantação; expiração de sete dias foi solicitada pelo proprietário
- Não ativar plano pago nem publicar sem autorização expressa
- Preservar main, site e Lovable
