class CardDom {
  data = null;

  constructor(selector) {
    this.$cardWrap = document.querySelector(selector);
  }

  setData = (data) => {
    this.data = data;
    this.render();
  };

  render = () => {
    if (!this.data) {
      return;
    }
    this.$cardWrap.innerHTML = `
        <div class="card">
            <div class="card_img">
                <div class="bg_color"></div>
            </div>
            <div class="card_content">
                <div class="text">
                    <strong class="title">${this.data.text.main}</strong>
                    <p class="desc">${this.data.text.sub}</p>
                </div>
            </div>
        </div>
      `;

    this.$mainText = document.querySelector(".title");
    this.$subText = document.querySelector(".desc");
    this.$cardImg = document.querySelector(".card_img");
    this.setFontInDom("main");
    this.setFontInDom("sub");
    this.setBGImage();
  };

  setFontInDom = (text) => {
    this[`$${text}Text`].style["font-family"] = this.data.font[text];
  };

  setBGImage = () => {
    this.$cardImg.style["background-image"] = `url(${this.data.img})`;
  };
}

export default CardDom;
