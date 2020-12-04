
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
        instagram: DataTypes.STRING,
        facebook: DataTypes.STRING,
        youtube: DataTypes.STRING,
        twitter: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        aboutMe: DataTypes.STRING,
        whereYouFrom: DataTypes.STRING,
        monthlyInvoicing: DataTypes.INTEGER,
        skills: DataTypes.ARRAY(DataTypes.STRING),
        currentContracts: DataTypes.INTEGER
    }
  );
  
  SocialMedia.associate = function(models) {
        console.log(models)
        SocialMedia.belongsTo(models.User, {foreignKey: 'userId'})
    }
    return SocialMedia;
};