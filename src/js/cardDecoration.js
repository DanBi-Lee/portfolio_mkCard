"use strict";

class CardDecoration {
  decorationState = {
    card_img: {
      filter: "",
    },
    bg_color: {
      "background-color": "#000000",
      opacity: 0.6,
    },
    blend_layer: {
      "mix-blend-mode": "screen",
      "background-color": "#000000",
      opacity: 0,
    },
  };

  constructor(selector) {
    this.$decorationBox = document.querySelector(selector);
  }

  onChangeDeco = () => {
    this.$decorationBox.addEventListener("input", this.handlingInputEvent);
  };

  onReset = () => {
    this.$decorationBox.addEventListener("clilck", this.handlingInputEvent);
  };

  handlingResetEvent = (e) => {
    const target = e.target;
    console.log("리셋~");

    if (target.type !== "reset") {
      return;
    }

    this.setData({
      card_img: {
        filter: "",
      },
      bg_color: {
        "background-color": "#000000",
        opacity: 0.6,
      },
      blend_layer: {
        "mix-blend-mode": "screen",
        "background-color": "#000000",
        opacity: 0,
      },
    });
  };

  handlingInputEvent = (e) => {
    const target = e.target;

    if (target.nodeName !== "INPUT" && target.nodeName !== "SELECT") {
      return;
    }

    this.makeDecoData({ ...target.dataset, value: target.value });
  };

  makeDecoData = ({ layername, prop, value, propvalue, unit }) => {
    let dataValue;
    switch (prop) {
      case "opacity":
      case "background-color":
      case "mix-blend-mode":
        dataValue = value;
        break;
      case "filter":
        const existingVlaue = this.decorationState.card_img.filter;
        const filterValue = existingVlaue.split(" ");
        const hasValue = filterValue.indexOf(
          filterValue.find((item) => item.includes(propvalue))
        );
        if (hasValue === -1) {
          dataValue = existingVlaue + ` ${propvalue}(${value}${unit})`;
        } else {
          filterValue[hasValue] = `${propvalue}(${value}${unit})`;
          dataValue = filterValue.join(" ");
        }
        break;
      default:
        throw new Event("지정되지 않은 속성");
    }
    console.log("뭘가", this.decorationState[layername]);
    const nextData = {
      [layername]: { ...this.decorationState[layername], [prop]: dataValue },
    };
    this.setData(nextData);
  };

  setData = (nextData) => {
    this.decorationState = { ...this.decorationState, ...nextData };
  };
}

export default CardDecoration;
