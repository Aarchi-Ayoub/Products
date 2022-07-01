import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  //
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  //
  wrapper: {},
  image: {
    height: '50%',
    width: '100%',
  },
  paginationStyle: {
    marginBottom: 200,
  },
  //
  content: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '60%',
  },
  label: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#008AD8',
  },
  desc: {
    marginHorizontal: 10,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
  },
  discount: {
    color: 'red',
  },
  //
  options: {
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  opt: {
    height: 40,
    width: 40,
  },
});
