"use strict"

var config  = require('../../config')
  ,http     = require('http')

/**
 * Delicious API
 * @constructor
 */
function API(){}

/**
 * Router callback for tags.
 * @param  {Request}   req  Express request object.
 * @param  {Response}   res  Express response object.
 * @param  {Function} next Express middleware callback.
 */
API.prototype.tags = function APITags(req, res, next){

  // http options
  var options = {
    host: 'feeds.delicious.com',
    path: '/v2/json/'+config.username
  }

  // http callback.
  var callback = function(response){

    var json = ''

    response.on('data', function(chunk){
      json += chunk
    })

    response.on('end', function(){
      res.json(JSON.parse(json))
    })
  }

  //make request
  http.request(options, callback).end()
}

module.exports = new API()
