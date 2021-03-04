"use strict";

class Debouncing {
  timer;

  debounce = (callback, delay = 200) => {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = setTimeout(callback, delay);
  };
}

export default Debouncing;
