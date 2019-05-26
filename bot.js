//these require statements will pull in external files to use in our program.
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

//these are our own modules contained in this repo , and submodules pulled in from external git repos
const scheduler = require('./modules/scheduler');
const diceRoller = require('./modules/dice-roller');
const memeGenerator = require('./modules/meme-generator');
const insultGen = require('./submodules/random-insult-gen/random-insult-gen');

// this sets up our logger, which we can use to see messages when we run it from a command line or if we concatenate it to a file
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

logger.info('Logger has started');

console.log("starting....");

// This creates a "client" object, which is what makes the connection to discord
const client = new Discord.Client();

//these functions below are event handlers that are tied to the client.
// basically you set up a function, and when our 'client' receives a message of the correct type, it will run that function.

// This will run when the bot is ready.
// this would be a good place to initialize any external data, such as CSV files that would be used in any of the modules.
client.on('ready', () => {

    client.user.setUsername("MemeBot 2.1");
    console.log(`Logged in as ${client.user.tag}!`);

});

// this handles messages. it will check any message from any channel that is visible to the bot,
// so if we want to do channel specific actions or user specific or anything, we should filter that here.
client.on('message', msg => {
    if (msg.content.substring(0, 1) === '!') {
        //get the message string
        let message = msg.content;
        // break it down into an array of words
        let args = message.substring(1).split(' ');
        //check the first word for see which command it is
        let cmd = args[0].toLowerCase();

        logger.debug("COMMAND FOUND");
        logger.debug(cmd);
        logger.debug(args);

        // Find the correct command from our switch statement (half of these are inside jokes for any confused random onlookers)
        switch(cmd){
            case 'add':
                memeGenerator.addMemes(msg, args[1]); // args[1] is the second word parsed above
                break;
            case 'meme':
                msg.reply('One repost coming right up!');
                memeGenerator.randomMeme(msg);
                break;
            case 'crivitz':
                memeGenerator.crivitz(msg);
                break;
            case 'wow':
                memeGenerator.owenWilsonMeme(msg);
                 break;
            case 'dolph':
                memeGenerator.dolphMeme(msg);
                break;
            case 'dolphin':
                memeGenerator.dolphinMeme(msg);
                break;
            case 'touchdown':
                memeGenerator.oobidooMeme(msg);
                break;
            case 'help':
                msg.reply('HOW ABOUT YOU HELP URSELF M8');
                break;
            case 'tom':
                msg.reply('Tom u suck');
                break;
            case 'schedule':
                break;
            case 'insult':
                msg.channel.send(insultGen.randomInsultGenerator(args[1]));
                break;
            case 'roll':
               msg.reply(diceRoller.parseDiceCommand(args[1]));
                break;
            case 'flip':
                msg.reply(diceRoller.coinFlip());
                break;
            case 'marco':
                msg.reply("polo!");
                break;
            case 'ping':
                msg.reply("pong!");
                break;
            case 'stats':
                msg.reply("uptime : " + client.uptime + " ms \n  ping : " + client.ping);
                break;

        }
    }
});

// this handles reacts to messages. I am not sure what we are going to do with this yet, so for now we will just log it.
client.on('messageReactionAdd',(msgReaction, user)=>{
    logger.info(msgReaction.emoji.identifier);
    logger.info(user);
});

//this will happen when the websocket is disconnected. we can add stuff here to allow the bot to gracefully shut down,
// we might be able to attempt to restart the connection here too, not 100% sure if that will work how I think it does though...
client.on('error', ()=>{

});


//Once we have set up how our bot will react to messages coming in, we will log into the server and it should be good to go!
client.login(auth.token);
