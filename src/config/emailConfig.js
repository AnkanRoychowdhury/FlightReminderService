const nodemailer = require('nodemailer');
const { EMAIL_ID, EMAIL_PASS } = require('./serverConfig');

const Sender = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASS
    }
});

module.exports = Sender;