
import React,{Component } from 'react';
import {DevSettings,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './profile';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: true,
    }
    GoogleSignin.configure({
      androidClientId: '114112548611-4hpjlt0pe0rvpbk0ncjlkj3f66n4d0bc.apps.googleusercontent.com',
  });
}

componentDidMount() {
  this.firstLaunchCheck();
}

firstLaunchCheck = () => {
AsyncStorage.getItem("@_WhoPee_FirstLaunch").then(value => {
  console.log(" run  "+value)
  if (value === null) {
      console.log(" run  if "+value)
      //AsyncStorage.setItem("@_WhoPee_FirstLaunch","true");
      GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn().then( async (userInfo) => {
                    console.log(JSON.stringify(userInfo.user.photo))
                    await AsyncStorage.setItem("@_WhoPee_name",userInfo.user.givenName);
                    await AsyncStorage.setItem("@_WhoPee_photo",userInfo.user.photo);
                    await AsyncStorage.setItem("@_WhoPee_id",userInfo.user.id);
                    await  AsyncStorage.setItem("@_WhoPee_FirstLaunch",'false');
                    this.setState({firstLaunch:true})
                    DevSettings.reload();
          }).catch((e) => {console.log("ERROR IS: " + JSON.stringify(e));})
        }}).catch((e) => {console.log("ERROR IS: " + JSON.stringify(e));});
      
    }
  else {
    console.log(" run else  "+value)
    this.setState({firstLaunch:false})
  }
  });
}

  render(){
      if(!this.state.firstLaunch){
        return(<Profile/>);
      }

  }
}