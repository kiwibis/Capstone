const router = require('express').Router()
module.exports = router
require('../../secrets')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
const path = require('path')

// Creates a client
const client = new vision.ImageAnnotatorClient()

const {parser, prettier} = require('../util')
//let imgData = path.join(__dirname, 'testImg.jpg')

router.post('/read', async (req, res, next) => {
  try {
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(req.files.file.data)
    const textArray = parser(result)
    const prettifiedString = prettier(textArray)
    res.json(prettifiedString)
  } catch (err) {
    next(err)
  }
})
