import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../../constants/colors';
import {City} from '../../../../types';
import getAddressWithoutCity from '../../../../utils/getAddressWithoutCity';

type Props = {city: City};

export default function CityDetails({city}: Props) {
  const address = getAddressWithoutCity(city);

  return (
    <View style={styles.detailsWrapper}>
      <Text style={styles.titleText}>{city.title}</Text>
      <Text style={styles.subtitleText}>{address}</Text>
      <View style={styles.propertyWrapper}>
        <Text style={styles.propertyText}>Федеральный округ:</Text>
        <Text style={styles.descriptionText}>
          {city.region.federalDistrict.title}
        </Text>
      </View>
      <View style={styles.propertyWrapper}>
        <Text style={styles.propertyText}>Широта:</Text>
        <Text style={styles.descriptionText}>{city.latitude}</Text>
      </View>
      <View style={styles.propertyWrapper}>
        <Text style={styles.propertyText}>Долгота:</Text>
        <Text style={styles.descriptionText}>{city.longitude}</Text>
      </View>
    </View>
  );
}

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
