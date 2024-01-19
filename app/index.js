import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import google from '../assets/images/btn_google_signin_dark_normal_web.png';
import BWImage from '../assets/images/BW_Logo.png';
import { styles } from './style/style_index';

WebBrowser.maybeCompleteAuthSession();

export default function IndexScreen() {
    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useAuthRequest({
        redirectUri: 'https://auth.expo.io/@sedama/entro-predictor',
        expoClientId: '1014351807515-ocn7odeteusvh8fvn8lar6b9a0dg9rq8.apps.googleusercontent.com',
        webClientId: '1014351807515-ocn7odeteusvh8fvn8lar6b9a0dg9rq8.apps.googleusercontent.com',
        iosClientId: '1014351807515-s6g9phvqvhgm0vdptj98md9g6rfgov0r.apps.googleusercontent.com',
        androidClientId: '1014351807515-cgbtu7fhe2q7tsh1us09hke3jll10ji5.apps.googleusercontent.com',
        scopes: ['profile', 'email']
    },
    {
        projectNameForProxy: "@sedama/entro-predictor"
    });

    useEffect(() => {
        if (response?.type === 'success') {
            navigation.navigate('Drawer'); 
        } else if (response?.type === 'error') {
            console.error('Authentication error:', response.error);
        }
    }, [response]);



    return (
        <View style={styles.container}>
            <Image
                source={BWImage}
                style={styles.logo}
            />
            <Text style={styles.description}>The Enterococcus Predictor (or ep), an AI-enabled system to predict the level or counts of enterococcus
                bacteria for a geographical area, is currently in development. If you are a registered user, please use your Google account to log in. If you are having issues logging in, please contact info@enterococcus.today.
            </Text>
            <TouchableOpacity onPress={() => promptAsync()}>
                <View>
                    <Image
                        source={google}
                        style={styles.logo2}
                    />
                </View>
            </TouchableOpacity>

            <Text style={styles.agreementText}>
                I agree to the{' '}
                <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
                    <Text style={styles.hyperlink}>Terms and Conditions</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}
