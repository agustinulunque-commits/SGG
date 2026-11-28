/* RF-04: cambio de contraseña; la nueva debe ser distinta de la actual. */
(function () {
  var btn = SGG.$('enviar');
  SGG.initChecklist(SGG.$('password'), function (ok) { btn.disabled = !ok; });
  document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var mail = SGG.$('email').value.trim().toLowerCase();
    var p = SGG.$('password').value, r = SGG.$('repetir').value;
    var lista = SGG.usuarios.todos();
    var u = lista.find(function (x) { return x.email === mail; });
    var ok = [
      SGG.setError('email', !SGG.val.email(mail) ? 'Ingresá un correo válido.' : !u ? 'No hay una cuenta con ese correo.' : ''),
      SGG.setError('password', u && u.password === p ? 'La nueva contraseña no puede ser igual a la actual.' : ''),
      SGG.setError('repetir', p === r ? '' : 'Las contraseñas no coinciden.')
    ].every(Boolean);
    if (!ok || !SGG.pwValida(p)) return;
    u.password = p; SGG.usuarios.guardar(lista);
    SGG.estado('Contraseña actualizada. Ya podés ingresar.', true);
    document.querySelector('form').reset(); btn.disabled = true;
    document.querySelectorAll('#reglas li').forEach(function (li) { li.classList.remove('ok'); });
  });
})();
