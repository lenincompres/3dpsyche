import Copy from "../../lib/Copy.js";

const siteMenu =  {
  p: Copy.text({
    es: "Lecturas complementarias:",
    en: "Further Reading:",
  }),
  ul: {
    display: "flex",
    justifyContent: "space-around",
    li: {
      margin: "0 0.7em",
      textAlign: "center",
      content: [{
          a: {
            html: Copy.text({
              en: `3D Psyche Manifesto`,
              es: `Manifiesto`,
            }),
            href: Copy.text({
              en: `manifesto.html`,
              es: `manifiesto.html`,
            }),
          }
        },
        {
          a: {
            html: Copy.text({
              en: `Educational Dossier`,
              es: `Dossier Educativo`,
            }),
            href: Copy.text({
              en: `educationalDossier.pdf`,
              es: `dossierEducativo.pdf`,
            }),
          }
        }
      ]
    }
  }
}

export default siteMenu;