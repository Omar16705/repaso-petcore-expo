/* script_index.js -> comportamiento exclusivo de index.html
   (el progreso de la rubrica y el menu/tema ya los maneja js/base.js) */
(function () {
  "use strict";
  // Si el usuario ya completó el 100% de la rúbrica, resaltamos el botón de preguntas.
  document.addEventListener("DOMContentLoaded", function () {
    var texto = document.querySelector("[data-progreso-texto]");
    if (!texto) return;
    var obs = new MutationObserver(function () {
      if (texto.textContent.indexOf("100%") !== -1) {
        var boton = document.querySelector('a[href="preguntas-defensa.html"].btn');
        if (boton) boton.classList.add("btn-primario");
      }
    });
    obs.observe(texto, { childList: true });
  });
})();
