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

## ⚙️ Acesso a Banco de Dados
- **Prisma**: Use o Prisma Client injetado através de um `PrismaService` herdado de `PrismaClient` que gerencie o ciclo de vida da conexão.
- **TypeORM**: Use `InjectRepository()` nos construtores dos services para desacoplar as tabelas do banco de dados.
- Mantenha queries seguras contra SQL injection e trate exceções de chave duplicada ou erros de banco usando Exception Filters do NestJS.
