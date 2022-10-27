import Axios from "axios";
import {
  EXAMINATION_MASTER,
  EXAMINATION_MASTER_DETAILS,
  GET_PROBABLE_SLOT_LIST,
  UNSET_PROBABLE_SLOT_LIST
} from "../../mutation-types";
import {
  GenerateProbableData,
  generateProbableCriteriaUrl,
  generateProbableCriteriaListUrl,
  executeProbableSlotQueueUrl
} from "../../api";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],
  examDetails: [],
  probable_slot_list: []
};

const getters = {
  getAllExamMaster(state) {
    return state.schema;
  },
  getAllExamMasterDetails(state) {
    return state.examDetails;
  },
  generateProbableCriteriaList(state) {
    return state.probable_slot_list;
  }
};

const mutations = {
  //get data from api
  [EXAMINATION_MASTER](state, result) {
    state.schema = result;
  },
  [EXAMINATION_MASTER_DETAILS](state, result) {
    state.examDetails = result;
  },
  [GET_PROBABLE_SLOT_LIST](state, result) {
    state.probable_slot_list = result;
  },
  [UNSET_PROBABLE_SLOT_LIST](state) {
    state.probable_slot_list = [];
  }
};

const actions = {
  fetchAllExamsnData({ commit }, searchParam) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GenerateProbableData, { params: searchParam })
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("EXAMINATION_MASTER", result);
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  
  // generateProbableCriteria({ commit }, schema) {
  //   const data = schema;
  //   return new Promise(function (resolve) {
  //     commit("SET_LOADING", { color: "primary" }); // loading Opening
  //     Axios.post(generateProbableCriteriaUrl, data).then(function (response) {
  //       commit("UNSET_LOADING"); // loading Closing
  //       console.log("create probable slot:", response);
  //       if (response.data.status === "success") {
  //         commit("SET_SNACKBAR", {
  //           msg: response.data.message,
  //           color: "green"
  //         });
  //         resolve();
  //       } else {
  //         commit("SET_SNACKBAR", {
  //           msg: failedMsg,
  //           color: "red"
  //         });
  //         resolve();
  //       }
  //     });
  //     // .catch(function(error) {
  //     //   // handle error
  //     //   commit("UNSET_LOADING"); // loading Closing
  //     //   commit("SET_SNACKBAR", {
  //     //     msg: failedMsg,
  //     //     color: "red"
  //     //   });
  //     //   reject();
  //     // });
  //   });
  // },
  
  generateProbableCriteriaList({ commit }, params) {
    return new Promise(function (resolve, reject) {
      // commit("SET_LOADING", { color: "primary" });
      Axios.get(generateProbableCriteriaListUrl, { params: params })
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_PROBABLE_SLOT_LIST", result);
          resolve(response);
        })
        .catch(function (error) {
          commit("UNSET_PROBABLE_SLOT_LIST");
          console.log(error);
          reject(error);
        });
    });
  },
  executeProbableSlotQueue({ commit }, params) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(executeProbableSlotQueueUrl, { params: params })
        .then(function (response) {
          commit("UNSET_LOADING");
          // let result = response.data.data;
          resolve(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject(error);
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
