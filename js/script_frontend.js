/* script_frontend.js -> resalta la seccion enlazada por ancla, igual que en la pagina de backend */
(function () {
  "use strict";
  function resaltarDesdeHash() {
    var hash = location.hash;
    if (!hash) return;
    var el = document.querySelector(hash);
    if (!el) return;
    el.style.transition = "background-color .6s ease";
    el.style.backgroundColor = "var(--surface-2)";
    setTimeout(function () { el.style.backgroundColor = ""; }, 1400);
  }
  window.addEventListener("hashchange", resaltarDesdeHash);
  document.addEventListener("DOMContentLoaded", resaltarDesdeHash);
})();
