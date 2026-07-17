# Configuração de Agentes — Next.js

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, variáveis, funções e componentes em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.

### Stack Tecnológica
- **Next.js 14** (App Router) · **TypeScript** (strict mode) · **Tailwind CSS**
- **Server Components (SSR)** por padrão. Evitar `"use client"` a menos que necessário.
- **Supabase / PostgreSQL** para banco de dados e autenticação
- **Zod** para validação e **React Hook Form** para formulários

---

## 🏗️ SOLID e Arquitetura Clean
- **Single Responsibility**: Cada componente tem uma única responsabilidade visual; cada hook resolve uma lógica.
- **Dependency Inversion**: Componentes não importam o cliente Supabase diretamente; utilizam services intermediários e hooks.

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `frontend` | `.agents/skills/next/frontend/SKILL.md` | Design tokens do Tailwind, padrões de UI, boas práticas Next.js/Tailwind |
| `backend` | `.agents/skills/next/backend/SKILL.md` | Padrões de Route Handlers, Server Actions, validações com Zod e segurança |
| `qa` | `.agents/skills/next/qa/SKILL.md` | Checklist de qualidade, validação de código, acessibilidade, performance |

---

## 🤖 Agentes Disponíveis

### 1. Frontend Developer Sênior (`frontend-dev`)
- **Path**: `.agents/agents/next/frontend-dev/SKILL.md` · **Skills**: `frontend`
- Dev frontend sênior. Focado em interfaces consistentes, responsividade mobile-first e tokens.
- **Acionar para**: componentes visuais, páginas e estilizações de UI.

### 2. Backend Developer Sênior (`backend-dev`)
- **Path**: `.agents/agents/next/backend-dev/SKILL.md` · **Skills**: `backend`
- Dev backend sênior. Focado em Route Handlers, Server Actions, cache, middlewares e banco de dados.
- **Acionar para**: lógica de persistência, APIs e segurança no servidor.

### 3. QA Engineer (`qa-engineer`)
- **Path**: `.agents/agents/next/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA rigoroso. Verifica tipagem TypeScript, acessibilidade (WCAG), performance e segurança.
- **Acionar para**: auditoria de código após modificações ou antes do merge.

---

## 📚 Referências (consultar sob demanda)

> **NÃO** leia esses arquivos por padrão. Consulte **apenas** quando a tarefa exigir.

| Arquivo | Quando consultar |
|---------|-----------------|
| `.agents/skills/next/references/CODE_PATTERNS.md` | Precisar de **exemplos de código** para SOLID, Clean Code ou importações |
| `.agents/skills/next/ARCHITECTURE.md` | Precisar entender a **estrutura de pastas**, organização de rotas ou arquitetura geral |
