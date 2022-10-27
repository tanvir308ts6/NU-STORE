import Axios from "axios";

import { SET_TRANSCRIPT_DATA } from "../../mutation-types";

import { Transcript_FetchUrl } from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "1111",
    name: "Mitu",
    f_name: "Md. Abul Kashem",
    m_name: "Marjia begum",
    institution_name: "Victoria College",
    entrance_qlf: "HSC",
    exam_name: "BSc",
    subject: "CSE",
    dur_of_course: "4 years",
    exam_roll_no: "0111",
    session: "2013-14",
    year_of_passing: "2017",
    total_earnd_credit: "120 out of 120",
    cgpa: "3.89",
    attainments: [
      {
        year: "1st yrs",
        credit: "30",
        gpa: "3.25",
        semester: [
          {
            s_title: "1st",
            courses: [
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1102",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1103",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1104",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1105",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
            ],
          },
          {
            s_title: "2nd",
            courses: [
              {
                code: "1201",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1108",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1109",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1107",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
            ],
          },
        ],
      },
      {
        year: "2nd yr",
        credit: "30",
        gpa: "3.38",
        semester: [
          {
            s_title: "3rd",
            courses: [
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
            ],
          },
          {
            s_title: "4th",
            courses: [
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
              {
                code: "1101",
                title: "Introduction to Business",
                credit: "3",
                l_grade: "A-",
              },
            ],
          },
        ],
      },
    ],
  },
  datalist: [],
};

const getters = {
  getTranscriptItem(state) {
    return state.datalist;
  },
  getTranscriptSchema(state) {
    return state.schema;
  },
};
const mutations = {
  [SET_TRANSCRIPT_DATA](state, result) {
    state.datalist = result;
  },
};
const actions = {
  //all data
  fetchTranscriptData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(Transcript_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_TRANSCRIPT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //after search data
  searchTranscript({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(Transcript_FetchUrl, {
        params: searchParam,
      })

        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_TRANSCRIPT_DATA", result);
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
