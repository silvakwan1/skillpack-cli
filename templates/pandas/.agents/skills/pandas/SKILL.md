---
name: pandas-data-analysis
description: |
  Skill de engenharia e análise de dados com Pandas e NumPy. Contém boas práticas de vetorização,
  method chaining, redução de consumo de memória, indexação correta e tratamento de valores nulos.
---

# Skill Pandas — Melhores Práticas

## ⚡ Vetorização e Performance
- **NUNCA use loops `for`** para iterar em DataFrames se uma operação vetorizada estiver disponível.
- Evite `.apply()` em operações matemáticas simples; prefira operações diretas de coluna.
- Use `.apply(..., axis=1)` apenas como último recurso, pois é equivalente a um loop em Python e é muito lento.
- Use NumPy (`np.where`, `np.select`) para condicionais de alta performance.

```python
# ✅ BOM — Vetorizado
df['total'] = df['price'] * df['quantity']

# ❌ RUIM — Lento com apply
df['total'] = df.apply(lambda row: row['price'] * row['quantity'], axis=1)
```

---

## ⛓️ Method Chaining (Encadeamento de Métodos)
- Use parênteses para agrupar operações sequenciais no DataFrame.
- Use `.assign()` para criar ou modificar colunas dentro do fluxo.
- Use lambdas dentro das funções para referenciar o estado intermediário do DataFrame.

```python
# ✅ BOM — Fluxo legível e sequencial
df_cleaned = (
    df
    .rename(columns={'User ID': 'user_id'})
    .dropna(subset=['email'])
    .assign(
        created_at=lambda d: pd.to_datetime(d['created_at']),
        is_active=lambda d: d['status'] == 'active'
    )
    .query('is_active == True')
)
```

---

## 💾 Otimização de Memória
1. **Tipos de Dados**: O Pandas lê textos como `object` por padrão. Converta colunas com pouca variação de texto para `category`.
2. **Tipagem de Inteiros e Floats**: Reduza a precisão quando possível (ex: `int64` para `int32` ou `int8`).
3. **Chunking**: Use o argumento `chunksize` ao ler arquivos CSV ou bancos de dados gigantes para não estourar a memória RAM.

```python
# Otimizando tipos
df['gender'] = df['gender'].astype('category')
df['age'] = df['age'].astype('int8')
```
