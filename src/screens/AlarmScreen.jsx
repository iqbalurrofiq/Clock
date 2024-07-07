import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

function AlarmScreen() {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbGF4eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
      }}
      style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Clock Application</Text>
      </View>
    </ImageBackground>
  );
}

export default AlarmScreen;
