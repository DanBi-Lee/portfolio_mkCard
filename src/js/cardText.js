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

  onReset = () => {
    this.$target.addEventListener("clilck", this.handlingInputEvent);
  };

  handlingResetEvent = (e) => {
    const target = e.target;
    console.log("리셋~");

    if (target.type !== "reset") {
      return;
    }

    this.setData({
      main: "",
      sub: "",
    });
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
