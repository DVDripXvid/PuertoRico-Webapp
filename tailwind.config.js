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
      ribbon: {
        default: '#3f7b89',
        lighter: '#5f8ba9',
        darker: '#1f5b69',
      },

      beige: '#ddbc95',
      default: '#132b40',
      'transparent-black': 'rgba(0,0,0,0.5)',
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
      },
      margin: {
        'p1': '1%'
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.3%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        '12': '12rem',
        '6': '4rem',
        '3': '3rem'
      },
      padding: {
        'p2': '2%'
      },
      screens: {
        'portrait': { 'raw': '(orientation: portrait)' },
      },
      spacing: {
        'px-2': '2px',
      },
      width: {
        '1/20': '5%',
        '1/8': '12.5%'
      },
    },
  },
  variants: {},
  plugins: [],
}
