let cheerio = require('cheerio');

let express = require('express');
let fs = require('fs');
let app = express();
var disc = require('./discbot')
var popflashscraper = require('./popflashscraper')
var request = require('request');


disc();




app.listen(8081);
console.log('serving on 8081');


