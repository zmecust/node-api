module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('articles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER },
      category_id: { type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      body: { type: Sequelize.STRING },
      article_url: { type: Sequelize.STRING },
      comments_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      likes_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      view_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      close_comment: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_hidden: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_excellent: { type: Sequelize.INTEGER, defaultValue: 0 },
      last_comment_user_id: { type: Sequelize.INTEGER },
      last_comment_time: { type: Sequelize.DATE, defaultValue: Date.now },
      created_at: { type: Sequelize.DATE, defaultValue: Date.now },
      updated_at: { type: Sequelize.DATE, defaultValue: Date.now },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('articles');
  },
};
