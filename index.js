let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');
let express = require('express');
let fs = require('fs');
let app = express();
var disc = require('./discbot')
var request = require('request');

disc();



app.get('/', function (req, res) {

    url = 'https://popflash.site/user/896175';

   request(url, function (error, response, html) {
        if (!error) {

            var $ = cheerio.load(html);
            var arr = [];
            var i = 0;
            

            $('.stat-container').each(function (key, value) {
                arr[i++] = $(this).find(".stat").text();
                
            });

            var json = {


                HLTV: arr[0],
                ADR: arr[1],
                HS: arr[2],
                W: arr[3],
                L: arr[4],
                T: arr[5],
                win_percent: arr[6]

            };

          
            console.log(json);
            
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
             
                console.log('File successfully written! - Check your project directory for the output.json file');

            })

           
            res.send('Check your console!')

        } else {

            console.log('error happened :' + error);

        }

       

    });
})

console.log(disc.userId);

app.listen(8081);
console.log('serving on 8081');
exports = module.exports = app;


