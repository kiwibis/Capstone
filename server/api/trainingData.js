const router = require('express').Router()
const {TrainingData} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    let userId = null
    if (req.user) {
      userId = req.user.id
    }
    const {initialText, editedText} = req.body
    const [trainingData, created] = await TrainingData.findOrCreate({
      where: {userId, algoResultText: initialText},
      defaults: {userEditedText: editedText}
    })
    if (!created && trainingData.userEditedText !== editedText) {
      await trainingData.update({userEditedText: editedText})
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let userId = null
    if (req.user) {
      userId = req.user.id
    }
    await TrainingData.destroy({
      where: {
        userId,
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
