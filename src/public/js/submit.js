$(function() {
  var btn = $(".btn");
  
  btn.on("click", function() {
    
    $(this).addClass('btn-progress');
    setTimeout(function() {
      btn.addClass('btn-fill')
    }, 500);
    
    setTimeout(function() {
      btn.removeClass('btn-fill')
    }, 4100);
    
    setTimeout(function() {
      btn.addClass('btn-complete')
    }, 4100);
  
  });
})