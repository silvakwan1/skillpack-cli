---
name: security-audit
description: |
  Skill de auditoria de segurança universal. Contém checklist baseado no OWASP Top 10,
  verificação de secrets expostos, análise de dependências vulneráveis, prevenção de
  XSS/CSRF/SQLi e boas práticas de segurança para qualquer stack.
  Use esta skill para auditar segurança do código antes de merge ou deploy.
---

# Skill Security Audit — Auditoria de Segurança

## 🔒 Checklist OWASP Top 10

### 1. Injection (A03:2021)
- [ ] **SQL Injection**: Nunca concatenar strings em queries SQL. Usar ORMs ou prepared statements.
- [ ] **NoSQL Injection**: Validar inputs antes de passar para queries MongoDB/Firestore.
- [ ] **Command Injection**: Nunca usar `exec()`, `eval()` ou `child_process.exec()` com input do usuário sem sanitização.
- [ ] **Template Injection**: Validar inputs em templates (Handlebars, EJS, Jinja2).

```ts
// ✅ Correto — Prepared Statement / ORM
const user = await db.user.findUnique({ where: { id: userId } });

// ❌ Vulnerável — Concatenação
const user = await db.$queryRaw(`SELECT * FROM users WHERE id = '${userId}'`);
```

### 2. Broken Authentication (A07:2021)
- [ ] Senhas nunca armazenadas em plain text (usar bcrypt/argon2).
- [ ] Tokens JWT com expiração curta e refresh token seguro.
- [ ] Rate limiting em endpoints de login/registro.
- [ ] MFA (Multi-Factor Authentication) implementado para operações sensíveis.

### 3. Sensitive Data Exposure (A02:2021)
- [ ] Secrets NUNCA no código fonte (usar variáveis de ambiente).
- [ ] Verificar `.env` no `.gitignore`.
- [ ] Dados sensíveis (CPF, cartão, senhas) nunca em logs.
- [ ] HTTPS obrigatório em produção.
- [ ] Headers de segurança configurados (HSTS, X-Content-Type-Options, X-Frame-Options).

### 4. XSS — Cross-Site Scripting (A03:2021)
- [ ] Inputs sanitizados antes de renderizar (usar DOMPurify ou equivalente).
- [ ] `dangerouslySetInnerHTML` usado apenas com sanitização prévia.
- [ ] Content-Security-Policy (CSP) configurado.
- [ ] Cookies com flags `HttpOnly`, `Secure`, `SameSite`.

### 5. CSRF — Cross-Site Request Forgery (A01:2021)
- [ ] Tokens CSRF em formulários de mutação.
- [ ] Validação de `Origin` e `Referer` headers.
- [ ] Cookies com `SameSite=Strict` ou `SameSite=Lax`.

---

## 🔍 Checklist de Secrets e Variáveis de Ambiente

### Padrões que NUNCA devem estar no código:
```text
# Regex para detectar secrets expostos
(?i)(api[_-]?key|secret|password|token|auth|credential)[\s]*[=:]\s*['"][^'"]+['"]
```

### Verificações:
- [ ] Nenhum `.env` comitado no repositório.
- [ ] `.env.example` existe com placeholders (sem valores reais).
- [ ] Secrets de produção gerenciados via secrets manager (Vault, AWS Secrets, GCP Secret Manager).
- [ ] Variáveis `NEXT_PUBLIC_*` ou equivalentes NÃO contêm secrets (são expostas no client).

---

## 📦 Checklist de Dependências

### Verificações:
- [ ] `npm audit` ou `yarn audit` sem vulnerabilidades críticas/altas.
- [ ] Dependências com versões fixas ou range controlado no `package.json`.
- [ ] Lockfile (`package-lock.json` / `yarn.lock`) commitado.
- [ ] Sem dependências abandonadas (última atualização > 2 anos).
- [ ] Sem dependências com licenças incompatíveis (GPL em projeto closed-source).

### Comandos de Verificação:
```bash
# Node.js
npm audit --audit-level=high

# Python
pip-audit

# Geral
snyk test
```

---

## 🛡️ Checklist de Infraestrutura

### Headers de Segurança:
- [ ] `Strict-Transport-Security` (HSTS)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY` ou `SAMEORIGIN`
- [ ] `Content-Security-Policy` configurado
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`

### Rate Limiting:
- [ ] Endpoints de autenticação com rate limit (ex: 5 tentativas/minuto).
- [ ] APIs públicas com rate limit por IP.
- [ ] Uploads com limite de tamanho e tipo.

---

## 📋 Template de Relatório de Segurança

```markdown
# Relatório de Auditoria de Segurança

**Data**: YYYY-MM-DD
**Auditor**: Security Audit Agent
**Escopo**: [Descrição do escopo auditado]

## Resumo
| Severidade | Quantidade |
|------------|-----------|
| 🔴 Crítico | X |
| 🟠 Alto    | X |
| 🟡 Médio   | X |
| 🟢 Baixo   | X |

## Findings
### [SEV-001] Título do Finding
- **Severidade**: 🔴 Crítico
- **Arquivo**: `path/to/file.ts:L42`
- **Descrição**: [O que foi encontrado]
- **Impacto**: [Qual o risco]
- **Remediação**: [Como corrigir]
```

---

## ⚠️ Regras Invioláveis

1. **NUNCA** aprovar código com secrets hardcoded
2. **NUNCA** ignorar vulnerabilidades críticas em dependências
3. **SEMPRE** validar e sanitizar inputs do usuário
4. **SEMPRE** usar HTTPS e headers de segurança em produção
5. **SEMPRE** aplicar princípio do menor privilégio (least privilege)
6. **NUNCA** expor stack traces ou detalhes internos em respostas de erro de produção
