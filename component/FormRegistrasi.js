import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import {_viewCountries, _addDoctor, _cekEmail} from './networking/server';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from '@react-native-community/geolocation';
import {Appbar} from 'react-native-paper';
import title_icon from './../assets/title.png';
import logo_icon from './../assets/logo.png';
import Permissions, {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export default class FormRegistrasi extends React.Component {
  constructor(props) {
    super(props);
    DropDownPicker.setMode('SIMPLE');
  }

  state = {
    doctorId: '',
    fullName: '',
    gender: '',
    country: '',
    address: '',
    email: '',
    password: '',
    loading: false,
    openCountry: false,
    valueCountry: null,
    dataCountry: [],
    openGender: false,
    valueGender: null,
    dataGender: [],
    latitude: null,
    longitude: null,
  };

  setCountry = (e) => {
    this.setState({
      valueCountry: e.value,
      country: e.label,
      openCountry: false,
    });
  };

  setGender = (e) => {
    this.setState({
      valueGender: e.value,
      gender: e.value,
      openGender: false,
    });
  };

  componentDidMount() {
    this.viewCountries();
    this.getPermission();
  }

  getPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'always',
      });

      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        console.log(result);
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
        } else {
          Alert.alert('Information', 'Please Turn On your GPS!!');
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

  viewCountries = async () => {
    let data = {};
    await _viewCountries(data)
      .then((result) => {
        if (result) {
          let data_countries = [];
          for (let i = 0; i < result.length; i++) {
            let bantu_country = {
              label: result[i].country_name,
              value: result[i].country_id,
            };
            data_countries.push(bantu_country);
          }

          this.setState({
            dataCountry: data_countries,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validationInput = () => {
    if (this.state.fullName == '' || this.state.fullName == null) {
      {
        Platform.OS == 'android'
          ? ToastAndroid.show('Require Full Name', ToastAndroid.SHORT)
          : Alert.alert('Information', 'Require Full Name');
      }
      this.setState({
        loading: false,
      });

      return false;
    } else if (this.state.email == '' || this.state.email == null) {
      {
        Platform.OS == 'android'
          ? ToastAndroid.show('Require Email', ToastAndroid.SHORT)
          : Alert.alert('Information', 'Require Email');
      }
      this.setState({
        loading: false,
      });

      return false;
    } else if (this.state.password == '' || this.state.password == null) {
      {
        Platform.OS == 'android'
          ? ToastAndroid.show('Require Password', ToastAndroid.SHORT)
          : Alert.alert('Information', 'Require Password');
      }

      this.setState({
        loading: false,
      });

      return false;
    } else {
      return true;
    }
  };

  registrasi = async () => {
    this.setState({
      loading: true,
    });

    if (this.state.latitude && this.validationInput()) {
      let data = {
        email: this.state.email,
      };
      _cekEmail(data)
        .then(async (result) => {
          if (result[0].jumlah > 0) {
            Alert.alert('Warning!', 'Email Has Been Registered');
            this.setState({loading: false});
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
                      fullname: this.state.fullName,
                      email: this.state.email,
                      country: this.state.country,
                      password: this.state.password,
                      gender: this.state.gender,
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      address: this.state.address,
                    };

                    _addDoctor(data)
                      .then((result) => {
                        if (result) {
                          AsyncStorage.setItem(
                            'doctorId',
                            '' + result.insertId + '',
                          );
                          AsyncStorage.setItem(
                            'fullName',
                            '' + this.state.fullName + '',
                          );
                          AsyncStorage.setItem(
                            'gender',
                            '' + this.state.gender + '',
                          );
                          AsyncStorage.setItem(
                            'country',
                            '' + this.state.country + '',
                          );
                          AsyncStorage.setItem(
                            'email',
                            '' + this.state.email + '',
                          );
                          AsyncStorage.setItem(
                            'longitude',
                            '' + this.state.longitude + '',
                          );
                          AsyncStorage.setItem(
                            'latitude',
                            '' + this.state.latitude + '',
                          );

                          {
                            Platform.OS == 'android'
                              ? ToastAndroid.show(
                                  'Registration Successfully',
                                  ToastAndroid.SHORT,
                                )
                              : Alert.alert(
                                  'Information',
                                  'Registration Successfully',
                                );
                          }

                          this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{name: 'FormPatientList'}],
                            }),
                          );

                          this.setState({
                            loading: false,
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
                          {
                            Platform.OS == 'android'
                              ? ToastAndroid.show(
                                  'Login Failed, Please Try Again!',
                                  ToastAndroid.SHORT,
                                )
                              : Alert.alert(
                                  'Information',
                                  'Login Failed, Please Try Again!',
                                );
                          }

                          this.setState({
                            loading: false,
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);

                        // ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
                        this.setState({
                          loading: false,
                        });
                      });
                  },
                );
              });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({loading: false});
        });
    } else {
      this.getPermission();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.body}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <>
          <Appbar.Header
            style={{
              backgroundColor: '#637363',
              borderRadius: 10,
              marginTop: 5,
              zIndex: 9999,
              height: 'auto',
            }}>
            <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />

            <Appbar.Content
              title="Registration Users"
              subtitle=""
              color="white"
              titleStyle={{
                fontSize: wp(3.4),
                fontWeight: 'bold',
                textAlign: 'center',
                // marginLeft: Platform.OS == 'ios' ? 0 : -60,
              }}
            />

            <Appbar.Action />
          </Appbar.Header>

          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              marginHorizontal: 15,
              marginTop: wp(10),
            }}>
            <Text
              style={{alignSelf: 'flex-end', color: 'white', fontSize: wp(3)}}>
              {'(required)'}
            </Text>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={'white'}
              maxLength={50}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.txtPassword.focus();
              }}
              blurOnSubmit={false}
              style={styles.textInput}
              onChangeText={(text) => this.setState({fullName: text})}
              value={this.state.fullName}
            />

            <View style={{marginVertical: 5}} />
            <Text
              style={{alignSelf: 'flex-end', color: 'white', fontSize: wp(3)}}>
              {'(optional)'}
            </Text>
            <DropDownPicker
              containerStyle={{
                height: wp(8),
                borderRadius: 15,
                backgroundColor: '#224957',
                zIndex: 999,
              }}
              style={{
                backgroundColor: '#224957',
                minHeight: wp(8),
              }}
              listItemContainerStyle={{
                backgroundColor: '#088A85',
              }}
              textStyle={{
                color: 'white',
                fontSize: wp(3.5),
              }}
              placeholder="Gender"
              modalProps={{
                animationType: 'fade',
              }}
              open={this.state.openGender}
              value={this.state.valueGender}
              items={[
                {
                  label: 'Male',
                  value: 'M',
                },
                {
                  label: 'Female',
                  value: 'F',
                },
              ]}
              onPress={() =>
                this.state.openGender
                  ? this.setState({openGender: false})
                  : this.setState({openGender: true})
              }
              setItems={(e) => this.setState({dataGender: e})}
              onSelectItem={(e) => {
                this.setGender(e);
              }}
            />

            <View style={{marginVertical: 5}} />
            <Text
              style={{alignSelf: 'flex-end', color: 'white', fontSize: wp(3)}}>
              {'(optional)'}
            </Text>
            <DropDownPicker
              containerStyle={{
                height: wp(8),
                borderRadius: 15,
                backgroundColor: '#224957',
                zIndex: 99,
              }}
              style={{
                backgroundColor: '#224957',
                minHeight: wp(8),
              }}
              listItemContainerStyle={{
                backgroundColor: '#088A85',
              }}
              textStyle={{
                color: 'white',
                fontSize: wp(3.5),
              }}
              placeholder="Country"
              modalProps={{
                animationType: 'slide',
              }}
              open={this.state.openCountry}
              value={this.state.valueCountry}
              items={this.state.dataCountry}
              onPress={() => {
                this.state.openCountry
                  ? this.setState({openCountry: false})
                  : this.setState({openCountry: true});
              }}
              setItems={(e) => this.setState({dataGender: e})}
              onSelectItem={(e) => {
                this.setCountry(e);
              }}
              searchPlaceholder="Search Your Country"
              searchable={true}
              autoScroll={true}
            />

            <View style={{marginVertical: 5}} />
            <Text
              style={{alignSelf: 'flex-end', color: 'white', fontSize: wp(3)}}>
              {'(required)'}
            </Text>
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
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <View style={{marginVertical: 5}} />
            <Text
              style={{alignSelf: 'flex-end', color: 'white', fontSize: wp(3)}}>
              {'(required)'}
            </Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'white'}
              maxLength={50}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.txtPassword.focus();
              }}
              style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
            />

            {this.state.loading === true ? (
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#34A853',
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <ActivityIndicator
                  animating={this.state.loading}
                  style={{alignSelf: 'center', paddingVertical: 10}}
                  size="small"
                  color="white"
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => this.registrasi()}
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#34A853',
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    textAlign: 'center',
                    color: 'white',
                    fontSize: hp(2),
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
  },
  containerLogo: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: 'white',
    paddingLeft: 10,
    height: hp(6),
    fontSize: wp(3.5),
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
});
