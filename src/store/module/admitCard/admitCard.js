import Axios from "axios";

import {
  SET_ADMIT_CARD_DATA_BY_CENTER,
  SET_ADMIT_CARD_DATA_BY_COLLEGE,
  SET_ADMIT_CARD_DATA_BY_SUBJECT,
  UNSET_ADMIT_CARD_DATA_BY_SUBJECT,
  SET_ADMIT_CARD_DATA_BY_PAPER,
  SET_ADMIT_CARD_SUMMARY_DATA
} from "../../mutation-types";

import {
  AdmitCardUrl_ByCenter,
  AdmitCardUrl_ByCollege,
  AdmitCardUrl_BySubject,
  AdmitCardUrl_ByPaper,
  AdmitCardPublish_Url,
  AdmitCardSummary_Url,
  AdmitCardSummaryDelete_Url
} from "../../api";

const state = {
  admitCardDataByCenter: [],
  admitCardDataByCollege: [],
  admitCardDataBySubject: [],
  admitCardDataByPaper: [],
  admitCardSummaryData: {}
};
const getters = {
  getAdmitCardDataByCenter(state) {
    return state.admitCardDataByCenter;
  },
  getAdmitCardDataByCollege(state) {
    return state.admitCardDataByCollege;
  },
  getAdmitCardDataBySubject(state) {
    return state.admitCardDataBySubject;
  },
  getAdmitCardDataByPaper(state) {
    return state.admitCardDataByPaper;
  },
  getAdmitCardSummaryData(state) {
    return state.admitCardSummaryData;
  }
};
// mutations
const mutations = {
  [SET_ADMIT_CARD_DATA_BY_CENTER](state, response) {
    state.admitCardDataByCenter = response;
  },
  [SET_ADMIT_CARD_DATA_BY_COLLEGE](state, response) {
    state.admitCardDataByCollege = response;
  },
  [SET_ADMIT_CARD_DATA_BY_SUBJECT](state, response) {
    state.admitCardDataBySubject = response;
  },
  [UNSET_ADMIT_CARD_DATA_BY_SUBJECT](state) {
    state.admitCardDataBySubject = [];
  },
  [SET_ADMIT_CARD_DATA_BY_PAPER](state, response) {
    state.admitCardDataByPaper = response;
  },
  [SET_ADMIT_CARD_SUMMARY_DATA](state, response) {
    state.admitCardSummaryData = response;
  }
};
// Actions
const actions = {
  fetchAdmitCardDataByCenter({ commit }, searchParam) {
    console.log("fetchAdmitCardDataByCenter spsppssp::::", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(AdmitCardUrl_ByCenter, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("AdmitCardUrl_ByCenter -->", response.data.data);
          console.log("1");
          commit("SET_ADMIT_CARD_DATA_BY_CENTER", result);
          console.log("2");
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  fetchAdmitCardDataByCollege({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(AdmitCardUrl_ByCollege, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("AdmitCardUrl_ByCollege", response.data.data);
          commit("SET_ADMIT_CARD_DATA_BY_COLLEGE", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  fetchAdmitCardDataBySubject({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(AdmitCardUrl_BySubject, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("AdmitCardUrl_BySubject", response.data.data);
          commit("SET_ADMIT_CARD_DATA_BY_SUBJECT", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  fetchAdmitCardDataByPaper({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(AdmitCardUrl_ByPaper, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("AdmitCardUrl_ByPaper", response.data.data);
          commit("SET_ADMIT_CARD_DATA_BY_PAPER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  fetchAdmitCardSummary({ commit }, searchParam) {
    console.log("searchParam", searchParam);
    return new Promise((resolve, reject) => {
      // let url = `${AdmitCardPublish_Url}?exam_initiate_id=${searchParam.exam_initiate_id}`;
      // admit-card-generated-ungenerated
      // 1;
      // commit("SET_LOADING", {
      //   color: "primary",
      // });
      // loading  Opening
      Axios.get(AdmitCardSummary_Url, {
        params: searchParam
      })
        .then(function(response) {
          // commit("UNSET_LOADING");
          // loading Closing
          console.log(response);
          // var result = response.data.data;
          // console.log("AdmitCardSummary_Url", response.data.data);
          commit("SET_ADMIT_CARD_SUMMARY_DATA", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  admitSummaryDataDelete({ commit }, param) {
    commit("SET_LOADING", {
      color: "primary"
    });
    console.log("searchParam sp sp", param);
    return new Promise((resolve, reject) => {
      Axios.post(AdmitCardSummaryDelete_Url, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
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
