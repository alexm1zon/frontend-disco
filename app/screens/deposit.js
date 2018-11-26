 import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Vibration,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { Camera, Permissions } from 'expo';
import RNPickerSelect from 'react-native-picker-select';

export default class Deposit extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      displayCamera: false,
      hasPicture: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      accountItems: [
          {
              label: 'Chequing - 64136167171',
              value: 'chequing',
          },
          {
              label: 'Savings - 95181167171',
              value: 'savings',
          }
      ],
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture () {
    Vibration.vibrate();
    Alert.alert('Captured!', '', [{ text: 'Okay', onPress: () => {this.setState({ displayCamera:false, hasPicture:true })} }]);
  }


  render() {
    if (this.state.displayCamera && this.state.hasCameraPermission)  {
        return (
          <View style={{ flex: 0.75 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
              </View>
            </Camera>
            <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.takePicture.bind(this)}
                underlayColor='#fff'>
                  <Text style={styles.buttonText}>Capture</Text>
              </TouchableHighlight>
            </View>
            </View>
        );
    } else {
      let pictureMock;
      if (this.state.hasPicture) {
        pictureMock = <Text style={{marginLeft:10, marginBottom:10}}> Attached: 8813631.jpeg </Text>
      }
      return (
        <View style={{ flex: 1 }}>
        <Text style={{marginTop:10, marginLeft:10}}>Deposit into account:</Text>
          <RNPickerSelect
              placeholder={{
                  label: 'Select Account',
                  value: null,
              }}
              items={this.state.accountItems}
              onValueChange={(value)=> console.log('Value is:', value)}
              onUpArrow={() => {
                  this.inputRefs.name.focus();
              }}
              onDownArrow={() => {
                  this.inputRefs.picker2.togglePicker();
              }}
              style={{ ...pickerSelectStyles }}
              value={this.state.accountType}
              ref={(el) => {
                  this.inputRefs.picker = el;
              }}
          />
          <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {this.setState({displayCamera:true})}}
              underlayColor='#fff'>
                <Text style={styles.buttonText}>Take picture of cheque</Text>
            </TouchableHighlight>
        </View>
        {pictureMock}
        <Text style={{marginTop:10, marginLeft:10}}> Enter amount: </Text>
        <TextInput
            style={pickerSelectStyles.inputIOS}
        />
        <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => Alert.alert('Cheque deposited!', '',[{ text: 'Okay', onPress: null }])}
            underlayColor='#fff'>
              <Text style={styles.buttonText}>Deposit cheque</Text>
          </TouchableHighlight>
        </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#2aa202',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 200
  },
  buttonText:{
    color:'#fff',
    fontSize: 15,
    textAlign:'center',
  }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
