# AGENTS.md

Este arquivo define como os agentes de IA (Claude, Copilot, Cursor, etc.) devem se comportar dentro deste repositório.

## 🤖 Papel Geral do Agente
- Você é um agente de desenvolvimento de software com acesso ao código deste projeto.
- Priorize soluções limpas, testáveis, seguras e consistentes com os padrões existentes.
- **Importante**: Antes de fazer qualquer alteração, verifique se existem diretivas específicas para os frameworks utilizados em `.agents/skills/<framework>/`. Elas têm prioridade máxima sobre regras genéricas.

## 🛠️ Regras Gerais de Desenvolvimento
1. **Qualidade e Testes**: Nunca remova testes existentes. Sempre escreva testes para novas funcionalidades.
2. **SOLID e Clean Code**: Siga estritamente os princípios SOLID, DRY e Clean Code.
3. **Padrões de Commit**: Use commits semânticos (ex: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`).
4. **Verificações Automáticas**: Rode testes e linters locais (como `npm run lint`, `vitest`, `php artisan test` etc.) antes de considerar uma tarefa concluída.
5. **Controle de Progresso**: Sempre que iniciar, alterar ou concluir uma tarefa, documente e atualize as informações no arquivo `.agents/PROGRESS.md`, registrando o progresso e o status da atividade.

## 🔄 Busca de Skills no Git e Melhoria Contínua
- Se precisar de mais informações, padrões de código ou novas diretrizes de desenvolvimento, você pode buscar no Git (como repositórios oficiais dos frameworks, guias de estilo consolidados ou o próprio repositório remoto).
- **Validação e Melhoria**: Valide se as skills locais do projeto em `.agents/skills/` estão alinhadas com as melhores práticas atuais e sugira melhorias ou atualizações nestes arquivos locais conforme necessário.

## 📁 Estrutura da Pasta `.agents/`
```
.agents/
├── AGENTS.md            # Este arquivo - Regras gerais do repositório
├── PROGRESS.md          # Acompanhamento do progresso das tarefas
├── config.json          # Configuração da biblioteca
├── .manifest.json       # Controle interno da biblioteca (não editar)
├── agents/
│   └── <framework>/     # Agentes especializados daquele framework
└── skills/
    └── <framework>/     # Skills detalhadas e checklists de QA daquele framework
        ├── AGENTS.md    # Definição dos agentes especializados do framework
        └── ARCHITECTURE.md # Diretrizes de arquitetura do framework
```

## 🚀 Como Adicionar ou Atualizar Skills
Rode o comando do CLI para adicionar ou atualizar frameworks:
```bash
npx skills --next      # Adiciona/atualiza Next.js
npx skills --laravel   # Adiciona/atualiza Laravel
npx skills --nest      # Adiciona/atualiza NestJS
npx skills --express   # Adiciona/atualiza Express
npx skills --pandas    # Adiciona/atualiza Pandas
npx skills --frontend  # Adiciona/atualiza Frontend Genérico
npx skills --backend   # Adiciona/atualiza Backend Genérico
```
As edições manuais feitas dentro de `.agents/` não são sobrescritas automaticamente em execuções futuras.
