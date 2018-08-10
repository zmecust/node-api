module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      avatar: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      real_name: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      confirm_code: { type: Sequelize.STRING(48) },
      articles_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      comments_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      likes_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      followers_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      followings_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_banned: { type: Sequelize.INTEGER, defaultValue: 0 },
      is_confirmed: { type: Sequelize.INTEGER, defaultValue: 0 },
      last_actived_at: { type: Sequelize.DATE, defaultValue: Date.now },
      created_at: { type: Sequelize.DATE, defaultValue: Date.now },
      updated_at: { type: Sequelize.DATE, defaultValue: Date.now },
      deleted_at: { allowNull: true, type: Sequelize.DATE },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
