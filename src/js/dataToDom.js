import CardDom from "./cardDom";

class DataToDom {
  imageData = {
    text: {
      main: "메인 텍스트",
      sub: "서브 텍스트",
    },
    img: "",
    font: {
      main: "CookieRun-Regular",
      sub: "Godo",
    },
    // filter: {
    //   grayscale: 0,
    //   blur: 0,
    //   invert: 0,
    //   contrast: 1,
    //   sepia: 0,
    // },
    // filterBox: {
    //   opacity: 0.3,
    //   color: "#ffffff",
    // },
  };

  constructor() {
    this.init();
  }

  init = () => {
    this.setData(this.imageData);
    this.handlingText();
    this.handlingBGImage();
  };

  cardDom = new CardDom(".mk_img_dom");

  setData = (data) => {
    console.log("데이터 세팅", data);
    this.imageData = data;
    this.cardDom.setData(data);
  };

  handlingText = () => {
    const $textForm = document.querySelector(".text_box form");
    const event = (e) => {
      if (e.target.nodeName !== "INPUT") {
        return;
      }
      const data = {
        ...this.imageData,
        text: {
          ...this.imageData.text,
          [`${e.target.dataset.text}`]: e.target.value,
        },
      };
      this.setData(data);
    };
    $textForm.addEventListener("keyup", event);
  };

  handlingBGImage = () => {
    const $searchResult = document.querySelector(".contents_imgbox");
    $searchResult.addEventListener("click", this._selectImg);
  };

  _selectImg = (e) => {
    if (e.target.className !== "search_item") {
      return;
    }
    const data = {
      ...this.imageData,
      img: e.target.dataset.img,
    };
    this.setData(data);
  };
}

export default DataToDom;
