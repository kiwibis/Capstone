const Sequelize = require('sequelize')
const db = require('../db')

const TrainingData = db.define('trainingData', {
  algoResultText: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userEditedText: {
    type: Sequelize.TEXT,
    allowNull: false
  }
  // imageDataURI: {
  //   type: Sequelize.TEXT,
  //   allowNull: false
  // }
})

module.exports = TrainingData
