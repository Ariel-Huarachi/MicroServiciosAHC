const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

// Configuración
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Ruta: Listar registros
app.get('/', (req, res) => {
  db.query('SELECT * FROM agenda', (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('index', { agendas: results });
  });
});

// Ruta: Formulario agregar
app.get('/add', (req, res) => {
  res.render('add');
});

// Ruta: Procesar nuevo registro
app.post('/add', (req, res) => {
  const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = req.body;
  db.query(
    'INSERT INTO agenda (nombres, apellidos, fecha_nacimiento, direccion, celular, correo) VALUES (?, ?, ?, ?, ?, ?)',
    [nombres, apellidos, fecha_nacimiento, direccion, celular, correo],
    err => {
      if (err) return res.status(500).send(err);
      res.redirect('/');
    }
  );
});

// Ruta: Formulario editar
app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM agenda WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('edit', { agenda: results[0] });
  });
});

// Ruta: Procesar edición
app.post('/edit/:id', (req, res) => {
  const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = req.body;
  db.query(
    'UPDATE agenda SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, direccion = ?, celular = ?, correo = ? WHERE id = ?',
    [nombres, apellidos, fecha_nacimiento, direccion, celular, correo, req.params.id],
    err => {
      if (err) return res.status(500).send(err);
      res.redirect('/');
    }
  );
});

// Ruta: Eliminar registro
app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM agenda WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
