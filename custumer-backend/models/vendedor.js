'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here, for example:
      // this.belongsTo(models.OtherModel, { foreignKey: 'otherModelId' });
    }
  }
  Vendedor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Vendedor',
    tableName: 'vendedores'  // Nombre de la tabla en la base de datos
  });
  return Vendedor;
};
