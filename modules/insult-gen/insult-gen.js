module.exports = {
    insult: function (name, callback) {
        const fs = require("fs");
        let insult = "";
        if (!name) {
            fs.readFile("./modules/insult-gen/insult.txt", function (err, data) {
                if (err) throw err;
                const lines = data.toString("utf-8").split("\n");
                const randomNum = [Math.floor(Math.random() * lines.length)];
                const names = ["Tom", "Ben", "Scott", "Quinn", "Niel", "Mike", "Gudac", "David", "Alex", "Carlos", "Cyndi", "Vic"];
                name = names[Math.floor(Math.random() * names.length)];
                insult = `Hey ${name}! ${lines[+randomNum]}`;
                callback(null, insult);
            });
        } else if (name.toLowerCase() === "denver" || name.toLowerCase() === "colorado") {
            insult = `${name} is a god damned hellhole. it snows all the time and its hard to breathe there."+
            "Tom would have left this as a positive comment if he didnt have to go in and fix Ski's code.`;
            callback(null, insult);
        } else if (name === "memebot") {
            fs.readFile("./modules/insult-gen/hal.txt", function (err, data) {
                if (err) throw err;
                const lines = data.toString("utf-8").split("\n");
                const randomNum = [Math.floor(Math.random() * lines.length)];
                insult = `${lines[+randomNum]}`;
                callback(null, insult);
            });
        }
        else {
            fs.readFile("./modules/insult-gen/insult.txt", function (err, data) {
                if (err) throw err;
                const lines = data.toString("utf-8").split("\n");
                const randomNum = [Math.floor(Math.random() * lines.length)];
                insult = `Hey ${name}! ${lines[+randomNum]}`;
                callback(null, insult);
            });
        }

        return insult;
    }
};