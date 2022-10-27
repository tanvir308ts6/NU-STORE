import {
  fetchCollageUserStudentUrl,
  fetchCollageUserConfirmDataUrl,
  getProbableDataUrl,
  ProbableDataDownloadPdf,
  getCuAdmitCard
} from "../../api";
import {
  college_user_token,
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg
} from "../../erpUtil";
import {
  GET_MASTER_EXAM,
  GET_MASTER_EXAM_CONFIRM_DATA,
  GET_PROBABLE_DATA,
  UNSET_PROBABLE_DATA,
  GET_CU_ADMIT_CARD,
  UNSET_CU_ADMIT_CARD
} from "../../mutation-types";
import Axios from "axios";

const state = {
  probable_list: {},
  confirm_data: {},
  get_probable_data: [],
  cuAdmitCard: []
};
const getters = {
  getMasterExam(state) {
    return state.probable_list;
  },
  getMasterExamConfirmData(state) {
    return state.confirm_data;
  },
  getProbableData(state) {
    return state.get_probable_data;
  },
  getCuAdmitCard(state) {
    return state.get_probable_data;
  }
};
const mutations = {
  [GET_MASTER_EXAM](state, data) {
    state.probable_list = data;
  },
  [GET_MASTER_EXAM_CONFIRM_DATA](state, data) {
    state.confirm_data = data;
  },
  [GET_PROBABLE_DATA](state, data) {
    state.get_probable_data = data;
  },
  [UNSET_PROBABLE_DATA](state) {
    state.get_probable_data = [];
  },
  [GET_CU_ADMIT_CARD](state, data) {
    state.cuAdmitCard = data;
  },
  [UNSET_CU_ADMIT_CARD](state) {
    state.cuAdmitCard = [];
  }
};
const actions = {
  fetchCollageUserStudent({ commit, state }, limit) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = fetchCollageUserStudentUrl;
    let token = `Bearer ${localStorage.getItem(college_user_token)}`;
    var params = new URLSearchParams();
    params = Object.assign({}, limit);
    return new Promise((resolve, reject) => {
      Axios.get(url, {
        params: params,
        headers: { token_name: college_user_token, Authorization: token }
      })
        .then(res => {
          commit("GET_MASTER_EXAM", res.data.data);
          resolve();
        })
        .catch(error => {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  fetchCollageUserConfirmData({ commit, state }, limit) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = fetchCollageUserConfirmDataUrl;
    let token = `Bearer ${localStorage.getItem(college_user_token)}`;
    var params = new URLSearchParams();
    params = Object.assign({}, limit);
    return new Promise((resolve, reject) => {
      Axios.get(url, {
        params: params,
        headers: { token_name: college_user_token, Authorization: token }
      })
        .then(res => {
          commit("GET_MASTER_EXAM_CONFIRM_DATA", res.data.data);
          resolve();
        })
        .catch(error => {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },

  getProbableData({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = `${getProbableDataUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          commit("GET_PROBABLE_DATA", response.data.data);
          resolve();
        })
        .catch(error => {
          commit("UNSET_PROBABLE_DATA");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  ProbableDataDownloadPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = `${ProbableDataDownloadPdf}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data).then(response => {
        // console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      commit("UNSET_LOADING");
    });
  },
  getCuAdmitCard({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = `${getCuAdmitCard}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          commit("GET_PROBABLE_DATA", response.data.data);
          resolve();
        })
        .catch(error => {
          commit("UNSET_PROBABLE_DATA");
          reject();
        })
        .then(always => {
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
