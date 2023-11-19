const Sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

const ticketRepo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
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

const fetchPendingEmails = async(timestamp) => {
    try {
        const response = await ticketRepo.getPendingTicket({status: 'PENDING'});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response = await ticketRepo.createTicket(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await ticketRepo.updateTicket(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const subscribeEvents = async (payload) => {

    let service = payload.service;
    let data = payload.data;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_MAIL':
            sendBasicEmail(data);
            break;
        default:
            console.log('No valid event received');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}