/* script_preguntas.js -> filtro por dificultad, contadores y "pregunta al azar" */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".acordeon__item[data-dificultad]"));
    if (!items.length) return;

    var botonesFiltro = Array.prototype.slice.call(document.querySelectorAll(".chip-filtro"));
    var filtroActivo = "todas";

    function contarPorDificultad() {
      var totales = { todas: items.length, facil: 0, intermedia: 0, dificil: 0 };
      items.forEach(function (item) {
        var d = item.getAttribute("data-dificultad");
        if (totales[d] !== undefined) totales[d]++;
      });
      document.querySelectorAll("[data-contador]").forEach(function (el) {
        var clave = el.getAttribute("data-contador");
        el.textContent = totales[clave] !== undefined ? totales[clave] : "";
      });
    }

    function aplicarFiltro(filtro) {
      filtroActivo = filtro;
      var visibles = 0;
      items.forEach(function (item) {
        var coincide = filtro === "todas" || item.getAttribute("data-dificultad") === filtro;
        item.hidden = !coincide;
        if (coincide) visibles++;
      });

      // Oculta bloques de criterio que se queden sin ninguna pregunta visible
      document.querySelectorAll("[data-criterio]").forEach(function (bloque) {
        var algunaVisible = Array.prototype.some.call(
          bloque.querySelectorAll(".acordeon__item"),
          function (i) { return !i.hidden; }
        );
        bloque.style.display = algunaVisible ? "" : "none";
      });

      botonesFiltro.forEach(function (b) {
        b.classList.toggle("activo", b.getAttribute("data-filtro") === filtro);
      });
    }

    botonesFiltro.forEach(function (b) {
      b.addEventListener("click", function () {
        aplicarFiltro(b.getAttribute("data-filtro"));
      });
    });

    contarPorDificultad();
    aplicarFiltro("todas");

    // Botón "pregunta al azar", respeta el filtro de dificultad activo
    var boton = document.createElement("button");
    boton.className = "btn btn-primario boton-aleatorio";
    boton.textContent = "🎲 Pregunta al azar";
    var header = document.querySelector(".hero-pagina .contenedor");
    if (header) header.appendChild(boton);

    boton.addEventListener("click", function () {
      var candidatas = items.filter(function (i) {
        return filtroActivo === "todas" || i.getAttribute("data-dificultad") === filtroActivo;
      });
      if (!candidatas.length) return;
      items.forEach(function (i) { i.classList.remove("abierto"); });
      var elegido = candidatas[Math.floor(Math.random() * candidatas.length)];
      elegido.classList.add("abierto");
      elegido.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
})();
