require("dotenv").config();
var request = require("request");
var Spotify = require("node-spotify-api")
const keys = require("./keys.js");
const util = require('util')
var bandsintown = require('bandsintown')('codingbootcamp')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();
let artist = ""
let movieName = ""
arguments = process.argv.slice(2)
if (arguments.length === 0) {
    console.log("Sorry, no command was given. Please try again.The commands you can choose from are:");
    console.log("\r\n");
    console.log("concert-this '<artist/band name here>'");
    console.log("\r\n");
    console.log("spotify-this-song '<song name here>'");
    console.log("\r\n");
    console.log("movie-this '<movie name here>'");
    console.log("\r\n");
    console.log("do-what-it-says");
}
else if (arguments[0] === "concert-this") {
    for (var i = 1; i < arguments.length; i++) {

        if (i > 1 && i < arguments.length) {

            artist = artist + " " + arguments[i];

        }

        else {

            artist += arguments[i];

        }
    }

    bandsintown
        .getArtistEventList(artist)
        .then(function (response) {
            
            if (response.length === 0) { console.log("No upcoming dates for this artist. Sorry! Maybe check another artist?") }
            else {
                console.log("\n" + "Concert Information for " + artist + '\n')
                response.forEach(function (response) {
                    let concertDate = moment(response.datetime).format('MM/DD/YYYY');
                    (console.log("Venue: " + response.venue.name + '\n' + "Location: " + response.venue.city + ', ' + response.venue.region + '\n' + "Date: " + concertDate + '\n'))
                })
            }
        })
        .catch(err => console.log(err))


}
else if (arguments[0] === "spotify-this-song") {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(util.inspect(data, { showHidden: false, depth: null }))

    });
}
else if (arguments[0] === "movie-this") {
    for (var i = 1; i < arguments.length; i++) {

        if (i > 1 && i < arguments.length) {

            movieName = movieName + " " + arguments[i];

        }

        else {

            movieName += arguments[i];

        }
    var urlOMDB = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(urlOMDB, function (error, response, body) {
        var pBody=JSON.parse(body)
        // If the request is successful
        if (!error && response.statusCode === 200) {
           
            console.log("\n"+
` Title : ${pBody.Title}
 Year: ${pBody.Year}
 IMDB Rating: ${pBody.Ratings[0].Value}
 Rotten Tomatoes Rating: ${pBody.Ratings[1].Value}
 Country of Production: ${pBody.Country}
 Language: ${pBody.Language}
 Plot: ${pBody.Plot}
 Actors:${pBody.Actors}`)
        }
    });
    }



}
else if (arguments[0] === "do-what-it-says") {

}