"use strict";

import Debouncing from "./util/debouncing";
import Animation from "./util/animation";
import "babel-polyfill";

const debouncing = new Debouncing();
const animation = new Animation(window);

class WheelMotion {
  $body = document.querySelector("body");
  MIN_SIZE = 900;
  //   필요 util함수 : PC, 모바일 구분
  enableActive = true;

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

    const options = {
      duration: 1000,
      prop: "scroll",
      value: null,
    };

    const index = this.boxList.indexOf(e.target.closest(this.selector));
    if (e.deltaY > 0 && index !== 0 && index !== this.boxList.length - 1) {
      this.animation({ ...options, value: this.boxList[index + 1].offsetTop });
    } else if (e.deltaY < 0 && index > 1) {
      this.animation({ ...options, value: this.boxList[index - 1].offsetTop });
    }
  };

  animation = async (options) => {
    if (!this.enableActive) {
      return;
    }
    this.enableActive = false;
    await animation.animation(options);
    this.enableActive = true;
  };
}

export default WheelMotion;
