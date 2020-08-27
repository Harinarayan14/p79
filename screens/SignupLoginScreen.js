import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,TextInput,Alert } from 'react-native';
import db from "../config";
import firebase from 'firebase';


export default class LoginScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      email:"",
      password:""
    }
  }

  userLogin=async(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      return(
      Alert.alert("User Login Successful")
      )
    })
    .catch((error)=>{
      var errorMessage = error.message;
      Alert.alert(errorMessage)

    })
  }
  userSignUp=async(email,password)=>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      return(
      Alert.alert(" User successfully created")
      )
    })
    .catch((error)=>{
      var errorMessage = error.message;
      Alert.alert(errorMessage)

    })
  }
  render(){
    return (
    <View>
    <Text style ={styles.head}> Barter System App</Text>
    <TextInput 
    placeholder="Email-Id"
    keyboardType="email-address"
    style={styles.textInput}
    onChangeText={(text)=>{
    this.setState({email:text})
    }}
      />
    <TextInput 
    placeholder="Password"
    secureTextEntry={true}
    style={styles.textInput}
    onChangeText={(text)=>{
    this.setState({password:text})
    }}
    />
    <TouchableOpacity style = {styles.button} 
    onPress={()=>{
    this.userLogin(this.state.email,this.state.password);
    }}>
      <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style = {styles.button}
    onPress={()=>{
    this.userSignUp(this.state.email,this.state.password);
    }}>
      <Text>Sign up</Text>
    </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
  head:{
    textAlign:"center",
    color:"green",
    fontSize:30,
    textDecorationLine:"underline"  ,
    marginTop:20  
  }
  ,
  textInput:{
   height:50,
   width:250,
   backgroundColor:"grey",
   borderRadius:20,
   margin:25
  },
  button:{
    height:30,
    width:200,
    margin:40,
    backgroundColor:"blue",
    borderRadius:20,
    textAlign:"center",
    color:"red"
  }
})

