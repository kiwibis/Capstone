const router = require('express').Router()
require('../../secrets')
const {
  simplifyVisionResponse,
  balanceBrackets,
  correctErrors
} = require('../util')

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')

const privateKey = process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY
let formattedPrivateKey
if (privateKey) {
  formattedPrivateKey = privateKey.replace(/\\n/g, '\n')
}

// Creates a client
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
    private_key: formattedPrivateKey
  }
})

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

// {
//   type: process.env.GOOGLE_APPLICATION_CREDENTIALS_TYPE,
//   project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID,
//   private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY_ID,
//   private_key: ,
//   client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
//   client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID,
//   auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_URI,
//   token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_TOKEN_URI,
//   auth_provider_x509_cert_url:
//     process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url:
//     process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_X509_CERT_URL
// }
