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
      flex: {
        '1/3': '0 1 33%',
        '1/2': '0 1 50%',
        'break': '0 0 100%',
      },
      fontFamily: {
        'californian': ['CalifornianFB-Bold', 'Californian FB'],
      },
      screens: {
        'portrait': { 'raw': '(orientation: portrait)' },
      },
      spacing: {
        'px-2': '2px',
      },

      width: {
        '1/20': '5%',
      },
    },
  },
  variants: {},
  plugins: [],
}
