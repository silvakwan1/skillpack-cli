# Configuração de Agentes — NestJS

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, classes, módulos, variáveis e métodos em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.

### Stack Tecnológica
- **NestJS 10+** (Node.js/TypeScript)
- **TypeScript** (strict mode ativo)
- **Prisma / TypeORM / Mongoose** para banco de dados
- **Jest** para testes unitários e e2e

---

## 🏗️ Padrões de Projeto (NestJS Best Practices)
- **Modularização**: Crie módulos separados para cada domínio (`@Module`).
- **Injeção de Dependência**: Use o padrão de DI nativo do NestJS (`@Injectable`).
- **Validação de Entrada**: Sempre use `ValidationPipe` com `class-validator` e `class-transformer` para DTOs.
- **Tratamento de Erros**: Utilize `HttpException` ou Exceptions Filters customizados para gerenciar erros de forma limpa.

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `backend` | `.agents/skills/nest/skills/backend/SKILL.md` | Módulos, Controllers, Services, Dependency Injection, Banco de Dados |
| `qa` | `.agents/skills/nest/skills/qa/SKILL.md` | Testes com Jest (Unit e E2E), validação de DTOs, linting/formatting |

---

## 🤖 Agentes Disponíveis

### 1. Backend Developer Sênior (`backend-dev`)
- **Path**: `.agents/skills/nest/skills/backend-dev/SKILL.md` · **Skills**: `backend`
- Dev NestJS/TypeScript sênior. Focado em arquitetura modular, controllers, injectables, banco de dados e performance.

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/nest/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA focado em testes automatizados de APIs (Jest/Supertest), integridade de dados e conformidade do código TypeScript.
