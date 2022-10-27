import Axios from "axios";
import {
  getCollegeFeeSummeryUrl,
  collegeFeeSummeryDownloadPdfUrl
} from "../../../api";
import {} from "../../../erpUtil";
import { SET_FEE_SUMMARY, UNSET_FEE_SUMMARY } from "../../../mutation-types";
const state = {
  schema: {
    exam_initiate_id: null
  },
  fee_summary: []
};
const getters = {
  collegeFeeSummarySchema(state) {
    return state.schema;
  },
  getCollegeFeeSummary(state) {
    return state.fee_summary;
  }
};
const mutations = {
  [SET_FEE_SUMMARY](state, data) {
    state.fee_summary = data;
  },
  [UNSET_FEE_SUMMARY](state) {
    state.fee_summary = [];
  }
};
const actions = {
  getCollegeFeeSummery({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    params.append("exam_initiate_id", state.schema.exam_initiate_id);
    let url = getCollegeFeeSummeryUrl;
    return new Promise((resolve, reject) => {
      Axios.get(url, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_FEE_SUMMARY", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_FEE_SUMMARY");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  collegeFeeSummeryDownloadPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${collegeFeeSummeryDownloadPdfUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
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
