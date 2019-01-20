const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

const scheduler = require('./scheduler');
const diceRoller = require('./dice-roller');
const memeGenerator = require('./meme-generator');


logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

logger.info('Logger has started');

console.log("starting....");

const client = new Discord.Client();

client.on('ready', () => {

    client.user.setUsername("MemeBot 2.0");
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
    if (msg.content === '!ping') {
        msg.reply('pong');
    }
    if (msg.content === '!marco') {
        msg.reply('polo!');
    }
    if (msg.content === "!dolphin"){
        memeGenerator.dolphinMeme(msg);
    }

    else if (msg.content === "!meme"){
        msg.reply('One repost coming right up!');
        memeGenerator.randomMeme(msg);

    }

    else if (msg.content.substring(0, 1) === '!') {
        let message = msg.content;
        let args = message.substring(1).split(' ');
        let cmd = args[0].toLowerCase();

        logger.debug("COMMAND FOUND");
        logger.debug(cmd);
        logger.debug(args);

        switch(cmd){
            case 'add':
                memeGenerator.addMemes(msg, args[1]);
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

            case 'touchdown':
                memeGenerator.oobidooMeme(msg);
                break;

            case 'help':
                msg.reply('HOW ABOUT YOU HELP URSELF M8');
                break;

            case 'schedule':

                break;

            case 'roll':
               msg.reply(diceRoller.parseDiceCommand(args[1]));
                break;

            case 'flip':
                msg.reply(diceRoller.coinFlip());
                break
        }
    }
});


client.login(auth.token);

