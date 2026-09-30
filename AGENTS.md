<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Regras do projeto

- Toda cor vem de token do tema em `src/styles.css` (`--primary` azul, `--accent` laranja, `--whatsapp` / `--whatsapp-strong` / `--whatsapp-foreground`); nunca hex ou utilitário de cor fixo em componente — mantém o MIV e o modo escuro coerentes.
- O atendimento por WhatsApp é um único componente global (`src/components/whatsapp-button.tsx`, renderizado no `SiteShell`) que grava em `public.whatsapp_leads` e monta a mensagem a partir de `document.title` no clique — assim páginas novas não exigem mudança de código.
