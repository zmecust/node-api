module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      article_id: { type: DataTypes.INTEGER },
      user_id: { type: DataTypes.INTEGER },
      body: { type: DataTypes.TEXT },
      parent_id: { type: DataTypes.INTEGER },
      level: { type: DataTypes.INTEGER, defaultValue: 1 }, //评论的层级
      is_hidden: { type: DataTypes.INTEGER, defaultValue: 0 }, //0: 未隐藏
      created_at: { type: DataTypes.DATE, defaultValue: Date.now },
      updated_at: { type: DataTypes.DATE, defaultValue: Date.now },
    },
    {
      classMethods: {
        associate(models) {
          Comment.belongsTo(models.article);
          Comment.belongsTo(models.user);
        },
      },
      instanceMethods: {},
      hooks: {},
      paranoid: true,
      underscored: true,
    }
  );
  return Comment;
};
