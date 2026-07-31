---
name: testing
description: |
  Skill de estratégia de testes. Define padrões para testes unitários, de integração, E2E,
  coverage targets, mocking, fixtures e boas práticas de testing.
  Use para planejar, escrever ou revisar testes do projeto.
---

# Skill Testing — Estratégia de Testes

## 🎯 Pirâmide de Testes

```
        /  E2E  \          → Poucos, lentos, caros
       / Integração \      → Moderado
      /   Unitários   \   → Muitos, rápidos, baratos
```

### Distribuição Recomendada:
| Tipo | Proporção | Velocidade | Confiança |
|------|-----------|------------|-----------|
| **Unitários** | ~70% | Rápido (< 50ms) | Média |
| **Integração** | ~20% | Médio (< 5s) | Alta |
| **E2E** | ~10% | Lento (> 10s) | Muito Alta |

---

## 🧪 Testes Unitários

### O que testar:
- [ ] Funções puras (validações, transformações, cálculos).
- [ ] Hooks customizados.
- [ ] Lógica de negócio isolada.
- [ ] Edge cases e valores limítrofes.
- [ ] Tratamento de erros.

### Padrão AAA (Arrange, Act, Assert):

```ts
describe("formatCPF", () => {
  it("deve formatar CPF válido com 11 dígitos", () => {
    // Arrange
    const cpf = "12345678901";

    // Act
    const result = formatCPF(cpf);

    // Assert
    expect(result).toBe("123.456.789-01");
  });

  it("deve retornar null para CPF inválido", () => {
    expect(formatCPF("123")).toBeNull();
    expect(formatCPF("")).toBeNull();
    expect(formatCPF("00000000000")).toBeNull();
  });
});
```

### Regras:
- [ ] Um `describe` por unidade (função, classe, hook).
- [ ] Um `it` por comportamento esperado.
- [ ] Mensagem do `it` descreve o comportamento, não a implementação.
- [ ] Sem lógica condicional dentro de testes.
- [ ] Cada teste é independente (sem depender de ordem).

---

## 🔗 Testes de Integração

### O que testar:
- [ ] Endpoints de API (request → response).
- [ ] Interações com banco de dados (CRUD completo).
- [ ] Fluxos de autenticação/autorização.
- [ ] Integrações com serviços externos (com mocks).

### Padrão para API:

```ts
describe("POST /api/users", () => {
  it("deve criar usuário com dados válidos e retornar 201", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "Test User", email: "test@example.com" })
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Test User");
  });

  it("deve retornar 400 para email inválido", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "Test", email: "invalid" })
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("deve retornar 401 sem token de autenticação", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "Test", email: "test@example.com" });

    expect(response.status).toBe(401);
  });
});
```

---

## 🌐 Testes E2E (End-to-End)

### O que testar:
- [ ] Fluxos críticos de negócio (login → ação → logout).
- [ ] Happy paths completos.
- [ ] Fluxos de pagamento/checkout.

### Ferramentas recomendadas:
| Ferramenta | Stack | Uso |
|------------|-------|-----|
| Playwright | Web | E2E cross-browser |
| Cypress | Web | E2E com dev experience |
| Supertest | Node.js | Testes de API HTTP |

---

## 🎭 Mocking

### Quando usar mocks:
- [ ] Serviços externos (APIs, bancos, email).
- [ ] Dependências lentas ou instáveis.
- [ ] Módulos com side-effects.

### Quando NÃO usar mocks:
- [ ] Lógica de negócio pura (testar a implementação real).
- [ ] Validações (testar com dados reais).

### Padrão de Mock:

```ts
// Mock de módulo
vi.mock("@/lib/email", () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock de banco de dados
vi.mock("@/lib/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Spy (mantém implementação, mas permite verificar chamadas)
const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
```

---

## 📊 Coverage

### Targets Recomendados:
| Métrica | Mínimo | Ideal |
|---------|--------|-------|
| Statements | 70% | 85%+ |
| Branches | 65% | 80%+ |
| Functions | 70% | 85%+ |
| Lines | 70% | 85%+ |

### Configuração (vitest):
```ts
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/index.ts", "src/**/*.d.ts"],
      thresholds: {
        statements: 70,
        branches: 65,
        functions: 70,
        lines: 70,
      },
    },
  },
});
```

---

## 🔧 Fixtures e Factories

### Use factories para gerar dados de teste:

```ts
// factories/user.ts
export function createUser(overrides?: Partial<User>): User {
  return {
    id: crypto.randomUUID(),
    name: "Test User",
    email: "test@example.com",
    role: "viewer",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

// Uso no teste
const admin = createUser({ role: "admin", name: "Admin User" });
const viewer = createUser({ role: "viewer" });
```

---

## ⚠️ Regras Invioláveis

1. **NUNCA** remover testes existentes sem justificativa documentada
2. **SEMPRE** escrever testes para novas funcionalidades
3. **NUNCA** ter lógica condicional (if/else) dentro de testes
4. **SEMPRE** usar dados de teste independentes (factories/fixtures)
5. **NUNCA** depender de ordem de execução entre testes
6. **SEMPRE** testar edge cases (null, undefined, empty, overflow)
7. **NUNCA** fazer mock da unidade sendo testada (apenas dependências)
8. **SEMPRE** rodar `npm run test` antes de considerar uma tarefa concluída
