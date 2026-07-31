---
name: frontend
description: |
  Skill de frontend universal. Contém diretrizes de estilização, componentes reativos,
  acessibilidade (WCAG), responsividade mobile-first e validações de formulários client-side.
---

# Skill Frontend Universal — Melhores Práticas

## 💅 Estilização e CSS
- **Design Tokens**: Sempre use tokens de cores, fontes e espaçamentos do projeto. Evite estilizações hardcoded.
- **Mobile-first**: Defina estilos para telas pequenas primeiro e adicione media queries/breakpoints progressivamente.
- **Transições suaves**: Sempre inclua transições para efeitos de hovers e interações ativas em botões e links.

---

## ♿ Acessibilidade (a11y)
- **HTML Semântico**: Use `<main>`, `<header>`, `<footer>`, `<section>` para estruturar o documento.
- **Formulários**: Sempre vincule `<label>` ao `<input>` usando o atributo `for` ou `htmlFor`.
- **Aria Attributes**: Adicione `aria-label` ou `aria-expanded` para componentes dinâmicos.

---

## 📋 Formulários com React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3, "Nome mínimo de 3 caracteres"),
  email: z.string().email("Email inválido"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <button type="submit">Enviar</button>
    </form>
  );
}
```
