/* eslint-disable prettier/prettier */
import Axios from "axios";
import {
  TopSheetDownloadURL,
  CenterDescriptiveDownloadURL,
  examWiseDescriptiveRollSheet,
  AttendanceSheetDownloadURL,
  examWiseAttendanceSheet,
  downLoadStudentListApi
} from "../../api";
import {
  SET_CENTER_DATA,
  ADD_CENTER_DATA,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_CENTER_SCHEMA_DATA,
  UNSET_CENTER_SCHEMA_DATA,
} from "../../mutation-types";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg
} from "../../erpUtil";

const state = {};

const getters = {};
const mutations = {};
const actions = {

  downLoadTopSheet({
    commit
  }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
          url: TopSheetDownloadURL,
          method: "GET",
          params: searchParam,
        })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "error") {
            console.log("error")
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }
          let url = response.data.data;

          if (response.data.data.length) {
            console.log(url);
            // showing on a new tab
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute(
              "download",
              "downloadStm_" + Date.now() + ".pdf"
            );
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          } else {
            console.log("error")
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }

        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  downLoadStudentList({
    commit
  }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
          url: downLoadStudentListApi,
          method: "GET",
          params: searchParam,
        })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            console.log("error")
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }
          let url = response.data.data;

          if (response.data.data.length) {
            console.log(url);
            // showing on a new tab
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute(
              "download",
              "downloadStm_" + Date.now() + ".pdf"
            );
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          } else {
            console.log("error")
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }

        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  downloadRollDescriptiveSheet({
    commit
  }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
          // url: CenterDescriptiveDownloadURL,
          url: examWiseDescriptiveRollSheet,
          method: "GET",
          params: searchParam,
        })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          if (url == null) {
            return this.url = response.data.message
          }

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "downloadStm_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },



  downloadAttendanceSheet({
    commit
  }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
          // url: AttendanceSheetDownloadURL,
          url: examWiseAttendanceSheet,
          method: "GET",
          params: searchParam,
        })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "downloadStm_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
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