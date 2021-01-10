const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = transporter
