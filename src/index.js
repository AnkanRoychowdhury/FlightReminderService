const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');

const jobs = require('./utils/job');
const { create } = require('./controllers/ticket-controller');
const { subscribeMessage, createChannel } = require('./utils/messageQueue');
const EmailService = require('./services/ticket-service');

const setupAndStartServer = async () => {

    // Create the express object
    const app  = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    const channel = await createChannel();

    app.post('/api/v1/tickets', create);
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, async () => {
        console.log(`Server running on ${PORT}`);
        jobs();
    });
}

setupAndStartServer();