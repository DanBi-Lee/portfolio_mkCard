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
      main : '',
      sub : ''
    },
    img : '',
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
    },
    img : {
      upload : '#uploadImgfile',
      search : $('#searchImg')
    }
  };

  var outputDom = {
    text : {
      main : '.title',
      sub : '.desc'
    },
    img : {
        upload : '.card_img'
    }
  }

  function bindingEvent(){
    changeText('main');
    changeText('sub');
    changeImg();
  }

  bindingEvent();

  function changeText(data){
    $(inputDom['text'][data]).on('focusout', function(){
    imageData['text'][data] = $(this).attr('value');
    //   $('#mkimageBox .card').find(outputDom['text'][data]).text(imageData['text'][data]);
    mkDom();
    render(card);
    });
  }

  function changeImg(){
    uploadFile('upload');
    searchImg('search');
  }

  function uploadFile(data){
    $(inputDom['img'][data]).on('change', function(e){
        var file = e.target.files[0];
        if(!file.type.match(/image.*/)){
            alert("이미지 파일만 올려주세요");
            return;
        }else{
            var reader = new FileReader();
            reader.onload = function(e) {
                imageData.img = e.target.result;
                // $(outputDom['img'][data]).css({
                //     backgroundImage : 'url(' + imageData.img + ')'
                // });
                mkDom();
                render(card);
            };
            reader.readAsDataURL(file);
        }
    });
}

function searchImg(data){
    inputDom['img'][data].siblings('button').on('click',function(e){
        e.preventDefault();
        console.log($(this));
        var _key = '17163984-867a8b6f54b9fd842905aca26';
        var _keyword = inputDom['img'][data].attr('value');
        var settings = {
            "url": "https://pixabay.com/api/?key=" + _key + "&q=" + _keyword + "&per_page=33",
            "method": "GET",
            "timeout": 0,
            "dataType" : "jsonp"
          };
          $.ajax(settings).done(function (response) {
            console.log(settings.url);
            if(response.total == 0){
                $('.contents_imgbox').find('p').text( _keyword + '에 대한 검색결과가 없습니다.');
            }else{
                $('.contents_imgbox').html('<ul>');
                $(response.hits).each(function(index, item){
                    var prev_img = item.previewURL;
                    var data_img = item.largeImageURL;
                    $('.contents_imgbox > ul').append(
                        $('<li>')
                            .append(
                                $('<button>')
                                    .css({
                                    backgroundImage : 'url(' + prev_img + ')'
                                    })
                                    .addClass('search_item')
                                    .attr('data-img', data_img)
                            )
                    );
                });
            }
          });
    });
    selectImg();
}

function selectImg(){
    $('.contents_imgbox').on('click','.search_item', function(e){
        e.preventDefault();
        imageData.img = $(this).attr('data-img');
        // $('.card_img').css({
        //     backgroundImage : 'url(' + imageData.img + ')'
        // });
        mkDom();
        render(card);
    });
}

function mkDom(){
    // 텍스트
    function text(data){
        $('#mkimageBox .card').find(outputDom['text'][data]).text(imageData['text'][data]);
    }
    text('main');
    text('sub');

    // 배경이미지
    function img(){
        $('.card_img').css({
            backgroundImage : 'url(' + imageData.img + ')'
        });
    }
    img();
}

})();

