/**
 * @author toantran
 */
var express = require('express'), app= express.createServer();

/*app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyDecoder());
  app.use(app.router);
  app.use(app.staticProvider(__dirname + '/public'));
  app.set('root', __dirname);
});

*/

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpException: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.send('hello world');
});

app.listen(3000);

console.log('App running on port 3000');
