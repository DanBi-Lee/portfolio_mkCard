import DomScale from "./util/domScale";

class Preview {
  constructor() {
    this.init();
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
    window.addEventListener("resize", this.setScale);
  };
}

export default Preview;
