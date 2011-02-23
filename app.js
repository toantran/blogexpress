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
	res.send('Welcome to my articles', 200);
});

app.get('/articles/:id?', function(req, res, next) {
	var id = req.params.id;
	
	console.log('id=', id);
	if (id) {
		articleProvider.findById( id, function(error, article) {
			res.send('Article: ' + article, 200);
		});
	} else {
		next(req, res);
	}
});

app.get('/articles', function(req, res) {
	console.log('articles');
	articleProvider.findAll( function(error, data) {
		res.send(data);
	}); 
});

app.listen(3000);

console.log('App running on port 3000');
