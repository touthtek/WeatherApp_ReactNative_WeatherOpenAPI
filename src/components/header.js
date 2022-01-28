import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default ScreenHeader = ({onPress}) =>{
    return (
        <View style={styles.appHearder}>
        <Pressable 
          onPress={onPress}
        >
          <Image source={require('../assets/images/search.png')} style={{width:24, height:24}} />
        </Pressable>
          <Image source={require('../assets/images/menu.png')} style={{width:24, height:24}} />
      
      </View>
    );
}

const styles = StyleSheet.create({
    appHearder : {
        position : 'absolute',
        top: 0,
        width : '100%',
        height : getStatusBarHeight() + 40,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'flex-end',
        paddingHorizontal : 20
      },
});



