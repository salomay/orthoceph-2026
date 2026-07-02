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
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


import {_deleteDoctor} from './networking/server';

class FormProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      gender: null,
      country: null,
      email: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const fullName = await AsyncStorage.getItem('fullName');
    const gender = await AsyncStorage.getItem('gender');
    const country = await AsyncStorage.getItem('country');
    const email = await AsyncStorage.getItem('email');

    if (fullName !== null) {
      this.setState({
        fullName: fullName,
        email: email,
        gender: gender,
        country: country,
      });
    }
  };

  logOut = async () => {
    try {

    
      AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() =>
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'login'}],
            }),
          ),
        );
    } catch (error) {
      console.error(error);
    }
  };

  deleteAccount = async () => {
    Alert.alert(
      'Information!',
      'Are you sure you want to remove your account?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            this.setState({
              loading: true,
            });

            var data = {
              email: this.state.email,
            };

            _deleteDoctor(data)
              .then((result) => {
                if (result == 200) {
                  Alert.alert('Information!', 'Delete Successfully');

                  this.logOut();
                } else {
                  Alert.alert(
                    'Failed!',
                    'Delete Account Failed, Please Try Again!',
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
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar animated={true} backgroundColor={'#637363'} hidden={false} barStyle='light-content' /> */}

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
            title="My Profile"
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
          <View style={{flexDirection: 'column', marginHorizontal: 10}}>
            <TextInput
              value={this.state.fullName}
              style={{
                height: hp(7),
                backgroundColor: '#637363',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
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

            <TextInput
              value={this.state.gender == 'M' ? 'Male' : 'Female'}
              style={{
                height: hp(7),
                backgroundColor: '#637363',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              theme={{colors: {text: 'white'}}}
              activeUnderlineColor="transparent"
              placeholder="Gender"
              placeholderTextColor={'white'}
              selectionColor="white"
              maxLength={100}
              onChangeText={(e) => this.setState({gender: e})}
            />

            <View style={{margin: hp(1)}} />

            <TextInput
              value={this.state.email}
              style={{
                height: hp(7),
                backgroundColor: '#637363',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              theme={{colors: {text: 'white'}}}
              activeUnderlineColor="transparent"
              placeholder="Email"
              placeholderTextColor={'white'}
              selectionColor="white"
              maxLength={100}
              onChangeText={(e) => this.setState({email: e})}
            />

            <View style={{margin: hp(1)}} />

            <TextInput
              value={this.state.country}
              style={{
                height: hp(7),
                backgroundColor: '#637363',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              theme={{colors: {text: 'white'}}}
              activeUnderlineColor="transparent"
              placeholder="Country"
              placeholderTextColor={'white'}
              selectionColor="white"
              maxLength={100}
              onChangeText={(e) => this.setState({country: e})}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{margin: 15, backgroundColor: '#34A853', borderRadius: 10}}
          onPress={() => ToastAndroid.show('Coming Soon', ToastAndroid.SHORT)}>
          <Text
            style={{
              padding: 10,
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Save Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.logOut()}>
          <Text style={{textAlign: 'center', color: 'white'}}>LogOut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.deleteAccount()}
          style={{position: 'absolute', bottom: wp(10), left: 0, right: 0}}>
          <Text style={{textAlign: 'center', color: 'grey'}}>
            Delete Account
          </Text>
        </TouchableOpacity>

        <ActivityIndicator
          animating={this.state.loading}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor:
              this.state.loading != true ? 'transparent' : 'black',
            opacity: 0.6,
            alignSelf: 'center',
            paddingVertical: 10,
            zIndex: this.state.loading != true ? -1 : 0,
          }}
          size="large"
          color="white"
        />
      </View>
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
  containerItem: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#224957',
  },
});
