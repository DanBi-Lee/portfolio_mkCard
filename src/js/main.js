import AutoSlider from "./autoSlider";
import MyParallex from "./myParallex";
import WheelMotion from "./wheelMotion";

const myParallex = new MyParallex('[id$="Box"]', 150);
const wheelMotion = new WheelMotion('[id$="Box"]');
const imageSlider = new AutoSlider(".box_img ul");
