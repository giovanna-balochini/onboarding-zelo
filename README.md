# Onboarding Técnico do Zelo

Portal estático de onboarding técnico do Projeto Zelo, criado para apresentar de forma navegável o produto, a stack, a arquitetura, o Design System e o estado atual da implementação.

## Estrutura

- `index.html`: página principal do portal
- `css/`: estilos e tokens visuais
- `js/`: comportamento de navegação
- `assets/`: imagens e fontes locais

## Como abrir localmente

Você pode abrir o `index.html` direto no navegador, mas o ideal é servir a pasta localmente para garantir que todos os assets carreguem corretamente.

Exemplo com Python:

```bash
python -m http.server 5500
```

Depois, abra:

```text
http://localhost:5500/
```

## Publicação no GitHub Pages

Para publicar no GitHub Pages, envie estes arquivos para a raiz do repositório:

- `index.html`
- `css/`
- `js/`
- `assets/`

Depois, no GitHub:

1. Acesse `Settings`
2. Abra `Pages`
3. Em `Build and deployment`, escolha `Deploy from a branch`
4. Selecione a branch principal e a pasta `/ (root)`

## Observações

- O portal usa apenas arquivos estáticos.
- Não há dependências externas obrigatórias para a execução da página.
- Fontes e logo estão incluídas localmente no projeto.
