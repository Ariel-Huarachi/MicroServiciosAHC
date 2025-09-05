import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Cliente',
  tableName: 'clientes',
  columns: {
    id: { type: Number, primary: true, generated: true },
    ci: { type: String, length: 30 },
    nombres: { type: String, length: 100 },
    apellidos: { type: String, length: 100 },
    sexo: { type: String, length: 1 }
  },
  relations: {
    facturas: {
      type: 'one-to-many',
      target: 'Factura',
      inverseSide: 'cliente'
    }
  }
});
