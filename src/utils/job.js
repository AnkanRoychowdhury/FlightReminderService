const cron = require('node-cron');
const emailService = require('../services/ticket-service');
const Sender = require('../config/emailConfig');

const setupJobs = () => {
    cron.schedule('*/10 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach(email => {
            Sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async(err,data) => {
                if(err){
                    console.log(err)
                }
                else{
                    await emailService.updateTicket(email.id, {status: 'SUCCESS'})
                }
            });
        });
    });
}

module.exports = setupJobs;