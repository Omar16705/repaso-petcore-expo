/* script_conceptos.js -> buscador en vivo sobre el acordeon de conceptos clave */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("buscador-conceptos");
    var acordeon = document.getElementById("acordeon-conceptos");
    var sinResultados = document.getElementById("sin-resultados");
    if (!input || !acordeon) return;

    var items = Array.prototype.slice.call(acordeon.querySelectorAll(".acordeon__item"));

    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var visibles = 0;
      items.forEach(function (item) {
        var texto = (item.textContent + " " + (item.getAttribute("data-termino") || "")).toLowerCase();
        var coincide = q === "" || texto.indexOf(q) !== -1;
        item.hidden = !coincide;
        if (coincide) visibles++;
      });
      if (sinResultados) sinResultados.style.display = visibles === 0 ? "block" : "none";
    });
  });
})();
