
module.exports = (sequelize, DataTypes) => {
  const SocialMedia = sequelize.define(
    "SocialMedia",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: DataTypes.STRING,
        description: DataTypes.STRING,
        filesLink: DataTypes.ARRAY(DataTypes.STRING),

    }
  );
  
  SocialMedia.associate = function(models) {
        console.log(models)
        SocialMedia.belongsTo(models.User, {foreignKey: 'userId'})
    }
    return SocialMedia;
};