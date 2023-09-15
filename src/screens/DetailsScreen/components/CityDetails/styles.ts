import {StyleSheet} from 'react-native';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  detailsWrapper: {
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textColor,
    marginEnd: 8,
  },
  titleText: {
    fontSize: 18,
    color: colors.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  propertyText: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: 'bold',
    marginEnd: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textColor,
  },
});
