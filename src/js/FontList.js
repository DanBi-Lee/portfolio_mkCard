"use strict";

import "babel-polyfill";
import { getFontList } from "./api";

class FontList {
  constructor() {
    this.$fontBox = document.querySelector(".content_font");
    this.typeList = [...this.$fontBox.querySelectorAll(".font_list")];
    this.init();
  }

  init = async () => {
    const { fontList } = await getFontList();
    this.fontList = fontList;
    this.render();
  };

  render = () => {
    this.typeList.forEach((item) => {
      item.innerHTML = this.fontList
        .map(
          (font) => `
          <li>
            <button class="font-item" data-font=${font.code} style="font-family:${font.code}">
              ${font.name}
            </button>
          </li>
        `
        )
        .join("");
    });
  };
}

export default FontList;
