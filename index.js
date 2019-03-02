const rp = require("request-promise");
const cheerio = require("cheerio");
const Table = require("cli-table");

let users = [];

const options = {
    uri: 'https://popflash.site/user/896175',
    transform: function (body) {
        return cheerio.load(body);
    },
    json: true
}

rp(options)
    .then(($) => {
        //console.log($);
        var stat = $('.stat-container').text();
        var res = stat.split('\n');
        var obj = { obj: res };
        //var json = JSON.stringify(stat)
        console.log(obj);
    });