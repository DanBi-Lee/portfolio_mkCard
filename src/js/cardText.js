"use strict";

class CardText {
  textState = {
    main: "메인 텍스트",
    sub: "서브 텍스트",
  };

  constructor(selector) {
    this.$target = document.querySelector(selector);
  }

  onChange = () => {
    this.$target.addEventListener("input", this.handlingInputEvent);
  };

  handlingInputEvent = (e) => {
    const target = e.target;

    if (target.nodeName !== "INPUT") {
      return;
    }

    this.setData({ [target.dataset.text]: target.value });
  };

  setData = (nextData) => {
    this.textState = { ...this.textState, ...nextData };
  };
}

export default CardText;
