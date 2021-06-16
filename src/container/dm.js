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


class DirectMessage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      phoneNumber: '',
      callingCode: '91',
      cca2: 'IN',
    }
  }

  onSelect = (country) => {
    this.setState({
      callingCode: country.callingCode,
      cca2: country.cca2,
    });
  }


  render() {
    const { phoneNumber, cca2, callingCode } = this.state;
    return (


      <SafeAreaView style={styles.safearea}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <View style={styles.container}>
          <View style={styles.suncontainer}>
            <CountryPicker
              withFilter
              countryCode={cca2}
              withFlag
              withCallingCode
              onSelect={(country) => this.onSelect(country)}
            />
            <Text style={styles.textStyle}>{`+${callingCode}`}</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => this.setState({ phoneNumber: text })}
              placeholderTextColor='green'
              placeholder={'Enter your number'}
              style={styles.textInput}
              keyboardType="phone-pad"
              underlineColorAndroid='green'
            />
          </View>
          <Text style={styles.text}>{'Direct message via text and whatsapp'}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => openUrl(
              `sms:${callingCode+phoneNumber
              }`
            )}>
              <Image source={require('../assets/images/message.jpeg')} resizeMode='cover' style={styles.messageImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(
              `whatsapp://send?phone=${callingCode+phoneNumber
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

  safearea:{
    flex: 1, 
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 20,
    backgroundColor: 'black',
  },
  suncontainer:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  textInput: {
    borderBottomColor: 'white',
    color: 'red',
    left: 10,
    width: '100%',
    padding: 10,
    fontSize: 18,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    top: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 200,
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
  }

});

export default DirectMessage;
