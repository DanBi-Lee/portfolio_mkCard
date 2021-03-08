import "babel-polyfill";

class Animation {
  options = {
    duration: 1000,
    prop: "margin-left",
    value: 200,
  };

  constructor($target) {
    this.$target = $target;
  }

  animation = (options) => {
    return new Promise((resolve) => {
      this.options = { ...this.options, ...options };
      this.start = performance.now();
      const current_value = this.$target.scrollY * 1;
      requestAnimationFrame(move);

      const self = this;

      function move(time) {
        const currentTime = time - self.start;
        let progress = currentTime / self.options.duration;

        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        if (progress < 1) {
          self.timer = requestAnimationFrame(move);
        } else {
          resolve(cancelAnimationFrame(self.timer));
          return;
        }

        const value =
          current_value +
          (self.options.value - current_value) * self.easeOutBack(progress);

        self.$target[self.options.prop](0, value);
      }
    });
  };

  easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    const { pow } = Math;

    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  }
}

export default Animation;
