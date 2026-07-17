# Configuração de Agentes — Backend Geral

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, banco de dados, variáveis e endpoints em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- **Controle de Progresso**: Sempre que iniciar, alterar ou concluir uma tarefa, documente e atualize as informações no arquivo `.agents/PROGRESS.md`, registrando o progresso e o status da atividade.

### Stack Tecnológica
- Linguagens de backend populares (Node.js/TS, Python, Go, Java, PHP)
- APIs RESTful ou GraphQL
- Bancos de dados relacionais (PostgreSQL, MySQL) ou NoSQL (MongoDB, Redis)
- Frameworks de testes unitários e de integração

---

## 🏗️ Padrões de Projeto (Backend Best Practices)
- **Separação de Responsabilidades**: Camadas de negócio, controle HTTP e persistência devem ser bem delineadas (ex: Clean Architecture, MVC).
- **Segurança de Endpoints**: Valide todas as entradas (sanitização, tipagem, limites), use HTTPS, CORS restritivo e limite de requisições.
- **Tratamento de Exceções**: Centralize o tratamento de erros para evitar vazamento de dados internos de infraestrutura nas respostas públicas.
- **Logs e Monitoramento**: Adicione logs estruturados para auditoria de erros e monitoramento de performance.

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `backend` | `.agents/skills/backend/skills/backend/SKILL.md` | Padrões de APIs, banco de dados, segurança e tratamento de erros |
| `qa` | `.agents/skills/backend/skills/qa/SKILL.md` | Checklist de testes de integração, testes unitários, linting e segurança |

---

## 🤖 Agentes Disponíveis

### 1. Backend Developer Sênior (`backend-dev`)
- **Path**: `.agents/skills/backend/skills/backend-dev/SKILL.md` · **Skills**: `backend`
- Dev Backend sênior. Focado em APIs limpas, modelagem de banco, processamento concorrente e segurança.

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/backend/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA especialista em backend. Focado em testes automatizados (unitários, integração e carga), validação de regras de negócio e segurança de dados.
