/* eslint-disable prettier/prettier */
import Axios from "axios";

import { SET_PV_DASH_DATA,SET_PRACTICAL_LIST_SUMMARY_DATA } from "../../mutation-types";

import { pvDashApi,pracCandSumApi,exportPracCandSumApi } from "../../api";

const state = {
  pvDashDatalist: [],
  pracCandlistSummary: [],
};

const getters = {
  // get  Viva candidate lsit
  getPvDashDataList(state) {
    return state.pvDashDatalist;
  },
  getPracCandSummaryDataList(state) {
    return state.pracCandlistSummary;
  },
};
const mutations = {
  //set Viva examinee data
  [SET_PV_DASH_DATA](state, result) {
    state.pvDashDatalist = result;
  },
   [SET_PRACTICAL_LIST_SUMMARY_DATA](state, result) {
    state.pracCandlistSummary = result;
  },
};
const actions = {
  //after search data
  searchDashboardData({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${true}`;
    // loading  Opening
    // console.log("final:: Search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(pvDashApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PV_DASH_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

        exportPracCandSummaryList({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // download
        return new Promise((resolve, reject) => {
            Axios({
                    url: exportPracCandSumApi,
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
    },
  getPracticalCanditateListSummary({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${true}`;
    // loading  Opening
    // console.log("final:: Search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(pracCandSumApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICAL_LIST_SUMMARY_DATA", result);
          resolve(response.data);
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
