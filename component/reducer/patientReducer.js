import {
  SET_PATIENTID,
  SET_DOCTORID,
  SET_FULLNAME,
  SET_GENDER,
  SET_BIRTHDATE,
  SET_RACE,
  SET_PHOTO,
  SET_AGEINYEARS,
  SET_STEP,
  SET_TEMPGAMBAR,
  SET_IMAGEURI,
  SET_IMAGETYPE,
  SET_IMAGEFILENAME,
  SET_ENABLESAVE,
} from '../actions/types';

const initialState = {
  patientid: null,
  doctorid: null,
  fullname: null,
  gender: null,
  birthdate: null,
  race: null,
  photo: null,
  ageInYears: null,
  step: null,
  tempGambar: null,
  imageUri: null,
  imageType: null,
  imageFileName: null,
  enableSave: false,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATIENTID:
      return {
        ...state,
        patientid: action.data,
      };
    case SET_DOCTORID:
      return {
        ...state,
        doctorid: action.data,
      };
    case SET_FULLNAME:
      return {
        ...state,
        fullname: action.data,
      };
    case SET_GENDER:
      return {
        ...state,
        gender: action.data,
      };
    case SET_BIRTHDATE:
      return {
        ...state,
        birthdate: action.data,
      };

    case SET_RACE:
      return {
        ...state,
        race: action.data,
      };
    case SET_PHOTO:
      return {
        ...state,
        photo: action.data,
      };
    case SET_AGEINYEARS:
      return {
        ...state,
        ageInYears: action.data,
      };
    case SET_STEP:
      return {
        ...state,
        step: action.data,
      };
    case SET_TEMPGAMBAR:
      return {
        ...state,
        tempGambar: action.data,
      };
    case SET_IMAGEURI:
      return {
        ...state,
        imageUri: action.data,
      };
    case SET_IMAGETYPE:
      return {
        ...state,
        imageType: action.data,
      };
    case SET_IMAGEFILENAME:
      return {
        ...state,
        imageFileName: action.data,
      };
    case SET_ENABLESAVE:
      return {
        ...state,
        enableSave: action.data,
      };

    default:
      return state;
  }
};

export default patientReducer;
