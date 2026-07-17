# Configuração de Agentes — Express

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, variáveis, métodos e rotas em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.

### Stack Tecnológica
- **Express 4/5** (Node.js/TypeScript)
- **TypeScript** (opcional, mas recomendado)
- **Middleware-based Architecture**
- **Jest / Supertest** para testes de endpoints

---

## 🏗️ Padrões de Projeto (Express Best Practices)
- **Arquitetura em Camadas (Layers)**: Divida o código em Rotas, Controllers, Services/Business e Camada de Dados (Repository/Model).
- **Gerenciamento de Erros**: Sempre use um middleware global de tratamento de erros (`(err, req, res, next)`). Nunca deixe exceções sem tratamento (uncaught exceptions).
- **Validação de Input**: Use middlewares de validação (como Zod ou Joi) para as rotas que recebem parâmetros ou body.
- **Segurança Básica**: Use `helmet`, `cors` e limite o tamanho dos payloads (`express.json({ limit: ... })`).

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `backend` | `.agents/skills/express/skills/backend/SKILL.md` | Rotas, Controllers, Middlewares, Tratamento de erros, Segurança e ORM |
| `qa` | `.agents/skills/express/skills/qa/SKILL.md` | Testes com Jest/Supertest, linting/formatting e checklists de segurança |

---

## 🤖 Agentes Disponíveis

### 1. Backend Developer Sênior (`backend-dev`)
- **Path**: `.agents/skills/express/skills/backend-dev/SKILL.md` · **Skills**: `backend`
- Dev Express sênior. Focado em arquitetura em camadas, roteamento, middlewares customizados, banco de dados e segurança.

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/express/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA focado em qualidade do código, testes automatizados (unitários e de integração), e segurança de APIs REST.
