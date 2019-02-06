const User = require('./user')
const TrainingData = require('./trainingData')

TrainingData.belongsTo(User)
User.hasMany(TrainingData, {as: 'functions'})

module.exports = {
  User,
  TrainingData
}
