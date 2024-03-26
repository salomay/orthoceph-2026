import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
  BackHandler,
  TouchableWithoutFeedback,
  PlatformIOSStatic,
  SafeAreaView,
  PixelRatio,
} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import ImageViewer from 'react-native-image-pan-zoom/built/image-zoom/image-zoom.component';
import {Appbar, TextInput, CardTitle, Button} from 'react-native-paper';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {launchImageLibrary} from 'react-native-image-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Svg, {
  Circle,
  Line,
  G,
  Rect,
  SvgXml,
  ClipPath,
  Polyline,
  Polygon,
} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {connect, useDispatch} from 'react-redux';

import {
  set_markingdot,
  set_resultanalysis,
  set_detailresult,
  set_press_analysis,
  set_press_save_analysis,
  set_reset_scale_image,
  set_disable_pointer,
  set_opacity_pointer,
  set_bantuMarker,
  set_ans,
  set_endPoint,
  set_calibrationDistance,
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
  set_nasion,
  set_pog,
  set_pogs,
  set_pointa,
  set_pointb,
  set_sella,
  set_startingPoint,
  set_u4,
  set_u6,
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
  set_subHeaderText,
  set_loading,
  set_loading_global,
  set_select_id,
  set_width_last_device,
  set_height_last_device,
} from './actions/variabel';
import {CALIBRATION_DETAILS, MARK_DETAILS} from './common/Constants';
import {generateCephHtml} from './common/Utils';
import {
  _addAnalysisPatient,
  _viewExistingAnalysis,
  _openImage,
  _addAnalysisPatientExistingImage,
  _addPdfReport,
  _addImageAnalysis,
} from './networking/server';
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
} from './common/Utils';
import {scale, moderateScale, verticalScale} from './Scaling';

const key = 'Yzg1MDhmNDYzZjRlMWExOGJkNTk5MmVmNzFkOGQyNzk=';

const spacing = 16;

const dashes = new Array(Math.floor(100 / spacing)).fill(null);

var touch_count = 0;
var point_speed = 0.3;
var marker = [21];
var bantuClick = true;

export const newAnalysis = (props) => {
  props.props.set_loading(true);
  props.props.navigation.closeDrawer();
  props.props.set_headerText('Cephalometric Analysis');
  props.props.set_bantuMarker(0);

  const options = {
    title: 'Choose Your Image',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
    // maxWidth: 500,
    // maxHeight: 500,
    quality: 1,
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      props.props.set_loading(false);
    } else if (response.errorCode) {
      console.log('Image Picker Error: ', response.errorMessage);
      props.props.set_loading(false);
    } else {
      let source = {uri: response.assets[0].uri};

      marker = [];

      props.props.set_tempgambar(source);
      props.props.set_imageuri(response.assets[0].uri);
      props.props.set_imagetype(response.assets[0].type);
      props.props.set_imagefilename(response.assets[0].fileName);

      props.props.remove_startingPoint([]);
      props.props.remove_endPoint([]);
      props.props.set_calibrationDistance(null);
      props.props.remove_sella([]);
      props.props.remove_nasion([]);
      props.props.remove_pointa([]);
      props.props.remove_pointb([]);
      props.props.remove_u6([]);
      props.props.remove_u4([]);
      props.props.remove_gonion([]);
      props.props.remove_gnathion([]);
      props.props.remove_isa([]);
      props.props.remove_isi([]);
      props.props.remove_iia([]);
      props.props.remove_iii([]);
      props.props.remove_ms([]);
      props.props.remove_pogs([]);
      props.props.remove_li([]);
      props.props.remove_ls([]);
      props.props.remove_pog([]);
      props.props.remove_ans([]);
      props.props.remove_menton([]);

      props.props.remove_sna([]);
      props.props.remove_snb([]);
      props.props.remove_anb([]);
      props.props.remove_pogNB([]);
      props.props.remove_snop([]);
      props.props.remove_snmp([]);
      props.props.remove_uina_angular([]);
      props.props.remove_uina_linear([]);
      props.props.remove_linb_angular([]);
      props.props.remove_linb_linear([]);
      props.props.remove__iia([]);
      props.props.remove_upper_lip([]);
      props.props.remove_lower_lip([]);
      props.props.remove_wendellwylie([]);
      props.props.set_bantuMarker(1);
      props.props.set_loading(false);
      props.props.set_select_id(null);
      props.props.set_markingdot(true);
      props.props.set_detailresult(false);
      props.props.set_resultanalysis(false);
    }
  });
};

export const saveAnalysis = (props) => {
  props.props.set_press_save_analysis(true);
};

const {widthScreen, heightScreen} = Dimensions.get('screen');
const {widthScreenAndroid, heightScreenAndroid} = Dimensions.get('window');

let fadeIn = new Animated.Value(Dimensions.get('window').width);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FormCephalometricAnalysis = (props, {navigation}) => {
  const ref_capture = useRef();
  const refImageZoom = useRef();
  const click_imageZoom = useRef(null);

  // const [marker, setMarker] = useState([21]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const [textModal, setTextModal] = useState('');
  const [titleText, setTitleText] = useState('');
  const [_headerText, set_headerText] = useState('');
  const [pinchToZoom, setPinchToZoom] = useState(false);
  const [scaleScreen, setScaleScreen] = useState(null);
  const [correctionPoint, setcorrectionPoint] = useState(null);

  const [widthImage, setWidthImage] = useState(null);
  const [heightImage, setHeightImage] = useState(null);

  const fadeAnim = useRef(new Animated.Value(3)).current;
  const strokeBorderAnim = useRef(new Animated.Value(0.8)).current;

  const layoutWidth = PixelRatio.getPixelSizeForLayoutSize(
    props.widthLastDevice,
  );
  const layoutHeight = PixelRatio.getPixelSizeForLayoutSize(
    props.heightLastDevice,
  );

  //BACK HANDLER
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Do you want to save before exiting?',
        'Unsaved work will be lost.',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'DONT SAVE',
            onPress: () => {
              backHandler.remove();
              props.navigation.goBack();
            },
            style: 'cancel',
          },
          {text: 'SAVE', onPress: () => props.set_press_save_analysis(true)},
        ],
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setTitleText('');
    props.set_bantuMarker(0);

    clearVaribleGlobal();
    props.set_enablesave(false);

    return () => {
      props.set_loading(true);
      props.set_bantuMarker(0);
      props.set_markingdot(true);
      props.set_resultanalysis(false);
      props.set_detailresult(false);

      props.set_tempgambar(null);
      props.set_imageuri(null);
      props.set_imagetype(null);
      props.set_imagefilename(null);

      props.remove_startingPoint([]);
      props.remove_endPoint([]);
      props.set_calibrationDistance(null);
      props.remove_sella([]);
      props.remove_nasion([]);
      props.remove_pointa([]);
      props.remove_pointb([]);
      props.remove_u6([]);
      props.remove_u4([]);
      props.remove_gonion([]);
      props.remove_gnathion([]);
      props.remove_isa([]);
      props.remove_isi([]);
      props.remove_iia([]);
      props.remove_iii([]);
      props.remove_ms([]);
      props.remove_pogs([]);
      props.remove_li([]);
      props.remove_ls([]);
      props.remove_pog([]);
      props.remove_ans([]);
      props.remove_menton([]);

      props.remove_sna([]);
      props.remove_snb([]);
      props.remove_anb([]);
      props.remove_pogNB([]);
      props.remove_snop([]);
      props.remove_snmp([]);
      props.remove_uina_angular([]);
      props.remove_uina_linear([]);
      props.remove_linb_angular([]);
      props.remove_linb_linear([]);
      props.remove__iia([]);
      props.remove_upper_lip([]);
      props.remove_lower_lip([]);
      props.remove_wendellwylie([]);
      props.set_headerText('Cephalometric Analysis');
      props.set_subHeaderText('');
    };
  }, []);

  useEffect(() => {
    console.log('bantumarker : ' + props.bantuMarker);
    if (props.bantuMarker > 0 && props.tempGambar && props.bantuMarker < 23) {
      props.set_disable_pointer('auto');
      props.set_opacity_pointer(1);

      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).reset();
      console.log('###masuk edit point###' + props.bantuMarker);
    } else if (props.bantuMarker === 23) {
      props.navigation.openDrawer();

      // props.set_resultanalysis(false);
      // props.set_detailresult(false);
    } else if (props.bantuMarker === 24) {
      props.set_disable_pointer('none');
      props.set_opacity_pointer(0.5);
      props.set_enablesave(false);
      props.set_detailresult(false);
      _analysis();
    }

    setTitle();

    console.log('tempGambar' + props.tempGambar);
    if (props.bantuMarker == 0 && props.tempGambar !== null) {
      props.set_bantuMarker(1);
    }

    if (
      props.bantuMarker == 0 &&
      props.headerText === 'Starting Point of Calibration'
    ) {
      props.set_bantuMarker(1);
    }
  }, [props.bantuMarker]);

  //existing load all data after loading
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1.3,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(strokeBorderAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (props.bantuMarker == 23 && props.loading == false) {
    }
  }, [props.loading]);

  useEffect(() => {
    if (pinchToZoom == false) {
      click_imageZoom.current?.touch;
      // setPinchToZoom(true);
    }

    return () => {
      if (pinchToZoom == true) {
        setPinchToZoom(false);
      }
    };
  }, [pinchToZoom]);

  useLayoutEffect(() => {
    return () => {
      props.set_bantuMarker(0);
      props.set_markingdot(true);
      props.set_resultanalysis(false);
      props.set_detailresult(false);
      props.set_enablesave(true);
      props.set_tempgambar(null);
      props.set_imageuri(null);
      props.set_imagetype(null);
      props.set_imagefilename(null);

      props.remove_startingPoint([]);
      props.remove_endPoint([]);
      props.set_calibrationDistance(null);
      props.remove_sella([]);
      props.remove_nasion([]);
      props.remove_pointa([]);
      props.remove_pointb([]);
      props.remove_u6([]);
      props.remove_u4([]);
      props.remove_gonion([]);
      props.remove_gnathion([]);
      props.remove_isa([]);
      props.remove_isi([]);
      props.remove_iia([]);
      props.remove_iii([]);
      props.remove_ms([]);
      props.remove_pogs([]);
      props.remove_li([]);
      props.remove_ls([]);
      props.remove_pog([]);
      props.remove_ans([]);
      props.remove_menton([]);

      props.remove_sna([]);
      props.remove_snb([]);
      props.remove_anb([]);
      props.remove_pogNB([]);
      props.remove_snop([]);
      props.remove_snmp([]);
      props.remove_uina_angular([]);
      props.remove_uina_linear([]);
      props.remove_linb_angular([]);
      props.remove_linb_linear([]);
      props.remove__iia([]);
      props.remove_upper_lip([]);
      props.remove_lower_lip([]);
      props.remove_wendellwylie([]);
      props.set_headerText('Cephalometric Analysis');
      props.set_subHeaderText('');
      props.set_detailresult(false);
      props.set_select_id(null);
    };
  }, []);

  clearVaribleGlobal = () => {
    props.set_loading(true);

    checkData();
  };

  useEffect(() => {
    if (props.widthLastDevice && props.heightLastDevice) {
      console.log('width Last : ' + props.widthLastDevice);
      console.log('height Last : ' + props.heightLastDevice);
      load_point();
    }
  }, [props.widthLastDevice, props.heightLastDevice]);

  checkData = async () => {
    marker = [];

    var data = {
      patientid: props.patientid,
      step: props.step,
    };

    await _viewExistingAnalysis(data)
      .then((result) => {
        // console.log(result);
        if (result[0].jumlah > 0) {
          props.set_width_last_device(result[0].width);
          props.set_height_last_device(result[0].height);

          let gambarnya = _openImage(result[0].images);

          console.log('Load Image ' + result[0].images);
          console.log('Width Screen : ' + Dimensions.get('screen').width);
          console.log('Width Height : ' + Dimensions.get('screen').height);
          let source = {uri: gambarnya};

          if (source) {
            console.log('load Source Image');
            props.set_tempgambar(source);

            setTitleText('Load Image');
          }
        } else {
          props.set_bantuMarker(0);
          marker = [];
          props.set_loading(false);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        // ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
      });
  };

  load_point = () => {
    var data = {
      patientid: props.patientid,
      step: props.step,
    };

    _viewExistingAnalysis(data)
      .then((result) => {
        if (result[0].jumlah > 0) {
          props.set_startingPoint(JSON.parse(result[0].startingPoint));

          props.set_endPoint(JSON.parse(result[0].endPoint));
          props.set_calibrationDistance(
            '' + result[0].calibrationDistance + '',
          );
          props.set_sella(JSON.parse(result[0].sella));
          props.set_nasion(JSON.parse(result[0].nasion));
          props.set_pointa(JSON.parse(result[0].pointA));
          props.set_pointb(JSON.parse(result[0].pointB));
          props.set_u6(JSON.parse(result[0].u6));
          props.set_u4(JSON.parse(result[0].u4));
          props.set_gonion(JSON.parse(result[0].gonion));
          props.set_gnathion(JSON.parse(result[0].gnathion));
          props.set_isa(JSON.parse(result[0].isa));
          props.set_isi(JSON.parse(result[0].isi));
          props.set_iia(JSON.parse(result[0].iia));
          props.set_iii(JSON.parse(result[0].iii));
          props.set_ms(JSON.parse(result[0].ms));
          props.set_pogs(JSON.parse(result[0].pogs));
          props.set_li(JSON.parse(result[0].li));
          props.set_ls(JSON.parse(result[0].ls));
          props.set_pog(JSON.parse(result[0].pog));
          props.set_ans(JSON.parse(result[0].ans));
          props.set_menton(JSON.parse(result[0].menton));

          loadExistingMarker(JSON.parse(result[0].startingPoint));
          loadExistingMarker(JSON.parse(result[0].endPoint));
          loadExistingMarker(JSON.parse(result[0].sella));
          loadExistingMarker(JSON.parse(result[0].nasion));
          loadExistingMarker(JSON.parse(result[0].pointA));
          loadExistingMarker(JSON.parse(result[0].pointB));
          loadExistingMarker(JSON.parse(result[0].u6));
          loadExistingMarker(JSON.parse(result[0].u4));
          loadExistingMarker(JSON.parse(result[0].gonion));
          loadExistingMarker(JSON.parse(result[0].gnathion));
          loadExistingMarker(JSON.parse(result[0].isa));
          loadExistingMarker(JSON.parse(result[0].isi));
          loadExistingMarker(JSON.parse(result[0].iia));
          loadExistingMarker(JSON.parse(result[0].iii));
          loadExistingMarker(JSON.parse(result[0].ms));
          loadExistingMarker(JSON.parse(result[0].pogs));
          loadExistingMarker(JSON.parse(result[0].li));
          loadExistingMarker(JSON.parse(result[0].ls));
          loadExistingMarker(JSON.parse(result[0].pog));
          loadExistingMarker(JSON.parse(result[0].ans));
          loadExistingMarker(JSON.parse(result[0].menton));
          props.set_bantuMarker(24);
        } else {
          props.set_bantuMarker(0);
          marker = [];
          props.set_loading(false);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        // ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
      });
  };

  function load_correction_X_Y(x_y_point) {
    let data = null;

    data = {
      x: x_y_point.x,
      y: x_y_point.y,
    };

    return data;
  }

  function load_correction_X_Y_new(x_y_point) {
    let data = null;

    data = {
      x: scale(x_y_point.x, props.widthLastDevice),
      y: scale(x_y_point.y, props.widthLastDevice),
    };

    return data;
  }

  function loadExistingMarker(point) {
    if (point.x && point.y) {
      let newMarker = {
        x: point.x,
        y: point.y,
      };

      marker.push(newMarker);
      // setMarker((prevState) => [...prevState, newMarker]);
    }
  }

  function _clickImage(
    event = null,
    up = false,
    down = false,
    left = false,
    right = false,
  ) {
    let newMarker = null;

    if (event) {
      newMarker = {
        x: event.locationX,
        y: event.locationY,
        edit: true,
      };
      console.log('#### Marker Point ###' + JSON.stringify(newMarker));
    }

    //  Starting Point
    if (props.bantuMarker == 1) {
      console.log('Added Starting Point');

      if (up == true) {
        newMarker = {
          x: props.startingPoint[0].x,
          y:
            props.startingPoint[0].y - point_speed < 0
              ? 0
              : props.startingPoint[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.startingPoint[0].x,
          y: props.startingPoint[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.startingPoint[0].x + point_speed,
          y: props.startingPoint[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.startingPoint[0].x - point_speed,
          y: props.startingPoint[0].y,
          edit: true,
        };
      }

      console.log(newMarker);
      marker[0] = newMarker;

      props.set_startingPoint(newMarker);
    }
    //  End Point
    if (props.bantuMarker == 2) {
      console.log('Added End Point');

      if (up == true) {
        newMarker = {
          x: props.endPoint[0].x,
          y: props.endPoint[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.endPoint[0].x,
          y: props.endPoint[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.endPoint[0].x + point_speed,
          y: props.endPoint[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.endPoint[0].x - point_speed,
          y: props.endPoint[0].y,
          edit: true,
        };
      }

      marker[1] = newMarker;

      props.set_endPoint(newMarker);
    }

    //  Calibration Distance
    if (props.bantuMarker == 3) {
      console.log('Added Calibration Distance');
    }

    //  Sella
    if (props.bantuMarker == 4) {
      console.log('Added Sella');

      if (up == true) {
        newMarker = {
          x: props.sella[0].x,
          y: props.sella[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.sella[0].x,
          y: props.sella[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.sella[0].x + point_speed,
          y: props.sella[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.sella[0].x - point_speed,
          y: props.sella[0].y,
          edit: true,
        };
      }

      marker[2] = newMarker;

      props.set_sella(newMarker);
    }
    //  Nasion
    if (props.bantuMarker == 5) {
      console.log('Added Nasion');

      if (up == true) {
        newMarker = {
          x: props.nasion[0].x,
          y: props.nasion[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.nasion[0].x,
          y: props.nasion[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.nasion[0].x + point_speed,
          y: props.nasion[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.nasion[0].x - point_speed,
          y: props.nasion[0].y,
          edit: true,
        };
      }

      marker[3] = newMarker;
      props.set_nasion(newMarker);
    }
    //  POINTA
    if (props.bantuMarker == 6) {
      console.log('Added Point A');

      if (up == true) {
        newMarker = {
          x: props.pointa[0].x,
          y: props.pointa[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.pointa[0].x,
          y: props.pointa[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.pointa[0].x + point_speed,
          y: props.pointa[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.pointa[0].x - point_speed,
          y: props.pointa[0].y,
          edit: true,
        };
      }

      marker[4] = newMarker;
      props.set_pointa(newMarker);
    }
    //  POINTB
    if (props.bantuMarker == 7) {
      console.log('Added Point B');

      if (up == true) {
        newMarker = {
          x: props.pointb[0].x,
          y: props.pointb[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.pointb[0].x,
          y: props.pointb[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.pointb[0].x + point_speed,
          y: props.pointb[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.pointb[0].x - point_speed,
          y: props.pointb[0].y,
          edit: true,
        };
      }

      marker[5] = newMarker;
      props.set_pointb(newMarker);
    }
    //  U6
    if (props.bantuMarker == 8) {
      console.log('Added U6');

      if (up == true) {
        newMarker = {
          x: props.u6[0].x,
          y: props.u6[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.u6[0].x,
          y: props.u6[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.u6[0].x + point_speed,
          y: props.u6[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.u6[0].x - point_speed,
          y: props.u6[0].y,
          edit: true,
        };
      }

      marker[6] = newMarker;
      props.set_u6(newMarker);
    }
    //  U4
    if (props.bantuMarker == 9) {
      console.log('Added U4');

      if (up == true) {
        newMarker = {
          x: props.u4[0].x,
          y: props.u4[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.u4[0].x,
          y: props.u4[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.u4[0].x + point_speed,
          y: props.u4[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.u4[0].x - point_speed,
          y: props.u4[0].y,
          edit: true,
        };
      }

      marker[7] = newMarker;
      props.set_u4(newMarker);
    }
    //  GONION
    if (props.bantuMarker == 10) {
      console.log('Added Gonion');

      if (up == true) {
        newMarker = {
          x: props.gonion[0].x,
          y: props.gonion[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.gonion[0].x,
          y: props.gonion[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.gonion[0].x + point_speed,
          y: props.gonion[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.gonion[0].x - point_speed,
          y: props.gonion[0].y,
          edit: true,
        };
      }

      marker[8] = newMarker;
      props.set_gonion(newMarker);
    }
    //  GNATHION
    if (props.bantuMarker == 11) {
      console.log('Added Gnathion');

      if (up == true) {
        newMarker = {
          x: props.gnathion[0].x,
          y: props.gnathion[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.gnathion[0].x,
          y: props.gnathion[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.gnathion[0].x + point_speed,
          y: props.gnathion[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.gnathion[0].x - point_speed,
          y: props.gnathion[0].y,
          edit: true,
        };
      }

      marker[9] = newMarker;
      props.set_gnathion(newMarker);
    }
    //  ISA
    if (props.bantuMarker == 12) {
      console.log('Added ISA');

      if (up == true) {
        newMarker = {
          x: props.isa[0].x,
          y: props.isa[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.isa[0].x,
          y: props.isa[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.isa[0].x + point_speed,
          y: props.isa[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.isa[0].x - point_speed,
          y: props.isa[0].y,
          edit: true,
        };
      }
      marker[10] = newMarker;
      props.set_isa(newMarker);
    }
    //  ISI
    if (props.bantuMarker == 13) {
      console.log('Added ISI');

      if (up == true) {
        newMarker = {
          x: props.isi[0].x,
          y: props.isi[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.isi[0].x,
          y: props.isi[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.isi[0].x + point_speed,
          y: props.isi[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.isi[0].x - point_speed,
          y: props.isi[0].y,
          edit: true,
        };
      }

      marker[11] = newMarker;
      props.set_isi(newMarker);
    }
    //  IIA
    if (props.bantuMarker == 14) {
      console.log('Added IIA');

      if (up == true) {
        newMarker = {
          x: props.iia[0].x,
          y: props.iia[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.iia[0].x,
          y: props.iia[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.iia[0].x + point_speed,
          y: props.iia[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.iia[0].x - point_speed,
          y: props.iia[0].y,
          edit: true,
        };
      }

      marker[12] = newMarker;
      props.set_iia(newMarker);
    }
    //  III
    if (props.bantuMarker == 15) {
      console.log('Added III');

      if (up == true) {
        newMarker = {
          x: props.iii[0].x,
          y: props.iii[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.iii[0].x,
          y: props.iii[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.iii[0].x + point_speed,
          y: props.iii[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.iii[0].x - point_speed,
          y: props.iii[0].y,
          edit: true,
        };
      }

      marker[13] = newMarker;
      props.set_iii(newMarker);
    }
    //  MS
    if (props.bantuMarker == 16) {
      console.log('Added MS');

      if (up == true) {
        newMarker = {
          x: props.ms[0].x,
          y: props.ms[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.ms[0].x,
          y: props.ms[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.ms[0].x + point_speed,
          y: props.ms[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.ms[0].x - point_speed,
          y: props.ms[0].y,
          edit: true,
        };
      }

      marker[14] = newMarker;
      props.set_ms(newMarker);
    }
    //  POGS
    if (props.bantuMarker == 17) {
      console.log('Added Pogs');

      if (up == true) {
        newMarker = {
          x: props.pogs[0].x,
          y: props.pogs[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.pogs[0].x,
          y: props.pogs[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.pogs[0].x + point_speed,
          y: props.pogs[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.pogs[0].x - point_speed,
          y: props.pogs[0].y,
          edit: true,
        };
      }

      marker[15] = newMarker;

      props.set_pogs(newMarker);
    }
    //  LS
    if (props.bantuMarker == 18) {
      console.log('Added LS');

      if (up == true) {
        newMarker = {
          x: props.ls[0].x,
          y: props.ls[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.ls[0].x,
          y: props.ls[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.ls[0].x + point_speed,
          y: props.ls[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.ls[0].x - point_speed,
          y: props.ls[0].y,
          edit: true,
        };
      }

      marker[16] = newMarker;
      props.set_ls(newMarker);
    }
    //  LI
    if (props.bantuMarker == 19) {
      console.log('Added LI');

      if (up == true) {
        newMarker = {
          x: props.li[0].x,
          y: props.li[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.li[0].x,
          y: props.li[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.li[0].x + point_speed,
          y: props.li[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.li[0].x - point_speed,
          y: props.li[0].y,
          edit: true,
        };
      }

      marker[17] = newMarker;
      props.set_li(newMarker);
    }
    //  POG
    if (props.bantuMarker == 20) {
      console.log('Added Pog');

      if (up == true) {
        newMarker = {
          x: props.pog[0].x,
          y: props.pog[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.pog[0].x,
          y: props.pog[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.pog[0].x + point_speed,
          y: props.pog[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.pog[0].x - point_speed,
          y: props.pog[0].y,
          edit: true,
        };
      }

      marker[18] = newMarker;

      props.set_pog(newMarker);
    }
    //  ANS
    if (props.bantuMarker == 21) {
      console.log('Added ANS');

      if (up == true) {
        newMarker = {
          x: props.ans[0].x,
          y: props.ans[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.ans[0].x,
          y: props.ans[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.ans[0].x + point_speed,
          y: props.ans[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.ans[0].x - point_speed,
          y: props.ans[0].y,
          edit: true,
        };
      }

      marker[19] = newMarker;

      props.set_ans(newMarker);
    }
    //  MENTON
    if (props.bantuMarker == 22) {
      console.log('Added Menton');

      if (up == true) {
        newMarker = {
          x: props.menton[0].x,
          y: props.menton[0].y - point_speed,
          edit: true,
        };
      }

      if (down == true) {
        newMarker = {
          x: props.menton[0].x,
          y: props.menton[0].y + point_speed,
          edit: true,
        };
      }

      if (right == true) {
        newMarker = {
          x: props.menton[0].x + point_speed,
          y: props.menton[0].y,
          edit: true,
        };
      }

      if (left == true) {
        newMarker = {
          x: props.menton[0].x - point_speed,
          y: props.menton[0].y,
          edit: true,
        };
      }

      marker[20] = newMarker;

      props.set_menton(newMarker);
    }
  }

  function _prevClick() {
    if (props.bantuMarker > 4 && props.bantuMarker <= 22) {
      props.set_bantuMarker(props.bantuMarker - 1);
    }

    if (props.bantuMarker > 1 && props.bantuMarker <= 3) {
      props.set_bantuMarker(props.bantuMarker - 1);
    }
  }
  function _nextClick() {
    if (props.bantuMarker >= 1 && props.bantuMarker <= 2) {
      props.set_bantuMarker(props.bantuMarker + 1);
      props.set_disable_pointer('auto');
      props.set_opacity_pointer(1);
    }

    if (props.bantuMarker > 3 && props.bantuMarker <= 22) {
      props.set_bantuMarker(props.bantuMarker + 1);
      props.set_disable_pointer('auto');
      props.set_opacity_pointer(1);
    }

    if (props.bantuMarker == 3) {
      props.navigation.openDrawer();
      props.set_bantuMarker(25);
      props.set_disable_pointer('none');
      props.set_opacity_pointer(0.5);
    }
  }
  function _upClick() {
    _clickImage(null, true, false, false, false, false);
  }
  function _downClick() {
    _clickImage(null, false, true, false, false);
  }
  function _leftClick() {
    _clickImage(null, false, false, true, false);
  }
  function _rightClick() {
    _clickImage(null, false, false, false, true);
  }

  // =============================
  // SET Title
  // =============================

  function setTitle() {
    if (props.bantuMarker == 0) {
      props.set_headerText('Cephalometric Analysis');
      props.set_subHeaderText('');
    }

    if (props.bantuMarker == 1) {
      setTitleText(CALIBRATION_DETAILS[0].HELP[0].INFO);
      props.set_headerText(CALIBRATION_DETAILS[0].NAME);
      props.set_subHeaderText('');
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  End Point
    if (props.bantuMarker == 2) {
      setTitleText(CALIBRATION_DETAILS[1].HELP[0].INFO);
      props.set_headerText(CALIBRATION_DETAILS[1].NAME);
      props.set_subHeaderText('');
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    //  Calibration Distance
    if (props.bantuMarker == 3) {
      setTitleText(CALIBRATION_DETAILS[2].HELP[0].INFO);
      // set_headerText(CALIBRATION_DETAILS[2].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    //  Sella
    if (props.bantuMarker == 4) {
      setTitleText(MARK_DETAILS[0].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[0].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[0].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  Nasion
    if (props.bantuMarker == 5) {
      setTitleText(MARK_DETAILS[1].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[1].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[1].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  POINTA
    if (props.bantuMarker == 6) {
      setTitleText(MARK_DETAILS[2].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[2].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[2].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  POINTB
    if (props.bantuMarker == 7) {
      setTitleText(MARK_DETAILS[3].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[3].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[3].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  U6
    if (props.bantuMarker == 8) {
      setTitleText(MARK_DETAILS[4].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[4].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[4].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  U4
    if (props.bantuMarker == 9) {
      setTitleText(MARK_DETAILS[5].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[5].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[5].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  GONION
    if (props.bantuMarker == 10) {
      setTitleText(MARK_DETAILS[6].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[6].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[6].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  GNATHION
    if (props.bantuMarker == 11) {
      setTitleText(MARK_DETAILS[7].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[7].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[7].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  ISA
    if (props.bantuMarker == 12) {
      setTitleText(MARK_DETAILS[8].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[8].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[8].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  ISI
    if (props.bantuMarker == 13) {
      setTitleText(MARK_DETAILS[9].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[9].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[9].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  IIA
    if (props.bantuMarker == 14) {
      setTitleText(MARK_DETAILS[10].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[10].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[10].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  III
    if (props.bantuMarker == 15) {
      setTitleText(MARK_DETAILS[11].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[11].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[11].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  MS
    if (props.bantuMarker == 16) {
      setTitleText(MARK_DETAILS[12].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[12].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[12].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  POGS
    if (props.bantuMarker == 17) {
      setTitleText(MARK_DETAILS[13].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[13].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[13].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  LS
    if (props.bantuMarker == 18) {
      setTitleText(MARK_DETAILS[14].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[14].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[14].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  LI
    if (props.bantuMarker == 19) {
      setTitleText(MARK_DETAILS[15].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[15].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[15].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  POG
    if (props.bantuMarker == 20) {
      setTitleText(MARK_DETAILS[16].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[16].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[16].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  ANS
    if (props.bantuMarker == 21) {
      console.log('masuk 21');
      setTitleText(MARK_DETAILS[17].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[17].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[17].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    //  MENTON
    if (props.bantuMarker == 22) {
      console.log('masuk 22');
      setTitleText(MARK_DETAILS[18].HELP[0].INFO);
      props.set_headerText(MARK_DETAILS[18].INITIAL);
      props.set_subHeaderText(MARK_DETAILS[18].NAME);
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    if (props.bantuMarker == 23) {
      props.set_headerText('Cephalometric ' + props.step);
      props.set_subHeaderText('');
      setTitleText('-');
    }

    if (props.bantuMarker == 24) {
      props.set_headerText('Cephalometric Analysis');
      props.set_subHeaderText('');
    }
  }

  // ==================================
  // ===Help Button Header
  // ======================

  function helpPopUp(val) {
    setModalVisible(true);
    if (val == 1) {
      setImageModal(CALIBRATION_DETAILS[0].HELP[0].IMG);
      setTextModal(CALIBRATION_DETAILS[0].HELP[0].DESC);
    }

    if (val == 2) {
      setImageModal(CALIBRATION_DETAILS[1].HELP[0].IMG);
      setTextModal(CALIBRATION_DETAILS[1].HELP[0].DESC);
    }
    if (val == 3) {
      setImageModal(CALIBRATION_DETAILS[2].HELP[0].IMG);
      setTextModal(CALIBRATION_DETAILS[2].HELP[0].DESC);
    }

    if (val == 4) {
      setImageModal(MARK_DETAILS[0].HELP[0].IMG);
      setTextModal(MARK_DETAILS[0].HELP[0].DESC);
    }

    if (val == 5) {
      setImageModal(MARK_DETAILS[1].HELP[0].IMG);
      setTextModal(MARK_DETAILS[1].HELP[0].DESC);
    }

    if (val == 6) {
      setImageModal(MARK_DETAILS[2].HELP[0].IMG);
      setTextModal(MARK_DETAILS[2].HELP[0].DESC);
    }

    if (val == 7) {
      setImageModal(MARK_DETAILS[3].HELP[0].IMG);
      setTextModal(MARK_DETAILS[3].HELP[0].DESC);
    }

    if (val == 8) {
      setImageModal(MARK_DETAILS[4].HELP[0].IMG);
      setTextModal(MARK_DETAILS[4].HELP[0].DESC);
    }
    if (val == 9) {
      setImageModal(MARK_DETAILS[5].HELP[0].IMG);
      setTextModal(MARK_DETAILS[5].HELP[0].DESC);
    }
    if (val == 10) {
      setImageModal(MARK_DETAILS[6].HELP[0].IMG);
      setTextModal(MARK_DETAILS[6].HELP[0].DESC);
    }
    if (val == 11) {
      setImageModal(MARK_DETAILS[7].HELP[0].IMG);
      setTextModal(MARK_DETAILS[7].HELP[0].DESC);
    }

    if (val == 12) {
      setImageModal(MARK_DETAILS[8].HELP[0].IMG);
      setTextModal(MARK_DETAILS[8].HELP[0].DESC);
    }
    if (val == 13) {
      setImageModal(MARK_DETAILS[9].HELP[0].IMG);
      setTextModal(MARK_DETAILS[9].HELP[0].DESC);
    }
    if (val == 14) {
      setImageModal(MARK_DETAILS[10].HELP[0].IMG);
      setTextModal(MARK_DETAILS[10].HELP[0].DESC);
    }

    if (val == 15) {
      setImageModal(MARK_DETAILS[11].HELP[0].IMG);
      setTextModal(MARK_DETAILS[11].HELP[0].DESC);
    }

    if (val == 16) {
      setImageModal(MARK_DETAILS[12].HELP[0].IMG);
      setTextModal(MARK_DETAILS[12].HELP[0].DESC);
    }

    if (val == 17) {
      setImageModal(MARK_DETAILS[13].HELP[0].IMG);
      setTextModal(MARK_DETAILS[13].HELP[0].DESC);
    }

    if (val == 18) {
      setImageModal(MARK_DETAILS[14].HELP[0].IMG);
      setTextModal(MARK_DETAILS[14].HELP[0].DESC);
    }

    if (val == 19) {
      setImageModal(MARK_DETAILS[15].HELP[0].IMG);
      setTextModal(MARK_DETAILS[15].HELP[0].DESC);
    }

    if (val == 20) {
      setImageModal(MARK_DETAILS[16].HELP[0].IMG);
      setTextModal(MARK_DETAILS[16].HELP[0].DESC);
    }

    if (val == 21) {
      setImageModal(MARK_DETAILS[17].HELP[0].IMG);
      setTextModal(MARK_DETAILS[17].HELP[0].DESC);
    }

    if (val == 22) {
      setImageModal(MARK_DETAILS[18].HELP[0].IMG);
      setTextModal(MARK_DETAILS[18].HELP[0].DESC);
    }
  }

  // download image
  async function exportToPdf() {
    props.set_loading_global(true);
    props.navigation.closeDrawer();

    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(ref_capture, {
        format: 'png',
        quality: 0.0,
        result: 'base64',
      }).then(
        async (uri) => {
          // const res = await AesGcmCrypto.encrypt(uri, true, key);

          let patient = {
            fullname: props.fullname,
            gender: props.gender,
            birthdate: props.birthdate,
            ageInYears: props.ageInYears,
            race: props.race,
          };

          var htmlnya = await generateCephHtml(
            'Cephalometric',
            patient,
            'data:image/png;base64,' + uri + '',
            new Date(),
            props,
          );

          console.log('####' + 'Masuk Report Viewer Ceph PDF');
          let options = {
            html: htmlnya,
            fileName: 'test',
            base64: true,
            // directory: 'Orthoceph',
            width:
              Platform.OS == 'ios' && widthScreen > 700 ? wp(140) : wp(150),
            height: Platform.OS == 'ios' ? wp(100) : wp(100),
          };

          let file = await RNHTMLtoPDF.convert(options);

          props.navigation.navigate('FormPdfPreview', {
            fileName: file.filePath,
            fileBase64: file.base64,
          });
          props.set_loading_global(false);
        },
        (error) => console.error('Oops, snapshot failed', error),
      );
    } catch (error) {
      console.log('error', error);
    }
  }

  const newAnalysis__ = () => {
    console.log('Masuk New Analysis');
    props.set_headerText('Cephalometric Analysis');
    props.set_bantuMarker(0);
    props.set_loading(true);
    props.navigation.closeDrawer();

    const options = {
      title: 'Choose Your Image',
      takePhotoButtonTitle: 'Take photo with your camera',
      chooseFromLibraryButtonTitle: 'Choose photo from library',
      // maxWidth: 500,
      // maxHeight: 500,
      quality: 1,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        props.set_loading(false);
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        props.set_loading(false);
      } else {
        let source = {uri: response.assets[0].uri};

        let width_image = {uri: response.assets[0].width};
        let height_image = {uri: response.assets[0].height};

        console.log('width :' + JSON.stringify(width_image));
        console.log('height :' + JSON.stringify(height_image));

        props.set_width_last_device(width_image.uri);
        props.set_height_last_device(height_image.uri);

        props.set_tempgambar(source);
        props.set_imageuri(response.assets[0].uri);
        props.set_imagetype(response.assets[0].type);
        props.set_imagefilename(response.assets[0].fileName);
        props.navigation.closeDrawer();

        marker = [];

        props.remove_startingPoint([]);
        props.remove_endPoint([]);
        props.set_calibrationDistance(null);
        props.remove_sella([]);
        props.remove_nasion([]);
        props.remove_pointa([]);
        props.remove_pointb([]);
        props.remove_u6([]);
        props.remove_u4([]);
        props.remove_gonion([]);
        props.remove_gnathion([]);
        props.remove_isa([]);
        props.remove_isi([]);
        props.remove_iia([]);
        props.remove_iii([]);
        props.remove_ms([]);
        props.remove_pogs([]);
        props.remove_li([]);
        props.remove_ls([]);
        props.remove_pog([]);
        props.remove_ans([]);
        props.remove_menton([]);

        props.remove_sna([]);
        props.remove_snb([]);
        props.remove_anb([]);
        props.remove_pogNB([]);
        props.remove_snop([]);
        props.remove_snmp([]);
        props.remove_uina_angular([]);
        props.remove_uina_linear([]);
        props.remove_linb_angular([]);
        props.remove_linb_linear([]);
        props.remove__iia([]);
        props.remove_upper_lip([]);
        props.remove_lower_lip([]);
        props.remove_wendellwylie([]);
        props.set_bantuMarker(1);
        props.set_loading(false);
        props.set_select_id(null);
        props.set_markingdot(true);
        props.set_detailresult(false);
        props.set_resultanalysis(false);
      }
    });
  };

  // ==========
  // === Save Data Analysis
  useFocusEffect(
    React.useCallback(() => {
      if (props.pressSaveAnalysis == true) {
        saveAnalysis();
      }

      return () => props.pressSaveAnalysis;
    }, [props.pressSaveAnalysis]),
  );

  // ==========
  // === Reset Scale
  useFocusEffect(
    React.useCallback(() => {
      if (props.resetScaleImage == true) {
        props.set_reset_scale_image(false);
        refImageZoom.current?.resetScale();
      }

      return () => props.resetScaleImage;
    }, [props.resetScaleImage]),
  );

  function saveAnalysis() {
    refImageZoom.current.resetScale();

    refImageZoom.current.centerOn({
      x: 0,
      y: 0,
      scale: 1,
      duration: 100,
    });

    // Animated.timing(fadeAnim, {
    //   toValue: 3,
    //   duration: 100,
    //   useNativeDriver: true,
    // }).start();

    props.set_loading_global(true);

    props.navigation.closeDrawer();

    setTimeout(async () => {
      try {
        // react-native-view-shot caputures component
        const uri = await captureRef(ref_capture, {
          format: 'jpg',
          quality: 1.0,
          result: 'base64',
        }).then(
          async (uri) => {
            if (uri) {
              let patient = {
                fullname: props.fullname,
                gender: props.gender,
                birthdate: props.birthdate,
                ageInYears: props.ageInYears,
                race: props.race,
              };

              var htmlnya = await generateCephHtml(
                'Cephalometric',
                patient,
                'data:image/png;base64,' + uri + '',
                new Date(),
                props,
              );

              let options = {
                html: htmlnya,
                fileName: 'test',
                base64: true,
                // directory: 'Orthoceph',
                width: 792,
                height: 612,
              };

              let file = await RNHTMLtoPDF.convert(options);

              if (
                props.imageUri !== null &&
                props.tempGambar !== null &&
                file.base64 !== null
              ) {
                const data = new FormData();

                var data2 = {
                  patient_name: props.fullname,
                  patientid: props.patientid,
                  pdf_base64: file.base64,
                  step: props.step,
                };

                var data3 = {
                  patient_name: props.fullname,
                  patientid: props.patientid,
                  image_analysis: uri,
                  step: props.step,
                };

                _addImageAnalysis(data3)
                  .then((result3) => {
                    console.log(result3);
                    if (result3 == 200) {
                      _addPdfReport(data2)
                        .then((result2) => {
                          console.log(result2);
                          if (result2 == 200) {
                            data.append('fileImages', {
                              uri: props.imageUri,
                              type: props.imageType,
                              name: props.imageFileName,
                            });

                            data.append('patientid', props.patientid);
                            data.append('platform', Platform.OS);
                            data.append('patient_name', props.fullname);
                            data.append(
                              'width',
                              Dimensions.get('screen').width,
                            );
                            data.append(
                              'height',
                              Dimensions.get('screen').height,
                            );

                            data.append(
                              'startingPoint',
                              JSON.stringify(props.startingPoint[0]),
                            );
                            data.append(
                              'endPoint',
                              JSON.stringify(props.endPoint[0]),
                            );
                            data.append(
                              'calibrationDistance',
                              '' + props.calibrationDistance + '',
                            );
                            data.append(
                              'sella',
                              JSON.stringify(props.sella[0]),
                            );
                            data.append(
                              'nasion',
                              JSON.stringify(props.nasion[0]),
                            );
                            data.append(
                              'pointA',
                              JSON.stringify(props.pointa[0]),
                            );
                            data.append(
                              'pointB',
                              JSON.stringify(props.pointb[0]),
                            );
                            data.append('u6', JSON.stringify(props.u6[0]));
                            data.append('u4', JSON.stringify(props.u4[0]));
                            data.append(
                              'gonion',
                              JSON.stringify(props.gonion[0]),
                            );
                            data.append(
                              'gnathion',
                              JSON.stringify(props.gnathion[0]),
                            );
                            data.append('isa', JSON.stringify(props.isa[0]));
                            data.append('isi', JSON.stringify(props.isi[0]));
                            data.append('iia', JSON.stringify(props.iia[0]));
                            data.append('iii', JSON.stringify(props.iii[0]));
                            data.append('ms', JSON.stringify(props.ms[0]));
                            data.append('pogs', JSON.stringify(props.pogs[0]));
                            data.append('ls', JSON.stringify(props.ls[0]));
                            data.append('li', JSON.stringify(props.li[0]));
                            data.append('pog', JSON.stringify(props.pog[0]));
                            data.append('ans', JSON.stringify(props.ans[0]));
                            data.append(
                              'menton',
                              JSON.stringify(props.menton[0]),
                            );
                            data.append('step', props.step);
                            data.append('sna', JSON.stringify(props.sna));
                            data.append('snb', JSON.stringify(props.snb));
                            data.append('anb', JSON.stringify(props.anb));
                            data.append('pognb', JSON.stringify(props.pogNB));
                            data.append('snop', JSON.stringify(props.snop));
                            data.append('snmp', JSON.stringify(props.snmp));
                            data.append(
                              'uina_angular',
                              JSON.stringify(props.uina_angular),
                            );
                            data.append(
                              'uina_linear',
                              JSON.stringify(props.uina_linear),
                            );
                            data.append(
                              'linb_angular',
                              JSON.stringify(props.linb_angular),
                            );
                            data.append(
                              'linb_linear',
                              JSON.stringify(props.linb_linear),
                            );
                            data.append('_iia', JSON.stringify(props._iia));
                            data.append(
                              'upper_lip',
                              JSON.stringify(props.upper_lip),
                            );
                            data.append(
                              'lower_lip',
                              JSON.stringify(props.lower_lip),
                            );
                            data.append(
                              'mid_face',
                              JSON.stringify(props.wendellWylie?.MIDFACE),
                            );
                            data.append(
                              'lower_face',
                              JSON.stringify(props.wendellWylie?.LOWERFACE),
                            );

                            _addAnalysisPatient(data)
                              .then((result) => {
                                console.log('RESULT ### 1 :' + result);
                                if (result == 200) {
                                  Toast.show({
                                    type: 'success',
                                    text1: 'Save Successfully',
                                    autohide: true,
                                    visibilityTime: 2500,
                                  });
                                  props.set_loading_global(false);
                                  props.set_press_save_analysis(false);
                                  setTimeout(() => {
                                    props.navigation.goBack();
                                  }, 1000);
                                } else {
                                  Toast.show({
                                    type: 'error',
                                    text1: 'Failed, Please Try Again!',
                                    autohide: true,
                                    visibilityTime: 2500,
                                  });
                                  props.set_loading_global(false);
                                  props.set_press_save_analysis(false);
                                }
                              })
                              .catch((errornya) => {
                                console.log('ERROR ### 1 :' + errornya);
                                props.set_loading_global(false);
                                props.set_press_save_analysis(false);
                                // ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
                              });
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          props.set_loading_global(false);
                          props.set_press_save_analysis(false);
                        });
                    }
                  })
                  .catch((errornya) => {
                    console.log('ERROR ### 1 :' + errornya);
                    props.set_loading_global(false);
                    props.set_press_save_analysis(false);
                    // ToastAndroid.show('LOG Error : ' + error, ToastAndroid.SHORT);
                  });
              }

              if (
                props.imageUri == null &&
                props.tempGambar !== null &&
                file.base64 !== null
              ) {
                var data2 = {
                  patient_name: props.fullname,
                  patientid: props.patientid,
                  pdf_base64: file.base64,
                  step: props.step,
                };

                var data3 = {
                  patient_name: props.fullname,
                  patientid: props.patientid,
                  image_analysis: uri,
                  step: props.step,
                };

                _addImageAnalysis(data3)
                  .then((result3) => {
                    console.log(result3);
                    if (result3 == 200) {
                      _addPdfReport(data2)
                        .then((result2) => {
                          console.log(result2);
                          if (result2 == 200) {
                            var data = {
                              patient_name: props.fullname,
                              patientid: props.patientid,
                              platform: Platform.OS,
                              width: props.widthLastDevice,
                              height: props.heightLastDevice,
                              image_analysis: uri,
                              startingPoint: JSON.stringify(
                                props.startingPoint[0],
                              ),
                              endPoint: JSON.stringify(props.endPoint[0]),
                              calibrationDistance:
                                '' + props.calibrationDistance + '',
                              sella: JSON.stringify(props.sella[0]),
                              nasion: JSON.stringify(props.nasion[0]),
                              pointA: JSON.stringify(props.pointa[0]),
                              pointB: JSON.stringify(props.pointb[0]),
                              u6: JSON.stringify(props.u6[0]),
                              u4: JSON.stringify(props.u4[0]),
                              gonion: JSON.stringify(props.gonion[0]),
                              gnathion: JSON.stringify(props.gnathion[0]),
                              isa: JSON.stringify(props.isa[0]),
                              isi: JSON.stringify(props.isi[0]),
                              iia: JSON.stringify(props.iia[0]),
                              iii: JSON.stringify(props.iii[0]),
                              ms: JSON.stringify(props.ms[0]),
                              pogs: JSON.stringify(props.pogs[0]),
                              ls: JSON.stringify(props.ls[0]),
                              li: JSON.stringify(props.li[0]),
                              pog: JSON.stringify(props.pog[0]),
                              ans: JSON.stringify(props.ans[0]),
                              menton: JSON.stringify(props.menton[0]),
                              step: props.step,
                              sna: JSON.stringify(props.sna),
                              snb: JSON.stringify(props.snb),
                              anb: JSON.stringify(props.anb),
                              pognb: JSON.stringify(props.pogNB),
                              snop: JSON.stringify(props.snop),
                              snmp: JSON.stringify(props.snmp),

                              uina_angular: JSON.stringify(props.uina_angular),

                              uina_linear: JSON.stringify(props.uina_linear),

                              linb_angular: JSON.stringify(props.linb_angular),

                              linb_linear: JSON.stringify(props.linb_linear),

                              _iia: JSON.stringify(props._iia),

                              upper_lip: JSON.stringify(props.upper_lip)
                                ? JSON.stringify(props.upper_lip)
                                : null,

                              lower_lip: JSON.stringify(props.lower_lip)
                                ? JSON.stringify(props.lower_lip)
                                : null,

                              mid_face: JSON.stringify(
                                props.wendellWylie.MIDFACE,
                              )
                                ? JSON.stringify(props.wendellWylie.MIDFACE)
                                : null,
                              lower_face: JSON.stringify(
                                props.wendellWylie.LOWERFACE,
                              )
                                ? JSON.stringify(props.wendellWylie.LOWERFACE)
                                : null,
                            };

                            _addAnalysisPatientExistingImage(data)
                              .then((result) => {
                                console.log(result);
                                if (result == 200) {
                                  Toast.show({
                                    type: 'success',
                                    text1: 'Save Successfully',
                                    // autohide: true,
                                    // visibilityTime: 2500,
                                  });

                                  props.set_loading_global(false);
                                  props.set_press_save_analysis(false);
                                  setTimeout(() => {
                                    props.navigation.goBack();
                                  }, 1000);
                                } else {
                                  Toast.show({
                                    type: 'info',
                                    text1: 'Failed, Please Try Again!',
                                    autohide: true,
                                    visibilityTime: 2500,
                                  });
                                  props.set_loading_global(false);
                                  props.set_press_save_analysis(false);
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                                props.set_loading_global(false);
                                props.set_press_save_analysis(false);
                              });
                          } else {
                            Toast.show({
                              type: 'info',
                              text1: 'Failed, Please Try Again!',
                              autohide: true,
                              visibilityTime: 2500,
                            });
                            props.set_loading_global(false);
                            props.set_press_save_analysis(false);
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          props.set_loading_global(false);
                          props.set_press_save_analysis(false);
                        });
                    } else {
                      Toast.show({
                        type: 'info',
                        text1: 'Failed, Please Try Again!',
                        autohide: true,
                        visibilityTime: 2500,
                      });
                      props.set_loading_global(false);
                      props.set_press_save_analysis(false);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    props.set_loading_global(false);
                    props.set_press_save_analysis(false);
                  });
              }
            }
          },
          (error) => console.error('Oops, snapshot failed', error),
        );
      } catch (error) {
        console.log('error', error);
      }
    }, 500);
  }

  async function _analysis() {
    console.log('ANALYSIS Form');
    props.navigation.closeDrawer();

    if (props.startingPoint.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Starting Point!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.endPoint.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position End Point!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.sella.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Sella!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.nasion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Nasion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.pointa.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Point A!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.pointb.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Point B!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.u6.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position U6!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.u4.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position U4!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.gonion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Gonion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.gnathion.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Gnathion!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.isa.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ISA!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.isi.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ISI!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.iia.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position IIA!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.iii.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position III!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.ms.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position MS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.pogs.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Soft Pogonion (Pog`)!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.ls.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position LS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.li.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position LI!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.pog.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Pogonion (Pog)!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.ans.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position ANS!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else if (props.menton.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Please select position Menton!',
        autohide: true,
        visibilityTime: 2500,
      });
    } else {
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

      console.log('ANALYSIS Ceph');
      props.set_loading_global(true);
      props.set_markingdot(false);
      props.set_resultanalysis(true);

      const _calibrationDistance = Number(props.calibrationDistance);
      const _calibrationPointDistance = await distanceBetween(
        props.startingPoint[0],
        props.endPoint[0],
      );

      let _calibrationRatio = 0;
      if (
        !isNaN(_calibrationDistance / _calibrationPointDistance) &&
        isFinite(_calibrationDistance / _calibrationPointDistance)
      )
        _calibrationRatio = _calibrationDistance / _calibrationPointDistance;

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

      props.set_reset_scale_image(true);

      if (_WendellWylie.LOWERFACE.value) {
        props.set_enablesave(true);
        props.set_loading(false);
        props.set_loading_global(false);
        props.navigation.openDrawer();
      }

      return null;
    }
  }

  function changeDotMarking(e) {
    if (e.scale >= 1 && e.scale < 2) {
      Animated.timing(fadeAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }).start();
      Animated.timing(strokeBorderAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else if (e.scale >= 2 && e.scale < 3) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      Animated.timing(strokeBorderAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else if (e.scale >= 3) {
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }).start();
      Animated.timing(strokeBorderAnim, {
        toValue: 0.1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else if (e.scale < 1) {
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: true,
      }).start();
      Animated.timing(strokeBorderAnim, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }

  //back header
  function backActionHeader() {
    Alert.alert(
      'Do you want to save before exiting?',
      'Unsaved work will be lost.',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'DONT SAVE',
          onPress: () => {
            props.navigation.goBack();
          },
          style: 'cancel',
        },
        {text: 'SAVE', onPress: () => props.set_press_save_analysis(true)},
      ],
    );
    return true;
  }

  useEffect(() => {
    if (props.pressAnalysis == true) {
      exportToPdf();
      props.set_press_analysis(false);
    }

    return () => {
      props.set_press_analysis(false);
    };
  }, [props.pressAnalysis]);

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  function StatusBarPlaceHolder() {
    return (
      <View
        style={{
          width: '100%',
          height: STATUS_BAR_HEIGHT,
          backgroundColor: '#637363',
        }}>
        <StatusBar barStyle="light-content" backgroundColor="#637363" />
      </View>
    );
  }

  return (
    <>
      <ActivityIndicator
        animating={props.loadingGlobal}
        size={'large'}
        style={{
          position: 'absolute',
          zIndex: props.loadingGlobal == true ? 9999 : 0,
          bottom: 0,
          top: 0,
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          display: props.loadingGlobal == true ? 'flex' : 'none',
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'transparent',
          // alignSelf: 'baseline',
          // justifyContent: 'center',
          // width: 390,
          // height: 844,
          flex: 1,
        }}>
        <StatusBarPlaceHolder />

        <Appbar.Header
          style={{
            backgroundColor: '#637363',
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            zIndex: 999999,
          }}>
          <Appbar.BackAction
            onPress={() =>
              props.tempGambar ? backActionHeader() : props.navigation.goBack()
            }
          />

          {props.bantuMarker == 3 ? (
            <TextInput
              value={props.calibrationDistance ? props.calibrationDistance : ''}
              onChangeText={(val) =>
                props.set_calibrationDistance(val.replace(/,/g, '.'))
              }
              label={''}
              keyboardType="decimal-pad"
              returnKeyType="done"
              placeholder="Enter Distance (mm)"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              underlineColorAndroid={'transparent'}
              onSubmitEditing={() => props.navigation.openDrawer()}
              style={{
                flex: 1,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                height: hp(5),
                marginHorizontal: '7%',
              }}
            />
          ) : (
            <Appbar.Content
              title={props.headerText}
              subtitle={props.subHeaderText}
              titleStyle={{
                textAlign: 'center',
                flexWrap: 'wrap',
                fontSize: wp(3.5),
              }}
              subtitleStyle={{
                textAlign: 'center',
                flexWrap: 'wrap',
                fontSize: wp(2.5),
              }}
              // style={{marginLeft: props.tempGambar ? 0 : wp(-18)}}
              color="white"
            />
          )}

          {props.disablePointer !== 'none' ? (
            <>
              {props.tempGambar ? (
                <>
                  <Appbar.Action
                    style={{
                      display:
                        props.bantuMarker >= 1 && props.bantuMarker < 23
                          ? 'flex'
                          : 'none',
                    }}
                    size={wp(6)}
                    icon={'help-circle-outline'}
                    onPress={() => {
                      helpPopUp(props.bantuMarker);
                    }}
                    color="white"
                  />

                  <Appbar.Action
                    icon="menu"
                    onPress={() => {
                      props.navigation.openDrawer();
                    }}
                    color="white"
                  />
                </>
              ) : null}
            </>
          ) : (
            <Appbar.Action
              icon={'menu'}
              size={wp(6)}
              onPress={() => {
                props.navigation.openDrawer();
              }}
              color="white"
            />
          )}
        </Appbar.Header>
        {/* <View
          style={{position: 'absolute', right: 0, left: 0, zIndex: 9999999}}>
          
        </View> */}
        {/* ======================================================================== */}

        {/* ======================================================================== */}

        {props.bantuMarker > 0 && props.bantuMarker <= 22 ? (
          <Animated.View
            style={{
              display: props.tempGambar ? 'flex' : 'none',
              // width: '100%',
              // height: wp(50),
              backgroundColor: 'black',
              position: 'absolute',
              transform: [{translateX: fadeIn}],
              zIndex: 1,
              left: 0,
              right: 0,
              top: Platform.OS == 'ios' ? wp(25) : wp(13),
              // flexShrink: 1,
            }}>
            <Text
              style={{
                textAlign: 'justify',
                color: 'white',
                fontSize: wp(2.5),
                // flexWrap: 'wrap',
                // flexGrow: 1,
                paddingHorizontal: wp(5),
                paddingVertical: wp(2),
              }}>
              {titleText}
            </Text>
          </Animated.View>
        ) : null}

        <View style={styles.container}>
          {titleText ? (
            <>
              {props.loading ? (
                <>
                  <ActivityIndicator
                    animating={props.loading}
                    style={{alignSelf: 'center', marginTop: wp(-50)}}
                    size="large"
                    color="white"
                  />
                </>
              ) : (
                <ViewShot
                  ref={ref_capture}
                  options={{
                    width: '100%',
                    height: '100%',
                    fileName: 'captureImage',
                    format: 'png',
                    quality: 1,
                    result: 'base64',
                  }}>
                  <ImageZoom
                    ref={refImageZoom}
                    cropWidth={375}
                    cropHeight={667}
                    style={{alignSelf: 'center'}}
                    imageWidth={375}
                    imageHeight={667}
                    useNativeDriver={true}
                    enableCenterFocus={true}
                    minScale={1}
                    panToMove={true}
                    pinchToZoom={true}
                    onMove={(e) => {
                      changeDotMarking(e);
                      // touch_count = 3;
                    }}
                    // onMoveShouldSetPanResponder={(e) => true}
                    // centerOn={scaleScreen}
                  >
                    <ImageBackground
                      source={props.tempGambar}
                      resizeMode="contain"
                      style={{
                        minWidth: 375,
                        minHeight: 667,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          // backgroundColor: 'grey',
                        }}
                        onTouchMove={(e) => {
                          setTimeout(() => {
                            touch_count = 3;
                          }, 150);
                        }}
                        onTouchEnd={(e) => {
                          if (touch_count === 0 && Platform.OS == 'android') {
                            _clickImage(
                              e.nativeEvent,
                              false,
                              false,
                              false,
                              false,
                            );
                          }
                          if (touch_count === 1 && Platform.OS == 'ios') {
                            _clickImage(
                              e.nativeEvent,
                              false,
                              false,
                              false,
                              false,
                            );
                          }
                        }}
                        onTouchStart={(e) => {
                          touch_count = e.nativeEvent.identifier;
                        }}>
                        <Svg
                          style={{
                            position: 'absolute',
                            zIndex: 998,
                            minWidth: 375,
                            minHeight: 667,
                          }}>
                          {/* {props.bantuMarker > 0 &&
                          marker.length > 0 &&
                          props.selectid == null &&
                          bantuClick == true
                            ? marker.map((value, index) => {
                                if (value?.x && value?.y) {
                                  if (
                                    props.bantuMarker > 3 &&
                                    props.bantuMarker <= 22
                                  ) {
                                    console.log(
                                      parseInt(index + 2) +
                                        ' ==== ' +
                                        props.bantuMarker,
                                    );
                                    if (
                                      parseInt(index + 2) == props.bantuMarker
                                    ) {
                                      console.log('###### MASUK #####');
                                      return (
                                        <AnimatedCircle
                                          key={index}
                                          cx={value.x}
                                          cy={value.y}
                                          r={fadeAnim}
                                          fill="red"
                                          stroke="yellow"
                                          strokeWidth={strokeBorderAnim}
                                        />
                                      );
                                    } else {
                                      return (
                                        <AnimatedCircle
                                          key={index}
                                          cx={value.x}
                                          cy={value.y}
                                          r={fadeAnim}
                                          fill="green"
                                          stroke="yellow"
                                          strokeWidth={strokeBorderAnim}
                                        />
                                      );
                                    }
                                  } else if (props.bantuMarker === 3) {
                                    return (
                                      <AnimatedCircle
                                        key={index}
                                        cx={value.x}
                                        cy={value.y}
                                        r={fadeAnim}
                                        fill="green"
                                        stroke="yellow"
                                        strokeWidth={strokeBorderAnim}
                                      />
                                    );
                                  } else {
                                    if (
                                      parseInt(index + 1) == props.bantuMarker
                                    ) {
                                      return (
                                        <AnimatedCircle
                                          key={index}
                                          cx={value.x}
                                          cy={value.y}
                                          r={fadeAnim}
                                          fill="red"
                                          stroke="yellow"
                                          strokeWidth={strokeBorderAnim}
                                        />
                                      );
                                    } else {
                                      return (
                                        <AnimatedCircle
                                          key={index}
                                          cx={value.x}
                                          cy={value.y}
                                          r={fadeAnim}
                                          fill="green"
                                          stroke="yellow"
                                          strokeWidth={strokeBorderAnim}
                                        />
                                      );
                                    }
                                  }
                                }
                              })
                            : null} */}

                          {/* {console.log(
                            actuatedNormalize(props.startingPoint[0]?.x),
                          )} */}
                          {props.startingPoint[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.startingPoint[0]?.x}
                              cy={props.startingPoint[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 1 &&
                                props.startingPoint.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.endPoint[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.endPoint[0]?.x}
                              cy={props.endPoint[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 2 &&
                                props.endPoint.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}

                          {props.sella[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.sella[0]?.x}
                              cy={props.sella[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 4 && props.sella.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.nasion[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.nasion[0]?.x}
                              cy={props.nasion[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 5 &&
                                props.nasion.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.pointa[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.pointa[0]?.x}
                              cy={props.pointa[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 6 &&
                                props.pointa.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.pointb[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.pointb[0]?.x}
                              cy={props.pointb[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 7 &&
                                props.pointb.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.u6[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.u6[0]?.x}
                              cy={props.u6[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 8 && props.u6.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.u4[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.u4[0]?.x}
                              cy={props.u4[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 9 && props.u4.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.gonion[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.gonion[0]?.x}
                              cy={props.gonion[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 10 &&
                                props.gonion.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.gnathion[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.gnathion[0]?.x}
                              cy={props.gnathion[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 11 &&
                                props.gnathion.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.isa[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.isa[0]?.x}
                              cy={props.isa[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 12 && props.isa.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.isi[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.isi[0]?.x}
                              cy={props.isi[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 13 && props.isi.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.iia[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.iia[0]?.x}
                              cy={props.iia[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 14 && props.iia.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.iii[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.iii[0]?.x}
                              cy={props.iii[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 15 && props.iii.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.ms[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.ms[0]?.x}
                              cy={props.ms[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 16 && props.ms.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.pogs[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.pogs[0]?.x}
                              cy={props.pogs[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 17 && props.pogs.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.ls[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.ls[0]?.x}
                              cy={props.ls[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 18 && props.ls.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.li[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.li[0]?.x}
                              cy={props.li[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 19 && props.li.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.pog[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.pog[0]?.x}
                              cy={props.pog[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 20 && props.pog.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.ans[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.ans[0]?.x}
                              cy={props.ans[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 21 && props.ans.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.menton[0]?.x ? (
                            <AnimatedCircle
                              key={Math.random()}
                              cx={props.menton[0]?.x}
                              cy={props.menton[0]?.y}
                              r={fadeAnim}
                              fill={
                                props.bantuMarker == 22 &&
                                props.menton.length > 0
                                  ? 'red'
                                  : 'green'
                              }
                              stroke="yellow"
                              strokeWidth={strokeBorderAnim}
                            />
                          ) : null}
                          {props.startingPoint[0]?.x && props.endPoint[0]?.x ? (
                            <Line
                              x1={props.startingPoint[0]?.x}
                              y1={props.startingPoint[0]?.y}
                              x2={props.endPoint[0]?.x}
                              y2={props.endPoint[0]?.y}
                              stroke="#8AFF06"
                              strokeWidth="0.8"
                            />
                          ) : null}
                          {props.markingDot !== true ? (
                            <>
                              {props.selectid == null ? (
                                <>
                                  {/* ==== SNA ==== */}
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  {/* <Polygon
                                    points={
                                      '' +
                                      props.nasion[0]?.x +
                                      ',' +
                                      props.nasion[0]?.y +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 5) +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x - 5) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 1) +
                                      ''
                                    }
                                    fill="yellow"
                                    stroke="yellow"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  /> */}

                                  {/* ==== SNB ==== */}
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  {/* 
                                  <Polygon
                                    points={
                                      '' +
                                      props.nasion[0]?.x +
                                      ',' +
                                      props.nasion[0]?.y +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 5) +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x - 5) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 1) +
                                      ''
                                    }
                                    fill="yellow"
                                    stroke="yellow"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  /> */}

                                  {/* ==== ANB ==== */}
                                  <Line
                                    x1={props.pointa[0]?.x}
                                    y1={props.pointa[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  {/* <Polygon
                                    points={
                                      '' +
                                      props.nasion[0]?.x +
                                      ',' +
                                      props.nasion[0]?.y +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 5) +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x - 5) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 1) +
                                      ''
                                    }
                                    fill="yellow"
                                    stroke="yellow"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  /> */}

                                  {/* ==== PogNB ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.pogNB.analysis?.lines[0].startX}
                                    y1={props.pogNB.analysis?.lines[0].startY}
                                    x2={props.pogNB.analysis?.lines[0].endX}
                                    y2={props.pogNB.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props.pogNB.analysis?.lines[1].startX}
                                    y1={props.pogNB.analysis?.lines[1].startY}
                                    x2={props.pogNB.analysis?.lines[1].endX}
                                    y2={props.pogNB.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  {/* ==== SNOP ==== */}
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.u6[0]?.x}
                                    y1={props.u6[0]?.y}
                                    x2={props.u4[0]?.x}
                                    y2={props.u4[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.snop.analysis?.lines[0].startX}
                                    y1={props.snop.analysis?.lines[0].startY}
                                    x2={props.snop.analysis?.lines[0].endX}
                                    y2={props.snop.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2,2"
                                  />
                                  <Line
                                    x1={props.snop.analysis?.lines[1].startX}
                                    y1={props.snop.analysis?.lines[1].startY}
                                    x2={props.snop.analysis?.lines[1].endX}
                                    y2={props.snop.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2,2"
                                  />

                                  {/* ==== SNMP ==== */}

                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.gonion[0]?.x}
                                    y1={props.gonion[0]?.y}
                                    x2={props.gnathion[0]?.x}
                                    y2={props.gnathion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.snmp.analysis?.lines[0].startX}
                                    y1={props.snmp.analysis?.lines[0].startY}
                                    x2={props.snmp.analysis?.lines[0].endX}
                                    y2={props.snmp.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props.snmp.analysis?.lines[1].startX}
                                    y1={props.snmp.analysis?.lines[1].startY}
                                    x2={props.snmp.analysis?.lines[1].endX}
                                    y2={props.snmp.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== UINA LINEAR ==== */}

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.uina_angular.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.uina_angular.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.uina_angular.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.uina_angular.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== UINA LINEAR ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.uina_linear.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.uina_linear.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.uina_linear.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.uina_linear.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.uina_linear.analysis?.lines[1]
                                        .startX
                                    }
                                    y1={
                                      props.uina_linear.analysis?.lines[1]
                                        .startY
                                    }
                                    x2={
                                      props.uina_linear.analysis?.lines[1].endX
                                    }
                                    y2={
                                      props.uina_linear.analysis?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== LINB ANGULAR ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  {/* ==== LINB Linear ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.linb_linear.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.linb_linear.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.linb_linear.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.linb_linear.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== IIA  ==== */}
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props._iia.analysis?.lines[0].startX}
                                    y1={props._iia.analysis?.lines[0].startY}
                                    x2={props._iia.analysis?.lines[0].endX}
                                    y2={props._iia.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props._iia.analysis?.lines[1].startX}
                                    y1={props._iia.analysis?.lines[1].startY}
                                    x2={props._iia.analysis?.lines[1].endX}
                                    y2={props._iia.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== UPPER LIP ==== */}
                                  <Line
                                    x1={props.ms[0]?.x}
                                    y1={props.ms[0]?.y}
                                    x2={props.pogs[0]?.x}
                                    y2={props.pogs[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.upper_lip.analysis?.lines[1].startX
                                    }
                                    y1={
                                      props.upper_lip.analysis?.lines[1].startY
                                    }
                                    x2={props.upper_lip.analysis?.lines[1].endX}
                                    y2={props.upper_lip.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== LOWER LIP ==== */}
                                  <Line
                                    x1={props.ms[0]?.x}
                                    y1={props.ms[0]?.y}
                                    x2={props.pogs[0]?.x}
                                    y2={props.pogs[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.lower_lip.analysis?.lines[1].startX
                                    }
                                    y1={
                                      props.lower_lip.analysis?.lines[1].startY
                                    }
                                    x2={props.lower_lip.analysis?.lines[1].endX}
                                    y2={props.lower_lip.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== MID FACE ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.ans[0]?.x}
                                    y2={props.ans[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.ans[0]?.x}
                                    y1={props.ans[0]?.y}
                                    x2={props.menton[0]?.x}
                                    y2={props.menton[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />

                                  {/* ==== LOWER FACE ==== */}
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.ans[0]?.x}
                                    y2={props.ans[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.ans[0]?.x}
                                    y1={props.ans[0]?.y}
                                    x2={props.menton[0]?.x}
                                    y2={props.menton[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}
                              {/* ==== SNA ==== */}
                              {props.selectid == 'IDS/ANALYSIS/SNA' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.sella[0]?.x}
                                    cy={props.sella[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointa[0]?.x}
                                    cy={props.pointa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                </>
                              ) : null}

                              {/* ==== SNB ==== */}
                              {props.selectid == 'IDS/ANALYSIS/SNB' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.sella[0]?.x}
                                    cy={props.sella[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointb[0]?.x}
                                    cy={props.pointb[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  {/* <Polygon
                                    points={
                                      '' +
                                      props.nasion[0]?.x +
                                      ',' +
                                      props.nasion[0]?.y +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 5) +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x - 5) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 1) +
                                      ''
                                    }
                                    fill="yellow"
                                    stroke="yellow"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  /> */}

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                </>
                              ) : null}

                              {/* ==== ANB ==== */}
                              {props.selectid == 'IDS/ANALYSIS/ANB' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.pointa[0]?.x}
                                    cy={props.pointa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointb[0]?.x}
                                    cy={props.pointb[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.pointa[0]?.x}
                                    y1={props.pointa[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />

                                  {/* <Polygon
                                    points={
                                      '' +
                                      props.nasion[0]?.x +
                                      ',' +
                                      props.nasion[0]?.y +
                                      ' ' +
                                      parseFloat(props.nasion[0]?.x) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 5) +
                                      ' ' +
                                      parseFloat(props.pointb[0]?.x - 5) +
                                      ',' +
                                      parseFloat(props.nasion[0]?.y + 1) +
                                      ''
                                    }
                                    fill="yellow"
                                    stroke="yellow"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  /> */}
                                </>
                              ) : null}

                              {/* ==== PogNB ==== */}
                              {props.selectid == 'IDS/ANALYSIS/POGNB' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.pog[0]?.x}
                                    cy={props.pog[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointb[0]?.x}
                                    cy={props.pointb[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.pogNB.analysis?.lines[0].startX}
                                    y1={props.pogNB.analysis?.lines[0].startY}
                                    x2={props.pogNB.analysis?.lines[0].endX}
                                    y2={props.pogNB.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props.pogNB.analysis?.lines[1].startX}
                                    y1={props.pogNB.analysis?.lines[1].startY}
                                    x2={props.pogNB.analysis?.lines[1].endX}
                                    y2={props.pogNB.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== SNOP ==== */}
                              {props.selectid == 'IDS/ANALYSIS/SNOP' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.sella[0]?.x}
                                    cy={props.sella[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.u6[0]?.x}
                                    cy={props.u6[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.u4[0]?.x}
                                    cy={props.u4[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.u6[0]?.x}
                                    y1={props.u6[0]?.y}
                                    x2={props.u4[0]?.x}
                                    y2={props.u4[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.snop.analysis?.lines[0].startX}
                                    y1={props.snop.analysis?.lines[0].startY}
                                    x2={props.snop.analysis?.lines[0].endX}
                                    y2={props.snop.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2,2"
                                  />
                                  <Line
                                    x1={props.snop.analysis?.lines[1].startX}
                                    y1={props.snop.analysis?.lines[1].startY}
                                    x2={props.snop.analysis?.lines[1].endX}
                                    y2={props.snop.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2,2"
                                  />
                                </>
                              ) : null}

                              {/* ==== SNMP ==== */}
                              {props.selectid == 'IDS/ANALYSIS/SNMP' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.sella[0]?.x}
                                    cy={props.sella[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.gonion[0]?.x}
                                    cy={props.gonion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.gnathion[0]?.x}
                                    cy={props.gnathion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />

                                  <Line
                                    x1={props.sella[0]?.x}
                                    y1={props.sella[0]?.y}
                                    x2={props.nasion[0]?.x}
                                    y2={props.nasion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.gonion[0]?.x}
                                    y1={props.gonion[0]?.y}
                                    x2={props.gnathion[0]?.x}
                                    y2={props.gnathion[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.snmp.analysis?.lines[0].startX}
                                    y1={props.snmp.analysis?.lines[0].startY}
                                    x2={props.snmp.analysis?.lines[0].endX}
                                    y2={props.snmp.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props.snmp.analysis?.lines[1].startX}
                                    y1={props.snmp.analysis?.lines[1].startY}
                                    x2={props.snmp.analysis?.lines[1].endX}
                                    y2={props.snmp.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== UINA ANGULAR ==== */}
                              {props.selectid == 'IDS/ANALYSIS/UINA_ANGULAR' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointa[0]?.x}
                                    cy={props.pointa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.isa[0]?.x}
                                    cy={props.isa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.isi[0]?.x}
                                    cy={props.isi[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.sella[0]?.x}
                                    cy={props.sella[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.uina_angular.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.uina_angular.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.uina_angular.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.uina_angular.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== UINA LINEAR ==== */}
                              {props.selectid == 'IDS/ANALYSIS/UINA_LINEAR' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointa[0]?.x}
                                    cy={props.pointa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.isa[0]?.x}
                                    cy={props.isa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />

                                  <AnimatedCircle
                                    cx={props.isi[0]?.x}
                                    cy={props.isi[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointa[0]?.x}
                                    y2={props.pointa[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.uina_linear.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.uina_linear.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.uina_linear.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.uina_linear.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.uina_linear.analysis?.lines[1]
                                        .startX
                                    }
                                    y1={
                                      props.uina_linear.analysis?.lines[1]
                                        .startY
                                    }
                                    x2={
                                      props.uina_linear.analysis?.lines[1].endX
                                    }
                                    y2={
                                      props.uina_linear.analysis?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== LINB ANGULAR ==== */}
                              {props.selectid == 'IDS/ANALYSIS/LINB_ANGULAR' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointb[0]?.x}
                                    cy={props.pointb[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.iii[0]?.x}
                                    cy={props.iii[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.iia[0]?.x}
                                    cy={props.iia[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                </>
                              ) : null}

                              {/* ==== LINB Linear ==== */}
                              {props.selectid == 'IDS/ANALYSIS/LINB_LINEAR' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pointb[0]?.x}
                                    cy={props.pointb[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.iii[0]?.x}
                                    cy={props.iii[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.iia[0]?.x}
                                    cy={props.iia[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.pointb[0]?.x}
                                    y2={props.pointb[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.linb_linear.analysis?.lines[0]
                                        .startX
                                    }
                                    y1={
                                      props.linb_linear.analysis?.lines[0]
                                        .startY
                                    }
                                    x2={
                                      props.linb_linear.analysis?.lines[0].endX
                                    }
                                    y2={
                                      props.linb_linear.analysis?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== IIA  ==== */}
                              {props.selectid == 'IDS/ANALYSIS/IIA' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.iii[0]?.x}
                                    cy={props.iii[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.iia[0]?.x}
                                    cy={props.iia[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.isa[0]?.x}
                                    cy={props.isa[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.isi[0]?.x}
                                    cy={props.isi[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.iii[0]?.x}
                                    y1={props.iii[0]?.y}
                                    x2={props.iia[0]?.x}
                                    y2={props.iia[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.isa[0]?.x}
                                    y1={props.isa[0]?.y}
                                    x2={props.isi[0]?.x}
                                    y2={props.isi[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props._iia.analysis?.lines[0].startX}
                                    y1={props._iia.analysis?.lines[0].startY}
                                    x2={props._iia.analysis?.lines[0].endX}
                                    y2={props._iia.analysis?.lines[0].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={props._iia.analysis?.lines[1].startX}
                                    y1={props._iia.analysis?.lines[1].startY}
                                    x2={props._iia.analysis?.lines[1].endX}
                                    y2={props._iia.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== UPPER LIP ==== */}
                              {props.selectid == 'IDS/ANALYSIS/UPPER_LIP' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.ms[0]?.x}
                                    cy={props.ms[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pogs[0]?.x}
                                    cy={props.pogs[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.ls[0]?.x}
                                    cy={props.ls[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.ms[0]?.x}
                                    y1={props.ms[0]?.y}
                                    x2={props.pogs[0]?.x}
                                    y2={props.pogs[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.upper_lip.analysis?.lines[1].startX
                                    }
                                    y1={
                                      props.upper_lip.analysis?.lines[1].startY
                                    }
                                    x2={props.upper_lip.analysis?.lines[1].endX}
                                    y2={props.upper_lip.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== LOWER LIP ==== */}
                              {props.selectid == 'IDS/ANALYSIS/LOWER_LIP' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.ms[0]?.x}
                                    cy={props.ms[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.pogs[0]?.x}
                                    cy={props.pogs[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.li[0]?.x}
                                    cy={props.li[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <Line
                                    x1={props.ms[0]?.x}
                                    y1={props.ms[0]?.y}
                                    x2={props.pogs[0]?.x}
                                    y2={props.pogs[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.lower_lip.analysis?.lines[1].startX
                                    }
                                    y1={
                                      props.lower_lip.analysis?.lines[1].startY
                                    }
                                    x2={props.lower_lip.analysis?.lines[1].endX}
                                    y2={props.lower_lip.analysis?.lines[1].endY}
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== MID FACE ==== */}
                              {props.selectid == 'IDS/ANALYSIS/MIDFACE' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.ans[0]?.x}
                                    cy={props.ans[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.menton[0]?.x}
                                    cy={props.menton[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.ans[0]?.x}
                                    y2={props.ans[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.ans[0]?.x}
                                    y1={props.ans[0]?.y}
                                    x2={props.menton[0]?.x}
                                    y2={props.menton[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].startX
                                    }
                                    y1={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].startY
                                    }
                                    x2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].endX
                                    }
                                    y2={
                                      props.wendellWylie.MIDFACE?.analysis
                                        ?.lines[2].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}

                              {/* ==== LOWER FACE ==== */}
                              {props.selectid == 'IDS/ANALYSIS/LOWERFACE' ? (
                                <>
                                  <AnimatedCircle
                                    cx={props.nasion[0]?.x}
                                    cy={props.nasion[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.ans[0]?.x}
                                    cy={props.ans[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />
                                  <AnimatedCircle
                                    cx={props.menton[0]?.x}
                                    cy={props.menton[0]?.y}
                                    r={fadeAnim}
                                    fill="green"
                                    stroke="yellow"
                                    strokeWidth="0.5"
                                  />

                                  <Line
                                    x1={props.nasion[0]?.x}
                                    y1={props.nasion[0]?.y}
                                    x2={props.ans[0]?.x}
                                    y2={props.ans[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={props.ans[0]?.x}
                                    y1={props.ans[0]?.y}
                                    x2={props.menton[0]?.x}
                                    y2={props.menton[0]?.y}
                                    stroke="#8AFF06"
                                    strokeWidth="0.8"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[0].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[1].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                  <Line
                                    x1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].startX
                                    }
                                    y1={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].startY
                                    }
                                    x2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].endX
                                    }
                                    y2={
                                      props.wendellWylie.LOWERFACE?.analysis
                                        ?.lines[2].endY
                                    }
                                    stroke="yellow"
                                    strokeWidth="0.8"
                                    stroke-linecap="round"
                                    strokeDasharray="2"
                                  />
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </Svg>
                      </View>
                    </ImageBackground>

                    <View style={{margin: wp(20)}} />
                  </ImageZoom>

                  {/* </View> */}
                </ViewShot>
              )}
            </>
          ) : (
            <>
              {props.loading ? (
                <>
                  <ActivityIndicator
                    animating={props.loading}
                    style={{alignSelf: 'center', marginTop: wp(-50)}}
                    size="large"
                    color="white"
                  />
                </>
              ) : (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#34A853',
                    borderRadius: 10,
                    marginHorizontal: wp(10),
                    marginTop: wp(-50),
                  }}
                  onPress={() => newAnalysis__()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      textAlign: 'center',
                      paddingVertical: wp(2),
                    }}>
                    Create New Worksheet
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View
          pointerEvents={props.disablePointer}
          style={{
            flexDirection: 'row',
            backgroundColor: '#637363',
            opacity: props.opacityPointer,
            borderRadius: 5,
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: Platform.OS === 'android' ? 0 : hp(2),
            left: 0,
            right: 0,
            paddingVertical: wp(1),
          }}>
          {/*================ PREVIOUS EVENT ============*/}
          <TouchableOpacity
            onPress={() => _prevClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="controller-fast-backward" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Prev
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => _leftClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="arrow-bold-left" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Left
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => _upClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="arrow-bold-up" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _downClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="arrow-bold-down" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Down
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _rightClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="arrow-bold-right" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Right
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _nextClick()}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="controller-fast-forward" size={30} color="white" />
            <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {/* MODAL ================================================ */}

        <View>
          <Modal
            style={{width: '90%', alignSelf: 'center'}}
            isVisible={modalVisible}>
            <View
              style={{
                flexDirection: 'row',
                height: hp(5),
                backgroundColor: '#637363',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: wp(2),
              }}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  size={wp(5)}
                  name="text"
                  color={'white'}
                />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    marginLeft: wp(5),
                    color: 'white',
                  }}>
                  Short Description
                </Text>
              </View>
              <TouchableOpacity
                style={{backgroundColor: 'white'}}
                onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" style={{padding: 2}} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
                height: '70%',
                backgroundColor: 'white',
                padding: wp(2),
              }}>
              <ImageZoom
                cropWidth={wp(85)}
                cropHeight={hp(40)}
                imageWidth={wp(85)}
                imageHeight={hp(40)}
                minScale={1}
                useNativeDriver={true}
                enableCenterFocus={true}
                style={{borderWidth: 0.5, borderRadius: 5}}
                panToMove={true}
                pinchToZoom={true}>
                <Image
                  style={{
                    width: wp(85),
                    height: hp(40),
                    resizeMode: 'contain',
                  }}
                  source={imageModal}
                />
              </ImageZoom>

              <Text style={{fontSize: wp(2.5), marginVertical: hp(1)}}>
                {textModal}
              </Text>
              <Text style={{fontSize: wp(2.5), marginVertical: hp(1.2)}}>
                {
                  'Use the Left, Up, Down, Right button to move the mark to a more precise location'
                }
              </Text>
              <Text style={{fontSize: wp(2.5), marginVertical: hp(1.2)}}>
                {
                  'You can zoom in/out and drag the image for a better view. Press the Next button to save & continue'
                }
              </Text>
            </View>
          </Modal>
        </View>

        {/* MODAL ================================================ */}
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bantuMarker: state.variabelReducer.bantuMarker,
    pressAnalysis: state.variabelReducer.pressAnalysis,
    pressSaveAnalysis: state.variabelReducer.pressSaveAnalysis,
    resetScaleImage: state.variabelReducer.resetScaleImage,
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
    headerText: state.variabelReducer.headerText,
    subHeaderText: state.variabelReducer.subHeaderText,
    loading: state.variabelReducer.loading,
    loadingGlobal: state.variabelReducer.loadingGlobal,
    selectid: state.variabelReducer.selectid,
    widthLastDevice: state.variabelReducer.widthLastDevice,
    heightLastDevice: state.variabelReducer.heightLastDevice,
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
    set_headerText: (val) => dispatch(set_headerText(val)),
    set_subHeaderText: (val) => dispatch(set_subHeaderText(val)),
    set_loading: (val) => dispatch(set_loading(val)),
    set_loading_global: (val) => dispatch(set_loading_global(val)),
    set_select_id: (val) => dispatch(set_select_id(val)),
    set_width_last_device: (val) => dispatch(set_width_last_device(val)),
    set_height_last_device: (val) => dispatch(set_height_last_device(val)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormCephalometricAnalysis);

const styles = StyleSheet.create({
  container: {
    // width: guidelineBaseWidth,
    // height: guidelineBaseHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
    justifyContent: 'center',
  },

  containerItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#224957',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
