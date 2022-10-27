/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_VIVA_WANT_DATA,
  // center
  SET_VIVA_WANT_DATA_BY_CENTER,
  UNSET_VIVA_WANT_DATA_BY_CENTER,
  SET_VIVA_WANT_DATA_BY_CENTER_CURRENT,
  // college
  SET_VIVA_WANT_DATA_BY_COLLEGE,
  UNSET_VIVA_WANT_DATA_BY_COLLEGE,
  SET_VIVA_WANT_DATA_BY_COLLEGE_CURRENT,
  //
  SET_VIVA_WANT_DATA_BY_PAPER,
  UNSET_VIVA_WANT_DATA_BY_PAPER,
  SET_VIVA_WANT_DATA_BY_PAPER_CURRENT,
  // std
  SET_VIVA_WANT_DATA_BY_STD,
  UNSET_VIVA_WANT_DATA_BY_STD,
  SET_VIVA_WANT_DATA_BY_STD_CURRENT,
  UNSET_VIVA_WANT_DATA_BY_SUBJECT,
  SET_VIVA_WANT_DATA_BY_SUBJECT_CURRENT,
  SET_VIVA_WANT_DATA_BY_SUBJECT
} from "../../mutation-types";

import {
  vivaWanting_FetchUrl,
  vivaWanting_ByCenter,
  vivaWanting_ByCollege,
  vivaWanting_ByPaper,
  vivaWanting_BySubject,
  vivaWanting_ByStd,
} from "../../api";

const state = {
  vivaWantlist: [],

  vivaWantlistByCenter: [],
  vivaWantlistByCenter_Current: {},
  vivaWantlistByCollege: [],
  vivaWantlistByCollege_Current: {},
  vivaWantlistByPaper: [],
  vivaWantlistByPaper_Current: {},
  vivaWantlistByStd: [],
  vivaWantlistByStd_Current: {},
  vivaWantlistBySubject:[],
  vivaWantlistBySubject_Current:{}
};

const getters = {
  // get  Viva wantdate lsit
  getVivaWantList(state) {
    return state.vivaWantlist;
  },

  getVivaWantListByCenter(state) {
    return state.vivaWantlistByCenter;
  },
  getVivaWantListByCenter_current(state) {
    return state.vivaWantlistByCenter_Current;
  },
  getVivaWantListByCollege(state) {
    return state.vivaWantlistByCollege;
  },
  getVivaWantListByCollege_current(state) {
    return state.vivaWantlistByCollege_Current;
  },
  getVivaWantListByPaper(state) {
    return state.vivaWantlistByPaper;
  },
  getVivaWantListByPaper_current(state) {
    return state.vivaWantlistByPaper_Current;
  },
  getVivaWantListByStd(state) {
    return state.vivaWantlistByStd;
  },
  getVivaWantListByStd_current(state) {
    return state.vivaWantlistByStd_Current;
  },
   getVivaWantListBySubject_current(state) {
    return state.vivaWantlistBySubject_Current;
  },
   getVivaWantListBySubject(state) {
    return state.vivaWantlistBySubject;
  },
  
};
const mutations = {
  //set Practical examinee data
  [SET_VIVA_WANT_DATA](state, result) {
    state.vivaWantlist = result;
  },
  // by center
  [SET_VIVA_WANT_DATA_BY_CENTER](state, result) {
    state.vivaWantlistByCenter = result;
  },
  [UNSET_VIVA_WANT_DATA_BY_CENTER](state) {
    state.vivaWantlistByCenter = [];
  },
  [SET_VIVA_WANT_DATA_BY_CENTER_CURRENT](state, current) {
    state.vivaWantlistByCenter_Current = current;
  },
  // by college
  [SET_VIVA_WANT_DATA_BY_COLLEGE](state, result) {
    state.vivaWantlistByCollege = result;
  },
  [UNSET_VIVA_WANT_DATA_BY_COLLEGE](state) {
    state.vivaWantlistByCollege = [];
  },
  [SET_VIVA_WANT_DATA_BY_COLLEGE_CURRENT](state, current) {
    state.vivaWantlistByCollege_Current = current;
  },
  // by paper
  [SET_VIVA_WANT_DATA_BY_PAPER](state, result) {
    state.vivaWantlistByPaper = result;
  },
  [UNSET_VIVA_WANT_DATA_BY_PAPER](state) {
    state.vivaWantlistByPaper = [];
  },
  [SET_VIVA_WANT_DATA_BY_PAPER_CURRENT](state, current) {
    state.vivaWantlistByPaper_Current = current;
  },
  // by std
  [SET_VIVA_WANT_DATA_BY_STD](state, result) {
    state.vivaWantlistByStd = result;
  },
  [UNSET_VIVA_WANT_DATA_BY_STD](state) {
    state.vivaWantlistByStd = [];
  },
  [SET_VIVA_WANT_DATA_BY_STD_CURRENT](state, current) {
    state.vivaWantlistByStd_Current = current;
  },
  [UNSET_VIVA_WANT_DATA_BY_SUBJECT](state) {
    state.vivaWantlistBySubject = [];
  },
  [SET_VIVA_WANT_DATA_BY_SUBJECT_CURRENT](state, current) {
    state.vivaWantlistBySubject_Current = current;
  },
   [SET_VIVA_WANT_DATA_BY_SUBJECT](state, result) {
    state.vivaWantlistBySubject = result;
  },
  
  
};
const actions = {
  searchVivaWantData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchVivaWantDataByCenter({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_ByCenter, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA_BY_CENTER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchVivaWantDataByCollege({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_ByCollege, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA_BY_COLLEGE", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchVivaWantDataBySubject({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_BySubject, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA_BY_SUBJECT", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchVivaWantDataByPaper({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_ByPaper, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA_BY_PAPER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  
  searchVivaWantDataByStd({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(vivaWanting_ByStd, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_WANT_DATA_BY_STD", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
