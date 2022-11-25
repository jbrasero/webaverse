// settings.js
var defaultPlayerName="ANON";
const queryParams = new URLSearchParams(window.location.search)
for (const [key, value] of queryParams) {
  console.log({ key, value })
  if (key=="name")
  {
      defaultPlayerName = value;
  }
}

var chatSettings = {
    URI: 'oda-cfcc2c5ccc044fd795d9e25f8772165e-da4.data.digitalassistant.oci.oraclecloud.com',
    channelId: '1386fc82-56c4-429c-a521-8298eb8485ba',
    userId: defaultPlayerName,
    enableHeadless: true,
    enableAttachment: false,
    enableBotAudioResponse: true,
    initBotAudioMuted: false,
    enableSpeech: true,
    enableSpeechAutoSend: true,
    speechLocale: 'en-us',
  //  displayActionsAsPills: true,
    enableClearMessage: true,
  //  initUserHiddenMessage: 'hello',
    openChatOnLoad: false,
    showConnectionStatus: true,
	position: {bottom: '85px', right: '20px'},
    chatBubbleIconHeight: '24px',
    chatBubbleIconWidth: '24px'
  //  theme: 'classic'
};

var Bots;

function initSDK(name) {
    // If WebSDK is not available, reattempt later
    if (!document || !WebSDK) {
        setTimeout(function() {
            initSDK(name);
        }, 2000);
        return;
    }

    // Default name is Bots
    if (!name) {
        name = 'Bots';
    }

    setTimeout(function() {
        Bots = new WebSDK(chatSettings);    // Initiate library with configuration

        var isFirstConnection = true;
        Bots.on(WebSDK.EVENT.WIDGET_OPENED, function() {
            if (isFirstConnection) {
                Bots.connect()                          // Connect to server
                    .then(function() {
                        console.log('Connection Successful');
                    })
                    .catch(function(reason) {
                        console.log('Connection failed');
                        console.log(reason);
                    });
                   isFirstConnection = false;
            }
        });

        Bots.on(WebSDK.EVENT.READY, function() {
            console.log('The widget is ready');
            Bots.openChat();


            Bots.startVoiceRecording(function(data) {
                  var recognizedText = '';
                  if (data && (data.event === 'finalResult' || data.event === 'partialResult')) {
                      if (data.nbest && data.nbest.length > 0) {
                          recognizedText = data.nbest[0].utterance;
                      }
                  }
              }, function(status) {
                  if (status === WebSocket.OPEN) {
                      // Connection established
                  } else if (status === WebSocket.CLOSED) {
                      // Connection closed
                  }
              }, {
                  onAnalyserReady: function(analyserNode) { console.log('The analyser node is', analyserNode); },
                  onAnalyserFrequencies: function(frequencies) { console.log('New input frequencies are', frequencies); }
              });

       });

       Bots.connect();
       Bots.on('message:received', function(message) {
          const msg = message.messagePayload.text;
          console.log("the user received a message", msg);
        //  this.updateMessageinList(msg);
          //Bots.audioForUtterance(msg);
       });

       Bots.on('networkstatuschange', function(status) {
           switch (status) {
               case 0:
                   status = 'Connecting';
                   break;
               case 1:
                   status = 'Open';
                //   Bots.sendMessage('hi',{ hidden: true });
                   break;
               case 2:
                   status = 'Closing';
                   break;
               case 3:
                   status = 'Closed';
                   break;
           }
           console.log(status);
       });


        window[name] = Bots;
    }, 0);
};
initSDK('Bots');
