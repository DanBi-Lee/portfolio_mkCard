import DataToDom from "./dataToDom";
import FontList from "./FontList";
import SearchImage from "./searchImage";
import TabMenu from "./tabMenu";

const optionTab = new TabMenu();
const fontTab = new TabMenu();
const fontList = new FontList();
const serachImg = new SearchImage(".search_img");
const mkDom = new DataToDom();

optionTab.init(".option");
fontTab.init(".font_box");

var $mkimageBox = $("#mkimageBox");

var posMkbox = $mkimageBox.offset().top;
$("html, body").stop().animate({ scrollTop: posMkbox }, 600, "easeOutBack");

function render(node) {
  return domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      $(".preview > img").attr("src", dataUrl);
    })
    .catch(function (error) {
      return console.error(error);
    });
}

var card = $(".card")[0];
performance.now();
// render(card);

$(".download").on("click", function () {
  render(card);
  domtoimage
    .toPng(card)
    .then(function (dataUrl) {
      saveAs(dataUrl, "pretty image.png");
    })
    .catch(function (error) {
      return console.error(error);
    });
});

var inputDom = {
  text: {
    main: "#inputMainText",
    sub: "#inputSubText",
  },
  img: {
    upload: "#uploadImgfile",
    search: $("#searchImg"),
  },
  font: {
    main: $(".main"),
    sub: $(".sub"),
  },
};

var outputDom = {
  text: {
    main: ".title",
    sub: ".desc",
  },
  img: {
    upload: ".card_img",
  },
  font: {
    main: ".title",
    sub: ".desc",
  },
};

//   function uploadFile(data) {
//     $(inputDom["img"][data]).on("change", function (e) {
//       var file = e.target.files[0];
//       if (!file.type.match(/image.*/)) {
//         alert("이미지 파일만 올려주세요");
//         return;
//       } else {
//       }
//     });
//   }

// searchImg("search");
