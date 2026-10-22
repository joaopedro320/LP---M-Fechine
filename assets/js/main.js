/* Fechine Mármores | LP | QH4 Growth */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var WHATS = '5561999868441';
  // Se a QH4 criar o webhook do Google Apps Script, cole a URL aqui.
  // Com URL: envia os dados, abre obrigado.html e de lá segue pro WhatsApp.
  // Sem URL: monta a mensagem completa e abre o WhatsApp direto.
  var APPS_SCRIPT_URL = '';

  var dl = window.dataLayer = window.dataLayer || [];
  function track(evento, extra) {
    var o = { event: evento };
    if (extra) for (var k in extra) o[k] = extra[k];
    dl.push(o);
  }

  /* Rastreio de cliques (WhatsApp, telefone, CTAs) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (!a) return;
    var id = a.getAttribute('data-track');
    var tipo = /^whatsapp/.test(id) ? 'whatsapp_click' : /^telefone/.test(id) ? 'phone_click' : 'cta_click';
    track(tipo, { cta_id: id });
  });

  /* Topo com borda ao rolar */
  var topo = document.getElementById('topo');
  function onScroll() { topo.classList.toggle('is-rolado', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Parallax leve na imagem do hero */
  var moldura = document.querySelector('[data-parallax] img');
  if (moldura && !semMovimento) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        moldura.style.transform = 'scale(1.06) translateY(' + (y * 0.06) + 'px)';
        tick = false;
      });
    }, { passive: true });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !semMovimento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visivel'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* Abas de público */
  var abas = Array.prototype.slice.call(document.querySelectorAll('.publico__abas [role="tab"]'));
  function ativar(aba, foco) {
    abas.forEach(function (t) {
      var sel = t === aba;
      t.setAttribute('aria-selected', sel);
      t.tabIndex = sel ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !sel;
    });
    if (foco) aba.focus();
    track('tab_publico', { aba: aba.id });
  }
  abas.forEach(function (t, i) {
    t.addEventListener('click', function () { ativar(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') ativar(abas[(i + 1) % abas.length], true);
      if (e.key === 'ArrowLeft') ativar(abas[(i - 1 + abas.length) % abas.length], true);
    });
  });

  /* Filtros da galeria */
  var fotos = Array.prototype.slice.call(document.querySelectorAll('.galeria .foto'));
  document.querySelectorAll('.filtro').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filtro');
      document.querySelectorAll('.filtro').forEach(function (x) {
        var on = x === b; x.classList.toggle('is-ativo', on); x.setAttribute('aria-pressed', on);
      });
      fotos.forEach(function (ft) {
        ft.classList.toggle('is-oculta', f !== 'todos' && ft.getAttribute('data-cat') !== f);
      });
    });
  });

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var atual = 0, ultimoFoco = null;
  function visiveis() { return fotos.filter(function (f) { return !f.classList.contains('is-oculta'); }); }
  function mostrar(i) {
    var lista = visiveis();
    atual = (i + lista.length) % lista.length;
    var f = lista[atual];
    lbImg.src = f.getAttribute('data-src');
    lbImg.alt = f.querySelector('img').alt;
  }
  function abrir(f) {
    ultimoFoco = f;
    mostrar(visiveis().indexOf(f));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox__fechar').focus();
  }
  function fechar() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  }
  fotos.forEach(function (f) { f.addEventListener('click', function () { abrir(f); }); });
  lb.querySelector('.lightbox__fechar').addEventListener('click', fechar);
  lb.querySelector('.lightbox__nav--ant').addEventListener('click', function () { mostrar(atual - 1); });
  lb.querySelector('.lightbox__nav--prox').addEventListener('click', function () { mostrar(atual + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) fechar(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') fechar();
    if (e.key === 'ArrowRight') mostrar(atual + 1);
    if (e.key === 'ArrowLeft') mostrar(atual - 1);
  });

  /* FAQ: um aberto por vez */
  var detalhes = document.querySelectorAll('.faq__lista details');
  detalhes.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      detalhes.forEach(function (o) { if (o !== d) o.open = false; });
      track('faq_open', { pergunta: d.querySelector('summary').textContent });
    });
  });

  /* Formulário */
  var form = document.getElementById('form-orcamento');
  var btn = document.getElementById('f-enviar');
  var aviso = document.getElementById('f-aviso');
  var whats = document.getElementById('f-whats');

  whats.addEventListener('input', function () {
    var d = whats.value.replace(/\D/g, '').slice(0, 11);
    var r = d;
    if (d.length > 2) r = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 3) r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 3) + ' ' + d.slice(3);
    if (d.length > 7) r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 3) + ' ' + d.slice(3, 7) + '-' + d.slice(7);
    whats.value = r;
  });

  function validar() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    aviso.textContent = ok ? 'Tudo certo. Ao enviar, abrimos o WhatsApp com a sua mensagem.' : 'Preencha os campos para liberar o envio.';
  }
  form.addEventListener('input', validar);
  form.addEventListener('change', validar);
  form.querySelectorAll('input, select').forEach(function (c) {
    c.addEventListener('blur', function () {
      c.closest('.campo').classList.toggle('is-erro', c.value !== '' && !c.checkValidity());
    });
  });
  validar();

  var iniciou = false;
  form.addEventListener('focusin', function () {
    if (!iniciou) { iniciou = true; track('form_start'); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { validar(); return; }
    var d = new FormData(form);
    var dados = {
      nome: d.get('nome').trim(),
      whatsapp: d.get('whatsapp'),
      perfil: d.get('perfil'),
      ambiente: d.get('ambiente'),
      material: d.get('material'),
      bairro: d.get('bairro').trim(),
      mensagem: (d.get('mensagem') || '').trim(),
      origem: 'LP Fechine Mármores',
      pagina: location.href
    };
    track('form_submit', { perfil: dados.perfil, ambiente: dados.ambiente, material: dados.material });
    btn.disabled = true;
    btn.textContent = 'Abrindo o WhatsApp...';

    if (APPS_SCRIPT_URL) {
      fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(dados) })
        .catch(function () {})
        .then(function () { location.href = 'obrigado.html'; });
      return;
    }

    var msg = 'Olá! Vim pelo site da Fechine Mármores e quero um orçamento.\n\n' +
      '*Nome:* ' + dados.nome + '\n' +
      '*WhatsApp:* ' + dados.whatsapp + '\n' +
      '*Perfil:* ' + dados.perfil + '\n' +
      '*Preciso de:* ' + dados.ambiente + '\n' +
      '*Material:* ' + dados.material + '\n' +
      '*Bairro/cidade:* ' + dados.bairro +
      (dados.mensagem ? '\n*Projeto:* ' + dados.mensagem : '');
    location.href = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(msg);
  });

  /* Restaura o botão se a pessoa voltar pelo histórico */
  window.addEventListener('pageshow', function () { btn.textContent = 'Enviar pelo WhatsApp'; validar(); });
})();
