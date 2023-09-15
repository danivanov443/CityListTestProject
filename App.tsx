import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import ListScreen from '@screens/ListScreen';
import DetailScreen from '@screens/DetailsScreen';
import {toastConfig} from '@src/toastConfig';
import {MainStackParamList} from '@navigation/navigation';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="List"
            component={ListScreen}
            options={{
              headerTitleAlign: 'center',
            }}
          />
          <MainStack.Screen
            name="Details"
            component={DetailScreen}
            options={({route}) => ({
              headerTitleAlign: 'left',
              headerTitle: route.params.city.title,
            })}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
