function init(){
    var $imageBox = $('.box_img').find('ul');
    var $imageLi = $imageBox.find('li');
    var imageLi_width = parseInt($imageLi.css('width'));
    var marginLeft = 0;

    function move(){
        marginLeft += 2;
        if( marginLeft > imageLi_width ){
            $imageBox.children('li').first().appendTo($imageBox);
            marginLeft = 0;
        }
        $imageBox.css({'marginLeft' : -marginLeft + 'px'});
    }

    var timer = setInterval(move, 50);

    $imageBox.on('mouseleave', function(){
        timer = setInterval(move, 50);
    });

    $imageBox.on('mouseenter', function(){
        clearInterval(timer);
    });
}

init();