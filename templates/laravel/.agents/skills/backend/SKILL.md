---
name: laravel-backend
description: |
  Skill de backend para Laravel. Contém padrões de Clean Architecture, Form Requests, Eloquent ORM,
  API Resources, Jobs/Queues, Pest PHP testing e boas práticas de segurança.
---

# Skill Laravel Backend — Melhores Práticas & Clean Architecture

## 🏛️ Estrutura Arquitetural Recomendada (Clean Architecture / Domain Driven)

- **`app/Domain/`**: Entidades, Value Objects e interfaces de Repositórios sem acoplamento com o framework.
- **`app/Actions/` ou `app/Services/`**: Casos de uso (Use Cases) que orquestram regras de negócio puras.
- **`app/Infrastructure/`**: Implementações concretas de repositórios usando Eloquent ORM e adapters.
- **`app/Http/`**: Controllers enxutos, Form Requests para validação e API Resources para formatação de respostas JSON.

---

## 📋 Form Requests & Controllers Enxutos

- **Controllers "Thin"**: Controllers devem apenas receber o Form Request, delegar a execução para uma Action/Service e retornar um API Resource ou resposta JSON.
- **Form Requests**: Toda validação de entrada deve ocorrer em classes `FormRequest`.

```php
// app/Http/Requests/StoreUserRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
```

---

## ⚡ Eloquent ORM & Prevenção do Problema N+1

- **Eager Loading**: Sempre utilize `with()` para carregar relacionamentos e evitar queries N+1.
- **API Resources**: Nunca retorne modelos Eloquent brutos. Mapeie os dados usando `JsonResource`.

```php
// app/Http/Resources/UserResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
```

---

## 🧪 Estratégia de Testes com Pest PHP

- **Feature Tests**: Teste requisições HTTP simuladas ponta a ponta.
- **Unit Tests**: Teste Actions e Services de forma isolada com `expect()`.

```php
// tests/Feature/UserRegistrationTest.php
test('new users can register with valid payload', function () {
    $response = $this->postJson('/api/v1/users', [
        'name' => 'Kauan Ferreira',
        'email' => 'kauan@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure(['data' => ['id', 'name', 'email']]);

    $this->assertDatabaseHas('users', ['email' => 'kauan@example.com']);
});
```

---

## 🔒 Regras de Segurança:
- [ ] **Mass Assignment**: Sempre proteja modelos com `$fillable` explícito ou `$guarded`.
- [ ] **SQL Injection**: Evite `DB::raw()` sem bindings parametrizados.
- [ ] **Sanitize & Validate**: Validar todas as entradas antes de qualquer mutação no banco.
