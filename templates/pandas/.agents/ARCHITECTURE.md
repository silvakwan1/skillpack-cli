# Arquitetura de Projetos de Dados (Pandas)

## 📁 Estrutura de Pastas Recomendada

```
data-project/
├── data/
│   ├── raw/                # Dados originais e imutáveis
│   ├── processed/          # Dados limpos e prontos para modelagem/análise
│   └── temp/               # Arquivos temporários de cache
│
├── notebooks/              # Jupyter Notebooks para exploração e prototipagem
│   ├── 1.0-exploration.ipynb
│   └── 2.0-feature-engineering.ipynb
│
├── src/                    # Código produtivo e scripts reutilizáveis
│   ├── __init__.py
│   ├── data_loader.py      # Funções de carregamento de dados (I/O)
│   ├── cleaning.py         # Funções puras de limpeza de dados
│   ├── features.py         # Engenharia de features e transformações
│   └── visualization.py    # Geração de plots e relatórios visuais
│
├── tests/                  # Testes unitários com Pytest
│   ├── test_cleaning.py
│   └── test_features.py
│
├── requirements.txt        # Dependências do projeto
└── pytest.ini              # Configuração do Pytest
```

## 🏗️ Padrões de Arquitetura de Dados

### 1. Funções Puras de Transformação
Toda transformação de dados no diretório `src/` deve ser implementada em funções puras que recebem um DataFrame e retornam um novo DataFrame (sem alterar o original inplace).
```python
def clean_names(df: pd.DataFrame) -> pd.DataFrame:
    return df.assign(
        name=df['name'].str.strip().str.title()
    )
```

### 2. Versionamento de Dados
Nunca substitua os dados originais no disco (`data/raw/`). Sempre salve os resultados intermediários ou finais em subpastas correspondentes (ex: `data/processed/`).

### 3. Notebooks para Exploração, Scripts para Produção
Os Notebooks (`.ipynb`) servem para exploração interativa. Assim que uma lógica estiver madura e testada, extraia-a para arquivos `.py` dentro da pasta `src/` para ser rodada em pipelines automatizados.
