---
name: pandas-qa
description: |
  Skill de Quality Assurance para pipelines de dados Pandas. Checklist de validação de schemas,
  testes de transformações de dados com Pytest e monitoramento de tipos/nulos.
---

# Skill Pandas QA — Qualidade e Validação de Dados

## 🧪 Estratégias de Testes com Pytest
- **Fixtures estáveis**: Crie DataFrames de teste pequenos (fixtures) para validar funções de transformação.
- **Asserções de DataFrames**: Use `pd.testing.assert_frame_equal` para comparar os resultados calculados com os esperados (evita falsos positivos de ordenação e floats).

```python
# tests/test_cleaning.py
import pandas as pd
import pytest
from src.cleaning import clean_names

def test_clean_names():
    # Fixture de entrada
    df_input = pd.DataFrame({'name': [' alice ', 'BOB']})
    
    # Executa a função
    df_result = clean_names(df_input)
    
    # Resultado esperado
    df_expected = pd.DataFrame({'name': ['Alice', 'Bob']})
    
    pd.testing.assert_frame_equal(df_result, df_expected)
```

---

## 🔍 Checklist de Validação (QA)
- [ ] **Valores Nulos**: Verificar e tratar valores nulos (`.isnull().sum()`) antes e depois das transformações.
- [ ] **Registros Duplicados**: Validar se a chave primária ou colunas identificadoras possuem registros duplicados.
- [ ] **Data Types**: Garantir que as colunas de data/hora foram convertidas para `datetime64`.
- [ ] **Pandera Schemas**: Definir schemas para validar tipos, faixas de valores e nulos nos dados de entrada.
- [ ] **Memory Leak**: Verificar se grandes DataFrames intermediários são deletados da memória se não forem mais usados (`del df` + `gc.collect()`).
