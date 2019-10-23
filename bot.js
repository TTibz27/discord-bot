//these require statements will pull in external files to use in our program.
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const extIp = require('externalip');

const commands = require('./modules/commands');

//these are our own modules contained in this repo , and submodules pulled in from external git repos
const scheduler = require('./modules/scheduler');
const diceRoller = require('./modules/dice-roller');
const memeGenerator = require('./modules/meme-generator');
const insultGenerator = require('./modules/insult-gen/insult-gen');

// this sets up our logger, which we can use to see messages when we run it from a command line or if we concatenate it to a file
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

logger.info('Logger has started');



console.log("initializing...");
commands.initCustomCommands();

console.log("starting....");

// This creates a "client" object, which is what makes the connection to discord
const client = new Discord.Client();

//these functions below are event handlers that are tied to the client.
// basically you set up a function, and when our 'client' receives a message of the correct type, it will run that function.

// This will run when the bot is ready.
// this would be a good place to initialize any external data, such as CSV files that would be used in any of the modules.
client.on('ready', () => {

    client.user.setUsername("MemeBot 2.1");
    console.log('Logged in as ' + client.user.tag + '!');

});

// this handles messages. it will check any message from any channel that is visible to the bot,
// so if we want to do channel specific actions or user specific or anything, we should filter that here.
client.on('message', msg => {

    if (msg.author.bot === true){
        return;
    }

    if (msg.content.substring(0, 1) === '!') {
        //get the message string
        let message = msg.content;
        // break it down into an array of words
        let args = message.substring(1).split(' ');
        //check the first word for see which command it is
        let cmd = args[0].toLowerCase();

        logger.debug("We found a command!");
        logger.debug(cmd);
        logger.debug(args);

        // loop through commands in command modules
        // Check here for meme commands
        for (let key in commands.memeCommands) {
            if (key === cmd){
                commands.memeCommands[key](msg, args);
            }
        }

        //dice/rng commands
        for (let key in commands.diceCommands) {
            if (key === cmd){
                commands.diceCommands[key](msg, args);
            }
        }

        //insult commands
        for (let key in commands.insultCommands) {
            if (key === cmd){
                commands.insultCommands[key](msg, args);
            }
        }

        //misc
        for (let key in commands.miscCommands) {
            if (key === cmd){
                commands.miscCommands[key](msg, args);
            }
        }

        //custom commands
        for (let i = 0; i < commands.customCommands.length; i ++) {
            if (cmd === commands.customCommands[i].name){
                const foundCommand = commands.customCommands[i];
                if (foundCommand.file){
                    msg.channel.send(foundCommand.message,
                        {
                            files: [{attachment: foundCommand.file, name: ''}]
                        });
                }
                else{
                    msg.channel.send(foundCommand.message);
                }
            }
        }


        // these will be commands that are inherently more tied to the client, or more complicated than just user input.
        switch(cmd){
            case 'addcommand':
                commands.addCustom(msg, args);
                break;
            case 'stats':
                msg.reply("uptime : " + client.uptime + " ms \n  ping : " + client.ping);
                break;
            case 'ip':
                console.log("ip hit");
                    extIp((nullVal, ip )=>{
                        msg.reply("external IP is: " + ip + " \n We used to serve SSH on port 2139. Tom realized he didn't want to get hacked tho.");
                    });
                break;
        }
    }
    else if (msg.content.toLowerCase().match(/memebot/g)){
        let flip = Math.ceil(Math.random() * 2);
        return flip === 1 ? msg.channel.send("......") : msg.channel.send("ゴゴゴゴ");
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
