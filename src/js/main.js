import MyParallex from "./myParallex";

const myParallex = new MyParallex('[id$="Box"]', 300);

// $boxList.on('mousewheel', function(event, delta){
//     event.preventDefault();

//     var _this = $(this);
//     var index = _this.index();

//     if(delta > 0 && index !== 0 ){
//         var prev_pos = $(this).prev().offset().top;
//         $('html, body').stop().animate({scrollTop: prev_pos}, 1000, "easeOutBack");
//     }else if(delta <= 0 && index !== $boxList.length-1 ){
//         var next_pos = $(this).next().offset().top;
//         $('html, body').stop().animate({scrollTop: next_pos}, 1000, "easeOutBack");
//     }
// });
