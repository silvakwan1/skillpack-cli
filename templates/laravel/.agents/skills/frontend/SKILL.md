---
name: laravel-frontend
description: |
  Skill de frontend para Laravel (Blade, Livewire, Tailwind CSS, Alpine.js).
  Contém boas práticas de estilização, componentes Blade, estados reativos com Alpine e compilação via Vite.
---

# Skill Laravel Frontend — Melhores Práticas

## 🎨 Componentes Blade e Views
- **Componentização**: Crie componentes Blade reutilizáveis (`resources/views/components/`) para botões, inputs, modais e layouts.
- **Inheritance vs Components**: Use layouts compartilhados via `<x-layout>` em vez do antigo `@extends` / `@section`.

```blade
<!-- resources/views/components/button.blade.php -->
@props(['variant' => 'primary'])

@php
    $classes = $variant === 'primary' 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
@endphp

<button {{ $attributes->merge(['class' => "px-4 py-2 rounded-lg font-medium transition-colors {$classes}"]) }}>
    {{ $slot }}
</button>
```

---

## ⚡ Livewire e Alpine.js
- **Lazy Loading**: Use `wire:lazy` em componentes pesados do Livewire que não precisam ser renderizados imediatamente.
- **Alpine.js para UI simples**: Use Alpine para estados locais de frontend (como abrir/fechar modais, dropdowns) sem precisar de requisições de servidor via Livewire.

```blade
<!-- Dropdown simples com Alpine.js -->
<div x-data="{ open: false }" class="relative">
    <button @click="open = !open">Menu</button>
    <div x-show="open" @click.away="open = false" class="absolute">
        <!-- Itens -->
    </div>
</div>
```

---

## 💅 Vite e Tailwind CSS
- Use `@vite(['resources/css/app.css', 'resources/js/app.js'])` no head do layout.
- Certifique-se de configurar corretamente o arquivo `tailwind.config.js` para escanear todos os arquivos de view e componentes do Laravel (`./resources/**/*.blade.php`).
- Mantenha classes utilitárias organizadas e evite criar CSS personalizado a menos que estritamente necessário.
