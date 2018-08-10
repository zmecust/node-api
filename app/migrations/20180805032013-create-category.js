module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('categories', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, defaultValue: 0 },
      articles_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, defaultValue: Date.now },
      updated_at: { type: Sequelize.DATE, defaultValue: Date.now },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('categories');
  },
};
