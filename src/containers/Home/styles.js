import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  header: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 22,
  },
  next: {
    alignSelf: 'flex-end',
  },
  paginateActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginate: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue',
    lineHeight: 17,
  },
  headerStlyes: {
    marginBottom: '10%',
  },
  //
  content: {
    marginHorizontal: '4%',
  },
  separator: {
    height: 25,
  },
  //
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000',
    fontWeight: 'bold',
  },
  file: {
    height: 150,
    width: 150,
  },
});
