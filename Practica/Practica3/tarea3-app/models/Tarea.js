const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completado'],
    default: 'pendiente'
  }
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Tarea', tareaSchema);