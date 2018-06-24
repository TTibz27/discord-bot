module.exports = {
    rollDice: function (diceCount, sides) {
        let runningTotal = 0;
        let rollString = "";
        for (let i = 0; i < diceCount; i++ ){
            let roll = Math.ceil(Math.random() * sides);
            runningTotal += roll;
            rollString += (roll + ' ');  //Javascript is dumb
        }

        return "Total: "+ runningTotal +" : " + rollString;
    },

    parseDiceCommand : function(commandString){
        if (!commandString){ return "That command was invalid, send a better parameter, nerds.";}

        let diceCount = 1;
        let sides = 6;
        let args = commandString.toLowerCase().split('d');

        if (args.length === 1){
            console.log("sides is now set to " - args[0]);
            diceCount = 1;
            sides = args[0];
        }
        else if (args.length === 2) {
            diceCount = args[0];
            sides = args[1];
            if(diceCount < 1) diceCount = 1;
        }
        else {return "something went wrong, and this bot is confused...."}

        return this.rollDice(diceCount, sides);
    },

    coinFlip: function () {
        let flip = Math.ceil(Math.random() * 2);
        return flip === 1 ? "Heads!!!" : "Tails!!!";
    }
};