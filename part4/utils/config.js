require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URI = process.env.MONGO_URI
let SECRET = process.env.SECRET

module.exports = { PORT, MONGO_URI, SECRET }