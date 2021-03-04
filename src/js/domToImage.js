"use strict";

import domtoimage from "dom-to-image";

class DOMToImage {
  constructor(targetDom, resultImg) {
    this.$card = document.querySelector(targetDom);
    this.$img = document.querySelector(resultImg);
  }

  render = async () => {
    try {
      const dataUrl = await domtoimage.toPng(this.$card);
      var img = new Image();
      img.src = dataUrl;
      this.$img.setAttribute("src", dataUrl);
    } catch (error) {
      console.error("oops, something went wrong!", error);
    }
  };
}

export default DOMToImage;
