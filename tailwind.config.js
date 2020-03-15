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
    },
    extend: {
      spacing: {
        'px-2': '2px', 
      },
      screens: {
        'portrait': { 'raw': '(orientation: portrait)' },
      },
      width: {
        '1/20': '5%',
      },
      fontFamily: {
        'californian': ['CalifornianFB-Bold', 'Californian FB'],
      }
    },
  },
  variants: {},
  plugins: [],
}
