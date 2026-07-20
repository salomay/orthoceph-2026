/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
  useWindowDimensions
} from 'react-native';
import 'react-native-gesture-handler';
import FormCephalometric from './component/FormCephalometric';
import FormCephalometricAnalysis from './component/FormCephalometricAnalysis';
import CustomSideBar from './component/CustomSideBar';
import FormLogin from './component/FormLogin';
import FormPatient from './component/FormPatient';
import FormProfile from './component/FormProfile';
import FormPatientList from './component/FormPatientList';
import FormRegistrasi from './component/FormRegistrasi';
import FormThankYou from './component/FormThankYou';
import FormPdfPreview from './component/FormPDFPreview';
import FormAddPatient from './component/FormAddPatient';


import { connect,useSelector, useDispatch } from 'react-redux';
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
  set_press_new_analysis,
  set_press_save_analysis,
  set_reset_scale_image,
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

import {_addAnalysisPatient} from './component/networking/server';
import FormSearchPatient from './component/FormSearchPatient';
import FormCompareResult from './component/FormCompareResult';
import RNPermissions, {
  check,
  request,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  ANALYSIS_DETAILS,
  ANALYSIS_STATE,
  MARK_DETAILS,
} from './component/common/Constants';


const {width, height} = Dimensions.get('screen');

// import LocationEnabler from 'react-native-location-enabler';
let number = 0;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SideBarNavigation ()  {
   const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="Analysis"
     screenOptions={{
      drawerPosition:'right',
      headerShown:false,
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle:{
        width: '80%',
        height: height > 950 ? '100%' : Platform.OS == 'android' ? '100%' : '95%',
        marginTop: height > 950 ? 0 : Platform.OS == 'android' ? 0 : wp(10),
        }
      }}
    
      drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name="Analysis" >
       {(props) => <FormCephalometricAnalysis {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}


const CustomDrawerContent =({navigation,route}) => {

 const bantuMarker = useSelector((state) => state.variabelReducer.bantuMarker);
       const pressSaveAnalysis = useSelector((state) => state.variabelReducer.pressSaveAnalysis);
       const pressAnalysis = useSelector((state) => state.variabelReducer.pressAnalysis);
      const pressNewAnalysis = useSelector((state) => state.variabelReducer.pressNewAnalysis);
       const resetScaleImage = useSelector((state) => state.variabelReducer.resetScaleImage);
       const headerText = useSelector((state) => state.variabelReducer.headerText);
       const subHeaderText = useSelector((state) => state.variabelReducer.subHeaderText);
       const loadingGlobal = useSelector((state) => state.variabelReducer.loadingGlobal);
       const loading = useSelector((state) => state.variabelReducer.loading);
       const disablePointer = useSelector((state) => state.variabelReducer.disablePointer);
       const opacityPointer = useSelector((state) => state.variabelReducer.opacityPointer);
       const startingPoint = useSelector((state) => state.variabelReducer.startingPoint);
       const endPoint = useSelector((state) => state.variabelReducer.endPoint);
       const calibrationDistance = useSelector((state) => state.variabelReducer.calibrationDistance);
       const sella = useSelector((state) => state.variabelReducer.sella);
       const nasion = useSelector((state) => state.variabelReducer.nasion);
       const pointa = useSelector((state) => state.variabelReducer.pointa);
       const pointb = useSelector((state) => state.variabelReducer.pointb);
       const u6 = useSelector((state) => state.variabelReducer.u6);
       const u4 = useSelector((state) => state.variabelReducer.u4);
       const gonion = useSelector((state) => state.variabelReducer.gonion);
       const gnathion = useSelector((state) => state.variabelReducer.gnathion);
       const isa = useSelector((state) => state.variabelReducer.isa);
       const isi = useSelector((state) => state.variabelReducer.isi);
       const iia = useSelector((state) => state.variabelReducer.iia);
       const iii = useSelector((state) => state.variabelReducer.iii);
       const ms = useSelector((state) => state.variabelReducer.ms);
       const pogs = useSelector((state) => state.variabelReducer.pogs);
       const ls = useSelector((state) => state.variabelReducer.ls);
       const li = useSelector((state) => state.variabelReducer.li);
       const pog = useSelector((state) => state.variabelReducer.pog);
       const ans = useSelector((state) => state.variabelReducer.ans);
       const menton = useSelector((state) => state.variabelReducer.menton);
       const markingDot = useSelector((state) => state.variabelReducer.markingDot);
       const resultAnalysis = useSelector((state) => state.variabelReducer.resultAnalysis);
       const detailResult = useSelector((state) => state.variabelReducer.detailResult);
       const selectid = useSelector((state) => state.variabelReducer.selectid);
       const widthLastDevice = useSelector((state) => state.variabelReducer.widthLastDevice);
       const heightLastDevice = useSelector((state) => state.variabelReducer.heightLastDevice);
     
      
      
       const sna = useSelector((state) => state.resultReducer.sna);
       const snb = useSelector((state) => state.resultReducer.snb);
       const anb = useSelector((state) => state.resultReducer.anb);
       const pogNB = useSelector((state) => state.resultReducer.pogNB);
       const snop = useSelector((state) => state.resultReducer.snop);
       const snmp = useSelector((state) => state.resultReducer.snmp);
       const uina_angular = useSelector((state) => state.resultReducer.uina_angular);
       const uina_linear = useSelector((state) => state.resultReducer.uina_linear);
       const linb_angular = useSelector((state) => state.resultReducer.linb_angular);
       const linb_linear = useSelector((state) => state.resultReducer.linb_linear);
       const _iia = useSelector((state) => state.resultReducer._iia);
       const upper_lip = useSelector((state) => state.resultReducer.upper_lip);
       const lower_lip = useSelector((state) => state.resultReducer.lower_lip);
       const mid_face = useSelector((state) => state.resultReducer.mid_face);
       const lower_face = useSelector((state) => state.resultReducer.lower_face);
       const wendellWylie = useSelector((state) => state.resultReducer.wendellWylie);
       const patientid = useSelector((state) => state.patientReducer.patientid);
       const doctorid = useSelector((state) => state.patientReducer.doctorid);
       const fullname = useSelector((state) => state.patientReducer.fullname);
       const gender = useSelector((state) => state.patientReducer.gender);
       const birthdate = useSelector((state) => state.patientReducer.birthdate);
       const race = useSelector((state) => state.patientReducer.race);
       const photo = useSelector((state) => state.patientReducer.photo);
       const ageInYears = useSelector((state) => state.patientReducer.ageInYears);
       const step = useSelector((state) => state.patientReducer.step);
       const tempGambar = useSelector((state) => state.patientReducer.tempGambar);
       const imageUri = useSelector((state) => state.patientReducer.imageUri);
       const imageType = useSelector((state) => state.patientReducer.imageType);
       const imageFileName = useSelector((state) => state.patientReducer.imageFileName);
       const enableSave = useSelector((state) => state.patientReducer.enableSave);
     
      
   
     const dispatch = useDispatch();
     const set_press_analysis_handler = (val) => dispatch(set_press_analysis(val));
     const set_press_new_analysis_handler = (val) => dispatch(set_press_new_analysis(val));
     const set_press_save_analysis_handler = (val) => dispatch(set_press_save_analysis(val));
     const set_reset_scale_image_handler = (val) => dispatch(set_reset_scale_image(val));
     const set_disable_pointer_handler = (val) => dispatch(set_disable_pointer(val));
     const set_opacity_pointer_handler = (val) => dispatch(set_opacity_pointer(val));
     const set_bantuMarker_handler = (val) => dispatch(set_bantuMarker(val));
     const set_markingdot_handler = (val) => dispatch(set_markingdot(val));
     const set_resultanalysis_handler = (val) => dispatch(set_resultanalysis(val));
     const set_detailresult_handler = (val) => dispatch(set_detailresult(val));
     const set_startingPoint_handler = (val) => dispatch(set_startingPoint(val));
     const set_endPoint_handler = (val) => dispatch(set_endPoint(val));
     const set_calibrationDistance_handler = (val) => dispatch(set_calibrationDistance(val));
     const set_sella_handler = (val) => dispatch(set_sella(val));
     const set_nasion_handler = (val) => dispatch(set_nasion(val));
     const set_pointa_handler = (val) => dispatch(set_pointa(val));
     const set_pointb_handler = (val) => dispatch(set_pointb(val));
     const set_u6_handler = (val) => dispatch(set_u6(val));
     const set_u4_handler = (val) => dispatch(set_u4(val));
     const set_gonion_handler = (val) => dispatch(set_gonion(val));
     const set_gnathion_handler = (val) => dispatch(set_gnathion(val));
     const set_isa_handler = (val) => dispatch(set_isa(val));
     const set_isi_handler = (val) => dispatch(set_isi(val));
     const set_iia_handler = (val) => dispatch(set_iia(val));
     const set_iii_handler = (val) => dispatch(set_iii(val));
     const set_ms_handler = (val) => dispatch(set_ms(val));
     const set_pogs_handler = (val) => dispatch(set_pogs(val));
     const set_ls_handler = (val) => dispatch(set_ls(val));
     const set_li_handler = (val) => dispatch(set_li(val));
     const set_pog_handler = (val) => dispatch(set_pog(val));
     const set_ans_handler = (val) => dispatch(set_ans(val));
     const set_menton_handler = (val) => dispatch(set_menton(val));
     const set_sna_handler = (val) => dispatch(set_sna(val));
     const set_snb_handler = (val) => dispatch(set_snb(val));
     const set_anb_handler = (val) => dispatch(set_anb(val));
     const set_pogNB_handler = (val) => dispatch(set_pogNB(val));
     const set_snop_handler = (val) => dispatch(set_snop(val));
     const set_snmp_handler = (val) => dispatch(set_snmp(val));
     const set_uina_angular_handler = (val) => dispatch(set_uina_angular(val));
     const set_uina_linear_handler = (val) => dispatch(set_uina_linear(val));
     const set_linb_angular_handler = (val) => dispatch(set_linb_angular(val));
     const set_linb_linear_handler = (val) => dispatch(set_linb_linear(val));
     const set__iia_handler = (val) => dispatch(set__iia(val));
     const set_upper_lip_handler = (val) => dispatch(set_upper_lip(val));
     const set_lower_lip_handler = (val) => dispatch(set_lower_lip(val));
     const set_wendellwylie_handler = (val) => dispatch(set_wendellwylie(val));
     const set_patientid_handler = (val) => dispatch(set_patientid(val));
     const set_doctorid_handler = (val) => dispatch(set_doctorid(val));
     const set_fullname_handler = (val) => dispatch(set_fullname(val));
     const set_gender_handler = (val) => dispatch(set_gender(val));
     const set_birthdate_handler = (val) => dispatch(set_birthdate(val));
     const set_race_handler = (val) => dispatch(set_race(val));
     const set_photo_handler = (val) => dispatch(set_photo(val));
     const set_tempgambar_handler = (val) => dispatch(set_tempgambar(val));
     const set_imageuri_handler = (val) => dispatch(set_imageuri(val));
     const set_imagetype_handler = (val) => dispatch(set_imagetype(val));
     const set_imagefilename_handler = (val) => dispatch(set_imagefilename(val));
     const set_enablesave_handler = (val) => dispatch(set_enablesave(val));
     const remove_startingPoint_handler = (val) => dispatch(remove_startingPoint(val));
     const remove_endPoint_handler = (val) => dispatch(remove_endPoint(val));
     const remove_sella_handler = (val) => dispatch(remove_sella(val));
     const remove_nasion_handler = (val) => dispatch(remove_nasion(val));
     const remove_pointa_handler = (val) => dispatch(remove_pointa(val));
     const remove_pointb_handler = (val) => dispatch(remove_pointb(val));
     const remove_u6_handler = (val) => dispatch(remove_u6(val));
     const remove_u4_handler = (val) => dispatch(remove_u4(val));
     const remove_gonion_handler = (val) => dispatch(remove_gonion(val));
     const remove_gnathion_handler = (val) => dispatch(remove_gnathion(val));
     const remove_isa_handler = (val) => dispatch(remove_isa(val));
     const remove_isi_handler = (val) => dispatch(remove_isi(val));
     const remove_iia_handler = (val) => dispatch(remove_iia(val));
     const remove_iii_handler = (val) => dispatch(remove_iii(val));
     const remove_ms_handler = (val) => dispatch(remove_ms(val));
     const remove_pogs_handler = (val) => dispatch(remove_pogs(val));
     const remove_ls_handler = (val) => dispatch(remove_ls(val));
     const remove_li_handler = (val) => dispatch(remove_li(val));
     const remove_pog_handler = (val) => dispatch(remove_pog(val));
     const remove_ans_handler = (val) => dispatch(remove_ans(val));
     const remove_menton_handler = (val) => dispatch(remove_menton(val));
     const remove_sna_handler = (val) => dispatch(remove_sna(val));
     const remove_snb_handler = (val) => dispatch(remove_snb(val));
     const remove_anb_handler = (val) => dispatch(remove_anb(val));
     const remove_pogNB_handler = (val) => dispatch(remove_pogNB(val));
     const remove_snop_handler = (val) => dispatch(remove_snop(val));
     const remove_snmp_handler = (val) => dispatch(remove_snmp(val));
     const remove_uina_angular_handler = (val) => dispatch(remove_uina_angular(val));
     const remove_uina_linear_handler = (val) => dispatch(remove_uina_linear(val));
     const remove_linb_angular_handler = (val) => dispatch(remove_linb_angular(val));
     const remove_linb_linear_handler = (val) => dispatch(remove_linb_linear(val));
     const remove__iia_handler = (val) => dispatch(remove__iia(val));
     const remove_upper_lip_handler = (val) => dispatch(remove_upper_lip(val));
     const remove_lower_lip_handler = (val) => dispatch(remove_lower_lip(val));
     const remove_wendellwylie_handler = (val) => dispatch(remove_wendellwylie(val));
     const set_headerText_handler = (val) => dispatch(set_headerText(val));
     const set_loading_handler = (val) => dispatch(set_loading(val));
     const set_loading_global_handler = (val) => dispatch(set_loading_global(val));
     const set_select_id_handler = (val) => dispatch(set_select_id(val));



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
    console.log('ANALYSIS APP');
    navigation.closeDrawer();

    if (startingPoint.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Starting Point!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (endPoint.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position End Point!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (sella.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Sella!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (nasion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Nasion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (pointa.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Point A!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (pointb.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Point B!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (u6.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position U6!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (u4.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position U4!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (gonion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Gonion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (gnathion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Gnathion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (isa.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ISA!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (isi.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ISI!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (iia.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position IIA!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (iii.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position III!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (ms.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position MS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (pogs.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Soft Pogonion (Pog`)!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (ls.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position LS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (li.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position LI!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (pog.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Pogonion (Pog)!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (ans.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ANS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (menton.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Menton!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else {
      set_loading_global_handler(true);
      set_markingdot_handler(false);
      set_resultanalysis_handler(true);
      set_detailresult_handler(false);

      setTimeout(() => {
        process_analysis();
      }, 500);
    }
    return null;
  }

  async function process_analysis() {
    const _calibrationDistance = Number(calibrationDistance);
    const _calibrationPointDistance = await distanceBetween(
      startingPoint[0],
      endPoint[0],
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

    _SNA = await SNA(sella[0], nasion[0], pointa[0]);
    set_sna_handler(_SNA);

    _SNB = await SNB(sella[0], nasion[0], pointb[0]);
    set_snb_handler(_SNB);
    _ANB = await ANB(pointa[0], nasion[0], pointb[0]);
    set_anb_handler(_ANB);
    _PogNB = await PogNB(
      pog[0],
      nasion[0],
      pointb[0],
      _calibrationRatio,
    );
    set_pogNB_handler(_PogNB);
    _SNOP = await SNOP(
      sella[0],
      nasion[0],
      u6[0],
      u4[0],
    );
    set_snop_handler(_SNOP);
    _SNMP = await SNMP(
      sella[0],
      nasion[0],
      gonion[0],
      gnathion[0],
    );
    set_snmp_handler(_SNMP);
    _UINA_Angular = await UINA_ANGULAR(
      nasion[0],
      pointa[0],
      isa[0],
      isi[0],
    );
    set_uina_angular_handler(_UINA_Angular);
    _UINA_Linear = await UINA_LINEAR(
      nasion[0],
      pointa[0],
      isa[0],
      isi[0],
      _calibrationRatio,
    );
    set_uina_linear_handler(_UINA_Linear);
    _LINB_Angular = await LINB_ANGULAR(
      nasion[0],
      pointb[0],
      iia[0],
      iii[0],
    );
    set_linb_angular_handler(_LINB_Angular);
    _LINB_Linear = await LINB_LINEAR(
      nasion[0],
      pointb[0],
      iia[0],
      iii[0],
      _calibrationRatio,
    );
    set_linb_linear_handler(_LINB_Linear);
    __IIA = await IIA(isa[0], isi[0], iia[0], iii[0]);
    set__iia_handler(__IIA);
    _Upper_Lip = await UPPER_LIP(
      ms[0],
      pogs[0],
      ls[0],
      _calibrationRatio,
    );
    set_upper_lip_handler(_Upper_Lip);
    _Lower_Lip = await LOWER_LIP(
      ms[0],
      pogs[0],
      li[0],
      _calibrationRatio,
    );
    set_lower_lip_handler(_Lower_Lip);
    _WendellWylie = await WendellWylie(
      nasion[0],
      ans[0],
      menton[0],
      _calibrationRatio,
    );

    set_wendellwylie_handler(_WendellWylie);

    set_reset_scale_image_handler(true);

    

    if (_WendellWylie.LOWERFACE.value) {
        set_enablesave_handler(true);
        set_loading_handler(false);
        set_loading_global_handler(false);
        navigation.openDrawer();
    }

    
  }

  function _markAgain() {
    set_loading_global_handler(true);
    navigation.closeDrawer();
    set_markingdot_handler(true);
    set_resultanalysis_handler(false);
    set_detailresult_handler(false);
    set_enablesave_handler(false);
    setTimeout(() => {
      navigation.openDrawer();
      set_loading_global_handler(false);
    }, 500);
    set_reset_scale_image_handler(true);
  }

  function _exportPDF() {
    set_press_analysis_handler(true);
  }

  function pressDetailAnalysis(IDS) {
    console.log('PRESSED :' + IDS);

    set_resultanalysis_handler(false);
    set_detailresult_handler(true);
    set_select_id_handler(IDS);

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
      setContentTitleValue(sna.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(sna.status).iconName);
      setIconColor(checkStatusAnalysis(sna.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          sna.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNB') {
      setContentTitleValue(snb.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(snb.status).iconName);
      setIconColor(checkStatusAnalysis(snb.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          snb.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/ANB') {
      setContentTitleValue(anb.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(anb.status).iconName);
      setIconColor(checkStatusAnalysis(anb.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          anb.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/POGNB') {
      setContentTitleValue(
        pogNB.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(pogNB.status).iconName);
      setIconColor(checkStatusAnalysis(pogNB.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          pogNB.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNOP') {
      setContentTitleValue(snop.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(snop.status).iconName);
      setIconColor(checkStatusAnalysis(snop.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          snop.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/SNMP') {
      setContentTitleValue(snmp.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(snmp.status).iconName);
      setIconColor(checkStatusAnalysis(snmp.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          snmp.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UINA_ANGULAR') {
      setContentTitleValue(
        uina_angular.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(uina_angular.status).iconName);
      setIconColor(checkStatusAnalysis(uina_angular.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          uina_angular.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UINA_LINEAR') {
      setContentTitleValue(
        uina_linear.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(uina_linear.status).iconName);
      setIconColor(checkStatusAnalysis(uina_linear.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          uina_linear.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LINB_ANGULAR') {
      setContentTitleValue(
        linb_angular.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(linb_angular.status).iconName);
      setIconColor(checkStatusAnalysis(linb_angular.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          linb_angular.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LINB_LINEAR') {
      setContentTitleValue(
        linb_linear.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(linb_linear.status).iconName);
      setIconColor(checkStatusAnalysis(linb_linear.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          linb_linear.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/IIA') {
      setContentTitleValue(_iia.value + getAnalysisDetailsByID(IDS).UNIT);
      setIconName(checkStatusAnalysis(_iia.status).iconName);
      setIconColor(checkStatusAnalysis(_iia.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          _iia.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/UPPER_LIP') {
      setContentTitleValue(
        upper_lip.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(upper_lip.status).iconName);
      setIconColor(checkStatusAnalysis(upper_lip.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          upper_lip.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LOWER_LIP') {
      setContentTitleValue(
        lower_lip.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(checkStatusAnalysis(lower_lip.status).iconName);
      setIconColor(checkStatusAnalysis(lower_lip.status).iconColor);
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          lower_lip.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/MIDFACE') {
      setContentTitleValue(
        wendellWylie.MIDFACE.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(
        checkStatusAnalysis(wendellWylie.MIDFACE.status).iconName,
      );
      setIconColor(
        checkStatusAnalysis(wendellWylie.MIDFACE.status).iconColor,
      );
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          wendellWylie.MIDFACE.value +
          getAnalysisDetailsByID(IDS).UNIT,
      );
    } else if (IDS == 'IDS/ANALYSIS/LOWERFACE') {
      setContentTitleValue(
        wendellWylie.LOWERFACE.value + getAnalysisDetailsByID(IDS).UNIT,
      );
      setIconName(
        checkStatusAnalysis(wendellWylie.LOWERFACE.status).iconName,
      );
      setIconColor(
        checkStatusAnalysis(wendellWylie.LOWERFACE.status).iconColor,
      );
      set_headerText_handler(
        getAnalysisDetailsByID(IDS).TITLE +
          ' ' +
          wendellWylie.LOWERFACE.value +
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
    set_resultanalysis_handler(true);
    set_detailresult_handler(false);
    set_select_id_handler(null);
    set_headerText_handler('Cephalometric ' + step);
  }

  function _showOnCeph() {
    navigation.closeDrawer();
  }


  return (
    <View style={{flex: 1}}>

      {/* =============== HEADER TOP ================================== */}
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
            source={photo}
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
            {fullname}
          </Text>
          <Text style={{color: 'white', fontSize: wp(3)}}>
            {gender + ' / ' + ageInYears + ' Y'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: wp(2.5),
              flexWrap: 'wrap',
              flexShrink: 1,
            }}>
            {race}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginRight: wp(10)}}
          onPress={() => set_press_new_analysis_handler(true)}>
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

        {enableSave ? (
          <TouchableOpacity onPress={() => set_press_save_analysis_handler(true)}>
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
    {/* =============== HEADER TOP END================================== */}

      {markingDot === true ? (
        <>
          <HeaderStep
            headerText={'Cephalometric One'}
            headerIcon={'help-circle-outline'}
          />

          {detailResult !== true ? (
            <>
             <CalibrationContent navigation={navigation}/>
            <CephalometricLandMarkContent navigation={navigation}/>
              
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

      {detailResult ? (
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

      {detailResult ? (
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
      {resultAnalysis ? (
        <>
          <HeaderResult
            headerText={'Analysis Result'}
            headerIcon={'format-list-bulleted'}
          />
          <ResultContent
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


const HeaderStep = ({headerText, headerIcon}) => {
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

const HeaderResult = ({headerText, headerIcon}) => {
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



const CalibrationContent = ({navigation,route}) => {

     const dispatch = useDispatch();
     const set_bantuMarker_handler = (val) => dispatch(set_bantuMarker(val));
     const set_headerText_handler = (val) => dispatch(set_headerText(val));
     const set_disable_pointer_handler = (val) => dispatch(set_disable_pointer(val));
     const set_opacity_pointer_handler = (val) => dispatch(set_opacity_pointer(val));
     const set_resultanalysis_handler = (val) => dispatch(set_resultanalysis(val));



      const startingPoint = useSelector((state) => state.variabelReducer.startingPoint);
       const endPoint = useSelector((state) => state.variabelReducer.endPoint);
       const calibrationDistance = useSelector((state) => state.variabelReducer.calibrationDistance);
       const sella = useSelector((state) => state.variabelReducer.sella);
       const nasion = useSelector((state) => state.variabelReducer.nasion);
       const pointa = useSelector((state) => state.variabelReducer.pointa);
       const pointb = useSelector((state) => state.variabelReducer.pointb);
       const u6 = useSelector((state) => state.variabelReducer.u6);
       const u4 = useSelector((state) => state.variabelReducer.u4);
       const gonion = useSelector((state) => state.variabelReducer.gonion);
       const gnathion = useSelector((state) => state.variabelReducer.gnathion);
       const isa = useSelector((state) => state.variabelReducer.isa);
       const isi = useSelector((state) => state.variabelReducer.isi);
       const iia = useSelector((state) => state.variabelReducer.iia);
       const iii = useSelector((state) => state.variabelReducer.iii);
       const ms = useSelector((state) => state.variabelReducer.ms);
       const pogs = useSelector((state) => state.variabelReducer.pogs);
       const ls = useSelector((state) => state.variabelReducer.ls);
       const li = useSelector((state) => state.variabelReducer.li);
       const pog = useSelector((state) => state.variabelReducer.pog);
       const ans = useSelector((state) => state.variabelReducer.ans);
       const menton = useSelector((state) => state.variabelReducer.menton);
     

  function setData(val, headerText) {
    set_bantuMarker_handler(val);
    navigation.closeDrawer();
    set_disable_pointer_handler('auto');
    set_opacity_pointer_handler(1);
    set_headerText_handler(headerText);
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
        {/* {console.log(startingPoint[0])} */}
        <View style={{flexDirection: 'row', width: '93%'}}>
          <MaterialCommunityIcons name="ray-start" size={wp(5)} />
          <Text style={{fontSize: wp(3), marginLeft: wp(5)}}>
            Starting Point of Calibration
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              startingPoint[0]?.x ? 'checkbox-active' : 'checkbox-passive'
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
            name={endPoint[0]?.x ? 'checkbox-active' : 'checkbox-passive'}
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
            Calibration Distance : {calibrationDistance} mm
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Fontisto
            name={
              calibrationDistance > 0
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

const ResultContent = ({pressDetailAnalysis}) => {


    const sna = useSelector((state) => state.resultReducer.sna);
       const snb = useSelector((state) => state.resultReducer.snb);
       const anb = useSelector((state) => state.resultReducer.anb);
       const pogNB = useSelector((state) => state.resultReducer.pogNB);
       const snop = useSelector((state) => state.resultReducer.snop);
       const snmp = useSelector((state) => state.resultReducer.snmp);
       const uina_angular = useSelector((state) => state.resultReducer.uina_angular);
       const uina_linear = useSelector((state) => state.resultReducer.uina_linear);
       const linb_angular = useSelector((state) => state.resultReducer.linb_angular);
       const linb_linear = useSelector((state) => state.resultReducer.linb_linear);
       const _iia = useSelector((state) => state.resultReducer._iia);
       const upper_lip = useSelector((state) => state.resultReducer.upper_lip);
       const lower_lip = useSelector((state) => state.resultReducer.lower_lip);
       const mid_face = useSelector((state) => state.resultReducer.mid_face);
       const lower_face = useSelector((state) => state.resultReducer.lower_face);
       const wendellWylie = useSelector((state) => state.resultReducer.wendellWylie);

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
        onPress={() => pressDetailAnalysis(sna.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(sna.status).iconName}
              color={checkStatusAnalysis(sna.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNA</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + sna.value + ANALYSIS_DETAILS[0].UNIT}
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
        onPress={() => pressDetailAnalysis(snb.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(snb.status).iconName}
              color={checkStatusAnalysis(snb.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + snb.value + ANALYSIS_DETAILS[1].UNIT}
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
        onPress={() => pressDetailAnalysis(anb.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(anb.status).iconName}
              color={checkStatusAnalysis(anb.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>ANB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + anb.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(pogNB.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(pogNB.status).iconName}
              color={checkStatusAnalysis(pogNB.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>PogNB</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + pogNB.value + 'mm'}
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
        onPress={() => pressDetailAnalysis(snop.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(snop.status).iconName}
              color={checkStatusAnalysis(snop.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNOP</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + snop.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(snmp.id)}>
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
              name={checkStatusAnalysis(snmp.status).iconName}
              color={checkStatusAnalysis(snmp.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>SNMP</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + snmp.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(uina_angular.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(uina_angular.status).iconName}
              color={checkStatusAnalysis(uina_angular.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>UINA-Angular</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + uina_angular.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(uina_linear.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(uina_linear.status).iconName}
              color={checkStatusAnalysis(uina_linear.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>UINA-Linear</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + uina_linear.value + 'mm'}
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
        onPress={() => pressDetailAnalysis(linb_angular.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(linb_angular.status).iconName}
              color={checkStatusAnalysis(linb_angular.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>LINB-Angular</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + linb_angular.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(linb_linear.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(linb_linear.status).iconName}
              color={checkStatusAnalysis(linb_linear.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>LINB-Linear</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + linb_linear.value + 'mm'}
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
        onPress={() => pressDetailAnalysis(_iia.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(_iia.status).iconName}
              color={checkStatusAnalysis(_iia.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>IIA</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + _iia.value + '\u00b0'}
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
        onPress={() => pressDetailAnalysis(upper_lip.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(upper_lip.status).iconName}
              color={checkStatusAnalysis(upper_lip.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Upper Lip</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + upper_lip.value + 'mm'}
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
        onPress={() => pressDetailAnalysis(lower_lip.id)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={checkStatusAnalysis(lower_lip.status).iconName}
              color={checkStatusAnalysis(lower_lip.status).iconColor}
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Lower Lip</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' + ' ' + lower_lip.value + 'mm'}
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
        onPress={() => pressDetailAnalysis(wendellWylie.MIDFACE.id)}>
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
                checkStatusAnalysis(wendellWylie.MIDFACE?.status).iconName
              }
              color={
                checkStatusAnalysis(wendellWylie.MIDFACE?.status)
                  .iconColor
              }
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Mid Face</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' +
                  ' ' +
                  wendellWylie.MIDFACE?.distanceValue +
                  'mm (' +
                  wendellWylie.MIDFACE?.value +
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
        onPress={() => pressDetailAnalysis(wendellWylie.LOWERFACE.id)}>
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
                checkStatusAnalysis(wendellWylie.LOWERFACE?.status)
                  .iconName
              }
              color={
                checkStatusAnalysis(wendellWylie.LOWERFACE?.status)
                  .iconColor
              }
              size={wp(5)}
            />
            <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
              <Text style={{fontSize: wp(3.5)}}>Lower Face</Text>
              <Text style={{textAlign: 'left', fontSize: wp(2.5)}}>
                {'Value :' +
                  ' ' +
                  wendellWylie.LOWERFACE?.distanceValue +
                  'mm (' +
                  wendellWylie.LOWERFACE?.value +
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


const CephalometricLandMarkContent =({navigation,route}) => {
  let number = 3;

   const dispatch = useDispatch();
     const set_bantuMarker_handler = (val) => dispatch(set_bantuMarker(val));
     const set_headerText_handler = (val) => dispatch(set_headerText(val));
     const set_disable_pointer_handler = (val) => dispatch(set_disable_pointer(val));
     const set_opacity_pointer_handler = (val) => dispatch(set_opacity_pointer(val));
     const set_resultanalysis_handler = (val) => dispatch(set_resultanalysis(val));

        const startingPoint = useSelector((state) => state.variabelReducer.startingPoint);
       const endPoint = useSelector((state) => state.variabelReducer.endPoint);
       const calibrationDistance = useSelector((state) => state.variabelReducer.calibrationDistance);
       const sella = useSelector((state) => state.variabelReducer.sella);
       const nasion = useSelector((state) => state.variabelReducer.nasion);
       const pointa = useSelector((state) => state.variabelReducer.pointa);
       const pointb = useSelector((state) => state.variabelReducer.pointb);
       const u6 = useSelector((state) => state.variabelReducer.u6);
       const u4 = useSelector((state) => state.variabelReducer.u4);
       const gonion = useSelector((state) => state.variabelReducer.gonion);
       const gnathion = useSelector((state) => state.variabelReducer.gnathion);
       const isa = useSelector((state) => state.variabelReducer.isa);
       const isi = useSelector((state) => state.variabelReducer.isi);
       const iia = useSelector((state) => state.variabelReducer.iia);
       const iii = useSelector((state) => state.variabelReducer.iii);
       const ms = useSelector((state) => state.variabelReducer.ms);
       const pogs = useSelector((state) => state.variabelReducer.pogs);
       const ls = useSelector((state) => state.variabelReducer.ls);
       const li = useSelector((state) => state.variabelReducer.li);
       const pog = useSelector((state) => state.variabelReducer.pog);
       const ans = useSelector((state) => state.variabelReducer.ans);
       const menton = useSelector((state) => state.variabelReducer.menton);

  function setData(val, headerText) {
    set_bantuMarker_handler(val);
    set_headerText_handler(headerText);
    navigation.closeDrawer();
    set_disable_pointer_handler('auto');
    set_opacity_pointer_handler(1);
    // set_markingdot_handler(true);
    set_resultanalysis_handler(false);
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
                      sella[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'N' ? (
                  <Fontisto
                    name={
                      nasion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'A' ? (
                  <Fontisto
                    name={
                      pointa[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'B' ? (
                  <Fontisto
                    name={
                      pointb[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'U6' ? (
                  <Fontisto
                    name={
                      u6[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'U4' ? (
                  <Fontisto
                    name={
                      u4[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Go' ? (
                  <Fontisto
                    name={
                      gonion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Gn' ? (
                  <Fontisto
                    name={
                      gnathion[0]?.x
                        ? 'checkbox-active'
                        : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ISA' ? (
                  <Fontisto
                    name={
                      isa[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ISI' ? (
                  <Fontisto
                    name={
                      isi[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'IIA' ? (
                  <Fontisto
                    name={
                      iia[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'III' ? (
                  <Fontisto
                    name={
                      iii[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'MS' ? (
                  <Fontisto
                    name={
                      ms[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == `Pog\xB4` ? (
                  <Fontisto
                    name={
                      pogs[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'LS' ? (
                  <Fontisto
                    name={
                      ls[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'LI' ? (
                  <Fontisto
                    name={
                      li[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Pog' ? (
                  <Fontisto
                    name={
                      pog[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'ANS' ? (
                  <Fontisto
                    name={
                      ans[0]?.x ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={wp(5)}
                  />
                ) : null}

                {item.INITIAL == 'Me' ? (
                  <Fontisto
                    name={
                      menton[0]?.x
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

function isVersionOlder(current, target) {
  const currentParts = current.split('.').map(Number);
  const targetParts = target.split('.').map(Number);

  for (let i = 0; i < Math.max(currentParts.length, targetParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const targetPart = targetParts[i] || 0;

    if (currentPart < targetPart) return true;
    if (currentPart >= targetPart) return false;
  }
  return false;
}



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

 permission_android = async ()=>{
  if (Platform.OS === 'android') {
      const akses_lokasi = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
    }
}

   componentDidMount() {

   
  
    console.log("masuk Didmount app.tsx, declare reset props")
    this.props.set_loading_global(false);
    this.props.set_detailresult(false);
    this.props.set_select_id(null);

    this.permission_android()
    

    if (Platform.OS === 'ios') {
      RNPermissions.requestMultiple(
        [
          'ios.permission.LOCATION_ALWAYS',
          'ios.permission.LOCATION_WHEN_IN_USE',
        ],
        {
          purposeKey: 'full-accuracy',
        },
      ).then((accuracy) => {
        console.log(accuracy);
      });
    }
  
  }

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
        <>
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
                      ...TransitionPresets.SlideFromRightIOS,
                    headerStyle: {
                      elevation: 0,
                    },
                    fullScreenGestureEnabled:true,
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
                    fullScreenGestureEnabled:true,
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="FormPatient"
                  component={FormPatient}
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
                      ...TransitionPresets.SlideFromRightIOS,
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
                  options={{
                    headerStyle: {
                      elevation: 0,
                    },
                    headerShown: false,
                  }}
                >
                  {() => <SideBarNavigation  props={this.props} />}
                  </Stack.Screen>

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
                  options={{
                    // gestureDirection: 'horizontal',
                    // ...TransitionPresets.SlideFromRightIOS,
                    headerStyle: {
                      elevation: 0,
                    },
                    headerShown: false,
                  }}
              >
                    {() => <SideBarNavigation  props={this.props}  />}
                  </Stack.Screen>

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
          <Toast />
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bantuMarker: state.variabelReducer.bantuMarker,
    loadingGlobal: state.variabelReducer.loadingGlobal,
    loading: state.variabelReducer.loading,
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
    set_reset_scale_image: (val) => dispatch(set_reset_scale_image(val)),
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



export default connect(mapStateToProps, mapDispatchToProps)(App);
