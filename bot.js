const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

const scheduler = require('./modules/scheduler');
const diceRoller = require('./modules/dice-roller');
const memeGenerator = require('./modules/meme-generator');


logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

logger.info('Logger has started');

console.log("starting....");

const client = new Discord.Client();

client.on('ready', () => {

    client.user.setUsername("MemeBot 2.1");
    console.log(`Logged in as ${client.user.tag}!`);

});

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

        // Find the correct command
        switch(cmd){
            case 'add':
                memeGenerator.addMemes(msg, args[1]);
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
            case 'schedule':
                break;
            case 'insult':
                msg.reply("more insults coming soon, but for now, eat it nerd.");
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
        }
    }
});

client.login(auth.token);