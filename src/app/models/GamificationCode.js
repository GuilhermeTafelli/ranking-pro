
module.exports = (sequelize, DataTypes) => {
  const GamificationCode = sequelize.define(
    "GamificationCode",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      score: DataTypes.INTEGER,
      customFields: DataTypes.JSON,
    }
  );

  return GamificationCode;
};