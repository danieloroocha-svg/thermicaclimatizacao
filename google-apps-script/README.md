# THÉRMICA — Leads do site → Google Sheets → Notificação por e-mail

**Projeto:** integração opcional para centralizar leads na planilha do Drive, mantendo o Supabase/Lovable como sistema primário.

**Planilha pronta:** https://docs.google.com/spreadsheets/d/1WYubJjCMUOg2abTbxSvEVPdlzVaPwt1r8hUCNKAC0mo/edit

**Conta de destino:** comercial@thermicaclimatizacao.com.br

## Passo manual obrigatório na conta Google

1. Abra a planilha acima e escolha **Extensões > Apps Script** (preferencialmente num navegador de computador).
2. No editor, substitua o conteúdo de `Code.gs` pelo código de [Code.gs](./Code.gs). Salve.
3. Na lista de funções, selecione **`testarIntegracao`** e clique **Executar**. Autorize acesso à planilha e ao MailApp quando o Google pedir. Isso grava uma linha de teste e tenta enviar um e-mail a `comercial@thermicaclimatizacao.com.br`. Verifique a coluna S (Notificação por e-mail) e a caixa de entrada/spam.
4. Opcional, recomendado: selecione **`instalarRecuperacao`**, execute e autorize. Cria um gatilho de 15 em 15 minutos para tentar novamente e-mails com status de falha, sem repetir leads já notificados.
5. Clique **Implantar > Nova implantação > Tipo: Aplicativo da Web**. Configure **Executar como: Eu** e **Quem tem acesso: Qualquer pessoa**, confirme e copie a URL publicada terminada em `/exec`. **Não use** URL de teste `/dev`.
6. Informe a URL `/exec` nesta conversa. Ela será preenchida na constante `GOOGLE_LEADS_WEB_APP_URL` em `src/lib/lead-sheet-sync.ts` e a alteração do site poderá ser implantada após conferência.

**ATENÇÃO:** o conector do Google Drive permite editar a planilha, mas não implantar o Apps Script nem aceitar as autorizações OAuth em seu nome. Os passos acima devem ocorrer na sua conta.

## O que já está preparado no GitHub

- `src/components/contact-form.tsx`: após a confirmação de INSERT em `contact_requests` do Lovable, espelha os campos no Google.
- `src/components/whatsapp-button.tsx`: após INSERT em `whatsapp_leads`, espelha os campos com origem da página.
- `src/lib/lead-sheet-sync.ts`: envio via `navigator.sendBeacon` com `text/plain` e fallback `fetch` `no-cors`; não bloqueia cadastro original nem ida ao WhatsApp.
- `Code.gs`: valida campos, evita duplicatas por UUID, protege texto de injeção de fórmula, registra na planilha, envia e-mail e marca status na coluna S.

**Atenção sobre confirmação:** o navegador não recebe uma resposta verificável do Google Apps Script por requisição cross-origin `no-cors`. O aviso de sucesso do formulário diz respeito ao registro no Supabase; o salvamento na planilha e e-mail só são confirmados ao examinar a planilha e a caixa postal. O site continuará com banco Supabase como contingência.

## Limitação de segurança antes da produção

Implantações de Apps Script do tipo **Qualquer pessoa**, com URL incorporada ao código do navegador, não possuem autenticação forte de origem. Ter campos validados e deduplicação reduz erros comuns, mas não impede spam por quem encontre a URL pública. Para tráfego elevado ou se ocorrer abuso, adicionar backend autenticado com segredo **somente no servidor** e proteção anti-bot. Não inventar nem armazenar segredos no GitHub.

Nenhum dado de lead real foi migrado automaticamente do Supabase para o Drive. A integração aplica-se apenas a novos envios depois de habilitada.

## Roteiro de aceite

1. Confirme execução de `testarIntegracao`: exatamente uma linha de teste em `Leads` e um e-mail recebido. Remova depois a linha sintética, se desejar.
2. Atualize URL e faça implantação do site (Hostinger/Lovable, conforme ambiente real de produção).
3. Envie um cadastro sintético pelo site em `/contato`, usando e-mail que você controla: confirme registro no painel do Supabase, linha na planilha, e-mail e estado `Enviado` na coluna S.
4. Envie outro cadastro de teste pelo popup do WhatsApp: confirme segunda linha, canal WhatsApp, URL de origem, e-mail e encaminhamento à conversa.
5. Se a planilha não registrar, verificar na conta Google **Apps Script > Execuções** e configuração de acesso do aplicativo web. Se registro existir mas e-mail não chegar, verificar coluna S, quotas do MailApp e spam.

Guia do Google: https://developers.google.com/apps-script/guides/web
