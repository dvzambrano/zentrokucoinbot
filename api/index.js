//https://zentrolicensorbot.vercel.app/api/index
//npm install -g now
//now --prod
//curl -F "url=https://zentrolicensorbot.vercel.app/api/index"  https://api.telegram.org/bot1450849635:AAHpvMRi6EMdCajw6yZ9G6uma0WV1FF2JCY/setWebhook
//https://api.telegram.org/bot1450849635:AAHpvMRi6EMdCajw6yZ9G6uma0WV1FF2JCY/getWebhookinfo


const axios = require("axios")


module.exports = (req, res) => {
    const { message } = req.body

    var chat_id = 816767995;
    var text = '';
    
    if (!message) {
        
    }
    else
    {
        chat_id = message.chat.id;
        text = message.text;
    }
    
    text = encodeURIComponent(text);
    
    var url = 'http://zentro.nat.cu/api/bot/licensor/'+chat_id+'?text='+text;
    axios.get(url).then(response => {
        const html = response.data; 
        let array = JSON.parse(JSON.stringify(html));
        for(var index = 0; index < array.length; index++){
            text = array[index];
            
            axios.post(
                    "https://api.telegram.org/bot1450849635:AAHpvMRi6EMdCajw6yZ9G6uma0WV1FF2JCY/sendMessage",
                    {
                        chat_id: chat_id,
                        text: text,
                    }
                )
                .then((response) => {
                    // We get here if the message was successfully posted
                    console.log("Message posted")
                    res.end("ok")
                })
                .catch((err) => {
                    axios.post(
                        "https://api.telegram.org/bot1450849635:AAHpvMRi6EMdCajw6yZ9G6uma0WV1FF2JCY/sendMessage",
                        {
                            chat_id: 816767995,
                            text: 'Telegram ERROR: '+err+'. '+url,
                        }
                    )
                    
                    console.log("Error :", err)
                    res.end("Error :" + err)
                })	
        }
    })
    .catch((err) => {
        // ...and here if it was not
		var user = message.chat.first_name + ' ' + message.chat.last_name;
		if(message.chat.username)
			user = ' @' + message.chat.username;
		text = message.chat.id + user + ': ' + message.text;
        axios.post(
            "https://api.telegram.org/bot1450849635:AAHpvMRi6EMdCajw6yZ9G6uma0WV1FF2JCY/sendMessage",
            {
                chat_id: 816767995,
                text: 'Zentro ERROR: '+err+'. URL: '+url+'. U: '+ message.chat.id + user + ': ' + message.text,
            }
        )
    
        console.log("Error :", err)
        res.end("Error :" + err)
    })

  
}