"use strict";

import { saveAs } from "file-saver";
import DOMToImage from "./domToImage";
import Loading from "./components/Loading";

class Download {
  constructor(selector) {
    this.$downloadBtn = document.querySelector(selector);
    this.init();
  }

  init = () => {
    this.handlingDonwload();
  };

  domToImage = new DOMToImage(".card");

  loading = new Loading();

  isWorking = false;

  handlingDonwload = () => {
    this.$downloadBtn.addEventListener("click", this.bindingDownloadEvent);
  };

  bindingDownloadEvent = async () => {
    if (this.isWorking) {
      return;
    }
    try {
      this.isWorking = true;
      this.loading.open();
      const imageData = await this.domToImage.render();
      this.saveFile(imageData);
    } catch (e) {
      console.warn(e);
    } finally {
      this.isWorking = false;
      this.loading.close();
    }
  };

  saveFile = (data) => {
    saveAs(data, "image.png");
  };
}

export default Download;
