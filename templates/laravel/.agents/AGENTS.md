# Configuração de Agentes — Laravel

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, classes, migrations, variáveis e métodos em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- **Controle de Progresso**: Sempre que iniciar, alterar ou concluir uma tarefa, documente e atualize as informações no arquivo `.agents/PROGRESS.md`, registrando o progresso e o status da atividade.

### Stack Tecnológica
- **Laravel 10+** (PHP 8.2+)
- **Blade / Livewire** ou **Vue/React** via Inertia.js
- **Tailwind CSS** para estilização
- **MySQL / PostgreSQL** com Eloquent ORM
- **Pest** ou **PHPUnit** para testes

---

## 🏗️ Padrões de Projeto (Laravel Best Practices)
- **Thin Controllers & Fat Models/Services**: Mantenha a lógica fora dos controllers. Use Services ou Actions para regras de negócio complexas.
- **Form Requests**: Use classes dedicadas (`php artisan make:request`) para validação.
- **Eloquent ORM**: Não use query builders brutos (ou SQL inline) a menos que estritamente necessário para performance.
- **API Resources**: Sempre use API Resources (`JsonResource`) para formatar retornos de API.

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `backend` | `.agents/skills/laravel/skills/backend/SKILL.md` | Eloquent, Controllers, Form Requests, Services/Actions e segurança |
| `frontend` | `.agents/skills/laravel/skills/frontend/SKILL.md` | Blade templates, Livewire, Alpine.js e assets (Vite/Tailwind) |
| `qa` | `.agents/skills/laravel/skills/qa/SKILL.md` | Testes com Pest/PHPUnit, linting com Pint, análise estática com Larastan |

---

## 🤖 Agentes Disponíveis

### 1. Backend Developer Sênior (`backend-dev`)
- **Path**: `.agents/skills/laravel/skills/backend-dev/SKILL.md` · **Skills**: `backend`
- Dev Laravel/PHP sênior. Focado em arquitetura limpa, models, migrations, jobs, services e banco de dados.

### 2. Frontend Developer Sênior (`frontend-dev`)
- **Path**: `.agents/skills/laravel/skills/frontend-dev/SKILL.md` · **Skills**: `frontend`
- Dev Frontend sênior. Especialista em Blade, Livewire, CSS/Tailwind e interações de cliente.

### 3. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/laravel/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA focado em qualidade do PHP, cobertura de testes automatizados, e segurança da aplicação.
