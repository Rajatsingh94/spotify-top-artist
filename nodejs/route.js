const express = require('express');
const router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');
var twilio = require('twilio');

var spotifyApi = new SpotifyWebApi({
  clientId: '28d9eff5d0aa4471b7f4a9e8278c1043',
  clientSecret: '839540f0cdd74690b71beaa9bef9fb0b'
});

var twilioClient = new twilio('AC086d47289fea4f4bdb6552ab953f2f2d', '7b48888e37c0edbc6e3435d2ac5d0297');


//Creating a Post Route For Submitting the Artist and Number to Spotify Api
router.post('/', (req,res)=>{
 
 const artist_name = req.body.name;
 const number_call = req.body.number;
 

var textTrack = function(client, artist, track) {
var body = `${artist.name}'s top track: ${track.name}`;

  client.api.account.messages.create({
    from: '+15204624724',
    to: number_call,
    body: body
  });

  console.log(`Texted to ${number_call}`);
};

 

 spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);

    spotifyApi.searchArtists(artist_name)
      .then(function(data) {
        var artist = data.body.artists.items[0];
                
        const info = {
          artist_uname : artist.name,
          popularity : artist.popularity,
          followers : artist.followers["total"],
          genres : artist.genres
      }

          res.json(info);
        spotifyApi.getArtistTopTracks(artist.id, 'US')
          .then(function(data) {
            textTrack(twilioClient, artist, data.body.tracks[0]);
          }, function(err) {
            console.error(err);
          });
      }, function(err){
        console.error(err);
      });

  }, function(err) {
    console.error(err);
  });

  res.status(200);

})


module.exports = router;