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

controller.hears(['hey','hi','hello','yo'],['direct_message'],function(bot,message) {
    bot.reply(message, 'Hey! Do you want to play a game? (Please say rock paper scissors, that\'s the only one I know!');
    bot.reply(message, {
        attachments: [
            {
                title: 'Which game would you like to play?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                {
                    'name': 'rock-paper-scissors',
                    'text': 'Rock paper scissors',
                    'value': 'rock-paper-scissors',
                    'type': 'button',
                },{
                    'name': 'call-of-duty',
                    'text': 'Call of Duty',
                    'value': 'call-of-duty',
                    'type': 'button',
                }
                
                ]
            }
        ]
    })
});
