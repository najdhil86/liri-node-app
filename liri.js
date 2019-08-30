require("dotenv").config();

// const spotify_id = process.env.SPOTIFY_ID

// console.log(spotify_id);

var operation = process.argv[2];

var user_input = process.argv[3];

var keys = require("./keys.js");

//Variables for Spotify-this-song 

const Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//Variables for movie-this and concert-this

const axios = require('axios');

const moment = require('moment');

var artist = process.argv.slice(3).join(' ');

//Variable for look-for-it

var fs = require('fs');


if (operation == "concert-this") {

  axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response){

      console.log(response.data[0].venue.name);

      console.log(response.data[0].venue.city +', '+response.data[0].venue.country);
      

      var concert_date = response.data[0].datetime;

      console.log(moment(concert_date).format('L'));
      // console.log(response.data.datetime);

    })
    
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

} else if (operation == "spotify-this-song") {

 

  spotify.search({type: 'track', query: user_input, limit: 20}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(JSON.stringify(data.tracks.item))
    
    console.log(
      'Artist = ' + JSON.stringify(data.tracks.items[0].album.artists[0].name)
    )
    console.log('Album:' + JSON.stringify(data.tracks.items[0].album.name))
    console.log('Song: ' + JSON.stringify(data.tracks.items[0].name))
    console.log(
      'Link: ' + JSON.stringify(data.tracks.items[0].external_urls.spotify)
    )
  });


    
} else if (operation == "movie-this") {

  var movie = (process.argv.slice(3).join(' '));

  axios
    .get('https://www.omdbapi.com/?t=' + user_input + '&y=&plot=short&apikey=trilogy')
    .then(function(response) {

      if (user_input == '') {

        user_input = 'Mr.Nobody'
        console.log(user_input)
        
      } else {

      console.log('Title: ' + response.data.Title);

      console.log('Year: ' + response.data.Year);

      console.log('IMDB Rating: ' + response.data.imdbRating);

      // we can't pass if statement through find so we use a in line function to pass a condition. The function can be seen as query 
      // console.log('Rotten Tomatoes Rating: ' + response.data.Ratings.find(function(rating){
      //   return rating.Source == 'Rotten Tomatoes' 
      // }).Value);

      //for loop to grab the Rotten Tomatoes Rating

      for (let i = 0; i < response.data.Ratings.length; i++) {
        
        let rating = response.data.Ratings[i];

        if (rating.Source == 'Rotten Tomatoes') {

          console.log('Rotten Tomatoes Rating: ' + rating.Value);
          
          break;

        }

      }

      // console.log(response.data);

      console.log('Country: ' + response.data.Country);

      console.log('Language: ' + response.data.Language);
      
      console.log('Plot: ' + response.data.Plot);
      
      console.log('Actors: ' + response.data.Actors);

      }
      

    })

    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
    
} else if (operation == "do-what-it-says") {

  var contents = fs.readFileSync('./random.txt', 'utf8');

    console.log(contents);
    
}