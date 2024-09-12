import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    ImageBackground,
    StyleSheet,
    View,
    Image,
    ScrollView,
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
    runOnJS,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

// data of aliens

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
        primaryColor: '#0188ca',
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
const diagonal = Math.sqrt(width * width + height * height);

const ALIEN_SIZE = 100;

export default function WatchScreen({ navigation }) {
    const scrollRef = useRef(null);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(-10);
    const currentIndex = useSharedValue(0);

    const rotate = useSharedValue(0);

    const rippleScale = useSharedValue(0);
    const rippleOpacity = useSharedValue(0);

    //opacity of effect above watch

    // function for scrolling scrollView to its index
    const scrollToIndex = (index) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: index * width,
                animated: true,
            });
        }
    };

    // Pan Gesture Handler
    const onPanGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            if (translateX.value > 150 && currentIndex.value > 0) {
                currentIndex.value -= 1;
                rotate.value = withTiming(rotate.value - 90, {
                    duration: 1000,
                });
            } else if (
                translateX.value < -150 &&
                currentIndex.value < alienData.length - 1
            ) {
                currentIndex.value += 1;

                rotate.value = withTiming(rotate.value + 90, {
                    duration: 1000,
                });
            }

            runOnJS(scrollToIndex)(currentIndex.value);
        },
    });

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
                    // Only navigate if the animation is completed
                    runOnJS(navigateToNextScreen)(
                        alienData[currentIndex.value]
                    );

                    rippleScale.value = 0;
                    rippleOpacity.value = 0;
                }
            }
        );

        rippleOpacity.value = withTiming(1, {
            duration: 1000,
        });
    };

    // function to navigate to ALienScreen
    const navigateToNextScreen = (currentAlien) => {
        navigation.navigate('AlienScreen', { alien: currentAlien });
    };

    const rippleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: rippleScale.value }],
            opacity: rippleOpacity.value,
        };
    });

    const rDial = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotate.value}deg` }],
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

                                <ScrollView
                                    style={styles.scroll}
                                    horizontal
                                    ref={scrollRef}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {alienData.map((item, index) => (
                                        <View
                                            key={index}
                                            style={styles.alienContainer}
                                        >
                                            <Image
                                                source={item.image}
                                                style={styles.alien}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    ))}
                                </ScrollView>

                                {/* Ripple Effect  View*/}
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
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    effect: {
        height: 400,
        width: 270,
        position: 'absolute',
        top: 260,
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
