# Arquitetura Laravel

## 📁 Estrutura de Pastas Recomendada

```
laravel-project/
├── app/
│   ├── Actions/            # Ações de caso de uso único (Single Action Classes)
│   ├── Http/
│   │   ├── Controllers/    # Controllers enxutos (Thin Controllers)
│   │   ├── Middleware/     # Middlewares de rota e globais
│   │   └── Requests/       # Form Requests (validações dedicadas)
│   ├── Models/             # Eloquent Models com relacionamentos e scopes
│   ├── Providers/          # Service Providers
│   └── Services/           # Classes de serviço para lógica de negócio complexa
│
├── bootstrap/              # Arquivos de inicialização
├── config/                 # Configurações globais do Laravel
├── database/
│   ├── factories/          # Database Factories
│   ├── migrations/         # Migrations estruturadas de banco de dados
│   └── seeders/            # Seeders para dados estáticos e testes
│
├── public/                 # Ponto de entrada público (index.php, assets compilados)
├── resources/
│   ├── js/                 # Arquivos JS/TS de frontend
│   ├── css/                # Arquivos CSS/Tailwind
│   └── views/              # Blade templates (.blade.php)
│
├── routes/
│   ├── web.php             # Rotas web (HTML, Blade, Sessions, CSRF)
│   └── api.php             # Rotas de API REST
│
├── tests/                  # Testes Unitários e de Integração (Pest/PHPUnit)
└── vite.config.js          # Configuração de compilação de assets
```

## 🏗️ Padrões de Arquitetura

### 1. Controllers Enxutos (Thin Controllers)
Controllers devem apenas receber a requisição, delegar para um Service/Action, e retornar uma resposta.

### 2. Classes de Ação (Actions)
Use classes de ação de propósito único para desacoplar tarefas complexas que podem ser reutilizadas (ex: `CreateInvoice`, `RegisterUser`).

### 3. Migrações Reversíveis
Sempre implemente o método `down()` em suas migrations de forma que as mudanças no schema do banco de dados possam ser desfeitas perfeitamente.
