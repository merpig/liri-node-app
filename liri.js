require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var ConcertThis = require('./concert-this');
var concert_this = new ConcertThis();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since the query may contain spaces
var term = process.argv.slice(3).join(' ');

if (search === 'concert-this') {
    if(!term) return;
    console.log('\n\n -----------------------------------------------');
    console.log('|  ~Searching for "' + term + '" from Bands in Town~\t|');
    console.log(' -----------------------------------------------');
    concert_this.search(term);
} else if(search === 'spotify-this-song'){
    if(!term) term = "The Sign";
    console.log('\n -----------------------------------------------');
    console.log('|\t~Searching for "' + term + '" in Spotify~\t|');
    console.log(' -----------------------------------------------');
    spotify.search({ type: 'track', query: term })
    .then(function(response) {
      var artists = response.tracks.items[0].album.artists;
      var songName = response.tracks.items[0].name;
      var songLink = response.tracks.items[0].external_urls.spotify;
      var albumName = response.tracks.items[0].album.name;
      var artistText = "Artist(s): \t[ ";
      var songNameText = "Song name: \t[ " + songName + " ]\n";
      var songLinkText = "Song link: \t[ " + songLink + " ]\n";
      var albumNameText = "Album name: \t[ " + albumName + " ]\n\n";
      for(var i = 0; i < artists.length;i++){
        if(i<=artists.length-2)
            artistText += artists[i].name + " ] [ ";
        else
            artistText += artists[i].name + " ]\n";
      }
      console.log(artistText + songNameText + songLinkText + albumNameText);
    })
    .catch(function(err) {
      console.log(err);
    });
} else if(search === 'movie-this'){
    if(!term) term = "Mr. Nobody";
    console.log('~Searching for "' + term + '" in OMDB~');
} else if(search === 'do-what-it-says'){

}