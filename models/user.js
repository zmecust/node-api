export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      real_name: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      confirm_code: { type: DataTypes.STRING(48) },
      articles_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      comments_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      likes_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      followers_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      followings_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_banned: { type: DataTypes.INTEGER, defaultValue: 0 },    //0:未禁用、 1:已禁用
      is_confirmed: { type: DataTypes.INTEGER, defaultValue: 0 }, //0:未激活、 1:已激活
      last_actived_at: { type: DataTypes.DATE, defaultValue: Date.now },
      created_at: { type: DataTypes.DATE, defaultValue: Date.now },
      updated_at: { type: DataTypes.DATE, defaultValue: Date.now },
    },
    {
      classMethods: {
        associate(models) {
          User.hasMany(models.article);
          User.hasMany(models.comment);
        }
      },
      instanceMethods: {},
      hooks: {},
      paranoid: true,
      underscored: true
    }
  );
  return User;
};
