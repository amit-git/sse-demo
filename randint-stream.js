var http = require("http");
var fs = require("fs");

const MAX_VAL = 500;

http.createServer(function (req, res) {
    var interval;

    if (req.url == "/stream") {
        res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});
        res.write("retry: 10000\n");
        res.write("event: random-int\n");
        res.write("data: " + randomInt(0, MAX_VAL) + "\n\n");

        interval = setInterval(function() {
            res.write("data: " + randomInt(0, MAX_VAL) + "\n\n");
        }, 2000);

        req.connection.addListener("close", function () {
            clearInterval(interval);
        }, false);
    } else {
        serveHtmlFile('.' + req.url, res);
    }

}).listen(8080, "127.0.0.1");

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function serveHtmlFile(fileName, res) {
    fs.exists(fileName, function(exists) {
        if (exists) {
            fs.readFile(fileName, function(error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {"Content-Type":"text/html"});
                    res.end(content, "utf-8");
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}

console.log("Server running at http://127.0.0.1:8080/");
