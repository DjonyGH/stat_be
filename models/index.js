const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Issuer = sequelize.define('issuer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  ticket: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  rus_name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
})

const TradingDay = sequelize.define('trading_day', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  open: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  close: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  high: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  low: { type: DataTypes.DECIMAL(13, 6), allowNull: false },
  volume: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
})

Issuer.hasMany(TradingDay)
TradingDay.belongsTo(Issuer)

module.exports = {
  Issuer,
  TradingDay,
}
