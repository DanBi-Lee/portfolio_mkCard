var $mkimageBox = $('#mkimageBox');
var posMkbox = $mkimageBox.offset().top;
$('html, body').stop().animate({scrollTop: posMkbox}, 600, "easeOutBack");

function render(node) {
    return domtoimage.toPng(node).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      $('.preview > img').attr('src', dataUrl);
    }).catch(function (error) {
      return console.error(error);
    });
};
  
var card = $('.card')[0];
performance.now();
render(card);

$('.download').on('click', function(){
  domtoimage.toPng(card).then(function (dataUrl){
    saveAs(dataUrl, "pretty image.png");
  }).catch(function (error) {
    return console.error(error);
  });
});

var $btnList = $mkimageBox.find('.step_list > li');
var $optionBox = $mkimageBox.find('.option_box > li');

$btnList.on('click', function(e){
  e.preventDefault();

  var $this = $(this);
  var index = $this.index();

  $optionBox.removeClass('on')
  $optionBox.eq(index).addClass('on');

  $btnList.removeClass('on');
  $this.addClass('on');
});

var imageData = {};
