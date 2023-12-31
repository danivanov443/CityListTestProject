/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View, BackHandler} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {getCities} from '@api/api';
import {MainStackParamList} from '@navigation/navigation';
import {City, CustomListAction} from '@src/types';
import {PAGE_SIZE} from '@constants/constants';
import IconButton from '@components/IconButton';
import CustomList from './components/CustomList';
import FullScreenLoader from './components/FullScreenLoader';
import HeaderMenu from './components/HeaderMenu';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [shouldShowActionMenu, setShouldShowActionMenu] = useState(false);
  const [cityData, setCityData] = useState<City[]>();
  const [selectedCities, setSelectedCities] = useState<City[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const placeholderAction = () =>
    new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, Math.floor(Math.random() * 3 + 1) * 500);
    });

  const onCopyItemPress = (city: City, callback?: () => void) => {
    if (isProcessing) {
      return;
    }
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
        handleQuitMultiselect();
        callback?.();
      });
  };

  const onEditItemPress = (city: City, callback?: () => void) => {
    if (isProcessing) {
      return;
    }
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
        handleQuitMultiselect();
        callback?.();
      });
  };

  const onViewItemPress = (city: City, callback?: () => void) => {
    if (isProcessing) {
      return;
    }
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
        handleQuitMultiselect();
        callback?.();
      });
  };

  const onLikeItemPress = (city: City, callback?: () => void) => {
    if (isProcessing) {
      return;
    }
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
        handleQuitMultiselect();
        callback?.();
      });
  };

  const onDeleteItemPress = (city: City, callback?: () => void) => {
    if (isProcessing) {
      return;
    }
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
              handleQuitMultiselect();
              callback?.();
            });
        },
      },
    ]);
  };

  const singleItemActions: CustomListAction[] = [
    {
      name: 'Копировать',
      icon: 'content-copy',
      onPress: selectedCities
        ? () => onCopyItemPress(selectedCities[0])
        : onCopyItemPress,
    },
    {
      name: 'Редактировать',
      icon: 'edit',
      onPress: selectedCities
        ? () => onEditItemPress(selectedCities[0])
        : onEditItemPress,
    },
    {
      name: 'Просмотреть',
      icon: 'preview',
      onPress: selectedCities
        ? () => onViewItemPress(selectedCities[0])
        : onViewItemPress,
    },
    {
      name: 'Добавить в избранное',
      icon: 'favorite',
      onPress: selectedCities
        ? () => onLikeItemPress(selectedCities[0])
        : onLikeItemPress,
    },
    {
      name: 'Удалить',
      icon: 'delete',
      onPress: selectedCities
        ? () => onDeleteItemPress(selectedCities[0])
        : onDeleteItemPress,
    },
  ];

  const onLikeItemsPress = (cities: City[], callback?: () => void) => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    placeholderAction()
      .then(() => {
        console.log(`Элементов добавлено в избранное: ${cities.length}`);
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
        handleQuitMultiselect();
        callback?.();
      });
  };

  const onDeleteItemsPress = (cities: City[], callback?: () => void) => {
    if (isProcessing) {
      return;
    }
    Alert.alert(
      'Удалить несколько элементов',
      'Вы точно хотите удалить выбранные элементы?',
      [
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
                console.log(`Элементов удалено: ${cities.length}`);
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
                handleQuitMultiselect();
                callback?.();
              });
          },
        },
      ],
    );
  };

  const multipleItemActions: CustomListAction[] = [
    {
      name: 'Добавить в избранное',
      icon: 'favorite',
      onPress: () => selectedCities && onLikeItemsPress(selectedCities),
    },
    {
      name: 'Удалить',
      icon: 'delete',
      onPress: () => selectedCities && onDeleteItemsPress(selectedCities),
    },
  ];

  const loadInitialData = async (
    searchQuery?: string,
    pageNumber?: number,
    pageSize?: number,
  ) => {
    setCityData(undefined);
    const data = await getCities(pageNumber, pageSize, searchQuery);
    setCityData(data ?? []);
  };

  const handleRefresh = () => {
    handleQuitMultiselect();
    setCurrentPage(1);
    loadInitialData(undefined, 1, PAGE_SIZE);
  };

  const handleEndReached = async (searchQuery?: string) => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      const data = await getCities(currentPage + 1, PAGE_SIZE, searchQuery);

      if (data) {
        setCityData(prev => prev && [...prev, ...data]);
        setCurrentPage(prev => prev + 1);
      }
      setIsFetchingMore(false);
    }
  };

  const handleSearchSubmit = (searchQuery?: string) => {
    handleQuitMultiselect();
    setCurrentPage(1);
    loadInitialData(searchQuery, 1, PAGE_SIZE);
  };

  const handleItemPress = (city: City) => {
    if (!isMultiselect) {
      navigation.navigate('Details', {city});
    } else {
      if (selectedCities?.some(value => value.id === city.id)) {
        const filteredCities = selectedCities.filter(
          value => value.id !== city.id,
        );
        if (filteredCities.length === 0) {
          handleQuitMultiselect();
        } else {
          setSelectedCities(filteredCities);
        }
      } else {
        selectedCities && setSelectedCities([...selectedCities, city]);
      }
    }
  };

  const handleItemLongPress = (city: City) => {
    if (!isMultiselect) {
      setSelectedCities([city]);
      setIsMultiselect(true);
    }
  };

  const handleQuitMultiselect = useCallback(() => {
    if (isMultiselect) {
      setSelectedCities(undefined);
      setIsMultiselect(false);
      setShouldShowActionMenu(false);
    }
  }, [isMultiselect]);

  const handleItemMenuPress = () => {
    setShouldShowActionMenu(prev => !prev);
  };

  useEffect(() => {
    loadInitialData(undefined, 1, PAGE_SIZE);
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (isMultiselect) {
        handleQuitMultiselect();
        return true;
      } else {
        return false;
      }
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => subscription.remove();
  }, [handleQuitMultiselect, isMultiselect]);

  useEffect(() => {
    if (isMultiselect) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton icon="close" onPress={handleQuitMultiselect} />
        ),
        headerTitle: `Выбрано: ${selectedCities?.length}`,
        headerRight: () => (
          <IconButton icon="more-vert" onPress={handleItemMenuPress} />
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: undefined,
        headerTitle: 'City List',
        headerRight: undefined,
      });
    }
  }, [
    navigation,
    isMultiselect,
    selectedCities?.length,
    handleQuitMultiselect,
  ]);

  return (
    <View style={styles.listScreenView}>
      <CustomList
        data={cityData}
        isMultiselect={isMultiselect}
        actions={singleItemActions}
        showProgressBar={isFetchingMore}
        onItemPress={handleItemPress}
        onItemLongPress={handleItemLongPress}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={handleRefresh}
        onModeChange={handleQuitMultiselect}
        onEndReached={handleEndReached}
      />
      {isProcessing && <FullScreenLoader />}
      {shouldShowActionMenu && (
        <HeaderMenu
          actions={
            selectedCities?.length === 1
              ? singleItemActions
              : multipleItemActions
          }
        />
      )}
    </View>
  );
}
