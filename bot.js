const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const request =require('request');
const randomFile = require('select-random-file');
const fs = require('fs');
const scheduler = require('./scheduler');
const diceRoller = require('./dice-roller');

const imageDir = "./images";
const crivitzDir = "./images/crivitz";

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
        msg.channel.send({
            files: [{
                attachment: './images/dolphinboi.jpg',
                name: 'dolphinboi.jpg'
            }]
        })
        //.then(console.log)
            .catch(console.error);
    }


    else if (msg.content === "!meme"){
        msg.channel.send('Processing Meme request...');

        randomFile(imageDir, (err, file) => {
            console.log('The random file is: ${file}.');
            console.log(file);

            msg.channel.send(
                'Your random meme is...'+file,
                {
                    files: [{
                        attachment: imageDir+'/' +file,
                        name: ''
                    }]
                })
        })
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
                    msg.reply('Something went wrong... No attaachment found!');
                }
                break;

            case 'crivitz':
                msg.channel.send('Pulling a dank crivitz meme...');

                randomFile(crivitzDir, (err, file) => {
                    msg.channel.send(
                        'Your Crvitz meme: '+file,
                        {
                            files: [{
                                attachment: crivitzDir+'/' +file,
                                name: ''
                            }]
                        })
                });

                break;

            case 'touchdown':
                msg.channel.send({
                    files: [{
                        attachment: './images/oobidoo.jpg',
                        name: 'oobidoo.jpg'
                    }]
                });
                break;

            case 'help':
                msg.reply('!add, !dolphin, !meme');
                break;

            case 'schedule':

                break;

            case 'roll':
               msg.reply(diceRoller.parseDiceCommand(args[1].toLowerCase()));
                break;

        }
    }
});


client.login(auth.token);

