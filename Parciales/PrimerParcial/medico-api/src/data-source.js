const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'medicosdb',
  synchronize: (process.env.SYNC || 'true') === 'true',
  logging: (process.env.LOGGING || 'false') === 'true',
  entities: [require('./entity/Medico')],
});

module.exports = { AppDataSource };

