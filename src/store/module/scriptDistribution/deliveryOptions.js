import Axios from "axios";

import {
  SET_DELIVERYOPTIONS_DATA,
  SET_DELIVERYOPTIONS_DATA_EW,
} from "../../mutation-types";

// result-process-step

import { deliveryOptionsUrl, deliveryOptionsExamWiseUrl } from "../../api";

const state = {
  deliveryOptionsData: [],
  deliveryOptionsDataEW: [],
};

const getters = {
  getDeliveryOptionsData(state) {
    return state.deliveryOptionsData;
  },
  getDeliveryOptionsDataEW(state) {
    return state.deliveryOptionsDataEW;
  },
};
const mutations = {
  [SET_DELIVERYOPTIONS_DATA](state, result) {
    state.deliveryOptionsData = result;
  },
  [SET_DELIVERYOPTIONS_DATA_EW](state, result) {
    state.deliveryOptionsDataEW = result;
  },
};
const actions = {
  //all data
  fetchDeliveryOptionsData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });

      // loading Opening
      Axios.get(deliveryOptionsUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("fetchExamActivitiesData-->", response);
          commit("SET_DELIVERYOPTIONS_DATA", result);
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
  addDeliveryOptionsData({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(deliveryOptionsUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

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

          reject();
        });
    });
  },
  editDeliveryOptionsData({ commit }, data) {
    const url = `${deliveryOptionsUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // data.status = parseInt(data.status);
      // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          resolve(response);
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
  deleteDeliveryOptionsData({ commit }, data) {
    console.log("data:", data);
    const url = `${deliveryOptionsUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.delete(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
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

  fetchDeliveryOptionsDataEW({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });

      // loading Opening
      Axios.get(deliveryOptionsExamWiseUrl)
        .then(function(response) {
          // console.log("response:", response);
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log("fetchExamActivitiesData-->", response);
          commit("SET_DELIVERYOPTIONS_DATA_EW", result);
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
  addDeliveryOptionsDataEW({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.post(deliveryOptionsExamWiseUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

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

          reject();
        });
    });
  },
  editDeliveryOptionsDataEW({ commit }, data) {
    const url = `${deliveryOptionsExamWiseUrl}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          resolve(response);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
