/* script_guion.js -> cronometros independientes para practicar cada guion (jurado / publico) */
(function () {
  "use strict";

  function formatear(s) {
    var m = Math.floor(s / 60);
    var r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function crearCronometro(id) {
    var reloj = document.getElementById(id);
    if (!reloj) return;
    var segundos = 0;
    var intervalo = null;

    document.querySelectorAll('[data-reloj-iniciar="' + id + '"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (intervalo) return;
        intervalo = setInterval(function () {
          segundos++;
          reloj.textContent = formatear(segundos);
        }, 1000);
      });
    });
    document.querySelectorAll('[data-reloj-pausar="' + id + '"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        clearInterval(intervalo);
        intervalo = null;
      });
    });
    document.querySelectorAll('[data-reloj-reiniciar="' + id + '"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        clearInterval(intervalo);
        intervalo = null;
        segundos = 0;
        reloj.textContent = formatear(segundos);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".reloj[id]").forEach(function (el) {
      crearCronometro(el.id);
    });
  });
})();
