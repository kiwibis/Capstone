const router = require('express').Router()
const {TrainingData} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    let userId = null
    if (req.user) {
      userId = req.user.id
    }
    const {initialText, editedText} = req.body
    const alreadyDone = await TrainingData.findOne({
      where: {
        algoResultText: initialText,
        userId
      }
    })
    if (alreadyDone && alreadyDone.userId) {
      alreadyDone.update({userEditedText: editedText})
    } else {
      await TrainingData.create({
        algoResultText: initialText,
        userEditedText: editedText,
        userId
      })
    }

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
