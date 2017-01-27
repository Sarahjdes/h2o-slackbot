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

controller.hears(['shoot'],['direct_message'],function(bot,message) {
    bot.reply(message,reply_with_rock);
    bot.reply(message,reply_with_paper);
    bot.reply(message,reply_with_scissors);
});


var reply_with_rock = {
    'username': 'RPS Bot',
    'text': 'bam, rock!',
    'attachments': [
    {
        'fallback': 'this is a fallback',
        'image_url': 'https://dl.dropboxusercontent.com/u/62133025/rock.png',
        'title': 'Rock!',
        'text': 'Mineral matter of variable composition, consolidated or unconsolidated, assembled in masses or considerable quantities in nature, as by the action of heat or water.',
        'color': '#FF1493'
    }
    ],
    'icon_url': 'https://dl.dropboxusercontent.com/u/62133025/rock.png'
}


var reply_with_paper = {
    'username': 'RPS Bot',
    'text': 'bam, paper!',
    'attachments': [
    {
        'fallback': 'this is a fallback',
        'image_url': 'https://dl.dropboxusercontent.com/u/62133025/paper.png',
        'title': 'Paper!',
        'text': 'A substance made from wood pulp, rags, straw, or other fibrous material, usually in thin sheets, used to bear writing or printing, for wrapping things, etc.',
        'color': '#FF1493'
    }
    ],
    'icon_url': 'https://dl.dropboxusercontent.com/u/62133025/rock.png'
}


var reply_with_scissors = {
    'username': 'RPS Bot',
    'text': 'bam, scissors!',
    'attachments': [
    {
        'fallback': 'this is a fallback',
        'image_url': 'https://dl.dropboxusercontent.com/u/62133025/scissors.png',
        'title': 'Scissors!',
        'text': 'A cutting instrument for paper, cloth, etc., consisting of two blades, each having a ring-shaped handle, that are so pivoted together that their sharp edges work one against the other',
        'color': '#FF1493'
    }
    ],
    'icon_url': 'https://dl.dropboxusercontent.com/u/62133025/scissors.png'
}

controller.hears(['bot_pick'], ['direct_message'], function(bot, message) {
    if (bot_pick() == 'rock') {
        console.log('ouistiti!');
    }
});

function bot_pick() {
    var x = Math.floor((Math.random() * 3) + 1);
    if (x == 1) {
        pick = 'rock';
    } else if (x == 2) {
        pick = 'paper';
    } else if (x == 3) {
        pick = 'scissors';
    }
    return pick
}
