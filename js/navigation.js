/* ==========================================================================
   Zelo — Onboarding técnico
   Navegação: menu recolhível (layout compacto) + scroll-spy das seções.

   Sem dependências externas. O script é carregado com `defer`, portanto o
   DOM já está disponível quando roda.
   ========================================================================== */
(function () {
  "use strict";

  var body = document.body;
  var toggle = document.getElementById("menu-toggle");
  var overlay = document.getElementById("nav-overlay");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-link")
  );

  // Seções na mesma ordem do menu, para o scroll-spy.
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  var LARGURA_COMPACTA = window.matchMedia("(max-width: 1023px)");
  // Linha de referência (px, a partir do topo) usada para decidir a seção ativa.
  var LINHA_ATIVA = 140;

  /* ------------------------------------------------------------------------
     Menu recolhível — só faz sentido no layout compacto.
     ------------------------------------------------------------------------ */
  function menuEstaAberto() {
    return body.classList.contains("nav-open");
  }

  function abrirMenu() {
    body.classList.add("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
  }

  function fecharMenu() {
    body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  function alternarMenu() {
    if (menuEstaAberto()) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }

  if (toggle) {
    toggle.addEventListener("click", alternarMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", fecharMenu);
  }

  // Esc fecha o menu e devolve o foco ao botão que o abriu.
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menuEstaAberto()) {
      fecharMenu();
      if (toggle) {
        toggle.focus();
      }
    }
  });

  // Ao escolher uma seção no layout compacto, o menu fecha.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (LARGURA_COMPACTA.matches) {
        fecharMenu();
      }
    });
  });

  // Ao voltar ao layout largo, garante o estado "fechado".
  LARGURA_COMPACTA.addEventListener("change", function (evento) {
    if (!evento.matches) {
      fecharMenu();
    }
  });

  /* ------------------------------------------------------------------------
     Scroll-spy — marca no menu a seção visível no momento.
     ------------------------------------------------------------------------ */
  function definirAtiva(secaoAtiva) {
    navLinks.forEach(function (link) {
      var ehAtiva =
        secaoAtiva && link.getAttribute("href") === "#" + secaoAtiva.id;
      if (ehAtiva) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function atualizarSecaoAtiva() {
    var ativa = sections[0] || null;

    sections.forEach(function (secao) {
      var topo = secao.getBoundingClientRect().top;
      if (topo <= LINHA_ATIVA) {
        ativa = secao;
      }
    });

    // No fim da página, a última seção sempre fica ativa.
    var noFim =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (noFim && sections.length) {
      ativa = sections[sections.length - 1];
    }

    definirAtiva(ativa);
  }

  // Throttle por requestAnimationFrame: evita recalcular em cada evento.
  var pendente = false;
  function agendarAtualizacao() {
    if (pendente) {
      return;
    }
    pendente = true;
    window.requestAnimationFrame(function () {
      pendente = false;
      atualizarSecaoAtiva();
    });
  }

  window.addEventListener("scroll", agendarAtualizacao, { passive: true });
  window.addEventListener("resize", agendarAtualizacao);

  // Estado inicial ao carregar.
  atualizarSecaoAtiva();
})();
