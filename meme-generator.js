
const randomFile = require('select-random-file');

const imageDir = "./images";
const crivitzDir = "./images/crivitz";
const wowDir = "./images/wow";
const dolphDir = './images/dolph';

export function dolphinMeme (msg) {
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

export function memeGenerator(msg){

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

export function crivitz(msg){
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

export function owenWilsonMeme(msg){
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

export function dolphMeme(msg){
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

export function oobidooMeme(msg){
    msg.channel.send({
        files: [{
            attachment: './images/oobidoo.jpg',
            name: 'oobidoo.jpg'
        }]
    });
}