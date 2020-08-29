import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      age: '',
      address: '',
      phoneNumber: '',
      confirmPassword: '',
      modalIsVisible: false,
      userName: '',
    };
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return Alert.alert('Sign In Successful');
      })
      .catch((error) => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  signUp = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert('Check your password.');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          db.collection('Users').doc(this.state.userName).set({
            Name: this.state.name,
            Address: this.state.address,
            Age: this.state.age,
            Contact_Number: this.state.phoneNumber,
            Email_Address: this.state.email,
            Username: this.state.userName,
          });
          return Alert.alert('Created an account Successfully', '', 
          [{
            text: 'Ok', onPress:()=>{
              this.setState({
                modalIsVisible:false
              })
            }
          }]);
        })
        .catch((error) => {
          var errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.modalIsVisible}>
      <ScrollView style={{ width: '100%' }}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.head}>Registration</Text>
          <TextInput
            placeholder="Name"
            keyboardType="default"
            maxLength={20}
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          />
          <TextInput
            placeholder="Address"
            keyboardType="default"
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
          />
          <TextInput
            placeholder="Contact Number"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ phoneNumber: text });
            }}
          />
          <TextInput
            placeholder="Email-Id"
            keyboardType="email-address"
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            placeholder="Username"
            keyboardType="default"
            maxLength={20}
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ userName: text });
            }}
          />
          <TextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
            maxLength={12}
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            placeholder="Confirm Password"
            keyboardType="default"
            secureTextEntry={true}
            maxLength={12}
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
          />
          <View>
            <TouchableOpacity style={styles.button} 
            onPress={()=>{
              this.setState({
                modalIsVisible:false
              })
            }}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.signUp(
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword
                );
              }}>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>;
  };

  render() {
    return (
      <View>
        <View>
      {this.showModal()}
      </View>
        <Text style={styles.head}> Barter System App</Text>
        <TextInput
          placeholder="Email-Id"
          keyboardType="email-address"
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.signIn(this.state.email, this.state.password);
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              modalIsVisible: true,
            });
          }}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 30,
    textDecorationLine: 'underline',
  },
  textInput: {
    height: 50,
    width: 250,
    backgroundColor: '#7FC0FA',
    borderRadius: 20,
    margin: 25,
  },
  button: {
    height: 30,
    width: 200,
    margin: 40,
    backgroundColor: '#7DF0D1',
    borderRadius: 20,
    textAlign: 'center',
  },
});
