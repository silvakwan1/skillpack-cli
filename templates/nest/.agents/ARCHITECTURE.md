# Arquitetura NestJS

## 📁 Estrutura de Pastas Recomendada

```
src/
├── common/                 # Decorators, Guards, Interceptors, Pipes globais
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
│
├── config/                 # Arquivos de configuração globais (dotenv, database)
│
├── modules/                # Módulos de domínio
│   ├── users/
│   │   ├── dto/            # Data Transfer Objects para requests
│   │   ├── entities/       # Entidades ORM (Prisma/TypeORM)
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.controller.spec.ts
│   └── auth/
│
├── app.module.ts           # Módulo principal (Root Module)
└── main.ts                 # Ponto de entrada (bootstrap da aplicação)
```

## 🏗️ Padrões de Arquitetura

### 1. Separação de Responsabilidades (SOLID)
- **Controllers**: Apenas gerenciam requisições, parâmetros, validação (via pipes) e retornam respostas.
- **Services (Providers)**: Contêm a lógica de negócio principal e interações com repositórios de dados.
- **Modules**: Declaram e encapsulam controllers, providers e controlam exportações/importações.

### 2. DTO (Data Transfer Objects)
Sempre use classes TypeScript com decoradores `class-validator` para validar o payload das requisições.

### 3. Dependency Injection
Utilize `@Injectable()` e deixe que o NestJS gerencie o ciclo de vida e a injeção de dependências.
