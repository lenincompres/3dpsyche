import * as questionnaire from "./questionnaire.js";
import * as global from "../global.js";

const siteFooter = {
  fontSize: `small`,
  paddingBottom: "2em",
  background: global.rgb ? '#000a' : questionnaire._qCounter.as({
    [-3]: 'none',
    default: `#000a`,
  }),
  a: {
    display: "block",
    content: [{
      paddingTop: `2em`,
      target: `_blank`,
      href: `http://lenino.net`,
      text: `© Lenin Comprés, 2024. All rights reserved.`,
    }, {
      marginTop: `0.68em`,
      target: `_blank`,
      href: `https://github.com/lenincompres/DOM.js`,
      text: `Developed with DOM.js`,
    }]
  }
};

export default siteFooter;