// CustomHeader.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, showHeader }) => {
  const navigation = useNavigation();

  if (!showHeader) {
    return null;
  }

  return (
    <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ marginLeft: 10 }}
      >
        <FontAwesome name="bars" size={20} color="black" />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>{title}</Text>
      </View>
      <View style={{ width: 30 }} />
    </View>
  );
};

export default CustomHeader;
