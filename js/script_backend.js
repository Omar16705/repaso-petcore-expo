/* script_backend.js -> resalta temporalmente la sección enlazada por ancla (#cors, #jwt, etc.) */
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
