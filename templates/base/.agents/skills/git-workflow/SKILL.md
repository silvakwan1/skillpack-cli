---
name: git-workflow
description: |
  Skill de workflow Git. Define padrões de commits semânticos, estratégia de branching,
  templates de Pull Request, geração de changelog e boas práticas de versionamento.
  Use para padronizar o uso de Git no projeto e automatizar descrições de PR.
---

# Skill Git Workflow — Padrões de Git

## 📝 Commits Semânticos (Conventional Commits)

Todo commit DEVE seguir o formato:

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[footer opcional]
```

### Tipos Obrigatórios:

| Tipo | Quando usar | Exemplo |
|------|------------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adicionar login com Google` |
| `fix` | Correção de bug | `fix(api): corrigir timeout em upload de imagens` |
| `docs` | Documentação | `docs(readme): atualizar instruções de instalação` |
| `style` | Formatação (sem mudança de lógica) | `style(components): aplicar prettier` |
| `refactor` | Refatoração (sem mudança de comportamento) | `refactor(utils): extrair função de validação de CPF` |
| `test` | Adicionar ou corrigir testes | `test(auth): adicionar testes para logout` |
| `chore` | Manutenção (configs, deps) | `chore(deps): atualizar next para 14.2.0` |
| `perf` | Melhoria de performance | `perf(queries): otimizar query de listagem de posts` |
| `ci` | Mudanças de CI/CD | `ci(github): adicionar workflow de deploy` |
| `build` | Build system / dependências | `build(tsconfig): habilitar strict mode` |

### Regras de Commit:
- [ ] Descrição no imperativo: "adicionar", não "adicionado" ou "adicionando".
- [ ] Limite de 72 caracteres na primeira linha.
- [ ] Escopo entre parênteses é opcional mas recomendado.
- [ ] Body e footer separados por linha em branco.
- [ ] Breaking changes: adicionar `!` após o tipo ou `BREAKING CHANGE:` no footer.

```bash
# ✅ Correto
git commit -m "feat(auth): adicionar autenticação OAuth com GitHub"

# ✅ Com breaking change
git commit -m "feat(api)!: alterar formato de resposta do endpoint /users"

# ❌ Errado
git commit -m "alterações diversas"
git commit -m "fix stuff"
git commit -m "WIP"
```

---

## 🌿 Estratégia de Branching

### Modelo Recomendado: GitHub Flow (Simplificado)

```
main (produção)
  ├── feat/login-social
  ├── fix/upload-timeout
  ├── docs/readme-update
  └── refactor/auth-module
```

### Convenção de Nomes de Branch:

| Prefixo | Uso | Exemplo |
|---------|-----|---------|
| `feat/` | Nova feature | `feat/payment-integration` |
| `fix/` | Correção de bug | `fix/login-redirect-loop` |
| `docs/` | Documentação | `docs/api-endpoints` |
| `refactor/` | Refatoração | `refactor/user-service` |
| `test/` | Testes | `test/e2e-checkout` |
| `chore/` | Manutenção | `chore/update-dependencies` |
| `hotfix/` | Correção urgente em produção | `hotfix/critical-auth-bypass` |

### Regras:
- [ ] Branch sempre criada a partir de `main` atualizado.
- [ ] Nome em kebab-case, em inglês.
- [ ] Uma feature/fix por branch (atômico).
- [ ] Rebase antes de merge para manter histórico limpo.

---

## 📋 Template de Pull Request

```markdown
## Descrição
[Breve descrição do que esta PR faz]

## Tipo de Mudança
- [ ] 🆕 Nova feature
- [ ] 🐛 Correção de bug
- [ ] 📝 Documentação
- [ ] ♻️ Refatoração
- [ ] 🧪 Testes
- [ ] 🔧 Manutenção

## Mudanças Realizadas
- [Lista de mudanças principais]

## Como Testar
1. [Passos para testar]
2. [Resultado esperado]

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada (se aplicável)
- [ ] Sem warnings de lint
- [ ] Build passa sem erros
- [ ] Self-review realizado

## Screenshots (se aplicável)
[Antes/Depois]
```

---

## 📖 Geração de Changelog

### Formato (Keep a Changelog):

```markdown
# Changelog

## [1.2.0] - 2025-01-15

### Adicionado
- Login social com Google e GitHub (#42)
- Página de perfil do usuário (#45)

### Corrigido
- Timeout em upload de imagens grandes (#38)
- Redirect loop após logout (#41)

### Alterado
- Formato de resposta do endpoint /users (BREAKING CHANGE)

### Removido
- Suporte a Node.js 16 (EOL)
```

---

## 🔄 Boas Práticas de Versionamento (SemVer)

| Versão | Quando incrementar |
|--------|-------------------|
| **MAJOR** (X.0.0) | Breaking changes |
| **MINOR** (0.X.0) | Novas features (backwards-compatible) |
| **PATCH** (0.0.X) | Bug fixes |

---

## ⚠️ Regras Invioláveis

1. **NUNCA** fazer commit diretamente na `main`
2. **SEMPRE** usar commits semânticos
3. **NUNCA** fazer `git push --force` na `main`
4. **SEMPRE** criar PR com descrição completa
5. **SEMPRE** fazer rebase antes de merge
6. **NUNCA** commitar arquivos `.env`, `node_modules`, ou secrets
