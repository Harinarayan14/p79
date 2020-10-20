import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './screens/SignupLoginScreen';
import { TabNavigator } from './components/TabNavigator'


export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: LoginScreen},
  Tab: {screen:TabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
