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

(function(){
  var imageData = {
    text : {
      main : '메인 텍스트 예시입니다',
      sub : '서브 텍스트 예시입니다'
    },
    img : 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    font : {
      main : 'CookieRun-Regular',
      sub : 'Godo'
    },
    filter : {
      grayscale : 0,
      blur : 0,
      invert : 0,
      contrast: 1,
      sepia : 0
    },
    filterBox : {
      opacity : 0.3,
      color : '#ffffff'
    }
  };

  var inputDom = {
    text : {
      main : '#inputMainText',
      sub : '#inputSubText'
    }
  };

  var outputDom = {
    text : {
      main : '.title',
      sub : '.desc'
    }
  }

  function bindingEvent(){
    changeText('main');
    changeText('sub');
  }

  bindingEvent();

  function changeText(data){
    $(inputDom['text'][data]).on('focusout', function(){
      imageData['text'][data] = $(this).attr('value');
      $('#mkimageBox .card').find(outputDom['text'][data]).text(imageData['text'][data]);
      render(card);
    });
  }



})();

