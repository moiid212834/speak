import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';


export default function App() {
  useEffect (()=>{
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  });
  return (
    <>
    <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
        />
    <View style={{height:Dimensions.get('window').height,backgroundColor:'lightblue'}}>
      <NavigationContainer >
        <Navigation/>
      </NavigationContainer>
    </View>
    </>
  )
}