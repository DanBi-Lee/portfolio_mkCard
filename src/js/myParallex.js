"use strict";

import Debouncing from "./util/debouncing";
import Throttling from "./util/throttling";

const throttling = new Throttling();
const debouncing = new Debouncing();

class MyParallex {
  constructor(selector, range) {
    this.boxList = [...document.querySelectorAll(selector)];
    this.$body = document.querySelector("body");
    this.posRange = range;
    this.positionList = [];

    window.addEventListener("load", () => {
      this.positionList = this._setPositionList(this.boxList);
    });
    this.init();
  }

  _setPositionList = (array) => {
    const list = array.map((el) => el.offsetTop);
    list.push(
      array[array.length - 1].offsetTop +
        array[array.length - 1].clientHeight +
        this.posRange
    );
    console.log(list);
    return list;
  };

  init = () => {
    this._handlingResize();
    this._handlingScroll();
  };

  _handlingResize() {
    const setPositionList = () => {
      console.log("실행");
      setTimeout(() => {
        this.positionList = this._setPositionList(this.boxList);
      }, 1000);
    };
    window.addEventListener("resize", () =>
      debouncing.debounce(setPositionList)
    );
  }

  _handlingScroll = () => {
    window.addEventListener("scroll", (e) => {
      throttling.throttle(this._scrollAnimation, 200);
    });
  };

  _scrollAnimation = () => {
    const scrollTop = window.scrollY;
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
          document.querySelector("#mainBox .pic").classList.add("on");
        } else {
          document.querySelector("#mainBox .pic").classList.remove("on");
        }
      }
    }
  };
}

export default MyParallex;
