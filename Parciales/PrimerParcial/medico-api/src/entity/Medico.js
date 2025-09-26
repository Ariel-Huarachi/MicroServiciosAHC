// src/entity/Medico.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Medico',
  tableName: 'medicos',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    nombre: { type: 'varchar', length: 120 },
    apellido: { type: 'varchar', length: 120 },
    cedulaProfesional: { type: 'varchar', length: 50, unique: true },
    especialidad: { type: 'varchar', length: 120, nullable: true },
    aniosExperiencia: { type: 'int', default: 0 },
    correoElectronico: { type: 'varchar', length: 160, unique: true }
  },

});
