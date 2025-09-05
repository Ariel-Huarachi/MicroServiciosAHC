import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'DetalleFactura',
  tableName: 'detalles_factura',
  columns: {
    id: { type: Number, primary: true, generated: true },
    cantidad: { type: Number },
    precio: { type: 'decimal', precision: 10, scale: 2 }
  },
  relations: {
    factura: {
      type: 'many-to-one',
      target: 'Factura',
      joinColumn: { name: 'facturaId' },
      onDelete: 'CASCADE'
    },
    producto: {
      type: 'many-to-one',
      target: 'Producto',
      joinColumn: { name: 'productoId' },
      eager: true
    }
  }
});
