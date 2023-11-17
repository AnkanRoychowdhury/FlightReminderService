const Sender = require("../config/emailConfig")


const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        Sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail
}