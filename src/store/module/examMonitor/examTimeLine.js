/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_EXAM_TIMELINE_DATA,
  SET_RESULT_TIMELINE_DATA,
} from "../../mutation-types";
// // utilities
// import { saveMsg, updateMsg, failedMsg } from '../../erpUtil';
import {
  ExamTimeLineUrl,
  ResultTimeLineUrl,
  ExamTimeLinePostUrl,
} from "../../api";

const state = {
  schema: {
    id: 1,
    title: "",
    body: "",
    status: 0,
  },
  timelineData: [],
  resultTimelineData: [],
};

const getters = {
  getTimeLineData(state) {
    return state.timelineData;
  },
  getResultTimeLineData(state) {
    return state.resultTimelineData;
  },
};
const mutations = {
  [SET_EXAM_TIMELINE_DATA](state, result) {
    state.timelineData = result;
  },
  [SET_RESULT_TIMELINE_DATA](state, result) {
    state.resultTimelineData = result;
  },
};
const actions = {
  //all data
  fetchExamTimeLineData({ commit }, param) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });

      // loading Opening
      Axios.get(ExamTimeLineUrl, {
        params: param,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("timeline-activities-->", result);
          commit("SET_EXAM_TIMELINE_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          resolve();
          //   reject();
        });
    });
  },

  fetchResultTimeLineData({ commit }, param) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(ResultTimeLineUrl, {
        params: param,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data.data;
          // console.log("timeline-activities-->", result);
          commit("SET_RESULT_TIMELINE_DATA", response.data);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },

  updateExamTimeLineData({ commit }, data) {
    console.log();
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(ExamTimeLinePostUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("-->Zahid", response);
          var result = response.data.data;
          console.log("timeline-activities-->", result);
          commit("SET_EXAM_TIMELINE_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          console.log("-->", error);
          commit("UNSET_LOADING"); // loading Closing
          resolve();
          //   reject();
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
