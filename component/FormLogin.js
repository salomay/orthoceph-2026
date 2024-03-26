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
import {
  appleAuth,
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
// import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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

    GoogleSignin.configure({
      webClientId:
        '986260111827-4ndq4rv4qu2l6rva1l5rtgr8fuc37j4e.apps.googleusercontent.com',
    });
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

  AuthFunctionSosmed = async (email, fullName) => {
    var data = {
      email: email,
    };

    if (email != '') {
      this.setState({
        visible: true,
      });

      _cekEmail(data)
        .then(async (result) => {
          if (result[0].jumlah > 0) {
            this.loginSosmedEmailRegistered(data);
            this.setState({visible: false});
          } else {
            await fetch(
              'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                this.state.latitude +
                ',' +
                this.state.longitude +
                '&key=AIzaSyDeGUzsJoi2ZfqJ94UboxdFgG0KIxg8hcs',
            )
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(
                  'ADDRESS  => ' +
                    JSON.stringify(responseJson.results[0].formatted_address),
                );
                this.setState(
                  {
                    address: responseJson.results[0].formatted_address,
                  },
                  () => {
                    let data = {
                      email: email,
                      fullname: fullName,
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      address: this.state.address,
                    };

                    _addDoctorSosmed(data)
                      .then((result) => {
                        console.log('result :' + result);
                        if (result) {
                          AsyncStorage.setItem(
                            'doctorId',
                            '' + result.insertId + '',
                          );

                          AsyncStorage.setItem('email', '' + email + '');
                          AsyncStorage.setItem(
                            'longitude',
                            '' + this.state.longitude + '',
                          );
                          AsyncStorage.setItem(
                            'latitude',
                            '' + this.state.latitude + '',
                          );

                          Toast.show({
                            type: 'success',
                            text1: 'Registration Successfully',
                            autohide: true,
                            visibilityTime: 2500,
                          });

                          this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{name: 'FormPatientList'}],
                            }),
                          );

                          this.setState({
                            visible: false,
                            fullName: null,
                            email: null,
                            country: null,
                            password: null,
                            address: null,
                            latitude: null,
                            longitude: null,
                            country: null,
                            gender: null,
                          });
                        } else {
                          Toast.show({
                            type: 'success',
                            text1: 'Login Failed, Please Try Again!',
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
                          text1: 'LOG Error : ' + error,
                          autohide: true,
                          visibilityTime: 2500,
                        });

                        this.setState({
                          visible: false,
                        });
                      });
                  },
                );
              });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({visible: false});
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

  onAppleButtonPress = async () => {
    if (Platform.OS == 'ios') {
      // performs login request
      return await appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })
        .then((appleAuthRequestResponse) => {
          if (appleAuthRequestResponse) {
            const {identityToken, fullName} = appleAuthRequestResponse;
            const {email} = jwt_decode(identityToken);
            console.log('identityToken : ' + identityToken);
            console.log('fullName : ' + JSON.stringify(fullName.givenName));
            console.log('email : ' + email);
            this.AuthFunctionSosmed(email, fullName.givenName);
          }
        });
    } else {
      // Generate secure, random values for state and nonce
      const rawNonce = uuid();
      const state = uuid();

      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.orthoceph',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://myredirecturi.com',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,

        // Random nonce value that will be SHA256 hashed before sending to Apple.
        nonce: rawNonce,

        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        state,
      });

      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn();

      // Send the authorization code to your backend for verification
    }
  };

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Id : ' + userInfo.user.id);
      console.log('Name : ' + userInfo.user.name);
      console.log('Email : ' + userInfo.user.email);
      console.log('Photo : ' + userInfo.user.photo);
      console.log('Id Token : ' + userInfo.idToken);

      Geolocation.getCurrentPosition(
        (result) => {
          console.log('Latitude  :' + result.coords.latitude);
          console.log('Longitude :' + result.coords.longitude);

          this.AuthFunctionSosmed(userInfo.user.email, userInfo.user.name);
        },
        (error) =>
          Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        {enableHighAccuracy: true},
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign In cancel ' + error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('In Progress ' + error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Service ' + error.code);
      } else {
        console.log('ERROR : ' + JSON.stringify(error));
      }
    }
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
            {/* <GoogleSigninButton
              style={{
                width: '100%',
                height: wp(13),
                marginTop: 20,
              }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signInGoogle}
              disabled={this.state.isSigninInProgress}
            /> */}

            {/* <LoginButton
              style={{
                width: '98%',
                height: wp(11),
                alignSelf: 'center',
                marginTop: 10,
              }}
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    console.log(JSON.stringify(data));
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            /> */}

            {/* {Platform.OS == 'ios' ? (
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: '98%',
                  height: wp(11),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                onPress={() => this.onAppleButtonPress()}
              />
            ) : null} */}
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
