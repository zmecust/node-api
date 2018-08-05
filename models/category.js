export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, defaultValue: 0 },
      articles_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, defaultValue: Date.now },
      updated_at: { type: DataTypes.DATE, defaultValue: Date.now },
    },
    {
      classMethods: {
        associate(models) {
          Category.hasMany(models.article);
        }
      },
      instanceMethods: {},
      hooks: {},
      paranoid: true,
      underscored: true
    }
  );
  return Category;
};
