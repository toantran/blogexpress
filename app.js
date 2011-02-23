/**
 * @author toantran
 */
var express = require('express'), 
	app= express.createServer(),
	ArticleProvider = require('./articleprovider-memory.js').provider;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyDecoder());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.set('root', __dirname);
});


app.configure('development', function() {
	app.use(express.errorHandler({
		dumpException: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider();

app.get('/', function(req, res) {
	var scope = this;
	
	articleProvider.findAll( function(error, data) {
		res.send(data);
	}); 
});

app.listen(3000);

console.log('App running on port 3000');
