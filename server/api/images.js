const router = require('express').Router()
module.exports = router
require('../../secrets')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')

// Creates a client
const client = new vision.ImageAnnotatorClient()

const {parser, prettier} = require('../util')

router.get('/read', async (req, res, next) => {
  try {
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(
      '/Users/aidanmurray/Desktop/grace-hopper/capstone/server/api/testImg.jpg'
    )
    const textArray = parser(result)
    const prettifiedString = prettier(textArray)
    console.log(prettifiedString)
    res.json({prettifiedString})
    // res.json(result.fullTextAnnotation.text)
  } catch (err) {
    next(err)
  }
})
