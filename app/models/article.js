module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'article',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER },
      category_id: { type: DataTypes.INTEGER },
      title: { type: DataTypes.STRING },
      body: { type: DataTypes.STRING },
      article_url: { type: DataTypes.STRING },
      comments_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      likes_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      close_comment: { type: DataTypes.INTEGER, defaultValue: 0 }, //0: 关闭评论
      is_hidden: { type: DataTypes.INTEGER, defaultValue: 0 }, //0: 隐藏
      is_excellent: { type: DataTypes.INTEGER, defaultValue: 0 }, //0: 精华
      last_comment_user_id: { type: DataTypes.INTEGER },
      last_comment_time: { type: DataTypes.DATE, defaultValue: Date.now },
      created_at: { type: DataTypes.DATE, defaultValue: Date.now },
      updated_at: { type: DataTypes.DATE, defaultValue: Date.now },
    },
    {
      classMethods: {
        associate(models) {
          Article.belongsTo(models.user);
          Article.belongsTo(models.category);
        },
      },
      instanceMethods: {},
      hooks: {},
      paranoid: true,
      underscored: true,
    }
  ); // update 'deletedAt' instead of delete the row
  return Article;
};
