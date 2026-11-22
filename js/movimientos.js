function mostrarMovimientos() {
  const tbody = document.getElementById('listaMovimientos');
  tbody.innerHTML = '';

  listarMovimientos().forEach(([id, descripcion, monto, categoria, tipo, fecha]) => {
    const tr = document.createElement('tr');
    [fecha, descripcion, categoria, tipo, `$${monto.toFixed(2)}`].forEach((texto, i) => {
      const td = document.createElement('td');
      td.textContent = texto;
      if (i === 3) td.className = tipo;
      tr.appendChild(td);
    });

    const tdAccion = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.addEventListener('click', async () => {
      await eliminarMovimiento(id);
      mostrarMovimientos();
    });
    tdAccion.appendChild(btn);
    tr.appendChild(tdAccion);
    tbody.appendChild(tr);
  });

  document.getElementById('balance').textContent = `$${obtenerBalance().toFixed(2)}`;
}

document.getElementById('formMovimiento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const monto = parseFloat(document.getElementById('monto').value);
  if (isNaN(monto) || monto <= 0) {
    alert('El monto debe ser mayor a 0');
    return;
  }
  await insertarMovimiento({
    descripcion: document.getElementById('descripcion').value.trim(),
    monto,
    categoria: document.getElementById('categoria').value.trim(),
    tipo: document.getElementById('tipo').value,
    fecha: document.getElementById('fecha').value
  });
  e.target.reset();
  mostrarMovimientos();
});

(async () => {
  try {
    await iniciarDB();
    mostrarMovimientos();
  } catch (err) {
    console.error('Error al iniciar la base:', err);
    alert('No se pudo iniciar la base de datos. Abrí la página con Live Server.');
  }
})();