
module.exports = (sequelize, DataTypes) => {
  const ProfileInstagramSimulation = sequelize.define(
    "ProfileInstagramSimulation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      socialMediaId: DataTypes.STRING,
      name: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      publications: DataTypes.STRING,
      followers: DataTypes.STRING,
      following: DataTypes.STRING,
      profileName: DataTypes.STRING,
      category: DataTypes.STRING,
      bio: DataTypes.STRING,
      highlights: DataTypes.ARRAY(DataTypes.JSON),
    }
  );

  ProfileInstagramSimulation.associate = function (models) {
    ProfileInstagramSimulation.belongsTo(models.SocialMedia, { foreignKey: 'socialMediaId' })
  }

  return ProfileInstagramSimulation;
};