const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Conexión MySQL
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: '1234',
  database: 'usuarios_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// Rutas
app.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.render('index', { usuarios: results });
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { nombre, correo } = req.body;
  db.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
