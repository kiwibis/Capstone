const router = require('express').Router()
require('../../secrets')
const {
  simplifyVisionResponse,
  balanceBrackets,
  correctErrors
} = require('../util')

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')

// Creates a client
const client = new vision.ImageAnnotatorClient()

router.post('/', async (req, res, next) => {
  try {
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(req.files.file.data)
    const textArray = simplifyVisionResponse(result)
    const correctedTextArray = correctErrors(textArray)
    const textString = balanceBrackets(correctedTextArray)

    res.json(textString)
  } catch (err) {
    next(err)
  }
})

module.exports = router
