# Configuração de Agentes — JavaScript Genérico

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, variáveis, funções e arquivos em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- **Controle de Progresso**: Sempre que iniciar, alterar ou concluir uma tarefa, documente e atualize as informações no arquivo `.agents/PROGRESS.md`.

### Stack Tecnológica
- JavaScript ES6+ / Node.js ou Vanilla JS em navegador
- Módulos ESM (`import`/`export`) ou CommonJS (`require`/`module.exports`)
- Async/Await, Promises e manipulação assíncrona robusta
- Linters (ESLint, Biome) e Formatadores (Prettier)
- Testes automatizados (Vitest, Jest, Node test runner)

---

## 🏗️ Padrões de Projeto (JavaScript Best Practices)
- **Código Limpo**: Funções pequenas, puras e focadas em uma única responsabilidade.
- **Tratamento de Erros**: Trate Promises rejeitadas e evite blocos `try/catch` silenciosos.
- **Modularização**: Separe utilitários, regras de negócio e camada de entrada/saída.
- **Sem mutações indesejadas**: Prefira imutabilidade e métodos que retornam cópias (`map`, `filter`, `reduce`).

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `js` | `.agents/skills/js/SKILL.md` | Padrões de JS moderno ES6+, manipulação assíncrona, eventos e módulos |
| `qa` | `.agents/skills/qa/SKILL.md` | Checklist de testes de unidade, integração e validação de qualidade |

---

## 🤖 Agentes Disponíveis

### 1. JS Developer Sênior (`js-dev`)
- **Path**: `.agents/agents/js-dev/SKILL.md` / `js-dev.yml` · **Skills**: `js`
- Dev JS sênior. Focado em código legível, assincronismo eficiente e modularização sólida.

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/agents/qa-engineer/SKILL.md` / `qa-engineer.yml` · **Skills**: `qa`
- QA rigoroso para aplicações JavaScript.
