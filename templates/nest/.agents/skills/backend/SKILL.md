---
name: nest-backend
description: |
  Skill de backend para NestJS. Contém boas práticas de Controllers, Services, Módulos,
  Pipes, Guards, banco de dados (Prisma/TypeORM) e segurança em TypeScript.
---

# Skill NestJS Backend — Melhores Práticas

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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

---

## 🔒 Validação e Segurança
1. **ValidationPipe**: Sempre use `ValidationPipe` global ou localmente para garantir a integridade dos dados de entrada.
2. **Guards e Interceptors**: Use `@UseGuards()` (por exemplo, com JWT ou Passport) para rotas que necessitam de autenticação.
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
- **Prisma**: Use o Prisma Client injetado através de um `PrismaService` herdado de `PrismaClient` que gerencie o ciclo de vida da conexão.
- **TypeORM**: Use `InjectRepository()` nos construtores dos services para desacoplar as tabelas do banco de dados.
- Mantenha queries seguras contra SQL injection e trate exceções de chave duplicada ou erros de banco usando Exception Filters do NestJS.

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

### PrismaModule (Global):

```typescript
// prisma/prisma.module.ts
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### Uso no Service:

```typescript
// modules/users/users.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }

  async findAll(page = 1, limit = 20) {
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.user.count(),
    ]);
    return { users, total, pages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }
}
```

---

## 📋 Validação com Zod no NestJS

### ZodValidationPipe (Custom Pipe):

```typescript
// common/pipes/zod-validation.pipe.ts
import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodSchema, ZodError } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Dados inválidos",
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      throw error;
    }
  }
}
```

### DTOs com Zod:

```typescript
// modules/users/dto/create-user.dto.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
```

### Uso no Controller:

```typescript
// modules/users/users.controller.ts
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ZodValidationPipe(createUserSchema)) data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
```

### Regras:
- [ ] **PrismaService**: Sempre usar como `@Injectable()` com lifecycle hooks.
- [ ] **PrismaModule Global**: Registrar como `@Global()` para disponibilizar em todos os módulos.
- [ ] **Select**: Usar `select` para trazer apenas os campos necessários.
- [ ] **Paginação**: Sempre paginar listagens com `take` e `skip`.
- [ ] **Transactions**: Usar `prisma.$transaction()` para operações em múltiplas tabelas.
- [ ] **Zod ou class-validator**: Escolher um e manter consistência no projeto inteiro.

