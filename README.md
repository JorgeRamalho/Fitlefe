# FitLife — Academia Premium

> **Força · Saúde · Vida** — Transforme seu corpo, transforme sua vida.

Landing page institucional de uma academia fictícia premium, desenvolvida com **HTML, CSS e JavaScript puro** (sem frameworks). O projeto é totalmente responsivo, modular e focado em performance, acessibilidade e boas práticas de UX.

## Demonstração

Abra o arquivo `index.html` em um navegador ou rode um servidor local:

```bash
python -m http.server 5500
# acesse http://localhost:5500
```

## Funcionalidades

- **Carrossel** de destaque com autoplay, navegação por setas, dots, barra de progresso e suporte a toque (swipe).
- **Loja (FitLife Shop)** com catálogo dinâmico, filtros por categoria, busca e **carrinho de compras** persistente (localStorage).
- **Formulário de matrícula** em 3 etapas com validação.
- **Seções** institucionais: Sobre, Modalidades, Planos, Treinadores, Depoimentos e Contato.
- **Animações** de scroll, contadores e partículas.
- Layout **100% responsivo** (mobile, tablet e desktop).

## Estrutura do projeto

```text
Projeto-Fitlife/
├── index.html              # Página única (Single Page)
├── site.webmanifest        # Configuração PWA
├── assets/
│   └── brand/              # Identidade visual (logos SVG)
├── css/
│   ├── variables.css       # Design tokens (cores, fontes, espaçamentos)
│   ├── reset.css           # Normalização
│   ├── layout.css          # Estrutura e grids
│   ├── components.css      # Botões, cards, formulário
│   ├── brand.css           # Estilos da marca
│   ├── carousel.css        # Carrossel
│   ├── shop.css            # Loja e carrinho
│   └── responsive.css      # Media queries
└── js/
    ├── main.js             # Navegação, scroll, animações
    ├── carousel.js         # Lógica do carrossel
    ├── form.js             # Formulário em etapas
    └── shop.js             # Produtos e carrinho
```

## Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Flexbox, Grid, `clamp()`)
- JavaScript (ES6+), sem dependências
- Google Fonts (Bebas Neue, Oswald, Inter)
- Imagens do [Unsplash](https://unsplash.com)

## Autor

**Jorge Ramalho** — [@JorgeRamalho](https://github.com/JorgeRamalho)
