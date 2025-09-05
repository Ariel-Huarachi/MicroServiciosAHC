import { AppDataSource } from '../database.js';

const repo = () => AppDataSource.getRepository('Factura');

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
  const item = await repo().findOne({ where: { id: parseInt(req.params.id, 10) } });
  if (!item) return res.status(404).json({ message: 'Factura no encontrada' });
  res.json(item);
};

export const create = async (req, res) => {
  // body: { fecha, cliente: { id: clienteId } } o { fecha, clienteId }
  const body = { ...req.body };
  if (req.body.clienteId) body.cliente = { id: req.body.clienteId };
  const nuevo = repo().create(body);
  const saved = await repo().save(nuevo);
  res.status(201).json(saved);
};

export const update = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await repo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Factura no encontrada' });
  const body = { ...req.body };
  if (req.body.clienteId) body.cliente = { id: req.body.clienteId };
  await repo().update({ id }, body);
  const updated = await repo().findOneBy({ id });
  res.json(updated);
};

export const remove = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await repo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Factura no encontrada' });
  await repo().delete({ id });
  res.status(204).send();
};
