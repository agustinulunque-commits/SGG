/* Ver/ocultar contraseña y checklist de 5 requisitos en tiempo real (RF-03/RF-04). */
SGG.reglas = {
  len: function (p) { return p.length >= 8; },
  may: function (p) { return /\p{Lu}/u.test(p); },
  min: function (p) { return /\p{Ll}/u.test(p); },
  num: function (p) { return /\d/.test(p); },
  esp: function (p) { return /[^\p{L}\d\s]/u.test(p); }
};
SGG.pwValida = function (p) {
  return Object.keys(SGG.reglas).every(function (k) { return SGG.reglas[k](p); });
};
SGG.initChecklist = function (input, alCambiar) {
  var items = document.querySelectorAll('#reglas li');
  if (!items.length) return;
  input.addEventListener('input', function () {
    items.forEach(function (li) { li.classList.toggle('ok', SGG.reglas[li.dataset.r](input.value)); });
    alCambiar(SGG.pwValida(input.value));
  });
};
document.querySelectorAll('.ver').forEach(function (b) {
  b.addEventListener('click', function () {
    var i = SGG.$(b.dataset.target), ver = i.type === 'password';
    i.type = ver ? 'text' : 'password';
    b.textContent = ver ? 'Ocultar' : 'Mostrar';
    b.setAttribute('aria-pressed', String(ver));
    b.setAttribute('aria-label', (ver ? 'Ocultar ' : 'Mostrar ') + b.getAttribute('aria-label').split(' ').slice(1).join(' '));
  });
});
