const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const request =require('request');

const fs = require('fs');
const scheduler = require('./scheduler');
const diceRoller = require('./dice-roller');
const memeGenerator = require('./meme-generator');

const imageDir = "./images";
const crivitzDir = "./images/crivitz";
const wowDir = "./images/wow";
const dolphDir = './images/dolph';

function downloadImage (uri, filename, callback){

    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });

}

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

                let folder = "";
                if (args[1]){folder = args[1].toLowerCase();}

                let tempDir = imageDir;

                if (folder === "crivitz"){
                    tempDir = "./images/crivitz";
                }
                else{
                    folder = "general";
                }

                if(msg.attachments){
                    let url = msg.attachments.first().url.replace('https','http');
                    let filename = tempDir+"/"+msg.attachments.first().filename;
                    try{
                        downloadImage(url,filename, function(){
                            msg.reply('Saved your meme to '+ folder + ' memes!');
                        });
                    }
                    catch(err){
                        msg.reply("Error found:  "+err)
                    }
                }
                else {
                    msg.reply('Something went wrong... No attachment found!');
                }
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

