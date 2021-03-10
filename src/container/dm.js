/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import { openUrl } from '../helper/openUrl'


class DirectMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    }
  }


  render() {
    const { phoneNumber } = this.state;
    return (


      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <View style={styles.container}>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            placeholderTextColor={'gray'}
            placeholder={'e g +919864836495'}
            style={styles.textInput}
            keyboardType="phone-pad"
          />
          <Text style={styles.text}>{'Direct message via text and whatsapp'}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => openUrl(
              `sms:${phoneNumber
              }`
            )}>
              <Image source={require('../assets/images/message.jpeg')} resizeMode='cover' style={styles.messageImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(
              `whatsapp://send?phone=${phoneNumber
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
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: 'black',
  },

  textInput: {
    height: 50,
    borderBottomColor: 'white',
    borderWidth: 2,
    marginTop: 30,
    color: '#fff',
    fontSize: 22
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
  }

});

export default DirectMessage;
