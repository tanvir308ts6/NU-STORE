import Axios from "axios";

import { GET_REG_CORRECTION_DATA } from "../../mutation-types";
import { RegCardCorrection, ExportRegCardCor } from "../../api";
import { saveMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  correctionList: []
};

const getters = {
  getRegCorrectionData(state) {
    return state.correctionList;
  }
};

const mutations = {
  //get data from api
  [GET_REG_CORRECTION_DATA](state, result) {
    state.correctionList = result;
  }
};

const actions = {
  fetchRegCorrectionList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(RegCardCorrection, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_REG_CORRECTION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  studentRegCorrection({ commit }, schema) {
    const confirmData = schema;

    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(RegCardCorrection, confirmData)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
              color: "green"
            });
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  exportCorrectionRgCard({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: ExportRegCardCor,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "reg_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          console.log(error);
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
