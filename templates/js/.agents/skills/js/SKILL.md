---
name: generic-js
description: |
  Skill de JavaScript genérico. Contém melhores práticas para ES6+, manipulação assíncrona,
  Promises/Async-Await, desestruturação, módulos ESM e imutabilidade.
---

# Skill JavaScript Genérico — Melhores Práticas

## ⚡ JavaScript Moderno (ES6+)
- **Declaração de Variáveis**: Use `const` por padrão e `let` apenas se a variável for reatribuída. **Nunca use `var`**.
- **Desestruturação**: Use destructuring para objetos e arrays sempre que simplificar o código.
- **Template Literals**: Use interolação `${var}` em vez de concatenação de strings com `+`.
- **Default Parameters**: Utilize parâmetros padrão em funções para evitar checagens `if (!arg)`.

```javascript
// Exemplo recomendado
const formatUser = ({ name, email, role = "guest" }) => {
  return `${name} <${email}> (${role.toUpperCase()})`;
};
```

---

## 🔄 Assincronismo: Promises e Async/Await
- **Sempre tratar exceções**: Em funções `async`, utilize blocos `try/catch` para capturar rejeições.
- **Promise.all para concorrência**: Execute operações assíncronas independentes em paralelo com `Promise.all` em vez de sequencialmente.

```javascript
// Exemplo concorrente correto
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);
```

---

## 🛡️ Tratamento de Erros e Logs
- Lance objetos de erro com mensagens descritivas: `throw new Error("Usuário não encontrado")`.
- Evite blocos `catch` vazios.
