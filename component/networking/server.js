import {Platform} from 'react-native';

const apiurl = 'http://orthoceph.furnabel.com/';
const apiurlImage = 'http://orthoceph-image.furnabel.com/';

//loginAuth
const _loginAuth = async (params) => {
  try {
    let respon = null;

    respon = await fetch(apiurl + 'loginAuth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _loginAuthSosmed = async (params) => {
  try {
    let respon = null;

    respon = await fetch(apiurl + 'loginAuthSosmed', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _cekEmail = async (params) => {
  try {
    let respon = null;

    respon = await fetch(apiurl + 'cekEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _viewCountries = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'viewCountries', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _addDoctor = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addDoctor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _addDoctorSosmed = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addDoctorSosmed', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _deleteDoctor = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'deleteDoctor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _addPatient = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addPatient', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
        },
        body: params,
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _addPatientNoImage = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addPatientNoImage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _viewPatientPagination = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'viewPatientPagination', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _viewPatient = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'viewPatient', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _delPatient = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'delPatient', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _addAnalysisPatient = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addAnalysisPatient', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
        },
        body: params,
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _addPdfReport = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurlImage + 'addPdfReport', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _viewExistingAnalysis = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'viewExistingAnalysis', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _viewResultAnalysis = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'viewResultAnalysis', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.values;
  } catch (err) {
    console.log(err);
  }
};

const _addNotesPatient = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addNotesPatient', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

const _openImage = (imageUrl) => {
  return apiurl + 'getImages/?gambar=' + imageUrl;
};

const _addAnalysisPatientExistingImage = async (params) => {
  try {
    let respon = null;

    if (params) {
      respon = await fetch(apiurl + 'addAnalysisPatientExistingImage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    }

    let responJson = await respon.json();
    return responJson.status;
  } catch (err) {
    console.log(err);
  }
};

export {
  _loginAuth,
  _loginAuthSosmed,
  _cekEmail,
  _viewCountries,
  _addDoctor,
  _addDoctorSosmed,
  _deleteDoctor,
  _addPatient,
  _addPatientNoImage,
  _viewPatient,
  _delPatient,
  _addNotesPatient,
  _addAnalysisPatient,
  _addPdfReport,
  _openImage,
  _viewPatientPagination,
  _viewExistingAnalysis,
  _viewResultAnalysis,
  _addAnalysisPatientExistingImage,
};
