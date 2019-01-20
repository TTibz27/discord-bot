const request =require('request');
const fs = require('fs');
const randomFile = require('select-random-file');

const imageDir = "./images";
const crivitzDir = "./images/crivitz";
const wowDir = "./images/wow";
const dolphDir = './images/dolph';

function dolphinMeme (msg) {
    msg.channel.send({
        files: [{
            attachment: './images/dolphinboi.jpg',
            name: 'dolphinboi.jpg'
        }]
    })
    //.then(console.log)
        .catch(console.error);
    return;
}

function randomMeme(msg){

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

function crivitz(msg){
    msg.channel.send('Pulling a dank crivitz meme...');

    randomFile(crivitzDir, (err, file) => {
        msg.channel.send(
            'Your Crvitz meme: '+file,
            {
                files: [{
                    attachment: crivitzDir + '/' +file,
                    name: ''
                }]
            })
    });
}

function owenWilsonMeme(msg){
    randomFile(wowDir, (err, file) => {
        msg.channel.send(
            'wow!',
            {
                files: [{
                    attachment: wowDir + '/' +file,
                    name: ''
                }]
            })
    });
}

function dolphMeme(msg){
    msg.channel.send('I WILL BREAK YOU');

    randomFile(dolphDir, (err, file) => {
        msg.channel.send(
            'If he dies, he dies. ',
            {
                files: [{
                    attachment: dolphDir + '/' +file,
                    name: ''
                }]
            })
    });
}

function oobidooMeme(msg){
    msg.channel.send({
        files: [{
            attachment: './images/oobidoo.jpg',
            name: 'oobidoo.jpg'
        }]
    });
}

function addMemes(msg, inFolder){
    let folder = "";
    if (inFolder){folder = inFolder.toLowerCase();}

    let tempDir = imageDir;

    if (folder === "crivitz"){
        tempDir = crivitzDir;
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
}

//helper for addMemes()
function downloadImage (uri, filename, callback){

    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}


module.exports = {
    dolphinMeme:dolphinMeme,
    randomMeme:randomMeme,
    crivitz:crivitz,
    owenWilsonMeme:owenWilsonMeme,
    dolphMeme:dolphMeme,
    oobidooMeme:oobidooMeme,
    addMemes:addMemes
}