# Arquitetura Express

## 📁 Estrutura de Pastas Recomendada

```
src/
├── config/                 # Configurações globais (banco de dados, variáveis de ambiente)
├── controllers/            # Recebe requisições HTTP, chama services e retorna respostas
├── middlewares/            # Middlewares de validação, autenticação, tratamento de erros
├── models/                 # Modelos do banco de dados (Sequelize, Prisma, Mongoose)
├── repositories/           # Camada de abstração de acesso ao banco (opcional)
├── routes/                 # Definição das rotas e mapeamento para controllers
├── services/               # Lógica de negócio e regras da aplicação
├── utils/                  # Classes auxiliares, helpers e constantes
├── app.ts                  # Configuração do express e middlewares globais
└── server.ts               # Inicialização (bootstrap) do servidor HTTP
```

## 🏗️ Padrões de Arquitetura

### 1. Separação Estrita de Camadas
- **Roteamento**: Apenas direciona as rotas para o controller adequado.
- **Controller**: Ponto de entrada HTTP. Valida os dados da requisição (usando middlewares) e delega para o Service correspondente.
- **Service**: Onde a lógica de negócio reside. Não sabe nada sobre objetos HTTP (`req`, `res`).

### 2. Middleware Global de Erros
Sempre posicione o middleware de erro como o último middleware registrado no `app`:
```typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Erro Interno do Servidor' });
});
```

### 3. Validação Desacoplada
Implemente middlewares que interceptam e validam requisições usando bibliotecas como Zod:
```typescript
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    res.status(400).json(err.errors);
  }
};
```
