export class Stats extends HTMLElement {

  constructor(title, bars, blank, ) {
    super();
    this.set({
      display: 'flex',
      flexDirection: 'column',
      header: title,
      ul: {
        margin: '0 0 1em',
        li: bars.map(b => ({
          margin: 0,
          bar: b,
        })),
      },
    });
  }

}

customElements.define('stats-bar', Stats);
export default Stats;