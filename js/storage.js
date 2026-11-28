/* Capa de persistencia compartida: array de usuarios en la clave 'usuarios_sgg'. */
window.SGG = window.SGG || {};
SGG.$ = function (id) { return document.getElementById(id); };
SGG.CLAVE = 'usuarios_sgg';
SGG.usuarios = {
  todos: function () {
    try { return JSON.parse(localStorage.getItem(SGG.CLAVE)) || []; } catch (e) { return []; }
  },
  guardar: function (lista) { localStorage.setItem(SGG.CLAVE, JSON.stringify(lista)); },
  buscar: function (email) {
    email = email.trim().toLowerCase();
    return this.todos().find(function (u) { return u.email === email; });
  }
};
SGG.setError = function (id, msg) {
  SGG.$('err-' + id).textContent = msg || '';
  SGG.$(id).setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
};
SGG.estado = function (msg, ok) {
  var e = SGG.$('message'); e.textContent = msg; e.className = ok ? 'ok' : 'error';
};
/* Usuarios de prueba (solo si no hay datos). */
if (SGG.usuarios.todos().length === 0) {
  SGG.usuarios.guardar([
    { nombre: 'Ana', apellido: 'Pérez', nacimiento: '1998-04-12', email: 'ana@sgg.com', password: 'Clave#2026' },
    { nombre: 'Luis', apellido: 'Gómez', nacimiento: '1995-09-30', email: 'luis@sgg.com', password: 'Gasto$2026' }
  ]);
}
