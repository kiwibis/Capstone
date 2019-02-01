const router = require('express').Router()
const {TrainingData} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    let userId = null
    if (req.user) {
      userId = req.user.id
    }
    const {initialText, editedText} = req.body
    await TrainingData.create({
      algoResultText: initialText,
      userEditedText: editedText,
      userId
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
