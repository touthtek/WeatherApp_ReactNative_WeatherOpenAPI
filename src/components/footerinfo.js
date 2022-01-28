import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default FooterInfo = ({mainvalue, stylevalue}) =>{
    return(
        <View style={{alignItems:'center'}}>
        <Text style={styles.infoText}>Wind</Text>
        <Text style={[styles.infoText, {fontSize: 24}]}>{mainvalue}</Text>
        <Text style={styles.infoText}>Km/h</Text>
        <View style={styles.infoBar}>
           <View style={{width: stylevalue, height:5, backgroundColor : '#69f0ae'}} />
        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    infoText : {
        color : '#fff',
        fontSize : 14,
        fontFamily : 'Lato-Regular',
        fontWeight : 'bold'
      },
      infoBar : {
        width : 45,
        height:5,
        backgroundColor : 'rgba(225,225,225,0.5)'
      },
});

