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
      bot.reply(message, 'You\'re typing!');
});

controller.hears(['salut','allo','hey','yo'],['direct_message'],function(bot,message) {
    bot.reply(message,{
        attachments:[
            {
                title: 'Salut! As-tu bu de l\'eau aujourd\'hui?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name": "yes",
                        "text": "Oui",
                        "value": "yes",
                        "type": "button"
                    },
                    {
                        "name": "no",
                        "text": "Non",
                        "value": "no",
                        "type": "button"
                    }
                    
                ]
            }
        ]
    })
});

controller.hears(['où est Ilian'],['direct_message'],function(bot,message) {
    bot.reply(message, 'D\'hab, il dors pendant le jour et travaille dans son mancave la nuit.')
});
