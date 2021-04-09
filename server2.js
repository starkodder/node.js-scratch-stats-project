var http = require('http');
var url = require('url');
var fs = require('fs');
 
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if (q.pathname == "/"){
	  filename = "index.html"
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404,);
      console.log(filename + " - Event: Someone has tried to access this page.");
	  return res.end('404 not found'
	  );
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
	console.log(filename + " - Event: Someone has visited this page.");
    return res.end();
  });
}).listen(2800);

var Scratch = require('scratch-api');
const fetch = require('node-fetch');
Scratch.UserSession.load(function (err, user) {
    user.cloudSession(513201876, function (err, cloud) {
        function timeout() {
            setTimeout(function () {
                //get the data from whatever way you like (fetch is cool btw so i will use it here)
                fetch('https://api.scratch.mit.edu/users/starkodder/messages/count')
                    .then(res => res.json())
                    .then(data => {
                        cloud.set('☁ messages', data.count)
                    })
		fetch('https://scratchdb.lefty.one/v2/user/info/starkodder')
                    .then(res => res.json())
                    .then(data => {
                        cloud.set('☁ country', data.statistics.ranks.country.followers)
			cloud.set('☁ world', data.statistics.ranks.followers)
			cloud.set('☁ followers', data.followers)
                    })
                /*fetch('https://scratch.mit.edu/users/starkodder/followers/')
			.then(response => response.text())
			.then(function(html){
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, "text/html");
				cloud.set('☁ followers', doc.body.querySelectorAll("h2")[0].childNodes[1].textContent.split("\n").toString().split(",")[6].split("(")[1].split(")")[0])
			});*/
		/*fetch('https://scratch.mit.edu/users/starkodder/followers/')
			.then(response => response.text())
			.then(function(html){
				cloud.set('☁ followers', html.substring(html.indexOf("Följare") + 9, html.indexOf(")", html.indexOf("Följare"))));
			});*/
                timeout();
            }, 5000 /*time in milliseconds to check for and update, never ever go lower than 10 a second!!!*/);
        }
        timeout() //a loop
    });
});
