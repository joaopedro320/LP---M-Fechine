# LP Fechine Mármores

Landing page de alto padrão da **Fechine Mármores** (Brasília/DF), cliente QH4 Growth.
Produto: Método Stones High Ticket. Contrato de 30/09/2026 a 30/03/2027 (renovação automática).

## Contexto do cliente

- Marmoraria de Brasília que sempre concentrou o faturamento em grandes construtoras e agora quer migrar o foco para **cliente final de alto padrão e arquitetos**.
- Contatos: Vitor (gerente de escritório, contato operacional) e Júnior Fechine (diretor geral, dono).
- Posicionamento marcado no briefing: alto luxo, moderno e inovador, técnico e especialista.
- Temas que não podem faltar (briefing): materiais de alta qualidade, pontualidade, comprometimento, atendimento, estrutura moderna e automatizada, excelência.
- O que o cliente não gosta em site: informação obscura, site sem criação, imagens ruins.

## Identidade visual aplicada

| Token | Hex | Uso |
|---|---|---|
| Mármore | `#F3F2EF` | Fundo claro principal |
| Branco | `#FFFFFF` | Faixas de fatos, projetos e orçamento |
| Grafite | `#2B2C30` | Seção de estrutura e rodapé (escuro claro, não preto) |
| Cinza | `#6E6C70` | Texto secundário |
| Bordô | `#5C0A0C` | Cor da logo, botões, destaques, seção do fundador |
| Bordô hover | `#7A1A1E` | Hover dos botões |

- Paleta pedida no briefing: cinza, preto, branco e bordô (aceitam mudanças). Fundo: deixaram a critério.
- Tipografia: Poppins (títulos) + Inter (corpo), padrão QH4 porque o cliente não pediu fonte.
- Logo: o arquivo recebido era um PNG de 150 px. Foi vetorizado em SVG (`logo-fechine.svg` bordô e `logo-fechine-branco.svg`). **Vale pedir o arquivo original da logo** (AI/PDF/SVG) para garantir fidelidade.

## Estrutura da página

1. Topo fixo com logo, navegação e CTA
2. Hero com foto de projeto (cozinha planejada) e headline "Marmoraria de alto padrão perto de você, em Brasília"
3. Faixa de fatos: +30 anos do fundador, prazo de 10 a 15 dias, fábrica própria automatizada, Pix/cartão/dinheiro
3.1. Parceiros: construtoras de Brasília (por enquanto em texto; trocar pelos logos quando chegarem os arquivos)
4. Abas por público: Sua casa, Arquitetos, Construtoras e engenharias
5. Galeria de projetos com filtro (cozinhas, banheiros, mesas) e lightbox
6. Estrutura: processo em 5 etapas, da chapa à peça pronta, com fotos do maquinário
7. Materiais: mármores, granitos e quartzitos
8. Citação do Júnior Fechine (texto adaptado da resposta dele no briefing)
9. FAQ (somente respostas do briefing) + JSON-LD FAQPage
10. Formulário de orçamento + contatos + mapa
11. Rodapé com "Desenvolvido pro QH4 Growth" (link @qh4growth)
12. Botão flutuante de WhatsApp no canto direito

## Pastas

```
lp-fechine-marmores/
├── index.html
├── obrigado.html        (página de obrigado, redireciona pro WhatsApp em 2,5 s)
├── 404.html             (erro personalizado)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json          (cache longo em /assets e headers de segurança)
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/             (fotos .webp otimizadas, logos SVG, favicon, og-fechine.jpg)
```

## Como publicar na Vercel

1. Descompacte o zip.
2. Na Vercel: Add New > Project > arraste a pasta `lp-fechine-marmores` (ou `vercel --prod` dentro dela).
3. Framework preset: **Other**. Sem build command, output = raiz.
4. Depois de ligar o domínio, troque a URL nos pontos da lista abaixo.

## Trocar antes de subir

- [ ] **GTM**: trocar `GTM-XXXXXXX` em `index.html` (head e noscript) e em `obrigado.html`. Enquanto tiver X, o loader não carrega.
- [ ] **Domínio**: está como `https://lp-fechine-marmores.vercel.app/`. Trocar em `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt` e `sitemap.xml`.
- [ ] **Apps Script** (opcional): em `assets/js/main.js`, preencher `APPS_SCRIPT_URL`. Com URL o form envia os dados, abre `obrigado.html` e de lá segue pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações.". Sem URL (como está hoje) o form monta a mensagem completa e abre o WhatsApp direto.
- [ ] WhatsApp configurado: (61) 99986-8441 (`5561999868441`). Telefone fixo: (61) 3272-0505.

## Pendências de briefing (confirmar com o Vitor)

- **Endereço**: usei `SEES Quadra 05, Lote 13, Brasília/DF, CEP 73020-405`, que veio no bloco de dados para domínio/hospedagem. Confirmar se é o endereço da fábrica/atendimento antes de publicar (aparece no rodapé de contato, no mapa e no JSON-LD).
- **Instalação**: o briefing diz que **não fazem instalação**. Está no FAQ de forma transparente. Se preferirem tirar da página, remover do HTML e do JSON-LD FAQPage.
- **"Cobramos orçamento? (sim)"**: a resposta ficou ambígua (cobram pelo orçamento ou fazem orçamento?). Ficou fora da página até confirmar.
- **Nomes das construtoras** (Brasal, Soltec, Jaraju, Apex): não citei na página, só "grandes construtoras de Brasília". Se autorizarem, dá pra entrar uma faixa de logos, que reforça muito a autoridade.
- **Depoimentos / Google**: não há avaliações (GMN nota 4.0, cliente disse que não tem no momento). Sem seção de depoimentos para não inventar nada.
- **Fotos**: usei só fotos reais do Instagram. Deixei de fora 4 imagens que parecem render/IA (cozinhas com marca "Fechine" e iluminação de estúdio). Fotos de obras finalizadas em alta resolução de cliente final e arquiteto vão valorizar bastante a galeria.
- Briefing cita "FECHINE STONES" no histórico. Na página usei o nome comercial **Fechine Mármores**.

## Comportamento e stack

- HTML/CSS/JS puros, sem dependências. Fontes do Google Fonts.
- Animações: sequência de entrada no hero (texto sobe, vídeo abre em cortina), parallax leve no vídeo, scroll reveal discreto, abas com transição, filtros e lightbox na galeria, FAQ com um item aberto por vez, pulso no WhatsApp flutuante. Tudo respeita `prefers-reduced-motion`.
- Formulário: botão nasce desabilitado e só libera com todos os campos obrigatórios válidos (`checkValidity` a cada input/change), máscara de WhatsApp `(61) 9 0000-0000`.

## Eventos de rastreamento (dataLayer)

| Evento | Quando |
|---|---|
| `whatsapp_click` | Qualquer link de WhatsApp (param `cta_id`: `whatsapp_hero`, `whatsapp_flutuante`, `whatsapp_faq`, `whatsapp_contato`) |
| `phone_click` | Clique no telefone fixo |
| `cta_click` | CTAs internos (`cta_header`, `cta_publico_*`, `cta_projetos`, `cta_materiais`, `instagram_rodape`) |
| `tab_publico` | Troca de aba de público |
| `faq_open` | Abertura de pergunta do FAQ |
| `form_start` | Primeiro foco no formulário |
| `form_submit` | Envio do formulário (params `perfil`, `ambiente`, `material`) |
| `lead_obrigado` | Carregamento de `obrigado.html` |

## Checklist de entrega

- [x] SEO: title e meta description com nicho + cidade, H1 com "Marmoraria" e "perto de você", alt em todas as imagens, width/height (CLS), preload do poster do hero
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage
- [x] Open Graph completo + Twitter Card (`og-fechine.jpg` 1200x630)
- [x] canonical
- [x] sitemap.xml
- [x] robots.txt
- [x] site.webmanifest + favicon SVG
- [x] vercel.json
- [x] Página de obrigado
- [x] Página 404 personalizada
- [x] Botão flutuante de WhatsApp à direita
- [x] Rodapé "Desenvolvido pro QH4 Growth"
- [x] Responsivo testado em 1440 px e 390 px, sem rolagem horizontal
- [x] Sem erros de console (fora requisições externas bloqueadas no ambiente de teste)
