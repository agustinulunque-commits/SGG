/* RF-02: botón switch Día/Noche con persistencia en localStorage. */
(function () {
  var btn = document.getElementById('themeSwitch'), icono = document.getElementById('themeIcon');
  function pintar() {
    var oscuro = document.documentElement.classList.contains('dark');
    btn.setAttribute('aria-checked', String(oscuro));
    icono.textContent = oscuro ? '☀️' : '🌙';
  }
  btn.addEventListener('click', function () {
    var oscuro = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', oscuro);
    try { localStorage.setItem('tema', oscuro); } catch (e) {}
    pintar();
  });
  pintar();
})();
