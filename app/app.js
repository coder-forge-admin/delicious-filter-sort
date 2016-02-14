var express = require('express')
  ,app = express()
  ,http = require('http')
  ,httpServer = http.Server(app)

var api = require('./lib/api')

app.use(express.static(__dirname+'/public'))

// server root
app.get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html')
})

// get list of tags
app.get('/api/tags', api.tags)

app.listen(3000)
