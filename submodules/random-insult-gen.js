module.exports = function randomInsultGenerator(filename, name, callback) {
    const fs = require('fs');
    fs.readFile(filename, function (err, data) {
        if (err) throw err;

        // Data is a buffer that we need to convert to a string
        // Improvement: loop over the buffer and stop when the line is reached
        const lines = data.toString('utf-8').split("\n");
        const randomNum = [Math.floor(Math.random() * lines.length)]
        const insult = `Hey ${name}! ${lines[+randomNum]}`;
        const names = ['Tom', 'Ben', 'Scott', 'Quinn', 'Niel', 'Mike',
        'Gudac', 'David', 'Alex', 'Carlos', "Cyndi", "Vic"
    ];
        if (randomNum > lines.length) {
            return callback('No insult found you nerd', null);
        } else if(!name) {
            let randomName = names[Math.floor(Math.random() * names.length)];
            name = randomName
        }

        callback(null, insult);
    });
}