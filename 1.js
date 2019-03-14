function statScrape(id, sender) {
 
    var userUrl = 'https://popflash.site/user/' + id;
   // console.log(userUrl);

    
    rp(userUrl)
        .then(function (html) {
            const arr = [];
            var i = 0;

            $('.stat-container', html).each(function (key, value) {
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

            fs.writeFile(id + '.json', JSON.stringify(json, null, 4), function (err) {
                
                console.log('File successfully written! - Check your project directory for the user output.json file');

            })
            console.log(sender.username);
            console.log(json);
            return json;
        })

        .catch(function (err) {
            console.log("oops error yikes");
        });
}