/* eslint-disable prettier/prettier */
import Axios from "axios";

import {} from "../../mutation-types";

import {
  PracticalCandidateListDownload,
  PracticalMarkBlankListDownload,
  PracticalMarkListDownload,
  PracticalWantingListDownload,
  VivaCandidateListDownload,
  VivaMarkBlankListDownload,
  VivaMarkListDownload,
  VivaWantingListDownload,
  downloadAttendenceApi
} from "../../api";

const state = {
  //   vivacandilist: [],
};

const getters = {
  //   getVivaCandiList(state) {
  //     return state.vivacandilist;
  //   },
};
const mutations = {
  //set Viva examinee data
  //   [SET_VIVA_CANDI_DATA](state, result) {
  //     state.vivacandilist = result;
  //   },
};
const actions = {
  downloadAttendenceSheet({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(downloadAttendenceApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVAttendence_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadPracticalCandidateList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PracticalCandidateListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadPracticalMarkBlankList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PracticalMarkBlankListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadPracticalMarkList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PracticalMarkListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadPracticalWantingList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PracticalWantingListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //   viva
  downloadVivaCandidateList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(VivaCandidateListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "vivaCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadVivaMarkBlankList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(VivaMarkBlankListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadVivaMarkList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(VivaMarkListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  downloadVivaWantingList({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(VivaWantingListDownload, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");

          fileLink.href = url;
          fileLink.download = "PVCandidateList_" + Date.now() + ".pdf";
          fileLink.target = "_blank";
          document.body.appendChild(fileLink);
          fileLink.click();

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
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
