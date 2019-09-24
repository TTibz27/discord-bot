module.exports = insultGenerator(name, callback) {
    const fs = require("fs");
    let insult = "";
            if (!name) {
                fs.readFile("insult.txt", function (err, data) {
                    if (err) throw err;
                    const lines = data.toString("utf-8").split("\n");
                    const randomNum = [Math.floor(Math.random() * lines.length)];
                    const names = ["Tom", "Ben", "Scott", "Quinn", "Niel", "Mike", "Gudac", "David", "Alex", "Carlos", "Cyndi", "Vic"];
                    let randomName = names[Math.floor(Math.random() * names.length)];
                    name = randomName
                    insult = `Hey ${name}! ${lines[+randomNum]}`;
                    callback(null, insult);
                });
            } else if (name.toLowerCase() === "denver" || name.toLowerCase() === "colorado") {
                insult =  `${name} is wonderful. You'll love it here. See you soon. Real soon.`
                callback(null, insult);
            } else if (name == "memebot") {
                fs.readFile("hal.txt", function (err, data) {
                    if (err) throw err;
                    const lines = data.toString("utf-8").split("\n");
                    const randomNum = [Math.floor(Math.random() * lines.length)];
                    insult = `${lines[+randomNum]}`
                    callback(null, insult);
                });
            }
            else {
                fs.readFile("insult.txt", function (err, data) {
                    if (err) throw err;
                    const lines = data.toString("utf-8").split("\n");
                    const randomNum = [Math.floor(Math.random() * lines.length)];
                    insult = `Hey ${name}! ${lines[+randomNum]}`;
                    callback(null, insult);
                });
            }
        };
    // insultGenerator("mike", function (err, line) {
    //     console.log(line);
    // });