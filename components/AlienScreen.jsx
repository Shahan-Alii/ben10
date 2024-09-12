import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AlienScreen = () => {
    // Get the route object
    const route = useRoute();
    // Destructure the alien object from route.params
    const { alien } = route.params;

    return (
        <ImageBackground
            source={require('../assets/images/bg4.jpeg')}
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Alien Name */}
                <Text style={[styles.title, { color: alien.primaryColor }]}>
                    {alien.name}
                </Text>

                {/* Alien Image */}
                <Image
                    source={alien.image}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* Alien Power */}

                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    {alien.power && <Text style={styles.powerText}>POWER</Text>}
                    {alien.power && (
                        <View
                            style={{
                                backgroundColor: '#1d1b1b',
                                height: 90,
                                width: 250,
                                borderRadius: 20,
                                justifyContent: 'center',
                                padding: 20,
                            }}
                        >
                            <Text style={styles.powerDescription}>
                                {alien.power}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: '900',
        fontFamily: 'custom1',

        textShadowColor: 'rgba(0, 0, 0,0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
        elevation: 10,

        letterSpacing: 3,
        marginTop: 90,
        transform: [{ scaleY: 1.5 }],
    },
    image: {
        width: 350,
        height: 350,
        marginBottom: 50,
    },
    powerText: {
        fontSize: 34,
        color: '#ffffff',
        fontWeight: '400',
        marginBottom: 5,
        fontFamily: 'custom2',

        textShadowColor: 'rgba(0, 0, 0,1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
        elevation: 10,
    },
    powerDescription: {
        fontSize: 15,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'custom2',
    },
});

export default AlienScreen;
