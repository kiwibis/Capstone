const router = require('express').Router()
const {TrainingData} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    let userId = null
    if (req.user) {
      userId = user.id
    }
    const {initialText, editedText, imageDataURI} = req.body
    await TrainingData.create({
      algoResultText: initialText,
      userEditedText: editedText,
      imageDataURI,
      userId
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
