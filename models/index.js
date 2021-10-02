const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Issuer = sequelize.define('issuer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100) },
  ticker: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  rus_name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
})

const Trade = sequelize.define('trade', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  open: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  close: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  high: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  low: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  volume: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
})

const Dividend = sequelize.define('dividend', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
})

Issuer.hasMany(Trade)
Trade.belongsTo(Issuer)

Issuer.hasMany(Dividend)
Dividend.belongsTo(Issuer)

module.exports = {
  Issuer,
  Trade,
  Dividend,
}
