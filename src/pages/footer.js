import Collapsable from "../components/Collapsable.js";
import Copy from "../../lib/Copy.js";

const siteFooter = {
  paddingBottom: "2em",
  background: "linear-gradient(#000f 0%, #0006 100%)",
  section: {
    maxWidth: "740px",
    padding: "1em",
    margin: "0 auto",
    section: new Collapsable({
      iframe: {
        src: "https://docs.google.com/forms/d/e/1FAIpQLSdE4cfLkZn7Jf3QUgfaILz8SXSqauQVPltBoGTF6xnKZWbjsQ/viewform?embedded=true",
        width: "100%",
        height: window.innerWidth > 800 ? 1600 : 1800,
      }
    }, Copy.text({
      en: "✉️ Contact Us",
      es: "✉️ Contáctanos",
    }), Copy.text({
      en: "✉️ Close Form",
      es: "✉️ Cerrar Formulario"
    }), {
      marginBottom: '2em',
    }),
    a: {
      display: "block",
      marginTop: "1em",
      fontSize: "small",
      content: [{
        target: "_blank",
        href: "http://lenino.net",
        text: "© Lenin Comprés @ Lenino LLC, 2024. All rights reserved.",
      }, {
        target: "_blank",
        href: "https://github.com/lenincompres/DOM.js",
        text: "Developed with DOM.js",
      }],
    },
  }
};

export default siteFooter;