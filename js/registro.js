/* RF-03: registro con validación estricta y email no duplicado. */
(function () {
  var btn = SGG.$('enviar'), hoy = new Date().toISOString().split('T')[0];
  SGG.$('nacimiento').max = hoy;
  SGG.initChecklist(SGG.$('password'), function (ok) { btn.disabled = !ok; });
  document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nom = SGG.$('nombre').value.trim(), ape = SGG.$('apellido').value.trim();
    var nac = SGG.$('nacimiento').value, mail = SGG.$('email').value.trim().toLowerCase();
    var p = SGG.$('password').value, r = SGG.$('repetir').value;
    var ok = [
      SGG.setError('nombre', SGG.val.nombre(nom) ? '' : 'Solo letras, sin números ni símbolos.'),
      SGG.setError('apellido', SGG.val.nombre(ape) ? '' : 'Solo letras, sin números ni símbolos.'),
      SGG.setError('nacimiento', !nac ? 'Elegí tu fecha de nacimiento.' : SGG.val.edad(nac) < 14 ? 'Tenés que tener 14 años o más.' : ''),
      SGG.setError('email', !SGG.val.email(mail) ? 'Ingresá un correo válido, como nombre@dominio.com.' : SGG.usuarios.buscar(mail) ? 'Ese correo ya está registrado.' : ''),
      SGG.setError('repetir', p === r ? '' : 'Las contraseñas no coinciden.')
    ].every(Boolean);
    if (!ok || !SGG.pwValida(p)) return;
    var lista = SGG.usuarios.todos();
    lista.push({ nombre: nom, apellido: ape, nacimiento: nac, email: mail, password: p });
    SGG.usuarios.guardar(lista);
    SGG.estado('Cuenta creada. Ya podés ingresar.', true);
    document.querySelector('form').reset(); btn.disabled = true;
    document.querySelectorAll('#reglas li').forEach(function (li) { li.classList.remove('ok'); });
  });
})();
