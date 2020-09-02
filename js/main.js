var $boxList = $('[id$="Box"]');
var positionList;
var posRange = 100;


function setPositionList(){
    positionList = [];
    $boxList.each(function(){
        positionList.push($(this).offset().top);
    });
    
    positionList.push( $boxList.last().offset().top + $boxList.last().outerHeight() + posRange );
}

setPositionList();

$(window).on('resize', setPositionList);

$(window).on('scroll', function(){
    var scroll = $(this).scrollTop();

    // 스크롤 중 애니메이션
    $boxList.addClass('scrolling');
    clearTimeout(action);
    var action = setTimeout(function(){
        $boxList.removeClass('scrolling');
    }, 250);

    for(var i =0; i < positionList.length; i++){
        if( scroll >= positionList[i] - posRange && scroll < positionList[i+1] - posRange ){
            $boxList.removeClass('on');
            $boxList.eq(i).addClass('on');

            if($('#introduceBox').hasClass('on')){
                $('#mainBox').find('.pic').addClass('on');
            }else{
                $('#mainBox').find('.pic').removeClass('on');
            }
        }
    }
});

$boxList.on('mousewheel', function(event, delta){
    event.preventDefault();

    var _this = $(this);
    var index = _this.index();

    if(delta > 0 && index !== 0 ){
        var prev_pos = $(this).prev().offset().top;
        $('html, body').stop().animate({scrollTop: prev_pos}, 1000, "easeOutBack");
    }else if(delta <= 0 && index !== $boxList.length-1 ){
        var next_pos = $(this).next().offset().top;
        $('html, body').stop().animate({scrollTop: next_pos}, 1000, "easeOutBack");
    }
});