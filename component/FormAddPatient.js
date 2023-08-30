import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {_addPatient, _addPatientNoImage} from './networking/server';
import {launchImageLibrary} from 'react-native-image-picker';

class FormProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: null,
      fullName: null,
      gender: null,
      race: null,
      email: null,
      loading: false,
      openGender: false,
      valueGender: null,
      dataGender: [],
      openRace: false,
      valueRace: null,
      dataRace: [],
      showBirthDate: false,
      birthDate: new Date(1598051730000),
      tempGambar: null,
      imageUri: null,
      imageType: null,
      imageFilename: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const doctorId = await AsyncStorage.getItem('doctorId');

    if (doctorId !== null) {
      this.setState({
        doctorId: doctorId,
      });
    }
  };

  setCountry = (e) => {
    this.setState({
      valueCountry: e.value,
      country: e.label,
    });
  };

  setGender = (e) => {
    this.setState({
      valueGender: e.value,
      gender: e.value,
      openGender: false,
    });
  };

  setRace = (e) => {
    this.setState({
      valueRace: e.value,
      race: e.value,
      openRace: false,
    });
  };

  uploadPhoto = () => {
    const options = {
      title: 'Foto Menu',
      takePhotoButtonTitle: 'Take photo with your camera',
      chooseFromLibraryButtonTitle: 'Choose photo from library',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        let source = {uri: response.assets[0].uri};

        this.setState({
          tempGambar: source,
          imageUri: response.assets[0].uri,
          imageType: response.assets[0].type,
          imageFilename: response.assets[0].fileName,
        });

        // console.log(response.data)
      }
    });
  };

  validationInput = () => {
    if (this.state.fullName == '' || this.state.fullName == null) {
      ToastAndroid.show('Require Full Name', ToastAndroid.SHORT);
      return false;
    } else if (this.state.gender == '' || this.state.gender == null) {
      ToastAndroid.show('Require Gender', ToastAndroid.SHORT);
      return false;
    } else if (this.state.race == '' || this.state.race == null) {
      ToastAndroid.show('Require Race', ToastAndroid.SHORT);
      return false;
    } else if (this.state.birthDate == '' || this.state.birthDate == null) {
      ToastAndroid.show('Require Birth Date', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  };

  savePatient = () => {
    this.setState({
      loading: true,
    });

    if (this.state.imageUri !== null && this.validationInput()) {
      const data = new FormData();
      data.append('fileImages', {
        uri: this.state.imageUri,
        type: this.state.imageType,
        name: this.state.imageFilename,
      });

      console.log(this.state.doctorId);

      data.append('doctorid', this.state.doctorId);
      data.append('fullname', this.state.fullName);
      data.append('race', this.state.race);
      data.append('gender', this.state.gender);
      data.append('birthdate', '' + this.state.birthDate + '');

      _addPatient(data)
        .then((result) => {
          console.log(result);

          if (result == 200) {
            ToastAndroid.show('Registration Successfully', ToastAndroid.SHORT);

            this.props.navigation.navigate('FormPatientList');

            this.setState({
              loading: false,
              fullName: null,
            });
          } else {
            ToastAndroid.show(
              'Input Patient Failed, Please Try Again!',
              ToastAndroid.SHORT,
            );
            this.setState({
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
          this.setState({
            loading: false,
          });
        });
    } else {
      let data = {
        doctorid: this.state.doctorId,
        fullname: this.state.fullName,
        race: this.state.race,
        gender: this.state.gender,
        birthdate: this.state.birthDate,
      };

      _addPatientNoImage(data)
        .then((result) => {
          console.log(result);
          if (result == 200) {
            ToastAndroid.show('Registration Successfully', ToastAndroid.SHORT);

            this.props.navigation.navigate('FormPatientList');

            this.setState({
              loading: false,
              fullName: null,
            });
          } else {
            ToastAndroid.show(
              'Input Patient Failed, Please Try Again!',
              ToastAndroid.SHORT,
            );
            this.setState({
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
          this.setState({
            loading: false,
          });
        });
    }
  };

  changeBirthdate = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      showBirthDate: false,
      birthDate: currentDate,
    });
  };

  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Appbar.Header
              style={{
                backgroundColor: '#637363',
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 5,
              }}>
              <Appbar.BackAction
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />

              <Appbar.Content
                title="Input new Patient"
                subtitle=""
                color="white"
                titleStyle={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              />
              <Appbar.Action />
            </Appbar.Header>

            <View style={styles.containerList}>
              <TouchableOpacity
                onPress={this.uploadPhoto}
                style={{alignSelf: 'center', marginLeft: 10}}>
                {this.state.tempGambar ? (
                  <Image
                    style={{width: 100, height: 100, borderRadius: 10}}
                    source={this.state.tempGambar}
                  />
                ) : (
                  <Image
                    style={{width: 100, height: 100, borderRadius: 10}}
                    source={require('./../img/iconUpload.png')}
                  />
                )}
              </TouchableOpacity>

              <View style={{margin: hp(1)}} />

              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <TextInput
                  value={this.state.fullName}
                  style={{
                    // height: wp(),
                    backgroundColor: '#224957',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    fontSize: wp(3),
                  }}
                  theme={{colors: {text: 'white'}}}
                  activeUnderlineColor="transparent"
                  placeholder="Full Name"
                  placeholderTextColor={'white'}
                  selectionColor="white"
                  maxLength={100}
                  onChangeText={(e) => this.setState({fullName: e})}
                />
                <View style={{margin: hp(1)}} />
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
                <View style={{margin: hp(1)}} />
                <DropDownPicker
                  containerStyle={{
                    height: wp(8),
                    borderRadius: 15,
                    backgroundColor: '#224957',
                    zIndex: 998,
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
                  placeholder="Race"
                  modalProps={{
                    animationType: 'fade',
                  }}
                  open={this.state.openRace}
                  value={this.state.valueRace}
                  items={[
                    {
                      label: 'American Indian or Alaska Native',
                      value: 'American Indian or Alaska Native',
                    },
                    {label: 'Asian', value: 'Asian'},
                    {
                      label: 'Black or African American',
                      value: 'Black or African American',
                    },
                    {label: 'Hispanic or Latino', value: 'Hispanic or Latino'},
                    {
                      label: 'Native Hawaiian or Other Pacific Islander',
                      value: 'Native Hawaiian or Other Pacific Islander',
                    },
                    {label: 'White', value: 'White'},
                  ]}
                  onPress={() =>
                    this.state.openRace
                      ? this.setState({openRace: false})
                      : this.setState({openRace: true})
                  }
                  setItems={(e) => this.setState({dataRace: e})}
                  onSelectItem={(e) => {
                    this.setRace(e);
                  }}
                />
                <View style={{margin: hp(1)}} />

                <TextInput
                  value={this.formatDate(this.state.birthDate)}
                  style={{
                    fontSize: wp(3),
                    height: wp(8),
                    backgroundColor: '#224957',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  theme={{colors: {text: 'white'}}}
                  activeUnderlineColor="transparent"
                  placeholder="Birth Date"
                  placeholderTextColor={'white'}
                  selectionColor="white"
                  maxLength={100}
                  onTouchStart={() => this.setState({showBirthDate: true})}
                />

                {this.state.showBirthDate && Platform.OS == 'android' ? (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.birthDate}
                      mode={'date'}
                      onChange={(x, y) => this.changeBirthdate(x, y)}
                    />
                  </>
                ) : null}

                {this.state.showBirthDate && Platform.OS == 'ios' ? (
                  <Modal visible={this.state.showBirthDate}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.birthDate}
                      display={Platform.OS == 'android' ? 'calendar' : 'inline'}
                      textColor="white"
                      mode={'date'}
                      style={{backgroundColor: 'white'}}
                      onChange={(x, y) => this.changeBirthdate(x, y)}
                    />
                  </Modal>
                ) : null}
              </View>
            </View>

            {this.state.loading === true ? (
              <View
                style={{
                  margin: 15,
                  backgroundColor: '#34A853',
                  borderRadius: 10,
                  zIndex: 1,
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
                style={{
                  margin: wp(4),
                  backgroundColor: '#34A853',
                  borderRadius: 10,
                  zIndex: -2,
                }}
                onPress={() => this.savePatient()}>
                <Text
                  style={{
                    fontSize: wp(3),
                    padding: 10,
                    color: 'white',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  Save Patient
                </Text>
              </TouchableOpacity>
            )}
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default FormProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
  },
  containerList: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
  },
});
