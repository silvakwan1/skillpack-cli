# Arquitetura Backend

## 📁 Estrutura de Pastas Recomendada

```
src/
├── config/                 # Configurações globais da aplicação (env, database, cache)
├── controllers/            # Ponto de entrada HTTP/gRPC (validação e repasse para services)
├── models/entities/        # Representação de tabelas/coleções do banco de dados
├── repositories/           # Abstração de operações de acesso a dados (SQL/NoSQL)
├── services/domain/        # Lógica de negócio core e regras da aplicação
├── middlewares/            # Filtros de requisições (autenticação, rate-limiter, erros)
├── utils/                  # Auxiliares puras e constantes
└── main/index/app/         # Inicialização do servidor
```

## 🏗️ Padrões de Arquitetura

### 1. Desacoplamento de Infraestrutura
A lógica de negócio (Services) não deve depender diretamente de bibliotecas HTTP ou de controllers específicos. Isso garante que a lógica possa ser exposta via HTTP, CLI ou filas com facilidade.

### 2. Validação na Borda (Edge Validation)
Todos os dados recebidos devem ser validados logo na entrada do Controller. Se forem inválidos, a requisição deve ser rejeitada imediatamente com o status HTTP 400 correspondente.

### 3. Conexões de Banco Resilientes
Implemente tratamento de reconexão automática e pool de conexões configurado adequadamente para suportar picos de carga sem derrubar o banco.
