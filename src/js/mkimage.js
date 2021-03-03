import TabMenu from "./tabMenu";

const optionTab = new TabMenu(".option");
const fontTab = new TabMenu(".font_box");

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

(function () {
  var imageData = {
    text: {
      main: "",
      sub: "",
    },
    img: "",
    font: {
      main: "CookieRun-Regular",
      sub: "Godo",
    },
    filter: {
      grayscale: 0,
      blur: 0,
      invert: 0,
      contrast: 1,
      sepia: 0,
    },
    filterBox: {
      opacity: 0.3,
      color: "#ffffff",
    },
  };

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

  function bindingEvent() {
    changeText("main");
    changeText("sub");
    changeImg();
    mkFontDom();
  }

  bindingEvent();

  function changeText(data) {
    $(inputDom["text"][data]).on("focusout", function () {
      imageData["text"][data] = $(this).attr("value");
      //   $('#mkimageBox .card').find(outputDom['text'][data]).text(imageData['text'][data]);
      mkDom();
    });
  }

  function changeImg() {
    uploadFile("upload");
    searchImg("search");
  }

  function uploadFile(data) {
    $(inputDom["img"][data]).on("change", function (e) {
      var file = e.target.files[0];
      if (!file.type.match(/image.*/)) {
        alert("이미지 파일만 올려주세요");
        return;
      } else {
        var reader = new FileReader();
        reader.onload = function (e) {
          imageData.img = e.target.result;
          // $(outputDom['img'][data]).css({
          //     backgroundImage : 'url(' + imageData.img + ')'
          // });
          mkDom();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function searchImg(data) {
    inputDom["img"][data].siblings("button").on("click", function (e) {
      e.preventDefault();
      console.log($(this));
      var _key = "17163984-867a8b6f54b9fd842905aca26";
      var _keyword = inputDom["img"][data].attr("value");
      var settings = {
        url:
          "https://pixabay.com/api/?key=" +
          _key +
          "&q=" +
          _keyword +
          "&per_page=33",
        method: "GET",
        timeout: 0,
        dataType: "jsonp",
      };
      $.ajax(settings).done(function (response) {
        console.log(settings.url);
        if (response.total == 0) {
          $(".contents_imgbox")
            .find("p")
            .text(_keyword + "에 대한 검색결과가 없습니다.");
        } else {
          $(".contents_imgbox").html("<ul>");
          $(response.hits).each(function (index, item) {
            var prev_img = item.previewURL;
            var data_img = item.largeImageURL;
            $(".contents_imgbox > ul").append(
              $("<li>").append(
                $("<button>")
                  .css({
                    backgroundImage: "url(" + prev_img + ")",
                  })
                  .addClass("search_item")
                  .attr("data-img", data_img)
              )
            );
          });
        }
      });
    });
    selectImg();
  }

  function selectImg() {
    $(".contents_imgbox").on("click", ".search_item", function (e) {
      e.preventDefault();
      imageData.img = $(this).attr("data-img");
      console.log($(this));
      // $('.card_img').css({
      //     backgroundImage : 'url(' + imageData.img + ')'
      // });
      mkDom();
    });
  }

  function mkDom() {
    // 텍스트
    function text(data) {
      $("#mkimageBox .card")
        .find(outputDom["text"][data])
        .text(imageData["text"][data]);
    }
    text("main");
    text("sub");

    // 배경이미지
    function img() {
      $(".card_img").css({
        backgroundImage: "url(" + imageData.img + ")",
      });
    }
    img();

    // 폰트
    function font(data) {
      $("#mkimageBox .card")
        .find(outputDom["font"][data])
        .css("font-family", imageData["font"][data]);
    }

    font("main");
    font("sub");
  }

  function mkFontDom() {
    $(fontList.fontlist).each(function (index, item) {
      var fontFamily = item.code;
      var fontName = item.name;
      $(".content_font")
        .find("ul")
        .append(
          $("<li>")
            .addClass("items")
            .append($("<button>").text(fontName))
            .attr("data-font", fontFamily)
            .css("font-family", fontFamily)
        );
    });

    changeFont("main");
    changeFont("sub");
  }

  function changeFont(data) {
    console.log(inputDom["font"][data]);
    inputDom["font"][data].on("click", ".font_list > li", function (e) {
      e.preventDefault();
      imageData["font"][data] = $(this).attr("data-font");
      console.log(imageData["font"][data]);
      mkDom();
    });
  }
})();
