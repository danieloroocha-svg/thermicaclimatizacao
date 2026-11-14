# Instruções permanentes para o Codex — Social Media THÉRMICA

## Objetivo do proprietário
Operação social media B2B multimarcas com intervenção humana mínima, iniciando pela THÉRMICA. Codex é responsável por desenvolver, depurar e melhorar os bots; a execução recorrente deve ser realizada pelo GitHub Actions e/ou serviço adequado e não depender de sessão do Codex aberta.

## Princípio de execução
- Não devolver ao usuário uma sequência de decisões triviais de implementação.
- Fazer escolhas técnicas sensatas, executar testes, validar resultados e registrar o que foi entregue.
- Só solicitar intervenção humana quando exigir autorização formal de contas, consentimento para gastos, direito de uso de imagem, publicação na marca ou uma credencial que o código não pode obter legitimamente.
- Não inventar a possibilidade de publicar sem credenciais/permissões oficiais.
- Não prometer custo zero permanente; conferir franquias e registrar consumo.
- Preservar site, componentes, banco e configuração Lovable. Não alterar ou reformatar arquivos fora de social_media e workflow dedicado sem necessidade aprovada.
- Site e repositório atual são públicos. Não gravar IDs privados, imagens privadas, tokens, segredo nem dados comerciais sensíveis no Git.

## Critérios de aceite para ativação futura
1. Mídia: usar banco de imagens existente no Google Drive e site, deduplicando por conteúdo, com consentimento e categorias. Não representar imagens ilustrativas como evidência de obras sem comprovação.
2. Conteúdo: calendário editorial em português de engenharia HVAC B2B (instalação VRF/VRV, retrofit, projetos, comissionamento, PMOC); idioma por marca; textos tecnicamente revisáveis, SEO, CTA para https://thermicaclimatizacao.com.br, não inventar clientes/resultados/certificações.
3. Publicadores: conectores oficiais autorizados por conta/organização; Instagram/Meta, LinkedIn e eventualmente WordPress; adaptar formato e hospedagem para cada canal. Sem automação clandestina de login.
4. Segurança: segredos apenas em secret manager, acesso mínimo, rotação, nenhum log de token, rollback, kill switch, estado persistente de idempotência e recibo por post por canal.
5. Aprovação: iniciar em modo ensaio. Publicação de posts reais somente após credenciais e uma autorização inicial explícita que libere o calendário; nunca assumir que dry-run é publicação.
6. Testes: validar schema/horários/fuso America/Sao_Paulo, limites, rate limit, tratamento de falha, retentativas, idempotência, arquivos privados, API mocks, métricas e custos.
7. Infra: agendador com UTC coerente, permissões mínimas do workflow, GitHub Actions grátis enquanto comportar. Proteger job contra workflows forkados e vazamento de tokens.
8. Monitoração: registro por post de status e URL publicada, resumo de resultados, notificações apenas de falha material ou autorização necessária.
9. Proteção de custos: não habilitar chamadas a API de geração de texto ou imagem com faturamento sem aprovação específica.
10. Evitar publicar duplicado, conteúdo de baixa qualidade ou usar conteúdo pessoal/sensível dos clientes.

## Situação em 13/11/2026
- PR #11 em rascunho com catálogo de 443 paths / 55 hashes diferentes, base de prévia e 3 posts de exemplo em rascunho.
- Google Sheets de controle: https://docs.google.com/spreadsheets/d/1QQ3WyQygWIq7gQCtz6qSUOJKc4nRtKBrMclCft8Y_QA/edit
- Publicador real não implementado, credenciais sociais ainda não aprovadas, nenhuma publicação enviada.
- Este repositório público possui .env versionado na main. Priorizar avaliação e mitigação de riscos sem copiar valores para comentários/logs e sem destruir o histórico. Caso algum segredo tenha sido exposto, orientar rotação imediata. Nunca presumir que simplesmente apagar o arquivo torna valores históricos secretos.

## Ordem prática de entrega
A. Auditar segurança, isolar infraestrutura de publicação e validar o PR.
B. Testar/amadurecer seleção de mídia e fila sem IA paga.
C. Implementar integrações oficiais e modo simulado com mocks para Facebook Pages e LinkedIn.
D. Pedir UMA autorização para conectar redes, sem solicitar que o usuário decida detalhes técnicos.
E. Depois de autorização de publicação, ativar um canal piloto, verificar recibo, ativar agendamento, ampliar para canais/soluções.
