require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const dataSource = require('./data-source');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

dataSource.initialize().then(() => {
  const agendaRepo = dataSource.getRepository('Agenda');

  // Listar registros
  app.get('/', async (req, res) => {
    const agendas = await agendaRepo.find();
    res.render('index', { agendas });
  });

  // Mostrar formulario agregar
  app.get('/add', (req, res) => {
    res.render('add');
  });

  // Guardar nuevo registro
  app.post('/add', async (req, res) => {
    await agendaRepo.save(req.body);
    res.redirect('/');
  });

  // Mostrar formulario editar
  app.get('/edit/:id', async (req, res) => {
    const agenda = await agendaRepo.findOneBy({ id: parseInt(req.params.id) });
    res.render('edit', { agenda });
  });

  // Guardar edición
  app.post('/edit/:id', async (req, res) => {
    await agendaRepo.update(req.params.id, req.body);
    res.redirect('/');
  });

  // Eliminar
  app.get('/delete/:id', async (req, res) => {
    await agendaRepo.delete(req.params.id);
    res.redirect('/');
  });

  app.listen(3000, () => {
    console.log('✅ Servidor con TypeORM en http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ Error al iniciar la conexión con la BD:', err);
});
