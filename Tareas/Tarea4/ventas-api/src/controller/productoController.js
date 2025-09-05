import { AppDataSource } from '../database.js';

const repo = () => AppDataSource.getRepository('Producto');

export const list = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  const [items, total] = await repo().findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { id: 'DESC' }
  });
  res.json({ data: items, page, limit, total });
};

export const getById = async (req, res) => {
  const item = await repo().findOneBy({ id: parseInt(req.params.id, 10) });
  if (!item) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(item);
};

export const create = async (req, res) => {
  const nuevo = repo().create(req.body);
  const saved = await repo().save(nuevo);
  res.status(201).json(saved);
};

export const update = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await repo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Producto no encontrado' });
  await repo().update({ id }, req.body);
  const updated = await repo().findOneBy({ id });
  res.json(updated);
};

export const remove = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await repo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Producto no encontrado' });
  await repo().delete({ id });
  res.status(204).send();
};
