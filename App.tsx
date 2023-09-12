import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailsScreen';
import Header from './src/components/Header';

export type MainStackParamList = {
  List: undefined;
  Details: {id: string};
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="List"
          component={ListScreen}
          options={{
            headerTitle: Header,
          }}
        />
        <MainStack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            headerTitle: Header,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
