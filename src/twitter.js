const config = require("./config")

const Twitter = require("twitter")
const client = new Twitter({
	consumer_key : config.client.consumer_key,
	consumer_secret : config.client.consumer_secret,
	access_token_key : config.client.access_token_key,
	access_token_secret : config.client.access_token_secret
})

require("./modules/functions.js")(client);
requestP = require("request-promise-native")

const snekfetch = require("snekfetch"),
      moment = require("moment"),
      chalk = require("chalk"),
      fs = require("fs")

const types = [
	"png",
	"jpeg",
	"jpg",
	"gif"
]

client.success("Starting Twitter Bot...");

setInterval(function() {
	snekfetch.get(`https://www.reddit.com/r/${config.reddit}/new.json`).then(bodyData => {
		const data = bodyData.body.data.children[0].data;

		if (types.some(type => data.url.includes(type))) {
			
	            	const img = requestP({
		        	uri: data.url,
		        	encoding: null          
		    	})

			if (!client.dupes.duplicated.includes(data.url)) {
			    client.post("media/upload", { media: img }, function (error, tweets, response) {
				 client.post("statuses/update", { status : "me irl", media_ids: tweets.media_id_string }, function(err, d, response) {
				 	
					client.dupes.duplicated.push(data.url);

				 	fs.writeFile("./data/duplicated.json", JSON.stringify(client.dupes, null, 4), err => {
				 		if (err) client.error("saving duplicated in json", err.stack);
				 	});	

				 	client.success("Tweeted " + data.url);

			     	}) 			 	
			    });		    
			} else {
				client.error(`attempting to tweet ${data.url} , but was already posted. Declined.`);
			}
		}
	}).catch(err => {
		if (err) client.error("grabbing new reddit json data", err.stack);
	})
	
	// 30 * 60 * 1000
}, 30 * 60 * 1000)
