/* eslint-disable prettier/prettier */
import Axios from "axios";

import { SET_REGIONAL_CENTER_MAP_DATA } from "@/store/mutation-types";

import { RegionalCenterMapApi } from "@/store/api";
import { failedMsg } from "@/store/erpUtil";

//state
const state = {
  schema: {
    id: "",
    exam_code: "",
    exam_initiate_id: "",
    year: "",
    regional_centers: [
      {
        regional_center_code: "",
        centers: []
      }
    ]
  },
  datalist: []
};
// geters
const getters = {
  getregionalCenterMap(state) {
    return state.schema;
  }
};
// mutations
const mutations = {
  [SET_REGIONAL_CENTER_MAP_DATA](state, result) {
    state.schema = result;
  }
};
// Actions
const actions = {
  fetchRegionalCenterMap({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(RegionalCenterMapApi, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          commit("SET_REGIONAL_CENTER_MAP_DATA", result);
          console.log("result in action ::", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  submitRegionalCenterMap({ commit }, item) {
    console.log("am i in submitRegionalCenterMap", JSON.stringify(item));

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(RegionalCenterMapApi, item)
        .then(function(response) {
          //console.log(response)
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            console.log("in submitRegionalCenterMap if");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data);
          } else {
            console.log("in submitRegionalCenterMap else");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          console.log("in submitRegionalCenterMap error");
          commit("SET_SNACKBAR", {
            msg: "Email Not Send, Please recheck",
            color: "pink"
          });
          reject();
        });
    });
  },
  editRegionalCentertMap({ commit }, schema) {
    console.log("action before", schema);
    let data = schema.item;
    const updateurl = `${RegionalCenterMapApi}/${data.id}`;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      console.log("action after", data);
      Axios.put(updateurl, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
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
