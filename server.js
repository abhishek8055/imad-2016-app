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
    var previous = data.previous;
    var next = data.next;
    
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
	    
	    #open{
	        margin-top:20px;
	   	    margin-bottom:20px;
	     	text-align:center;
    	}
    	
    	#fname{
            font-size: 30px;
            font-weight: bold;
            padding-top: 20px;
            color: teal;
     	}

	    #nname{
             padding-top: 22px;
             color: teal;
             font-weight: bold;
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
					    <li><a href="/content.html" id ="brand"><span class="glyphicon glyphicon-time"></span> Blog Category</a></li>                                                        
                    </ul>
                   <ul class="nav navbar-nav navbar-right">
				        <li><a href="http://abhishek8055.imad.hasura-app.io/geeks/Blog%20%7C%20Ruby%20on%20Rails" id ="brand">
				            <span class="glyphicon glyphicon-headphones"></span> Developers Blog</a>
				        </li>
				        <li>
				          <a href="http://abhishek8055.imad.hasura-app.io/technology/Blog%20%7C%20Improving%20IoT%20Security" id ="brand">
				              <span class="glyphicon glyphicon-wrench"></span> Tech Blogs
				          </a>
				         </li>
				        <li>
				            <a href="http://abhishek8055.imad.hasura-app.io/politics/Blog%20%7C%20Indus%20Waters%20Treaty" id ="brand">
				                <span class="glyphicon glyphicon-bullhorn"></span> Political Blogs
				            </a>
				        </li>
				        <li>
				            <a href="http://abhishek8055.imad.hasura-app.io/environment/Blog%20%7C%20Arctic%20news" id ="brand">
				                <span class="glyphicon glyphicon-tree-deciduous"></span> Environment Blogs
				            </a>
				        </li>
				        <li>
				        <a href="http://abhishek8055.imad.hasura-app.io/motivational/Blog%20%7C%20How%20to%20Improve%20Life" id ="brand">
				            <span class="glyphicon glyphicon-grain"></span> Motivational Blogs</a>
				        </li>			          
                    </ul>
                </div>
            </div>
        </nav>
		<div class="w3-container">
		    <div class="row">
		    	<div class="col-md-9 col-xs-12"><h2>${heading}</h2></div>
		    	<div class="col-md-3 col-xs-12" id="date">${date.toDateString()}</div>
		    </div>
            <h4>${description_one}</h4>
            <img src="/${image}" alt="${title}" class="w3-image" width="600" height="400">
			 <h4>${description_two}</h4>
        </div>
        <div id="open" class="row">
            <div class="col-md-6 col-xs-6">
	            <a type="button" class="btn btn-success" href="${previous}">Previous Blog</a>
	        </div>
	        <div class="col-md-6 col-xs-6">
	            <a type="button" class="btn btn-success" href="${next}">Next Blog</a>
	        </div>
	    </div>
		<div class="row footer">
		    <div class="col-md-4 col-xs-12" id="fname">
		    	<span>BlogSpot<span>
		    </div>

		    <div class="col-md-4 col-xs-12">
		        <div id="xoxo">
			        follow on:
			    </div>
		        <div id="follow">
			        <a href="https://www.facebook.com/d.abhishek03"><img src="/fb.png"></a>&nbsp;&nbsp;
			        <a href="https://www.linkedin.com/in/abhishek-dwivedi-a330a0b4"><img src="/li.png"></a>&nbsp;&nbsp;
			        <a href="https://plus.google.com/113900231296083878522"><img src="/gp.png"></a>
		        </div>
			    <div id="copy">
			        Copyright reserved @2016-17
			    </div>
		    </div>
		    <div class="col-md-4 col-xs-12" id="nname">
		    	<p><b>Abhishek Dwivedi</b></p>
		    	<p>Email id: abhishekd911@gmail.com</p>
		    </div>		
	    </div>
	    
	  </div>
      </body>
     </html>
    `;
    return htmlTemplate;
}

var pool = new Pool(config);

app.get('/geeks/:BlogName', function (req, res) {
  pool.query("SELECT * FROM geeks WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/geeks/:BlogName', function (req, res) {
  pool.query("SELECT * FROM geeks WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/technology/:BlogName', function (req, res) {
  pool.query("SELECT * FROM technology WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/environment/:BlogName', function (req, res) {
  pool.query("SELECT * FROM environment WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/politics/:BlogName', function (req, res) {
  pool.query("SELECT * FROM politics WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/motivational/:BlogName', function (req, res) {
  pool.query("SELECT * FROM motivational WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/bollywood/:BlogName', function (req, res) {
  pool.query("SELECT * FROM bollywood WHERE title = $1", [req.params.BlogName], function (err, result) {
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

app.get('/cat4.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat4.png'));
});

app.get('/cat5.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat5.png'));
});

app.get('/cat7.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat7.png'));
});

app.get('/cat8.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat8.png'));
});

app.get('/cat9.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat9.jpg'));
});

app.get('/cat11.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat11.png'));
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

app.get('/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
});

app.get('/li.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'li.png'));
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

app.get('/note.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'note.jpg'));
});

app.get('/trump.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'trump.jpg'));
});

app.get('/kejriwal.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kejriwal.jpg'));
});

app.get('/black.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'black.jpg'));
});

app.get('/force.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'force.jpg'));
});

app.get('/flipkart.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'flipkart.jpg'));
});

app.get('/indus.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indus.jpg'));
});

app.get('/router.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'router.jpg'));
});


app.get('/ins.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ins.jpg'));
});

app.get('/dear.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dear.jpg'));
});

app.get('/node.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'node.jpg'));
});

app.get('/ruby.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ruby.jpg'));
});

app.get('/iot.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'iot.jpg'));
});

app.get('/Laravel.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Laravel.jpg'));
});

app.get('/cat2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat2.png'));
});

app.get('/global.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'global.jpg'));
});

app.get('/sass.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sass.jpg'));
});

app.get('/insp1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'insp1.jpg'));
});

app.get('/insp2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'insp2.jpg'));
});

app.get('/insp3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'insp3.jpg'));
});

app.get('/cat3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cat3.png'));
});

app.get('/arctic.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'arctic.jpg'));
});

app.get('/up.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'up.jpg'));
});

app.get('/organic.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'organic.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
