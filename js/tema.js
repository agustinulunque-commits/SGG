/* RF-02: aplica el tema guardado antes de pintar la página (evita parpadeo). */
(function () {
  var oscuro = false;
  try { oscuro = localStorage.getItem('tema') === 'true'; } catch (e) {}
  document.documentElement.classList.toggle('dark', oscuro);
})();
