/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  UsedScriptStatement, // get and post
  AnsScriptStatement, // get
  AS_CenterToTreasury, // post
  AS_CenterToRc, // post
  AS_RcToCenterRecieve, // post
  AS_RcToNu, // get and post
  AS_NuToRcRecieve, // post
  ansScriptStickerDownload,
  ansScriptStmReportDownload,
  ansScriptDistToNuReportList,
  nuAnsScriptDistNuToRegReportApi,
  regAnsScriptCollectionRegRecieveApi,
  regCenAnsScriptCollFromCenDownload,
  RoutineWiseStudentCount,
  allotmentRepApi,
  challanNumberApi,
  centerChallanApi,
  nuAnsDistToRegChallanApi,
  requestForRemoveAnsScriptAllotment,
  removeAnsScriptAllotment,
  nuAnsDistToRegHeadExaminerWiseExaminer,
  ansScriptChallanNumners,
  ansScriptAddChallan,
  ansScriptRemoveChallan,
  nuToRegAnsScriptDistApi,
  addToCenterChallanApi,
  centerChallanDistributeApi,
  centerChallanDetailsApi,
  deleteItemFromCenterChallanApi,
  saveCenterToScriptDataAllotmentApi,
} from "@/store/api";

import {
  SET_USED_SCRIPT_DATA,
  UNSET_USED_SCRIPT_DATA,
  SET_AS_PAPER_DATA_AT_CENTER_RC,
  UNSET_AS_PAPER_DATA_AT_CENTER_RC,
  SET_AS_PAPER_DATA_AT_CENTER_RC_TODAYSCRIPT,
  UNSET_AS_PAPER_DATA_AT_CENTER_RC_TODAYSCRIPT,
  SET_AS_PAPER_DATA_AT_RC_NU,
  UNSET_AS_PAPER_DATA_AT_RC_NU,
  SET_AS_CHALLAN_NUMBER_LIST,
  SET_CENTER_CHALLAN_LIST,
  SET_CENTER_CHALLAN_DETAILS_LIST,
} from "@/store/mutation-types";

const state = {
  usedScriptData: {},
  ansScriptPaperDataAtCenterRc: [],
  ansScriptPaperDataAtCenterRcTS: [],
  ansScriptPaperDataAtRcNu: [],
  ansChallanNumberList: [],
  centerChallanList: [],
  centerChallanDetailsList: [],
};

const getters = {
  getUsedScriptData(state) {
    return state.usedScriptData;
  },
  getAnsScriptPaperDataAtCenterRc(state) {
    return state.ansScriptPaperDataAtCenterRc;
  },
  getAnsScriptPaperDataAtCenterRcTS(state) {
    return state.ansScriptPaperDataAtCenterRcTS;
  },
  getAnsScriptPaperDataAtRcNu(state) {
    return state.ansScriptPaperDataAtRcNu;
  },
  getAnsChallanNumberList(state) {
    return state.ansChallanNumberList;
  },
  getCenterChallanList(state) {
    return state.centerChallanList;
  },
  getCenterChallanDetailsList(state) {
    return state.centerChallanDetailsList;
  },
};

const mutations = {
  [SET_USED_SCRIPT_DATA](state, result) {
    if (result.ms_count == 0) {
      result.ms_count = result.student_count;
    }
    if (result.es_count == 0) {
      result.es_count = result.student_count;
    }
    if (result.datetime == null) {
      result.datetime = new Date().toISOString().substr(0, 10);
    }
    state.usedScriptData = result;
  },
  [UNSET_USED_SCRIPT_DATA](state) {
    state.usedScriptData = {};
  },
  [SET_AS_PAPER_DATA_AT_CENTER_RC](state, result) {
    result.forEach((ele) => {
      if (ele.total_script == parseInt(0)) {
        ele.total_script = ele.total_student;
      }
    });

    state.ansScriptPaperDataAtCenterRc = result;
  },
  [UNSET_AS_PAPER_DATA_AT_CENTER_RC](state, result) {
    state.ansScriptPaperDataAtCenterRc = [];
  },
  [SET_AS_PAPER_DATA_AT_CENTER_RC_TODAYSCRIPT](state, result) {
    result.forEach((ele) => {
      if (ele.total_script == parseInt(0)) {
        ele.total_script = ele.total_student;
      }
    });

    state.ansScriptPaperDataAtCenterRcTS = result;
  },
  [UNSET_AS_PAPER_DATA_AT_CENTER_RC_TODAYSCRIPT](state, result) {
    state.ansScriptPaperDataAtCenterRcTS = [];
  },
  [SET_AS_PAPER_DATA_AT_RC_NU](state, result) {
    state.ansScriptPaperDataAtRcNu = result;
  },
  [UNSET_AS_PAPER_DATA_AT_RC_NU](state, result) {
    state.ansScriptPaperDataAtRcNu = [];
  },

  [SET_AS_CHALLAN_NUMBER_LIST](state, result) {
    state.ansChallanNumberList = result;
  },
  [SET_CENTER_CHALLAN_LIST](state, result) {
    state.centerChallanList = result;
  },
  [SET_CENTER_CHALLAN_DETAILS_LIST](state, result) {
    state.centerChallanDetailsList = result;
  },
};

const actions = {
  //  get

  fetchUsedScriptData({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(UsedScriptStatement, {
        params: payLoad,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          if (response.data.data.length == 0) {
            var result = {};
          } else {
            var result = response.data.data[0];
          }
          console.log("look here result->", result);
          commit("SET_USED_SCRIPT_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchRoutineWiseStudentCount({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise(function(resolve, reject) {
      Axios.get(RoutineWiseStudentCount, {
        params: payLoad,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing

          console.log("look here result->", response);

          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchAnsScriptPaperDataAtCenterRc({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(AnsScriptStatement, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_AS_PAPER_DATA_AT_CENTER_RC", result);
          resolve(response.data);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchAnsScriptPaperDataAtCenterRcTodayScript({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(AnsScriptStatement, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_AS_PAPER_DATA_AT_CENTER_RC_TODAYSCRIPT", result);
          resolve(response.data);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchAnsScriptPaperDataAtRcNu({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(AS_RcToNu, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_AS_PAPER_DATA_AT_RC_NU", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  fetchAnsScriptChallanNumberList({ commit }, payLoad) {
    // ?challan_type=AS
    return new Promise(function(resolve, reject) {
      Axios.get(challanNumberApi, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_AS_CHALLAN_NUMBER_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchCenterChallanList({ commit }, payLoad) {
    // ?challan_type=AS
    // center-ans-script-challans?

    return new Promise(function(resolve, reject) {
      Axios.get(centerChallanApi, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_CENTER_CHALLAN_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchCenterChallanDetails({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(centerChallanDetailsApi, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_CENTER_CHALLAN_DETAILS_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  fetchAnsScriptChallanNumberListWithDetails({ commit }) {
    let param = {};
    param.challan_type = AS;
    return new Promise(function(resolve, reject) {
      Axios.get(ansScriptChallanNumners, {
        params: param,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_AS_CHALLAN_NUMBER_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  addToChallanFromCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(addToCenterChallanApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  distributeCenterChallan({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(centerChallanDistributeApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  deleteItemFromCenterChallan({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // http://103.4.145.242:8006/api/auth/report/delete-ans-script-from-challan
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(deleteItemFromCenterChallanApi, payLoad)
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
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  // update-ans-script-packet-size
  saveCenterToScriptDataAllotment({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(saveCenterToScriptDataAllotmentApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  //  post

  postUsedScriptData({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(UsedScriptStatement, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
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
  postAnsScriptCenterToTreasury({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_CenterToTreasury, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
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
  postAnsScriptCenterToRc({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_CenterToRc, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  postAnsScriptRcToCenterRecieve({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_RcToCenterRecieve, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  postAnsScriptRcToNu({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_RcToNu, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  postAnsScriptNuToRcRecieve({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(AS_NuToRcRecieve, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  postForRemoveAnsScriptAllotment({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(requestForRemoveAnsScriptAllotment, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  removeRemoveAnsScriptAllotmentFromNu({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(removeAnsScriptAllotment, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  addAnsScriptChallan({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(ansScriptAddChallan, payLoad)
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
  removeAnsScriptChallan({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(ansScriptRemoveChallan, payLoad)
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

  nuToRegAnsScriptDistApi({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(nuToRegAnsScriptDistApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  // pdf download

  // pdf download actions:

  download_AS_Sticker({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: ansScriptStickerDownload,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },

  download_AS_StmReport({ commit }, searchParam) {
    console.log("download_AS_StmReport", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: ansScriptStmReportDownload,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          console.log("response", response);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  download_AS_StmReport_DOWNLOADLIST({ commit }, searchParam) {
    // console.log("download_AS_StmReport_DOWNLOADLIST::", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: regCenAnsScriptCollFromCenDownload,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          console.log("response", response);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  ansScriptDistToNuReportList({ commit }, searchParam) {
    console.log("download_AS_StmReport", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: ansScriptDistToNuReportList,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          console.log("response", response);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  nuAnsScriptDistNuToRegReportApi({ commit }, searchParam) {
    console.log("nuAnsScriptDistNuToRegReportApi", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: nuAnsScriptDistNuToRegReportApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          console.log("response", response);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  downloadAllotmentReport({ commit }, item) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: allotmentRepApi,
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
  downloadRegAnsScriptCollectionRegRecieve({ commit }, searchParam) {
    console.log("nuAnsScriptDistNuToRegReportApi", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: regAnsScriptCollectionRegRecieveApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          console.log("response", response);
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(response);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },

  download_AS_ChallanByCode({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: nuAnsDistToRegChallanApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log("this is the url", url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },

  download_AS_nuAnsDistToRegHeadExaminerWiseExaminer({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: nuAnsDistToRegHeadExaminerWiseExaminer,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log("this is the url", url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
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
