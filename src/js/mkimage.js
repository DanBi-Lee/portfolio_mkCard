import DataToDom from "./dataToDom";
import Download from "./download";
import FontList from "./FontList";
import Preview from "./preview";
import SearchImage from "./searchImage";
import TabMenu from "./tabMenu";

const optionTab = new TabMenu();
const fontTab = new TabMenu();
const fontList = new FontList();
const serachImg = new SearchImage(".search_img");
const mkDom = new DataToDom();
const downlaod = new Download(".download");
const preview = new Preview();

optionTab.init(".option");
fontTab.init(".font_box");
