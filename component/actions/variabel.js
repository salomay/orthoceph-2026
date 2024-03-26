import {
  SET_STARTINGPOINT,
  SET_ENDPOINT,
  SET_CALIBRATION_DISTANCE,
  SET_GNATHION,
  SET_GONION,
  SET_IIA,
  SET_III,
  SET_ISA,
  SET_ISI,
  SET_LI,
  SET_LS,
  SET_MS,
  SET_NASION,
  SET_POG,
  SET_POGS,
  SET_POINTA,
  SET_POINTB,
  SET_SELLA,
  SET_U4,
  SET_U6,
  SET_ANS,
  SET_MENTON,
  SET_BANTUMARKER,
  SET_MARKING_DOT,
  SET_DISABLE_POINTER,
  SET_OPACITY_POINTER,
  SET_RESULT_ANALYSIS,
  SET_DETAIL_RESULT,
  SET_SNA,
  SET_SNB,
  SET_ANB,
  SET_PogNB,
  SET_UINA_Angular,
  SET_UINA_Linear,
  SET_LINB_Angular,
  SET_LINB_Linear,
  SET__IIA,
  SET_Upper_Lip,
  SET_Lower_Lip,
  SET_WendellWylie,
  SET_SNOP,
  SET_SNMP,
  SET_PRESS_ANALYSIS,
  SET_PRESS_SAVE_ANALYSIS,
  SET_RESET_SCALE_IMAGE,
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
  REMOVE_STARTINGPOINT,
  REMOVE_U4,
  REMOVE_U6,
  REMOVE_ANS,
  REMOVE_MENTON,
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
  SET_HEADERTEXT,
  SET_SUBHEADERTEXT,
  SET_LOADING,
  SET_LOADING_GLOBAL,
  SET_SELECT_ID,
  SET_WIDTH_IMAGE,
  SET_HEIGHT_IMAGE,
} from './types';

export const set_press_analysis = (value) => ({
  type: SET_PRESS_ANALYSIS,
  data: value,
});

export const set_press_save_analysis = (value) => ({
  type: SET_PRESS_SAVE_ANALYSIS,
  data: value,
});

export const set_reset_scale_image = (value) => ({
  type: SET_RESET_SCALE_IMAGE,
  data: value,
});

export const set_disable_pointer = (value) => ({
  type: SET_DISABLE_POINTER,
  data: value,
});

export const set_opacity_pointer = (value) => ({
  type: SET_OPACITY_POINTER,
  data: value,
});

export const set_markingdot = (value) => ({
  type: SET_MARKING_DOT,
  data: value,
});

export const set_resultanalysis = (value) => ({
  type: SET_RESULT_ANALYSIS,
  data: value,
});

export const set_detailresult = (value) => ({
  type: SET_DETAIL_RESULT,
  data: value,
});

export const set_bantuMarker = (value) => ({
  type: SET_BANTUMARKER,
  data: value,
});

export const set_startingPoint = (value) => ({
  type: SET_STARTINGPOINT,
  data: value,
});

export const set_endPoint = (value) => ({
  type: SET_ENDPOINT,
  data: value,
});

export const set_calibrationDistance = (value) => ({
  type: SET_CALIBRATION_DISTANCE,
  data: value,
});

export const set_sella = (value) => ({
  type: SET_SELLA,
  data: value,
});

export const set_nasion = (value) => ({
  type: SET_NASION,
  data: value,
});

export const set_pointa = (value) => ({
  type: SET_POINTA,
  data: value,
});

export const set_pointb = (value) => ({
  type: SET_POINTB,
  data: value,
});

export const set_u6 = (value) => ({
  type: SET_U6,
  data: value,
});

export const set_u4 = (value) => ({
  type: SET_U4,
  data: value,
});

export const set_gonion = (value) => ({
  type: SET_GONION,
  data: value,
});

export const set_gnathion = (value) => ({
  type: SET_GNATHION,
  data: value,
});

export const set_isa = (value) => ({
  type: SET_ISA,
  data: value,
});

export const set_isi = (value) => ({
  type: SET_ISI,
  data: value,
});

export const set_iia = (value) => ({
  type: SET_IIA,
  data: value,
});

export const set_iii = (value) => ({
  type: SET_III,
  data: value,
});

export const set_ms = (value) => ({
  type: SET_MS,
  data: value,
});

export const set_pogs = (value) => ({
  type: SET_POGS,
  data: value,
});

export const set_ls = (value) => ({
  type: SET_LS,
  data: value,
});

export const set_li = (value) => ({
  type: SET_LI,
  data: value,
});

export const set_pog = (value) => ({
  type: SET_POG,
  data: value,
});

export const set_ans = (value) => ({
  type: SET_ANS,
  data: value,
});

export const set_menton = (value) => ({
  type: SET_MENTON,
  data: value,
});
// remove

export const remove_startingPoint = (value) => ({
  type: REMOVE_STARTINGPOINT,
  data: value,
});

export const remove_endPoint = (value) => ({
  type: REMOVE_ENDPOINT,
  data: value,
});

export const remove_sella = (value) => ({
  type: REMOVE_SELLA,
  data: value,
});

export const remove_nasion = (value) => ({
  type: REMOVE_NASION,
  data: value,
});

export const remove_pointa = (value) => ({
  type: REMOVE_POINTA,
  data: value,
});

export const remove_pointb = (value) => ({
  type: REMOVE_POINTB,
  data: value,
});

export const remove_u6 = (value) => ({
  type: REMOVE_U6,
  data: value,
});

export const remove_u4 = (value) => ({
  type: REMOVE_U4,
  data: value,
});

export const remove_gonion = (value) => ({
  type: REMOVE_GONION,
  data: value,
});

export const remove_gnathion = (value) => ({
  type: REMOVE_GNATHION,
  data: value,
});

export const remove_isa = (value) => ({
  type: REMOVE_ISA,
  data: value,
});

export const remove_isi = (value) => ({
  type: REMOVE_ISI,
  data: value,
});

export const remove_iia = (value) => ({
  type: REMOVE_IIA,
  data: value,
});

export const remove_iii = (value) => ({
  type: REMOVE_III,
  data: value,
});

export const remove_ms = (value) => ({
  type: REMOVE_MS,
  data: value,
});

export const remove_pogs = (value) => ({
  type: REMOVE_POGS,
  data: value,
});

export const remove_ls = (value) => ({
  type: REMOVE_LS,
  data: value,
});

export const remove_li = (value) => ({
  type: REMOVE_LI,
  data: value,
});

export const remove_pog = (value) => ({
  type: REMOVE_POG,
  data: value,
});

export const remove_ans = (value) => ({
  type: REMOVE_ANS,
  data: value,
});

export const remove_menton = (value) => ({
  type: REMOVE_MENTON,
  data: value,
});

//Result Variabel

export const set_sna = (value) => ({
  type: SET_SNA,
  data: value,
});

export const set_snb = (value) => ({
  type: SET_SNB,
  data: value,
});

export const set_anb = (value) => ({
  type: SET_ANB,
  data: value,
});

export const set_pogNB = (value) => ({
  type: SET_PogNB,
  data: value,
});

export const set_snop = (value) => ({
  type: SET_SNOP,
  data: value,
});

export const set_snmp = (value) => ({
  type: SET_SNMP,
  data: value,
});

export const set_uina_angular = (value) => ({
  type: SET_UINA_Angular,
  data: value,
});

export const set_uina_linear = (value) => ({
  type: SET_UINA_Linear,
  data: value,
});

export const set_linb_angular = (value) => ({
  type: SET_LINB_Angular,
  data: value,
});

export const set_linb_linear = (value) => ({
  type: SET_LINB_Linear,
  data: value,
});

export const set__iia = (value) => ({
  type: SET__IIA,
  data: value,
});

export const set_upper_lip = (value) => ({
  type: SET_Upper_Lip,
  data: value,
});

export const set_lower_lip = (value) => ({
  type: SET_Lower_Lip,
  data: value,
});

export const set_wendellwylie = (value) => ({
  type: SET_WendellWylie,
  data: value,
});

//REMOVE Result

export const remove_sna = (value) => ({
  type: REMOVE_SNA,
  data: value,
});

export const remove_snb = (value) => ({
  type: REMOVE_SNB,
  data: value,
});

export const remove_anb = (value) => ({
  type: REMOVE_ANB,
  data: value,
});

export const remove_pogNB = (value) => ({
  type: REMOVE_PogNB,
  data: value,
});

export const remove_snop = (value) => ({
  type: REMOVE_SNOP,
  data: value,
});

export const remove_snmp = (value) => ({
  type: REMOVE_SNMP,
  data: value,
});

export const remove_uina_angular = (value) => ({
  type: REMOVE_UINA_Angular,
  data: value,
});

export const remove_uina_linear = (value) => ({
  type: REMOVE_UINA_Linear,
  data: value,
});

export const remove_linb_angular = (value) => ({
  type: REMOVE_LINB_Angular,
  data: value,
});

export const remove_linb_linear = (value) => ({
  type: REMOVE_LINB_Linear,
  data: value,
});

export const remove__iia = (value) => ({
  type: REMOVE__IIA,
  data: value,
});

export const remove_upper_lip = (value) => ({
  type: REMOVE_Upper_Lip,
  data: value,
});

export const remove_lower_lip = (value) => ({
  type: REMOVE_Lower_Lip,
  data: value,
});

export const remove_wendellwylie = (value) => ({
  type: REMOVE_WendellWylie,
  data: value,
});

//Patient Variabel

export const set_patientid = (value) => ({
  type: SET_PATIENTID,
  data: value,
});
export const set_doctorid = (value) => ({
  type: SET_DOCTORID,
  data: value,
});
export const set_fullname = (value) => ({
  type: SET_FULLNAME,
  data: value,
});
export const set_gender = (value) => ({
  type: SET_GENDER,
  data: value,
});
export const set_birthdate = (value) => ({
  type: SET_BIRTHDATE,
  data: value,
});
export const set_race = (value) => ({
  type: SET_RACE,
  data: value,
});
export const set_photo = (value) => ({
  type: SET_PHOTO,
  data: value,
});
export const set_ageinyears = (value) => ({
  type: SET_AGEINYEARS,
  data: value,
});

export const set_step = (value) => ({
  type: SET_STEP,
  data: value,
});

export const set_tempgambar = (value) => ({
  type: SET_TEMPGAMBAR,
  data: value,
});

export const set_imageuri = (value) => ({
  type: SET_IMAGEURI,
  data: value,
});
export const set_imagetype = (value) => ({
  type: SET_IMAGETYPE,
  data: value,
});
export const set_imagefilename = (value) => ({
  type: SET_IMAGEFILENAME,
  data: value,
});
export const set_enablesave = (value) => ({
  type: SET_ENABLESAVE,
  data: value,
});
export const set_headerText = (value) => ({
  type: SET_HEADERTEXT,
  data: value,
});
export const set_subHeaderText = (value) => ({
  type: SET_SUBHEADERTEXT,
  data: value,
});

export const set_loading = (value) => ({
  type: SET_LOADING,
  data: value,
});

export const set_loading_global = (value) => ({
  type: SET_LOADING_GLOBAL,
  data: value,
});

export const set_select_id = (value) => ({
  type: SET_SELECT_ID,
  data: value,
});

export const set_width_last_device = (value) => ({
  type: SET_WIDTH_IMAGE,
  data: value,
});

export const set_height_last_device = (value) => ({
  type: SET_HEIGHT_IMAGE,
  data: value,
});
