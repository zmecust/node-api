module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      article_id: { type: Sequelize.INTEGER },
      user_id: { type: Sequelize.INTEGER },
      body: { type: Sequelize.TEXT },
      parent_id: { type: Sequelize.INTEGER },
      level: { type: Sequelize.INTEGER, defaultValue: 1 },
      is_hidden: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, defaultValue: Date.now },
      updated_at: { type: Sequelize.DATE, defaultValue: Date.now },
      deleted_at: { allowNull: true, type: Sequelize.DATE }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('comments');
  }
};
