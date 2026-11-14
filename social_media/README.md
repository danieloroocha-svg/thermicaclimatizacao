# THÉRMICA — Social Media Bot (piloto seguro)

Este módulo é independente do site THÉRMICA. Não altera o front-end, o banco de dados ou o fluxo Lovable. O objetivo do piloto é indexar mídia já existente e preparar uma fila editorial para agendamento sem custos de geração de imagens.

## Resultado do inventário em 13/11/2026

- **443** arquivos de imagem referenciados no GitHub do site
- **55** conteúdos binários distintos por SHA Git (muitos caminhos são duplicações exatas)
- `catalog/site-all.csv`: caminhos completos e hashes
- `catalog/site-unique.csv`: um caminho principal por conteúdo distinto
- `catalog/site-unique.json`: catálogo detalhado, com aliases e URL pública de referência

Os links do Google Drive não são copiados para este repositório **público**. O catálogo interno do Drive deve permanecer em uma planilha particular. Links brutos do GitHub são **referências de origem**, não URLs de publicação garantidamente aceitas pelas APIs das redes.

## Uso

O projeto usa apenas Node.js 22+ e bibliotecas nativas, sem contratação de API de IA:

```bash
node --test social_media/tests.mjs
node social_media/runner.mjs
```

A segunda linha exibe um relatório de prévia da fila (nenhum post é publicado). Os itens exemplo estão em `queue.example.json` com status `rascunho`.

### Fluxo editorial

1. Conferir a licença, a autorização e a qualidade visual de cada imagem.
2. Elaborar a legenda e o CTA; conferir afirmações técnicas.
3. Definir canais e data em ISO 8601 com fuso explícito, e alterar status para `aprovado`.
4. Rodar prévia. O módulo ignora itens `rascunho`, fora da data e com ID duplicado.
5. Só numa etapa posterior: vincular páginas/redes por OAuth, manter credenciais em Secrets, validar formatos de imagem e um ledger de idempotência **privado** antes de liberar publicações reais.

## Segurança e limites atuais

- **Nada é publicado por este piloto**, mesmo se um item estiver marcado como aprovado. A flag `--publish` falha de propósito até que uma integração completa seja verificada.
- A execução agendada no GitHub Actions é somente de **prévia e testes**, com permissões de leitura.
- Não guardar tokens, senhas, CPFs, dados de clientes ou URLs de arquivos privados no código.
- As fotos do Drive podem ter restrição de compartilhamento; não torná-las públicas sem revisão.
- Arquivos WebP usados no site podem precisar de conversão e hospedagem HTTPS pública para Instagram/Facebook.
- Nunca usar imagens de obras identificáveis sem confirmar autorização de divulgação.
- O `main` do site permanece inalterado até aprovação do pull request.

## Runtime implementado em 14/11/2026

O serviço separado `server.mjs` implementa OAuth Instagram Login, cofre cifrado e worker de publicação. O `runner.mjs` continua exclusivamente de prévia. Instruções de configuração, autorização, testes e limitações reais: [OPERATIONS.md](OPERATIONS.md). Nada foi publicado ou hospedado nesta entrega.

## Próximas integrações

Facebook Pages (Graph API), LinkedIn Pages (Posts API), Instagram Professional, métricas e status de publicação. Para publicação real, implementar `publisher`, autenticação e reexecução segura sem duplicações. O Plus/Codex ajuda no desenvolvimento, mas não fornece uma API de IA ilimitada ao robô.

## Personalização com Codex

Peça ao Codex: "Continue o piloto da pasta social_media sem modificar src/ ou supabase/. Configure publicação na Página da THÉRMICA somente depois de comprovar permissões oficiais, criar armazenamento privado de recibos e passar nos testes. Nunca faça post real em testes."
