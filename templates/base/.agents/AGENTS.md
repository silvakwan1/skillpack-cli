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
├── agente/              # Agentes YML com atribuições de skills
│   ├── architect.yml    # Arquiteto de Software
│   ├── code-reviewer.yml # Revisor de Código
│   ├── devops.yml       # DevOps Engineer
│   ├── documentador.yml # Documentador
│   └── qa-lead.yml      # QA Lead
├── agents/
│   └── <framework>/     # Agentes especializados daquele framework
└── skills/
    ├── security-audit/  # Auditoria de segurança (OWASP, secrets, deps)
    ├── code-review/     # Revisão de código multi-eixo
    ├── git-workflow/    # Padrões de Git e commits semânticos
    ├── performance/     # Otimização de performance
    ├── documentation/   # Padrões de documentação
    ├── testing/         # Estratégia de testes
    └── <framework>/     # Skills detalhadas daquele framework
```

## 🤖 Agentes Disponíveis (YML)

Os agentes abaixo estão definidos em `.agents/agente/` e possuem skills atribuídas:

| Agente | Arquivo | Skills | Acionar Quando |
|--------|---------|--------|----------------|
| Arquiteto | `architect.yml` | security-audit, performance, code-review | Decisões de arquitetura, refatoração estrutural |
| Revisor | `code-reviewer.yml` | code-review, security-audit, testing | Antes de merge, auditoria de qualidade |
| DevOps | `devops.yml` | git-workflow, security-audit, performance | CI/CD, deploy, infra |
| Documentador | `documentador.yml` | documentation, code-review | Criar/atualizar docs |
| QA Lead | `qa-lead.yml` | testing, security-audit, code-review, performance | Antes de release, validação |

## 🔧 Skills Universais Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `security-audit` | `.agents/skills/security-audit/SKILL.md` | OWASP Top 10, secrets, XSS/CSRF/SQLi |
| `code-review` | `.agents/skills/code-review/SKILL.md` | Revisão multi-eixo: corretude, segurança, performance |
| `git-workflow` | `.agents/skills/git-workflow/SKILL.md` | Commits semânticos, branching, PRs |
| `performance` | `.agents/skills/performance/SKILL.md` | Profiling, caching, bundle size, queries |
| `documentation` | `.agents/skills/documentation/SKILL.md` | README, ADRs, JSDoc, CHANGELOG |
| `testing` | `.agents/skills/testing/SKILL.md` | Unitários, integração, E2E, coverage |

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
