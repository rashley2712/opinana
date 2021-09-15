const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const serverutils = require('./serverutils.js');

const app = express();
const port = 3000;
const rootPath = '/var/www/opinana/';
const responseLog = 'responses.log';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('/var/www/opinana'));

app.post('/answer', function(request, response) {
	const data = request.body;
	var ip;
	if (request.headers['x-forwarded-for']) {
    	ip = request.headers['x-forwarded-for'].split(",")[0];
	} else if (request.connection && request.connection.remoteAddress) {
    	ip = request.connection.remoteAddress;
	} else {
    	ip = request.ip;
	}
	console.log("client IP is *********************" + ip);
	console.log("received data:", data);
  	data.remoteIP = ip;
	const datetimeStamp = new Date();
	data.timestamp = serverutils.sqlDateTime(datetimeStamp);
	var logString = ""
	response.redirect("/answer.html");
	var logString = JSON.stringify(data) + "\n";
	const logFilename = path.join(rootPath, responseLog);
	fs.appendFile(logFilename, logString, function (err) {
	  if (err) return console.log(err);
	  console.log('Updated', logFilename);
	});
	// also update the sqlite db
	
  });


app.get('/', (req, res) => {
  res.redirect('/index.html');
  //res.send('Hello World!<br/>This is Opinana.')
});

app.listen(port, () => {
  console.log(`opinana is listening on http://localhost:${port}`)
});

