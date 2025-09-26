const express = require('express');

function validate(body) {
  const errors = [];
  const required = ['nombre','apellido','cedulaProfesional','correoElectronico'];
  required.forEach(k => { if (!body[k]) errors.push(`Falta el campo: ${k}`); });
  if (body.aniosExperiencia != null && isNaN(parseInt(body.aniosExperiencia))) {
    errors.push('aniosExperiencia debe ser numérico');
  }
  return errors;
}

function buildMedicoRouter(AppDataSource) {
  const router = express.Router();
  const repo = () => AppDataSource.getRepository('Medico');

  // Listar todos
  router.get('/', async (req, res) => {
    const items = await repo().find();
    res.json(items);
  });

  // Obtener por ID
  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = await repo().findOneBy({ id });
    if (!item) return res.status(404).json({ message: 'Médico no encontrado' });
    res.json(item);
  });

  // Crear
  router.post('/', async (req, res) => {
    try {
      const errors = validate(req.body);
      if (errors.length) return res.status(400).json({ errors });
      const payload = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedulaProfesional: req.body.cedulaProfesional,
        especialidad: req.body.especialidad ?? null,
        aniosExperiencia: req.body.aniosExperiencia ?? 0,
        correoElectronico: req.body.correoElectronico,
      };
      const medico = repo().create(payload);
      const saved = await repo().save(medico);
      res.status(201).json(saved);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Cédula profesional o correo ya existen' });
      }
      console.error(err);
      res.status(500).json({ message: 'Error al crear médico' });
    }
  });
  

  // Actualizar
  router.put('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const existing = await repo().findOneBy({ id });
      if (!existing) return res.status(404).json({ message: 'Médico no encontrado' });
      const patch = {
        nombre: req.body.nombre ?? existing.nombre,
        apellido: req.body.apellido ?? existing.apellido,
        cedulaProfesional: req.body.cedulaProfesional ?? existing.cedulaProfesional,
        especialidad: req.body.especialidad ?? existing.especialidad,
        aniosExperiencia: req.body.aniosExperiencia ?? existing.aniosExperiencia,
        correoElectronico: req.body.correoElectronico ?? existing.correoElectronico,
      };
      await repo().update({ id }, patch);
      const updated = await repo().findOneBy({ id });
      res.json(updated);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Cédula profesional o correo ya existen' });
      }
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar médico' });
    }
  });

  // Eliminar
  router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const existing = await repo().findOneBy({ id });
    if (!existing) return res.status(404).json({ message: 'Médico no encontrado' });
    await repo().delete({ id });
    res.json({ message: 'Eliminado' });
  });

  return router;
}

module.exports = { buildMedicoRouter };
