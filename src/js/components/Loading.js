class Loading {
  isloading = false;

  constructor($target) {
    this.$target = $target || document.querySelector("body");
    this.$modal = document.createElement("div");
    this.$modal.className = "modal";
    this.$target.appendChild(this.$modal);

    this.render();
  }

  setState = (isLoading) => {
    this.render(isLoading);
  };

  close = () => {
    this.$modal.style.display = "none";
  };

  open = () => {
    this.$modal.style.display = "flex";
  };

  render = (isLoading) => {
    this.$modal.innerHTML = `
        <div class="dialog">
            다운로드 중...
        </div>
    `;
    if (isLoading) {
      this.open();
    } else {
      this.close();
    }
  };
}

export default Loading;
