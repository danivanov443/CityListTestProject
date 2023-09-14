import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getCities} from '../../api';
import CustomList from './components/CustomList';
import {PAGE_SIZE} from '../../constants/constants';
import {City, CustomListAction} from '../../types';
import IconButton from '../../components/IconButton';
import FullScreenLoader from './components/FullScreenLoader';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cityData, setCityData] = useState<City[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const placeholderAction = () =>
    new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, Math.floor(Math.random() * 5 + 1) * 500);
    });

  const onCopyItemPress = (city: City, callback?: () => void) => {
    setIsProcessing(true);
    placeholderAction()
      .then(() => {
        console.log(`Элемент ${city.title} скопирован`);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Ошибка копирования',
          position: 'bottom',
        });
      })
      .finally(() => {
        setIsProcessing(false);
        callback?.();
      });
  };

  const onEditItemPress = (city: City, callback?: () => void) => {
    setIsProcessing(true);
    placeholderAction()
      .then(() => {
        console.log(`Элемент ${city.title} отредактирован`);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Ошибка редактирования',
          position: 'bottom',
        });
      })
      .finally(() => {
        setIsProcessing(false);
        callback?.();
      });
  };

  const onViewItemPress = (city: City, callback?: () => void) => {
    setIsProcessing(true);
    placeholderAction()
      .then(() => {
        console.log(`Элемент ${city.title} просмотрен`);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Ошибка просмотра',
          position: 'bottom',
        });
      })
      .finally(() => {
        setIsProcessing(false);
        callback?.();
      });
  };

  const onLikeItemPress = (city: City, callback?: () => void) => {
    setIsProcessing(true);
    placeholderAction()
      .then(() => {
        console.log(`Элемент ${city.title} добавлен в избранное`);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Ошибка добавления в избранное',
          position: 'bottom',
        });
      })
      .finally(() => {
        setIsProcessing(false);
        callback?.();
      });
  };

  const onDeleteItemPress = (city: City, callback?: () => void) => {
    Alert.alert('Удалить элемент', `Вы точно хотите удалить ${city.title}?`, [
      {
        text: 'Нет',
        onPress: () => {
          callback?.();
        },
        style: 'cancel',
      },
      {
        text: 'Да',
        onPress: () => {
          setIsProcessing(true);
          placeholderAction()
            .then(() => {
              console.log(`Элемент ${city.title} удалён`);
            })
            .catch(() => {
              Toast.show({
                type: 'error',
                text1: 'Ошибка удаления',
                position: 'bottom',
              });
            })
            .finally(() => {
              setIsProcessing(false);
              callback?.();
            });
        },
      },
    ]);
  };

  const singleItemActions: CustomListAction[] = [
    {
      name: 'Copy',
      icon: 'content-copy',
      onPress: onCopyItemPress,
    },
    {
      name: 'Edit',
      icon: 'edit',
      onPress: onEditItemPress,
    },
    {
      name: 'View',
      icon: 'preview',
      onPress: onViewItemPress,
    },
    {
      name: 'Like',
      icon: 'favorite',
      onPress: onLikeItemPress,
    },
    {
      name: 'Delete',
      icon: 'delete',
      onPress: onDeleteItemPress,
    },
  ];

  const loadData = async (
    searchQuery?: string,
    pageNumber?: number,
    pageSize?: number,
  ) => {
    setCityData([]);
    const data = await getCities(pageNumber, pageSize, searchQuery);
    setCityData(data);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    loadData(undefined, currentPage, PAGE_SIZE);
  };

  const handleSearchSubmit = (searchQuery?: string) => {
    setCurrentPage(1);
    loadData(searchQuery, currentPage, PAGE_SIZE);
  };

  const handleItemPress = (city: City) => {
    navigation.navigate('Details', {city});
  };

  useEffect(() => {
    loadData(undefined, currentPage, PAGE_SIZE);
  }, [currentPage]);

  useEffect(() => {
    if (isMultiselect) {
      navigation.setOptions({
        headerLeft: () => <IconButton icon="close" />,
        headerRight: () => <IconButton icon="more-vert" />,
      });
    } else {
      navigation.setOptions({
        headerLeft: undefined,
        headerRight: undefined,
      });
    }
  }, [navigation, isMultiselect]);

  return (
    <View style={{flex: 1}}>
      <CustomList
        currentPage={currentPage}
        data={cityData}
        onItemPress={handleItemPress}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={handleRefresh}
        actions={singleItemActions}
      />
      {isProcessing && <FullScreenLoader />}
    </View>
  );
}
