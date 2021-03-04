"use strict";

import Debouncing from "./util/debouncing";

const debouncing = new Debouncing();

class WheelMotion {
  $body = document.querySelector("body");
  MIN_SIZE = 900;
  //   필요 util함수 : PC, 모바일 구분

  constructor(selector) {
    this.selector = selector;
    this.boxList = [...document.querySelectorAll(selector)];
    this.init();
  }

  init = () => {
    this.onMouseWheel();
  };

  onMouseWheel = () => {
    this.$body.addEventListener(
      "wheel",
      (e) => debouncing.debounce(this.motion.call(null, e), 200),
      { passive: false }
    );
  };

  motionCondition = (e) => {
    const isPC = window.innerWidth >= this.MIN_SIZE;
    const isOnSelector = !!e.target.closest(this.selector);
    return isPC && isOnSelector;
  };

  motion = (e) => {
    const condition = this.motionCondition(e);
    if (!condition) {
      return;
    }
    e.preventDefault();
    const index = this.boxList.indexOf(e.target.closest(this.selector));
    if (e.deltaY > 0 && index !== 0 && index !== this.boxList.length - 1) {
      this.boxList[index + 1].scrollIntoView({ behavior: "smooth" });
    } else if (e.deltaY < 0 && index !== 0) {
      this.boxList[index - 1].scrollIntoView({ behavior: "smooth" });
    }
  };
}

export default WheelMotion;
