import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Producto',
  tableName: 'productos',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, length: 100 },
    descripcion: { type: String, length: 255 },
    marca: { type: String, length: 100 },
    stock: { type: Number, default: 0 }
  },
  relations: {
    detalles: {
      type: 'one-to-many',
      target: 'DetalleFactura',
      inverseSide: 'producto'
    }
  }
});
