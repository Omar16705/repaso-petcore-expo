/* ============================================================
   PetCore - Repaso Defensa Externa
   base.js -> navbar movil, tema claro/oscuro, acordeones,
   checklist con progreso guardado y boton "volver arriba".
   Compartido por todas las paginas.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menu movil ---------- */
  function initNavMovil() {
    var boton = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-nav-links]");
    if (!boton || !links) return;
    boton.addEventListener("click", function () {
      links.classList.toggle("abierta");
      var abierto = links.classList.contains("abierta");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("abierta"); });
    });
  }

  /* ---------- Tema claro/oscuro con preferencia guardada ---------- */
  function initTema() {
    var boton = document.querySelector("[data-tema-toggle]");
    var raiz = document.documentElement;
    var guardado = null;
    try { guardado = localStorage.getItem("petcore_repaso_tema"); } catch (e) {}
    if (guardado === "dark" || guardado === "light") {
      raiz.setAttribute("data-theme", guardado);
    }
    function actualizarIcono() {
      if (!boton) return;
      var actual = raiz.getAttribute("data-theme");
      var esOscuro = actual === "dark" ||
        (!actual && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
      boton.textContent = esOscuro ? "☀️" : "🌙";
    }
    actualizarIcono();
    if (!boton) return;
    boton.addEventListener("click", function () {
      var actual = raiz.getAttribute("data-theme");
      var esOscuro = actual === "dark" ||
        (!actual && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var nuevo = esOscuro ? "light" : "dark";
      raiz.setAttribute("data-theme", nuevo);
      try { localStorage.setItem("petcore_repaso_tema", nuevo); } catch (e) {}
      actualizarIcono();
    });
  }

  /* ---------- Resaltar enlace activo del navbar segun la pagina ---------- */
  function initEnlaceActivo() {
    var aqui = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-links] a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === aqui) a.classList.add("activa");
    });
  }

  /* ---------- Acordeones (preguntas / respuestas) ---------- */
  function initAcordeones() {
    document.querySelectorAll(".acordeon").forEach(function (acordeon) {
      var exclusivo = acordeon.hasAttribute("data-exclusivo");
      acordeon.querySelectorAll(".acordeon__item").forEach(function (item) {
        var pregunta = item.querySelector(".acordeon__pregunta");
        if (!pregunta) return;
        pregunta.addEventListener("click", function () {
          var yaAbierto = item.classList.contains("abierto");
          if (exclusivo) {
            acordeon.querySelectorAll(".acordeon__item.abierto").forEach(function (otro) {
              if (otro !== item) otro.classList.remove("abierto");
            });
          }
          item.classList.toggle("abierto", !yaAbierto);
        });
      });
    });
  }

  /* ---------- Checklist con progreso (uno por pagina, via data-checklist-id) ---------- */
  function initChecklist() {
    var contenedores = document.querySelectorAll("[data-checklist-id]");
    contenedores.forEach(function (cont) {
      var id = cont.getAttribute("data-checklist-id");
      var clave = "petcore_repaso_checklist_" + id;
      var casillas = cont.querySelectorAll('input[type="checkbox"]');
      var barra = cont.querySelector("[data-progreso-barra]");
      var texto = cont.querySelector("[data-progreso-texto]");

      var guardado = {};
      try { guardado = JSON.parse(localStorage.getItem(clave) || "{}"); } catch (e) { guardado = {}; }

      function actualizarProgreso() {
        var total = casillas.length;
        var marcadas = 0;
        casillas.forEach(function (c) { if (c.checked) marcadas++; });
        var pct = total ? Math.round((marcadas / total) * 100) : 0;
        if (barra) barra.style.width = pct + "%";
        if (texto) texto.textContent = marcadas + " / " + total + " (" + pct + "%)";
      }

      casillas.forEach(function (c) {
        var key = c.getAttribute("data-key") || c.id || c.value;
        if (guardado[key]) {
          c.checked = true;
          var item = c.closest(".check-item");
          if (item) item.classList.add("marcado");
        }
        c.addEventListener("change", function () {
          guardado[key] = c.checked;
          try { localStorage.setItem(clave, JSON.stringify(guardado)); } catch (e) {}
          var item = c.closest(".check-item");
          if (item) item.classList.toggle("marcado", c.checked);
          actualizarProgreso();
        });
      });
      actualizarProgreso();
    });
  }

  /* ---------- Boton volver arriba ---------- */
  function initVolverArriba() {
    var boton = document.querySelector("[data-volver-arriba]");
    if (!boton) return;
    window.addEventListener("scroll", function () {
      boton.classList.toggle("visible", window.scrollY > 500);
    });
    boton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavMovil();
    initTema();
    initEnlaceActivo();
    initAcordeones();
    initChecklist();
    initVolverArriba();
  });
})();
