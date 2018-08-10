'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');
const dbConfig = require('../../config/dbConfig');

const basename = path.basename(module.filename);

// For more details about the sequelize options, refer to
// http://sequelize.readthedocs.io/en/latest/api/sequelize/
const options = dbConfig[config.get('APP_ENV')];
const sequelize = new Sequelize(options.database, options.username, options.password, options);
const db = {};

// store your model definitions in a single file using the import method
// http://docs.sequelizejs.com/en/latest/docs/models-definition/#configuration
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
