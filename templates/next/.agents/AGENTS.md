# Configuração de Agentes — Portal Anasps

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, variáveis, funções e componentes em **inglês**
- Comentários, documentação e commits em **português**
- **Mensagens de commit** devem ser detalhadas, explicando o que foi feito e a motivação (evitar mensagens genéricas)
- Prefixos de commit: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Branches: `feature/nome`, `fix/nome`, `hotfix/nome`

### Stack Tecnológica
- **Next.js 14** (App Router) · **TypeScript** (strict mode) · **Tailwind CSS** (tokens customizados — ver skill `frontend`)
- **Preferência por SSR (Server Components)**: evitar `"use client"` sempre que possível. Usar Client Components apenas quando necessário (hooks, eventos, interatividade)
- **Supabase** (PostgreSQL + Auth + Storage) · **Lucide React** / **React Icons**
- **Zod** (validação) · **React Hook Form** (formulários) · **Axios** (HTTP externo)

---

## 🏗️ SOLID

- **S — Single Responsibility**: cada componente = 1 responsabilidade visual; cada hook = 1 lógica; cada service = 1 API/entidade; cada util = 1 domínio
- **O — Open/Closed**: componentes extensíveis via `props`, `children`, `className` — nunca por modificação direta. Composição > herança
- **L — Liskov Substitution**: componentes com mesma interface devem ser intercambiáveis e manter consistência nas props
- **I — Interface Segregation**: props específicas e enxutas, sem "god props". Criar interfaces separadas quando necessário (ex: `ModalProps` base + `ModalWithActionsProps extends ModalProps`)
- **D — Dependency Inversion**: componentes **nunca** importam o cliente Supabase diretamente — usar **services** como camada intermediária e **hooks** para acesso a dados

---

## 🧱 DDD (Domain-Driven Design)

### Domínios do Projeto
`/institucional/*` (instituição) · `/noticias/*` (posts) · `/saude/*` (planos/convênios) · `/admin/*` (painel) · `/contato` (formulário) · `/juridico/*` (assessoria jurídica)

### Linguagem Ubíqua
- Usar termos do domínio: `associado`, `beneficio`, `convenio`, `siape`
- Consistência: se é `post` no backend, é `post` no frontend
- Types devem refletir o modelo de domínio

### Bounded Contexts
- **Público**: pages e componentes de leitura para visitantes
- **Admin**: CRUD, formulários, upload (restrito)
- **API**: route handlers que fazem ponte com serviços externos

---

## ✨ Clean Code

- **Nomes descritivos**: `isAssociadoValid`, `formattedPhone` — nunca variáveis genéricas como `x`, `fp`
- **Funções pequenas**: máximo ~30 linhas, uma função = uma ação. Extrair lógica complexa para hooks/utils
- **Early return**: retornar cedo para evitar aninhamento excessivo
- **Tipagem estrita**: sempre interfaces explícitas, nunca `any` ou `as unknown as`

### Proibições
- ❌ `any` — sempre tipar corretamente
- ❌ `as unknown as` — indica problema de design
- ❌ `// TODO` sem issue/ticket associado
- ❌ `console.log` em produção (use apenas em desenvolvimento)
- ❌ Comentários óbvios que descrevem o que o código já diz
- ❌ Código morto (comentado) — se não usa, apague
- ❌ Importações não utilizadas (unused imports) — remova imports declarados que não estejam sendo utilizados

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `frontend` | `.agents/skills/frontend/SKILL.md` | Design tokens do Tailwind, padrões de UI, boas práticas Next.js/Tailwind |
| `qa` | `.agents/skills/qa/SKILL.md` | Checklist de qualidade, validação de código, acessibilidade, performance |

---

## 🤖 Agentes Disponíveis

### 1. Frontend Developer Sênior (`frontend-dev`)
- **Path**: `.agents/skills/frontend-dev/SKILL.md` · **Skills**: `frontend`
- Dev frontend sênior (8+ anos React/Next.js/Tailwind). Prioriza consistência visual, reutilização de tokens e acessibilidade
- **Acionar para**: criação/edição de componentes visuais, páginas, estilização ou refactoring de UI

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA rigoroso e metódico. Verifica tipagem, acessibilidade, responsividade, segurança e performance
- **Acionar para**: após alterações significativas, antes de merge/deploy ou auditorias de qualidade

---

## 📚 Referências (consultar sob demanda)

> **NÃO** leia esses arquivos por padrão. Consulte **apenas** quando a tarefa exigir.

| Arquivo | Quando consultar |
|---------|-----------------|
| `.agents/references/CODE_PATTERNS.md` | Precisar de **exemplos de código** para SOLID, Clean Code, SSR vs CSC ou padrões de importação |
| `.agents/ARCHITECTURE.md` | Precisar entender a **estrutura de pastas**, organização de rotas ou arquitetura geral do projeto |
