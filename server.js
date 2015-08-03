var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.render('index',{title: "Todays Games"});
});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

app.get('/tweets', function(req,res){
client.get('search/tweets', {q: '#mets'}, function(error, tweets, response){
   res.json(tweets);
 });
});

app.get('/games', function(req,res) {
  var d = new Date();
  var year = d.getFullYear();

  var month = function() {
    var theMonth = d.getMonth()+1;
    if (theMonth < 10) {
      theMonth = '0'+theMonth;
    }
    return theMonth;
    console.log(theMonth);
  }
  var day = function() {
    var theDay = d.getDate();
    if (theDay < 10) {
      theDay = '0'+theDay;
    }
    return theDay;
  }
  res.json('http://gd2.mlb.com/components/game/mlb/year_'+year+'/month_'+month()+'/day_'+day()+'/master_scoreboard.json')
})

app.post('/hello', function(req,res) {
  console.log(req.body.name + 'hello');
});

var port = 3000;
app.listen(port);
console.log('app running on port '+port);
