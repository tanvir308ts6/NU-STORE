import Axios from "axios";

// import {} from "../mutation-types";

import { PdfSignerURL } from "@/store/api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {};
const getters = {};
// mutations
const mutations = {};
// Actions
const actions = {
  getCertificate({ commit }) {
    return new Promise((resolve, reject) => {
      Axios({
        url: PdfSignerURL,
        method: "GET",
        responseType: "arraybuffer"
      })
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            "Certificate_" + Date.now() + ".pdf"
          );
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          console.log("I am in error", error);
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
