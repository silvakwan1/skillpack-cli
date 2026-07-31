---
name: generic-js-qa
description: |
  Skill de QA para JavaScript. Focado em testes unitários, testes de integração,
  verificação de tratamento de erros e integridade de tipos.
---

# Skill QA JavaScript — Checklist de Qualidade

## 🧪 Estratégia de Testes em JS
1. **Testes Unitários**: Teste funções puras e utilitários isoladamente.
2. **Testes de Integração**: Teste fluxos entre controladores e serviços.
3. **Casos Limite**: Teste valores `null`, `undefined`, arrays vazios e tipos incorretos.

```javascript
// Exemplo de teste com Vitest/Jest
import { describe, it, expect } from "vitest";
import { formatUser } from "./user.js";

describe("formatUser", () => {
  it("deve formatar o usuário corretamente com role padrão", () => {
    const result = formatUser({ name: "Ana", email: "ana@email.com" });
    expect(result).toBe("Ana <ana@email.com> (GUEST)");
  });
});
```
