// axios
import Axios from "axios";

// apis
import {
  QuesEntry_FetchUrl,
  QuesStmBySub,
  QueDistDataURL_GET,
  QueDistDataURL_POST,
  SaveSendQueDistDataURL
} from "../../api";

// mutation types
import {
  SET_QUES_BY_SUB,
  UNSET_QUES_BY_SUB,
  SET_QUES_DIST_CENTER_BY_PAPER,
  UNSET_QUES_DIST_CENTER_BY_PAPER
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    college_code: "",
    subject_code: "",
    paper_code: "",
    center_code: "",
    qty: "",
    size: "",
    exam_code: "",
    session: "",
    exam_year: "",
    status: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },

  datalist: [],
  queDistData: []
};

// getters
const getters = {
  // get data lsit
  getQuesDataListBySub(state) {
    return state.datalist;
  },

  getQuesDistData(state) {
    return state.queDistData;
  }
};

// mutations
const mutations = {
  [UNSET_QUES_BY_SUB](state, data) {
    state.datalist = [];
  },
  [SET_QUES_BY_SUB](state, data) {
    state.datalist = data;
  },
  [SET_QUES_DIST_CENTER_BY_PAPER](state, data) {
    state.queDistData = data;
  },
  [UNSET_QUES_DIST_CENTER_BY_PAPER](state, data) {
    state.queDistData = [];
  }
};

const actions = {
  searchQuesDistribution({ commit }, searchParam) {
    // console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(QuesStmBySub, {
        params: searchParam
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = [];
          // result.subject_code = searchParam.subject_code;
          // result.paper_code = searchParam.paper_code;
          // result.data = response.data.data;
          //   console.log(response.data.data);
          searchParam.paper_code.forEach((element, i) => {
            let filteredPaper = {};
            filteredPaper.sl = i + 1;
            filteredPaper.paper_code = searchParam.paper_code[i];
            filteredPaper.data = response.data.data.filter(function(obj) {
              return obj.paper_code == searchParam.paper_code[i];
            });
            result.push(filteredPaper);
          });
          // var paper0 = result.data.filter(function(obj) {
          //   return obj.paper_code == searchParam.paper_code[0];
          // });

          commit("SET_QUES_BY_SUB", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  fetchQuestionDistributionPaperWiseCenterData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(QueDistDataURL_GET, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          var result = response.data.data;
          console.log("response.data.data :::;", response.data.data);

          result.forEach(el => {
            el.statements.forEach(ob => {
              if (ob.total_packet == 0) {
                ob.total_packet = Math.ceil(
                  parseInt(ob.allotted_questions) / parseInt(ob.packet_size)
                );
                console.log(ob.total_packet);
              }
            });
          });

          commit("SET_QUES_DIST_CENTER_BY_PAPER", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  postQuestionDistributionData({ commit }, payLoad) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening

      Axios.post(QueDistDataURL_POST, payLoad)
        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data.data;
          // // console.log("--quesStm<POST>-->", response.data.message);
          // commit("SET_QUES_STATEMENT_DATA", result);
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green"
          });
          resolve();
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // // console.log("--quesStm-->", error);
          reject();
        });
    });
  },

  saveQuesDistributionCenterWise({ commit }, payLoad) {
    console.log("payLoad:", payLoad);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      // loading  Opening
      Axios.post(SaveSendQueDistDataURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green"
          });
          resolve();
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // // console.log("--quesStm-->", error);
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
