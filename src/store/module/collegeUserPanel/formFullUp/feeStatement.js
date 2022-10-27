import Axios from "axios";
import {
  fetchCollageUserFeeStatementUrl,
  clgUserFeeStatementPdfUrl
} from "../../../api";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  sessionExpireMsg
} from "../../../erpUtil";
import {
  SET_FEE_STATEMENT,
  UNSET_FEE_STATEMENT
} from "../../../mutation-types";
const state = {
  fee_statement: []
};
const getters = {
  getFeeStatement(state) {
    return state.fee_statement;
  }
};
const mutations = {
  [SET_FEE_STATEMENT](state, data) {
    return (state.fee_statement = data);
  },
  [UNSET_FEE_STATEMENT](state) {
    return (state.fee_statement = []);
  }
};
const actions = {
  fetchFeeStatement({ commit, state }, data) {
    commit("SET_LOADING", { color: "primary" });
    var params = new URLSearchParams();
    return new Promise((resolve, reject) => {
      Axios.get(fetchCollageUserFeeStatementUrl, data)
        .then(response => {
          commit("SET_FEE_STATEMENT", response.data.data);
          if (response.data.code == 200) {
            // commit("SET_SNACKBAR", { msg: saveMsg, color: "green" });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
              color: "red"
            });
            reject();
          }
        })
        .catch(error => {
          commit("UNSET_FEE_STATEMENT");
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  clgUserFeeStatementPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let url = `${clgUserFeeStatementPdfUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data).then(response => {
        // console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "fee_statement.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      commit("UNSET_LOADING");
    });
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
