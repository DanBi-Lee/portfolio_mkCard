import CardDom from "./cardDom";
import TabMenu from "./tabMenu";
import UploadImg from "./uploadImg";
import Throttling from "./util/throttling";
import CardDecoration from "./cardDecoration";
import CardText from "./cardText";

const throttling = new Throttling();

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
    decoration: {
      card_img: {
        filter: "",
      },
      bg_color: {
        "background-color": "#000000",
        opacity: 0.6,
      },
      blend_layer: {
        "mix-blend-mode": "",
        "background-color": "#000000",
        opacity: 0,
      },
    },
  };

  constructor() {
    this.init();
  }

  init = () => {
    this.setData(this.imageData);
    this.handlingText();
    this.handlingBGImage();
    this.handlingFont();
    this.handlingDeco();
  };

  cardDom = new CardDom(".mk_img_dom .card");

  setData = (data) => {
    console.log("데이터 세팅", data);
    this.imageData = data;
    this.cardDom.setData(data);
  };

  handlingText = () => {
    const cardText = new CardText(".text_box form");
    cardText.$target.addEventListener(
      "input",
      (e) => {
        throttling.throttle(() => {
          cardText.handlingInputEvent(e);
          this._setText(cardText.textState);
        });
      },
      500
    );
    cardText.$target.addEventListener("click", (e) => {
      cardText.handlingResetEvent(e);
      this._setText(cardText.textState);
    });
  };

  handlingBGImage = () => {
    const $searchResult = document.querySelector(".contents_imgbox");
    $searchResult.addEventListener("click", this._selectImg);

    const uploadImg = new UploadImg("#uploadImgfile");
    uploadImg.handlingUpload(this._setImg);
  };

  handlingDeco = () => {
    const decoration = new CardDecoration(".decoration_box");
    decoration.$decorationBox.addEventListener("input", (e) => {
      throttling.throttle(() => {
        decoration.handlingInputEvent(e);
        this._setDeco(decoration.decorationState);
      }, 500);
    });
    decoration.$decorationBox.addEventListener("click", (e) => {
      decoration.handlingResetEvent(e);
      this._setDeco(decoration.decorationState);
    });
  };

  _setText = (text) => {
    const data = {
      ...this.imageData,
      text,
    };
    this.setData(data);
  };

  _setDeco = (decoData) => {
    const data = {
      ...this.imageData,
      decoration: decoData,
    };
    this.setData(data);
  };

  _setImg = (imgURL) => {
    const data = {
      ...this.imageData,
      img: imgURL,
    };
    this.setData(data);
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

  handlingFont = () => {
    const $fontBox = document.querySelector(".content_font");
    $fontBox.addEventListener("click", this.fontEvent);
  };

  fontEvent = (e) => {
    if (e.target.className !== "font-item") {
      return;
    }
    const $fontList = e.target.closest(".font_list");
    const list = [...$fontList.children];
    const index = list.indexOf(e.target.closest("li"));
    this._selectFont({ e, $fontList });
    this._activate(list, index);
  };

  _activate = new TabMenu().activate;

  _selectFont = ({ e, $fontList }) => {
    const type = $fontList.dataset.font;
    const font = e.target.dataset.font;
    const data = {
      ...this.imageData,
      font: {
        ...this.imageData.font,
        [type]: font,
      },
    };
    this.setData(data);
  };
}

export default DataToDom;
