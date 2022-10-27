import Axios from "axios";

import {
  SET_EXAM_ACTIVITIES_DATA,
  SET_EXAM_RESULT_ACTIVITIES_DATA,
  SET_EXAM_RESULT_ACTIVITIES_SUMMARY_DATA,
} from "../../mutation-types";

// result-process-step
//
import {
  ExamActivitiesUrl,
  ExamResultActivitiesUrl,
  ActivityPublish_Url,
  ExamResultActivitiesStatusChangeUrl,
  ExamResultActivitiesSummaryUrl,
  addExamWiseResultProcessStep,
} from "../../api";

const state = {
  schema: {
    id: 1,
    title: "",
    body: "",
    status: 0,
  },
  activitiesData: [],
  resultActivitiesData: [],
  resultActivitiesSummaryData: [],
};

const getters = {
  getActivitiesData(state) {
    return state.activitiesData;
  },
  getResultActivitiesData(state) {
    return state.resultActivitiesData;
  },
  getResultActivitiesSummaryData(state) {
    return state.resultActivitiesSummaryData;
  },
};
const mutations = {
  [SET_EXAM_ACTIVITIES_DATA](state, result) {
    state.activitiesData = result;
  },
  [SET_EXAM_RESULT_ACTIVITIES_DATA](state, result) {
    state.resultActivitiesData = result;
  },
  [SET_EXAM_RESULT_ACTIVITIES_SUMMARY_DATA](state, result) {
    state.resultActivitiesSummaryData = result;
  },
};
const actions = {
  //all data
  fetchExamActivitiesData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });

      // loading Opening
      Axios.get(ExamActivitiesUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("fetchExamActivitiesData-->", response);
          commit("SET_EXAM_ACTIVITIES_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },
  fetchExamResultActivitiesData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });

      // loading Opening
      Axios.get(ExamResultActivitiesUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log("fetchExamActivitiesData-->", response);
          commit("SET_EXAM_RESULT_ACTIVITIES_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },
  updateExamActivitiesData({ commit }, data) {
    const url = `${ExamActivitiesUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          // loading Closing
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("-->", response);
            var result = response.data.data;
            console.log("updateExamActivitiesData-activities--> put", response);
            commit("SET_EXAM_TIMELINE_DATA", result);
            // console.log("am I in then", response);
            // return state.datalist;
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
          }
          resolve(response.data.status);
        })
        .catch(function(error) {
          console.log("updateExamActivitiesData-activities--> put", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },
  updateExamResultActivitiesData({ commit }, data) {
    const url = `${ExamResultActivitiesUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          // loading Closing
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            // console.log("-->", response);
            var result = response.data.data;
            // console.log("updateExamActivitiesData-activities--> put", response);
            // commit("SET_EXAM_TIMELINE_DATA", result);
            // console.log("am I in then", response);
            // return state.datalist;
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
          }
          resolve(response.data.status);
        })
        .catch(function(error) {
          console.log("updateExamActivitiesData-activities--> put", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },
  deleteExamActivitiesData({ commit }, data) {
    const url = `${ExamActivitiesUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.delete(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("-->", response);
          var result = response.data.data;
          console.log("deleteExamActivitiesData-activities--> ", response);
          // commit("SET_EXAM_TIMELINE_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          console.log("deleteExamActivitiesData-activities--> ", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },
  publishActivity({ commit }, param) {
    console.log("    .. bro bro I came here", param);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening

      Axios.get(ActivityPublish_Url, {
        params: param,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("AdmitCardPublish_Url", response.data.data);

          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  addNewExamActivitiesData({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(ExamActivitiesUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("addNewExamActivitiesData-activities--> post", response);
          var result = response.data.data;

          commit("SET_EXAM_TIMELINE_DATA", result);

          if (response.data.status === "error") {
            console.log("spspsp then");
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          } else {
            console.log("spspsp else");
            resolve();
          }
          console.log(
            "sp spaddNewExamActivitiesData-activities--> post",
            response
          );
          // console.log("am I in then", response);
          // return state.datalist;
        })
        .catch(function(error) {
          console.log("spspsp then in catch");
          commit("SET_FORMNOTIFY", {
            type: "error", // success, info, warning, error
            msg: response.data.message,
          });
          console.log("addNewExamActivitiesData-activities--> post", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          // resolve();
          reject();
        });
    });
  },
  addExamResultActivitiesData({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(ExamResultActivitiesUrl, data)
        .then(function(response) {
          console.log("response:", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log("addNewExamActivitiesData-activities--> post", response);
          var result = response.data.data;

          // commit("SET_EXAM_TIMELINE_DATA", result);

          if (response.data.status === "error") {
            console.log("spspsp then");
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          } else {
            console.log("spspsp else");
            resolve(response);
          }
          console.log(
            "sp spaddNewExamActivitiesData-activities--> post",
            response
          );
          // console.log("am I in then", response);
          // return state.datalist;
        })
        .catch(function(error) {
          console.log("spspsp then in catch");
          commit("SET_FORMNOTIFY", {
            type: "error", // success, info, warning, error
            msg: response.data.message,
          });
          console.log("addNewExamActivitiesData-activities--> post", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          // resolve();
          reject();
        });
    });
  },
  changeStatusExamResultActivities({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(ExamResultActivitiesStatusChangeUrl, data)
        .then(function(response) {
          // console.log("response:", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log("addNewExamActivitiesData-activities--> post", response);
          // var result = response.data.data;

          // commit("SET_EXAM_TIMELINE_DATA", result);

          // if (response.data.status === "error") {
          //   console.log("spspsp then");
          //   commit("SET_FORMNOTIFY", {
          //     type: "error", // success, info, warning, error
          //     msg: response.data.message,
          //   });
          //   reject();
          // } else {
          //   console.log("spspsp else");
          //   resolve(response);
          // }
          // console.log(
          //   "sp spaddNewExamActivitiesData-activities--> post",
          //   response
          // );
          // console.log("am I in then", response);
          // return state.datalist;
          resolve(response);
        })
        .catch(function(error) {
          console.log("spspsp then in catch");
          commit("SET_FORMNOTIFY", {
            type: "error", // success, info, warning, error
            msg: response.data.message,
          });
          console.log("addNewExamActivitiesData-activities--> post", response);
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          // resolve();
          reject();
        });
    });
  },

  fetchExamResultActivitiesSummary({ commit }, param) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(ExamResultActivitiesSummaryUrl, {
        params: param,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log("fetchExamActivitiesData-->", response);
          commit("SET_EXAM_RESULT_ACTIVITIES_SUMMARY_DATA", result);
          // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          resolve();
          //   reject();
        });
    });
  },

  addExamResultActivitiy({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(addExamWiseResultProcessStep, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            // console.log("-->", response);
            var result = response.data.data;
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
          }
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },
  //
};

export default {
  state,
  getters,
  actions,
  mutations,
};
