import {Platform} from 'react-native';
import {
  IDS,
  COLORS,
  PATHS,
  CEPHALOMETRIC_DETAILS,
  GENDER_DETAILS,
  CALIBRATION_DETAILS,
  MARK_DETAILS,
  ANALYSIS_DETAILS,
  ANALYSIS_STATE,
  OPEN_WORKSHEET_STATUS,
  HELPER_LINE_DISTANE_WW,
  COMMON_TEXT_STYLE,
} from './Constants';
import ImgToBase64 from 'react-native-image-base64';

const RNFS = require('react-native-fs');

let _logo =
  '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';

export const getMarkDetailsByID = (_markId) =>
  MARK_DETAILS.find((MARK) => MARK.ID === _markId);

export const getGenderDetailsByID = (_genderId) =>
  GENDER_DETAILS.find((GENDER) => GENDER.ID === _genderId);

export const getAnalysisDetailsByID = (_analysisId) =>
  ANALYSIS_DETAILS.find((ANALYSIS) => ANALYSIS.ID === _analysisId);

function getAnalysisColor(status) {
  let color = COLORS.ANALYSIS_NEED_CORRECTION;
  if (status === ANALYSIS_STATE.NORMAL) color = COLORS.ANALYSIS_NORMAL;
  else if (status === ANALYSIS_STATE.CONS) color = COLORS.ANALYSIS_CONS;
  else {
    color = COLORS.ANALYSIS_NEED_CORRECTION;
  }
  return color;
}

export async function getDistanceNumber(_distanceStr) {
  let _distance = 0;
  let _message = '';
  let _success = false;
  if (_distanceStr && _distanceStr !== '') {
    let _convertDistance = Number(_distanceStr);
    if (isNaN(_convertDistance)) {
      _message = `Info: Please Enter Proper Number. Use dot(.) instead of comma(,) for precision values`;
    } else {
      if (_convertDistance <= 0) {
        _message = `Info: Distance must be greater than > 0 (Zero)`;
      } else {
        _distance = _convertDistance;
        _success = true;
      }
    }
  } else {
    _message = `Info: Distance Calibration must not be empty`;
  }
  return {success: _success, message: _message, distance: _distance};
}

export async function lineIntersectAt(pA, pB, pC, pD) {
  const a1 = pB.y - pA.y;
  const b1 = pA.x - pB.x;
  const c1 = a1 * pA.x + b1 * pA.y;

  const a2 = pD.y - pC.y;
  const b2 = pC.x - pD.x;
  const c2 = a2 * pC.x + b2 * pC.y;

  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) return {x: 0, y: 0, determinant: 0};
  // indicates parallel
  else {
    const x = (b2 * c1 - b1 * c2) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    return {
      x,
      y,
      determinant,
    };
  }
}

export async function distanceBetween(p0, p1) {
  const x1 = p0.x;
  const y1 = p0.y;

  const x2 = p1.x;
  const y2 = p1.y;

  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)).toFixed(2);
}

export async function angleBetween(p0, pStart, pEnd) {
  return (
    ((Math.atan2(pStart.x - p0.x, pStart.y - p0.y) -
      Math.atan2(pEnd.x - p0.x, pEnd.y - p0.y)) *
      180) /
    Math.PI
  ).toFixed(2);
}

export async function angleBetween2(p0, p1, c) {
  var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2));
  var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) + Math.pow(c.y - p1.y, 2));
  var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
  var angle = Math.acos(
    (p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c),
  );
  const _angle = angle * (180 / Math.PI);
  if (isNaN(_angle) || null) {
    return 0;
  } else return (angle * (180 / Math.PI)).toFixed(2);
}

export async function SNA(sella, nasion, pointA) {
  const pA = {x: sella.x, y: sella.y};
  const pB = {x: nasion.x, y: nasion.y};

  const pC = {x: nasion.x, y: nasion.y};
  const pD = {x: pointA.x, y: pointA.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: pointA.x, y: pointA.y};
  const pEnd = {x: sella.x, y: sella.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const SNA_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.SNA);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === SNA_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= SNA_DETAILS.CONS.MIN && angle <= SNA_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.SNA,
    value: angle,
    status: status,

    marks: [IDS.MARKS.SELLA, IDS.MARKS.NASION, IDS.MARKS.POINTA],
    landmarkLines: [IDS.LINES.SN, IDS.LINES.NA],
    analysis: {
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function SNB(sella, nasion, pointB) {
  const pA = {x: sella.x, y: sella.y};
  const pB = {x: nasion.x, y: nasion.y};

  const pC = {x: nasion.x, y: nasion.y};
  const pD = {x: pointB.x, y: pointB.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: pointB.x, y: pointB.y};
  const pEnd = {x: sella.x, y: sella.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const SNB_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.SNB);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === SNB_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= SNB_DETAILS.CONS.MIN && angle <= SNB_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.SNB,
    value: angle,
    status: status,

    marks: [IDS.MARKS.SELLA, IDS.MARKS.NASION, IDS.MARKS.POINTB],
    landmarkLines: [IDS.LINES.SN, IDS.LINES.NB],
    analysis: {
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function ANB(pointA, nasion, pointB) {
  const pA = {x: pointA.x, y: pointA.y};
  const pB = {x: nasion.x, y: nasion.y};

  const pC = {x: nasion.x, y: nasion.y};
  const pD = {x: pointB.x, y: pointB.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: pointA.x, y: pointA.y};
  const pEnd = {x: pointB.x, y: pointB.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const ANB_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.ANB);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === ANB_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= ANB_DETAILS.CONS.MIN && angle <= ANB_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.ANB,
    value: angle,
    status: status,

    marks: [IDS.MARKS.POINTA, IDS.MARKS.NASION, IDS.MARKS.POINTB],
    landmarkLines: [IDS.LINES.NA, IDS.LINES.NB],
    analysis: {
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function PogNB(pog, nasion, pointB, calibrationRatio) {
  const pA = {x: nasion.x, y: nasion.y};
  const pB = {x: pointB.x, y: pointB.y};

  const pC = {x: pog.x, y: pog.y};
  const pD = {x: pog.x + 1.0, y: pog.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const _pognbPointDistance = await distanceBetween(
    {
      x: pog.x,
      y: pog.y,
    },
    {
      x: p0.x,
      y: p0.y,
    },
  );

  const distance =
    (calibrationRatio * _pognbPointDistance).toFixed(2) *
    (pog.x >= p0.x ? 1 : -1);
  const POGNB_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.POGNB);

  let status = ANALYSIS_STATE.NORMAL;

  if (distance === POGNB_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  // else if(angle >= ANB_DETAILS.CONS.MIN && angle <= ANB_DETAILS.CONS.MAX)
  //   status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.POGNB,
    value: distance,
    status: status,

    marks: [IDS.MARKS.NASION, IDS.MARKS.POINTB, IDS.MARKS.POG],
    landmarkLines: [IDS.LINES.NB],
    analysis: {
      lines: [
        {
          startX: pointB.x,
          startY: pointB.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: pog.x,
          startY: pog.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
    },
  };
}

export async function SNOP(sella, nasion, u6, u4) {
  const pA = {x: sella.x, y: sella.y};
  const pB = {x: nasion.x, y: nasion.y};

  const pC = {x: u6.x, y: u6.y};
  const pD = {x: u4.x, y: u4.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: sella.x, y: sella.y};
  const pEnd = {x: u6.x, y: u6.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const SNOP_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.SNOP);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === SNOP_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= SNOP_DETAILS.CONS.MIN && angle <= SNOP_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.SNOP,
    value: angle,
    status: status,

    marks: [IDS.MARKS.SELLA, IDS.MARKS.NASION, IDS.MARKS.U6, IDS.MARKS.U4],
    landmarkLines: [IDS.LINES.SN, IDS.LINES.U6U4],
    analysis: {
      lines: [
        {
          startX: sella.x,
          startY: sella.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: u6.x,
          startY: u6.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function SNMP(sella, nasion, gonion, gnathion) {
  const pA = {x: sella.x, y: sella.y};
  const pB = {x: nasion.x, y: nasion.y};

  const pC = {x: gonion.x, y: gonion.y};
  const pD = {x: gnathion.x, y: gnathion.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: sella.x, y: sella.y};
  const pEnd = {x: gonion.x, y: gonion.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const SNMP_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.SNMP);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === SNMP_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= SNMP_DETAILS.CONS.MIN && angle <= SNMP_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.SNMP,
    value: angle,
    status: status,

    marks: [
      IDS.MARKS.SELLA,
      IDS.MARKS.NASION,
      IDS.MARKS.GONION,
      IDS.MARKS.GNATHION,
    ],
    landmarkLines: [IDS.LINES.SN, IDS.LINES.GOGN],
    analysis: {
      lines: [
        {
          startX: sella.x,
          startY: sella.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: gonion.x,
          startY: gonion.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function UPPER_LIP(ms, pogs, ls, calibrationRatio) {
  const pA = {x: ms.x, y: ms.y};
  const pB = {x: pogs.x, y: pogs.y};

  const pC = {x: ls.x, y: ls.y};
  const pD = {x: ls.x + 1.0, y: ls.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const _upperLipDistance = await distanceBetween(
    {
      x: ls.x,
      y: ls.y,
    },
    {
      x: p0.x,
      y: p0.y,
    },
  );

  const distance =
    (calibrationRatio * _upperLipDistance).toFixed(2) * (ls.x >= p0.x ? 1 : -1);
  const UPPER_LIP_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.UPPER_LIP);

  let status = ANALYSIS_STATE.NORMAL;

  if (distance === UPPER_LIP_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    distance >= UPPER_LIP_DETAILS.CONS.MIN &&
    distance <= UPPER_LIP_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.UPPER_LIP,
    value: distance,
    status: status,

    marks: [IDS.MARKS.MS, IDS.MARKS.POGS, IDS.MARKS.LS],
    landmarkLines: [IDS.LINES.MSPOGS],
    analysis: {
      lines: [
        {
          startX: ms.x,
          startY: ms.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: ls.x,
          startY: ls.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
    },
  };
}

export async function LOWER_LIP(ms, pogs, li, calibrationRatio) {
  const pA = {x: ms.x, y: ms.y};
  const pB = {x: pogs.x, y: pogs.y};

  const pC = {x: li.x, y: li.y};
  const pD = {x: li.x + 1.0, y: li.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const _lowerLipDistance = await distanceBetween(
    {
      x: li.x,
      y: li.y,
    },
    {
      x: p0.x,
      y: p0.y,
    },
  );

  const distance =
    (calibrationRatio * _lowerLipDistance).toFixed(2) * (li.x >= p0.x ? 1 : -1);
  const LOWER_LIP_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.LOWER_LIP);

  let status = ANALYSIS_STATE.NORMAL;

  if (distance === LOWER_LIP_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    distance >= LOWER_LIP_DETAILS.CONS.MIN &&
    distance <= LOWER_LIP_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.LOWER_LIP,
    value: distance,
    status: status,

    marks: [IDS.MARKS.MS, IDS.MARKS.POGS, IDS.MARKS.LI],
    landmarkLines: [IDS.LINES.MSPOGS],
    analysis: {
      lines: [
        {
          startX: pogs.x,
          startY: pogs.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: li.x,
          startY: li.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
    },
  };
}

export async function UINA_ANGULAR(nasion, pointA, isa, isi) {
  const pA = {x: nasion.x, y: nasion.y};
  const pB = {x: pointA.x, y: pointA.y};

  const pC = {x: isa.x, y: isa.y};
  const pD = {x: isi.x, y: isi.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pE = {x: isi.x + 1.0, y: isi.y};

  const p1 = await lineIntersectAt(pA, pB, pD, pE);

  const pStart = {x: isi.x, y: isi.y};
  const pEnd = {x: p1.x, y: p1.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const UINA_ANGULAR_DETAILS = getAnalysisDetailsByID(
    IDS.ANALYSIS.UINA_ANGULAR,
  );

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === UINA_ANGULAR_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    angle >= UINA_ANGULAR_DETAILS.CONS.MIN &&
    angle <= UINA_ANGULAR_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.UINA_ANGULAR,
    value: angle,
    status: status,

    marks: [IDS.MARKS.NASION, IDS.MARKS.POINTA, IDS.MARKS.ISA, IDS.MARKS.ISI],
    landmarkLines: [IDS.LINES.NA, IDS.LINES.ISAISI],
    analysis: {
      lines: [
        {
          startX: nasion.x,
          startY: nasion.y,
          endX: p1.x,
          endY: p1.y,
        },
      ],
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function UINA_LINEAR(nasion, pointA, isa, isi, calibrationRatio) {
  const pA = {x: nasion.x, y: nasion.y};
  const pB = {x: pointA.x, y: pointA.y};

  // const pC = {x: isa.x, y: isa.y};
  const pD = {x: isi.x, y: isi.y};

  // const p0 = lineIntersectAt(pA, pB, pC, pD);

  const pE = {x: isi.x + 1.0, y: isi.y};

  const p1 = await lineIntersectAt(pA, pB, pD, pE);

  const _uinaLinearDistance = await distanceBetween(
    {
      x: isi.x,
      y: isi.y,
    },
    {
      x: p1.x,
      y: p1.y,
    },
  );

  const distance =
    (calibrationRatio * _uinaLinearDistance).toFixed(2) *
    (isi.x >= p1.x ? 1 : -1);
  const UINA_LINEAR_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.UINA_LINEAR);

  let status = ANALYSIS_STATE.NORMAL;

  if (distance === UINA_LINEAR_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    distance >= UINA_LINEAR_DETAILS.CONS.MIN &&
    distance <= UINA_LINEAR_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.UINA_LINEAR,
    value: distance,
    status: status,

    marks: [IDS.MARKS.NASION, IDS.MARKS.POINTA, IDS.MARKS.ISA, IDS.MARKS.ISI],
    landmarkLines: [IDS.LINES.NA, IDS.LINES.ISAISI],
    analysis: {
      lines: [
        {
          startX: nasion.x,
          startY: nasion.y,
          endX: p1.x,
          endY: p1.y,
        },
        {
          startX: isi.x,
          startY: isi.y,
          endX: p1.x,
          endY: p1.y,
        },
      ],
    },
  };
}

export async function LINB_ANGULAR(nasion, pointB, iia, iii) {
  const pA = {x: nasion.x, y: nasion.y};
  const pB = {x: pointB.x, y: pointB.y};

  const pC = {x: iia.x, y: iia.y};
  const pD = {x: iii.x, y: iii.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pE = {x: nasion.x + 1.0, y: nasion.y};

  const p1 = await lineIntersectAt(pC, pD, pA, pE);

  let pStart = {x: nasion.x, y: nasion.y};
  let pEnd = {x: p1.x, y: p1.y};

  const angle =
    (await angleBetween2(pStart, pEnd, p0)) * (p1.x > nasion.x ? 1 : -1);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const LINB_ANGULAR_DETAILS = getAnalysisDetailsByID(
    IDS.ANALYSIS.LINB_ANGULAR,
  );

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === LINB_ANGULAR_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    angle >= LINB_ANGULAR_DETAILS.CONS.MIN &&
    angle <= LINB_ANGULAR_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.LINB_ANGULAR,
    value: angle,
    status: status,

    marks: [IDS.MARKS.NASION, IDS.MARKS.POINTB, IDS.MARKS.IIA, IDS.MARKS.III],
    landmarkLines: [IDS.LINES.NB, IDS.LINES.IIAIII],
    analysis: {
      lines: [
        {
          startX: iii.x,
          startY: iii.y,
          endX: p0.x, //p1
          endY: p0.y, // p1
        },
      ],
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

export async function LINB_LINEAR(nasion, pointB, iia, iii, calibrationRatio) {
  const pA = {x: nasion.x, y: nasion.y};
  const pB = {x: pointB.x, y: pointB.y};

  const pC = {x: iii.x, y: iii.y};
  const pD = {x: iii.x + 1.0, y: iii.y};

  const p1 = await lineIntersectAt(pA, pB, pC, pD);

  const _linbLinearDistance = await distanceBetween(
    {
      x: iii.x,
      y: iii.y,
    },
    {
      x: p1.x,
      y: p1.y,
    },
  );

  let distance =
    (calibrationRatio * _linbLinearDistance).toFixed(2) *
    (iii.x >= p1.x ? 1 : -1);
  const LINB_LINEAR_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.LINB_LINEAR);

  let status = ANALYSIS_STATE.NORMAL;

  if (distance === LINB_LINEAR_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (
    distance >= LINB_LINEAR_DETAILS.CONS.MIN &&
    distance <= LINB_LINEAR_DETAILS.CONS.MAX
  )
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.LINB_LINEAR,
    value: distance,
    status: status,

    marks: [IDS.MARKS.NASION, IDS.MARKS.POINTB, IDS.MARKS.IIA, IDS.MARKS.III],
    landmarkLines: [IDS.LINES.NB, IDS.LINES.IIAIII],
    analysis: {
      lines: [
        {
          startX: iii.x,
          startY: iii.y,
          endX: p1.x,
          endY: p1.y,
        },
      ],
    },
  };
}

export async function IIA(isa, isi, iia, iii) {
  const pA = {x: isa.x, y: isa.y};
  const pB = {x: isi.x, y: isi.y};

  const pC = {x: iia.x, y: iia.y};
  const pD = {x: iii.x, y: iii.y};

  const p0 = await lineIntersectAt(pA, pB, pC, pD);

  const pStart = {x: iia.x, y: iia.y};
  const pEnd = {x: isa.x, y: isa.y};

  const angle = await angleBetween(p0, pStart, pEnd);

  const startAngle =
    (180 / Math.PI) * Math.atan2(pStart.y - p0.y, pStart.x - p0.x);
  const sweepAngle = angle;

  const IIA_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.IIA);

  let status = ANALYSIS_STATE.NORMAL;

  if (angle === IIA_DETAILS.NORM) status = ANALYSIS_STATE.NORMAL;
  else if (angle >= IIA_DETAILS.CONS.MIN && angle <= IIA_DETAILS.CONS.MAX)
    status = ANALYSIS_STATE.CONS;
  else status = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    id: IDS.ANALYSIS.IIA,
    value: angle,
    status: status,

    marks: [IDS.MARKS.ISA, IDS.MARKS.ISI, IDS.MARKS.IIA, IDS.MARKS.III],
    landmarkLines: [IDS.LINES.ISAISI, IDS.LINES.IIAIII],
    analysis: {
      lines: [
        {
          startX: isa.x,
          startY: isa.y,
          endX: p0.x,
          endY: p0.y,
        },
        {
          startX: iia.x,
          startY: iia.y,
          endX: p0.x,
          endY: p0.y,
        },
      ],
      angle: {
        x: p0.x,
        y: p0.y,
        startAngle,
        sweepAngle,
      },
    },
  };
}

// Wendell-Wylie

export async function WendellWylie(nasion, ans, menton, calibrationRatio) {
  const _nasionx = nasion.x;
  const _nasiony = nasion.y;

  const _ansx = ans.x;
  const _ansy = ans.y;

  const _mentonx = menton.x;
  const _mentony = menton.y;

  const _toXCoord =
    Math.max(Math.max(_nasionx, _ansx), _mentonx) + HELPER_LINE_DISTANE_WW;

  const _pNasion = {x: _toXCoord, y: _nasiony};
  const _pAns = {x: _toXCoord, y: _ansy};
  const _pMenton = {x: _toXCoord, y: _mentony};

  const _totalDistance = (
    calibrationRatio * (await distanceBetween(_pNasion, _pMenton))
  ).toFixed(2);
  let _midFaceDistance = (
    calibrationRatio * (await distanceBetween(_pNasion, _pAns))
  ).toFixed(2);
  if (_midFaceDistance <= 0) _midFaceDistance = 0;
  let _lowerFaceDistance = (
    calibrationRatio * (await distanceBetween(_pAns, _pMenton))
  ).toFixed(2);
  if (_lowerFaceDistance <= 0) _lowerFaceDistance = 0;

  let _midFacePercentage = ((_midFaceDistance * 100) / _totalDistance).toFixed(
    2,
  );
  if (isNaN(_midFacePercentage)) _midFacePercentage = 0;
  const MIDFACE_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.MIDFACE);

  let status_midface = ANALYSIS_STATE.NORMAL;
  if (_midFacePercentage === MIDFACE_DETAILS.NORM)
    status_midface = ANALYSIS_STATE.NORMAL;
  else status_midface = ANALYSIS_STATE.NEED_CORRECTION;

  let _lowerFacePercentage = 0;
  if (_midFacePercentage > 0)
    _lowerFacePercentage = (100 - _midFacePercentage).toFixed(2);
  // const _lowerFacePercentage = ((_lowerFaceDistance * 100) / _totalDistance).toFixed(2);
  const LOWERFACE_DETAILS = getAnalysisDetailsByID(IDS.ANALYSIS.LOWERFACE);

  let status_lowerface = ANALYSIS_STATE.NORMAL;
  if (_midFacePercentage === LOWERFACE_DETAILS.NORM)
    status_lowerface = ANALYSIS_STATE.NORMAL;
  else status_lowerface = ANALYSIS_STATE.NEED_CORRECTION;

  return {
    MIDFACE: {
      id: IDS.ANALYSIS.MIDFACE,
      value: _midFacePercentage,
      distanceValue: _midFaceDistance,
      status: status_midface,

      marks: [IDS.MARKS.NASION, IDS.MARKS.ANS, IDS.MARKS.MENTON],
      landmarkLines: [IDS.LINES.NANS, IDS.LINES.ANSMENTON],
      analysis: {
        lines: [
          {
            startX: nasion.x,
            startY: nasion.y,
            endX: _pNasion.x,
            endY: _pNasion.y,
          },
          {
            startX: ans.x,
            startY: ans.y,
            endX: _pAns.x,
            endY: _pAns.y,
          },
          {
            startX: _pNasion.x,
            startY: _pNasion.y,
            endX: _pAns.x,
            endY: _pAns.y,
          },
        ],
      },
    },
    LOWERFACE: {
      id: IDS.ANALYSIS.LOWERFACE,
      value: _lowerFacePercentage,
      distanceValue: _lowerFaceDistance,
      status: status_lowerface,

      marks: [IDS.MARKS.NASION, IDS.MARKS.ANS, IDS.MARKS.MENTON],
      landmarkLines: [IDS.LINES.NANS, IDS.LINES.ANSMENTON],
      analysis: {
        lines: [
          {
            startX: menton.x,
            startY: menton.y,
            endX: _pMenton.x,
            endY: _pMenton.y,
          },
          {
            startX: ans.x,
            startY: ans.y,
            endX: _pAns.x,
            endY: _pAns.y,
          },
          {
            startX: _pMenton.x,
            startY: _pMenton.y,
            endX: _pAns.x,
            endY: _pAns.y,
          },
        ],
      },
    },
  };
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export async function generateCephHtml(
  title,
  patient,
  imgSource,
  date,
  analysis,
) {
  // console.log(JSON.stringify(analysis));
  const _SNA = analysis.sna;
  const _SNA_DETAILS = getAnalysisDetailsByID(_SNA.id);
  const _SNA_NAME = `${_SNA_DETAILS.NAME}`;
  const _SNA_VALUE = `${_SNA.value}${_SNA_DETAILS.UNIT}`;
  const _SNA_NORM = `${_SNA_DETAILS.NORM}${_SNA_DETAILS.UNIT}`;
  const _SNA_CONS = `${_SNA_DETAILS.CONS.MIN}-${_SNA_DETAILS.CONS.MAX}${_SNA_DETAILS.UNIT}`;
  const _SNA_COLOR = getAnalysisColor(_SNA.status);

  const _SNB = analysis.snb;
  const _SNB_DETAILS = getAnalysisDetailsByID(_SNB.id);
  const _SNB_NAME = `${_SNB_DETAILS.NAME}`;
  const _SNB_VALUE = `${_SNB.value}${_SNB_DETAILS.UNIT}`;
  const _SNB_NORM = `${_SNB_DETAILS.NORM}${_SNB_DETAILS.UNIT}`;
  const _SNB_CONS = `${_SNB_DETAILS.CONS.MIN}-${_SNB_DETAILS.CONS.MAX}${_SNB_DETAILS.UNIT}`;
  const _SNB_COLOR = getAnalysisColor(_SNB.status);

  const _ANB = analysis.anb;
  const _ANB_DETAILS = getAnalysisDetailsByID(_ANB.id);
  const _ANB_NAME = `${_ANB_DETAILS.NAME}`;
  const _ANB_VALUE = `${_ANB.value}${_ANB_DETAILS.UNIT}`;
  const _ANB_NORM = `${_ANB_DETAILS.NORM}${_ANB_DETAILS.UNIT}`;
  const _ANB_CONS = `${_ANB_DETAILS.CONS.MIN}-${_ANB_DETAILS.CONS.MAX}${_ANB_DETAILS.UNIT}`;
  const _ANB_COLOR = getAnalysisColor(_ANB.status);

  const _PogNB = analysis.pogNB;
  const _PogNB_DETAILS = getAnalysisDetailsByID(_PogNB.id);
  const _PogNB_NAME = `${_PogNB_DETAILS.NAME}`;
  const _PogNB_VALUE = `${_PogNB.value}${_PogNB_DETAILS.UNIT}`;
  const _PogNB_NORM = `${_PogNB_DETAILS.NORM}${_PogNB_DETAILS.UNIT}`;
  const _PogNB_CONS = `-`;
  const _PogNB_COLOR = getAnalysisColor(_PogNB.status);

  const _SNOP = analysis.snop;
  const _SNOP_DETAILS = getAnalysisDetailsByID(_SNOP.id);
  const _SNOP_NAME = `${_SNOP_DETAILS.NAME}`;
  const _SNOP_VALUE = `${_SNOP.value}${_SNOP_DETAILS.UNIT}`;
  const _SNOP_NORM = `${_SNOP_DETAILS.NORM}${_SNOP_DETAILS.UNIT}`;
  const _SNOP_CONS = `${_SNOP_DETAILS.CONS.MIN}-${_SNOP_DETAILS.CONS.MAX}${_SNOP_DETAILS.UNIT}`;
  const _SNOP_COLOR = getAnalysisColor(_SNOP.status);

  const _SNMP = analysis.snmp;
  const _SNMP_DETAILS = getAnalysisDetailsByID(_SNMP.id);
  const _SNMP_NAME = `${_SNMP_DETAILS.NAME}`;
  const _SNMP_VALUE = `${_SNMP.value}${_SNMP_DETAILS.UNIT}`;
  const _SNMP_NORM = `${_SNMP_DETAILS.NORM}${_SNMP_DETAILS.UNIT}`;
  const _SNMP_CONS = `${_SNMP_DETAILS.CONS.MIN}-${_SNMP_DETAILS.CONS.MAX}${_SNMP_DETAILS.UNIT}`;
  const _SNMP_COLOR = getAnalysisColor(_SNMP.status);

  const _UINA_ANGULAR = analysis.uina_angular;
  const _UINA_ANGULAR_DETAILS = getAnalysisDetailsByID(_UINA_ANGULAR.id);
  const _UINA_ANGULAR_NAME = `${_UINA_ANGULAR_DETAILS.NAME}`;
  const _UINA_ANGULAR_VALUE = `${_UINA_ANGULAR.value}${_UINA_ANGULAR_DETAILS.UNIT}`;
  const _UINA_ANGULAR_NORM = `${_UINA_ANGULAR_DETAILS.NORM}${_UINA_ANGULAR_DETAILS.UNIT}`;
  const _UINA_ANGULAR_CONS = `${_UINA_ANGULAR_DETAILS.CONS.MIN}-${_UINA_ANGULAR_DETAILS.CONS.MAX}${_UINA_ANGULAR_DETAILS.UNIT}`;
  const _UINA_ANGULAR_COLOR = getAnalysisColor(_UINA_ANGULAR.status);

  const _UINA_LINEAR = analysis.uina_linear;
  const _UINA_LINEAR_DETAILS = getAnalysisDetailsByID(_UINA_LINEAR.id);
  const _UINA_LINEAR_NAME = `${_UINA_LINEAR_DETAILS.NAME}`;
  const _UINA_LINEAR_VALUE = `${_UINA_LINEAR.value}${_UINA_LINEAR_DETAILS.UNIT}`;
  const _UINA_LINEAR_NORM = `${_UINA_LINEAR_DETAILS.NORM}${_UINA_LINEAR_DETAILS.UNIT}`;
  const _UINA_LINEAR_CONS = `${_UINA_LINEAR_DETAILS.CONS.MIN}-${_UINA_LINEAR_DETAILS.CONS.MAX}${_UINA_LINEAR_DETAILS.UNIT}`;
  const _UINA_LINEAR_COLOR = getAnalysisColor(_UINA_LINEAR.status);

  const _LINB_ANGULAR = analysis.linb_angular;
  const _LINB_ANGULAR_DETAILS = getAnalysisDetailsByID(_LINB_ANGULAR.id);
  const _LINB_ANGULAR_NAME = `${_LINB_ANGULAR_DETAILS.NAME}`;
  const _LINB_ANGULAR_VALUE = `${_LINB_ANGULAR.value}${_LINB_ANGULAR_DETAILS.UNIT}`;
  const _LINB_ANGULAR_NORM = `${_LINB_ANGULAR_DETAILS.NORM}${_LINB_ANGULAR_DETAILS.UNIT}`;
  const _LINB_ANGULAR_CONS = `${_LINB_ANGULAR_DETAILS.CONS.MIN}-${_LINB_ANGULAR_DETAILS.CONS.MAX}${_LINB_ANGULAR_DETAILS.UNIT}`;
  const _LINB_ANGULAR_COLOR = getAnalysisColor(_LINB_ANGULAR.status);

  const _LINB_LINEAR = analysis.linb_linear;
  const _LINB_LINEAR_DETAILS = getAnalysisDetailsByID(_LINB_LINEAR.id);
  const _LINB_LINEAR_NAME = `${_LINB_LINEAR_DETAILS.NAME}`;
  const _LINB_LINEAR_VALUE = `${_LINB_LINEAR.value}${_LINB_LINEAR_DETAILS.UNIT}`;
  const _LINB_LINEAR_NORM = `${_LINB_LINEAR_DETAILS.NORM}${_LINB_LINEAR_DETAILS.UNIT}`;
  const _LINB_LINEAR_CONS = `${_LINB_LINEAR_DETAILS.CONS.MIN}-${_LINB_LINEAR_DETAILS.CONS.MAX}${_LINB_LINEAR_DETAILS.UNIT}`;
  const _LINB_LINEAR_COLOR = getAnalysisColor(_LINB_LINEAR.status);

  const _IIA = analysis._iia;
  const _IIA_DETAILS = getAnalysisDetailsByID(_IIA.id);
  const _IIA_NAME = `${_IIA_DETAILS.NAME}`;
  const _IIA_VALUE = `${_IIA.value}${_IIA_DETAILS.UNIT}`;
  const _IIA_NORM = `${_IIA_DETAILS.NORM}${_IIA_DETAILS.UNIT}`;
  const _IIA_CONS = `${_IIA_DETAILS.CONS.MIN}-${_IIA_DETAILS.CONS.MAX}${_IIA_DETAILS.UNIT}`;
  const _IIA_COLOR = getAnalysisColor(_IIA.status);

  const _UPPER_LIP = analysis.upper_lip;
  const _UPPER_LIP_DETAILS = getAnalysisDetailsByID(_UPPER_LIP.id);
  const _UPPER_LIP_NAME = `${_UPPER_LIP_DETAILS.NAME}`;
  const _UPPER_LIP_VALUE = `${_UPPER_LIP.value}${_UPPER_LIP_DETAILS.UNIT}`;
  const _UPPER_LIP_NORM = `${_UPPER_LIP_DETAILS.NORM}${_UPPER_LIP_DETAILS.UNIT}`;
  const _UPPER_LIP_CONS = `${_UPPER_LIP_DETAILS.CONS.MIN}-${_UPPER_LIP_DETAILS.CONS.MAX}${_UPPER_LIP_DETAILS.UNIT}`;
  const _UPPER_LIP_COLOR = getAnalysisColor(_UPPER_LIP.status);

  const _LOWER_LIP = analysis.lower_lip;
  const _LOWER_LIP_DETAILS = getAnalysisDetailsByID(_LOWER_LIP.id);
  const _LOWER_LIP_NAME = `${_LOWER_LIP_DETAILS.NAME}`;
  const _LOWER_LIP_VALUE = `${_LOWER_LIP.value}${_LOWER_LIP_DETAILS.UNIT}`;
  const _LOWER_LIP_NORM = `${_LOWER_LIP_DETAILS.NORM}${_LOWER_LIP_DETAILS.UNIT}`;
  const _LOWER_LIP_CONS = `${_LOWER_LIP_DETAILS.CONS.MIN}-${_LOWER_LIP_DETAILS.CONS.MAX}${_LOWER_LIP_DETAILS.UNIT}`;
  const _LOWER_LIP_COLOR = getAnalysisColor(_LOWER_LIP.status);

  // Wendell - Wylie
  const _MIDFACE = analysis.wendellWylie.MIDFACE;
  const _MIDFACE_DETAILS = getAnalysisDetailsByID(_MIDFACE.id);
  const _MIDFACE_NAME = `${_MIDFACE_DETAILS.NAME}`;
  const _MIDFACE_VALUE = `${_MIDFACE.distanceValue}mm (${_MIDFACE.value}${_MIDFACE_DETAILS.UNIT})`;
  const _MIDFACE_NORM = `${_MIDFACE_DETAILS.NORM}${_MIDFACE_DETAILS.UNIT}`;
  const _MIDFACE_CONS = `-`;
  const _MIDFACE_COLOR = getAnalysisColor(_MIDFACE.status);

  const _LOWERFACE = analysis.wendellWylie.LOWERFACE;
  const _LOWERFACE_DETAILS = getAnalysisDetailsByID(_LOWERFACE.id);
  const _LOWERFACE_NAME = `${_LOWERFACE_DETAILS.NAME}`;
  const _LOWERFACE_VALUE = `${_LOWERFACE.distanceValue}mm (${_LOWERFACE.value}${_LOWERFACE_DETAILS.UNIT})`;
  const _LOWERFACE_NORM = `${_LOWERFACE_DETAILS.NORM}${_LOWERFACE_DETAILS.UNIT}`;
  const _LOWERFACE_CONS = `-`;
  const _LOWERFACE_COLOR = getAnalysisColor(_LOWERFACE.status);

  // const _gender = getGenderDetailsByID(patient.gender).TEXT;

  // Logo
  // console.log(imgSource);

  const _colW1 = `24%`;
  const _colW2 = `32%`;
  const _colW3 = `22%`;
  const _colW4 = `22%`;

  const _logoBase64 = `data:image/png;base64,${_logo}`;

  let _imgContainerStyle = `width: 10cm; height: 15cm;`; // `width: 33%; height: 85%; padding-top: 1%;`;
  let _imgStyle = 'width: 100%; height: 100%; object-fit: contain;';

  const _font = COMMON_TEXT_STYLE.fontFamily;

  return `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 29cm; height: 18cm;">

    <div style="display: flex; flex-direction: row; width: 25cm; height: 1.5cm; margin-top: 0.5cm; justify-content: center; align-items: center; background-color: ${
      COLORS.LIGHT_PURPLE
    };">
        <div style="width: 1.2cm;">
          <img src='${_logoBase64}' alt='logo' style="max-width: 100%; min-width: 100%;" />
        </div>
        <div style="width: 10cm; margin-left: 1%;">
          <span style="display: block; font-size: 0.5cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; text-align: left; font-family: ${_font};"> ${title} </span>
        </div>
        <div style="width: 13cm;">
          <span style="display: block; text-align: right; font-size: 0.4cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; font-family: ${_font};"> ${patient.fullname} </span>
          <span style="display: block; text-align: right; font-size: 0.4cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; font-family: ${_font};">${patient.gender} - ${
    patient.ageInYears
  } y</span>
          <span style="display: block; text-align: right; font-size: 0.4cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; font-family: ${_font};">${patient.race}</span>
        </div>
    </div>

    <div style="display: flex; flex-direction: row; width: 25cm; height: 15cm; margin-top: 0.5cm; margin-bottom: 1cm; justify-content: center; align-items: flex-start;">

    <div style="${_imgContainerStyle}">
      <img src="${imgSource}" alt='image' style="${_imgStyle}" />
    </div>

    <div style="width: 14cm; height: 15cm; margin-left: 0.25cm;">
        <div style="width: 14cm; display: flex; flex-direction: row; justify-content: center; align-items: center; margin-bottom: 0.5cm;">
          <div style="width: 4cm;">
            <span style="font-size: 0.42cm; font-weight: bold; font-family: ${_font};"> Analysis Result </span>
          </div>
          <div style="width: 10cm; text-align: right;">
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_NORMAL
            }; padding-left: 0.1cm; margin-right: 0.2cm; font-size: 0.25cm; font-family: ${_font};"> Normal </span>
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_CONS
            }; padding-left: 0.1cm; margin-right: 0.2cm; font-size: 0.25cm; font-family: ${_font};"> Consider Correction </span>
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_NEED_CORRECTION
            }; padding-left: 0.1cm; font-size: 0.25cm; font-family: ${_font};"> Need Correction </span>
          </div>
        </div>
        <div style="width: 14cm; margin-bottom: 0.3cm;">
          <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 1. Sagittal </span>
          <table style="width: 14cm; border: 1px solid black; border-collapse: collapse;">
              <tr style="border: 1px solid black; border-collapse: collapse;">
                  <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                    COLORS.LIGHT_PURPLE
                  }; color: white; padding: 0.1cm;  width: ${_colW1}; font-size: 0.3cm; font-family: ${_font};"> Parameter </th>
                  <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                    COLORS.LIGHT_PURPLE
                  }; color: white;  width: ${_colW2}; font-size: 0.3cm; font-family: ${_font};"> Value </th>
                  <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                    COLORS.LIGHT_PURPLE
                  }; color: white;  width: ${_colW3}; font-size: 0.3cm; font-family: ${_font};"> Normal </th>
                  <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                    COLORS.LIGHT_PURPLE
                  }; color: white;  width: ${_colW4}; font-size: 0.3cm; font-family: ${_font};"> Cons. Range </th>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_SNA_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_CONS} </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_SNB_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_CONS} </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm;  width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: 25%;  width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_ANB_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: 25%;  width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: 25%;  width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_CONS} </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm;  width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_PogNB_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_CONS} </td>
              </tr>
          </table>
        </div>
        <div style="width: 14cm; margin-bottom: 0.3cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 2. Vertical </span>
            <table style="width: 14cm; border: 1px solid black; border-collapse: collapse">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_SNOP_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_SNMP_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_CONS} </td>
                </tr>
            </table>
        </div>
        <div style="width: 14cm; margin-bottom: 0.3cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 3. Dental - Sagittal </span>
            <table style="width: 14cm; border: 1px solid black; border-collapse: collapse;">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_UINA_ANGULAR_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_UINA_LINEAR_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LINB_ANGULAR_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_LINB_LINEAR_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_IIA_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_CONS} </td>
                </tr>
            </table>
        </div>
        <div style="width: 14cm; margin-bottom: 0.3cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 4. Soft Tissue - Sagittal </span>
            <table style="width: 14cm; border: 1px solid black; border-collapse: collapse;">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_UPPER_LIP_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LOWER_LIP_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_CONS} </td>
                </tr>
            </table>
        </div>
        <div style="width: 14cm; margin-bottom: 0.3cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 5. Wendell - Wylie </span>
            <table style="width: 14cm; border: 1px solid black; border-collapse: collapse;">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_MIDFACE_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_CONS} </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_NAME} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LOWERFACE_COLOR}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_VALUE} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_NORM} </td>
                  <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_CONS} </td>
                </tr>
            </table>
        </div>
        <div style="width: 14cm; text-align: right; margin-top: 0.2cm;">
           <span style="display: inline-block; font-size: 0.25cm; font-style: italic; font-weight: bold; font-family: ${_font};"> Generated by OrthoCeph v8.0.0 on ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} ${
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2)
  }</span>
        </div>

      </div>

      </div>

      <div>
    `;
}

export async function generateTableCompHtml(
  patient,
  date,
  analysisC1,
  analysisC2,
  analysisC3,
) {
  const _gender = patient.gender;

  const _SNA_C1 = analysisC1.sna;
  const _SNA_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/SNA');
  const _SNA_NAME_C1 = `${_SNA_DETAILS_C1.NAME}`;
  const _SNA_VALUE_C1 = `${_SNA_C1?.value ? _SNA_C1?.value : 0}${
    _SNA_DETAILS_C1.UNIT
  }`;
  const _SNA_NORM_C1 = `${_SNA_DETAILS_C1.NORM}${_SNA_DETAILS_C1.UNIT}`;
  const _SNA_CONS_C1 = `${_SNA_DETAILS_C1.CONS.MIN}-${_SNA_DETAILS_C1.CONS.MAX}${_SNA_DETAILS_C1.UNIT}`;
  const _SNA_COLOR_C1 = getAnalysisColor(_SNA_C1?.status);

  const _SNB_C1 = analysisC1.snb;
  const _SNB_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/SNB');
  const _SNB_NAME_C1 = `${_SNB_DETAILS_C1.NAME}`;
  const _SNB_VALUE_C1 = `${_SNB_C1?.value ? _SNB_C1?.value : 0}${
    _SNB_DETAILS_C1.UNIT
  }`;
  const _SNB_NORM_C1 = `${_SNB_DETAILS_C1.NORM}${_SNB_DETAILS_C1.UNIT}`;
  const _SNB_CONS_C1 = `${_SNB_DETAILS_C1.CONS.MIN}-${_SNB_DETAILS_C1.CONS.MAX}${_SNB_DETAILS_C1.UNIT}`;
  const _SNB_COLOR_C1 = getAnalysisColor(_SNB_C1?.status);

  const _ANB_C1 = analysisC1.anb;
  const _ANB_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/ANB');
  const _ANB_NAME_C1 = `${_ANB_DETAILS_C1.NAME}`;
  const _ANB_VALUE_C1 = `${_ANB_C1?.value ? _ANB_C1?.value : 0}${
    _ANB_DETAILS_C1.UNIT
  }`;
  const _ANB_NORM_C1 = `${_ANB_DETAILS_C1.NORM}${_ANB_DETAILS_C1.UNIT}`;
  const _ANB_CONS_C1 = `${_ANB_DETAILS_C1.CONS.MIN}-${_ANB_DETAILS_C1.CONS.MAX}${_ANB_DETAILS_C1.UNIT}`;
  const _ANB_COLOR_C1 = getAnalysisColor(_ANB_C1?.status);

  const _PogNB_C1 = analysisC1.pognb;
  const _PogNB_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/POGNB');
  const _PogNB_NAME_C1 = `${_PogNB_DETAILS_C1.NAME}`;
  const _PogNB_VALUE_C1 = `${_PogNB_C1?.value ? _PogNB_C1?.value : 0}${
    _PogNB_DETAILS_C1.UNIT
  }`;
  const _PogNB_NORM_C1 = `${_PogNB_DETAILS_C1.NORM}${_PogNB_DETAILS_C1.UNIT}`;
  const _PogNB_CONS_C1 = `-`;
  const _PogNB_COLOR_C1 = getAnalysisColor(_PogNB_C1?.status);

  const _SNOP_C1 = analysisC1.snop;
  const _SNOP_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/SNOP');
  const _SNOP_NAME_C1 = `${_SNOP_DETAILS_C1.NAME}`;
  const _SNOP_VALUE_C1 = `${_SNOP_C1?.value ? _SNOP_C1?.value : 0}${
    _SNOP_DETAILS_C1.UNIT
  }`;
  const _SNOP_NORM_C1 = `${_SNOP_DETAILS_C1.NORM}${_SNOP_DETAILS_C1.UNIT}`;
  const _SNOP_CONS_C1 = `${_SNOP_DETAILS_C1.CONS.MIN}-${_SNOP_DETAILS_C1.CONS.MAX}${_SNOP_DETAILS_C1.UNIT}`;
  const _SNOP_COLOR_C1 = getAnalysisColor(_SNOP_C1?.status);

  const _SNMP_C1 = analysisC1.snmp;
  const _SNMP_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/SNMP');
  const _SNMP_NAME_C1 = `${_SNMP_DETAILS_C1.NAME}`;
  const _SNMP_VALUE_C1 = `${_SNMP_C1?.value ? _SNMP_C1?.value : 0}${
    _SNMP_DETAILS_C1.UNIT
  }`;
  const _SNMP_NORM_C1 = `${_SNMP_DETAILS_C1.NORM}${_SNMP_DETAILS_C1.UNIT}`;
  const _SNMP_CONS_C1 = `${_SNMP_DETAILS_C1.CONS.MIN}-${_SNMP_DETAILS_C1.CONS.MAX}${_SNMP_DETAILS_C1.UNIT}`;
  const _SNMP_COLOR_C1 = getAnalysisColor(_SNMP_C1?.status);

  const _UINA_ANGULAR_C1 = analysisC1.uina_angular;
  const _UINA_ANGULAR_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_ANGULAR',
  );
  const _UINA_ANGULAR_NAME_C1 = `${_UINA_ANGULAR_DETAILS_C1.NAME}`;
  const _UINA_ANGULAR_VALUE_C1 = `${
    _UINA_ANGULAR_C1?.value ? _UINA_ANGULAR_C1?.value : 0
  }${_UINA_ANGULAR_DETAILS_C1.UNIT}`;
  const _UINA_ANGULAR_NORM_C1 = `${_UINA_ANGULAR_DETAILS_C1.NORM}${_UINA_ANGULAR_DETAILS_C1.UNIT}`;
  const _UINA_ANGULAR_CONS_C1 = `${_UINA_ANGULAR_DETAILS_C1.CONS.MIN}-${_UINA_ANGULAR_DETAILS_C1.CONS.MAX}${_UINA_ANGULAR_DETAILS_C1.UNIT}`;
  const _UINA_ANGULAR_COLOR_C1 = getAnalysisColor(_UINA_ANGULAR_C1?.status);

  const _UINA_LINEAR_C1 = analysisC1.uina_linear;
  const _UINA_LINEAR_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_LINEAR',
  );
  const _UINA_LINEAR_NAME_C1 = `${_UINA_LINEAR_DETAILS_C1.NAME}`;
  const _UINA_LINEAR_VALUE_C1 = `${
    _UINA_LINEAR_C1?.value ? _UINA_LINEAR_C1?.value : 0
  }${_UINA_LINEAR_DETAILS_C1.UNIT}`;
  const _UINA_LINEAR_NORM_C1 = `${_UINA_LINEAR_DETAILS_C1.NORM}${_UINA_LINEAR_DETAILS_C1.UNIT}`;
  const _UINA_LINEAR_CONS_C1 = `${_UINA_LINEAR_DETAILS_C1.CONS.MIN}-${_UINA_LINEAR_DETAILS_C1.CONS.MAX}${_UINA_LINEAR_DETAILS_C1.UNIT}`;
  const _UINA_LINEAR_COLOR_C1 = getAnalysisColor(_UINA_LINEAR_C1?.status);

  const _LINB_ANGULAR_C1 = analysisC1.linb_angular;
  const _LINB_ANGULAR_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_ANGULAR',
  );
  const _LINB_ANGULAR_NAME_C1 = `${_LINB_ANGULAR_DETAILS_C1.NAME}`;
  const _LINB_ANGULAR_VALUE_C1 = `${
    _LINB_ANGULAR_C1?.value ? _LINB_ANGULAR_C1?.value : 0
  }${_LINB_ANGULAR_DETAILS_C1.UNIT}`;
  const _LINB_ANGULAR_NORM_C1 = `${_LINB_ANGULAR_DETAILS_C1.NORM}${_LINB_ANGULAR_DETAILS_C1.UNIT}`;
  const _LINB_ANGULAR_CONS_C1 = `${_LINB_ANGULAR_DETAILS_C1.CONS.MIN}-${_LINB_ANGULAR_DETAILS_C1.CONS.MAX}${_LINB_ANGULAR_DETAILS_C1.UNIT}`;
  const _LINB_ANGULAR_COLOR_C1 = getAnalysisColor(_LINB_ANGULAR_C1?.status);

  const _LINB_LINEAR_C1 = analysisC1.linb_linear;
  const _LINB_LINEAR_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_LINEAR',
  );
  const _LINB_LINEAR_NAME_C1 = `${_LINB_LINEAR_DETAILS_C1.NAME}`;
  const _LINB_LINEAR_VALUE_C1 = `${
    _LINB_LINEAR_C1?.value ? _LINB_LINEAR_C1?.value : 0
  }${_LINB_LINEAR_DETAILS_C1.UNIT}`;
  const _LINB_LINEAR_NORM_C1 = `${_LINB_LINEAR_DETAILS_C1.NORM}${_LINB_LINEAR_DETAILS_C1.UNIT}`;
  const _LINB_LINEAR_CONS_C1 = `${_LINB_LINEAR_DETAILS_C1.CONS.MIN}-${_LINB_LINEAR_DETAILS_C1.CONS.MAX}${_LINB_LINEAR_DETAILS_C1.UNIT}`;
  const _LINB_LINEAR_COLOR_C1 = getAnalysisColor(_LINB_LINEAR_C1?.status);

  const _IIA_C1 = analysisC1._iia;
  const _IIA_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/IIA');
  const _IIA_NAME_C1 = `${_IIA_DETAILS_C1.NAME}`;
  const _IIA_VALUE_C1 = `${_IIA_C1?.value ? _IIA_C1?.value : 0}${
    _IIA_DETAILS_C1.UNIT
  }`;
  const _IIA_NORM_C1 = `${_IIA_DETAILS_C1.NORM}${_IIA_DETAILS_C1.UNIT}`;
  const _IIA_CONS_C1 = `${_IIA_DETAILS_C1.CONS.MIN}-${_IIA_DETAILS_C1.CONS.MAX}${_IIA_DETAILS_C1.UNIT}`;
  const _IIA_COLOR_C1 = getAnalysisColor(_IIA_C1?.status);

  const _UPPER_LIP_C1 = analysisC1.upper_lip;
  const _UPPER_LIP_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UPPER_LIP',
  );
  const _UPPER_LIP_NAME_C1 = `${_UPPER_LIP_DETAILS_C1.NAME}`;
  const _UPPER_LIP_VALUE_C1 = `${
    _UPPER_LIP_C1?.value ? _UPPER_LIP_C1?.value : 0
  }${_UPPER_LIP_DETAILS_C1.UNIT}`;
  const _UPPER_LIP_NORM_C1 = `${_UPPER_LIP_DETAILS_C1.NORM}${_UPPER_LIP_DETAILS_C1.UNIT}`;
  const _UPPER_LIP_CONS_C1 = `${_UPPER_LIP_DETAILS_C1.CONS.MIN}-${_UPPER_LIP_DETAILS_C1.CONS.MAX}${_UPPER_LIP_DETAILS_C1.UNIT}`;
  const _UPPER_LIP_COLOR_C1 = getAnalysisColor(_UPPER_LIP_C1?.status);

  const _LOWER_LIP_C1 = analysisC1.lower_lip;
  const _LOWER_LIP_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWER_LIP',
  );
  const _LOWER_LIP_NAME_C1 = `${_LOWER_LIP_DETAILS_C1.NAME}`;
  const _LOWER_LIP_VALUE_C1 = `${
    _LOWER_LIP_C1?.value ? _LOWER_LIP_C1?.value : 0
  }${_LOWER_LIP_DETAILS_C1.UNIT}`;
  const _LOWER_LIP_NORM_C1 = `${_LOWER_LIP_DETAILS_C1.NORM}${_LOWER_LIP_DETAILS_C1.UNIT}`;
  const _LOWER_LIP_CONS_C1 = `${_LOWER_LIP_DETAILS_C1.CONS.MIN}-${_LOWER_LIP_DETAILS_C1.CONS.MAX}${_LOWER_LIP_DETAILS_C1.UNIT}`;
  const _LOWER_LIP_COLOR_C1 = getAnalysisColor(_LOWER_LIP_C1?.status);

  // Wendell - Wylie C1
  const _MIDFACE_C1 = analysisC1.mid_face;
  const _MIDFACE_DETAILS_C1 = getAnalysisDetailsByID('IDS/ANALYSIS/MIDFACE');
  const _MIDFACE_NAME_C1 = `${_MIDFACE_DETAILS_C1.NAME}`;
  const _MIDFACE_VALUE_C1 = `${
    _MIDFACE_C1?.distanceValue ? _MIDFACE_C1?.distanceValue : 0
  }mm (${_MIDFACE_C1?.value ? _MIDFACE_C1?.value : 0}${
    _MIDFACE_DETAILS_C1.UNIT
  })`;
  const _MIDFACE_NORM_C1 = `${_MIDFACE_DETAILS_C1.NORM}${_MIDFACE_DETAILS_C1.UNIT}`;
  const _MIDFACE_CONS_C1 = `-`;
  const _MIDFACE_COLOR_C1 = getAnalysisColor(_MIDFACE_C1?.status);

  const _LOWERFACE_C1 = analysisC1.lower_face;
  const _LOWERFACE_DETAILS_C1 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWERFACE',
  );
  const _LOWERFACE_NAME_C1 = `${_LOWERFACE_DETAILS_C1.NAME}`;
  const _LOWERFACE_VALUE_C1 = `${
    _LOWERFACE_C1?.distanceValue ? _LOWERFACE_C1?.distanceValue : 0
  }mm (${_LOWERFACE_C1?.value ? _LOWERFACE_C1?.value : 0}${
    _LOWERFACE_DETAILS_C1.UNIT
  })`;
  const _LOWERFACE_NORM_C1 = `${_LOWERFACE_DETAILS_C1.NORM}${_LOWERFACE_DETAILS_C1.UNIT}`;
  const _LOWERFACE_CONS_C1 = `-`;
  const _LOWERFACE_COLOR_C1 = getAnalysisColor(_LOWERFACE_C1?.status);

  ///////////////////////////// C2 /////////////////////////////////////

  const _SNA_C2 = analysisC2?.sna;
  const _SNA_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/SNA');
  // const _SNA_NAME_C2 = `${_SNA_DETAILS_C2.NAME}`;
  const _SNA_VALUE_C2 = `${_SNA_C2?.value ? _SNA_C2?.value : 0}${
    _SNA_DETAILS_C2.UNIT
  }`;
  // const _SNA_NORM_C2 = `${_SNA_DETAILS_C2.NORM}${_SNA_DETAILS_C2.UNIT}`;
  // const _SNA_CONS_C2 = `${_SNA_DETAILS_C2.CONS.MIN}-${_SNA_DETAILS_C2.CONS.MAX}${_SNA_DETAILS_C2.UNIT}`;
  const _SNA_COLOR_C2 = getAnalysisColor(_SNA_C2?.status);

  const _SNB_C2 = analysisC2?.snb;
  console.log('SNB COMP = ' + JSON.stringify(analysisC2?.snb));
  const _SNB_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/SNB');
  // const _SNB_NAME_C2 = `${_SNB_DETAILS_C2.NAME}`;
  const _SNB_VALUE_C2 = `${_SNB_C2?.value ? _SNB_C2?.value : 0}${
    _SNB_DETAILS_C2.UNIT
  }`;
  // const _SNB_NORM_C2 = `${_SNB_DETAILS_C2.NORM}${_SNB_DETAILS_C2.UNIT}`;
  // const _SNB_CONS_C2 = `${_SNB_DETAILS_C2.CONS.MIN}-${_SNB_DETAILS_C2.CONS.MAX}${_SNB_DETAILS_C2.UNIT}`;
  const _SNB_COLOR_C2 = getAnalysisColor(_SNB_C1?.status);

  const _ANB_C2 = analysisC2?.anb;
  const _ANB_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/ANB');
  // const _ANB_NAME_C2 = `${_ANB_DETAILS_C2.NAME}`;
  const _ANB_VALUE_C2 = `${_ANB_C2?.value ? _ANB_C2?.value : 0}${
    _ANB_DETAILS_C2.UNIT
  }`;
  // const _ANB_NORM_C2 = `${_ANB_DETAILS_C2.NORM}${_ANB_DETAILS_C2.UNIT}`;
  // const _ANB_CONS_C2 = `${_ANB_DETAILS_C2.CONS.MIN}-${_ANB_DETAILS_C2.CONS.MAX}${_ANB_DETAILS_C2.UNIT}`;
  const _ANB_COLOR_C2 = getAnalysisColor(_ANB_C2?.status);

  const _PogNB_C2 = analysisC2?.pognb;
  const _PogNB_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/POGNB');
  // const _PogNB_NAME_C2 = `${_PogNB_DETAILS_C2.NAME}`;
  const _PogNB_VALUE_C2 = `${_PogNB_C2?.value ? _PogNB_C2?.value : 0}${
    _PogNB_DETAILS_C2.UNIT
  }`;
  // const _PogNB_NORM_C2 = `${_PogNB_DETAILS_C2.NORM}${_PogNB_DETAILS_C2.UNIT}`;
  // const _PogNB_CONS_C2 = `-`;
  const _PogNB_COLOR_C2 = getAnalysisColor(_PogNB_C2?.status);

  const _SNOP_C2 = analysisC2?.snop;
  const _SNOP_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/SNOP');
  // const _SNOP_NAME_C2 = `${_SNOP_DETAILS_C2.NAME}`;
  const _SNOP_VALUE_C2 = `${_SNOP_C2?.value ? _SNOP_C2?.value : 0}${
    _SNOP_DETAILS_C2.UNIT
  }`;
  // const _SNOP_NORM_C2 = `${_SNOP_DETAILS_C2.NORM}${_SNOP_DETAILS_C2.UNIT}`;
  // const _SNOP_CONS_C2 = `${_SNOP_DETAILS_C2.CONS.MIN}-${_SNOP_DETAILS_C2.CONS.MAX}${_SNOP_DETAILS_C2.UNIT}`;
  const _SNOP_COLOR_C2 = getAnalysisColor(_SNOP_C2?.status);

  const _SNMP_C2 = analysisC2?.snmp;
  const _SNMP_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/SNMP');
  // const _SNMP_NAME_C2 = `${_SNMP_DETAILS_C2.NAME}`;
  const _SNMP_VALUE_C2 = `${_SNMP_C2?.value ? _SNMP_C2?.value : 0}${
    _SNMP_DETAILS_C2.UNIT
  }`;
  // const _SNMP_NORM_C2 = `${_SNMP_DETAILS_C2.NORM}${_SNMP_DETAILS_C2.UNIT}`;
  // const _SNMP_CONS_C2 = `${_SNMP_DETAILS_C2.CONS.MIN}-${_SNMP_DETAILS_C2.CONS.MAX}${_SNMP_DETAILS_C2.UNIT}`;
  const _SNMP_COLOR_C2 = getAnalysisColor(_SNMP_C2?.status);

  const _UINA_ANGULAR_C2 = analysisC2?.uina_angular;
  const _UINA_ANGULAR_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_ANGULAR',
  );
  // const _UINA_ANGULAR_NAME_C2 = `${_UINA_ANGULAR_DETAILS_C2.NAME}`;
  const _UINA_ANGULAR_VALUE_C2 = `${
    _UINA_ANGULAR_C2?.value ? _UINA_ANGULAR_C2?.value : 0
  }${_UINA_ANGULAR_DETAILS_C2.UNIT}`;
  // const _UINA_ANGULAR_NORM_C2 = `${_UINA_ANGULAR_DETAILS_C2.NORM}${_UINA_ANGULAR_DETAILS_C2.UNIT}`;
  // const _UINA_ANGULAR_CONS_C2 = `${_UINA_ANGULAR_DETAILS_C2.CONS.MIN}-${_UINA_ANGULAR_DETAILS_C2.CONS.MAX}${_UINA_ANGULAR_DETAILS_C2.UNIT}`;
  const _UINA_ANGULAR_COLOR_C2 = getAnalysisColor(_UINA_ANGULAR_C2?.status);

  const _UINA_LINEAR_C2 = analysisC2?.uina_linear;
  const _UINA_LINEAR_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_LINEAR',
  );
  // const _UINA_LINEAR_NAME_C2 = `${_UINA_LINEAR_DETAILS_C2.NAME}`;
  const _UINA_LINEAR_VALUE_C2 = `${
    _UINA_LINEAR_C2?.value ? _UINA_LINEAR_C2?.value : 0
  }${_UINA_LINEAR_DETAILS_C2.UNIT}`;
  // const _UINA_LINEAR_NORM_C2 = `${_UINA_LINEAR_DETAILS_C2.NORM}${_UINA_LINEAR_DETAILS_C2.UNIT}`;
  // const _UINA_LINEAR_CONS_C2 = `${_UINA_LINEAR_DETAILS_C2.CONS.MIN}-${_UINA_LINEAR_DETAILS_C2.CONS.MAX}${_UINA_LINEAR_DETAILS_C2.UNIT}`;
  const _UINA_LINEAR_COLOR_C2 = getAnalysisColor(_UINA_LINEAR_C2?.status);

  const _LINB_ANGULAR_C2 = analysisC2?.linb_angular;
  const _LINB_ANGULAR_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_ANGULAR',
  );
  // const _LINB_ANGULAR_NAME_C2 = `${_LINB_ANGULAR_DETAILS_C2.NAME}`;
  const _LINB_ANGULAR_VALUE_C2 = `${
    _LINB_ANGULAR_C2?.value ? _LINB_ANGULAR_C2?.value : 0
  }${_LINB_ANGULAR_DETAILS_C2.UNIT}`;
  // const _LINB_ANGULAR_NORM_C2 = `${_LINB_ANGULAR_DETAILS_C2.NORM}${_LINB_ANGULAR_DETAILS_C2.UNIT}`;
  // const _LINB_ANGULAR_CONS_C2 = `${_LINB_ANGULAR_DETAILS_C2.CONS.MIN}-${_LINB_ANGULAR_DETAILS_C2.CONS.MAX}${_LINB_ANGULAR_DETAILS_C2.UNIT}`;
  const _LINB_ANGULAR_COLOR_C2 = getAnalysisColor(_LINB_ANGULAR_C2?.status);

  const _LINB_LINEAR_C2 = analysisC2?.linb_linear;
  const _LINB_LINEAR_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_LINEAR',
  );
  // const _LINB_LINEAR_NAME_C2 = `${_LINB_LINEAR_DETAILS_C2.NAME}`;
  const _LINB_LINEAR_VALUE_C2 = `${
    _LINB_LINEAR_C2?.value ? _LINB_LINEAR_C2?.value : 0
  }${_LINB_LINEAR_DETAILS_C2.UNIT}`;
  // const _LINB_LINEAR_NORM_C2 = `${_LINB_LINEAR_DETAILS_C2.NORM}${_LINB_LINEAR_DETAILS_C2.UNIT}`;
  // const _LINB_LINEAR_CONS_C2 = `${_LINB_LINEAR_DETAILS_C2.CONS.MIN}-${_LINB_LINEAR_DETAILS_C2.CONS.MAX}${_LINB_LINEAR_DETAILS_C2.UNIT}`;
  const _LINB_LINEAR_COLOR_C2 = getAnalysisColor(_LINB_LINEAR_C2?.status);

  const _IIA_C2 = analysisC2?._iia;
  const _IIA_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/IIA');
  // const _IIA_NAME_C2 = `${_IIA_DETAILS_C2.NAME}`;
  const _IIA_VALUE_C2 = `${_IIA_C2?.value ? _IIA_C2?.value : 0}${
    _IIA_DETAILS_C2.UNIT
  }`;
  // const _IIA_NORM_C2 = `${_IIA_DETAILS_C2.NORM}${_IIA_DETAILS_C2.UNIT}`;
  // const _IIA_CONS_C2 = `${_IIA_DETAILS_C2.CONS.MIN}-${_IIA_DETAILS_C2.CONS.MAX}${_IIA_DETAILS_C2.UNIT}`;
  const _IIA_COLOR_C2 = getAnalysisColor(_IIA_C2?.status);

  const _UPPER_LIP_C2 = analysisC2?.upper_lip;
  const _UPPER_LIP_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UPPER_LIP',
  );
  // const _UPPER_LIP_NAME_C2 = `${_UPPER_LIP_DETAILS_C2.NAME}`;
  const _UPPER_LIP_VALUE_C2 = `${
    _UPPER_LIP_C2?.value ? _UPPER_LIP_C2?.value : 0
  }${_UPPER_LIP_DETAILS_C2.UNIT}`;
  // const _UPPER_LIP_NORM_C2 = `${_UPPER_LIP_DETAILS_C2.NORM}${_UPPER_LIP_DETAILS_C2.UNIT}`;
  // const _UPPER_LIP_CONS_C2 = `${_UPPER_LIP_DETAILS_C2.CONS.MIN}-${_UPPER_LIP_DETAILS_C2.CONS.MAX}${_UPPER_LIP_DETAILS_C2.UNIT}`;
  const _UPPER_LIP_COLOR_C2 = getAnalysisColor(_UPPER_LIP_C2?.status);

  const _LOWER_LIP_C2 = analysisC2?.lower_lip;
  const _LOWER_LIP_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWER_LIP',
  );
  // const _LOWER_LIP_NAME_C2 = `${_LOWER_LIP_DETAILS_C2.NAME}`;
  const _LOWER_LIP_VALUE_C2 = `${
    _LOWER_LIP_C2?.value ? _LOWER_LIP_C2?.value : 0
  }${_LOWER_LIP_DETAILS_C2.UNIT}`;
  // const _LOWER_LIP_NORM_C2 = `${_LOWER_LIP_DETAILS_C2.NORM}${_LOWER_LIP_DETAILS_C2.UNIT}`;
  // const _LOWER_LIP_CONS_C2 = `${_LOWER_LIP_DETAILS_C2.CONS.MIN}-${_LOWER_LIP_DETAILS_C2.CONS.MAX}${_LOWER_LIP_DETAILS_C2.UNIT}`;
  const _LOWER_LIP_COLOR_C2 = getAnalysisColor(_LOWER_LIP_C2?.status);

  // Wendell - Wylie C2
  const _MIDFACE_C2 = analysisC2?.mid_face;
  const _MIDFACE_DETAILS_C2 = getAnalysisDetailsByID('IDS/ANALYSIS/MIDFACE');
  // const _MIDFACE_NAME_C2 = `${_MIDFACE_DETAILS_C2.NAME}`;
  const _MIDFACE_VALUE_C2 = `${
    _MIDFACE_C2?.distanceValue ? _MIDFACE_C2?.distanceValue : 0
  }mm (${_MIDFACE_C2?.value ? _MIDFACE_C2?.value : 0}${
    _MIDFACE_DETAILS_C2.UNIT
  })`;
  // const _MIDFACE_NORM_C2 = `${_MIDFACE_DETAILS_C2.NORM}${_MIDFACE_DETAILS_C2.UNIT}`;
  // const _MIDFACE_CONS_C2 = `-`;
  const _MIDFACE_COLOR_C2 = getAnalysisColor(_MIDFACE_C2?.status);

  const _LOWERFACE_C2 = analysisC2?.lower_face;
  const _LOWERFACE_DETAILS_C2 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWERFACE',
  );
  // const _LOWERFACE_NAME_C2 = `${_LOWERFACE_DETAILS_C2.NAME}`;
  const _LOWERFACE_VALUE_C2 = `${
    _LOWERFACE_C2?.distanceValue ? _LOWERFACE_C2?.distanceValue : 0
  }mm (${_LOWERFACE_C2?.value ? _LOWERFACE_C2?.value : 0}${
    _LOWERFACE_DETAILS_C2.UNIT
  })`;
  // const _LOWERFACE_NORM_C2 = `${_LOWERFACE_DETAILS_C2.NORM}${_LOWERFACE_DETAILS_C2.UNIT}`;
  // const _LOWERFACE_CONS_C2 = `-`;
  const _LOWERFACE_COLOR_C2 = getAnalysisColor(_LOWERFACE_C2?.status);

  ///////////////////////////////////// C3 ////////////////////////////////////

  const _SNA_C3 = analysisC3?.sna;
  const _SNA_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/SNA');
  // const _SNA_NAME_C3 = `${_SNA_DETAILS_C3.NAME}`;
  const _SNA_VALUE_C3 = `${_SNA_C3?.value ? _SNA_C3?.value : 0}${
    _SNA_DETAILS_C3.UNIT
  }`;
  // const _SNA_NORM_C3 = `${_SNA_DETAILS_C3.NORM}${_SNA_DETAILS_C3.UNIT}`;
  // const _SNA_CONS_C3 = `${_SNA_DETAILS_C3.CONS.MIN}-${_SNA_DETAILS_C3.CONS.MAX}${_SNA_DETAILS_C3.UNIT}`;
  const _SNA_COLOR_C3 = getAnalysisColor(_SNA_C3?.status);

  const _SNB_C3 = analysisC3?.snb;
  const _SNB_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/SNB');
  // const _SNB_NAME_C3 = `${_SNB_DETAILS_C3.NAME}`;
  const _SNB_VALUE_C3 = `${_SNB_C3?.value ? _SNB_C3?.value : 0}${
    _SNB_DETAILS_C3.UNIT
  }`;
  // const _SNB_NORM_C3 = `${_SNB_DETAILS_C3.NORM}${_SNB_DETAILS_C3.UNIT}`;
  // const _SNB_CONS_C3 = `${_SNB_DETAILS_C3.CONS.MIN}-${_SNB_DETAILS_C3.CONS.MAX}${_SNB_DETAILS_C3.UNIT}`;
  const _SNB_COLOR_C3 = getAnalysisColor(_SNB_C3?.status);

  const _ANB_C3 = analysisC3?.anb;
  const _ANB_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/ANB');
  // const _ANB_NAME_C3 = `${_ANB_DETAILS_C3.NAME}`;
  const _ANB_VALUE_C3 = `${_ANB_C3?.value ? _ANB_C3?.value : 0}${
    _ANB_DETAILS_C3.UNIT
  }`;
  // const _ANB_NORM_C3 = `${_ANB_DETAILS_C3.NORM}${_ANB_DETAILS_C3.UNIT}`;
  // const _ANB_CONS_C3 = `${_ANB_DETAILS_C3.CONS.MIN}-${_ANB_DETAILS_C3.CONS.MAX}${_ANB_DETAILS_C3.UNIT}`;
  const _ANB_COLOR_C3 = getAnalysisColor(_ANB_C3?.status);

  const _PogNB_C3 = analysisC3?.pognb;
  const _PogNB_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/POGNB');
  // const _PogNB_NAME_C3 = `${_PogNB_DETAILS_C3.NAME}`;
  const _PogNB_VALUE_C3 = `${_PogNB_C3?.value ? _PogNB_C3?.value : 0}${
    _PogNB_DETAILS_C3.UNIT
  }`;
  // const _PogNB_NORM_C3 = `${_PogNB_DETAILS_C3.NORM}${_PogNB_DETAILS_C3.UNIT}`;
  // const _PogNB_CONS_C3 = `-`;
  const _PogNB_COLOR_C3 = getAnalysisColor(_PogNB_C3?.status);

  const _SNOP_C3 = analysisC3?.snop;
  const _SNOP_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/SNOP');
  // const _SNOP_NAME_C3 = `${_SNOP_DETAILS_C3.NAME}`;
  const _SNOP_VALUE_C3 = `${_SNOP_C3?.value ? _SNOP_C3?.value : 0}${
    _SNOP_DETAILS_C3.UNIT
  }`;
  // const _SNOP_NORM_C3 = `${_SNOP_DETAILS_C3.NORM}${_SNOP_DETAILS_C3.UNIT}`;
  // const _SNOP_CONS_C3 = `${_SNOP_DETAILS_C3.CONS.MIN}-${_SNOP_DETAILS_C3.CONS.MAX}${_SNOP_DETAILS_C3.UNIT}`;
  const _SNOP_COLOR_C3 = getAnalysisColor(_SNOP_C3?.status);

  const _SNMP_C3 = analysisC3?.snmp;
  const _SNMP_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/SNMP');
  // const _SNMP_NAME_C3 = `${_SNMP_DETAILS_C3.NAME}`;
  const _SNMP_VALUE_C3 = `${_SNMP_C3?.value ? _SNMP_C3?.value : 0}${
    _SNMP_DETAILS_C3.UNIT
  }`;
  // const _SNMP_NORM_C3 = `${_SNMP_DETAILS_C3.NORM}${_SNMP_DETAILS_C3.UNIT}`;
  // const _SNMP_CONS_C3 = `${_SNMP_DETAILS_C3.CONS.MIN}-${_SNMP_DETAILS_C3.CONS.MAX}${_SNMP_DETAILS_C3.UNIT}`;
  const _SNMP_COLOR_C3 = getAnalysisColor(_SNMP_C3?.status);

  const _UINA_ANGULAR_C3 = analysisC3?.uina_angular;
  const _UINA_ANGULAR_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_ANGULAR',
  );
  // const _UINA_ANGULAR_NAME_C3 = `${_UINA_ANGULAR_DETAILS_C3.NAME}`;
  const _UINA_ANGULAR_VALUE_C3 = `${
    _UINA_ANGULAR_C3?.value ? _UINA_ANGULAR_C3?.value : 0
  }${_UINA_ANGULAR_DETAILS_C3.UNIT}`;
  // const _UINA_ANGULAR_NORM_C3 = `${_UINA_ANGULAR_DETAILS_C3.NORM}${_UINA_ANGULAR_DETAILS_C3.UNIT}`;
  // const _UINA_ANGULAR_CONS_C3 = `${_UINA_ANGULAR_DETAILS_C3.CONS.MIN}-${_UINA_ANGULAR_DETAILS_C3.CONS.MAX}${_UINA_ANGULAR_DETAILS_C3.UNIT}`;
  const _UINA_ANGULAR_COLOR_C3 = getAnalysisColor(_UINA_ANGULAR_C3?.status);

  const _UINA_LINEAR_C3 = analysisC3?.uina_linear;
  const _UINA_LINEAR_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UINA_LINEAR',
  );
  // const _UINA_LINEAR_NAME_C3 = `${_UINA_LINEAR_DETAILS_C3.NAME}`;
  const _UINA_LINEAR_VALUE_C3 = `${
    _UINA_LINEAR_C3?.value ? _UINA_LINEAR_C3?.value : 0
  }${_UINA_LINEAR_DETAILS_C3.UNIT}`;
  // const _UINA_LINEAR_NORM_C3 = `${_UINA_LINEAR_DETAILS_C3.NORM}${_UINA_LINEAR_DETAILS_C3.UNIT}`;
  // const _UINA_LINEAR_CONS_C3 = `${_UINA_LINEAR_DETAILS_C3.CONS.MIN}-${_UINA_LINEAR_DETAILS_C3.CONS.MAX}${_UINA_LINEAR_DETAILS_C3.UNIT}`;
  const _UINA_LINEAR_COLOR_C3 = getAnalysisColor(_UINA_LINEAR_C3?.status);

  const _LINB_ANGULAR_C3 = analysisC3?.linb_angular;
  const _LINB_ANGULAR_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_ANGULAR',
  );
  // const _LINB_ANGULAR_NAME_C3 = `${_LINB_ANGULAR_DETAILS_C3.NAME}`;
  const _LINB_ANGULAR_VALUE_C3 = `${
    _LINB_ANGULAR_C3?.value ? _LINB_ANGULAR_C3?.value : 0
  }${_LINB_ANGULAR_DETAILS_C3.UNIT}`;
  // const _LINB_ANGULAR_NORM_C3 = `${_LINB_ANGULAR_DETAILS_C3.NORM}${_LINB_ANGULAR_DETAILS_C3.UNIT}`;
  // const _LINB_ANGULAR_CONS_C3 = `${_LINB_ANGULAR_DETAILS_C3.CONS.MIN}-${_LINB_ANGULAR_DETAILS_C3.CONS.MAX}${_LINB_ANGULAR_DETAILS_C3.UNIT}`;
  const _LINB_ANGULAR_COLOR_C3 = getAnalysisColor(_LINB_ANGULAR_C3?.status);

  const _LINB_LINEAR_C3 = analysisC3?.linb_linear;
  const _LINB_LINEAR_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LINB_LINEAR',
  );
  // const _LINB_LINEAR_NAME_C3 = `${_LINB_LINEAR_DETAILS_C3.NAME}`;
  const _LINB_LINEAR_VALUE_C3 = `${
    _LINB_LINEAR_C3?.value ? _LINB_LINEAR_C3?.value : 0
  }${_LINB_LINEAR_DETAILS_C3.UNIT}`;
  // const _LINB_LINEAR_NORM_C3 = `${_LINB_LINEAR_DETAILS_C3.NORM}${_LINB_LINEAR_DETAILS_C3.UNIT}`;
  // const _LINB_LINEAR_CONS_C3 = `${LINB_LINEAR_DETAILS_C3.CONS.MIN}-${_LINB_LINEAR_DETAILS_C3.CONS.MAX}${_LINB_LINEAR_DETAILS_C3.UNIT}`;
  const _LINB_LINEAR_COLOR_C3 = getAnalysisColor(_LINB_LINEAR_C3?.status);

  const _IIA_C3 = analysisC3?._iia;
  const _IIA_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/IIA');
  // const _IIA_NAME_C3 = `${_IIA_DETAILS_C3.NAME}`;
  const _IIA_VALUE_C3 = `${_IIA_C3?.value ? _IIA_C3?.value : 0}${
    _IIA_DETAILS_C3.UNIT
  }`;
  // const _IIA_NORM_C3 = `${_IIA_DETAILS_C3.NORM}${_IIA_DETAILS_C3.UNIT}`;
  // const _IIA_CONS_C3 = `${_IIA_DETAILS_C3.CONS.MIN}-${_IIA_DETAILS_C3.CONS.MAX}${_IIA_DETAILS_C3.UNIT}`;
  const _IIA_COLOR_C3 = getAnalysisColor(_IIA_C3?.status);

  const _UPPER_LIP_C3 = analysisC3?.upper_lip;
  const _UPPER_LIP_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/UPPER_LIP',
  );
  // const _UPPER_LIP_NAME_C3 = `${_UPPER_LIP_DETAILS_C3.NAME}`;
  const _UPPER_LIP_VALUE_C3 = `${
    _UPPER_LIP_C3?.value ? _UPPER_LIP_C3?.value : 0
  }${_UPPER_LIP_DETAILS_C3.UNIT}`;
  // const _UPPER_LIP_NORM_C3 = `${_UPPER_LIP_DETAILS_C3.NORM}${_UPPER_LIP_DETAILS_C3.UNIT}`;
  // const _UPPER_LIP_CONS_C3 = `${_UPPER_LIP_DETAILS_C3.CONS.MIN}-${_UPPER_LIP_DETAILS_C3.CONS.MAX}${_UPPER_LIP_DETAILS_C3.UNIT}`;
  const _UPPER_LIP_COLOR_C3 = getAnalysisColor(_UPPER_LIP_C3?.status);

  const _LOWER_LIP_C3 = analysisC3?.lower_lip;
  const _LOWER_LIP_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWER_LIP',
  );
  // const _LOWER_LIP_NAME_C3 = `${_LOWER_LIP_DETAILS_C3.NAME}`;
  const _LOWER_LIP_VALUE_C3 = `${
    _LOWER_LIP_C3?.value ? _LOWER_LIP_C3?.value : 0
  }${_LOWER_LIP_DETAILS_C3.UNIT}`;
  // const _LOWER_LIP_NORM_C3 = `${_LOWER_LIP_DETAILS_C3.NORM}${_LOWER_LIP_DETAILS_C3.UNIT}`;
  // const _LOWER_LIP_CONS_C3 = `${_LOWER_LIP_DETAILS_C3.CONS.MIN}-${_LOWER_LIP_DETAILS_C3.CONS.MAX}${_LOWER_LIP_DETAILS_C3.UNIT}`;
  const _LOWER_LIP_COLOR_C3 = getAnalysisColor(_LOWER_LIP_C3?.status);

  // Wendell - Wylie C3
  const _MIDFACE_C3 = analysisC3?.mid_face;
  const _MIDFACE_DETAILS_C3 = getAnalysisDetailsByID('IDS/ANALYSIS/MIDFACE');
  // const _MIDFACE_NAME_C3 = `${_MIDFACE_DETAILS_C3.NAME}`;
  const _MIDFACE_VALUE_C3 = `${
    _MIDFACE_C3?.distanceValue ? _MIDFACE_C3?.distanceValue : 0
  }mm (${_MIDFACE_C3?.value ? _MIDFACE_C3?.value : 0}${
    _MIDFACE_DETAILS_C3.UNIT
  })`;
  // const _MIDFACE_NORM_C3 = `${_MIDFACE_DETAILS_C3.NORM}${_MIDFACE_DETAILS_C3.UNIT}`;
  // const _MIDFACE_CONS_C3 = `-`;
  const _MIDFACE_COLOR_C3 = getAnalysisColor(_MIDFACE_C3?.status);

  const _LOWERFACE_C3 = analysisC3?.lower_face;
  const _LOWERFACE_DETAILS_C3 = getAnalysisDetailsByID(
    'IDS/ANALYSIS/LOWERFACE',
  );
  // const _LOWERFACE_NAME_C3 = `${_LOWERFACE_DETAILS_C3.NAME}`;
  const _LOWERFACE_VALUE_C3 = `${
    _LOWERFACE_C3?.distanceValue ? _LOWERFACE_C3?.distanceValue : 0
  }mm (${_LOWERFACE_C3?.value ? _LOWERFACE_C3?.value : 0}${
    _LOWERFACE_DETAILS_C3.UNIT
  })`;
  // const _LOWERFACE_NORM_C3 = `${_LOWERFACE_DETAILS_C3.NORM}${_LOWERFACE_DETAILS_C3.UNIT}`;
  // const _LOWERFACE_CONS_C3 = `-`;
  const _LOWERFACE_COLOR_C3 = getAnalysisColor(_LOWERFACE_C3?.status);

  let _logoBase64 = `data:image/png;base64,${_logo}`;

  const _colW1 = `16%`;
  const _colW2 = `20%`;
  const _colW3 = `20%`;
  const _colW4 = `20%`;
  const _colW5 = `12%`;
  const _colW6 = `12%`;

  const _font = COMMON_TEXT_STYLE.fontFamily;

  return `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 29cm; height: 18cm;">

    <div style="display: flex; flex-direction: row; width: 25cm; height: 1.5cm; margin-top: 0.5cm; justify-content: center; align-items: center; background-color: ${
      COLORS.LIGHT_PURPLE
    };">
        <div style="width: 1.2cm;">
          <img src=${_logoBase64} alt='logo' style="max-width: 100%; min-width: 100%;" />
        </div>
        <div style="width: 10cm; margin-left: 1%;">
        <span style="display: block; font-size: 0.5cm; letter-spacing: 0.1cm; color: ${
          COLORS.WHITE
        }; text-align: left; font-family: ${_font};"> CEPHALOMETRIC COMPARISON </span>
        </div>
        <div style="width: 13cm;">
          <span style="display: block; text-align: right; font-size: 0.4cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; font-family: ${_font};"> ${patient.fullname} </span>
          <span style="display: block; text-align: right; font-size: 0.4cm; letter-spacing: 0.1cm; color: ${
            COLORS.WHITE
          }; font-family: ${_font};"> ${patient.gender} / ${
    patient.ageInYears
  }y </span>
        </div>
    </div>

    <div style="display: flex; flex-direction: column; width: 25cm; height: 15cm; margin-top: 0.5cm; margin-bottom: 0.5cm; justify-content: flex-start; align-items: center;">
        <div style="width: 25cm; display: flex; flex-direction: row; justify-content: center; align-items: flex-start; margin-bottom: 0.5cm;">
          <div style="width: 10cm;">
            <span style="font-size: 0.42cm; font-weight: bold; font-family: ${_font};"> Compare Analysis </span>
          </div>
          <div style="width: 15cm; text-align: right;">
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_NORMAL
            }; padding-left: 0.1cm; margin-right: 0.2cm; font-size: 0.25cm; font-family: ${_font};"> Normal </span>
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_CONS
            }; padding-left: 0.1cm; margin-right: 0.2cm; font-size: 0.25cm; font-family: ${_font};"> Consider Correction </span>
            <span style="display: inline-block; border-left: 0.2cm solid ${
              COLORS.ANALYSIS_NEED_CORRECTION
            }; padding-left: 0.1cm; font-size: 0.25cm; font-family: ${_font};"> Need Correction </span>
          </div>
        </div>
        <div style="width: 25cm; margin-bottom: 0.2cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 1. Sagittal </span>
            <table style="width: 25cm; border: 1px solid black; border-collapse: collapse;">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white; padding: 0.1cm;  width: ${_colW1}; font-size: 0.3cm; font-family: ${_font};"> Parameter </th>
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white;  width: ${_colW2}; font-size: 0.3cm; font-family: ${_font};"> C1 </th>
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white;  width: ${_colW3}; font-size: 0.3cm; font-family: ${_font};"> C2 </th>
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white;  width: ${_colW4}; font-size: 0.3cm; font-family: ${_font};"> C3 </th>
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white;  width: ${_colW5}; font-size: 0.3cm; font-family: ${_font};"> Norm </th>
                    <th style="border: 1px solid black; border-collapse: collapse; background-color: ${
                      COLORS.LIGHT_PURPLE
                    }; color: white;  width: ${_colW6}; font-size: 0.3cm; font-family: ${_font};"> Cons. Range </th>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_NAME_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_SNA_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_VALUE_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_SNA_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_VALUE_C2} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_SNA_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_VALUE_C3} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNA_NORM_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                      ${_SNA_CONS_C1}
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_NAME_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_SNB_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_VALUE_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_SNB_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_VALUE_C2} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_SNB_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_VALUE_C3} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNB_NORM_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                      ${_SNB_CONS_C1}
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_NAME_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_ANB_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_VALUE_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_ANB_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_VALUE_C2} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_ANB_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_VALUE_C3} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_ANB_NORM_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                      ${_ANB_CONS_C1}
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_NAME_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_PogNB_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_VALUE_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_PogNB_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_VALUE_C2} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_PogNB_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_VALUE_C3} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_PogNB_NORM_C1} </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                      ${_PogNB_CONS_C1}
                    </td>
                </tr>
            </table>
        </div>

        <div style="width: 25cm; margin-bottom: 0.2cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 2. Vertical </span>
            <table style="width: 25cm; border: 1px solid black; border-collapse: collapse;">
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_SNOP_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_SNOP_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_SNOP_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNOP_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_SNOP_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_SNMP_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_SNMP_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_SNMP_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_SNMP_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_SNMP_CONS_C1}
                </td>
              </tr>
            </table>
        </div>

        <div style="width: 25cm; margin-bottom: 0.2cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 3. Dental - Sagittal </span>
            <table style="width: 25cm; border: 1px solid black; border-collapse: collapse;">
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_UINA_ANGULAR_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_UINA_ANGULAR_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_UINA_ANGULAR_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_ANGULAR_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_UINA_ANGULAR_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_UINA_LINEAR_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_UINA_LINEAR_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_UINA_LINEAR_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UINA_LINEAR_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_UINA_LINEAR_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LINB_ANGULAR_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_LINB_ANGULAR_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_LINB_ANGULAR_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_ANGULAR_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_LINB_ANGULAR_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_LINB_LINEAR_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_LINB_LINEAR_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_LINB_LINEAR_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_LINB_LINEAR_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_LINB_LINEAR_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_IIA_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_IIA_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_IIA_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_IIA_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_IIA_CONS_C1}
                </td>
              </tr>
            </table>
        </div>

        <div style="width: 25cm; margin-bottom: 0.2cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 4. Soft Tissue - Sagittal </span>
            <table style="width: 25cm; border: 1px solid black; border-collapse: collapse;">
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_UPPER_LIP_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_UPPER_LIP_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_UPPER_LIP_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_UPPER_LIP_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_UPPER_LIP_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LOWER_LIP_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_LOWER_LIP_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_LOWER_LIP_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWER_LIP_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_LOWER_LIP_CONS_C1}
                </td>
              </tr>
            </table>
        </div>

        <div style="width: 25cm; margin-bottom: 0.2cm;">
            <span style="display: block; font-size: 0.35cm; margin-bottom: 0.1cm; font-weight: bold; font-family: ${_font};"> 5. Wendell - Wylie </span>
            <table style="width: 25cm; border: 1px solid black; border-collapse: collapse;">
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#F7F6E7'}; color: ${_MIDFACE_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#F7F6E7'}; color: ${_MIDFACE_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#F7F6E7'}; color: ${_MIDFACE_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};"> ${_MIDFACE_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#F7F6E7'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_MIDFACE_CONS_C1}
                </td>
              </tr>
              <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: left; padding: 0.1cm; width: ${_colW1}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_NAME_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW2}; background-color: ${'#E7E6E1'}; color: ${_LOWERFACE_COLOR_C1}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_VALUE_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW3}; background-color: ${'#E7E6E1'}; color: ${_LOWERFACE_COLOR_C2}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_VALUE_C2} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW4}; background-color: ${'#E7E6E1'}; color: ${_LOWERFACE_COLOR_C3}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_VALUE_C3} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW5}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};"> ${_LOWERFACE_NORM_C1} </td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; width: ${_colW6}; background-color: ${'#E7E6E1'}; font-size: 0.3cm; font-family: ${_font};">
                  ${_LOWERFACE_CONS_C1}
                </td>
              </tr>
            </table>
        </div>

        <div style="width: 25cm; text-align: right;">
           <span style="display: inline-block; font-size: 0.25cm; font-style: italic; font-weight: bold; font-family: ${_font};"> Generated by OrthoCeph v8.0.0 on ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} ${
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2)
  }</span>
        </div>

    </div>

    </div>
    `;
}
