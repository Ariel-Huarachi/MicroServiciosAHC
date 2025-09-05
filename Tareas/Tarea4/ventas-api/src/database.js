import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    new URL('./entity/Producto.js', import.meta.url).pathname,
    new URL('./entity/Cliente.js', import.meta.url).pathname,
    new URL('./entity/Factura.js', import.meta.url).pathname,
    new URL('./entity/DetalleFactura.js', import.meta.url).pathname
  ],
});
