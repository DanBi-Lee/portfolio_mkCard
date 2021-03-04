"use strict";

import { saveAs } from "file-saver";
import DOMToImage from "./domToImage";
class Download {
  constructor(selector) {
    this.$downloadBtn = document.querySelector(selector);
    this.init();
  }

  init = () => {
    this.handlingDonwload();
  };

  domToImage = new DOMToImage(".card");

  isWorking = false;

  handlingDonwload = () => {
    this.$downloadBtn.addEventListener("click", this.bindingDownloadEvent);
  };

  bindingDownloadEvent = async () => {
    if (this.isWorking) {
      return;
    }
    this.isWorking = true;
    const imageData = await this.domToImage.render();
    this.saveFile(imageData);
    this.isWorking = false;
  };

  saveFile = (data) => {
    saveAs(data, "image.png");
  };
}

export default Download;
