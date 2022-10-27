/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_PRACTICAL_WANT_DATA,
  // center
  SET_OVERALL_WANT_DATA_BY_CENTER,
  UNSET_OVERALL_WANT_DATA_BY_CENTER,
  SET_OVERALL_WANT_DATA_BY_CENTER_CURRENT,
  // college
  SET_OVERALL_WANT_DATA_BY_COLLEGE,
  UNSET_OVERALL_WANT_DATA_BY_COLLEGE,
  SET_PRACTICAL_WANT_DATA_BY_COLLEGE_CURRENT,
  //
  SET_OVERALL_WANT_DATA_BY_PAPER,
  UNSET_OVERALL_WANT_DATA_BY_PAPER,
  SET_OVERALL_WANT_DATA_BY_PAPER_CURRENT,
  // std
  SET_PRACTICAL_WANT_DATA_BY_STD,
  UNSET_PRACTICAL_WANT_DATA_BY_STD,
  SET_PRACTICAL_WANT_DATA_BY_STD_CURRENT,
  SET_OVERALL_WANT_DATA_BY_SUBJECT,
  UNSET_OVERALL_WANT_DATA_BY_SUBJECT,
  SET_OVERALL_WANT_DATA_BY_SUBJECT_CURRENT,
  SET_OVERALL_WANT_DATA_BY_STD_CURRENT
} from "../../mutation-types";

import {
  practicalWanting_FetchUrl,
  overallWanting_ByCenter,
  overallWanting_ByCollege,
  overallWanting_ByPaper,
  practicalWanting_ByStd,
  overallWanting_BySubject
} from "../../api";

const state = {
  practicalwantlist: [],
  overallwantlistByCenter: [],
  overallwantlistByCenter_Current: {},
  overallwantlistByCollege: [],
  practicalwantlistByCollege_Current: {},
  overallWantlistByPaper: [],
  overallWantlistByPaper_Current: {},
  practicalwantlistByStd: [],
  practicalwantlistByStd_Current: {},
  overallwantlistBySubject: [],
  overallwantlistBySubject_Current: {},
  overallwantlistByStd_Current: {}
};

const getters = {
  // get  Practical wantdate lsit
  // getPracticalWantList(state) {
  //   return state.practicalwantlist;
  // },

  getOverallWantListByCenter(state) {
    return state.overallwantlistByCenter;
  },
  getOverallwantlistByCenter_Current(state) {
    return state.overallwantlistByCenter_Current;
  },
  getOverallWantListByCollege(state) {
    return state.overallwantlistByCollege;
  },
  // getPracticalWantListByCollege_current(state) {
  //   return state.practicalwantlistByCollege_Current;
  // },
  getOverallWantListByPaper(state) {
    return state.overallWantlistByPaper;
  },
  getOverallWantListByPaper_current(state) {
    return state.overallWantlistByPaper_Current;
  },
  // getPracticalWantListByStd(state) {
  //   return state.practicalwantlistByStd;
  // },
  getOverallWantListByStd_current(state) {
    return state.overallwantlistByStd_Current;
  },
  getOverallwantlistBySubject_Current(state) {
    return state.overallwantlistBySubject_Current;
  },
  getOverallWantListBySubject(state) {
    return state.overallwantlistBySubject;
  },

};
const mutations = {
  //set Practical examinee data
  [SET_PRACTICAL_WANT_DATA](state, result) {
    state.practicalwantlist = result;
  },
  // by center
  [SET_OVERALL_WANT_DATA_BY_CENTER](state, result) {
    state.overallwantlistByCenter = result;
  },
  [UNSET_OVERALL_WANT_DATA_BY_CENTER](state) {
    state.overallwantlistByCenter = [];
  },
  [SET_OVERALL_WANT_DATA_BY_CENTER_CURRENT](state, current) {
    state.overallwantlistByCenter_Current = current;
  },
  // by college
  [SET_OVERALL_WANT_DATA_BY_COLLEGE](state, result) {
    state.overallwantlistByCollege = result;
  },
  [UNSET_OVERALL_WANT_DATA_BY_COLLEGE](state) {
    state.overallwantlistByCollege = [];
  },
  [SET_PRACTICAL_WANT_DATA_BY_COLLEGE_CURRENT](state, current) {
    state.practicalwantlistByCollege_Current = current;
  },
  // by paper
  [SET_OVERALL_WANT_DATA_BY_PAPER](state, result) {
    state.overallWantlistByPaper = result;
  },
  [UNSET_OVERALL_WANT_DATA_BY_PAPER](state) {
    state.overallWantlistByPaper = [];
  },
  [SET_OVERALL_WANT_DATA_BY_PAPER_CURRENT](state, current) {
    state.overallWantlistByPaper_Current = current;
  },
  // // by std
  // [SET_PRACTICAL_WANT_DATA_BY_STD](state, result) {
  //   state.practicalwantlistByStd = result;
  // },
  // [UNSET_PRACTICAL_WANT_DATA_BY_STD](state) {
  //   state.practicalwantlistByStd = [];
  // },
  [SET_OVERALL_WANT_DATA_BY_STD_CURRENT](state, current) {
    state.overallwantlistByStd_Current = current;
  },
  [SET_OVERALL_WANT_DATA_BY_SUBJECT](state, result) {
    state.overallwantlistBySubject = result;
  },
  [UNSET_OVERALL_WANT_DATA_BY_SUBJECT](state, current) {
    state.overallwantlistBySubject = [];
  },
  [SET_OVERALL_WANT_DATA_BY_SUBJECT_CURRENT](state, current) {
    state.overallwantlistBySubject_Current = current;
  },

};
const actions = {
  searchPracticalWantData({
    commit
  }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(practicalWanting_FetchUrl, {
          params: searchParam,
        })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_WANT_DATA", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchOverallWantDataByCenter({
    commit
  }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(overallWanting_ByCenter, {
          params: searchParam,
        })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_OVERALL_WANT_DATA_BY_CENTER", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchOverallWantDataByCollege({
    commit
  }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(overallWanting_ByCollege, {
          params: searchParam,
        })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_OVERALL_WANT_DATA_BY_COLLEGE", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchOverallWantDataBySubject({
    commit
  }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(overallWanting_BySubject, {
          params: searchParam,
        })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_OVERALL_WANT_DATA_BY_SUBJECT", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchOverallWantDataByPaper({
    commit
  }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(overallWanting_ByPaper, {
          params: searchParam,
        })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_OVERALL_WANT_DATA_BY_PAPER", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // searchPracticalWantDataByStd({
  //   commit
  // }, searchParam) {
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary",
  //     });
  //     Axios.get(practicalWanting_ByStd, {
  //         params: searchParam,
  //       })
  //       .then(function (response) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         commit("SET_PRACTICAL_WANT_DATA_BY_STD", result);
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};