/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_PRACTICAL_WANT_DATA,
  // center
  SET_PRACTICAL_WANT_DATA_BY_CENTER,
  UNSET_PRACTICAL_WANT_DATA_BY_CENTER,
  SET_PRACTICAL_WANT_DATA_BY_CENTER_CURRENT,
  // college
  SET_PRACTICAL_WANT_DATA_BY_COLLEGE,
  UNSET_PRACTICAL_WANT_DATA_BY_COLLEGE,
  SET_PRACTICAL_WANT_DATA_BY_COLLEGE_CURRENT,
  //
  SET_PRACTICAL_WANT_DATA_BY_PAPER,
  UNSET_PRACTICAL_WANT_DATA_BY_PAPER,
  SET_PRACTICAL_WANT_DATA_BY_PAPER_CURRENT,
  // std
  SET_PRACTICAL_WANT_DATA_BY_STD,
  UNSET_PRACTICAL_WANT_DATA_BY_STD,
  SET_PRACTICAL_WANT_DATA_BY_STD_CURRENT,
  SET_PRACTICAL_WANT_DATA_BY_SUBJECT,
  UNSET_PRACTICAL_WANT_DATA_BY_SUBJECT,
  SET_PRACTICAL_WANT_DATA_BY_SUBJECT_CURRENT
} from "../../mutation-types";

import {
  practicalWanting_FetchUrl,
  practicalWanting_ByCenter,
  practicalWanting_ByCollege,
  practicalWanting_ByPaper,
  practicalWanting_ByStd,
  practicalWanting_BySubject
} from "../../api";

const state = {
  practicalwantlist: [],
  practicalwantlistByCenter: [],
  practicalwantlistByCenter_Current: {},
  practicalwantlistByCollege: [],
  practicalwantlistByCollege_Current: {},
  practicalwantlistByPaper: [],
  practicalwantlistByPaper_Current: {},
  practicalwantlistByStd: [],
  practicalwantlistByStd_Current: {},
  practicalwantlistBySubject:[],
  practicalwantlistBySubject_Current:{}
};

const getters = {
  // get  Practical wantdate lsit
  getPracticalWantList(state) {
    return state.practicalwantlist;
  },

  getPracticalWantListByCenter(state) {
    return state.practicalwantlistByCenter;
  },
  getPracticalWantListByCenter_current(state) {
    return state.practicalwantlistByCenter_Current;
  },
  getPracticalWantListByCollege(state) {
    return state.practicalwantlistByCollege;
  },
  getPracticalWantListByCollege_current(state) {
    return state.practicalwantlistByCollege_Current;
  },
  getPracticalWantListByPaper(state) {
    return state.practicalwantlistByPaper;
  },
  getPracticalWantListByPaper_current(state) {
    return state.practicalwantlistByPaper_Current;
  },
  getPracticalWantListByStd(state) {
    return state.practicalwantlistByStd;
  },
  getPracticalWantListByStd_current(state) {
    return state.practicalwantlistByStd_Current;
  },
  getPracticalWantListBySubject_current(state) {
    return state.practicalwantlistBySubject_Current;
  },
  getPracticalWantListBySubject(state) {
    return state.practicalwantlistBySubject;
  },
  
};
const mutations = {
  //set Practical examinee data
  [SET_PRACTICAL_WANT_DATA](state, result) {
    state.practicalwantlist = result;
  },
  // by center
  [SET_PRACTICAL_WANT_DATA_BY_CENTER](state, result) {
    state.practicalwantlistByCenter = result;
  },
  [UNSET_PRACTICAL_WANT_DATA_BY_CENTER](state) {
    state.practicalwantlistByCenter = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_CENTER_CURRENT](state, current) {
    state.practicalwantlistByCenter_Current = current;
  },
  // by college
  [SET_PRACTICAL_WANT_DATA_BY_COLLEGE](state, result) {
    state.practicalwantlistByCollege = result;
  },
  [UNSET_PRACTICAL_WANT_DATA_BY_COLLEGE](state) {
    state.practicalwantlistByCollege = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_COLLEGE_CURRENT](state, current) {
    state.practicalwantlistByCollege_Current = current;
  },
  // by paper
  [SET_PRACTICAL_WANT_DATA_BY_PAPER](state, result) {
    state.practicalwantlistByPaper = result;
  },
  [UNSET_PRACTICAL_WANT_DATA_BY_PAPER](state) {
    state.practicalwantlistByPaper = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_PAPER_CURRENT](state, current) {
    state.practicalwantlistByPaper_Current = current;
  },
  // by std
  [SET_PRACTICAL_WANT_DATA_BY_STD](state, result) {
    state.practicalwantlistByStd = result;
  },
  [UNSET_PRACTICAL_WANT_DATA_BY_STD](state) {
    state.practicalwantlistByStd = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_STD_CURRENT](state, current) {
    state.practicalwantlistByStd_Current = current;
  },
    [SET_PRACTICAL_WANT_DATA_BY_SUBJECT](state, result) {
    state.practicalwantlistBySubject = result;
  },
   [UNSET_PRACTICAL_WANT_DATA_BY_SUBJECT](state, current) {
    state.practicalwantlistBySubject = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_SUBJECT_CURRENT](state, current) {
    state.practicalwantlistBySubject_Current = current;
  },
  
};
const actions = {
  searchPracticalWantData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchPracticalWantDataByCenter({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_ByCenter, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA_BY_CENTER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchPracticalWantDataByCollege({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_ByCollege, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA_BY_COLLEGE", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
   searchPracticalWantDataBySubject({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_BySubject, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA_BY_SUBJECT", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchPracticalWantDataByPaper({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_ByPaper, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA_BY_PAPER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchPracticalWantDataByStd({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_ByStd, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA_BY_STD", result);
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
