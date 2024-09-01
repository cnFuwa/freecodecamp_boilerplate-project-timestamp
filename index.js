// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on
                                             // 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({greeting: 'hello API'});
});

app.get('/api/', function (req, res) {
	let obj = new Date();
	if (obj.toString() === "Invalid Date") {
		res.json({error: "Invalid Date"});
	} else {
		const stamp = obj.valueOf();
		const utc = obj.toUTCString();
		res.json({unix: stamp, utc: utc})
	}
});

app.get('/api/:date_str', function (req, res) {
	const date_str = req.params.date_str;
	console.log(req.params.date);
	const reg = /\d{5,}/;
	if (reg.test(date_str)) {
		const stamp = parseInt(date_str);
		const utc = new Date(stamp).toUTCString();
		res.json({unix: stamp, utc: utc})
	} else {
		
		let obj = new Date(date_str);
		if (date_str === undefined) {
			obj = new Date();
		}
		if (obj.toString() === "Invalid Date") {
			res.json({error: "Invalid Date"});
		} else {
			const stamp = obj.valueOf();
			const utc = obj.toUTCString();
			res.json({unix: stamp, utc: utc})
		}
	}
});


// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
