---
name: code-review
description: |
  Skill de revisão de código multi-eixo. Avalia corretude, legibilidade, arquitetura,
  performance e segurança. Inclui checklists, templates de feedback e critérios de
  aprovação/reprovação. Use para revisar código antes de merge ou para auditar qualidade.
---

# Skill Code Review — Revisão de Código

## 🔍 Eixos de Revisão

Toda revisão de código deve avaliar os seguintes eixos, em ordem de prioridade:

### 1. Corretude (Prioridade Máxima)
- [ ] A lógica resolve o problema proposto?
- [ ] Edge cases tratados (null, undefined, empty, overflow)?
- [ ] Tratamento de erros adequado (try/catch, .catch(), error boundaries)?
- [ ] Sem race conditions ou bugs de concorrência?
- [ ] Tipos corretos e sem coerções perigosas (`as any`, `as unknown as`)?

### 2. Segurança
- [ ] Inputs validados e sanitizados?
- [ ] Sem secrets ou dados sensíveis expostos?
- [ ] Sem vulnerabilidades de injection (SQL, XSS, command)?
- [ ] Autorização verificada em endpoints/actions?
- [ ] Consulte a skill `security-audit` para checklist completo.

### 3. Arquitetura e Design
- [ ] Segue princípios SOLID?
- [ ] Single Responsibility — cada função/classe faz uma coisa?
- [ ] DRY — sem duplicação de lógica?
- [ ] Dependências corretas (não importa camadas erradas)?
- [ ] Abstração adequada (nem muito genérico, nem muito específico)?

### 4. Legibilidade e Manutenibilidade
- [ ] Nomes claros e descritivos (variáveis, funções, classes)?
- [ ] Funções curtas (< 30 linhas idealmente)?
- [ ] Comentários explicam o **porquê**, não o **quê**?
- [ ] Complexidade ciclomática baixa (poucos níveis de aninhamento)?
- [ ] Imports organizados e sem imports não utilizados?

### 5. Performance
- [ ] Sem operações O(n²) desnecessárias?
- [ ] Sem queries N+1 (batching quando possível)?
- [ ] Sem re-renders desnecessários (React)?
- [ ] Lazy loading para recursos pesados?
- [ ] Caching aplicado onde faz sentido?

### 6. Testes
- [ ] Testes unitários para lógica de negócio?
- [ ] Testes de integração para endpoints/APIs?
- [ ] Coverage adequado para o código alterado?
- [ ] Testes de edge cases incluídos?

---

## 📋 Workflow de Revisão

### Ao receber código para revisar:

1. **Entender o contexto**
   - Qual o objetivo da mudança?
   - Quais arquivos foram alterados?
   - Qual o impacto (breaking change, feature, fix)?

2. **Revisão por eixo**
   - Percorrer cada eixo acima na ordem de prioridade.
   - Anotar findings com severidade.

3. **Classificar findings**
   - 🔴 **Bloqueante**: Bugs, vulnerabilidades, lógica incorreta → Reprovar.
   - 🟡 **Importante**: Design ruim, duplicação, falta de testes → Solicitar correção.
   - 🟢 **Sugestão**: Melhorias de legibilidade, naming, estilo → Comentar sem bloquear.

4. **Gerar relatório**

---

## 📝 Template de Revisão

```markdown
# Code Review — [Descrição da Mudança]

**Revisor**: Code Review Agent
**Data**: YYYY-MM-DD
**Status**: ✅ Aprovado / ❌ Reprovado / ⚠️ Aprovado com ressalvas

## Resumo
[Breve descrição do que foi revisado]

## Avaliação por Eixo

| Eixo | Status | Observações |
|------|--------|------------|
| Corretude | ✅/❌ | |
| Segurança | ✅/❌ | |
| Arquitetura | ✅/❌ | |
| Legibilidade | ✅/❌ | |
| Performance | ✅/❌ | |
| Testes | ✅/❌ | |

## Findings

### 🔴 Bloqueantes
1. [Arquivo:Linha] — Descrição do problema + sugestão de correção

### 🟡 Importantes
1. [Arquivo:Linha] — Descrição + sugestão

### 🟢 Sugestões
1. [Arquivo:Linha] — Sugestão de melhoria
```

---

## 🚦 Critérios de Aprovação

### ✅ Aprovado — Quando:
- Zero findings bloqueantes
- Lógica correta e edge cases tratados
- Testes adequados para a mudança
- Segurança verificada

### ❌ Reprovado — Quando (qualquer um bloqueia):
- Bug de lógica no código
- Vulnerabilidade de segurança
- Ausência total de testes para lógica nova
- Uso de `any` ou coerções perigosas sem justificativa
- Código duplicado que deveria ser extraído

### ⚠️ Aprovado com Ressalvas — Quando:
- Findings apenas de nível sugestão/importante
- Melhorias podem ser feitas em PR separado
- Não há risco para produção

---

## ⚠️ Regras Invioláveis

1. **SEMPRE** revisar todos os 6 eixos, mesmo em mudanças pequenas
2. **NUNCA** aprovar código sem verificar tratamento de erros
3. **SEMPRE** classificar findings por severidade
4. **NUNCA** ignorar warnings de lint ou type errors
5. **SEMPRE** gerar relatório completo de revisão
6. **SEMPRE** verificar se testes existentes continuam passando
