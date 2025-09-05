import { AppDataSource } from '../database.js';

const detalleRepo = () => AppDataSource.getRepository('DetalleFactura');

export const addToFactura = async (req, res) => {
  const facturaId = parseInt(req.params.facturaId, 10);
  const { productoId, cantidad, precio } = req.body;
  const detalle = detalleRepo().create({
    factura: { id: facturaId },
    producto: { id: productoId },
    cantidad,
    precio
  });
  const saved = await detalleRepo().save(detalle);
  res.status(201).json(saved);
};

export const listByFactura = async (req, res) => {
  const facturaId = parseInt(req.params.facturaId, 10);
  const items = await detalleRepo().find({ where: { factura: { id: facturaId } }, relations: ['factura'] });
  res.json(items);
};

export const update = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await detalleRepo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Detalle no encontrado' });
  const body = { ...req.body };
  if (req.body.productoId) body.producto = { id: req.body.productoId };
  if (req.body.facturaId) body.factura = { id: req.body.facturaId };
  await detalleRepo().update({ id }, body);
  const updated = await detalleRepo().findOneBy({ id });
  res.json(updated);
};

export const remove = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = await detalleRepo().findOneBy({ id });
  if (!exists) return res.status(404).json({ message: 'Detalle no encontrado' });
  await detalleRepo().delete({ id });
  res.status(204).send();
};
