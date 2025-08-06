const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: 'sqlite',
  database: 'agenda.sqlite',
  synchronize: true,
  entities: [require('./entity/Agenda')],
});
