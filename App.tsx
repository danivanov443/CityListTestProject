/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailsScreen';
import Header from './src/components/Header';
import {toastConfig} from './src/toastConfig';
import {MainStackParamList} from './src/navigation/navigation';

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
              headerTitle: () => <Header />,
              headerTitleAlign: 'center',
            }}
          />
          <MainStack.Screen
            name="Details"
            component={DetailScreen}
            options={{
              headerTitle: () => <Header />,
              headerTitleAlign: 'center',
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
