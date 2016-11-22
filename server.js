var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'abhishek8055',
    database: 'abhishek8055',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var description_one = data.description_one;
    var description_two = data.description_two;
    var image = data.image;
    
    var htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <title>${title}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
      <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
      <style>	
        .header{
          margin-top:20px;
	      text-align:center;
	      font-size:25px;
		  font-weight:bold;
	    }
	
	    .pope{
	      text-align:center;
		  font-size:15px;
	      margin-bottom:30px;
	    }
	
	    .navbar-inverse{
	      margin-bottom:-1px;
		  background-color: orchid;
		  border-color:white;
	    }
	
 	    #brand{
	      color:white;
	    }

	    #date{
		  text-align: right;
          padding-top: 20px;
         font-weight: bold;
	    }
	
	    .footer{
	      background-color: #262626;
          text-align: center;
          color: white;
          padding-top: 10px;
          padding-bottom: 10px;
	 	  margin-bottom:5px;
		  margin-top:10px;
	    }
	
	    #xoxo{
	      padding-bottom: 5px;
          font-weight: bold;
           color:whitesmoke;
	    }
	
	    #copy{
	      padding-top: 10px;
          font-weight: bold;
          color:whitesmoke;
	    }
	
      </style>
      </head>
      <body>
      <div class="container">
	    <div>
		    <div  class="header">BlogSpot</div>
		    <div class="pope">Generate! Disseminate! Preserve!</div>
		</div>	
		<nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li><a href="/" id ="brand"><span class="glyphicon glyphicon-home"></span></a></li>
					    <li><a href="content.html" id ="brand"><span class="glyphicon glyphicon-time"></span> Recent Blogs</a></li>                                                        
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
				        <li><a href="http://brainblogger.com/" id ="brand"><span class="glyphicon glyphicon-grain"></span> Popular Blogs</a></li>
				        <li><a href="https://indianbloggers.org/" id ="brand">Featured Indian Bloggers</a></li>
				        <li><a href="https://indianbloggers.org/blogs/technology/" id ="brand">Technology Blogs</a></li>
				        <li><a href="https://indianbloggers.org/blogs/travel/" id ="brand">Travel Blogs</a></li>
				        <li><a href="https://indianbloggers.org/youtube/fashion/" id ="brand">Fashion Blogs</a></li>			          
                    </ul>
                </div>
            </div>
        </nav>
		<div class="w3-container">
		    <div class="row">
		    	<div class="col-md-6 col-xs-12"><h2>${heading}</h2></div>
		    	<div class="col-md-6 col-xs-12" id="date">${date.toDateString()}</div>
		    </div>
            <h4>${description_one}</h4>
            <img src="/${image}" alt="${title}" class="w3-image" width="600" height="400">
			 <h4>${description_two}</h4>
        </div>
		<div class="footer">
		    <div id="xoxo">
			    follow on:
			</div>
		    <div id="follow">
			    <a href="https://www.facebook.com/d.abhishek03"><img src="/ui/fb.png"></a>&nbsp;&nbsp;
			    <a href="https://www.linkedin.com/in/abhishek-dwivedi-a330a0b4"><img src="/ui/li.png"></a>&nbsp;&nbsp;
			    <a href="https://plus.google.com/113900231296083878522"><img src="/ui/gp.png"></a>
		    </div>
			<div id="copy">
			    Copyright reserved @2016-17
			</div>
		</div>		
	  </div>
      </body>
     </html>
    `;
    return htmlTemplate;
}

var pool = new Pool(config);

app.get('/articles/:BlogName', function (req, res) {
  pool.query("SELECT * FROM articles WHERE title = $1", [req.params.BlogName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/content.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'content.html'));
});

app.get('/blog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

app.get('/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/bg2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bg2.jpg'));
});

app.get('/blog9.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog9.jpg'));
});

app.get('/blog8.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog8.png'));
});

app.get('/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});

app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});

app.get('/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
});

app.get('/ui/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
});

app.get('/li.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'li.png'));
});

app.get('/ui/li.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'li.png'));
});

app.get('/item1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'item1.jpg'));
});

app.get('/item2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'item2.jpg'));
});

app.get('/logo3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo3.png'));
});

app.get('/me.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me.jpg'));
});

app.get('/me2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me2.jpg'));
});

app.get('/blog7.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog7.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
