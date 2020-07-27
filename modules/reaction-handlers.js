

function handleReactionEvent(reaction, user, client){
const message = reaction.message;

        //this means someone reacted to memebot
    if (message.author.id === client.user.id){

        if (reaction.emoji.name === "👎"){  // uhhh, does this actually work?

            // next we should check if this is the third thumbs down

            //then we should parse for the file name / check if its a meme post

            // then Delete the file.
        }

    }

}

module.exports = {
    handleReactionEvent : handleReactionEvent
};