var config    = require('../../config')
  ,http       = require('http')
  ,sanitizer  = require('sanitizer')

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

    var str = ''

    // build response from delicious
    response.on('data', function(chunk){
      str += chunk
    })

    // send json response to client
    response.on('end', function(){

      var jsonDel = JSON.parse(str),
        json = []

      console.log(jsonDel)
      /**
       * @link http://stackoverflow.com/questions/7627000/javascript-convert-string-to-safe-class-name-for-css
       */
      function makeSafeForCSS(name) {
        return name.replace(/[^a-z0-9]/g, function(s) {
          var c = s.charCodeAt(0);
          if (c == 32) return '-';
          if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
          return '__' + ('000' + c.toString(16)).slice(-4);
        });
      }

      if(jsonDel.length){
        jsonDel[0].t.forEach(function(tag){
          json.push({
            tag: tag,
            class: makeSafeForCSS(tag)
          })
        })
      }
      console.log(json)
      res.json(json)
    })
  }

  //make request
  http.request(options, callback).end()
}

module.exports = new API()
