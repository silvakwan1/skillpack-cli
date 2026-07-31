---
name: documentation
description: |
  Skill de documentação de projetos. Define padrões para README, ADRs (Architecture Decision Records),
  API docs, JSDoc/TSDoc, CHANGELOG e documentação inline.
  Use para gerar ou revisar documentação do projeto.
---

# Skill Documentation — Documentação de Projetos

## 📄 Padrões de Documentação

### Princípios:
1. **Documentação é código** — versionada, revisada e mantida junto com o projeto.
2. **Escreva para quem não conhece o projeto** — contexto é essencial.
3. **Mantenha atualizada** — documentação desatualizada é pior que nenhuma.
4. **Automate o possível** — JSDoc/TSDoc gera docs de API automaticamente.

---

## 📖 README.md

### Estrutura Obrigatória:

```markdown
# Nome do Projeto

Breve descrição do projeto (1-2 linhas).

## 🚀 Tecnologias
- [Lista de tecnologias principais]

## 📋 Pré-requisitos
- Node.js >= 18
- [Outros requisitos]

## 🔧 Instalação

git clone [repo-url]
cd [project-name]
npm install
cp .env.example .env

## ▶️ Executar

npm run dev

## 🧪 Testes

npm run test

## 📁 Estrutura do Projeto

[Árvore de diretórios com descrição]

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexão do banco | Sim |

## 🤝 Contribuindo

[Link ou instruções para contribuição]

## 📄 Licença

[Tipo de licença]
```

---

## 📐 ADRs (Architecture Decision Records)

### Quando criar um ADR:
- Escolha de framework, biblioteca ou ferramenta.
- Decisão de arquitetura (monolito vs. microserviços, REST vs. GraphQL).
- Mudança significativa de padrão ou processo.
- Trade-offs que impactam o futuro do projeto.

### Template de ADR:

```markdown
# ADR-001: [Título da Decisão]

**Data**: YYYY-MM-DD
**Status**: Proposta / Aceita / Depreciada / Substituída por ADR-XXX

## Contexto
[O que motivou esta decisão? Qual problema precisamos resolver?]

## Decisão
[O que decidimos fazer?]

## Alternativas Consideradas
1. **[Alternativa A]**: [Prós e contras]
2. **[Alternativa B]**: [Prós e contras]

## Consequências
### Positivas
- [Benefícios da decisão]

### Negativas
- [Trade-offs aceitos]

## Referências
- [Links relevantes]
```

### Localização: `docs/adr/` ou `.agents/references/adr/`

---

## 📝 JSDoc / TSDoc

### Padrão para Funções:

```ts
/**
 * Valida e formata um CPF brasileiro.
 *
 * @param cpf - CPF em formato string (com ou sem pontuação)
 * @returns CPF formatado (XXX.XXX.XXX-XX) ou null se inválido
 * @throws {ValidationError} Se o input não for uma string
 *
 * @example
 * ```ts
 * formatCPF("12345678901") // "123.456.789-01"
 * formatCPF("123.456.789-01") // "123.456.789-01"
 * formatCPF("invalid") // null
 * ```
 */
export function formatCPF(cpf: string): string | null {
  // implementação
}
```

### Padrão para Interfaces/Types:

```ts
/**
 * Representa um usuário do sistema.
 *
 * @property id - Identificador único (UUID v4)
 * @property email - Email validado e normalizado (lowercase)
 * @property role - Papel do usuário no sistema
 * @property createdAt - Data de criação (ISO 8601)
 */
export interface User {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}
```

### Regras de JSDoc/TSDoc:
- [ ] Toda função pública exportada tem JSDoc.
- [ ] Toda interface/type exportada tem descrição.
- [ ] Parâmetros com `@param` e retorno com `@returns`.
- [ ] Exemplos com `@example` para funções complexas.
- [ ] Exceções documentadas com `@throws`.

---

## 📊 Documentação de API

### Para endpoints REST, documentar:

```markdown
## POST /api/users

Cria um novo usuário no sistema.

### Request

**Headers:**
| Header | Valor | Obrigatório |
|--------|-------|-------------|
| `Authorization` | `Bearer <token>` | Sim |
| `Content-Type` | `application/json` | Sim |

**Body:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | string | Sim | Nome completo (3-100 caracteres) |
| `email` | string | Sim | Email válido |
| `role` | enum | Não | "admin", "editor", "viewer" (default: "viewer") |

### Response

**200 OK:**
{ "success": true, "data": { "id": "uuid", "name": "...", "email": "..." } }

**400 Bad Request:**
{ "success": false, "errors": [...] }

**401 Unauthorized:**
{ "success": false, "error": "Token inválido ou expirado" }
```

---

## 📝 Comentários Inline

### Quando comentar:
- [ ] Lógica complexa que não é óbvia.
- [ ] Workarounds com referência ao issue/bug.
- [ ] Decisões de design com justificativa.
- [ ] TODOs com ticket/issue associado.

### Quando NÃO comentar:
- [ ] Código auto-explicativo.
- [ ] Reafirmação do que o código já diz.
- [ ] Código comentado (deletar em vez de comentar).

```ts
// ✅ Bom — Explica o porquê
// Workaround para bug do Safari com date parsing (issue #234)
const date = new Date(dateStr.replace(/-/g, "/"));

// ❌ Ruim — Reafirma o óbvio
// Incrementa o contador
counter++;

// ✅ Bom — TODO com referência
// TODO(#456): Migrar para WebSocket quando backend estiver pronto
```

---

## ⚠️ Regras Invioláveis

1. **SEMPRE** manter README atualizado com instruções de instalação
2. **NUNCA** deixar código comentado no repositório
3. **SEMPRE** documentar funções públicas com JSDoc/TSDoc
4. **SEMPRE** criar ADR para decisões arquiteturais significativas
5. **NUNCA** escrever TODOs sem referência a issue/ticket
6. **SEMPRE** documentar variáveis de ambiente no README e `.env.example`
