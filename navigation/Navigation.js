// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';

import
MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/signToText';
import TranslateScreen from '../Screens/textToAsl';
import SettingsScreen from '../Screens/settings';

const Tab = createBottomTabNavigator();

function Navigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
            activeTintColor: 'lightblue',
            style: {
                paddingBottom: 15,
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                height: 75,
                borderRadius: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }
        }}>
            <Tab.Screen
                name="Translate"
                component={TranslateScreen}
                options={{
                tabBarLabel: 'Translate',
                tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="translate" color={color} size={size}/>)
            }}/>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                tabBarLabel: 'Capture',
                tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="camera-iris" color={color} size={45}/>)
            }}/>
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="progress-wrench" color={color} size={size}/>)
            }}/>
        </Tab.Navigator>

    );
}
export default Navigation;