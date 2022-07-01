import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  //
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  //
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  //
  thumbnail: {
    height: 100,
    width: 200,
    alignSelf: 'center',
  },
  //
  text: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    lineHeight: 18,
  },
  price: {
    textAlign: 'right',
    fontStyle: 'italic',
    color: 'red',
    marginRight: 8,
  },
  //
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 2,
    marginTop: 5,
  },
  star: {
    height: 20,
    width: 20,
  },
});
