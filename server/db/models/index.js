const User = require('./user')
const TrainingData = require('./trainingData')

TrainingData.belongsTo(User)
User.hasMany(TrainingData)

module.exports = {
  User,
  TrainingData
}
