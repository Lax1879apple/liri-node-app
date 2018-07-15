/*require("dotenv").config();
var keys = require("./keys");
var firstName = process.argv[2];
console.log("value of commond prompt is "+firstName);
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);


`my-tweets`

`spotify-this-song`

`movie-this`

`do-what-it-says`
*/
require("dotenv").config();
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var terminalValueOne = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

  
if(terminalValueOne == "spotify-this-song"){
  var terminalValueTwo = process.argv[3];
  spotify.search({ type: 'track', query: terminalValueTwo }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }else{
      for(var i=0;i<data.tracks.items.length;i++){
        console.log("Result "+ (i+1)); 
        console.log("================================================="); 
        console.log("Preview Link: "+ data.tracks.items[i].preview_url); 
        console.log("Song Name: "+ data.tracks.items[i].name); 
        console.log("Artist: "+ data.tracks.items[i].artists[0].name);
        console.log("Album Name: "+ data.tracks.items[i].album.name); 
        
      }
      
    }
  });
}else{
  var params = {screen_name: terminalValueOne};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i=0; i<tweets.length;i++){
        console.log("Tweet"+(i+1)+" "+tweets[i].text +" Created On "+ tweets[i].created_at);
      }
    }else{
      console.log(error);
    }
  });
}

