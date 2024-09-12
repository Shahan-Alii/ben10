import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WatchScreen from './WatchScreen';
import AlienScreen from './AlienScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WatchScreen">
                <Stack.Screen
                    name="WatchScreen"
                    component={WatchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AlienScreen"
                    component={AlienScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
