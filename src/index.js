const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const jobs = require('./utils/job');
const { create } = require('./controllers/ticket-controller');

const setupAndStartServer = async () => {

    // Create the express object
    const app  = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.post('/api/v1/tickets', create)

    app.listen(PORT, async () => {
        console.log(`Server running on ${PORT}`);
        jobs();
    });
}

setupAndStartServer();