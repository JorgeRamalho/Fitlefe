# Changelog

Registro das alterações realizadas no projeto FitLife.

## [Não publicado] — Ajustes de carrossel, estrutura e loja

### Estrutura
- Reordenação das seções: **Modalidades** movida para logo após o carrossel e **Hero** reposicionado após a seção **Sobre**.

### Carrossel
- Imagens centralizadas com `object-position: center` e conteúdo de texto alinhado ao container central (1200px), em linha com o restante do site.
- Ajustes de altura responsiva para melhor proporção em desktop e mobile.
- Enquadramento final das imagens com `object-fit: cover`, preenchendo todo o quadro (edge-to-edge) sem cortes excessivos e com altura reduzida.
- Correção da ordem de empilhamento (`z-index`) entre overlay, conteúdo e controles (setas, dots e barra de progresso).
- Suavização do overlay para melhorar a nitidez das fotos.

### Loja (Suplementos & Nutrição)
- Substituição de imagens **quebradas**: Whey Protein Baunilha, Creatina, Pasta de Amendoim e Coqueteleira.
- Substituição de imagens **sem contexto** por fotos coerentes com cada produto: BCAA, Pré-Treino, Ômega 3, Glutamina e Barra de Proteína.
- Padronização para URLs públicas do Unsplash, validadas quanto ao carregamento.

### Documentação e infraestrutura
- Adição de `README.md` com descrição, estrutura e instruções de execução.
- Adição de `.gitignore`.
- Estruturação do repositório com histórico de commits organizado por área.
