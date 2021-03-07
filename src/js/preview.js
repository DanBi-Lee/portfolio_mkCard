import Debouncing from "./util/debouncing";
import DomScale from "./util/domScale";

const debouncing = new Debouncing();

class Preview {
  constructor() {
    window.addEventListener("load", () => {
      this.init();
    });
  }

  init = () => {
    this.setScale();
    this.handlingResize();
  };

  scale = new DomScale(".preview", ".mk_img_dom");

  setScale = () => {
    this.scale.setScale();
  };

  handlingResize = () => {
    window.addEventListener("resize", () =>
      debouncing.debounce(this.setScale, 200)
    );
  };
}

export default Preview;
