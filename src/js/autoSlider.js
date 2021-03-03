"use strict";

class AutoSlider {
  constructor(selector, marginLeft = 0) {
    this.$imageBox = document.querySelector(selector);
    this.$imageLi = this.$imageBox.querySelector("li");
    this.image_width = parseInt(window.getComputedStyle(this.$imageLi).width);
    this.left = marginLeft;

    this.init();
  }

  init = () => {
    this.animation();
    this.handlingAnimation();
  };

  animation = () => {
    this.timer = requestAnimationFrame(this.move);
  };

  stopAnimation = () => {
    window.cancelAnimationFrame(this.timer);
  };

  move = () => {
    if (this.left > this.image_width) {
      this.left = 0;
      this.$imageBox.appendChild([...this.$imageBox.querySelectorAll("li")][0]);
    }

    this.left += 1;
    this.$imageBox.style.left = `${-this.left}px`;

    this.animation();
  };

  handlingAnimation = () => {
    this.$imageBox.addEventListener("mouseenter", this.stopAnimation);
    this.$imageBox.addEventListener("mouseleave", this.animation);
  };
}

export default AutoSlider;
