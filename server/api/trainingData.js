const router = require('express').Router()
const {TrainingData} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const {initialText, editedText} = req.body
    await TrainingData.create({
      algoResultText: initialText,
      userEditedText: editedText
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
