import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  RefreshControl,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import patientPhoto from './../assets/patientPhoto.png';
import {
  _viewPatientPagination,
  _viewPatient,
  _delPatient,
  _openImage,
} from './networking/server';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ListPatient = ({item, navigation, index, _deletePatient}) => {
  var urlImage = {uri: _openImage(item[index].photo)};
  if (item[index].photo === null || item[index].photo === '') {
    urlImage = require('./../img/no_data.png');
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  };

  return (
    <View style={styles.containerList}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: 10,
          marginHorizontal: 15,
          flexShrink: 1,
        }}>
        <Image
          source={urlImage}
          style={{
            resizeMode: 'cover',
            width: wp(25),
            height: wp(25),
            borderRadius: 50,
          }}></Image>
        <View style={{flexDirection: 'column', marginHorizontal: wp(4)}}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: 'bold',
              color: 'white',
              paddingVertical: 2,
              flexWrap: 'wrap',
            }}>
            {item[index].fullname}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: '600',
              color: '#FFD7A3',
              paddingVertical: 2,
              fontStyle: 'italic',
            }}>
            {item[index].gender != 'M'
              ? 'Female'
              : 'Male' + ' / ' + item[index].ageInYears + 'Y'}
          </Text>
          <Text
            style={{
              fontSize: hp(1.2),
              fontWeight: '600',
              color: '#9C9C9C',
              paddingVertical: 2,
            }}>
            {formatDate(item[index].birthdate)}
          </Text>
          <Text
            style={{
              fontSize: hp(1.3),
              fontWeight: '600',
              color: '#FF6787',
              paddingVertical: 2,
            }}>
            {'Notes'}
          </Text>
        </View>
      </View>

      <View style={{margin: 15, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{backgroundColor: '#34A853', borderRadius: 10, flex: 1}}
          onPress={() =>
            navigation.navigate('FormPatient', {
              doctorId: item[index].doctorid,
              patientId: item[index].patientid,
              fullName: item[index].fullname,
              gender: item[index].gender,
              birthDate: item[index].birthdate,
              race: item[index].race,
              ageInYears: item[index].ageInYears,
              urlImage: urlImage,
            })
          }>
          <Text
            style={{
              padding: 10,
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            View Worksheet
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 10}}
        onPress={() => _deletePatient(item[index].patientid)}>
        <Fontisto name="close" size={wp(5)} color={'white'}></Fontisto>
      </TouchableOpacity>
    </View>
  );
};

class FormSearchPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: null,
      DataPatient: [],
      isRefreshing: false,
      page: 0,
      txtSearch: '',
      enableSearch: false,
      loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    // this._refreshData();
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //   this._refreshData();
    });
  }

  _refreshDataPagination = () => {
    // this.setState({isRefreshing : true});

    AsyncStorage.getItem('doctorId')
      .then((val) => {
        if (val != null) {
          this.setState({
            doctorId: val,
          });
          var data = {
            doctorid: val,
            page: this.state.page,
            search: this.state.txtSearch,
            // kategori_menu: this.state.selectedKategori,
            // sorter: this.state.selectedSorter,
          };

          _viewPatientPagination(data)
            .then((result) => {
              if (result.length > 0) {
                this.setState({
                  DataPatient: this.state.DataPatient.concat(result),
                  page: this.state.page + 1,
                });
              } else {
                this.setState({page: this.state.page + 1});
              }

              // this.setState({isRefreshing : false});
            })
            .catch((error) => {
              console.log(error);
              this.setState({DataPatient: []});
              // this.setState({isRefreshing : false});
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _refreshData = () => {
    // this.setState({isRefreshing : true});

    AsyncStorage.getItem('doctorId')
      .then((val) => {
        if (val != null) {
          this.setState({
            doctorId: val,
          });
          var data = {
            page: 0,
            doctorid: val,
            search: this.state.txtSearch,
            // kategori_menu: this.state.selectedKategori,
            // sorter: this.state.selectedSorter,
          };

          _viewPatientPagination(data)
            .then((result) => {
              if (result.length > 0) {
                this.setState({DataPatient: result, page: this.state.page + 1});
              } else {
                this.setState({DataPatient: [], loading: false});
              }

              // this.setState({isRefreshing : false});
            })
            .catch((error) => {
              console.log(error);
              this.setState({DataPatient: [], loading: false});
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _deletePatient = (patientid) => {
    Alert.alert('Warning', 'Are you sure want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          var data = {
            patientid: patientid,
          };

          _delPatient(data)
            .then((result) => {
              console.log(result);
              if (result == 200) {
                ToastAndroid.show('Delete Patient Success', ToastAndroid.SHORT);
                this.setState({
                  DataPatient: [],
                  page: 0,
                });
                this._refreshDataPagination();
              } else {
                ToastAndroid.show('Failed Delete Patient', ToastAndroid.SHORT);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    ]);
  };

  searchPatient = (val) => {
    this.setState({txtSearch: val, loading: true}, () => {
      this._refreshData();
    });
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
          <TextInput
            maxLength={50}
            value={this.state.txtSearch}
            onChangeText={(val) => this.searchPatient(val)}
            placeholder="Search"
            underlineColor="white"
            activeUnderlineColor="white"
            style={{
              height: wp(10),
              width: '90%',
              color: 'white',
              fontSize: wp(5),
              backgroundColor: 'transparent',
            }}></TextInput>
        </Appbar.Header>

        {this.state.DataPatient.length > 0 ? (
          <VirtualizedList
            onEndReachedThreshold={1}
            onEndReached={({distanceFromEnd}) => {
              this._refreshDataPagination();
              //console.log('on end reached ', distanceFromEnd)
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
              />
            }
            contentContainerStyle={{paddingBottom: '80%'}}
            data={this.state.DataPatient}
            getItemCount={(item) => item.length}
            getItem={(item, index) => item}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ListPatient
                navigation={this.props.navigation}
                item={item}
                index={index}
                _deletePatient={this._deletePatient}
              />
            )}
          />
        ) : (
          <>
            <ActivityIndicator
              animating={this.state.loading}
              style={{alignSelf: 'center'}}
              size="large"
              color="white"
            />
          </>
        )}
      </View>
    );
  }
}

export default FormSearchPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
  },
  containerList: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
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
