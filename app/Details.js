import React from 'react';
import { View, Text } from 'react-native';

export default function NewPage() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to New Page!</Text>
            <Text>This is the content of the new page.</Text>
        </View>
    );
}
