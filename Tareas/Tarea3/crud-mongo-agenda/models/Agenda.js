const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  fecha_nacimiento: Date,
  direccion: String,
  celular: String,
  correo: String,
});

module.exports = mongoose.model('Agenda', AgendaSchema);
