var express = require('express');
var app = express();
var jsforce = require('jsforce');
var url = require('url');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/login', function (req, res) {
	var url_parts = url.parse(req.url, true),
		query = url_parts.query,
		password = req.query.password,
		username = req.query.username;
	var conn = new jsforce.Connection({
	  // you can change loginUrl to connect to sandbox or prerelease env.
	  loginUrl : req.param('url') || 'https://test.salesforce.com'
	});
	var accessToken = '',
		instanceUrl = '',
		response = {};
	conn.login(username, password, function(err, userInfo) {
	  if (err) { 
		res.send(JSON.stringify({message: 'failure'}));
		return console.error(err);
	  }
	  // Now you can get the access token and instance URL information.
	  // Save them to establish connection next time.
	  console.log('conn.accessToken' + conn.accessToken);
	//  console.log(conn);
	  accessToken = conn.accessToken;
	  console.log('conn.instanceUrl' + conn.instanceUrl);
	  // logged in user property
	  instanceUrl = conn.instanceUrl;
	  response = {
		accessToken: conn.accessToken,
		instanceUrl: conn.instanceUrl,
		userInfo: userInfo,
		message: 'success'
	  }
	  
	  console.log("User ID: " + userInfo.id);
	  console.log("Org ID: " + userInfo.organizationId);
	  // ...
	  res.send(JSON.stringify(response));
	});
	//res.send(JSON.stringify(response));
});

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 8080);


