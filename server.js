var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/content.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'content.html'));
});

app.get('/ui/blog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/bg2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bg2.jpg'));
});

app.get('/ui/bg3c.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bg3c.jpg'));
});

app.get('/ui/blog8.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog8.png'));
});

app.get('/ui/cover2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cover2.jpg'));
});


app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});

app.get('/ui/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
});

app.get('/ui/li.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'li.png'));
});

app.get('/ui/item1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'item1.jpg'));
});

app.get('/ui/item2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'item2.jpg'));
});

app.get('/ui/logo3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo3.png'));
});

app.get('/ui/me.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me.jpg'));
});

app.get('/ui/blog7.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog7.jpg'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
