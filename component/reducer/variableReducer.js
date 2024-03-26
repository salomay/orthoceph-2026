import {
  SET_ANS,
  SET_ENDPOINT,
  SET_GNATHION,
  SET_GONION,
  SET_IIA,
  SET_III,
  SET_ISA,
  SET_ISI,
  SET_LI,
  SET_LS,
  SET_MENTON,
  SET_MS,
  SET_NASION,
  SET_POG,
  SET_POGS,
  SET_POINTA,
  SET_POINTB,
  SET_SELLA,
  SET_STARTINGPOINT,
  SET_U4,
  SET_U6,
  SET_CALIBRATION_DISTANCE,
  SET_BANTUMARKER,
  SET_MARKING_DOT,
  SET_RESULT_ANALYSIS,
  SET_DETAIL_RESULT,
  SET_DISABLE_POINTER,
  SET_OPACITY_POINTER,
  SET_PRESS_ANALYSIS,
  SET_PRESS_SAVE_ANALYSIS,
  SET_RESET_SCALE_IMAGE,
  REMOVE_STARTINGPOINT,
  REMOVE_ENDPOINT,
  REMOVE_GNATHION,
  REMOVE_GONION,
  REMOVE_IIA,
  REMOVE_III,
  REMOVE_ISA,
  REMOVE_ISI,
  REMOVE_LI,
  REMOVE_LS,
  REMOVE_MS,
  REMOVE_NASION,
  REMOVE_POG,
  REMOVE_POGS,
  REMOVE_POINTA,
  REMOVE_POINTB,
  REMOVE_SELLA,
  REMOVE_U4,
  REMOVE_U6,
  REMOVE_ANS,
  REMOVE_MENTON,
  SET_HEADERTEXT,
  SET_SUBHEADERTEXT,
  SET_LOADING,
  SET_LOADING_GLOBAL,
  SET_SELECT_ID,
  SET_WIDTH_IMAGE,
  SET_HEIGHT_IMAGE,
} from '../actions/types';

const initialState = {
  bantuMarker: 1,
  startingPoint: [],
  endPoint: [],
  calibrationDistance: null,
  sella: [],
  nasion: [],
  pointa: [],
  pointb: [],
  u6: [],
  u4: [],
  gonion: [],
  gnathion: [],
  isa: [],
  isi: [],
  iia: [],
  iii: [],
  ms: [],
  pogs: [],
  ls: [],
  li: [],
  pog: [],
  ans: [],
  menton: [],
  markingDot: true,
  resultAnalysis: false,
  detailResult: false,
  disablePointer: 'auto',
  opacityPointer: 1,
  pressAnalysis: false,
  pressSaveAnalysis: false,
  resetScaleImage: false,
  headerText: '',
  subHeaderText: '',
  loading: false,
  loadingGlobal: false,
  selectid: null,
  widthLastDevice: null,
  heightLastDevice: null,
};

const variabelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_SCALE_IMAGE:
      return {
        ...state,
        resetScaleImage: action.data,
      };
    case SET_PRESS_ANALYSIS:
      return {
        ...state,
        pressAnalysis: action.data,
      };
    case SET_PRESS_SAVE_ANALYSIS:
      return {
        ...state,
        pressSaveAnalysis: action.data,
      };
    case SET_DISABLE_POINTER:
      return {
        ...state,
        disablePointer: action.data,
      };
    case SET_OPACITY_POINTER:
      return {
        ...state,
        opacityPointer: action.data,
      };
    case SET_MARKING_DOT:
      return {
        ...state,
        markingDot: action.data,
      };
    case SET_RESULT_ANALYSIS:
      return {
        ...state,
        resultAnalysis: action.data,
      };
    case SET_DETAIL_RESULT:
      return {
        ...state,
        detailResult: action.data,
      };
    case SET_BANTUMARKER:
      return {
        ...state,
        bantuMarker: action.data,
      };
    case SET_STARTINGPOINT:
      return {
        ...state,
        startingPoint: [action.data],
      };

    case SET_ENDPOINT:
      return {
        ...state,
        endPoint: [action.data],
      };
    case SET_CALIBRATION_DISTANCE:
      return {
        ...state,
        calibrationDistance: action.data,
      };
    case SET_SELLA:
      return {
        ...state,
        sella: [action.data],
      };
    case SET_NASION:
      return {
        ...state,
        nasion: [action.data],
      };
    case SET_POINTA:
      return {
        ...state,
        pointa: [action.data],
      };
    case SET_POINTB:
      return {
        ...state,
        pointb: [action.data],
      };
    case SET_U6:
      return {
        ...state,
        u6: [action.data],
      };
    case SET_U4:
      return {
        ...state,
        u4: [action.data],
      };
    case SET_GONION:
      return {
        ...state,
        gonion: [action.data],
      };
    case SET_GNATHION:
      return {
        ...state,
        gnathion: [action.data],
      };
    case SET_ISA:
      return {
        ...state,
        isa: [action.data],
      };
    case SET_ISI:
      return {
        ...state,
        isi: [action.data],
      };
    case SET_IIA:
      return {
        ...state,
        iia: [action.data],
      };
    case SET_III:
      return {
        ...state,
        iii: [action.data],
      };
    case SET_MS:
      return {
        ...state,
        ms: [action.data],
      };
    case SET_POGS:
      return {
        ...state,
        pogs: [action.data],
      };
    case SET_LS:
      return {
        ...state,
        ls: [action.data],
      };
    case SET_LI:
      return {
        ...state,
        li: [action.data],
      };

    case SET_POG:
      return {
        ...state,
        pog: [action.data],
      };

    case SET_ANS:
      return {
        ...state,
        ans: [action.data],
      };

    case SET_MENTON:
      return {
        ...state,
        menton: [action.data],
      };

    case REMOVE_STARTINGPOINT:
      return {
        ...state,
        startingPoint: [],
      };

    case REMOVE_ENDPOINT:
      return {
        ...state,
        endPoint: [],
      };

    case REMOVE_SELLA:
      return {
        ...state,
        sella: [],
      };
    case REMOVE_NASION:
      return {
        ...state,
        nasion: [],
      };
    case REMOVE_POINTA:
      return {
        ...state,
        pointa: [],
      };
    case REMOVE_POINTB:
      return {
        ...state,
        pointb: [],
      };
    case REMOVE_U6:
      return {
        ...state,
        u6: [],
      };
    case REMOVE_U4:
      return {
        ...state,
        u4: [],
      };
    case REMOVE_GONION:
      return {
        ...state,
        gonion: [],
      };
    case REMOVE_GNATHION:
      return {
        ...state,
        gnathion: [],
      };
    case REMOVE_ISA:
      return {
        ...state,
        isa: [],
      };
    case REMOVE_ISI:
      return {
        ...state,
        isi: [],
      };
    case REMOVE_IIA:
      return {
        ...state,
        iia: [],
      };
    case REMOVE_III:
      return {
        ...state,
        iii: [],
      };
    case REMOVE_MS:
      return {
        ...state,
        ms: [],
      };
    case REMOVE_POGS:
      return {
        ...state,
        pogs: [],
      };
    case REMOVE_LS:
      return {
        ...state,
        ls: [],
      };
    case REMOVE_LI:
      return {
        ...state,
        li: [],
      };

    case REMOVE_POG:
      return {
        ...state,
        pog: [],
      };

    case REMOVE_ANS:
      return {
        ...state,
        ans: [],
      };

    case REMOVE_MENTON:
      return {
        ...state,
        menton: [],
      };

    case SET_HEADERTEXT:
      return {
        ...state,
        headerText: action.data,
      };
    case SET_SUBHEADERTEXT:
      return {
        ...state,
        subHeaderText: action.data,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    case SET_LOADING_GLOBAL:
      return {
        ...state,
        loadingGlobal: action.data,
      };

    case SET_SELECT_ID:
      return {
        ...state,
        selectid: action.data,
      };

    case SET_WIDTH_IMAGE:
      return {
        ...state,
        widthLastDevice: action.data,
      };

    case SET_HEIGHT_IMAGE:
      return {
        ...state,
        heightLastDevice: action.data,
      };

    default:
      return state;
  }
};

export default variabelReducer;
