/* RF-01: login con bloqueo de 30 s tras 3 contraseñas incorrectas consecutivas. */
(function () {
  var fallos = 0, btn = SGG.$('enviar');
  document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var email = SGG.$('email').value.trim(), pass = SGG.$('password').value;
    var okE = SGG.setError('email', email ? '' : 'Ingresá tu correo.');
    var okP = SGG.setError('password', pass ? '' : 'Ingresá tu contraseña.');
    if (!okE || !okP) return;
    var u = SGG.usuarios.buscar(email);
    if (!u) { SGG.estado('Usuario no registrado.', false); return; }
    if (u.password !== pass) {
      fallos++;
      if (fallos >= 3) return bloquear();
      SGG.estado('Contraseña incorrecta. Intento ' + fallos + ' de 3.', false); return;
    }
    fallos = 0;
    localStorage.setItem('usuarioActivo', u.email);
    SGG.estado('Ha iniciado sesión con éxito. Bienvenido/a, ' + u.nombre + '.', true);
  });
  function bloquear() {
    var seg = 30; btn.disabled = true;
    var t = setInterval(function () {
      seg--; SGG.estado('Demasiados intentos. Reintentá en ' + seg + ' s.', false);
    }, 1000);
    SGG.estado('Demasiados intentos. Reintentá en 30 s.', false);
    setTimeout(function () {
      clearInterval(t); fallos = 0; btn.disabled = false; SGG.estado('Ya podés intentar de nuevo.', true);
    }, 30000);
  }
})();
