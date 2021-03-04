import DataToDom from "./dataToDom";
import Download from "./download";
import FontList from "./FontList";
import SearchImage from "./searchImage";
import TabMenu from "./tabMenu";

const optionTab = new TabMenu();
const fontTab = new TabMenu();
const fontList = new FontList();
const serachImg = new SearchImage(".search_img");
const mkDom = new DataToDom();
const downlaod = new Download(".download");

optionTab.init(".option");
fontTab.init(".font_box");
