---
name: express-backend
description: |
  Skill de backend para Express. Contém padrões de criação de rotas, estruturação de controladores,
  gerenciamento de middlewares, tratamento centralizado de erros e segurança HTTP.
---

# Skill Express Backend — Melhores Práticas

## 🌐 Roteamento e Controladores
- **Rotas Limpas**: As rotas devem apenas mapear verbos HTTP e caminhos para os respectivos métodos de controladores.
- **Async/Await Wrapper**: Use wrappers ou pacotes como `express-async-errors` para lidar com exceções em middlewares assíncronos de forma limpa, evitando a necessidade de usar blocos `try/catch` repetitivos em cada controller.

```typescript
// users.controller.ts
import { Request, Response } from 'express';
import { usersService } from '../services/users.service';

export const createUser = async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
};
```

---

## 🔒 Middlewares e Segurança
1. **Helmet**: Sempre habilite o `helmet` no topo da aplicação para adicionar cabeçalhos de segurança essenciais.
2. **CORS**: Configure a política de CORS especificando as origens permitidas.
3. **Autenticação**: Crie middlewares reutilizáveis para validar tokens (JWT, por exemplo) e injetar as informações do usuário logado na requisição (`req.user`).

```typescript
// middlewares/auth.ts
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```

---

## ⚙️ Tratamento de Erros e Validação
- **Validação com Zod**: Crie schemas Zod e execute-os em um middleware de validação antes de acessar o controller.
- **Erros Customizados**: Herde da classe `Error` padrão do JS para criar classes de erros HTTP específicas (ex: `NotFoundError`, `BadRequestError`, `UnauthorizedError`) facilitando a manipulação e a definição do status HTTP no middleware global de tratamento de erros.
