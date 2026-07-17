---
name: generic-backend
description: |
  Skill de backend geral. Contém melhores práticas para arquitetura em camadas,
  segurança de APIs, acesso a bancos de dados relacionais/NoSQL e tratamento de erros.
---

# Skill Backend Geral — Melhores Práticas

## 🌐 APIs RESTful e Protocolos
- **Status Semânticos**: Use os códigos HTTP corretos (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Error`).
- **Nomes de Recursos**: Use substantivos no plural para rotas (ex: `/api/v1/users` em vez de `/api/v1/getUser`).
- **Validação**: Valide dados de entrada (body, params, query) usando bibliotecas de validação específicas de cada linguagem.

---

## 🔒 Segurança de Backend
1. **Sanitização**: Evite SQL injection utilizando queries parametrizadas ou ORMs robustos.
2. **Criptografia**: Salve senhas usando algoritmos de hash seguros como `bcrypt`, `argon2` ou `scrypt` (nunca MD5 ou SHA-1).
3. **CORS e Headers**: Configure políticas CORS restritivas e utilize cabeçalhos de segurança adequados (como Helmet para Node.js).
4. **Rate Limiting**: Habilite limites de requisição por IP em endpoints sensíveis.

---

## ⚙️ Conexão com Banco de Dados
- **Connection Pools**: Configure pools de conexão para bancos de dados relacionais a fim de otimizar a reutilização de conexões e evitar sobrecarga do servidor.
- **Transactions**: Use transações explícitas quando realizar inserções ou atualizações em múltiplas tabelas que dependem uma da outra para manter a consistência dos dados.
