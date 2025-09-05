import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Factura',
  tableName: 'facturas',
  columns: {
    id: { type: Number, primary: true, generated: true },
    fecha: { type: 'date' }
  },
  relations: {
    cliente: {
      type: 'many-to-one',
      target: 'Cliente',
      joinColumn: { name: 'clienteId' },
      eager: true
    },
    detalles: {
      type: 'one-to-many',
      target: 'DetalleFactura',
      inverseSide: 'factura',
      cascade: true
    }
  }
});
