import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  set_patientid,
  set_doctorid,
  set_fullname,
  set_birthdate,
  set_gender,
  set_race,
  set_photo,
  set_ageinyears,
  set_step,
} from './../component/actions/variabel';
import {generateTableCompHtml} from './common/Utils';
import {_viewResultAnalysis} from './networking/server';

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
};

class FormCephalometric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: null,
      doctorId: null,
      fullName: null,
      gender: null,
      birthDate: null,
      photo: null,
      race: null,
      ageInYears: null,
    };
  }

  componentDidMount() {
    const {
      patientId,
      doctorId,
      fullName,
      ageInYears,
      birthDate,
      photo,
      gender,
      race,
    } = this.props.route.params;
    if (fullName) {
      this.setState({
        doctorId: doctorId,
        patientId: patientId,
        fullName: fullName,
        birthDate: birthDate,
        photo: photo,
        gender: gender,
        ageInYears: ageInYears,
        race: race,
      });
    }
  }

  componentWillUnmount() {}

  analysisOne = () => {
    this.props.set_doctorid(this.state.doctorId);
    this.props.set_patientid(this.state.patientId);
    this.props.set_fullname(this.state.fullName);
    this.props.set_gender(this.state.gender);
    this.props.set_birthdate(this.state.birthDate);
    this.props.set_photo(this.state.photo);
    this.props.set_ageinyears(this.state.ageInYears);
    this.props.set_race(this.state.race);
    this.props.set_step(1);

    this.props.navigation.navigate('FormCephalometricAnalysis');
  };

  analysisTwo = () => {
    this.props.set_doctorid(this.state.doctorId);
    this.props.set_patientid(this.state.patientId);
    this.props.set_fullname(this.state.fullName);
    this.props.set_gender(this.state.gender);
    this.props.set_birthdate(this.state.birthDate);
    this.props.set_photo(this.state.photo);
    this.props.set_ageinyears(this.state.ageInYears);
    this.props.set_race(this.state.race);
    this.props.set_step(2);

    this.props.navigation.navigate('FormCephalometricAnalysis');
  };

  analysisThree = () => {
    this.props.set_doctorid(this.state.doctorId);
    this.props.set_patientid(this.state.patientId);
    this.props.set_fullname(this.state.fullName);
    this.props.set_gender(this.state.gender);
    this.props.set_birthdate(this.state.birthDate);
    this.props.set_photo(this.state.photo);
    this.props.set_ageinyears(this.state.ageInYears);
    this.props.set_race(this.state.race);
    this.props.set_step(3);

    this.props.navigation.navigate('FormCephalometricAnalysis');
  };

  compareResult = async () => {
    this.props.set_doctorid(this.state.doctorId);
    this.props.set_patientid(this.state.patientId);
    this.props.set_fullname(this.state.fullName);
    this.props.set_gender(this.state.gender);
    this.props.set_birthdate(this.state.birthDate);
    this.props.set_photo(this.state.photo);
    this.props.set_ageinyears(this.state.ageInYears);
    this.props.set_race(this.state.race);

    let data = {
      patientid: this.state.patientId,
    };
    let analysisC1 = [];
    let analysisC2 = [];
    let analysisC3 = [];

    await _viewResultAnalysis(data)
      .then(async (result) => {
        if (result.length > 0) {
          // console.log('SNB = ' + result[1]?.snb);
          if (result[0]?.step == 1) {
            analysisC1 = {
              sna: JSON.parse(result[0]?.sna)
                ? JSON.parse(result[0]?.sna)
                : null,
              snb: JSON.parse(result[0]?.snb)
                ? JSON.parse(result[0]?.snb)
                : null,
              anb: JSON.parse(result[0]?.anb)
                ? JSON.parse(result[0]?.anb)
                : null,
              pognb: JSON.parse(result[0]?.pognb)
                ? JSON.parse(result[0]?.pognb)
                : null,
              snop: JSON.parse(result[0]?.snop)
                ? JSON.parse(result[0]?.snop)
                : null,
              snmp: JSON.parse(result[0]?.snmp)
                ? JSON.parse(result[0]?.snmp)
                : null,
              uina_angular: JSON.parse(result[0]?.uina_angular)
                ? JSON.parse(result[0]?.uina_angular)
                : null,
              uina_linear: JSON.parse(result[0]?.uina_linear)
                ? JSON.parse(result[0]?.uina_linear)
                : null,
              linb_angular: JSON.parse(result[0]?.linb_angular)
                ? JSON.parse(result[0]?.linb_angular)
                : null,
              linb_linear: JSON.parse(result[0]?.linb_linear)
                ? JSON.parse(result[0]?.linb_linear)
                : null,
              _iia: JSON.parse(result[0]?._iia)
                ? JSON.parse(result[0]?._iia)
                : null,
              upper_lip: JSON.parse(result[0]?.upper_lip)
                ? JSON.parse(result[0]?.upper_lip)
                : null,
              lower_lip: JSON.parse(result[0]?.lower_lip)
                ? JSON.parse(result[0]?.lower_lip)
                : null,
              mid_face: JSON.parse(result[0]?.mid_face)
                ? JSON.parse(result[0]?.mid_face)
                : null,
              lower_face: JSON.parse(result[0]?.lower_face)
                ? JSON.parse(result[0]?.lower_face)
                : null,
            };
          }
          if (result[1]?.step == 2) {
            analysisC2 = {
              sna: JSON.parse(result[1]?.sna)
                ? JSON.parse(result[1]?.sna)
                : null,
              snb: JSON.parse(result[1]?.snb)
                ? JSON.parse(result[1]?.snb)
                : null,
              anb: JSON.parse(result[1]?.anb)
                ? JSON.parse(result[1]?.anb)
                : null,
              pognb: JSON.parse(result[1]?.pognb)
                ? JSON.parse(result[1]?.pognb)
                : null,
              snop: JSON.parse(result[1]?.snop)
                ? JSON.parse(result[1]?.snop)
                : null,
              snmp: JSON.parse(result[1]?.snmp)
                ? JSON.parse(result[1]?.snmp)
                : null,
              uina_angular: JSON.parse(result[1]?.uina_angular)
                ? JSON.parse(result[1]?.uina_angular)
                : null,
              uina_linear: JSON.parse(result[1]?.uina_linear)
                ? JSON.parse(result[1]?.uina_linear)
                : null,
              linb_angular: JSON.parse(result[1]?.linb_angular)
                ? JSON.parse(result[1]?.linb_angular)
                : null,
              linb_linear: JSON.parse(result[1]?.linb_linear)
                ? JSON.parse(result[1]?.linb_linear)
                : null,
              _iia: JSON.parse(result[1]?._iia)
                ? JSON.parse(result[1]?._iia)
                : null,
              upper_lip: JSON.parse(result[1]?.upper_lip)
                ? JSON.parse(result[1]?.upper_lip)
                : null,
              lower_lip: JSON.parse(result[1]?.lower_lip)
                ? JSON.parse(result[1]?.lower_lip)
                : null,
              mid_face: JSON.parse(result[1]?.mid_face)
                ? JSON.parse(result[1]?.mid_face)
                : null,
              lower_face: JSON.parse(result[1]?.lower_face)
                ? JSON.parse(result[1]?.lower_face)
                : null,
            };
          }
          if (result[2]?.step == 3) {
            analysisC3 = {
              sna: JSON.parse(result[2]?.sna)
                ? JSON.parse(result[2]?.sna)
                : null,
              snb: JSON.parse(result[2]?.snb)
                ? JSON.parse(result[2]?.snb)
                : null,
              anb: JSON.parse(result[2]?.anb)
                ? JSON.parse(result[2]?.anb)
                : null,
              pognb: JSON.parse(result[2]?.pognb)
                ? JSON.parse(result[2]?.pognb)
                : null,
              snop: JSON.parse(result[2]?.snop)
                ? JSON.parse(result[2]?.snop)
                : null,
              snmp: JSON.parse(result[2]?.snmp)
                ? JSON.parse(result[2]?.snmp)
                : null,
              uina_angular: JSON.parse(result[2]?.uina_angular)
                ? JSON.parse(result[2]?.uina_angular)
                : null,
              uina_linear: JSON.parse(result[2]?.uina_linear)
                ? JSON.parse(result[2]?.uina_linear)
                : null,
              linb_angular: JSON.parse(result[2]?.linb_angular)
                ? JSON.parse(result[2]?.linb_angular)
                : null,
              linb_linear: JSON.parse(result[2]?.linb_linear)
                ? JSON.parse(result[2]?.linb_linear)
                : null,
              _iia: JSON.parse(result[2]?._iia)
                ? JSON.parse(result[2]?._iia)
                : null,
              upper_lip: JSON.parse(result[2]?.upper_lip)
                ? JSON.parse(result[2]?.upper_lip)
                : null,
              lower_lip: JSON.parse(result[2]?.lower_lip)
                ? JSON.parse(result[2]?.lower_lip)
                : null,
              mid_face: JSON.parse(result[2]?.mid_face)
                ? JSON.parse(result[2]?.mid_face)
                : null,
              lower_face: JSON.parse(result[2]?.lower_face)
                ? JSON.parse(result[2]?.lower_face)
                : null,
            };
          }

          // if (result[0]?.step == '1') {
          //   analysisC1 = {
          //     sna: JSON.parse(result[0]?.sna)
          //       ? JSON.parse(result[0]?.sna)
          //       : null,
          //     snb: JSON.parse(result[0]?.snb)
          //       ? JSON.parse(result[0]?.snb)
          //       : null,
          //     snb: JSON.parse(result[0].anb)
          //       ? JSON.parse(result[0]?.anb)
          //       : null,
          //     pognb: JSON.parse(result[0]?.pognb)
          //       ? JSON.parse(result[0]?.pognb)
          //       : null,
          //     snop: JSON.parse(result[0]?.snop)
          //       ? JSON.parse(result[0]?.snop)
          //       : null,
          //     snmp: JSON.parse(result[0]?.snmp)
          //       ? JSON.parse(result[0]?.snmp)
          //       : null,
          //     uina_angular: JSON.parse(result[0]?.uina_angular)
          //       ? JSON.parse(result[0]?.uina_angular)
          //       : null,
          //     uina_linear: JSON.parse(result[0]?.uina_linear)
          //       ? JSON.parse(result[0]?.uina_linear)
          //       : null,
          //     linb_angular: JSON.parse(result[0]?.linb_angular)
          //       ? JSON.parse(result[0]?.linb_angular)
          //       : null,
          //     linb_linear: JSON.parse(result[0]?.linb_linear)
          //       ? JSON.parse(result[0]?.linb_linear)
          //       : null,
          //     _iia: JSON.parse(result[0]?._iia)
          //       ? JSON.parse(result[0]?._iia)
          //       : null,
          //     upper_lip: JSON.parse(result[0]?.upper_lip)
          //       ? JSON.parse(result[0]?.upper_lip)
          //       : null,
          //     lower_lip: JSON.parse(result[0]?.lower_lip)
          //       ? JSON.parse(result[0]?.lower_lip)
          //       : null,
          //     mid_face: JSON.parse(result[0]?.mid_face)
          //       ? JSON.parse(result[0]?.mid_face)
          //       : null,
          //     lower_face: JSON.parse(result[0]?.lower_face)
          //       ? JSON.parse(result[0]?.lower_face)
          //       : null,
          //   };
          // }

          // if (result[1]?.step == '2') {
          //   analysisC2 = {
          //     sna: JSON.parse(result[1]?.sna)
          //       ? JSON.parse(result[1]?.sna)
          //       : null,
          //     snb: JSON.parse(result[1]?.snb)
          //       ? JSON.parse(result[1]?.snb)
          //       : null,
          //     snb: JSON.parse(result[1].anb)
          //       ? JSON.parse(result[1]?.anb)
          //       : null,
          //     pognb: JSON.parse(result[1]?.pognb)
          //       ? JSON.parse(result[1]?.pognb)
          //       : null,
          //     snop: JSON.parse(result[1]?.snop)
          //       ? JSON.parse(result[1]?.snop)
          //       : null,
          //     snmp: JSON.parse(result[1]?.snmp)
          //       ? JSON.parse(result[1]?.snmp)
          //       : null,
          //     uina_angular: JSON.parse(result[1]?.uina_angular)
          //       ? JSON.parse(result[1]?.uina_angular)
          //       : null,
          //     uina_linear: JSON.parse(result[1]?.uina_linear)
          //       ? JSON.parse(result[1]?.uina_linear)
          //       : null,
          //     linb_angular: JSON.parse(result[1]?.linb_angular)
          //       ? JSON.parse(result[1]?.linb_angular)
          //       : null,
          //     linb_linear: JSON.parse(result[1]?.linb_linear)
          //       ? JSON.parse(result[1]?.linb_linear)
          //       : null,
          //     _iia: JSON.parse(result[1]?._iia)
          //       ? JSON.parse(result[1]?._iia)
          //       : null,
          //     upper_lip: JSON.parse(result[1]?.upper_lip)
          //       ? JSON.parse(result[1]?.upper_lip)
          //       : null,
          //     lower_lip: JSON.parse(result[1]?.lower_lip)
          //       ? JSON.parse(result[1]?.lower_lip)
          //       : null,
          //     mid_face: JSON.parse(result[1]?.mid_face)
          //       ? JSON.parse(result[1]?.mid_face)
          //       : null,
          //     lower_face: JSON.parse(result[1]?.lower_face)
          //       ? JSON.parse(result[1]?.lower_face)
          //       : null,
          //   };
          // }

          // if (result[2]?.step == '3') {
          //   analysisC3 = {
          //     sna: JSON.parse(result[2]?.sna)
          //       ? JSON.parse(result[2]?.sna)
          //       : null,
          //     snb: JSON.parse(result[2]?.snb)
          //       ? JSON.parse(result[2]?.snb)
          //       : null,
          //     snb: JSON.parse(result[2]?.anb)
          //       ? JSON.parse(result[2]?.anb)
          //       : null,
          //     pognb: JSON.parse(result[2]?.pognb)
          //       ? JSON.parse(result[2]?.pognb)
          //       : null,
          //     snop: JSON.parse(result[2]?.snop)
          //       ? JSON.parse(result[2]?.snop)
          //       : null,
          //     snmp: JSON.parse(result[2]?.snmp)
          //       ? JSON.parse(result[2]?.snmp)
          //       : null,
          //     uina_angular: JSON.parse(result[2]?.uina_angular)
          //       ? JSON.parse(result[2]?.uina_angular)
          //       : null,
          //     uina_linear: JSON.parse(result[2]?.uina_linear)
          //       ? JSON.parse(result[2]?.uina_linear)
          //       : null,
          //     linb_angular: JSON.parse(result[2]?.linb_angular)
          //       ? JSON.parse(result[2]?.linb_angular)
          //       : null,
          //     linb_linear: JSON.parse(result[2]?.linb_linear)
          //       ? JSON.parse(result[2]?.linb_linear)
          //       : null,
          //     _iia: JSON.parse(result[2]?._iia)
          //       ? JSON.parse(result[2]?._iia)
          //       : null,
          //     upper_lip: JSON.parse(result[2]?.upper_lip)
          //       ? JSON.parse(result[2]?.upper_lip)
          //       : null,
          //     lower_lip: JSON.parse(result[2]?.lower_lip)
          //       ? JSON.parse(result[2]?.lower_lip)
          //       : null,
          //     mid_face: JSON.parse(result[2]?.mid_face)
          //       ? JSON.parse(result[2]?.mid_face)
          //       : null,
          //     lower_face: JSON.parse(result[2]?.lower_face)
          //       ? JSON.parse(result[2]?.lower_face)
          //       : null,
          //   };
          // }

          let patient = {
            fullname: this.state.fullName,
            gender: this.state.gender,
            birthdate: this.state.birthDate,
            ageInYears: this.state.ageInYears,
            race: this.state.race,
          };

          var htmlnya = await generateTableCompHtml(
            patient,
            new Date(),
            analysisC1,
            analysisC2,
            analysisC3,
          );

          let options = {
            html: htmlnya,
            fileName: 'CompareResult',
            base64: true,
            // directory: 'Orthoceph',
            width: Platform.OS == 'ios' ? wp(140) : wp(160),
            height: Platform.OS == 'ios' ? wp(100) : wp(100),
          };

          let file = await RNHTMLtoPDF.convert(options);

          this.props.navigation.navigate('FormCompareResult', {
            fileName: this.props.fullname,
            fileBase64: file.base64,
          });
        }
      })
      .catch((error) => {
        console.log('##ERROR## :' + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar animated={true} backgroundColor={'#637363'} hidden={false} barStyle='light-content' /> */}

        <Appbar.Header
          style={{
            backgroundColor: '#637363',
            borderRadius: 0,
            marginTop: 5,
          }}>
          <Appbar.BackAction  color='white' onPress={() => this.props.navigation.goBack()} />

          <Appbar.Content
            title="Cephalometric Analysis"
            subtitle=""
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              // marginLeft: Platform.OS == 'ios' ? 0 : -60,
            }}
            color="white"
          />
          <Appbar.Action />
        </Appbar.Header>

        <View style={styles.containerList}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Image
              source={this.state.photo}
              style={{
                resizeMode: 'cover',
                width: wp(25),
                height: wp(25),
                borderRadius: 50,
              }}></Image>
            <View style={{flexDirection: 'column', marginHorizontal: wp(4)}}>
              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 2,
                }}>
                {this.state.fullName}
              </Text>
              <Text
                style={{
                  fontSize: wp(2),
                  fontWeight: '600',
                  color: '#FFD7A3',
                  paddingVertical: 2,
                  fontStyle: 'italic',
                }}>
                {this.state.gender != 'M'
                  ? 'Female'
                  : 'Male' + ' / ' + this.state.ageInYears + 'Y'}
              </Text>
              <Text
                style={{
                  fontSize: wp(2),
                  fontWeight: '600',
                  color: '#9C9C9C',
                  paddingVertical: 2,
                }}>
                {this.state.race}
              </Text>
            </View>
          </View>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => this.analysisOne()}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(3.5),
                paddingVertical: hp(4),
                fontWeight: 'bold',
              }}>
              Cephalometric One
            </Text>

            <FontAwesome name="angle-right" size={50} color={'white'} />
          </TouchableOpacity>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => this.analysisTwo()}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(3.5),
                paddingVertical: hp(4),
                fontWeight: 'bold',
              }}>
              Cephalometric Two
            </Text>

            <FontAwesome name="angle-right" size={50} color={'white'} />
          </TouchableOpacity>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => this.analysisThree()}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(3.5),
                paddingVertical: hp(4),
                fontWeight: 'bold',
              }}>
              Cephalometric Three
            </Text>

            <FontAwesome name="angle-right" size={50} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() => this.compareResult()}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(3.5),
                paddingVertical: hp(4),
                fontWeight: 'bold',
              }}>
              Compare Result
            </Text>

            <FontAwesome name="angle-right" size={50} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pressAnalysis: state.variabelReducer.pressAnalysis,
    disablePointer: state.variabelReducer.disablePointer,
    opacityPointer: state.variabelReducer.opacityPointer,
    bantuMarker: state.variabelReducer.bantuMarker,
    startingPoint: state.variabelReducer.startingPoint,
    endPoint: state.variabelReducer.endPoint,
    calibrationDistance: state.variabelReducer.calibrationDistance,
    sella: state.variabelReducer.sella,
    nasion: state.variabelReducer.nasion,
    pointa: state.variabelReducer.pointa,
    pointb: state.variabelReducer.pointb,
    u6: state.variabelReducer.u6,
    u4: state.variabelReducer.u4,
    gonion: state.variabelReducer.gonion,
    gnathion: state.variabelReducer.gnathion,
    isa: state.variabelReducer.isa,
    isi: state.variabelReducer.isi,
    iia: state.variabelReducer.iia,
    iii: state.variabelReducer.iii,
    ms: state.variabelReducer.ms,
    pogs: state.variabelReducer.pogs,
    ls: state.variabelReducer.ls,
    li: state.variabelReducer.li,
    pog: state.variabelReducer.pog,
    ans: state.variabelReducer.ans,
    menton: state.variabelReducer.menton,
    sna: state.resultReducer.sna,
    snb: state.resultReducer.snb,
    anb: state.resultReducer.anb,
    pogNB: state.resultReducer.pogNB,
    snop: state.resultReducer.snop,
    snmp: state.resultReducer.snmp,
    uina_angular: state.resultReducer.uina_angular,
    uina_linear: state.resultReducer.uina_linear,
    linb_angular: state.resultReducer.linb_angular,
    linb_linear: state.resultReducer.linb_linear,
    _iia: state.resultReducer._iia,
    upper_lip: state.resultReducer.upper_lip,
    lower_lip: state.resultReducer.lower_lip,
    mid_face: state.resultReducer.mid_face,
    lower_face: state.resultReducer.lower_face,
    wendellWylie: state.resultReducer.wendellWylie,
    doctorid: state.patientReducer.doctorid,
    fullname: state.patientReducer.fullname,
    gender: state.patientReducer.gender,
    birthdate: state.patientReducer.birthdate,
    race: state.patientReducer.race,
    photo: state.patientReducer.photo,
    ageInYears: state.patientReducer.ageInYears,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_patientid: (val) => dispatch(set_patientid(val)),
    set_doctorid: (val) => dispatch(set_doctorid(val)),
    set_fullname: (val) => dispatch(set_fullname(val)),
    set_gender: (val) => dispatch(set_gender(val)),
    set_birthdate: (val) => dispatch(set_birthdate(val)),
    set_race: (val) => dispatch(set_race(val)),
    set_photo: (val) => dispatch(set_photo(val)),
    set_ageinyears: (val) => dispatch(set_ageinyears(val)),
    set_step: (val) => dispatch(set_step(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCephalometric);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
  },
  containerList: {
    flex: 1,
    flexDirection: 'column',
  },
  containerItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#224957',
  },
});
