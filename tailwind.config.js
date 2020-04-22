module.exports = {
  theme: {
    colors: {
      primary: '#124559',
      corn: '#f2bf5e',
      indigo: '#68829e',
      sugar: '#dddfd4',
      tobacco: '#b38867',
      coffee: '#664848',

      roles: '#e8edf3',
      roletabs: '#236a75',
      compass: '#236a75',
      ribbon: {
        default: '#835837',
        lighter: '#b38867',
        darker: '#332827',
      },

      beige: '#ddbc95',
      stats: "#ddad7a",
      default: '#132b40',
      text: '#c4c6b5',
      'transparent-black': 'rgba(0,0,0,0.5)',
      'transparent-default': 'rgb(19,43,64,0.5)'
    },
    extend: {
      gridTemplateColumns: {
        '2-w-1/4': 'repeat(2, minmax(25%, 25%))',
        '3-w-1/4': 'repeat(3, minmax(25%, 25%))',
        '4-w-1/4': 'repeat(4, minmax(25%, 25%))',
      },
      flex: {
        '1/3': '0 1 33.3%',
        '1/2': '0 1 50%',
        'break': '0 0 100%',
      },
      fontFamily: {
        'californian': ['CalifornianFB-Bold', 'Californian FB'],
        'minion': 'Minion Variable Concept',
      },
      margin: {
        'p1': '1%',
        'p2': '2%',
        'p3': '3%',
        'p4': '4%',
        'p5': '5%',
        'p20': '20%',
      },
      maxWidth: {
        '1/12': '8.3%',
        '1/10': '10%',
        '1/8': '12.5%',
        '1/6': '16.6%',
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.3%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        '12': '12rem',
        '7': '7rem',
        '6': '4rem',
        '3': '3rem'
      },
      padding: {
        'p1': '1%',
        'p2': '2%',
        'p5': '5%',
        'p8': '8%',
        'p9': '9%',
        'p10': '10%',
        'p13': '13%',
      },
      scale: {
        '60': '.6'
      },
      screens: {
        'portrait': { 'raw': '(orientation: portrait)' },
      },
      spacing: {
        'px-2': '2px',
      },
      width: {
        '1/20': '5%',
        '1/10': '10%',
        '1/8': '12.5%',
        '22': '5.5rem'
      },
    },
  },
  variants: {},
  plugins: [],
}
