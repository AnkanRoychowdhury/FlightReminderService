const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = async () => {

    // Create the express object
    const app  = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    

    app.listen(PORT, async () => {
        console.log(`Server running on ${PORT}`);

        sendBasicEmail(
            '"HR Nature Technologies" <foo@example.com>',
            'debika.connect@gmail.com',
            'Follow Up on your Application',
            'Hello Debika! We are happy to let you know that you are selected for Software Trainee - Developer'
        );
    });
}

setupAndStartServer();