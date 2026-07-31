---
name: generic-frontend
description: |
  Skill de frontend geral. Contém diretrizes de estilização, padrões de UI, acessibilidade,
  responsividade mobile-first e estruturação semântica.
---

# Skill Frontend Geral — Melhores Práticas

## 💅 Estilização e CSS/Tailwind
- **Design Tokens**: Sempre use tokens de cores, fontes e espaçamentos do projeto. Evite estilizações hardcoded.
- **Mobile-first**: Defina estilos para telas pequenas primeiro e adicione media queries/breakpoints progressivamente para telas maiores.
- **Transições suaves**: Sempre inclua transições para efeitos de hovers e interações ativas em botões e links.

```html
<!-- Exemplo Mobile-first -->
<div class="p-4 md:p-8 lg:p-12 bg-theme-blue text-theme-white">
  Conteúdo responsivo
</div>
```

---

## ♿ Acessibilidade (a11y)
- **HTML Semântico**: Use `<main>`, `<header>`, `<footer>`, `<section>` para estruturar o documento de forma legível por leitores de tela.
- **Formulários**: Sempre vincule `<label>` ao `<input>` usando o atributo `for` ou `htmlFor`.
- **Aria Attributes**: Adicione `aria-label` ou `aria-expanded` para componentes dinâmicos (como modais ou menus hamburguer).

---

## ⚡ Next/React/Modern Frameworks Best Practices
- **Server vs Client**: Evite reatividade desnecessária no client-side. Renderize de forma estática no servidor tudo o que for possível.
- **Clean Imports**: Ordene suas importações para facilitar a leitura dos arquivos.
- **Zero any**: Em TypeScript, defina interfaces explícitas para todas as props e retornos de funções.

---

## 📋 Formulários com React Hook Form + Zod

### Instalação:
```bash
npm install react-hook-form @hookform/resolvers zod
```

### Padrão de Formulário Completo:

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Schema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido").optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(1000),
  acceptTerms: z.boolean().refine((val) => val === true, "Você deve aceitar os termos"),
});

// 2. Tipo inferido do schema
type ContactFormData = z.infer<typeof contactSchema>;

// 3. Componente do formulário
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao enviar");
      reset();
      // Mostrar toast de sucesso
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
```

### Schemas Zod Reutilizáveis:

```typescript
// schemas/common.ts
import { z } from "zod";

// CPF brasileiro
export const cpfSchema = z.string().regex(
  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  "CPF inválido (formato: 000.000.000-00)"
);

// Telefone brasileiro
export const phoneSchema = z.string().regex(
  /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  "Telefone inválido (formato: (00) 00000-0000)"
);

// Email normalizado
export const emailSchema = z.string().email("Email inválido").transform((v) => v.toLowerCase().trim());

// Senha forte
export const passwordSchema = z.string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial");
```

### Regras de React Hook Form + Zod:
- [ ] **Sempre usar `zodResolver`** — nunca validar manualmente dentro do `onSubmit`.
- [ ] **Tipar formulários** — usar `z.infer<typeof schema>` para gerar o tipo automaticamente.
- [ ] **defaultValues** — sempre definir valores iniciais para todos os campos.
- [ ] **Mensagens de erro** — sempre mostrar `errors.campo.message` abaixo do input.
- [ ] **Loading state** — usar `isSubmitting` para desabilitar botão durante envio.
- [ ] **Reset após sucesso** — chamar `reset()` após submit bem-sucedido.
- [ ] **Schemas reutilizáveis** — extrair validações comuns (CPF, email, telefone) para arquivo compartilhado.

