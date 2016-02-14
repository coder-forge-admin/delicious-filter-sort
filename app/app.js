var express = require('express')
var app = express()
var http = require('http')
var httpServer = http.Server(app)

app.use(express.static(__dirname+'/public'))

app.get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html')
})
app.listen(3000)
