import React from 'react';
import {View, Text} from 'react-native';
import {City} from '../../../../types';
import getAddressWithoutCity from '../../../../utils/getAddressWithoutCity';
import {styles} from './styles';

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
