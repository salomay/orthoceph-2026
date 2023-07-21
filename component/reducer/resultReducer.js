import {
  SET_SNA,
  SET_SNB,
  SET_ANB,
  SET_PogNB,
  SET_SNOP,
  SET_SNMP,
  SET_UINA_Angular,
  SET_UINA_Linear,
  SET_LINB_Angular,
  SET_LINB_Linear,
  SET__IIA,
  SET_Upper_Lip,
  SET_Lower_Lip,
  SET_WendellWylie,
  REMOVE_SNA,
  REMOVE_SNB,
  REMOVE_ANB,
  REMOVE_PogNB,
  REMOVE_SNOP,
  REMOVE_SNMP,
  REMOVE_UINA_Angular,
  REMOVE_UINA_Linear,
  REMOVE_LINB_Angular,
  REMOVE_LINB_Linear,
  REMOVE__IIA,
  REMOVE_Upper_Lip,
  REMOVE_Lower_Lip,
  REMOVE_WendellWylie,
} from '../actions/types';

const initialState = {
  sna: [],
  snb: [],
  anb: [],
  pogNB: [],
  snop: [],
  snmp: [],
  uina_angular: [],
  uina_linear: [],
  linb_angular: [],
  linb_linear: [],
  _iia: [],
  upper_lip: [],
  lower_lip: [],
  wendellWylie: [],
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNA:
      return {
        ...state,
        sna: action.data,
      };
    case SET_SNB:
      return {
        ...state,
        snb: action.data,
      };
    case SET_ANB:
      return {
        ...state,
        anb: action.data,
      };
    case SET_PogNB:
      return {
        ...state,
        pogNB: action.data,
      };
    case SET_SNOP:
      return {
        ...state,
        snop: action.data,
      };

    case SET_SNMP:
      return {
        ...state,
        snmp: action.data,
      };
    case SET_UINA_Angular:
      return {
        ...state,
        uina_angular: action.data,
      };
    case SET_UINA_Linear:
      return {
        ...state,
        uina_linear: action.data,
      };
    case SET_LINB_Angular:
      return {
        ...state,
        linb_angular: action.data,
      };
    case SET_LINB_Linear:
      return {
        ...state,
        linb_linear: action.data,
      };
    case SET__IIA:
      return {
        ...state,
        _iia: action.data,
      };
    case SET_Upper_Lip:
      return {
        ...state,
        upper_lip: action.data,
      };
    case SET_Lower_Lip:
      return {
        ...state,
        lower_lip: action.data,
      };
    case SET_WendellWylie:
      return {
        ...state,
        wendellWylie: action.data,
      };

    case REMOVE_SNA:
      return {
        ...state,
        sna: action.data,
      };
    case REMOVE_SNB:
      return {
        ...state,
        snb: action.data,
      };
    case REMOVE_ANB:
      return {
        ...state,
        anb: action.data,
      };
    case REMOVE_PogNB:
      return {
        ...state,
        pogNB: action.data,
      };
    case REMOVE_SNOP:
      return {
        ...state,
        snop: action.data,
      };

    case REMOVE_SNMP:
      return {
        ...state,
        snmp: action.data,
      };
    case REMOVE_UINA_Angular:
      return {
        ...state,
        uina_angular: action.data,
      };
    case REMOVE_UINA_Linear:
      return {
        ...state,
        uina_linear: action.data,
      };
    case REMOVE_LINB_Angular:
      return {
        ...state,
        linb_angular: action.data,
      };
    case REMOVE_LINB_Linear:
      return {
        ...state,
        linb_linear: action.data,
      };
    case REMOVE__IIA:
      return {
        ...state,
        _iia: action.data,
      };
    case REMOVE_Upper_Lip:
      return {
        ...state,
        upper_lip: action.data,
      };
    case REMOVE_Lower_Lip:
      return {
        ...state,
        lower_lip: action.data,
      };
    case REMOVE_WendellWylie:
      return {
        ...state,
        wendellWylie: action.data,
      };

    default:
      return state;
  }
};

export default resultReducer;
