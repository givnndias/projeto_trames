# Publicar o Trames no GitHub Pages

## Caminho mais simples — pasta já compilada

A pasta `docs` deste pacote contém o aplicativo pronto para hospedagem estática. Você não precisa do Lovable, de créditos ou de instalar programas para publicar esta versão.

1. Extraia o ZIP recebido.
2. Abra a pasta `projeto_trames_mvp-main` no computador. Dentro dela existe `docs`.
3. Abra seu repositório no GitHub, na aba **Code**, e confira que está na branch **main**.
4. Clique em **Add file → Upload files**.
5. Arraste a pasta **docs inteira** para a área de upload. Não arraste a pasta `projeto_trames_mvp-main` que está acima dela. Se não conseguir arrastar a pasta, use o Explorador de Arquivos do computador, não apenas a visualização do ZIP.
6. Antes de confirmar, confira que os caminhos começam com `docs/`, como `docs/index.html` e `docs/assets/...`.
7. Clique em **Commit changes** e confirme na branch main.
8. Entre em **Settings → Pages**.
9. Em **Source**, selecione **Deploy from a branch**.
10. Em **Branch**, selecione **main**; em pasta, selecione **/docs**; clique em **Save**.
11. Deixe **Custom domain** vazio.
12. Aguarde a publicação. Atualize Settings → Pages e use **Visit site**.

O endereço será semelhante a `https://SEU-USUARIO.github.io/projeto_trames_mvp/`. As telas internas usam `#/`, por exemplo `#/preferencias`. Esse formato é intencional e permite atualizar a página sem receber um erro 404.

Não basta enviar o ZIP ao repositório: o GitHub precisa receber os arquivos extraídos da pasta docs. Não é necessário apagar o README.

## Código-fonte incluído

O pacote contém também o código-fonte com a configuração de publicação. Para a publicação simples acima, basta enviar `docs`. Os outros arquivos servem para continuar o desenvolvimento e gerar novas versões.

### Arquivos adicionados ou ajustados

- `vite.pages.config.ts`: configuração Vite independente, exclusiva do Pages.
- `pages.html` e `src/pages-client.tsx`: inicialização do aplicativo no navegador.
- `src/router.tsx`: histórico por hash somente na versão Pages.
- `src/routes/__root.tsx`: preserva o layout original e adapta a estrutura de documento para Pages.
- `src/components/trames/ui.tsx`: tratamento das imagens da marca fora do Lovable.
- `scripts/finalize-pages.mjs`: prepara index.html, 404.html e .nojekyll.
- `scripts/export-docs.mjs`: copia a saída estática para docs.
- `src/test/pages-routing.test.tsx`: testes de navegação em subpasta e fluxo de busca.
- `package.json`: novos comandos de build e exportação.
- `.gitignore`: ignora a pasta temporária dist-pages.
- `.github/workflows/deploy-pages.yml`: opção alternativa de publicação automática.

O `vite.config.ts` original do Lovable e as regras do cálculo de rotas foram mantidos.

## Para atualizar a pasta docs no futuro

Depois de modificar o código-fonte, instale as dependências usando Bun 1.3.3 e execute:

```bash
bun install --frozen-lockfile
bun run test
bun run export:docs
```

O último comando utiliza também npm, disponível com Node.js. O ambiente de build validado usa Node 24. Envie novamente a pasta docs ao repositório. Apenas editar src no GitHub não atualiza os arquivos já compilados de docs.

## Opção alternativa — GitHub Actions

Se preferir reconstruir e publicar automaticamente a cada alteração:

1. Envie também os arquivos de código-fonte alterados e o workflow `.github/workflows/deploy-pages.yml`, preservando as pastas.
2. Configure **Settings → Pages → Source → GitHub Actions**.
3. Abra **Actions → Publicar Trames no GitHub Pages → Run workflow**, selecione main e confirme, caso a execução não tenha iniciado.
4. Confira o resultado da publicação.

Escolha um dos métodos. Para a entrega imediata, a publicação de `main /docs` é a mais simples.

## Logos

O ZIP original contém metadados que apontam para imagens hospedadas dentro do Lovable, mas não contém os dois PNGs completos das logos. Na versão estática, o aplicativo usa o símbolo original já incluído em `public/favicon.png`, acompanhado do nome Trames quando necessário. O layout das telas não foi redesenhado.

Para restaurar os arquivos completos, coloque as imagens originais em:

- `public/trames_logo_compact.png`
- `public/trames_logo_horizontal.png`

Depois gere docs novamente. Quando ambos os arquivos estiverem presentes, o build os utilizará automaticamente.

## Validações realizadas

- Instalação com Bun 1.3.3 e lockfile preservado: concluída.
- Build estático: concluído, com index.html, JavaScript e CSS.
- Testes automatizados: 13 passaram, incluindo os 10 originais.
- Testes novos: tela inicial sem documento HTML duplicado; navegação por hash e reabertura de Preferências em subpasta; fluxo origem/destino → prioridade → comparação de rotas.
- Caminhos de assets no HTML: relativos, compatíveis com subpasta de repositório.

Não foi possível concluir uma inspeção visual com navegador neste ambiente. A publicação no seu GitHub ainda não foi executada; o resultado final deve ser conferido em Visit site após o envio.

## Limites

Esta publicação disponibiliza a demonstração no navegador. Ela não gera APK ou aplicativo iOS instalado. Os dados e o mapa esquemático existentes foram preservados. As funcionalidades dependem dos dados locais do protótipo, não de um servidor externo de cálculo.
