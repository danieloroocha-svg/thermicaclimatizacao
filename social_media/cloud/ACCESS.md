# Acesso mínimo para implantação sem publicar

O deploy está automatizado em `.github/workflows/social-media-deploy.yml`. Usa somente Cloudflare Workers Free e D1, sem DNS, conta de domínio ou APIs de contratação/upgrade. Sempre implanta `SOCIAL_PUBLISH_ENABLED=false` e `SOCIAL_AUTOMATION_PAUSED=true`. O proprietário já confirmou o plano gratuito; não ativar nenhum plano pago.

## Única preparação do titular

1. No painel Cloudflare: **My Profile → API Tokens → Create Token → Create Custom Token** (https://dash.cloudflare.com/profile/api-tokens).
2. Nome: `THERMICA-deploy`. Permissões no escopo **Account**:
   - **Workers Scripts → Edit**
   - **D1 → Edit**
   Em **Account Resources**, selecionar **Include → Specific account → sua conta THÉRMICA**. Sem permissões de zonas/DNS, faturamento, administração de usuários ou Global API Key. Escolher validade curta suficiente para implantação (por exemplo, sete dias). Não restringir por IP de runner efêmero. Esses escopos permitem provisionar o Worker e seu banco dentro da conta selecionada; o Cloudflare pode abranger outros Workers/D1 dessa conta, por isso o token deve expirar/revogar após o uso.
3. Em GitHub → repositório `danieloroocha-svg/thermicaclimatizacao` → **Settings → Secrets and variables → Actions → Repository secrets → New repository secret**:
   - `CLOUDFLARE_API_TOKEN`: colar ali o token recém-criado.
   - `CLOUDFLARE_ACCOUNT_ID`: colar ali o Account ID da mesma conta, disponível no painel Cloudflare/Overview.

Atalho para cadastrar: https://github.com/danieloroocha-svg/thermicaclimatizacao/settings/secrets/actions

Não enviar valores no chat, PR, issue, screenshot ou arquivo versionado. Não basta salvar Secrets no GitHub para que apareçam no shell do Codex: o workflow é quem os recebe. Basta informar no chat **“secrets cadastrados”**, sem valores; o engenheiro inicia o job por push seguro na branch do PR (workflow novo pode ainda não estar na branch padrão).

## O que o workflow faz

Executa os testes, cria/reutiliza somente `thermica-social-state`, aplica schema idempotente, configura workers.dev, implanta `thermica-social` pausado, cria somente as chaves internas ausentes via API de Secrets Cloudflare, preserva chaves anteriores e verifica health. No primeiro bootstrap testa também `/run` pausado e o relatório autenticado. Segredos gerados nunca são impressos ou salvos em artifacts/Git. A URL do worker e o resultado dos testes aparecem no resumo do job.

A ausência de token/account ID gera apenas um aviso de aguardando acesso; não executa deploy. Os Secrets só são expostos ao passo que implanta, não aos testes/dependências; checkout sem persistir credencial, job com `contents: read`, branches/repositório fixos, nenhum trigger de PR/fork com secrets. Reexecuções desse workflow continuam desligando publicação, por intenção explícita do proprietário. Não usar esse pipeline como atualização de um publicador já liberado sem revisar essa política.

A conexão Instagram/Google será concluída depois que houver um callback HTTPS efetivamente implantado. Ela não é necessária para criar banco e serviço pausado. Não pedir antecipadamente senhas de redes sociais. Para consentimento administrativo posterior, o token administrativo pode ser redefinido pelo engenheiro por API/secret manager autorizado; não é recuperável dos Secrets Cloudflare. Não girar a chave de cifra que protege o ledger.
