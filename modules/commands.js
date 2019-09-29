//these are our own modules contained in this repo , and submodules pulled in from external git repos
const scheduler = require('./scheduler');
const diceRoller = require('./dice-roller');
const memeGenerator = require('./meme-generator');
const insultGenerator = require('./insult-gen/insult-gen');


// all commands should take in msg then args, regardless of type.
// it should probably be an interface or something, but this isnt typescript sooooooo.

//(msg, args) =>{...}
const memeCommands = {
    add:(msg, args)=>{ memeGenerator.addMemes(msg, args[1]);},
    meme:(msg)=>{
        memeGenerator.randomMeme(msg);
    },
    crivitz: (msg)=>{memeGenerator.crivitz(msg);},
    wow: (msg)=>{ memeGenerator.owenWilsonMeme(msg);},
    dolph:(msg)=>{memeGenerator.dolphMeme(msg);},
    dolphin:(msg)=>{memeGenerator.dolphinMeme(msg);},
    touchdown:(msg)=>{memeGenerator.oobidooMeme(msg);}
};
const diceRollerCommands = {
    roll:(msg, args)=>{   msg.reply(diceRoller.parseDiceCommand(args[1]));},
    flip: (msg, args)=>{ msg.reply(diceRoller.coinFlip());}
};
const insultCommands =  {
    insult:(msg, args)=>{
        insultGenerator.insult(args[1], function (insult) {
                    msg.channel.send(insult);
        });
    }
};

const miscCommands = {
    help: (msg, args)=>{msg.reply('HOW ABOUT YOU HELP URSELF M8');},
    tom:(msg, args)=>{  msg.reply('Tom Pls');},
    marco: (msg, args)=>{msg.reply('Polo!');},
    ping:(msg, args)=>{msg.reply('pong.')},

};
// Custom Commands will be an array of objects so we can leverage array functions, ie push
const customCommands = [];

function addCustomCommand (msg, args){
    msg.reply("adding command...")
    console.log(args[1]);
    customCommands.push({name: args[1].toLowerCase(), message: args.slice(2).join(" ")});
}

module.exports = {
    memeCommands: memeCommands,
    diceCommands: diceRollerCommands,
    insultCommands: insultCommands,
    customCommands: customCommands,
    miscCommands: miscCommands,
    addCustom: addCustomCommand
}