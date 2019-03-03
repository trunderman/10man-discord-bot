let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');
let express = require('express');
let fs = require('fs');
let app = express();
var request = require('request');



app.get('/', function (req, res) {

    url = 'https://popflash.site/user/896175';

   request(url, function (error, response, html) {
        if (!error) {

            var $ = cheerio.load(html);
            
            var json = {
                
                stats: {
                    "HLTV": "",
                    "ADR": "",
                    "HS": "",
                    "W": "",
                    "L": "",
                    "T": "",
                    "%": "",
                }
            };

            var arr = [];
            var i = 0;

            $('.stat-container').each(function (key, value) {
                arr[i++] = $(this).find(".stat").text();
                
            });

            //console.log(json.stats);  

            for (i = 0; i < json.stats.length; i++) {
                console.log(json.stats);
            }
           // console.log(json.stats);
            Q
            fs.writeFile('output.json', JSON.stringify(arr, null, 4), function (err) {
             
                console.log('File successfully written! - Check your project directory for the output.json file');

            })

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send('Check your console!')

        } else {

            console.log('error happened :' + error);

        }

       

    });
})

app.listen(8081);
console.log('Magic happens on port 8081');
exports = module.exports = app;








//let $ = cheerio.load('https://popflash.site/user/896175');
//jsonframe($); // initializes the plugin


//let frame = {
//    "HLTV": ".stat-title:contains('HLTV')"
//}

//console.log()
//let result = $('body').scrape(frame, { string: true });
//console.log(result);




