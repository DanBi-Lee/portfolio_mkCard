"use strict";

class MyParallex {
  constructor(selector, range) {
    this.boxList = [...document.querySelectorAll(selector)];
    this.$body = document.querySelector("body");
    this.posRange = range;
    this.positionList = this._setPositionList(this.boxList);

    this.init();
  }

  _setPositionList = (array) => {
    const list = array.map((el) => el.offsetTop);
    list.push(
      array[array.length - 1].offsetTop +
        array[array.length - 1].clientHeight +
        this.posRange
    );
    return list;
  };

  init() {
    this._handlingResize();
    this._handlingScroll();
  }

  _handlingResize() {
    const setPositionList = () => {
      setTimeout(() => {
        this.positionList = this._setPositionList(this.boxList);
      }, 1000);
    };
    window.addEventListener("resize", setPositionList);
  }

  _handlingScroll() {
    window.addEventListener("scroll", this._scrollAnimation);
  }

  _scrollAnimation = (e) => {
    const scrollTop = e.currentTarget.scrollY;
    this._scrollingEffect();
    this._activate(scrollTop);
  };

  _scrollAnimationTimer = null;

  _scrollingEffect = () => {
    this.$body.classList.add("scrolling");
    if (this._scrollAnimationTimer) {
      clearTimeout(this._scrollAnimationTimer);
    }
    this._scrollAnimationTimer = setTimeout(() => {
      this.$body.classList.remove("scrolling");
    }, 300);
  };

  _activate = (scrollTop) => {
    console.log(this.positionList);
    for (let index = 0; index < this.positionList.length; index++) {
      if (
        scrollTop >= this.positionList[index] - this.posRange &&
        scrollTop < this.positionList[index + 1] - this.posRange
      ) {
        this.boxList.forEach((item) => {
          item.classList.remove("on");
        });
        this.boxList[index].classList.add("on");

        if (this.boxList[index].id === "introduceBox") {
          console.log(this.boxList[index - 1].querySelector(".pic"));
          document.querySelector("#mainBox .pic").classList.add("on");
        } else {
          document.querySelector("#mainBox .pic").classList.remove("on");
        }
      }
    }
  };
}

export default MyParallex;
