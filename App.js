import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import StackNavigator from './components/StackNavigator';

import * as Font from 'expo-font';

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                custom1: require('./assets/fonts/RussoOne-Regular.ttf'),
                custom2: require('./assets/fonts/Orbitron-VariableFont_wght.ttf'),
            });
            setFontLoaded(true);
        }
        loadFont();
    }, []);

    return <StackNavigator />;
};

export default App;
