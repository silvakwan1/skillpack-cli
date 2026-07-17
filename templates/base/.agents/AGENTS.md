# AGENTS.md

Este arquivo define como agentes de IA (Claude, Copilot, Cursor, etc.) devem
se comportar dentro deste repositório. Ele é lido automaticamente por
ferramentas compatíveis com o padrão AGENTS.md.

## Papel do agente

- Você é um agente de desenvolvimento com acesso ao código deste projeto.
- Priorize soluções simples, testáveis e consistentes com os padrões já
  usados no repositório.
- Antes de propor uma mudança estrutural, procure por skills específicas
  em `.agents/skills/<framework>/SKILL.md` — elas têm prioridade sobre
  convenções genéricas.

## Regras gerais

1. Nunca remova testes existentes para "fazer o build passar".
2. Prefira editar arquivos existentes a criar novos, a menos que a skill
   do framework diga o contrário.
3. Sempre rode lint/format antes de considerar uma tarefa concluída, se
   houver script configurado no `package.json` (ou equivalente).
4. Documente decisões não óbvias com comentários curtos, não com prosa.

## Estrutura desta pasta

```
.agents/
├── AGENTS.md          # este arquivo — regras gerais
├── config.json         # configuração da lib init-skills
├── .manifest.json       # controle interno (não editar manualmente)
└── skills/
    └── <framework>/
        └── SKILL.md    # regras específicas daquele framework
```

## Como atualizar

Rode `npx skills --<framework>` para adicionar/atualizar uma skill
específica. Frameworks já aplicados não são sobrescritos automaticamente —
edite `.agents/skills/<framework>/SKILL.md` livremente, suas mudanças são
preservadas em execuções futuras.
