let SQL, db, opfsRoot;
const DB_FILE = 'sgg.sqlite';

async function iniciarDB() {
  SQL = await initSqlJs({
    locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
  });
  opfsRoot = await navigator.storage.getDirectory();

  try {
    const fh = await opfsRoot.getFileHandle(DB_FILE);
    const file = await fh.getFile();
    db = new SQL.Database(new Uint8Array(await file.arrayBuffer()));
  } catch (e) {
    db = new SQL.Database(); // primera vez: no existe el archivo
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS movimientos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL,
      monto REAL NOT NULL,
      categoria TEXT NOT NULL,
      tipo_movimiento TEXT NOT NULL CHECK (tipo_movimiento IN ('ingreso','egreso')),
      fecha TEXT NOT NULL,
      url_comprobante TEXT,
      activo INTEGER DEFAULT 1
    )
  `);
  await guardarDB();
}

async function guardarDB() {
  try {
    const fh = await opfsRoot.getFileHandle(DB_FILE, { create: true });
    const w = await fh.createWritable();
    await w.write(db.export());
    await w.close();
  } catch (err) {
    console.error('No se pudo guardar en OPFS:', err);
    alert('No se pudo guardar en OPFS: ' + err.message);
  }
}

async function insertarMovimiento(m) {
  db.run(
    `INSERT INTO movimientos (descripcion, monto, categoria, tipo_movimiento, fecha, url_comprobante)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [m.descripcion, m.monto, m.categoria, m.tipo, m.fecha, m.url || null]
  );
  await guardarDB();
}

function listarMovimientos() {
  const res = db.exec(`
    SELECT id, descripcion, monto, categoria, tipo_movimiento, fecha
    FROM movimientos WHERE activo = 1
    ORDER BY fecha DESC, id DESC
  `);
  return res.length ? res[0].values : [];
}

function obtenerBalance() {
  const res = db.exec(`
    SELECT COALESCE(SUM(CASE WHEN tipo_movimiento = 'ingreso' THEN monto ELSE -monto END), 0)
    FROM movimientos WHERE activo = 1
  `);
  return res[0].values[0][0];
}

// Borrado lógico: nunca DELETE
async function eliminarMovimiento(id) {
  db.run('UPDATE movimientos SET activo = 0 WHERE id = ?', [id]);
  await guardarDB();
}