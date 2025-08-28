const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Tarea = require('./models/Tarea');

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tareas_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error en MongoDB:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const tareas = await Tarea.find().sort({ createdAt: -1 });
  res.render('index', { tareas });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  await Tarea.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);
  res.render('edit', { tarea });
});

app.post('/edit/:id', async (req, res) => {
  await Tarea.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});