var $boxs = $('[id$="Box"]');
var posArr = [];

$boxs.each(function(){
    posArr.push($(this).offset().top);
});

posArr.push( $boxs.last().offset().top + $boxs.last().outerHeight() );

$(window).on('scroll', function(){
    var scroll = $(this).scrollTop();

    // 스크롤 중 애니메이션
    $boxs.addClass('scrolling');
    clearTimeout(action);
    var action = setTimeout(function(){
        $boxs.removeClass('scrolling');
    }, 250);

    for(var i =0; i < posArr.length; i++){
        if( scroll >= posArr[i] && scroll < posArr[i+1] ){
            $boxs.removeClass('on');
            $boxs.eq(i).addClass('on');
        }
    }
});

$boxs.on('mousewheel', function(event, delta){
    event.preventDefault();

    var _this = $(this);
    var index = _this.index();

    if(delta > 0 && index !== 0 ){
        var prev_pos = $(this).prev().offset().top;
        $('html, body').stop().animate({scrollTop: prev_pos}, 1000, "easeOutBack");
    }else if(delta <= 0 && index !== $boxs.length-1 ){
        var next_pos = $(this).next().offset().top;
        $('html, body').stop().animate({scrollTop: next_pos}, 1000, "easeOutBack");
    }
});