//these are our own modules contained in this repo , and submodules pulled in from external git repos
const scheduler = require('./scheduler');
const diceRoller = require('./dice-roller');
const memeGenerator = require('./meme-generator');
const insultGenerator = require('./insult-gen/insult-gen');
const fs = require('fs');
const request =require('request');
const attachmentDir = "images/custom";
const customCommandFile = "config/commands.txt";
// Custom Commands will be an array of objects so we can leverage array functions, ie push
const customCommands = [];


// all commands should take in msg then args, regardless of type.
// it should probably be an interface or something, but this isnt typescript sooooooo.

//(msg, args) =>{...}

function init() {
 const data = fs.readFileSync(customCommandFile);
 const cmds = JSON.parse(data);
 for(let i =0; i < cmds.length; i ++){
     customCommands.push(cmds[i]);
     console.log("pushing command");
 }
}

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

function addCustomCommand (msg, args){
    console.log(args[1]);

    for (let i = 0; i < customCommands.length; i++) {
        if (args[1].toLowerCase() === customCommands[i].name) {
            msg.reply("removing old command...");
            customCommands.splice(i, 1);
        }
    }
    // This .first() will return undefined if there is no object in the collection...
    // the collection object is weird in discordjs for some reason, and caches if you try to make an array?
    // I just want to know if one exists, why do I have to use a special library for that?
    if(msg.attachments.first() &&  msg.attachments.first().url){
        let url = msg.attachments.first().url.replace('https','http');
        let filename = attachmentDir +"/"+ Math.floor(new Date() / 1000)+ "_" +msg.attachments.first().filename ;
        try{
            downloadImage(url,filename, function(){
                msg.reply('Image Command Saved!');
                fs.writeFileSync(customCommandFile, JSON.stringify(customCommands) , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            });
            customCommands.push({name: args[1].toLowerCase(), message: args.slice(2).join(" "), file: filename});
        }
        catch(err){
            msg.reply("Error found:  "+err)
        }
    }
    else {
        if (!args[2]){
            msg.reply("This command has no text, so it will not be added.")
        }
        else {
            customCommands.push({name: args[1].toLowerCase(), message: args.slice(2).join(" "), file: null});
            msg.reply("New command added!");
            fs.writeFileSync(customCommandFile, JSON.stringify(customCommands) , function(err) {
                if(err) {  return console.log(err); }
                console.log("The file was saved!");
            });
        }
    }

    if (customCommands.length >0){
        //save array to file


    }
}

// helper function, duplicated in meme-generator, should probably refactor this away eventually.
function downloadImage (uri, filename, callback){

    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = {
    initCustomCommands: init,
    memeCommands: memeCommands,
    diceCommands: diceRollerCommands,
    insultCommands: insultCommands,
    customCommands: customCommands,
    miscCommands: miscCommands,
    addCustom: addCustomCommand,
    customAttachmentDir : attachmentDir
};