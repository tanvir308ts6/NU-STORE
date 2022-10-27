import Axios from "axios";

import {
  AS_NU_RC_EXAMINER, // get
  AS_NU_TO_RC, // post
  AS_RC_TO_NU_RECIEVE, // post
  AS_RC_TO_EXAMINER, // post
  ExmainerAnsScriptAllotmentSave,
  ansScriptDeliveryNuToRegSummary,
  ansScriptDeliveryNuToRegSummaryPDF,
  addNewChallanApi,
} from "@/store/api";

import {
  SET_AS_NU_RC_EXAMINER_DATA,
  UNSET_AS_NU_RC_EXAMINER_DATA,
  SET_AS_NU_RC_EXAMINER_DATA_SUMMARY,
  SET_AS_NU_RC_CHALLAN_DETAILS,
  UNSET_AS_NU_RC_CHALLAN_DETAILS,
  SET_ANS_EXAMINER_LIST,
} from "@/store/mutation-types";

const state = {
  ansScriptNuToRcToExaminerData: [],
  ansScriptNuToRcToExaminerSummaryData: [],
  ansScriptNuToRcChallanDetails: [],
  ansExaminerList: [],
};

const getters = {
  getAsNuToRcToExaminerData(state) {
    return state.ansScriptNuToRcToExaminerData;
  },
  getAsNuToRcToExaminerSummaryData(state) {
    return state.ansScriptNuToRcToExaminerSummaryData;
  },
  getAnsScriptNuToRcChallanDetails(state) {
    return state.ansScriptNuToRcChallanDetails;
  },
  getAnsExaminerList(state) {
    return state.ansExaminerList;
  },
};

const mutations = {
  [SET_AS_NU_RC_EXAMINER_DATA](state, result) {
    state.ansScriptNuToRcToExaminerData = result;
  },
  [UNSET_AS_NU_RC_EXAMINER_DATA](state) {
    state.ansScriptNuToRcToExaminerData = [];
  },

  [SET_AS_NU_RC_EXAMINER_DATA_SUMMARY](state, result) {
    state.ansScriptNuToRcToExaminerSummaryData = result;
  },
  [SET_AS_NU_RC_CHALLAN_DETAILS](state, result) {
    state.ansScriptNuToRcChallanDetails = result;
  },
  [UNSET_AS_NU_RC_CHALLAN_DETAILS](state) {
    state.ansScriptNuToRcChallanDetails = [];
  },
  [SET_ANS_EXAMINER_LIST](state, result) {
    state.ansExaminerList = result;
  },
};

const actions = {
  //  get

  fetchAsNuToRcToExaminerData({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(AS_NU_RC_EXAMINER, {
        params: payLoad,
      })
        .then(function(response) {
          // console.log("--sp--", response.data);
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;

          // delete this section
          // let arr = [];
          // let i = 0;
          // while (i < 20) {
          //   arr.push(result[i]);
          //   i++;
          // }
          // result = arr;
          // delete this section

          commit("SET_AS_NU_RC_EXAMINER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchAsNuToRcToExaminerDataList({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(AS_NU_RC_EXAMINER, {
        params: payLoad,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ANS_EXAMINER_LIST", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchAsNuToRcToExaminerDataSummaryData({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(ansScriptDeliveryNuToRegSummary, {
        params: payLoad,
      })
        .then(function(response) {
          // console.log("--sp--", response.data);
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data.data;
          commit("SET_AS_NU_RC_EXAMINER_DATA_SUMMARY", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchAsNuToRcChallanDetails({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(AS_NU_RC_EXAMINER, {
        params: payLoad,
      })
        .then(function(response) {
          // console.log("--sp--", response.data);
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;

          commit("SET_AS_NU_RC_CHALLAN_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  //  post

  // add-challan-number
  addNewChallan({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(addNewChallanApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: "Challan Created Successfully",
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
          commit("SET_SNACKBAR", {
            msg: "Failed to created challan.",
            color: "green",
            timeout: 10000,
          });
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  // fetchAsNuToRcToExaminerData - ExmainerAnsScriptAllotmentSave

  postExmainerAnsScriptAllotment({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(ExmainerAnsScriptAllotmentSave, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  postAnsScriptNuToRc({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_NU_TO_RC, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
              timeout: 10000,
            });
            resolve(response);
          }
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  postAnsScriptRcToNuRecieve({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_RC_TO_NU_RECIEVE, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  postAnsScriptRcToExaminer({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_RC_TO_EXAMINER, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  //
  downloadAnsScriptDeliveryNuToRegSummaryPDF({ commit }, item) {
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: ansScriptDeliveryNuToRegSummaryPDF,
        method: "GET",
        params: item,
      })
        .then((response) => {
          console.log("response:", response.data.status);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(url);

          if (response.data.status === "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
          } else {
            // showing on a new tab
            var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
            fileLink.href = url; // assigning url to that
            fileLink.download = "allotmentReport_" + Date.now() + ".pdf"; // giving it a name
            fileLink.target = "_blank"; // ensuring that it goes to the new tab
            //After all that is done
            document.body.appendChild(fileLink); // attaching the <a> tag to the document body
            fileLink.click(); // finally clicking it  .
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
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
