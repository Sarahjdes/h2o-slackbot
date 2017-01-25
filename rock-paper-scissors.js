var Botkit = require('./lib/Botkit.js');

if (!process.env.token) {
    console.log('Erreur : Dude, t\'as oublié de spécifier ton token!');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: true,
    require_delivery:true
});

controller.spawn({
    token : process.env.token
}).startRTM(function(err,bot,payload) {
    if (err) {
        throw new Error('Could not connect to slack');
    }
});

controller.on('user_typing',function(bot,message) {
      bot.reply(message, 'Choose wisely! I\'m trying to read your mind so I can crush you!');
});
