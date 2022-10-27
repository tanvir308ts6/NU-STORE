import Axios from "axios";
import {
  GET_COLLEGE_INFO_DATA,
  SET_COLLEGE_TYPE,
  SET_MGT_TYPE,
  SET_COLLEGE_SCHEMA_DATA
} from "../../mutation-types";
import {
  CollegeInfoList,
  CollegeType,
  CollegeMgtType,
  CollegeProfileUpdate
} from "../../api";
import { saveMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],
  collegeType: [],
  management: [],

  formData: {
    college_code: "",
    college_eiin: "",
    ac_session: "",
    college_name: "",
    email: "",
    mobile: "",
    phone: "",
    fax: "",
    college_type: "",
    mgt_type: "",
    password: "",
    web: "",
    address: "",
    division: "",
    district: "",
    thana: "",
    post_code: "",
    latitude: "",
    longitude: ""
  },

  editData: {
    college_code: "",
    college_eiin: "",
    ac_session: "",
    college_name: "",
    email: "",
    mobile: "",
    phone: "",
    fax: "",
    college_type: "",
    mgt_type: "",
    web: "",
    address: "",
    division: "",
    district: "",
    thana: "",
    post_code: "",
    latitude: "",
    longitude: ""
  }
};

const getters = {
  getCollegeData(state) {
    return state.schema;
  },

  getCollegeTypes(state) {
    return state.collegeType;
  },
  getMgtTypes(state) {
    return state.management;
  },

  setFormData(state) {
    return state.formData;
  },
  setEditFormData(state) {
    return state.editData;
  }
};
const mutations = {
  [SET_COLLEGE_SCHEMA_DATA](state, schemaData) {
    state.editData = schemaData;
  },
  [GET_COLLEGE_INFO_DATA](state, result) {
    state.schema = result;
  },
  [SET_COLLEGE_TYPE](state, result) {
    state.collegeType = result;
  },
  [SET_MGT_TYPE](state, result) {
    state.management = result;
  }
};

const actions = {
  fetchCollegeList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(CollegeInfoList, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_COLLEGE_INFO_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          //console.log(error);
          reject();
        });
    });
  },

  //=============================== setting data fetch ===============================================
  // college types
  fetchCollegeType({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(CollegeType)
        .then(function(response) {
          let result = response.data.data;
          commit("SET_COLLEGE_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  // college management
  fetchMgtType({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(CollegeMgtType)
        .then(function(response) {
          let result = response.data.data;
          commit("SET_MGT_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  // add new college

  submitCollege({ commit, state }, schema) {
    const formData = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(CollegeInfoList, formData)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  // update college info
  updateCollegeProfile(state, data) {
    Axios.post(CollegeProfileUpdate, data);
  },

  //update college item
  updateCollege({ commit, state }, schema) {
    const formData = schema;
    const url = `${CollegeInfoList}/${formData.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, formData)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
