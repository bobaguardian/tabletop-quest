'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    imageSrc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.hasMany(models.Discussion, { foreignKey: 'productId' });
  };
  return Product;
};
