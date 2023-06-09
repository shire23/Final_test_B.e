'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa_kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  siswa_kelas.init({
    id_kelas: DataTypes.INTEGER,
    id_siswa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'siswa_kelas',
  });
  return siswa_kelas;
};