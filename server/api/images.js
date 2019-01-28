const router = require('express').Router()
module.exports = router
require('../../secrets')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')

// Creates a client
const client = new vision.ImageAnnotatorClient()

const {parser, prettier} = require('../util')
let imgData = 'path/to/testImg.jpg'

router.post('/read', async (req, res, next) => {
  try {
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(imgData)
    const textArray = parser(result)
    const prettifiedString = prettier(textArray)
    res.json(prettifiedString)
  } catch (err) {
    next(err)
  }
})
