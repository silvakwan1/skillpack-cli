---
name: laravel-backend
description: |
  Skill de backend para Laravel. Contém boas práticas do Eloquent ORM, Controllers, Form Requests,
  Services/Actions, tratamento de erros, migrations e segurança PHP.
  Consulte esta skill antes de programar lógica de servidor em Laravel.
---

# Skill Laravel Backend — Melhores Práticas

## 📦 Eloquent ORM e Models
- **Evite SQL Bruto**: Sempre use Eloquent ou Query Builder para queries.
- **Eager Loading**: Sempre use `with()` para evitar o problema de queries N+1 quando buscar dados relacionados.
- **Mass Assignment Protection**: Defina as propriedades `$fillable` ou `$guarded` nos models.
- **Relacionamentos**: Defina tipos de retorno explicitamente nos métodos de relacionamento.

```php
// ✅ BOM
public function posts(): HasMany
{
    return $this->hasMany(Post::class);
}

// Buscar com eager loading
$users = User::with('posts')->get();
```

---

## 🌐 HTTP e Validação
- **Form Requests**: Separe a validação do controller usando Form Requests.
- **API Resources**: Use resources para transformar os dados retornados nas APIs.

```php
// app/Http/Requests/StorePostRequest.php
public function rules(): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'body' => ['required', 'string'],
    ];
}
```

---

## ⚙️ Services e Actions
- Extraia a lógica pesada de negócio dos Controllers para classes dedicadas de Serviço ou Ação.
- Use Injeção de Dependência no construtor para acoplar essas classes.

```php
// app/Actions/CreatePostAction.php
class CreatePostAction
{
    public function execute(array $data, User $author): Post
    {
        return DB::transaction(function () use ($data, $author) {
            return $author->posts()->create($data);
        });
    }
}
```

---

## 🔒 Segurança Backend
1. **Proteção CSRF**: Garanta que todas as rotas web usem o middleware de CSRF.
2. **Autorização**: Use Policies ou Gates para validar permissões de usuários em controllers.
```php
public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);
    // ...
}
```
3. **Escapes HTML**: No Blade, use sempre `{{ $value }}` que escapa o conteúdo contra XSS. Evite `{!! $value !!}` a menos que o conteúdo tenha sido sanitizado previamente.
