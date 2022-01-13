'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Products' }
    },
    discussion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Discussion.associate = function(models) {
    Discussion.belongsTo(models.User, { foreignKey: 'userId' });
    Discussion.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return Discussion;
};
