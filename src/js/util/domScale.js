class DomScale {
  constructor(parent, children) {
    this.$parent = document.querySelector(parent);
    this.$children = document.querySelector(children);

    window.addEventListener("load", () => {
      this.setParentRatio(this.$parent);
      this.setChilrenRatio(this.$children);
    });
  }

  setParentRatio(parent) {
    const { clientWidth: width, clientHeight: height } = parent;
    this.parentRatio = width / height;
  }

  setChilrenRatio(children) {
    const { clientWidth: width, clientHeight: height } = children;
    this.childrenRatio = width / height;
  }

  setScale() {
    this.setParentRatio(this.$parent);
    console.log(this.$parent.clientWidth, this.$children.clientWidth);
    if (this.parentRatio < this.childrenRatio) {
      const scale =
        (this.$parent.clientWidth - 30) / this.$children.clientWidth;
      this.$children.style.transform = `scale(${scale < 1 ? scale : 1})`;
    } else {
      const scale =
        (this.$parent.clientHeight - 30) / this.$children.clientHeight;
      this.$children.style.transform = `scale(${scale < 1 ? scale : 1})`;
    }
  }
}

export default DomScale;
