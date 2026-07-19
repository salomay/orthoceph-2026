import React from 'react';

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  _loginAuth,
  _loginAuthSosmed,
  _cekEmail,
  _addDoctorSosmed,
} from './networking/server';

import logo_icon from './../assets/logo.png';
import title_icon from './../assets/title.png';
import Permissions, {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';

// Settings.initializeSDK();

export default class FormLogin extends React.Component {
  constructor(props) {
    super(props);

    this.authCredentialListener = null;
    this.user = null;

  
  }

  state = {
    fullName: '',
    country: '',
    email: '',
    password: '',
    visible: false,
    isSigninInProgress: false,
    userInfo: {},
    position: null,
    credentialStateForUser: -1,
    latitude: null,
    longitude: null,
    address: null,
    checkAgreement: false,
  };

  componentDidMount() {
    // this.getPermission();
  }

  validationForm() {
    if (this.state.email === '') {
      Toast.show({
        type: 'info',
        text1: 'Information!',
        text2: 'Please input email!',
        autohide: true,
        visibilityTime: 2500,
      });
      return false;
    }

    if (this.state.password === '') {
      Toast.show({
        type: 'info',
        text1: 'Information!',
        text2: 'Please input password !',
        autohide: true,
        visibilityTime: 2500,
      });
      return false;
    }

    if (this.state.checkAgreement !== true) {
      Toast.show({
        type: 'info',
        text1: 'Information!',
        text2: 'Please Checked User Agreement!',
        autohide: true,
        visibilityTime: 2500,
      });
      return false;
    }

    return true;
  }

  AuthFunction = async () => {
    var data = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.validationForm()) {
      this.setState({
        visible: true,
      });

      _loginAuth(data)
        .then((result) => {
          if (result[0].jumlah > 0) {
            AsyncStorage.setItem('doctorId', '' + result[0].doctorid + '');
            AsyncStorage.setItem('fullName', '' + result[0].fullname + '');
            AsyncStorage.setItem('gender', '' + result[0].gender + '');
            AsyncStorage.setItem('country', '' + result[0].country + '');
            AsyncStorage.setItem('email', '' + result[0].email + '');
            // AsyncStorage.setItem('longitude', '' + result[0].longitude + '');
            // AsyncStorage.setItem('latitude', '' + result[0].latitude + '');

            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'FormPatientList'}],
              }),
            );

            this.setState({
              email: '',
              password: '',
            });
          } else {
            Toast.show({
              type: 'info',
              text1: 'No user with this email address',
              autohide: true,
              visibilityTime: 2500,
            });

            this.setState({
              visible: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);

          Toast.show({
            type: 'info',
            text1: 'Connection Failed',
            autohide: true,
            visibilityTime: 2500,
          });

          this.setState({
            visible: false,
          });
        });
    } else {
      this.setState({
        visible: false,
      });
    }
  };

  


  loginSosmedEmailRegistered = (data) => {
    _loginAuthSosmed(data)
      .then((result) => {
        console.log(JSON.stringify(result));

        if (result[0].jumlah > 0) {
          AsyncStorage.setItem('doctorId', '' + result[0].doctorid + '');
          AsyncStorage.setItem('fullName', '' + result[0].fullname + '');
          AsyncStorage.setItem('gender', '' + result[0].gender + '');
          AsyncStorage.setItem('country', '' + result[0].country + '');
          AsyncStorage.setItem('email', '' + result[0].email + '');
          AsyncStorage.setItem('longitude', '' + result[0].longitude + '');
          AsyncStorage.setItem('latitude', '' + result[0].latitude + '');

          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'FormPatientList'}],
            }),
          );

          this.setState({
            email: '',
            password: '',
          });
        } else {
          Toast.show({
            type: 'info',
            text1: 'No user with this email address',
            autohide: true,
            visibilityTime: 2500,
          });

          this.setState({
            visible: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);

        Toast.show({
          type: 'error',
          text1: 'Connection Failed' + error,
          autohide: true,
          visibilityTime: 2500,
        });

        this.setState({
          visible: false,
        });
      });
  };


  

  getPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });

      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        if (result == 'granted') {
          Geolocation.getCurrentPosition((info) => {
            this.setState(
              {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              },
              () => {
                console.log('longitude :' + this.state.longitude);
                console.log('latitude :' + this.state.latitude);
              },
            );
          });
        }
      });
    }

    if (Platform.OS === 'android') {
      let permition = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log('permission :' + permition);
      if (permition == 'granted') {
        Geolocation.getCurrentPosition((info) => {
          this.setState({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        });
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar
          animated={true}
          backgroundColor={'#093545'}
          hidden={false}
          barStyle="light-content"
        />

        <View style={styles.body}>
          <Image
            source={title_icon}
            style={{
              resizeMode: 'cover',
              width: wp(100),
              height: wp(15),
              zIndex: 0,
            }}></Image>

          <Image
            source={logo_icon}
            style={{
              resizeMode: 'contain',
              marginVertical: 20,
              width: wp(20),
              height: wp(15),
              zIndex: 0,
            }}></Image>
          <Toast />

          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              width: '90%',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'white'}
              maxLength={50}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.txtPassword.focus();
              }}
              blurOnSubmit={false}
              style={styles.textInput}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
              keyboardType="email-address"
            />

            <View style={{margin: 5}}></View>

            <TextInput
              placeholder="Password"
              placeholderTextColor={'white'}
              maxLength={50}
              ref={(input) => {
                this.txtPassword = input;
              }}
              onSubmitEditing={this.AuthFunction}
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              keyboardType="default"
            />
          </View>

          <View style={styles.viewBtn}>
            {this.state.visible === true ? (
              <View style={styles.customBtnBG}>
                <ActivityIndicator
                  animating={this.state.visible}
                  style={{alignSelf: 'center'}}
                  size="small"
                  color="#FFFFFF"
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => this.AuthFunction()}>
                <Text style={styles.txtMasuk}>LogIn</Text>
              </TouchableOpacity>
            )}

            {/* ========================================================== */}

            <View
              style={{
                width: '90%',
                marginTop: wp(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                style={{width: wp(6), height: wp(6)}}
                value={this.state.checkAgreement}
                onValueChange={(newValue) =>
                  this.setState({checkAgreement: newValue})
                }
                boxType={'square'}
                tintColor={'white'}
                onCheckColor={'white'}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: wp(3.5),
                  marginHorizontal: wp(2),
                  textAlign: 'justify',
                  fontWeight: '100',
                }}>
                {'Yes, I understand and agree to the '}
                <Text
                  style={{fontWeight: '400'}}
                  onPress={() =>
                    Linking.openURL(
                      'https://orthoceph-web.furnabel.com/term-condition/',
                    )
                  }>
                  {'OrthoCeph Terms of Service,'}
                </Text>

                <Text>{',including the '}</Text>
                <Text
                  style={{fontWeight: '400'}}
                  onPress={() =>
                    Linking.openURL(
                      'https://orthoceph-web.furnabel.com/privacy-policy-2/',
                    )
                  }>
                  {'User Agreement and Privacy Policy'}
                </Text>
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'white',
                borderBottomWidth: 0.5,
              }}
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FormRegistrasi')}>
              <Text
                style={{
                  color: 'white',
                  marginTop: 10,
                  alignSelf: 'center',
                  fontSize: wp(3),
                }}>
                Don't have account, please
                <Text style={{fontWeight: 'bold', fontSize: wp(3)}} oncl>
                  {' '}
                  SignUp
                </Text>
              </Text>
            </TouchableOpacity>
            {/* ========================================================== */}
          
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#093545',
    flexDirection: 'column',
    height: '100%',
  },
  containerLogo: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  style_logo: {
    width: 400,
    height: 400,
    alignSelf: 'flex-end',
    marginRight: -130,
    marginTop: -200,
  },
  textInput: {
    color: 'white',
    paddingLeft: wp(3),
    height: wp(12),
    fontSize: hp(2),
    borderWidth: 0.5,
    backgroundColor: '#224957',
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'rgba(52,52,52, 0.8)', // IOS
    shadowOffset: {height: 2, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 8, // Android
  },

  viewBtn: {
    marginTop: 10,
    width: wp(90),
  },

  txtMasuk: {
    fontSize: wp(3.2),

    color: '#fff',
  },

  customBtnBG: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34A853',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  txtBelum: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  txtSignIn: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: hp(5),
    justifyContent: 'center',
  },
});
