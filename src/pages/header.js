import Copy from "../../lib/Copy.js";
import * as STYLE from "../style.js";
import * as global from "../global.js";

const siteHeader =  {
  background: global.rgb ? undefined : `linear-gradient(to bottom, #0009 0%, ${STYLE.lightScreen} 100%)`,
  paddingBottom: '2em',
  nav: {
    textAlign: `right`,
    padding: `0.5em 1em`,
    menu: {
      a: Copy.getToggleLink(),
    },
  },
  h1: {
    a: {
      href: `.`,
      html: Copy.text({
        en: `3D Psyche`,
        es: `La Psique Tridimensional</br>(3D Psyche)`,
      })
    },
  },
  a: {
    display: `block`,
    href: `http://lenino.net`,
    text: `${Copy.text({en: `By`, es: `Por`})} Lenin Comprés`,
  },
};

export default siteHeader;