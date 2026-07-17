---
name: express-qa
description: |
  Skill de Quality Assurance para Express. Checklist de testes de rotas com Supertest,
  validação de middlewares e configurações de segurança recomendadas.
---

# Skill Express QA — Qualidade de Código

## 🧪 Estratégias de Testes
- **Testes de Integração (Supertest)**: Teste as rotas HTTP de ponta a ponta iniciando o app Express em memória com a biblioteca `supertest`.
- **Mocks de Banco de Dados**: Certifique-se de mockar as conexões e queries de banco de dados nos testes unitários e de integração para não poluir o banco de desenvolvimento.

```typescript
// tests/users.test.ts
import request from 'supertest';
import app from '../app';

describe('POST /users', () => {
  it('deve retornar 201 ao cadastrar usuário válido', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' });
      
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

---

## 🔍 Checklist de Qualidade (QA)
- [ ] Middleware global de tratamento de erros configurado no final do carregamento dos middlewares do express.
- [ ] Validações de campos de entrada nas rotas críticas (Cadastro, Login, Edições).
- [ ] Helmet ativo e CORS configurado adequadamente.
- [ ] Banco de dados desconecta corretamente ao finalizar o processo do app.
- [ ] Rate limiting ativo em rotas públicas críticas (login, registro).
- [ ] Sem dados sensíveis ou stack traces expostos em respostas de erro em produção.
