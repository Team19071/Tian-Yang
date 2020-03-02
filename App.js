/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import { View, Image,AsyncStorage, TextBase,KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';
import {  createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {ActivityIndicator,
StatusBar
} from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

 import TcpSocket from 'react-native-tcp-socket';

var client = TcpSocket.createConnection({port:29999, host:"192.168.0.110"});
 
client.on('data', function(data) {
  console.log('message was received', data);
});
 
client.on('error', function(error) {
  console.log(error);
});



/*
  function name: Storeuser
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the user table.
  */
 function Storeuser(ID, EMAIL, PASSWORD, LEVEL,SECRET, CHATID){ 
  fetch('http://10.132.150.155:3000/sms/User', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  id: ID,

  email: EMAIL,

  password: PASSWORD,

  level: LEVEL,

  secret: SECRET,

  chatid: CHATID
})

});
} 
/*
  function name: Storeerror
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the errordata table.
*/
function Storeerror(ID, IP, DATA){ 
  fetch('http://localhost:3000/sms/Error', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  icobotid: IP,

  ip: IP,

  data: DATA
})

});
}
/*
  function name: Storecobot
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the cobot table.
*/
function Storecobot(IP, UNIT, USERID){ 
  fetch('http://localhost:3000/sms/Cobot', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  ip: IP,

  unit: UNIT,

  userid: USERID
})

});
}
/*
  function name: Getuser
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the user table.
*/
function Getuser(){
  fetch('http://10.132.150.155:3000/User')
  .then((data) => {
    return data.json();
  })
  .then((response) => {
      console.log("success: ", response);
      return response;
      
  })
  .catch((error) => {
      console.warn("error: "+error);
      //return error;
  })
  return xx;
  
}


/*
  function name: GetError
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the error table.
*/
function GetError(){
  fetch('http://localhost:3000/Error')
  .then((data) => {

    return data.json();
  })
  .then((response) => {
      console.log("success: ", response);
      
  })
  .catch((error) => {
      console.warn("error: "+error);
  })
  
}
/*
  function name: Getcobot
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the cobot table.
*/
function GetCobot(){
  fetch('http://localhost:3000/Cobot')
  .then((data) => {

    return data.json();
  })
  .then((response) => {
      console.log("success: ", response);
      
  })
  .catch((error) => {
      console.warn("error: "+error);
  })

}
/*
TK end
*/









/*
  function name: HomeScreen
  Developed by Tian Yang. ////
  this function is used to HOME GUI.

  log in part
  */


const userInfo={username:'Admin',password:'12345'}

class HomeScreen extends Component{
  static navigationOptions={
    headerShown:false
  }

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  render(){
    return(
        <View style={styles.container}>
         <Image style={{width: 200, height: 50,marginBottom:30}}
          source={require('./images/tag.png')}  />
          
          
            <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Username"
            onChangeText={(username)=>this.setState({username})}
            value={this.state.username}
            placeholderTextColor="#ffffff"
            />

            <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            onChangeText={(password)=>this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            />

            <TouchableOpacity style={styles.button}
                // onPress={()=> this.props.navigation.navigate('Details')}
                onPress={this._login}
            >
                <Text style={styles.buttonText}>{this.props.type} Login</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}> Don't have an account yet?</Text>
           <TouchableOpacity onPress={this._register}><Text style={styles.signupButton}> Register</Text></TouchableOpacity>  

            <TouchableOpacity onPress={this._forgot}><Text style={styles.signupButton}> Forgot Password?</Text></TouchableOpacity>  


        </View>
    );
  }
/*
  function name: HomeScreen
  Developed by Tian Yang. ////
  this function is used to validation log in.

  log in part
  */

   _forgot=async()=>{
    this.props.navigation.navigate('Reset');
   }

   _login=async()=>{
    
      fetch('http://10.132.150.155:3000/User')
      .then((data) => {
        return data.json();
      })
      .then((response) => {
          for(let index = 0; index < response.length;index++){
       

        // if(response[index]["UserID"]!= this.state.username||response[index]["Password"]!= this.state.password){
        //  alert("Wrong username or password!");
        //    //break;
        //  }

      if(response[index]["UserID"]=== this.state.username&&response[index]["Password"] === this.state.password){
          this.props.navigation.navigate('Details');
          return response;
         }
             }

             alert("Wrong username or password!");
            
          return response;
          
      })
      .catch((error) => {
          console.warn("error: "+error);
          //return error;
      })
      
     
   }

/*
  function name: HomeScreen
  Developed by Tian Yang. ////
  this function is used to change navagatiom to register.

  log in part
  */
   _register=async()=>{
      this.props.navigation.navigate('Register');
   }

}

/*
  function name: DetailScreen
  Developed by Tian Yang. ////
  this function is used to change DetailScreen.

  */

class DetailsScreen extends Component {
  static navigationOptions={
    title:'19071'
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Remote Cobot Page</Text>
        <Button onPress={this._logout} title="Logout"/>
        
      </View>
    );
  }


/*
  function name: DetailScreen
  Developed by Tian Yang. ////
  this function is used to log out.

  */
_logout=async()=>{

  const asyncStorageKeys = await AsyncStorage.getAllKeys();

  if (asyncStorageKeys.length > 0) {
  AsyncStorage.clear();
}
 // await AsyncStorage.clear();
  this.props.navigation.navigate('Auth');
}


}

class ResetScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      answer:'',
      emailname:''
    }
  }
    render() {
      return (
        <View style={styles.container}>
          <Text>Forget Password Screen</Text>
          
          <TextInput style={styles.inputBox} 
             underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="What is your Email Address?"
              onChangeText={(emailname)=>this.setState({emailname})}
              value={this.state.emailname}
              placeholderTextColor="#ffffff"
              />
          <TextInput style={styles.inputBox} 
             underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="In what city were you born?"
              onChangeText={(answer)=>this.setState({answer})}
              value={this.state.answer}
              placeholderTextColor="#ffffff"
              />
             <Button onPress={this._check} title="Submit"/>
             </View>
    );
  }


/*
  function name: check
  Developed by Tian Yang. ////
  this function is answer question and get the password.

  */

  _check=async()=>{
    
    fetch('http://10.132.150.155:3000/User')
    .then((data) => {
      return data.json();
    })
    .then((response) => {
        for(let index = 0; index < response.length;index++){
      if(response[index]["Secret"]=== this.state.answer&&response[index]["Email"]=== this.state.emailname){
        alert("your password is "+ response[index]["Password"]);
        return response;
      }
           }
      
         alert("your email or secret answer wrong!");
         return response;
         
       
        
    })
    .catch((error) => {
        console.warn("error: "+error);
        //return error;
    })
    

}
}
/*
  function name: Register
  Developed by Tian Yang. ////
  this function is used to register.

  */
class RegisterScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      newname:'',
      emailaddress:'',
      secret:'',
      level:'',
      teleg:'',
      newpassword:'',
      confirmpassword:''
    }
  }
  
  render() {
    return (
      
   <View style={styles.containerop}>
     <KeyboardAvoidingView behavior="position">
        <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Username"
            onChangeText={(newname)=>this.setState({newname})}
            value={this.state.newname}
            placeholderTextColor="#ffffff"
            />

          <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email Address"
            onChangeText={(emailaddress)=>this.setState({emailaddress})}
            value={this.state.emailaddress}
            placeholderTextColor="#ffffff"
            />

            <TextInput style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="In what city were you born?"
            onChangeText={(secret)=>this.setState({secret})}
            value={this.state.secret}
            placeholderTextColor="#ffffff"
            />


          <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="What is your permission level?"
            onChangeText={(level)=>this.setState({level})}
            value={this.state.level}
            placeholderTextColor="#ffffff"
            />
          <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="What is your Telegram chat ID?"
            onChangeText={(teleg)=>this.setState({teleg})}
            value={this.state.teleg}
            placeholderTextColor="#ffffff"
            />



            <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            onChangeText={(newpassword)=>this.setState({newpassword})}
            value={this.state.newpassword}
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            />

            <TextInput style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="ConfirmPassword"
            onChangeText={(confirmpassword)=>this.setState({confirmpassword})}
            value={this.state.confirmpassword}
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            />
           </KeyboardAvoidingView>
           <TouchableOpacity style={styles.button}
                // onPress={()=> this.props.navigation.navigate('Details')}
                onPress={this._submit}
            >
            <Text style={styles.buttonText}>{this.props.type} Submit</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}> Already have an account yet?</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}><Text style={styles.signupButton}> Sign In</Text></TouchableOpacity>  




      </View>
    );
  }
/*
  function name: Register
  Developed by Tian Yang. ////
  this function is used to register.

  */


  _submit=async()=>{

    if(this.state.newname!=''&&this.state.emailaddress!=''&&this.state.newpassword!=''&&this.state.level!=''&&this.state.secret!=''&&this.state.teleg!=''){
    if(this.state.confirmpassword===this.state.newpassword){
      Storeuser(this.state.newname,this.state.emailaddress,this.state.newpassword,this.state.level,this.state.secret,this.state.teleg);
     //await AsyncStorage.setItem('isLoggedIn','1')
     alert('Register successfully! Please back to Log in')
     this.props.navigation.navigate('Home');
    }

    else if(this.state.confirmpassword!=this.state.newpassword){
      alert(" two password is not the same!");
    }
  }

  else{
    alert("Please fill all blank inputbox!");
  }

   
 
  }


}


const RootStack = createStackNavigator({
  Home:HomeScreen,                       ///////add this becuase nav bar return to logged in
  /////// have to make sure the logged in is work.
  
  Register:RegisterScreen,
  Details:DetailsScreen,
  Reset:ResetScreen
},
//{
  //initialRouteName:'Home'
//}
);




const AuthStack=createStackNavigator({Home:HomeScreen});


/*
  function name: AuthLoadingScreen
  Developed by Tian Yang. ////
  this function is used to validation log in.

  log in part
  */

class AuthLoadingScreen extends Component{
  constructor(props){
    super(props);
    this._loadData();
  }

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }

  /*
  function: keep the app logged status
  Developed by Tian Yang. ////
  

  */

  _loadData=async()=>{
    const isLoggedIn=await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn!=='1'?'Auth':'App');
  }
}

const AppContainer = createAppContainer(RootStack); 


/*
  function name: createAppContainer
  Developed by Tian Yang. ////
  this function is used to main UI
  */


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
/*
  
  Developed by Tian Yang.   ////
  this function is used to design the GUI.

  */


const styles =StyleSheet.create({
    container:{
      backgroundColor:'#455a64',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },

    containerop:{
      backgroundColor:'#455a64',
      flex:1,
      alignItems:'center',
    },

    inputBox:{
        width:300,
        height:40,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical:9
    },
    
    buttonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:"center"
    },

    button:{
        backgroundColor:'#1c313a',
        width:300,
        paddingVertical:12,
        marginVertical:10,
        borderRadius:25
    }



});




/////end 
///