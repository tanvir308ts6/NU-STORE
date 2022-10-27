/* eslint-disable prettier/prettier */
import Axios from "axios";

import { SET_VIVA_DASH_DATA,SET_VIVA_LIST_SUMMARY_DATA } from "../../mutation-types";

import { vivaDashApi,vivaCandApi } from "../../api";

const state = {
  vivaDashDatalist: [],
  vivaCandlistSummary: [],
};

const getters = {
  // get  Viva candidate lsit
  getVivaDashDataList(state) {
    return state.vivaDashDatalist;
  },
  getVivaCandSummaryDataList(state) {
    return state.vivaCandlistSummary;
  },
};
const mutations = {
  //set Viva examinee data
  [SET_VIVA_DASH_DATA](state, result) {
    state.vivaDashDatalist = result;
  },
   [SET_VIVA_LIST_SUMMARY_DATA](state, result) {
    state.vivaCandlistSummary = result;
  },
};
const actions = {
  //after search data
  searchVivaDashboardData({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${true}`;
    // loading  Opening
    // console.log("final:: Search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(vivaDashApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_DASH_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
    getVivaCanditateListSummary({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${true}`;
    // loading  Opening
    // console.log("final:: Search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(vivaCandApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_VIVA_LIST_SUMMARY_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  exportVivaCandSummaryList({ commit }, searchParam) {
    commit('SET_LOADING', {
      color: 'primary',
    });
        // download
        return new Promise((resolve, reject) => {
            Axios({
                    url: vivaCandApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.setAttribute(
                        'download',
                        'Practical_Canditate_List_Summary_' + Date.now() + '.pdf'
                    );
                    fileLink.setAttribute('target', '_blank');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
