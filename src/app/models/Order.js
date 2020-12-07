
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        type: DataTypes.STRING,
        userId: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        statusMessage: DataTypes.STRING,
        filesLink: DataTypes.ARRAY(DataTypes.STRING),
        customFields: DataTypes.JSON,

    }
  );
  
  Order.associate = function(models) {
        Order.belongsTo(models.User, {foreignKey: 'userId'})
  }
  
  return Order;
};