const luisUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e0123ca2-82fc-4169-8c73-e2abc4b036f5?subscription-key=9c2c61bd6af84b43a8de449efe6ff15f&staging=true&verbose=true&timezoneOffset=0&q=';

var restify = require('restify');
var builder = require('botbuilder');


var fs = require('fs');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
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
        session.send('CONFLUENCE!!');
        // session.endDialog();
    }
).triggerAction({
    matches: 'confluence'
});

bot.dialog('workday',
    (session) => {
        session.send('WORKDAY!!');
        // session.endDialog();
    }
).triggerAction({
    matches: 'workday'
})