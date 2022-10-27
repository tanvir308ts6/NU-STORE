import Axios from "axios";
import {
  getAllDegreeUrl,
  getAllDegreeNameUrl,
  storeCertificateVerification,
  updateCertificateVerification,
  organizationCVlist,
  organizationCVUpdate
} from "../../api";

import {
  SET_ALL_DEGREE,
  SET_ALL_DEGREE_NAME,
  UNSET_ALL_DEGREE,
  SET_CV_STEP,
  UNSET_CV_STEP,
  UNSET_CV_STUDENT_SCHEMA,
  RESET_SELECTED_FILE
} from "../../mutation-types";

const state = {
  cv_step: 1,
  cv_student_schema: [
    {
      attachment: [
        {
          attachment_name: null
        }
      ]
    }
  ],
  all_degree: null,
  all_degree_name: null,
  selectedFile: new FormData()
};
const getters = {
  getCVStudentSchema(state) {
    return state.cv_student_schema;
  },
  selectedFile(state) {
    return state.selectedFile;
  },
  getAllDegreeList(state) {
    return state.all_degree;
  },
  getAllDegreeNameList(state) {
    return state.all_degree_name;
  },
  getCVStep(state) {
    return state.cv_step;
  }
};
const mutations = {
  [RESET_SELECTED_FILE](state) {
    state.selectedFile = new FormData();
  },
  [SET_ALL_DEGREE](state, data) {
    state.all_degree = data;
  },
  [SET_ALL_DEGREE_NAME](state, data) {
    state.all_degree_name = data;
  },
  [UNSET_ALL_DEGREE](state) {
    state.all_degree = null;
  },
  [SET_CV_STEP](state, data) {
    state.cv_step = data;
  },
  [UNSET_CV_STEP](state) {
    state.cv_step = 1;
  },
  [UNSET_CV_STUDENT_SCHEMA](state) {
    state.cv_student_schema = [
      {
        attachment: [
          {
            attachment_name: null
          }
        ]
      }
    ];
  }
};
const actions = {
  // fetchCvData({ commit }) {
  //   return new Promise(function(resolve, reject) {
  //     commit("SET_LOADING", { color: "primary" });
  //     Axios.get(organizationCVlist)
  //       .then(function(response) {
  //         let result = response.data.data;
  //         //console.log(response);
  //         // commit("GET_CERTIFICATE_VERIFICATION_DATA", result);
  //         resolve(response.data.data);
  //       })
  //       .catch(function(error) {
  //         // handle error
  //         console.log(error);
  //         reject();
  //       })
  //       .then(response => {
  //         commit("UNSET_LOADING");
  //       });
  //   });
  // },

  getAllDegreeList({ commit, state }) {
    var params = new URLSearchParams();
    return new Promise((resolve, reject) => {
      Axios.get(getAllDegreeUrl)
        .then(res => {
          commit("SET_ALL_DEGREE", res.data.data);
          resolve();
        })
        .catch(() => {
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  getAllDegreeNameList({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(getAllDegreeNameUrl)
        .then(res => {
          commit("SET_ALL_DEGREE_NAME", res.data.data);
          resolve();
        })
        .catch(() => {
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  storeCV({ commit }, data) {
    // const fd = new FormData()
    const json = JSON.stringify(data);
    var params = new URLSearchParams();
    params.append("data", json);
    return new Promise((resolve, reject) => {
      Axios.post(storeCertificateVerification, params)
        .then(res => {
          console.log(res.data);
          // resolve(res.data);
        })
        .catch(() => {
          console.log("n");

          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  updateRequest({ commit }, data) {
    // const fd = new FormData()
    const json = JSON.stringify(data);
    var params = new URLSearchParams();
    params.append("data", json);
    return new Promise((resolve, reject) => {
      Axios.put(updateCertificateVerification, params)
        .then(res => {
          console.log(res.data);
          // resolve(res.data);
        })
        .catch(() => {
          console.log("n");

          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  updateCV({ commit }, data) {
    // const fd = new FormData()
    // const json = JSON.stringify(data);
    // var params = new URLSearchParams();
    // params.append("attachment_name", data.attachment_name);
    // params.append("attachment_name", data.attachment_name);
    // console.log(data);
    return new Promise((resolve, reject) => {
      Axios.put(organizationCVUpdate, data)
        .then(res => {
          console.log(res.data);
          resolve(res.data);
        })
        .catch(() => {
          console.log("n");

          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions
};
