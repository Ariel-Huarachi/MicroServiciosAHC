const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Agenda = require('./models/Agenda');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/agenda_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
app.get('/', async (req, res) => {
  const agendas = await Agenda.find();
  res.render('index', { agendas });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  await Agenda.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const agenda = await Agenda.findById(req.params.id);
  res.render('edit', { agenda });
});

app.post('/edit/:id', async (req, res) => {
  await Agenda.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Agenda.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('🚀 Servidor Mongo en http://localhost:3000');
});
