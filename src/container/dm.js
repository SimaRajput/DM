import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { openUrl } from '../helper/openUrl';
import CountryPicker from 'react-native-country-picker-modal';
import * as RNLocalize from "react-native-localize";

class DirectMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      callingCode: '91',
      cca2: 'IN',
      countryName: '',
      countryCode: ''
    }
  }

  onSelect = (country) => {
    this.setState({
      callingCode: country.callingCode,
      cca2: country.cca2,
    });
  }
  
  componentDidMount() {
    this.getGeoInfo();
  }
  
  getGeoInfo = () => {
    return fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((json) => {
        let data = json;
        this.setState({
          countryName: data.country_code,
          countryCode: data.country_calling_code
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { phoneNumber, cca2, callingCode, countryName, countryCode } = this.state;
    
    console.log('data', countryCode, countryName)
    return (

      <SafeAreaView style={styles.safearea}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <View style={styles.container}>
          <View style={styles.suncontainer}>
            <View style={styles.topStyle}>
            <CountryPicker
              withFilter
              countryCode={cca2}
              withFlag
              withCallingCode
              onSelect={(country) => this.onSelect(country)}
            />
            
            <Text style={styles.textStyle}>{`+${callingCode}`}</Text>
            </View>
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => this.setState({ phoneNumber: text })}
              placeholderTextColor='white'
              placeholder={'Enter your number'}
              style={styles.textInput}
              keyboardType="phone-pad"
            />
          </View>
          <View style={{alignItems:'center'}}>
          <Image source={require('../assets/images/logo.png')} resizeMode='cover' style={[styles.image],{height: 150,
    width: 150,marginTop:50}} />
    </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => openUrl(
              `sms:${callingCode + phoneNumber
              }`
            )}>
              <Image source={require('../assets/images/message.jpeg')} resizeMode='cover' style={styles.messageImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(
              `tel:${callingCode + phoneNumber
              }`
            )}>
              <Image source={require('../assets/images/call.png')} resizeMode='cover' style={[styles.image],{height: 65,
    width: 65}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(
              `whatsapp://send?phone=${callingCode + phoneNumber
              }`
            )}>
              <Image source={require('../assets/images/whatsapp.png')} resizeMode='cover' style={styles.image} />
            </TouchableOpacity>
            
          </View>
        </View>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({

  safearea: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#003f5c',
  },
  suncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30,
    justifyContent:'center'
  },
  textInput: {
    width:"70%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    justifyContent:"center",
    padding:10,
    left: 8,
    color:'#fff',
    fontSize: 18
  },
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    top: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  messageImage: {
    height: 50,
    width: 50,
  },
  image: {
    height: 80,
    width: 80
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    right:4
  },
  topStyle:{
    backgroundColor:'#008080',
    flexDirection:'row',
    borderRadius:25,
    height:50,
    alignItems:'center',
    padding:5
  }

});

export default DirectMessage;
