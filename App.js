/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as React from 'react';
import {
  ActivityIndicator,
  View,
  Button,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
import FormCephalometric from './component/FormCephalometric';
import FormCephalometricAnalysis from './component/FormCephalometricAnalysis';
import {newAnalysis, saveAnalysis} from './component/FormCephalometricAnalysis';
import FormLogin from './component/FormLogin';
import FormPatient from './component/FormPatient';
import FormProfile from './component/FormProfile';
import FormPatientList from './component/FormPatientList';
import FormRegistrasi from './component/FormRegistrasi';
import FormThankYou from './component/FormThankYou';
import FormPdfPreview from './component/FormPDFPreview';
import FormAddPatient from './component/FormAddPatient';
import logo from './assets/logo.png';
import {
  ANALYSIS_DETAILS,
  ANALYSIS_STATE,
  MARK_DETAILS,
} from './component/common/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  SNA,
  SNB,
  ANB,
  PogNB,
  SNOP,
  SNMP,
  UPPER_LIP,
  LOWER_LIP,
  UINA_ANGULAR,
  UINA_LINEAR,
  LINB_ANGULAR,
  LINB_LINEAR,
  IIA,
  WendellWylie,
  distanceBetween,
  getMarkDetailsByID,
  getAnalysisDetailsByID,
} from './component/common/Utils';

import {COLORS} from './component/common/Constants';

import {
  set_press_analysis,
  set_press_save_analysis,
  set_disable_pointer,
  set_opacity_pointer,
  set_bantuMarker,
  set_markingdot,
  set_resultanalysis,
  set_detailresult,
  set_startingPoint,
  set_endPoint,
  set_calibrationDistance,
  set_sella,
  set_nasion,
  set_gnathion,
  set_gonion,
  set_iia,
  set_iii,
  set_isa,
  set_isi,
  set_li,
  set_ls,
  set_menton,
  set_ms,
  set_pog,
  set_pogs,
  set_pointa,
  set_pointb,
  set_u4,
  set_u6,
  set_ans,
  set_sna,
  set_snb,
  set_anb,
  set_pogNB,
  set_snop,
  set_snmp,
  set_uina_angular,
  set_uina_linear,
  set_linb_angular,
  set_linb_linear,
  set__iia,
  set_upper_lip,
  set_lower_lip,
  set_wendellwylie,
  set_patientid,
  set_doctorid,
  set_fullname,
  set_birthdate,
  set_gender,
  set_race,
  set_photo,
  set_tempgambar,
  set_imageuri,
  set_imagetype,
  set_imagefilename,
  set_enablesave,
  remove__iia,
  remove_anb,
  remove_ans,
  remove_endPoint,
  remove_gnathion,
  remove_gonion,
  remove_iia,
  remove_iii,
  remove_isa,
  remove_isi,
  remove_li,
  remove_linb_angular,
  remove_linb_linear,
  remove_lower_lip,
  remove_ls,
  remove_menton,
  remove_ms,
  remove_nasion,
  remove_pog,
  remove_pogNB,
  remove_pogs,
  remove_pointa,
  remove_pointb,
  remove_sella,
  remove_sna,
  remove_snb,
  remove_snmp,
  remove_snop,
  remove_startingPoint,
  remove_u4,
  remove_u6,
  remove_uina_angular,
  remove_uina_linear,
  remove_upper_lip,
  remove_wendellwylie,
  set_headerText,
  set_loading,
  set_loading_global,
  set_select_id,
} from './component/actions/variabel';

import Geolocation from '@react-native-community/geolocation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {_addAnalysisPatient} from './component/networking/server';
import FormSearchPatient from './component/FormSearchPatient';
import FormCompareResult from './component/FormCompareResult';
import Permissions, {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('screen');

// import LocationEnabler from 'react-native-location-enabler';
let number = 0;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function sideBarNavigation(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Analysis"
      drawerPosition="right"
      drawerStyle={{
        width: '80%',
        height: '100%',
      }}
      drawerContent={(props) => <CalibrationContainer {...props} />}>
      <Drawer.Screen name="Analysis" component={FormCephalometricAnalysis} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const [contentTitle, setContentTitle] = React.useState(null);
  const [contentTitleValue, setContentTitleValue] = React.useState(null);
  const [normalValue, setNormalValue] = React.useState(null);
  const [consideration, setConsideration] = React.useState(null);
  const [contentDescription, setContentDescription] = React.useState([]);
  const [iconName, setIconName] = React.useState(null);
  const [iconColor, setIconColor] = React.useState(null);

  let _SNA = null;
  let _SNB = null;
  let _ANB = null;
  let _PogNB = null;
  let _SNOP = null;
  let _SNMP = null;
  let _UINA_Angular = null;
  let _UINA_Linear = null;
  let _LINB_Angular = null;
  let _LINB_Linear = null;
  let __IIA = null;
  let _Upper_Lip = null;
  let _Lower_Lip = null;
  let _WendellWylie = null;

  function _analysis() {
    // props.navigation.closeDrawer();

    props.set_markingdot(false);
    props.set_resultanalysis(true);
    props.set_detailresult(false);
    props.set_bantuMarker(23);

    process_analysis();

    return null;
  }

  async function process_analysis() {
    const _calibrationDistance = Number(props.calibrationDistance);
    const _calibrationPointDistance = await distanceBetween(
      props?.startingPoint[0],
      props?.endPoint[0],
    );

    // console.log('calibration distance : ' + _calibrationDistance);
    // console.log('calibration point distance : ' + _calibrationPointDistance);

    let _calibrationRatio = 0;
    if (
      !isNaN(_calibrationDistance / _calibrationPointDistance) &&
      isFinite(_calibrationDistance / _calibrationPointDistance)
    )
      _calibrationRatio = _calibrationDistance / _calibrationPointDistance;

    // console.log('calibration ratio: ' + _calibrationRatio, '\n');

    // =========================================================
    // =========================================================
    // =========================================================

    _SNA = await SNA(props.sella[0], props.nasion[0], props.pointa[0]);
    props.set_sna(_SNA);

    _SNB = await SNB(props.sella[0], props.nasion[0], props.pointb[0]);
    props.set_snb(_SNB);
    _ANB = await ANB(props.pointa[0], props.nasion[0], props.pointb[0]);
    props.set_anb(_ANB);
    _PogNB = await PogNB(
      props.pog[0],
      props.nasion[0],
      props.pointb[0],
      _calibrationRatio,
    );
    props.set_pogNB(_PogNB);
    _SNOP = await SNOP(
      props.sella[0],
      props.nasion[0],
      props.u6[0],
      props.u4[0],
    );
    props.set_snop(_SNOP);
    _SNMP = await SNMP(
      props.sella[0],
      props.nasion[0],
      props.gonion[0],
      props.gnathion[0],
    );
    props.set_snmp(_SNMP);
    _UINA_Angular = await UINA_ANGULAR(
      props.nasion[0],
      props.pointa[0],
      props.isa[0],
      props.isi[0],
    );
    props.set_uina_angular(_UINA_Angular);
    _UINA_Linear = await UINA_LINEAR(
      props.nasion[0],
      props.pointa[0],
      props.isa[0],
      props.isi[0],
      _calibrationRatio,
    );
    props.set_uina_linear(_UINA_Linear);
    _LINB_Angular = await LINB_ANGULAR(
      props.nasion[0],
      props.pointb[0],
      props.iia[0],
      props.iii[0],
    );
    props.set_linb_angular(_LINB_Angular);
    _LINB_Linear = await LINB_LINEAR(
      props.nasion[0],
      props.pointb[0],
      props.iia[0],
      props.iii[0],
      _calibrationRatio,
    );
    props.set_linb_linear(_LINB_Linear);
    __IIA = await IIA(props.isa[0], props.isi[0], props.iia[0], props.iii[0]);
    props.set__iia(__IIA);
    _Upper_Lip = await UPPER_LIP(
      props.ms[0],
      props.pogs[0],
      props.ls[0],
      _calibrationRatio,
    );
    props.set_upper_lip(_Upper_Lip);
    _Lower_Lip = await LOWER_LIP(
      props.ms[0],
      props.pogs[0],
      props.li[0],
      _calibrationRatio,
    );
    props.set_lower_lip(_Lower_Lip);
    _WendellWylie = await WendellWylie(
      props.nasion[0],
      props.ans[0],
      props.menton[0],
      _calibrationRatio,
    );

    props.set_wendellwylie(_WendellWylie);

    props.set_enablesave(true);
    props.navigation.openDrawer();
  }

  function _markAgain() {
    props.set_markingdot(true);
    props.set_resultanalysis(false);
    props.set_detailresult(false);
    props.set_enablesave(false);
  }

  function _exportPDF() {
    props.set_press_analysis(true);
  }

  function pressDetailAnalysis(IDS) {
    console.log('PRESSED :' + IDS);

    props.set_resultanalysis(false);
    props.set_detailresult(true);
    props.set_select_id(IDS);

    number = 0;

    setContentTitle(getAnalysisDetailsByID(IDS).TITLE);
    setNormalValue(
      getAnalysisDetailsByID(IDS).NORM + getAnalysisDetailsByID(IDS).UNIT,
    );
    if (getAnalysisDetailsByID(IDS)?.CONS?.MIN) {
      setConsideration(
        getAnalysisDetailsByID(IDS)?.CONS?.MIN +
          ' - ' +
          getAnalysisDetailsByID(IDS)?.CONS?.MAX +
          getAnalysisDetailsByID(IDS)?.UNIT,
      );
    } else {
      setConsideration('-');
    }

    setContentDescription(getAnalysisDetailsByID(IDS).DESC);

    if (IDS == 'IDS/ANALYSIS/SNA') {
      setContentTitleValue(props.sna.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props.sna.status).iconName);
      setIconColor(checkStatusAnalysis(props.sna.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.sna.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNB') {
      setContentTitleValue(props.snb.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props.snb.status).iconName);
      setIconColor(checkStatusAnalysis(props.snb.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.snb.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/ANB') {
      setContentTitleValue(props.anb.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props.anb.status).iconName);
      setIconColor(checkStatusAnalysis(props.anb.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.anb.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/POGNB') {
      setContentTitleValue(
        props.pogNB.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.pogNB.status).iconName);
      setIconColor(checkStatusAnalysis(props.pogNB.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.pogNB.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNOP') {
      setContentTitleValue(props.snop.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props.snop.status).iconName);
      setIconColor(checkStatusAnalysis(props.snop.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.snop.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNMP') {
      setContentTitleValue(props.snmp.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props.snmp.status).iconName);
      setIconColor(checkStatusAnalysis(props.snmp.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.snmp.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UINA_ANGULAR') {
      setContentTitleValue(
        props.uina_angular.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.uina_angular.status).iconName);
      setIconColor(checkStatusAnalysis(props.uina_angular.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.uina_angular.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UINA_LINEAR') {
      setContentTitleValue(
        props.uina_linear.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.uina_linear.status).iconName);
      setIconColor(checkStatusAnalysis(props.uina_linear.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.uina_linear.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LINB_ANGULAR') {
      setContentTitleValue(
        props.linb_angular.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.linb_angular.status).iconName);
      setIconColor(checkStatusAnalysis(props.linb_angular.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.linb_angular.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LINB_LINEAR') {
      setContentTitleValue(
        props.linb_linear.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.linb_linear.status).iconName);
      setIconColor(checkStatusAnalysis(props.linb_linear.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.linb_linear.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/IIA') {
      setContentTitleValue(props._iia.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(props._iia.status).iconName);
      setIconColor(checkStatusAnalysis(props._iia.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props._iia.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UPPER_LIP') {
      setContentTitleValue(
        props.upper_lip.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.upper_lip.status).iconName);
      setIconColor(checkStatusAnalysis(props.upper_lip.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.upper_lip.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LOWER_LIP') {
      setContentTitleValue(
        props.lower_lip.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(props.lower_lip.status).iconName);
      setIconColor(checkStatusAnalysis(props.lower_lip.status).iconColor);
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.lower_lip.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/MIDFACE') {
      setContentTitleValue(
        props.wendellWylie.MIDFACE.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(
        checkStatusAnalysis(props.wendellWylie.MIDFACE.status).iconName,
      );
      setIconColor(
        checkStatusAnalysis(props.wendellWylie.MIDFACE.status).iconColor,
      );
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.wendellWylie.MIDFACE.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LOWERFACE') {
      setContentTitleValue(
        props.wendellWylie.LOWERFACE.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(
        checkStatusAnalysis(props.wendellWylie.LOWERFACE.status).iconName,
      );
      setIconColor(
        checkStatusAnalysis(props.wendellWylie.LOWERFACE.status).iconColor,
      );
      props.set_headerText(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          props.wendellWylie.LOWERFACE.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    }
  }

  function checkStatusAnalysis(analysisStatus) {
    let _iconName = 'check-circle';
    let _iconColor = COLORS.ANALYSIS_NORMAL;

    if (analysisStatus === ANALYSIS_STATE.CONS) {
      _iconName = 'check-underline-circle';
      _iconColor = COLORS.ANALYSIS_CONS;
    } else if (analysisStatus === ANALYSIS_STATE.NEED_CORRECTION) {
      _iconName = 'alert-circle';
      _iconColor = COLORS.ANALYSIS_NEED_CORRECTION;
    }

    return {
      iconName: _iconName,
      iconColor: _iconColor,
    };
  }

  function _goBack() {
    props.set_resultanalysis(true);
    props.set_detailresult(false);
    props.set_select_id(null);
    props.set_headerText('Cephalometric ' + props.step);
  }

  function _showOnCeph() {
    props.navigation.closeDrawer();
  }

  return (
    <View style={{flex: 1}}>
      <HeaderTop props={props} />

      {props.markingDot ? (
        <>
          <HeaderStep
            headerText={'Cephalometric One'}
            headerIcon={'help-circle-outline'}
          />

          {props.detailResult !== true ? (
            <>
              <CalibrationContent props={props} />
              <CephalometricLandMarkContent props={props} />
              <TouchableOpacity
                onPress={() => _analysis()}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#637363',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <MaterialCommunityIcons
                  name="cogs"
                  size={wp(5)}
                  color="white"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    paddingVertical: 20,
                    fontSize: wp(3.5),
                    marginLeft: wp(5),
                  }}>
                  Analyze Measurements
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>
      ) : null}
      {/* ==================== DETAIL RESULT ========================= */}

      {props.detailResult ? (
        <>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: wp(3),
              }}>
              <MaterialCommunityIcons
                name={iconName}
                size={wp(5)}
                color={iconColor}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    paddingVertical: wp(2),
                    fontSize: wp(3),
                    marginLeft: wp(3),
                  }}>
                  {contentTitle}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    paddingVertical: wp(2),
                    fontSize: wp(3),
                    marginLeft: wp(3),
                  }}>
                  {contentTitleValue}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                margin: wp(3),
              }}>
              {contentDescription.map((data) => {
                number = number + 1;
                return (
                  <>
                    <Text
                      style={{
                        flexBasis: 'auto',
                        color: 'black',
                        paddingVertical: wp(2),
                        fontSize: wp(2.8),
                      }}>
                      {number + '. ' + data}
                    </Text>
                  </>
                );
              })}
            </View>
          </View>
        </>
      ) : null}

      {props.detailResult ? (
        <>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: wp(40),
              borderTopWidth: 1,
              zIndex: 0,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              position: 'absolute',
              left: wp(3),
              right: 0,
              bottom: wp(15),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="check-circle"
                size={wp(5)}
                color="#008000"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  paddingVertical: wp(2),
                  fontSize: wp(3),
                  marginLeft: wp(3),
                }}>
                {'Normal : ' + normalValue}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="check-underline-circle"
                size={wp(5)}
                color="#FDA50F"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  paddingVertical: wp(2),
                  fontSize: wp(3),
                  marginLeft: wp(3),
                }}>
                {'Consideration Range : ' + consideration}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={wp(5)}
                color="#B22222"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  paddingVertical: wp(2),
                  fontSize: wp(3),
                  marginLeft: wp(3),
                }}>
                Need Correction
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={() => _goBack()}
              style={{
                flex: 1,
                backgroundColor: '#637363',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <MaterialCommunityIcons
                name="arrow-left-thick"
                size={wp(5)}
                color="white"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 20,
                  fontSize: wp(3.5),
                  marginLeft: wp(5),
                }}>
                Go Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _showOnCeph()}
              style={{
                flex: 1,
                backgroundColor: '#637363',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderLeftWidth: 0.5,
                borderLeftColor: 'white',
              }}>
              <MaterialCommunityIcons
                name="file-search-outline"
                size={wp(5)}
                color="white"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 20,
                  fontSize: wp(3.5),
                  marginLeft: wp(5),
                }}>
                Show On Ceph
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      {/* ==================== RESULT ========================= */}
      {props.resultAnalysis ? (
        <>
          <HeaderResult
            headerText={'Analysis Result'}
            headerIcon={'format-list-bulleted'}
          />
          <ResultContent
            props={props}
            pressDetailAnalysis={pressDetailAnalysis}
          />

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={() => _markAgain()}
              style={{
                flex: 1,
                backgroundColor: '#637363',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <MaterialCommunityIcons
                name="refresh"
                size={wp(5)}
                color="white"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 20,
                  fontSize: wp(3.5),
                  marginLeft: wp(5),
                }}>
                Mark Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _exportPDF()}
              style={{
                flex: 1,
                backgroundColor: '#637363',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderLeftWidth: 0.5,
                borderLeftColor: 'white',
              }}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={wp(5)}
                color="white"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 20,
                  fontSize: wp(3.5),
                  marginLeft: wp(5),
                }}>
                Export Pdf
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
}

function HeaderTop(props) {
  // console.log('width :' + width);
  // console.log('height :' + height);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#637363',
        // marginTop: Platform.OS == 'ios' ? wp(10) : 0,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 1,
        }}>
        <Image
          source={props.props.photo}
          resizeMode="contain"
          style={{
            width: wp(10),
            height: wp(10),
            resizeMode: 'contain',
            borderRadius: 50,
          }}
        />
        <View style={{marginHorizontal: 10, flexShrink: 1}}>
          <Text style={{color: 'white', fontSize: wp(3)}}>
            {props.props.fullname}
          </Text>
          <Text style={{color: 'white', fontSize: wp(3)}}>
            {props.props.gender + ' / ' + props.props.ageInYears + ' Y'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: wp(2.5),
              flexWrap: 'wrap',
              flexShrink: 1,
            }}>
            {props.props.race}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginRight: wp(10)}}
          onPress={() => newAnalysis(props)}>
          <MaterialCommunityIcons
            name="folder-account"
            size={wp(7)}
            color="white"
          />
          <Text
            style={{color: 'white', fontSize: wp(2.5), textAlign: 'center'}}>
            New
          </Text>
        </TouchableOpacity>

        {props.props.enableSave ? (
          <TouchableOpacity onPress={() => saveAnalysis(props)}>
            <MaterialCommunityIcons
              name="content-save"
              size={wp(7)}
              color="white"
            />
            <Text
              style={{color: 'white', fontSize: wp(2.5), textAlign: 'center'}}>
              Save
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

function HeaderStep({headerText, headerIcon}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <Text
        style={{
          fontSize: wp(4),
          borderWidth: 1,
          paddingHorizontal: 7,
          color: 'white',
          backgroundColor: '#637363',
          fontWeight: 'bold',
        }}>
        1
      </Text>
      <Text style={{fontSize: wp(4)}}>{headerText}</Text>
      <MaterialCommunityIcons name={headerIcon} size={wp(6)} />
    </View>
  );
}

function HeaderResult({headerText, headerIcon}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <MaterialCommunityIcons name={headerIcon} size={wp(6)} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{fontSize: wp(4), textAlign: 'center', marginLeft: wp(-6)}}>
          {headerText}
        </Text>
      </View>
    </View>
  );
}

const CalibrationContent = ({props}) => {
  // console.log(props.startingPoint);
  function setData(val, headerText) {
    props.set_bantuMarker(val);
    props.navigation.closeDrawer();
    props.set_disable_pointer('auto');
    props.set_opacity_pointer(1);
    props.set_headerText(headerText);
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="ray-start-end"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Calibrate Distance
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}
        onPress={() => setData(1, 'Starting Point of Calibration')}>
        {/* {console.log(props.startingPoint[0])} */}
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ray-start" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            Starting Point of Calibration
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              props.startingPoint[0]?.x ? 'checkbox-active' : 'checkbox-passive'
            }
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}
        onPress={() => setData(2, 'End Point of Calibration')}>
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ray-end" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            End Point of Calibration
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={props.endPoint[0]?.x ? 'checkbox-active' : 'checkbox-passive'}
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}
        onPress={() => setData(3, '')}>
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ruler" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            Calibration Distance : 0 mm
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              props.calibrationDistance > 0
                ? 'checkbox-active'
                : 'checkbox-passive'
            }
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

function ResultContent({props, pressDetailAnalysis}) {
  function checkStatusAnalysis(analysisStatus) {
    let _iconName = 'check-circle';
    let _iconColor = COLORS.ANALYSIS_NORMAL;

    if (analysisStatus === ANALYSIS_STATE.CONS) {
      _iconName = 'check-underline-circle';
      _iconColor = COLORS.ANALYSIS_CONS;
    } else if (analysisStatus === ANALYSIS_STATE.NEED_CORRECTION) {
      _iconName = 'alert-circle';
      _iconColor = COLORS.ANALYSIS_NEED_CORRECTION;
    }

    return {
      iconName: _iconName,
      iconColor: _iconColor,
    };
  }

  return (
    <ScrollView bounces={false} style={{marginBottom: wp(12.5)}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Skeletal
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          paddingHorizontal: 10,
          justifyContent: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.sna.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.sna.status).iconName}
              color={checkStatusAnalysis(props.sna.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNA</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.sna.value + ANALYSIS_DETAILS[0].UNIT}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[0].NORM + ANALYSIS_DETAILS[0].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.snb.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.snb.status).iconName}
              color={checkStatusAnalysis(props.snb.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.snb.value + ANALYSIS_DETAILS[1].UNIT}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[1].NORM + ANALYSIS_DETAILS[1].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.anb.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.anb.status).iconName}
              color={checkStatusAnalysis(props.anb.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>ANB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.anb.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[2].NORM + ANALYSIS_DETAILS[2].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.pogNB.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.pogNB.status).iconName}
              color={checkStatusAnalysis(props.pogNB.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>PogNB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.pogNB.value + 'mm'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[3].NORM + ANALYSIS_DETAILS[3].UNIT}
          </Text>
        </View>
      </TouchableOpacity>

      {/* ========================================================= */}
      {/* ========================================================= */}

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Occlusal and mandible
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.snop.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.snop.status).iconName}
              color={checkStatusAnalysis(props.snop.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNOP</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.snop.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[4].NORM + ANALYSIS_DETAILS[4].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.snmp.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
          onPress={() => pressDetailAnalysis('SNMP')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.snmp.status).iconName}
              color={checkStatusAnalysis(props.snmp.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNMP</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.snmp.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[5].NORM + ANALYSIS_DETAILS[5].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Dental - Sagittal
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.uina_angular.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.uina_angular.status).iconName}
              color={checkStatusAnalysis(props.uina_angular.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>UINA-Angular</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.uina_angular.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[6].NORM + ANALYSIS_DETAILS[6].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.uina_linear.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.uina_linear.status).iconName}
              color={checkStatusAnalysis(props.uina_linear.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>UINA-Linear</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.uina_linear.value + 'mm'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[7].NORM + ANALYSIS_DETAILS[7].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.linb_angular.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.linb_angular.status).iconName}
              color={checkStatusAnalysis(props.linb_angular.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>LINB-Angular</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.linb_angular.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[8].NORM + ANALYSIS_DETAILS[8].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.linb_linear.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.linb_linear.status).iconName}
              color={checkStatusAnalysis(props.linb_linear.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>LINB-Linear</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.linb_linear.value + 'mm'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[9].NORM + ANALYSIS_DETAILS[9].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props._iia.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props._iia.status).iconName}
              color={checkStatusAnalysis(props._iia.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>IIA</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props._iia.value + '\u00b0'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[10].NORM + ANALYSIS_DETAILS[10].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Soft Tissue - Sagittal
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.upper_lip.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.upper_lip.status).iconName}
              color={checkStatusAnalysis(props.upper_lip.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Upper Lip</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.upper_lip.value + 'mm'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[11].NORM + ANALYSIS_DETAILS[11].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.lower_lip.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(props.lower_lip.status).iconName}
              color={checkStatusAnalysis(props.lower_lip.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Lower Lip</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + props.lower_lip.value + 'mm'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[12].NORM + ANALYSIS_DETAILS[12].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Vertical Dimension
        </Text>
      </View>

      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.wendellWylie.MIDFACE.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={
                checkStatusAnalysis(props.wendellWylie.MIDFACE?.status).iconName
              }
              color={
                checkStatusAnalysis(props.wendellWylie.MIDFACE?.status)
                  .iconColor
              }
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Mid Face</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' +
                  ' ' +
                  props.wendellWylie.MIDFACE?.distanceValue +
                  'mm (' +
                  props.wendellWylie.MIDFACE?.value +
                  '%)'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[13].NORM + ANALYSIS_DETAILS[13].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
        onPress={() => pressDetailAnalysis(props.wendellWylie.LOWERFACE.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={
                checkStatusAnalysis(props.wendellWylie.LOWERFACE?.status)
                  .iconName
              }
              color={
                checkStatusAnalysis(props.wendellWylie.LOWERFACE?.status)
                  .iconColor
              }
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Lower Face</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' +
                  ' ' +
                  props.wendellWylie.LOWERFACE?.distanceValue +
                  'mm (' +
                  props.wendellWylie.LOWERFACE?.value +
                  '%)'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(2.5),
              alignSelf: 'flex-end',
              fontStyle: 'italic',
            }}>
            {'Norm : ' + ANALYSIS_DETAILS[14].NORM + ANALYSIS_DETAILS[14].UNIT}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailResultContent({props}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="ray-start-end"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Calibrate Distance
        </Text>
      </View>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}>
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ray-start" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            Starting Point of Calibration
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              props.startingPoint.x ? 'checkbox-active' : 'checkbox-passive'
            }
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}>
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ray-end" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            End Point of Calibration
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={props.endPoint.x ? 'checkbox-active' : 'checkbox-passive'}
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 0.5,
        }}>
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ruler" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            Calibration Distance : 0 mm
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              props.calibrationDistance > 0
                ? 'checkbox-active'
                : 'checkbox-passive'
            }
            size={wp(5)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

function CephalometricLandMarkContent({props}) {
  let number = 3;

  function setData(val, headerText) {
    props.set_bantuMarker(val);
    props.set_headerText(headerText);
    props.navigation.closeDrawer();
    props.set_disable_pointer('auto');
    props.set_opacity_pointer(1);
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: '#637363',
        }}>
        <MaterialCommunityIcons
          name="pencil-circle"
          size={wp(5)}
          color="white"
        />
        <Text style={{fontSize: wp(3), marginLeft: wp(5), color: 'white'}}>
          Cephalometric Landmarks
        </Text>
      </View>

      <ScrollView bounces={false} style={{marginBottom: wp(12)}}>
        {MARK_DETAILS.map((item, index) => {
          index = parseInt(index) + 4;

          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
                paddingVertical: 20,
                borderBottomWidth: 0.5,
              }}
              onPress={() => setData(index, item.NAME)}>
              <View style={{flexDirection: 'row', width: '93%'}}>
                <MaterialCommunityIcons name="pencil-circle" size={wp(5)} />
                <Text
                  style={{
                    fontSize: wp(3),
                    marginLeft: wp(5),
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {item.NAME + ' (' + item.INITIAL + ')'}
                </Text>
              </View>

              <View style={{flex: 1}}>
                {item.INITIAL == 'S' ? (
                  <Fontisto
                    name={
                      props.sella[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'N' ? (
                  <Fontisto
                    name={
                      props.nasion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'A' ? (
                  <Fontisto
                    name={
                      props.pointa[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'B' ? (
                  <Fontisto
                    name={
                      props.pointb[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'U6' ? (
                  <Fontisto
                    name={
                      props.u6[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'U4' ? (
                  <Fontisto
                    name={
                      props.u4[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Go' ? (
                  <Fontisto
                    name={
                      props.gonion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Gn' ? (
                  <Fontisto
                    name={
                      props.gnathion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ISA' ? (
                  <Fontisto
                    name={
                      props.isa[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ISI' ? (
                  <Fontisto
                    name={
                      props.isi[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'IIA' ? (
                  <Fontisto
                    name={
                      props.iia[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'III' ? (
                  <Fontisto
                    name={
                      props.iii[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'MS' ? (
                  <Fontisto
                    name={
                      props.ms[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == `Pog\xB4` ? (
                  <Fontisto
                    name={
                      props.pogs[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'LS' ? (
                  <Fontisto
                    name={
                      props.ls[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'LI' ? (
                  <Fontisto
                    name={
                      props.li[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Pog' ? (
                  <Fontisto
                    name={
                      props.pog[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ANS' ? (
                  <Fontisto
                    name={
                      props.ans[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Me' ? (
                  <Fontisto
                    name={
                      props.menton[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}

// const {
//   PRIORITIES: {HIGH_ACCURACY},
//   addListener,
//   checkSettings,
//   requestResolutionSettings,
// } = LocationEnabler;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      timePassed: false,
      visible: false,
      routename: 'FormPatient',
    };
  }

  getData = async () => {
    const fullName = await AsyncStorage.getItem('fullName');

    if (fullName !== null) {
      this.setState({isLogin: true});
    }

    setTimeout(() => {
      this.setTimePassed();
    }, 600);
  };

  UNSAFE_componentWillMount() {
    this.getData();
  }

  async componentDidMount() {
    this.getPermission();
    this.props.set_loading_global(false);
    this.props.set_detailresult(false);
    this.props.set_select_id(null);

    // const config = {
    //   priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    //   alwaysShow: true, // default false
    //   needBle: false, // default false
    // };

    // Check if location is enabled or not

    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'always',
      });

      // if (akses_lokasi) {
      //   checkSettings(config);

      //   const listener = addListener(({locationEnabled}) => {
      //     if (locationEnabled) {
      //       listener.remove();
      //     } else {
      //       requestResolutionSettings(config);
      //     }
      //     console.log(`Location are ${locationEnabled}`);
      //   });
      // }
    }

    if (Platform.OS === 'android') {
      const akses_lokasi = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      // if (akses_lokasi == 'granted') {
      //   checkSettings(config);

      //   const listener = addListener(({locationEnabled}) => {
      //     if (locationEnabled) {
      //       listener.remove();
      //     } else {
      //       requestResolutionSettings(config);
      //     }
      //     console.log(`Location are ${locationEnabled}`);
      //   });
      // } else {
      //   checkSettings(config);

      //   const listener = addListener(({locationEnabled}) => {
      //     if (locationEnabled) {
      //       listener.remove();
      //     } else {
      //       requestResolutionSettings(config);
      //     }
      //     console.log(`Location are ${locationEnabled}`);
      //   });
      // }
    }
  }

  getPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      if (result == 'blocked') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'always',
        });
      }
    });
  };

  setTimePassed = () => {
    this.setState({timePassed: true});
  };
  render() {
    if (this.state.timePassed !== true) {
      return (
        <ActivityIndicator
          animating={this.state.visible}
          style={{
            backgroundColor: 'white',
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          size="large"
          color="black"
        />
      );
    } else {
      return (
        //  <SafeAreaView><Text>aaaa</Text></SafeAreaView> )

        <NavigationContainer>
          {this.state.isLogin === true ? (
            <Stack.Navigator
              initialRouteName={'FormPatientList'}
              screenOptions={{
                gestureEnabled: false,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
              }}>
              <Stack.Screen
                options={{headerShown: false}}
                name="login"
                component={FormLogin}
              />

              <Stack.Screen
                name="FormPatientList"
                component={FormPatientList}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormSearchPatient"
                component={FormSearchPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormProfile"
                component={FormProfile}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormPatient"
                component={FormPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormAddPatient"
                component={FormAddPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormRegistrasi"
                component={FormRegistrasi}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormThankYou"
                component={FormThankYou}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCephalometric"
                component={FormCephalometric}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCompareResult"
                component={FormCompareResult}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCephalometricAnalysis"
                component={sideBarNavigation}
                options={{
                  // gestureEnabled: true,
                  // gestureDirection: 'horizontal',
                  // ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormPdfPreview"
                component={FormPdfPreview}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              initialRouteName={'login'}
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
              }}>
              <Stack.Screen
                options={{headerShown: false}}
                name="login"
                component={FormLogin}
              />

              <Stack.Screen
                name="FormPatientList"
                component={FormPatientList}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormSearchPatient"
                component={FormSearchPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormProfile"
                component={FormProfile}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormPatient"
                component={FormPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormAddPatient"
                component={FormAddPatient}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormRegistrasi"
                component={FormRegistrasi}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormThankYou"
                component={FormThankYou}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCephalometric"
                component={FormCephalometric}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCephalometricAnalysis"
                component={sideBarNavigation}
                options={{
                  // gestureDirection: 'horizontal',
                  // ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormCompareResult"
                component={FormCompareResult}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.SlideFromRightIOS,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FormPdfPreview"
                component={FormPdfPreview}
                options={{
                  gestureDirection: 'horizontal',
                  ...TransitionPresets.RevealFromBottomAndroid,
                  headerStyle: {
                    elevation: 0,
                  },
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bantuMarker: state.variabelReducer.bantuMarker,
    disablePointer: state.variabelReducer.disablePointer,
    opacityPointer: state.variabelReducer.opacityPointer,
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
    markingDot: state.variabelReducer.markingDot,
    resultAnalysis: state.variabelReducer.resultAnalysis,
    detailResult: state.variabelReducer.detailResult,
    selectid: state.variabelReducer.selectid,
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
    patientid: state.patientReducer.patientid,
    doctorid: state.patientReducer.doctorid,
    fullname: state.patientReducer.fullname,
    gender: state.patientReducer.gender,
    birthdate: state.patientReducer.birthdate,
    race: state.patientReducer.race,
    photo: state.patientReducer.photo,
    ageInYears: state.patientReducer.ageInYears,
    step: state.patientReducer.step,
    tempGambar: state.patientReducer.tempGambar,
    imageUri: state.patientReducer.imageUri,
    imageType: state.patientReducer.imageType,
    imageFileName: state.patientReducer.imageFileName,
    enableSave: state.patientReducer.enableSave,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_press_analysis: (val) => dispatch(set_press_analysis(val)),
    set_press_save_analysis: (val) => dispatch(set_press_save_analysis(val)),
    set_disable_pointer: (val) => dispatch(set_disable_pointer(val)),
    set_opacity_pointer: (val) => dispatch(set_opacity_pointer(val)),
    set_bantuMarker: (val) => dispatch(set_bantuMarker(val)),
    set_markingdot: (val) => dispatch(set_markingdot(val)),
    set_resultanalysis: (val) => dispatch(set_resultanalysis(val)),
    set_detailresult: (val) => dispatch(set_detailresult(val)),
    set_startingPoint: (val) => dispatch(set_startingPoint(val)),
    set_endPoint: (val) => dispatch(set_endPoint(val)),
    set_calibrationDistance: (val) => dispatch(set_calibrationDistance(val)),
    set_sella: (val) => dispatch(set_sella(val)),
    set_nasion: (val) => dispatch(set_nasion(val)),
    set_pointa: (val) => dispatch(set_pointa(val)),
    set_pointb: (val) => dispatch(set_pointb(val)),
    set_u6: (val) => dispatch(set_u6(val)),
    set_u4: (val) => dispatch(set_u4(val)),
    set_gonion: (val) => dispatch(set_gonion(val)),
    set_gnathion: (val) => dispatch(set_gnathion(val)),
    set_isa: (val) => dispatch(set_isa(val)),
    set_isi: (val) => dispatch(set_isi(val)),
    set_iia: (val) => dispatch(set_iia(val)),
    set_iii: (val) => dispatch(set_iii(val)),
    set_ms: (val) => dispatch(set_ms(val)),
    set_pogs: (val) => dispatch(set_pogs(val)),
    set_ls: (val) => dispatch(set_ls(val)),
    set_li: (val) => dispatch(set_li(val)),
    set_pog: (val) => dispatch(set_pog(val)),
    set_ans: (val) => dispatch(set_ans(val)),
    set_menton: (val) => dispatch(set_menton(val)),
    set_sna: (val) => dispatch(set_sna(val)),
    set_snb: (val) => dispatch(set_snb(val)),
    set_anb: (val) => dispatch(set_anb(val)),
    set_pogNB: (val) => dispatch(set_pogNB(val)),
    set_snop: (val) => dispatch(set_snop(val)),
    set_snmp: (val) => dispatch(set_snmp(val)),
    set_uina_angular: (val) => dispatch(set_uina_angular(val)),
    set_uina_linear: (val) => dispatch(set_uina_linear(val)),
    set_linb_angular: (val) => dispatch(set_linb_angular(val)),
    set_linb_linear: (val) => dispatch(set_linb_linear(val)),
    set__iia: (val) => dispatch(set__iia(val)),
    set_upper_lip: (val) => dispatch(set_upper_lip(val)),
    set_lower_lip: (val) => dispatch(set_lower_lip(val)),
    set_wendellwylie: (val) => dispatch(set_wendellwylie(val)),
    set_patientid: (val) => dispatch(set_patientid(val)),
    set_doctorid: (val) => dispatch(set_doctorid(val)),
    set_fullname: (val) => dispatch(set_fullname(val)),
    set_gender: (val) => dispatch(set_gender(val)),
    set_birthdate: (val) => dispatch(set_birthdate(val)),
    set_race: (val) => dispatch(set_race(val)),
    set_photo: (val) => dispatch(set_photo(val)),
    set_tempgambar: (val) => dispatch(set_tempgambar(val)),
    set_imageuri: (val) => dispatch(set_imageuri(val)),
    set_imagetype: (val) => dispatch(set_imagetype(val)),
    set_imagefilename: (val) => dispatch(set_imagefilename(val)),
    set_enablesave: (val) => dispatch(set_enablesave(val)),
    remove_startingPoint: (val) => dispatch(remove_startingPoint(val)),
    remove_endPoint: (val) => dispatch(remove_endPoint(val)),
    remove_sella: (val) => dispatch(remove_sella(val)),
    remove_nasion: (val) => dispatch(remove_nasion(val)),
    remove_pointa: (val) => dispatch(remove_pointa(val)),
    remove_pointb: (val) => dispatch(remove_pointb(val)),
    remove_u6: (val) => dispatch(remove_u6(val)),
    remove_u4: (val) => dispatch(remove_u4(val)),
    remove_gonion: (val) => dispatch(remove_gonion(val)),
    remove_gnathion: (val) => dispatch(remove_gnathion(val)),
    remove_isa: (val) => dispatch(remove_isa(val)),
    remove_isi: (val) => dispatch(remove_isi(val)),
    remove_iia: (val) => dispatch(remove_iia(val)),
    remove_iii: (val) => dispatch(remove_iii(val)),
    remove_ms: (val) => dispatch(remove_ms(val)),
    remove_pogs: (val) => dispatch(remove_pogs(val)),
    remove_ls: (val) => dispatch(remove_ls(val)),
    remove_li: (val) => dispatch(remove_li(val)),
    remove_pog: (val) => dispatch(remove_pog(val)),
    remove_ans: (val) => dispatch(remove_ans(val)),
    remove_menton: (val) => dispatch(remove_menton(val)),
    remove_sna: (val) => dispatch(remove_sna(val)),
    remove_snb: (val) => dispatch(remove_snb(val)),
    remove_anb: (val) => dispatch(remove_anb(val)),
    remove_pogNB: (val) => dispatch(remove_pogNB(val)),
    remove_snop: (val) => dispatch(remove_snop(val)),
    remove_snmp: (val) => dispatch(remove_snmp(val)),
    remove_uina_angular: (val) => dispatch(remove_uina_angular(val)),
    remove_uina_linear: (val) => dispatch(remove_uina_linear(val)),
    remove_linb_angular: (val) => dispatch(remove_linb_angular(val)),
    remove_linb_linear: (val) => dispatch(remove_linb_linear(val)),
    remove__iia: (val) => dispatch(remove__iia(val)),
    remove_upper_lip: (val) => dispatch(remove_upper_lip(val)),
    remove_lower_lip: (val) => dispatch(remove_lower_lip(val)),
    remove_wendellwylie: (val) => dispatch(remove_wendellwylie(val)),
    set_headerText: (val) => dispatch(set_headerText(val)),
    set_loading: (val) => dispatch(set_loading(val)),
    set_loading_global: (val) => dispatch(set_loading_global(val)),
    set_select_id: (val) => dispatch(set_select_id(val)),
  };
};

const CalibrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContent);

export default connect(mapStateToProps, mapDispatchToProps)(App);
