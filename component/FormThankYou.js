import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity ,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import {_loginAuth} from './networking/server';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions  } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import checkmark from './../assets/checkmark.png';



export default class FormRegistrasi extends React.Component {

  constructor(props){
    super(props);
    
  }



  state = {
    email: '',
    password:'',
    visible:false,
   
    
  }



  render() {
    return (


<SafeAreaView style={styles.body}>

        <View style={{justifyContent:'center',alignItems:'center'}}>
           <Text style={{color:'white',fontSize:hp(7)}}>Thank You !</Text>
            <Image source={checkmark} style={{width:wp(30),height:hp(15),resizeMode:'cover',marginVertical:20}} ></Image>
        </View>
       

            <View style={{justifyContent:'center',flexDirection:'column',marginHorizontal:46}}>

                <Text style={{color:'white',fontSize:hp(2),textAlign:'justify'}}>Health is like money, We never have a true idea of its value until we lose it.</Text>


                <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('FormPatientList')} 
                    style={{width:'50%',alignSelf:'center',justifyContent:'center',backgroundColor:'#34A853',borderRadius:5,marginTop:30}}>
                    <Text style={{paddingVertical:10,textAlign:'center',color:'white',fontSize:hp(2)}}>Done</Text>
                </TouchableOpacity>

            </View>

           

</SafeAreaView>
    
   

    );
  }
}


const styles = StyleSheet.create({

  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#093545',
    flexDirection: 'column',
    
    
  }, 
  containerLogo:{
    flex:1,
    alignSelf:'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput :{
    color:'white',
    paddingLeft:10,
    marginVertical:5,
    height:50,
    fontSize:16,
    borderWidth:0.5,
    backgroundColor:'#224957',
    borderColor: "black",
    borderRadius:10,
    shadowColor: 'rgba(52,52,52, 0.8)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
     shadowOpacity: 1, // IOS
     shadowRadius: 1, //IOS
     elevation: 8, // Android
    
  },
 
 
 
  
});