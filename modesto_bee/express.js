var mysql = require('mysql');
var nunjucks  = require('nunjucks');
var express   = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app       = express();

app.use(session({secret:'tanveer'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});
app.get('/', function(req, res) {
	var connection = mysql.createConnection({
	  multipleStatements: true,	
	  host     : 'localhost',
	  user     : 'root',
	  password : 'wipro@123',
	  database :'modbee'
	});
	
	connection.connect();
	connection.query('select * from main_menu ;SELECT * from full_menu; select * from sub_menu;', function(err, result, fields){
		if(err){
			throw err;
		}
		else{
				console.log(result[0]);       
				console.log(result[1]);       
				console.log(result[2]);       
		  res.render('main_page.html',{
			main_menu : result[0],
			full_menu : result[1],
			sub_menu : result[2]
			 });
  }
});
});
	
app.listen(8080, function() {
	console.log("Listening on 8080");
});