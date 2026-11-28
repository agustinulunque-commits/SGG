/* Validaciones reutilizables (DRY) para registro y recuperación. */
SGG.val = {
  nombre: function (v) { return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(v); },
  email: function (v) { return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(v); },
  edad: function (iso) {
    var n = new Date(iso), h = new Date();
    var e = h.getFullYear() - n.getFullYear();
    if (h.getMonth() < n.getMonth() || (h.getMonth() === n.getMonth() && h.getDate() < n.getDate())) e--;
    return e;
  }
};
