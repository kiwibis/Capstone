const Sequelize = require('sequelize')
const db = require('../db')

const TrainingData = db.define('trainingData', {
  algoResultText: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userEditedText: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = TrainingData
