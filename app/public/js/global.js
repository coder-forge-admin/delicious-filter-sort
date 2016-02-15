$(document).ready(function(){

  // get list of tags
  $.get('/api/tags', function(json){

    $(json).each(function(i, tag){
      $('#containerFilter').append('<div class="filter" data-filter="'+tag.class+'">'+tag.tag+'</div>');
    });
  });
});
