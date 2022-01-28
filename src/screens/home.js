import React, { useEffect, useRef, useState } from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  useWindowDimensions,
  Animated,
  Image,
  Pressable,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';


import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import {useNetInfo} from "@react-native-community/netinfo";
import * as RNLocalize from "react-native-localize";
import {countries} from 'country-data';
import Footerinfo from '../components/footerinfo';
import ScreenHeader  from '../components/header'


 




export default Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  
 const {width : windowWidth, height : windowHeight} = useWindowDimensions();
 const scrollX = useRef(new Animated.Value(0)).current;
 const [text, onChangeText] = React.useState("Useless Text");
 const [location, setLocation] = React.useState(countries[RNLocalize.getCountry()].name);
 const [weatherData, setWeatherData] = useState([]);
 const [bgImage, setBgImage] = useState(require('../assets/images/Cloudy.jpeg'))
 const [connection, setConnection] = useState(false);

 const netInfo = useNetInfo();


 useEffect(()=>{
  getWeatherDetails(location);  
 },[]);

const AlertModal = (title, message)=>{
    Alert.alert(
      title,
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
}


 

 const getWeatherDetails = async (location) => {
  try {
    setLoaderVisible(true);
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ef833e5447d291aad2e643f15b27be35&units=metric`;
   const data = await fetch(URL)
   .then(res => res.json())
   if(data.cod === '404')
   {
      Alert.alert(
        //"Error",
        data.message,
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel"
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
   }
   else{
    setWeatherData(data);
    setModalVisible(false);
    setLoading(false);
    if(data.weather[0].main === 'Clouds')
    {
      setBgImage(require('../assets/images/Cloudy.jpeg'))
    }
    else if(data.weather[0].main === 'Clear')
    {
      setBgImage(require('../assets/images/sunny.jpeg'))
    }
    else if(data.weather[0].main === 'Rain')
    {
      setBgImage(require('../assets/images/raining.jpeg'))
    }
    else if(data.weather[0].main === 'Snow')
    {
      setBgImage(require('../assets/images/snow.jpeg'))
    }
    else if(data.weather[0].main === 'Mist')
    {
      setBgImage(require('../assets/images/mist.jpeg'))
    }
    else if(data.weather[0].main === 'Drizzle')
    {
      setBgImage(require('../assets/images/drizzle.jpeg'))
    }
   }
   
 } catch (error) {
   Alert.alert(
    "Error",
    'Something went wrong, please try again later',
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
 } finally {
  setLoaderVisible(false);
 }
}


  const handlePress = (location) =>{
    if(location === "" || location === undefined)
    {
      Alert.alert(
        "Error",
        "Country/City can not be empty",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
  
      return;
    }
    else{
      //console.log(netInfo);
      netInfo.isConnected ? getWeatherDetails(location) : AlertModal("Internet Error", "Kindly check your internet");
    }
      
  }
  const handleOnTextChange = (value) =>{
      setLocation(value);
  }

  const searchOnpress = () => setModalVisible(true);


    return(
        <>
    <StatusBar barStyle='light-content' />
 
     {
       loading
       ?
       <View style={{
        width:windowWidth, 
        height:windowHeight
        }}>
      <ImageBackground 
      source={bgImage}
      style={{flex:1}}
      />
        </View>
       :
      
<View>
           
           <View style={{
             width:windowWidth, 
             height:windowHeight
             }}>
           <ImageBackground 
           source={bgImage}
           style={{flex:1}}
           >
               <View style={{flex: 1, backgroundColor:'rgba(0,0,0,0.3)', padding : 20}}>
                <View style={styles.topInforWrapper}>
                 <View>
                   <Text style={styles.city}>{weatherData.name} - {weatherData.sys.country}</Text>
                   <Text style={styles.time}>Coord: Lon : {weatherData.coord.lon}, Lat : {weatherData.coord.lat}</Text>
               
                 </View>
                 <View>
                   <Text style={styles.degrees}>degrees</Text>
                   <Text style={styles.temparature}>{weatherData.main.temp.toFixed(1)}</Text>
                   <View style={{flexDirection:'row'}}>
                     <Image 
                     style={{width:34, height:34, resizeMode: 'cover'}}  
                     source={{uri:`https:openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}} 
                     //resizeMode={'cover'}
                     />
                     <Text style ={styles.weatherType}>{weatherData.weather[0].main}</Text>
           
                   </View>
                 </View>
                </View>
                <View 
                   style={{
                     borderBottomColor : 'rgba(225,225,225, 0.7)',
                     borderBottomWidth : 1,
                    marginTop : 20}}
           
                />
                <View style={styles.bottomInforWrapper}>
                    <Footerinfo mainvalue = {weatherData.wind.speed.toFixed(2)} stylevalue = {weatherData.wind.speed.toFixed(2) / 2} />
                     <Footerinfo mainvalue = {Math.floor(weatherData.main.pressure/1000)} stylevalue = {Math.floor((weatherData.main.pressure / 1000)/2)} /> 
                     <Footerinfo mainvalue = {Math.floor(weatherData.main.humidity)} stylevalue = {Math.floor(weatherData.main.humidity)/2} /> 
                </View>
                
               </View>
           </ImageBackground>
           </View>
           
            
           
           </View>
           
              
   }



     

     <ScreenHeader onPress = {searchOnpress} />


      {/* Modal Section */}

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={()=>{setModalVisible(false);}} style={{flexDirection : 'row', width:'100%', justifyContent:'flex-end'}}>
            <Text>X</Text>
            </Pressable>
          <TextInput
            style={styles.input}
            onChangeText={handleOnTextChange}
            value={location}
            placeholder="Enter Country/City"
            // keyboardType="numeric"
           />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              //onPress={() => setModalVisible(!modalVisible)}
             
              onPress = {()=>handlePress(location)}
            >
              <Text style={styles.textStyle}>Search</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Loader */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={loaderVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ActivityIndicator />
        </View>
      </Modal>

     {/* <View
       style ={styles.indicatorWrapper}
     >
       {Locations.map((location, index) => {
         const width = scrollX.interpolate(
           {
             inputRage : [
               windowWidth * (index - 1),
               windowWidth * index,
               windowWidth * (index + 1)
             ], 
             outputRage :[5,12,5],
             extrapolate : 'clamp'
           }
         );
         return ( <Animated.View  key={index}
            style ={[styles.normalDot, {width}]}
         />)
      })}
     </View> */}
        
    </>
    )
}

const styles = StyleSheet.create({
    normalDot : {
      height: 5,
      width : 5,
      borderRadius : 4,
      marginHorizontal : 4,
      backgroundColor : '#fff'
    },
    indicatorWrapper : {
      position : 'absolute',
      top : 140,
      left : 20,
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : 'center'
    },
    topInforWrapper :{
      flex : 1,
      marginTop : 160,
      justifyContent : 'space-between'
    },
    bottomInforWrapper : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      marginVertical : 20
    },
    city : {
       color : '#fff',
       fontSize : 30,
       fontFamily : 'Lato-Regular',
       fontWeight : 'bold',
       
    },
    time : {
      color : '#fff',
      fontFamily : 'Lato-Regular',
      fontWeight : 'bold',
      marginTop : 5,
      marginBottom : 5
    },
    temparature : {
      color : '#fff',
      fontSize : 85,
      fontFamily : 'Lato-Light',
      //fontWeight : 'bold'
    },
    weatherType : {
      color : '#fff',
      fontSize : 25,
      fontFamily : 'Lato-Regular',
      fontWeight : 'bold',
      lineHeight : 34,
      marginLeft : 10
    },
    // infoText : {
    //   color : '#fff',
    //   fontSize : 14,
    //   fontFamily : 'Lato-Regular',
    //   fontWeight : 'bold'
    // },
    // infoBar : {
    //   width : 45,
    //   height:5,
    //   backgroundColor : 'rgba(225,225,225,0.5)'
    // },
    // appHearder : {
    //   position : 'absolute',
    //   top: 0,
    //   width : '100%',
    //   height : getStatusBarHeight() + 40,
    //   flexDirection : 'row',
    //   justifyContent : 'space-between',
    //   alignItems : 'flex-end',
    //   paddingHorizontal : 20
    // },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width : 350
    },
    button: {
      borderRadius: 10,
      padding: 10,
      width : 300,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width : 300,
      borderRadius : 10
    },
    degrees :{
      color : 'white',
      left : 70,
      top : 105,
      fontSize : 15,
      position : 'relative'
    }
  
  });