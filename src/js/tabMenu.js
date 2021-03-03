class TabMenu {
  init = (selsector) => {
    this.$tabBox = document.querySelector(selsector);
    this.$btnBox = this.$tabBox.querySelector(".btn_box");
    this.$contentBox = this.$tabBox.querySelector(".content_box");
    this.buttonList = [...this.$btnBox.children];
    this.contentList = [...this.$contentBox.children];
    this.handlingTabButton();
  };

  handlingTabButton = () => {
    const event = (e) => {
      if (!e.target.closest(".btn_box li")) {
        return;
      }
      const index = this.buttonList.indexOf(e.target.closest("li"));

      this.activate(this.buttonList, index);
      this.activate(this.contentList, index);
    };
    this.$btnBox.addEventListener("click", event);
  };

  activate(array, index) {
    array.forEach((item) => {
      item.classList.remove("on");
    });
    array[index].classList.add("on");
  }
}

export default TabMenu;
