import DataToDom from "./dataToDom";
import FontList from "./FontList";
import SearchImage from "./searchImage";
import TabMenu from "./tabMenu";
import DOMToImage from "./domToImage";

const optionTab = new TabMenu();
const fontTab = new TabMenu();
const fontList = new FontList();
const serachImg = new SearchImage(".search_img");
const mkDom = new DataToDom();
const domToImgae = new DOMToImage(".card", "#imgPreview");

$(".download").on("click", function () {
  domToImgae.render();
});
