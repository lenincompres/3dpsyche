import * as questionnaire from "./src/pages/questionnaire.js";
import * as results from "./src/pages/results.js";
import intro from "./src/pages/intro.js";
import QUESTIONS from "./src/questions.js";
import siteFooter from "./src/pages/footer.js";
import siteHeader from "./src/pages/header.js";
import * as global from "./src/global.js";
import siteTest from "./src/pages/test.js";

const qTotal = QUESTIONS.length - 1;

questionnaire._results.bind(results._feature);

if (global.rgb) results._feature.value = global.rgb;

const CSS = {
  html: {
    scrollBehavior: `smooth`,
  },
  b: {
    fontWeight: `bold`,
  },
  a: {
    color: `#fff`,
    textDecoration: `none`,
    textShadow: `0 0 1px #000c, 1px 1px 2px #000c`,
    hover: {
      textDecoration: `underline`,
    },
    after: {
      transition: `ease-in 0.1s`,
      fontSize: `0.68em`,
      verticalAlign: `top`,
      paddingLeft: `0.25em`,
    }
  },
  p: {
    padding: `0.5em 0`,
    lineHeight: `1.5em`,
    textAlign: 'left',
  },
  ul: {
    padding: `0.5em 0`,
    lineHeight: `1.5em`,
  },
  h: {
    padding: `.5em 0 0.2em`,
    fontWeight: `bold`,
    fontFamily: `title`,
  },
  h1: {
    padding: `0.3rem 0 0`,
    textAlign: `center`,
    fontSize: `3rem`,
    color: `#fff`,
    textShadow: `0 0 3px #000c, 0 0 3px #000c`,
    textTransform: `capitalize`,
  },
  h2: {
    fontSize: `1.25rem`,
    paddingTop: `1em`,
    textAlign: `center`,
    color: `#fff`,
    textTransform: `capitalize`,
    textShadow: `0 0 3px #000c, 0 0 3px #000c`,
  },
  h3: {
    fontSize: `1.15rem`,
  },
  h4: {
    fontSize: `1.07rem`,
  }
};

DOM.set({
  title: `3DPsyche`,
  charset: `UTF-8`,
  viewport: `width=device-width, initial-scale=1, minimum-scale=1`,
  keywords: `3dpsyche, psychology, test, psychology test, personality types, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction, lenino, lenin compres`,
  description: `A psychometric tool to visualize the Physical, Rational & Emotional spectrum.`,
  icon: `media/favicon.gif`,
  textAlign: `center`,
  backgroundColor: global.rgb ? global.rgb : questionnaire._favorite,
  font: {
    fontFamily: `title`,
    src: `assets/PTSerif-Regular.ttf`,
  },
  css: CSS,
  fontFamily: `Verdana, Geneva, Tahoma, sans-serif`,
  fontSize: `16px`,
  overflowX: `hidden`,
  header: siteHeader,
  section: global.rgb ? undefined : intro,
  main: siteTest,
  footer: siteFooter,
});