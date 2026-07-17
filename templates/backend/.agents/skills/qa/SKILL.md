---
name: generic-backend-qa
description: |
  Skill de Quality Assurance para Backend. Checklist completo para testes unitários, testes de integração,
  auditoria de segurança de APIs, monitoramento de performance e vazamento de conexões.
---

# Skill Backend QA — Checklist de Qualidade

## 🧪 Estratégia de Testes Automatizados
- **Testes Unitários**: Isole lógicas puras de negócio com mocks de banco de dados e APIs externas.
- **Testes de Integração**: Teste fluxos completos de requisições HTTP e garanta que o banco de dados de teste seja resetado a cada rodada.

---

## 🔒 Checklist de Segurança e Integridade (QA)
- [ ] Validações de tamanho de payload para bloquear requisições exageradas.
- [ ] Senhas salvas com hash seguro no banco.
- [ ] Credenciais sensíveis e tokens gerenciados via variáveis de ambiente, nunca expostos no código-fonte.
- [ ] Respostas de erro formatadas sem stack traces internos em ambiente de produção.
- [ ] Logs estruturados para erros críticos.
- [ ] Conexões de banco abertas nos testes são devidamente encerradas após a execução.
