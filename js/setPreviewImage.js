function init(){
    var $imgPreview = $('#imgPreview');
    var $mkImgDom = $('.mk_img_dom');
    var imgDomHeight = 400;

    function setPreviewImage(){
        var previewHeight = parseInt($imgPreview.css('height'));
        var scale = previewHeight / imgDomHeight;
        console.log('test');

        $mkImgDom.css({'transform' : 'scale(' + scale + ')'});
    }
    
    $(window).load(setPreviewImage);
    $(window).on('resize', setPreviewImage);
}

init();