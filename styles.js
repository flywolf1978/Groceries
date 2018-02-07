var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },

});
