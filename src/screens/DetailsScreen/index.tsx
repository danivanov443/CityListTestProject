import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import Header from '../../components/Header/Header';
import CityDetails from './components/CityDetails';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackParamList, 'Details'>;

export default function DetailScreen({navigation, route}: Props) {
  const city = route.params.city;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header text={city.title} />,
    });
  }, [city.title, navigation]);

  return (
    <View style={styles.detailsScreenView}>
      <CityDetails city={city} />
    </View>
  );
}
