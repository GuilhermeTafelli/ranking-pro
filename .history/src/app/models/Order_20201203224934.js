
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
        id: DataTypes.INTEGER,
        type: DataTypes.STRING,
        userId: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        statusMessage: DataTypes.STRING,
        filesLink: DataTypes.ARRAY(DataTypes.STRING),
    }
  );
  
  Order.associate = function(models) {
        Order.belongsTo(models.User, {foreignKey: 'userId'})
  }
  
  return Order;
};