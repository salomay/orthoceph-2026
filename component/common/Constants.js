export const IDS = {
  PATIENT: {
    // Changing this will affect save & load
    NEW_PATIENT: 0,
    GENDER: {
      NONE: -1,
      MALE: 0,
      FEMALE: 1,
    },
  },

  CEPHALOMETRIC: {
    // Changing this will affect save & load
    DEFAULT: 'CEPHALOMETRIC/DEFAULT',
    C1: 'CEPHALOMETRIC/ONE',
    C2: 'CEPHALOMETRIC/TWO',
    C3: 'CEPHALOMETRIC/THREE',
  },

  CALIBRATION: {
    // Changing this will affect save & load
    STARTING_POINT: 'IDS/CALIBRATION/STARTING_POINT',
    END_POINT: 'IDS/CALIBRATION/END_POINT',
    DISTANCE: 'IDS/CALIBRATION/DISTANCE',
  },

  MARKS: {
    // Changing this will affect save & load
    SELLA: 'IDS/MARKS/SELLA',
    NASION: 'IDS/MARKS/NASION',
    POINTA: 'IDS/MARKS/POINTA',
    POINTB: 'IDS/MARKS/POINTB',
    U6: 'IDS/MARKS/U6',
    U4: 'IDS/MARKS/U4',
    GONION: 'IDS/MARKS/GONION',
    GNATHION: 'IDS/MARKS/GNATHION',
    ISA: 'IDS/MARKS/ISA',
    ISI: 'IDS/MARKS/ISI',
    IIA: 'IDS/MARKS/IIA',
    III: 'IDS/MARKS/III',
    MS: 'IDS/MARKS/MIDS',
    POGS: 'IDS/MARKS/POGS',
    LS: 'IDS/MARKS/LS',
    LI: 'IDS/MARKS/LI',
    POG: 'IDS/MARKS/POG',
    // Wendell - Wylie
    ANS: 'IDS/MARKS/ANS',
    MENTON: 'IDS/MARKS/MENTON',
  },

  ANALYSIS: {
    // Changing this will affect save & load
    SNA: 'IDS/ANALYSIS/SNA',
    SNB: 'IDS/ANALYSIS/SNB',
    ANB: 'IDS/ANALYSIS/ANB',
    POGNB: 'IDS/ANALYSIS/POGNB',
    SNOP: 'IDS/ANALYSIS/SNOP',
    SNMP: 'IDS/ANALYSIS/SNMP',
    UINA_ANGULAR: 'IDS/ANALYSIS/UINA_ANGULAR',
    UINA_LINEAR: 'IDS/ANALYSIS/UINA_LINEAR',
    LINB_ANGULAR: 'IDS/ANALYSIS/LINB_ANGULAR',
    LINB_LINEAR: 'IDS/ANALYSIS/LINB_LINEAR',
    IIA: 'IDS/ANALYSIS/IIA',
    UPPER_LIP: 'IDS/ANALYSIS/UPPER_LIP',
    LOWER_LIP: 'IDS/ANALYSIS/LOWER_LIP',
    // Wendell - Wylie
    MIDFACE: 'IDS/ANALYSIS/MIDFACE',
    LOWERFACE: 'IDS/ANALYSIS/LOWERFACE',
  },

  LINES: {
    SN: 'IDS/LINES/SN',
    NA: 'IDS/LINES/NA',
    NB: 'IDS/LINE/NB',
    U6U4: 'IDS/LINE/U6U4',
    GOGN: 'IDS/LINE/GOGN',
    ISAISI: 'IDS/LINE/ISAISI',
    IIAIII: 'IDS/LINE/IIAIII',
    MSPOGS: 'IDS/LINE/MSPOGS',
    // Wendell - Wylie
    NANS: 'IDS/LINE/NANS',
    ANSMENTON: 'IDS/LINE/ANSMENTON',
  },

  NONE_ID: 'NONE_ID',
};

export const GENDER_DETAILS = [
  {
    ID: IDS.PATIENT.GENDER.NONE,
    TEXT: 'NONE',
    INITIAL: 'N/A',
  },
  {
    ID: IDS.PATIENT.GENDER.MALE,
    TEXT: 'MALE',
    INITIAL: 'M',
  },
  {
    ID: IDS.PATIENT.GENDER.FEMALE,
    TEXT: 'FEMALE',
    INITIAL: 'F',
  },
];

export const CALIBRATION_DETAILS = [
  {
    ID: IDS.CALIBRATION.STARTING_POINT,
    NAME: 'Starting Point of Calibration',
    ICON: `ray-start`,
    HELP: [
      {
        IMG: require('../../assets/help/calibration1.png'),
        DESC: [
          `Mark the starting point of the known calibration distance by touching the location on the image. Marked on the ruler which is usually displayed on the cephalometric image.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    ID: IDS.CALIBRATION.END_POINT,
    NAME: 'End Point of Calibration',
    ICON: `ray-end`,
    HELP: [
      {
        IMG: require('../../assets/help/calibration1.png'),
        DESC: [
          `Mark the starting point of the known calibration distance by touching the location on the image. Marked on the ruler which is usually displayed on the cephalometric image.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    ID: IDS.CALIBRATION.DISTANCE,
    NAME: 'Calibration Distance',
    ICON: `ruler`,
    HELP: [
      {
        IMG: require('../../assets/help/calibration1.png'),
        DESC: [
          `Enter the calibration distance value in milimeters (mm) from the Starting Point to the End Point.`,
        ],
        INFO: [
          `Enter the calibration distance between the Starting Point and the End Point in millimeters (mm)`,
        ],
      },
    ],
  },
];

export const MARK_DETAILS = [
  {
    NAME: 'Sella',
    INITIAL: 'S',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/sella.png'),
        DESC: [
          `S (Sella): Locate and mark the point representing the midpoint of the pituitary fossa (sella turcica)`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Nasion',
    INITIAL: 'N',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/nasion.png'),
        DESC: [
          `N (nasion): Locate and mark the point in the midline of both the nasal root and the nasofrontal suture.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Point A',
    INITIAL: 'A',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/pointA.png'),
        DESC: [
          `Point A: Locate and mark the deepest point in the curve of the maxilla between the ANS and the dental alveolus.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Point B',
    INITIAL: 'B',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/pointB.png'),
        DESC: [
          `Point B: Locate and mark the point at the deepest midline concavity on the mandibular symphysis between infradentale and pogonion`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Mesio Buccal Cusp Tip of Maxillary First Molar',
    INITIAL: 'U6',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/u6.png'),
        DESC: [
          `U6: Locate and mark the Mesio buccal cusp tip of maxillary first molar to construct occlusal plane.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Buccal Cusp Tip of Maxillary First Premolar',
    INITIAL: 'U4',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/u4.png'),
        DESC: [
          `U4: Locate and mark the Buccal cusp tip of maxillary first premolar to construct occlusal plane.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Gonion',
    INITIAL: 'Go',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/gonion.png'),
        DESC: [
          `Go (Gonion): Locate and mark the Constructed point of intersection of the ramus plane and the mandibular plane.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Gnathion',
    INITIAL: 'Gn',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/gnathion.png'),
        DESC: [
          `Gn (gnathion): Locate and mark the lowest point in the midlane on the lower border of the chin.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Root Apex Point of Maxillary Central Incisor',
    INITIAL: 'ISA',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/isa.png'),
        DESC: [
          `ISA: Locate and mark the Root Apex Point of Maxillary Central Incisor to construct its long axis.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Incisal Tip Point of Maxillary Central Incisor',
    INITIAL: 'ISI',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/isi.png'),
        DESC: [
          `ISI: Locate and mark the Incisal Tip Point of Maxillary Central Incisor to construct its long axis.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Root Apex Point of Mandibular Central Incisor',
    INITIAL: 'IIA',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/iia.png'),
        DESC: [
          `IIA: Locate and mark the Root Apex Point of Mandibular Central Incisor`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Incisal Tip Point of Mandibular Central Incisor',
    INITIAL: 'III',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/iii.png'),
        DESC: [
          `III: Locate and mark the Incisal Tip Point of Mandibular Central Incisor`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Midpoint on the S Shaped curve joining upperlip and nose',
    INITIAL: 'MS',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/ms.png'),
        DESC: [
          `Locate and mark the Midpoint on the S Shaped curve joining upperlip and nose`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Soft Pogonion',
    INITIAL: `Pog\xB4`,
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/soft-pog.png'),
        DESC: [
          `Pog\xB4 (soft tissue pogonion): Locate and mark the most protuding point of the soft tissue chin contour.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Labrale Superius',
    INITIAL: 'LS',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/ls.png'),
        DESC: [
          `Ls (Labrale superior): Locate and mark the Most anterior point of the upper lip.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Labrale Inferius',
    INITIAL: 'LI',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/li.png'),
        DESC: [
          `Li (Labrale inferior): Locate and mark the Most anterior point on the lower lip.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Pogonion',
    INITIAL: 'Pog',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/pog.png'),
        DESC: [
          `Pog (pogonion): Locate and mark the most anterior midpoint of the mandible.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  // Wendell - Wylie
  {
    NAME: 'Anterior Nasal Spine',
    INITIAL: 'ANS',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/ans.png'),
        DESC: [
          `ANS (Anterior Nasal Spine): Locate and mark the anterior tip of the sharp bony process of the maxilla at the lower margin of the anterior nasal opening.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
  {
    NAME: 'Menton',
    INITIAL: 'Me',
    ICON: `pencil-circle`,
    HELP: [
      {
        IMG: require('../../assets/help/menton.png'),
        DESC: [
          `Me (Menton): Locate and mark the lowest point on the symphseal shadow of the mandible seen on a lateral cephalogram.`,
        ],
        INFO: [
          `Adjust the position by pressing the operational buttons or by touching a new location on the cephalogram`,
        ],
      },
    ],
  },
];

export const ANALYSIS_DETAILS = [
  {
    ID: IDS.ANALYSIS.SNA,
    NAME: 'SNA',
    TITLE: 'SNA Angle',
    DESC: [
      `The angle is formed by joining the lines S-N and N-point A.`,
      `SNA determines whether the maxilla is positioned anteriorly or posteriorly to the cranial base.`,
      `Angle greater than 82\xB0 indicates protrusion of maxilla.`,
      `Angle lesser than 82\xB0 indicates recessive location of maxilla.`,
    ],
    NORM: 82,
    UNIT: '\xB0',
    CONS: {MIN: 78, MAX: 86},
  },
  {
    ID: IDS.ANALYSIS.SNB,
    NAME: 'SNB',
    TITLE: 'SNB Angle',
    DESC: [
      `The angle is formed by joining the lines S-N and N-point B.`,
      `SNB determines whether the mandible is protruded or retruded relative to the cranial base.`,
      `Angle greater than 80\xB0 suggest prognathic mandible.`,
      `Angle lesser than 80\xB0 indicates recessive mandible.`,
    ],
    NORM: 80,
    UNIT: '\xB0',
    CONS: {MIN: 76, MAX: 84},
  },
  {
    ID: IDS.ANALYSIS.ANB,
    NAME: 'ANB',
    TITLE: 'ANB Angle',
    DESC: [
      `The angle is formed by joining the lines pointA-N and N-point B`,
      `ANB provides a general idea of anterioposterior discrepancy of maxilla to mandibular apical bases.`,
      `Angle greater than 2\xB0 indicates a class II skeletal tendency.`,
      `Angle lesser than 2\xB0 & below 0\xB0 indicates the mandible is located ahead of maxilla, suggesting a class III skeletal relationship.`,
    ],
    NORM: 2,
    UNIT: '\xB0',
    CONS: {MIN: 0, MAX: 4},
  },
  {
    ID: IDS.ANALYSIS.POGNB,
    NAME: 'PogNB',
    TITLE: 'PogNB Distance',
    DESC: [`The distance between point Pog and the line formed by N-B.`],
    NORM: 4,
    UNIT: 'mm',
    CONS: null,
  },
  {
    ID: IDS.ANALYSIS.SNOP,
    NAME: 'SNOP',
    TITLE: 'SNOP Angle',
    DESC: [
      `The angle of occlusal plane & S-N is measured.`,
      `Occlusal plane drawn through the region of overlapping cusps of the first premolars & first molars.`,
      `The angle is increased in long face or vertically growing individuals and also skeletal open bite cases.`,
      `It may be decreased in horizontally growing individuals or cases with a skeletal deep bite.`,
      `It is an appraisal of the location of the teeth in occlusion to the face and the skull.`,
    ],
    NORM: 14.5,
    UNIT: '\xB0',
    CONS: {MIN: 5, MAX: 30},
  },
  {
    ID: IDS.ANALYSIS.SNMP,
    NAME: 'SNMP',
    TITLE: 'SNMP Angle',
    DESC: [
      `The mandibular plane angle is formed by joining the mandibular plane to the anterior cranial base (S-N plane).`,
      `The mandibular plane is formed by a line between Gonion (Go) and Gnathion (Gn).`,
      `Excessively high or low mandibular plane angles suggest unfavorable growth pattern in individuals.`,
    ],
    NORM: 32,
    UNIT: '\xB0',
    CONS: {MIN: 20, MAX: 40},
  },
  {
    ID: IDS.ANALYSIS.UINA_ANGULAR,
    NAME: 'UINA-Angular',
    TITLE: 'UINA-Angular Angle',
    DESC: [
      `Angle is formed by intersection of long axis of upper central incisors & line joining N-A line.`,
      `The angle indicates the relative angular relationship of the upper incisor teeth.`,
      `Angle greater than 22\xB0 may be seen in class II div I.`,
      `Angle greater than 22\xB0 may be seen in class II div 2 case.`,
    ],
    NORM: 22,
    UNIT: '\xB0',
    CONS: {MIN: 15, MAX: 32},
  },
  {
    ID: IDS.ANALYSIS.UINA_LINEAR,
    NAME: 'UINA-Linear',
    TITLE: 'UINA-Linear Distance',
    DESC: [
      `Distance from the most labial surface of the incisor to the N-A line.`,
      `Provides information on the relative forward or backward positioning of the incisor teeth N-A.`,
      `Measurement greater than 4mm common in class I bimaxillary protrusion or in class II div I relationship.`,
      `Measuremnent greater than 4mm common in class II div 2.`,
    ],
    NORM: 4,
    UNIT: 'mm',
    CONS: {MIN: 2, MAX: 6},
  },
  {
    ID: IDS.ANALYSIS.LINB_ANGULAR,
    NAME: 'LINB-Angular',
    TITLE: 'LINB-Angular Angle',
    DESC: [
      `Angle is formed by intersection of long axis of lower central incisors & line joining N-AB line.`,
      `The mandibular incisor to NB measuremnet indicates their axial inclination.`,
      `Angle greater than 25\xB0 may be seen in class II div 1.`,
      `Angle lesser than 25\xB0 commonn in class II div 2 or class III.`,
    ],
    NORM: 25,
    UNIT: '\xB0',
    CONS: {MIN: 15, MAX: 32},
  },
  {
    ID: IDS.ANALYSIS.LINB_LINEAR,
    NAME: 'LINB-Linear',
    TITLE: 'LINB-Linear Distance',
    DESC: [
      `Distance from the most labial surface of the mandibular incisor to the N-B line.`,
      `Provides information on the relative forward or backward positioning of the incisor teeth N-B.`,
    ],
    NORM: 4,
    UNIT: 'mm',
    CONS: {MIN: 2, MAX: 6},
  },
  {
    ID: IDS.ANALYSIS.IIA,
    NAME: 'IIA',
    TITLE: 'IIA Angular',
    DESC: [
      `The angle formed between the long axes of the upper and lower incisors.`,
      `The inter-incisal angle relates the relative position of the upper incisor to that of the lower incisor.`,
      `Angle greater than 130\xB0 or more obtuse, the incisors are considered to be retroclined often require advancing anteriorly or correcting of the axial inclination.`,
      `Conversely, if the angle is less or more acute than 130\xB0, then the anteriors oftern require uprighting are considered to be proclined.`,
    ],
    NORM: 130,
    UNIT: '\xB0',
    CONS: {MIN: 129, MAX: 131},
  },
  {
    ID: IDS.ANALYSIS.UPPER_LIP,
    NAME: 'Upper Lip',
    TITLE: 'Upper Lip Distance',
    DESC: [
      `A line is drawn on the soft tissue contour of the chin to the middle of S-point formed by the lower border of the nose. This line is refered to as the S-line.`,
      `if the upper lip is located beyond the S-line tend to be protrusive.`,
      `if the upper lip is located behind the S-line are interpreted as concave profile.`,
    ],
    NORM: 0,
    UNIT: 'mm',
    CONS: {MIN: -2, MAX: 2},
  },
  {
    ID: IDS.ANALYSIS.LOWER_LIP,
    NAME: 'Lower Lip',
    TITLE: 'Lower Lip Distance',
    DESC: [
      `A line is drawn on the soft tissue contour of the chin to the middle of S-point formed by the lower border of the nose. This line is refered to as the S-line.`,
      `if the lower lip is located beyond the S-line tend to be protrusive.`,
      `if the lower lip is located behind the S-line are interpreted as concave profile.`,
    ],
    NORM: 0,
    UNIT: 'mm',
    CONS: {MIN: -2, MAX: 2},
  },
  // Wendell -  Wylie
  {
    ID: IDS.ANALYSIS.MIDFACE,
    NAME: 'Mid Face',
    TITLE: 'Mid Face Ratio',
    DESC: [
      `A line is formed between Nasion (N) and Anterior Nasal Spine (ANS).`,
      `Determines 1/3 of the human facial height in the middle area.`,
    ],
    NORM: 45,
    UNIT: '%',
    CONS: null,
  },
  {
    ID: IDS.ANALYSIS.LOWERFACE,
    NAME: 'Lower Face',
    TITLE: 'Lower Face Ratio',
    DESC: [
      `A line is formed between Anterior Nasal Spine (ANS) and Menton (Me).`,
      `Determines 1/3 of the human facial height in the lower area.`,
      `Lower low-face than standard might be happen because of lost posterior contact or class III skeletal relation.`,
    ],
    NORM: 55,
    UNIT: '%',
    CONS: null,
  },
];

export const ANALYSIS_STATE = {
  NORMAL: 'ANALYSIS_STATE/NORMAL',
  CONS: 'ANALYSIS_STATE/CONS',
  NEED_CORRECTION: 'ANALYSIS_STATE/NEED_CORRECTION',
};

export const COLORS = {
  WHITE: '#FFF',

  LIGHT_BG: '#edeef2',
  DARK_PURPLE: '#454477',
  LIGHT_PURPLE: '#6170BF',
  GRAY: '#474747',
  LIGHT_GRAY: '#C0C0C0',

  SIDEBAR_TITLE_HEADER_COLOR: '#6495ED',

  CEPH_BG: '#add8e6',
  CEPH_1: '#1E90FF',
  CEPH_2: '#2874a6',
  CEPH_3: '#255ecf',
  COMP: `#154360`,
  CEPH_DONE: '#00FF00',

  DISABLED_OPERATIONAL_BUTTON_BG: '#A0A0A0',
  DISABLED_OPERTAIONAL_BUTTON_ICON_COLOR: '#454545',

  ANALYSIS_NORMAL: '#008000',
  ANALYSIS_CONS: '#FDA50F',
  ANALYSIS_NEED_CORRECTION: '#B22222',

  MESSAGE_BAR_BG: '#008000',
  MESSAGE_BAR_STROKE: '#edeef2',
  MESSAGE_BAR_TITLE_COLOR: '#fff',

  MARKED_CHECKED: '#008000',

  REPORT_HEADER: '#537791',
};

export const DISTANCE_CALIBRATION_NAME = 'distanceCalibration';

export const HELPER_LINE_DISTANE_WW = 50;

export const COMMON_TEXT_STYLE = {fontFamily: 'FontAwesome'};
