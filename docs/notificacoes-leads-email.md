# Notificações por e-mail dos leads — THÉRMICA

## Diagnóstico (03/11/2026)

O componente `src/components/contact-form.tsx` grava solicitações em `public.contact_requests`.
O componente `src/components/whatsapp-button.tsx` grava contatos em `public.whatsapp_leads`.
A gravação **não** envia notificações por e-mail. Os registros podem ser consultados em
`/painel` após login com a conta comercial autorizada.

Esta alteração adiciona a Edge Function `notify-new-lead` para enviar um e-mail automático
**após cada INSERT no banco**, por meio de dois Database Webhooks do Supabase.
O site não precisa enviar e-mails diretamente, nem expor credenciais de e-mail no navegador.

**Importante:** abrir o PR/mesclar o código **não ativa sozinho** o envio: é preciso
configurar o provedor de e-mail, implantar a função e habilitar os dois webhooks.
Não inserir API keys, senha de SMTP ou secret keys em commits, arquivos públicos ou
variáveis `VITE_*`.

## Ativação

1. Confirmar que a caixa `comercial@thermicaclimatizacao.com.br` funciona e recebe e-mails.
2. Criar uma conta no [Resend](https://resend.com), verificar a propriedade do domínio
   `thermicaclimatizacao.com.br` e publicar no DNS da Hostinger os registros indicados
   pelo Resend. Criar uma API key de envio.
3. No projeto Supabase vinculado (`cmmkkhvaedjnkgcpjsbu`), configurar em
   **Edge Functions > Secrets** os valores abaixo (preencher com dados reais):
   - `RESEND_API_KEY`: chave privada do Resend;
   - `LEAD_NOTIFICATION_FROM`: remetente no domínio verificado, por exemplo
     `THÉRMICA <notificacoes@thermicaclimatizacao.com.br>`;
   - `LEAD_NOTIFICATION_TO`: `comercial@thermicaclimatizacao.com.br`.
4. Implantar a função `notify-new-lead` deste repositório no projeto Supabase.
   Com CLI autenticada e código local atualizado:
   `supabase functions deploy notify-new-lead --project-ref cmmkkhvaedjnkgcpjsbu`.
   A configuração de `supabase/config.toml` define `verify_jwt = false`,
   indispensável para o webhook autenticado com uma **secret key**.
5. Em **Database > Webhooks** do Supabase, criar *dois* webhooks:
   - `thermica_contact_requests_insert`: tabela `public.contact_requests`,
     evento **INSERT**, destino **Supabase Edge Functions > notify-new-lead**, método POST;
   - `thermica_whatsapp_leads_insert`: tabela `public.whatsapp_leads`,
     evento **INSERT**, mesmo destino e método.
   Para ambos, em **HTTP Headers**, escolher **Add secret key**. Usar uma secret key
   do projeto (não a chave publishable) e manter `Content-Type: application/json`.
   Nunca colocar a secret key no código do site.
6. Enviar uma solicitação **de teste** pelo formulário em `/contato` e um contato
   de teste pelo popup de WhatsApp. Verificar, em ambos os casos:
   - se cada registro entrou na tabela correta do Supabase;
   - se chegou **um** e-mail ao endereço comercial, incluindo nome, empresa,
     telefone, e-mail e os campos de contexto;
   - se a função mostra execução bem-sucedida em **Edge Functions > Logs**.
   Revisar a caixa de spam e a verificação do remetente se não chegar e-mail.

## Como diagnosticar falhas

- **Não aparece lead na tabela:** revisar `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`,
  políticas RLS, Storage (quando houver arquivo) e erros de envio do navegador.
  O e-mail não corrige uma falha anterior à gravação.
- **Lead aparece na tabela, mas não chega e-mail:** verificar webhook ativo,
  eventos INSERT, cabeçalho `apikey` com secret key, logs da Edge Function,
  configuração `RESEND_API_KEY`, domínio verificado e status do provedor.
- **E-mail não entregue apesar de API responder com sucesso:** consultar eventos
  e logs de entrega no painel Resend; aceitação pela API não garante caixa de entrada.
- **Registros antigos:** a integração notifica somente *novos* inserts. Os anteriores
  continuam consultáveis no banco/painel e não devem ser reenviados sem controle.
- **Confiabilidade:** o webhook é assíncrono; falha na notificação não exclui
  o lead já gravado. Conferir periodicamente o painel como contingência.

## Dados e segurança

As informações do cliente estão no banco privado do Supabase e no e-mail comercial.
A função escapa HTML recebido de usuários, exige autenticação por secret key,
não envia anexos no e-mail e usa o ID do registro como chave de idempotência
para evitar duplicatas por reentrega em janela suportada pelo Resend.
A política de privacidade do site deve refletir o processamento e as notificações.

Fontes técnicas: https://supabase.com/docs/guides/database/webhooks e
https://supabase.com/docs/guides/functions/auth
