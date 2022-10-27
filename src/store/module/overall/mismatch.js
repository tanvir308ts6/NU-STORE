/* eslint-disable prettier/prettier */
import Axios from "axios";

import { SET_MISMATCH_DATA } from "../../mutation-types";

import { MismatchApi } from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "",
    admission_roll: "",
    name: "",
    name_bn: "",
    father_name: "",
    father_name_bn: "",
    mother_name: "",
    mother_name_bn: "",
    session_year: "",
    session_year_expire: "",
    degree_code: "",
    degree_group_code: "",
    college_code: "",
    subject_code: "",
    exam_code: "",
    exam_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    student_type: "",
    gender: "",
    photo_url: "",
    admission_score: "",
    merit_position: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: "",
    exam_title: "",
    college_name: "",
    session: "",
    year: "",
    total: "",
  },
  datalist: [],
};

const getters = {
  // get  lsit
  getMismatchList(state) {
    return state.datalist;
  },
};
const mutations = {
  //set Viva examinee data
  [SET_MISMATCH_DATA](state, result) {
    state.datalist = result;
  },
};
const actions = {
  //after search data
  searchMismatchData({ commit }, searchParam) {
    console.log("I am in search", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(MismatchApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_MISMATCH_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  exportMismatchDetails({ commit }, searchParam) {
    console.log("I am in error", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: MismatchApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          } else {
            let url = response.data.data;
            console.log(url);

            // showing on a new tab
            var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
            fileLink.href = url; // assigning url to that
            fileLink.download = "mismatch_" + Date.now() + ".pdf"; // giving it a name
            fileLink.target = "_blank"; // ensuring that it goes to the new tab
            //After all that is done
            document.body.appendChild(fileLink); // attaching the <a> tag to the document body
            fileLink.click(); // finally clicking it  .
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
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
