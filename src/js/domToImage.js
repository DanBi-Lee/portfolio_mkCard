"use strict";

import domtoimage from "dom-to-image";

class DOMToImage {
  constructor(targetDom) {
    this.$card = document.querySelector(targetDom);
  }

  render = async () => {
    try {
      const dataUrl = await domtoimage.toPng(this.$card);
      var img = new Image();
      img.src = dataUrl;
      return dataUrl;
    } catch (error) {
      console.error("oops, something went wrong!", error);
    }
  };
}

export default DOMToImage;
