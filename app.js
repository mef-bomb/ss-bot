const luisUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e0123ca2-82fc-4169-8c73-e2abc4b036f5?subscription-key=9c2c61bd6af84b43a8de449efe6ff15f&staging=true&verbose=true&timezoneOffset=0&q=';

var restify = require('restify');
var builder = require('botbuilder');

const dialog = {
    DOCTOR: 'Please find corporate doctor schedule here https://softserveinc.facebook.com/groups/1091213570989488/',
    KE: `Please request Knowledge Evaluation for the next position here https://jira.softserveinc.com/secure/CreateIssueDetails!init.jspa?pid=10231&issuetype=19
        Also please find training catalog and career map links below, i hope they will be useful:
        Training Catalog- https://softserve.csod.com/LMS/BrowseTraining/BrowseTraining.aspx?tab_page_id=-6#f=1&s=544&o=1
        Career Map - https://career-map.softservecom.com/map/#
        Career plan- https://career-plan.softserveinc.com/#/group/
        `,
    WORKDAY: `Please visit workday: https://wd3.myworkday.com/softserve/d/home.htmld
        Here you can find infromation about your time offs, salary reports, information about your mates.
        Also in the workday you are able to request a vacation.
        `,
    CONFLUENCE: `Please visit confluence: https://confluence.softserveinc.com/index.action#all-updates
        Here you can find any project related question, project&company processes and many other useful infromation.
        `
}


var fs = require('fs');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'af7e6d08-3376-4f23-b88e-d710823f520d',
    appPassword: 'yquPLOZ2=*gduiHSZ6653|]'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
server.get('/healthcheck', (req, res, next) => {
    res.status(200);
    res.send('OK');
});

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

var recognizer = new builder.LuisRecognizer(luisUrl);
bot.recognizer(recognizer);
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')

bot.dialog('confluence',
    (session) => {
        session.send(dialog.CONFLUENCE);
        // session.endDialog();
    }
).triggerAction({
    matches: 'confluence'
});

bot.dialog('workday',
    (session) => {
        session.send(dialog.WORKDAY);
        // session.endDialog();
    }
).triggerAction({
    matches: 'workday'
})

bot.dialog('ke',
    (session) => {
        session.send(dialog.KE);
        // session.endDialog();
    }
).triggerAction({
    matches: 'ke'
})

bot.dialog('doctor',
    (session) => {
        session.send(dialog.DOCTOR);
        // session.endDialog();
    }
).triggerAction({
    matches: 'doctor'
})

