---
name: nest-backend
description: |
  Skill de backend para NestJS. Contém boas práticas de Clean Architecture (Domain, Application, Infra, Interfaces),
  Controllers, Services, Módulos, Pipes, Guards, DTOs (class-validator/Zod) e Prisma/TypeORM.
---

# Skill NestJS Backend — Melhores Práticas & Clean Architecture

## 🏛️ Estrutura Arquitetural Recomendada (Clean Architecture)

- **`src/domain/`**: Camada interna pura. Entidades de domínio, Value Objects e interfaces de Repositórios sem dependências de frameworks.
- **`src/application/`**: Casos de uso (Use Cases / Services de aplicação). Orquestra as regras de negócio usando as interfaces do domínio.
- **`src/infra/`**: Detalhes de infraestrutura. Implementações concretas de Repositórios (Prisma/TypeORM), adapters de APIs externas e DB configs.
- **`src/interfaces/` (ou `api/`)**: Camada NestJS externa. Controllers, DTOs, Guards, Interceptors e Pipes.

---

## 🌐 Modules, Controllers e Services
- **Módulos**: Cada módulo deve representar um domínio lógico. Use `exports` no módulo se o serviço precisar ser consumido em outros lugares.
- **Controllers**: Mantenha controllers limpos. Sempre defina a resposta e os códigos HTTP apropriados usando `@HttpCode()` ou respostas padrão.
- **Services**: Lógica de negócio pura. Use o padrão de repositórios para acesso a dados.

```typescript
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

---

## 🔒 Validação e Segurança
1. **ValidationPipe**: Sempre use `ValidationPipe({ whitelist: true, transform: true })` global ou localmente para desconsiderar propriedades não mapeadas no DTO.
2. **Guards**: Use Guards apenas para autorização e autenticação (JWT, RBAC). Mantenha lógica de negócio fora dos Guards.
3. **Helmet e CORS**: Certifique-se de configurar segurança HTTP no bootstrap (`main.ts`).

```typescript
// main.ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
```

---

## ⚙️ Acesso a Banco de Dados com Prisma

### PrismaService (Singleton):
```typescript
// prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### Regras de Otimização:
- [ ] **Dependency Inversion**: Injete o repositório por interface/inversão de dependência no módulo.
- [ ] **Select**: Usar `select` para trazer apenas os campos necessários (nunca vazando senhas/dados sensíveis).
- [ ] **Paginação**: Sempre paginar listagens com `take` e `skip`.
- [ ] **Transactions**: Usar `prisma.$transaction()` para operações em múltiplas tabelas.
