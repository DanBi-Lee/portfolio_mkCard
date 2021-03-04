"use strict";

class Throttling {
  timer = null;
  throttle = (callback, delay = 50) => {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = null;
        callback();
      }, delay);
    }
  };
}

export default Throttling;
