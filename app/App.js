import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
      redirectUri: 'https://auth.expo.io/@sedama/entro-predictor',
      expoClientId: '1014351807515-ocn7odeteusvh8fvn8lar6b9a0dg9rq8.apps.googleusercontent.com',
      weblientId: '1014351807515-ocn7odeteusvh8fvn8lar6b9a0dg9rq8.apps.googleusercontent.com',
      iosClientId: '1014351807515-s6g9phvqvhgm0vdptj98md9g6rfgov0r.apps.googleusercontent.com',
      androidClientId: '1014351807515-cgbtu7fhe2q7tsh1us09hke3jll10ji5.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    },
    {
    projectNameForProxy: "@sedama/entro-predictor"
    });
    
    useEffect(() => {
        if (response?.type === 'success') {
            getUserInfo(response.authentication.accessToken);
        } else if (response?.type === 'error') {
            console.error('Authentication error:', response.error);
        }
    }, [response]);

    const getUserInfo = async (token) => {
        try {
            const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = await userInfoResponse.json();
            setUserInfo(userData);
            AsyncStorage.setItem('@user', JSON.stringify(userData));
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    return (
        <View style={styles.container}>
            {!userInfo ? (
                <Button
                    title='Sign in with Google'
                    disabled={!request}
                    onPress={() => promptAsync()}
                />
            ) : (
                <View style={styles.userInfo}>
                    <Image source={{ uri: userInfo.picture }} style={styles.image} />
                    <Text style={styles.text}>Email: {userInfo.email}</Text>
                    <Text style={styles.text}>Name: {userInfo.name}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    text: {
        fontSize: 20,
        marginTop: 10,
    },
});
