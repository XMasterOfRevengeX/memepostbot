// memebot
var twitter = require('twitter');
var keys = require('./configs/keys.js');
var discord = require('discord.io');

var twitterBot = new twitter({
    consumer_key: keys.twitterKey,
    consumer_secret: keys.twitterSecret,
    access_token_key: keys.twitterAccessToken,
    access_token_secret: keys.twitterAccessSecret
});

var twitterStream = twitterBot.stream('statuses/filter', {follow: 819929557000134656});
twitterStream.on('data', function(data){
    //console.log(data);
    if (data.user.id == 819929557000134656){
        if (data.entities !== undefined && data.entities.media !== undefined){
            console.log(`@${data.user.screen_name} wrote: "${data.entities.media[0].media_url}"`);
            discordBot.sendMessage({
                to: '819929557000134656',
                message: `@${data.user.screen_name} ${data.entities.media[0].media_url}`
            });
        }else{
            console.log(`@${data.user.screen_name} wrote: "${data.text}"`);
            discordBot.sendMessage({
                to: '819929557000134656',
                message: `@${data.user.screen_name} "${data.text}"`
            });
        }
    } else {
        //console.log("retweet");
    }
});

twitterStream.on('error', function(err){
    throw err;
});

var discordBot = new discord.Client({
    token: keys.discordKey,
    autorun: true
});

discordBot.on('ready', function(){
    console.log(`${discordBot.username} with id ${discordBot.id}`);
});

discordBot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        discordBot.sendMessage({
        to: channelID,
        message: "pong"
    });
                        }
}); 
