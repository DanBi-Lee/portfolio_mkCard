class UploadImg {
  constructor(selector) {
    this.$fileInput = document.querySelector(selector);
  }

  afterLoad = () => {};

  handlingUpload = (callback) => {
    this.afterLoad = callback;
    this.$fileInput.addEventListener("change", this.upload);
  };

  upload = (e) => {
    const file = e.currentTarget.files[0];
    if (!file.type.match(/image.*/)) {
      alert("이미지 파일만 올려주세요");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", this.loadEvent);
  };

  loadEvent = (e) => {
    const imgURL = e.currentTarget.result;
    this.afterLoad(imgURL);
  };
}

export default UploadImg;
