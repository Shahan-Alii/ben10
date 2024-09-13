import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    ImageBackground,
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    TapGestureHandler,
} from 'react-native-gesture-handler';

import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
    interpolate,
} from 'react-native-reanimated';

const alienData = [
    {
        key: 'Alien 1',
        image: require('../assets/images/alien1.png'),
        name: 'HeatBlast',
        power: 'Can manipulate fire',
        primaryColor: '#677617',
    },
    {
        key: 'Alien 2',
        image: require('../assets/images/alien2.png'),
        name: 'XLR8',
        power: 'Super speed and agility',
        primaryColor: '#3ec1cd',
    },
    {
        key: 'Alien 3',
        image: require('../assets/images/alien3.png'),
        name: 'FourArms',
        power: 'Super strength and durability',
        primaryColor: '#c40727',
    },
    {
        key: 'Alien 4',
        image: require('../assets/images/alien4.png'),
        name: 'DiamondHead',
        power: 'Can create and control crystals',
        primaryColor: '#5cb79e',
    },
    {
        key: 'Alien 5',
        image: require('../assets/images/alien5.png'),
        name: 'WaterHazard',
        power: 'Manipulates water and liquid substances',
        primaryColor: '#b41e1e',
    },
    {
        key: 'Alien 6',
        image: require('../assets/images/alien6.png'),
        name: 'GreyMatter',
        power: 'Super intelligence and analytical thinking',
        primaryColor: '#76907e',
    },
    {
        key: 'Alien 7',
        image: require('../assets/images/alien7.png'),
        name: 'EchoEcho',
        power: 'Can create sonic waves and duplicates',
        primaryColor: '#efefef',
    },
    {
        key: 'Alien 8',
        image: require('../assets/images/alien8.png'),
        name: 'TechnoBubble',
        power: 'Controls technology and machines',
        primaryColor: '#97e02f',
    },
    {
        key: 'Alien 9',
        image: require('../assets/images/alien9.png'),
        name: 'Goop',
        power: 'Liquid-like body, shape-shifting abilities',
        primaryColor: '#94cc26',
    },
    {
        key: 'Alien 10',
        image: require('../assets/images/alien10.png'),
        name: 'AlienX',
        power: 'Near-omnipotent abilities and reality manipulation',
        primaryColor: '#000000',
    },
];

const { width, height } = Dimensions.get('window');
const ALIEN_SIZE = 100;

export default function WatchScreen({ navigation }) {
    const scrollRef = useRef(null);
    const translateX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const rippleScale = useSharedValue(0);
    const rippleOpacity = useSharedValue(0);

    // Function to manually scroll the ScrollView
    const manualScrollTo = (index) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: index * width,
                animated: true,
            });
        }
    };

    // Pan Gesture Handler
    const onPanGesture = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.x = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;

            // // Scroll the ScrollView manually based on translationX
            // if (scrollRef.current) {
            //     scrollRef.current.scrollTo({
            //         x: -translateX.value,
            //         animated: false, // Disable animation during active gesture
            //     });
            // }
        },
        onEnd: () => {
            const newIndex = Math.round(-translateX.value / width); // Calculate new index based on gesture translation
            const clampedIndex = Math.max(
                0,
                Math.min(newIndex, alienData.length - 1)
            );

            // Update translateX value to snap to the nearest alien
            translateX.value = withTiming(clampedIndex * -width, {
                duration: 300,
            });

            // Scroll to the correct alien after gesture ends
            runOnJS(manualScrollTo)(clampedIndex);

            // Update the current index
            runOnJS(setCurrentIndex)(clampedIndex);
        },
    });

    // Function to navigate to AlienScreen
    const navigateToNextScreen = (currentAlien) => {
        navigation.navigate('AlienScreen', { alien: currentAlien });
    };

    const onDoubleTap = () => {
        rippleScale.value = 0;
        rippleOpacity.value = 0;

        rippleScale.value = withTiming(
            9,
            {
                duration: 1000,
                easing: Easing.out(Easing.quad),
            },
            (isFinished) => {
                if (isFinished) {
                    runOnJS(navigateToNextScreen)(alienData[currentIndex]);
                    rippleScale.value = 0;
                    rippleOpacity.value = 0;
                }
            }
        );

        rippleOpacity.value = withTiming(1, {
            duration: 1000,
        });
    };

    const rippleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: rippleScale.value }],
            opacity: rippleOpacity.value,
        };
    });

    const rDial = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-width, 0, width],
            [-90, 0, 90]
        );
        return {
            transform: [{ rotate: `${rotate}deg` }],
        };
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
                <Animated.View style={StyleSheet.absoluteFillObject}>
                    <PanGestureHandler onGestureEvent={onPanGesture}>
                        <Animated.View style={styles.container}>
                            {/* Background Image */}
                            <ImageBackground
                                source={require('../assets/images/bg3.jpeg')}
                                style={styles.image}
                                resizeMode="cover"
                            >
                                {/* Watch Image */}
                                <Image
                                    source={require('../assets/images/watch3.png')}
                                    style={styles.watch}
                                />

                                {/* Watch Dial */}
                                <Animated.Image
                                    source={require('../assets/images/dial2.png')}
                                    style={[styles.dial, rDial]}
                                />

                                {/* Aliens ScrollView */}
                                <Animated.ScrollView
                                    horizontal
                                    style={styles.scroll}
                                    ref={scrollRef} // Reference for scrolling
                                    scrollEnabled={false} // Disable native scrolling
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled
                                >
                                    {alienData.map((item, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.alienContainer,
                                                { width },
                                            ]}
                                        >
                                            <Image
                                                source={item.image}
                                                style={styles.alien}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    ))}
                                </Animated.ScrollView>

                                {/* Ripple Effect View */}
                                <Animated.View
                                    style={[styles.ripple, rippleStyle]}
                                />
                            </ImageBackground>
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </TapGestureHandler>

            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    watch: {
        height: 350,
        width: 350,
    },
    dial: {
        height: 370,
        width: 370,
        position: 'absolute',
        top: 225,
        left: 10,
    },
    scroll: { position: 'absolute', top: 358 },
    alien: {
        width: ALIEN_SIZE,
        height: ALIEN_SIZE,
    },
    alienContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ripple: {
        position: 'absolute',
        top: height / 2 - 50,
        left: width / 2 - 50,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(89, 233, 49, 0.9)',
        borderRadius: 50,
    },
});
