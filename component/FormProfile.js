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
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  appleAuth,
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

class FormProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      gender: null,
      country: null,
      email: null,
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
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    const appleSign = appleAuth.Operation.LOGOUT;

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
              value={this.state.gender}
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
