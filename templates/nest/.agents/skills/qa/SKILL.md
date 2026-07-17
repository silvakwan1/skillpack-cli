---
name: nest-qa
description: |
  Skill de Quality Assurance para NestJS. Checklist de testes unitários e E2E, Jest,
  Swagger API docs e validações TypeScript.
---

# Skill NestJS QA — Qualidade de Código

## 🧪 Estratégias de Testes
- **Testes Unitários (Jest)**: Escreva testes para cada Service isolando dependências com mocks.
- **Testes E2E (End-to-End)**: Teste fluxos HTTP reais usando `supertest` e um módulo NestJS de teste completo.

```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('deve criar um novo usuário', async () => {
    // teste
  });
});
```

---

## 🔍 Checklist de Qualidade (QA)
- [ ] Strict mode habilitado no `tsconfig.json`.
- [ ] Toda rota que recebe payload tem DTO com validações (`class-validator`).
- [ ] Módulos com escopos de exportação corretos (sem imports circulares).
- [ ] Testes automatizados cobrindo controllers e services de novos endpoints.
- [ ] Documentação de API gerada com Swagger (se configurado).
- [ ] Executar o formatador e linter (`npm run lint`, `npm run format`).
