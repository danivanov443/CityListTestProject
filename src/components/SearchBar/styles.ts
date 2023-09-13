import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    paddingRight: 4,
    paddingLeft: 8,
    borderRadius: 32,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    marginHorizontal: 4,
    fontSize: 16,
  },
  searchButton: {
    padding: 4,
    margin: 4,
    borderRadius: 26,
  },
});
