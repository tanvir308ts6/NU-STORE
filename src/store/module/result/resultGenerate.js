/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
  SET_REULT_GENERATE_DATA,
  SET_RESULT_GENERATE_PROGRESS_DATA,
  SET_RESULT_PROCESS_SUMMARY_DATA,
} from '../../mutation-types';

import {
  ResultGenerateApi,
  ResultProgressApi,
  ResultProcessSummaryStatusApi,
} from '../../api';

const state = {
  schema: {
    ResultGenerate_mark: '',
    passed_percentage: '',
    target_percentage: '',
    target_students: '',
    total_failed: '',
    total_passed: '',
    total_students: '',
  },
  datalist: [],
  progressList: [],
  processSummary: {},
};
const getters = {
  // get data lsit
  getResultGenerateSchema (state) {
    return state.schema;
  },
  getResultGenerateData (state) {
    console.log ('scma d', state.datalist);
    return state.datalist;
  },
  getResultProgressList (state) {
    return state.progressList;
  },
  getResultProcessSummaryStatus (state) {
    return state.processSummary;
  },
};
// mutations
const mutations = {
  [SET_REULT_GENERATE_DATA] (state, result) {
    //console.log('mu', result);
    state.schema = result;
  },
  [SET_RESULT_GENERATE_PROGRESS_DATA] (state, data) {
    state.progressList = data;
  },
  [SET_RESULT_PROCESS_SUMMARY_DATA] (state, data) {
    state.processSummary = data;
  },
};
// Actions
const actions = {
  // get data list
  callResultGenerate ({commit}, searchParam) {
    return new Promise (function (resolve, reject) {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      // loading  Opening
      Axios.post (ResultGenerateApi, searchParam)
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status == 'success') {
            var result = response.data.data;
            console.log ('...', result);
            commit ('SET_REULT_GENERATE_DATA', result);
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'green',
            });
          } else {
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'orange',
            });
          }
          // return state.datalist;
          resolve (response.data.data);
        })
        .catch (function (error) {
          commit ('UNSET_LOADING'); // loading Closing
          // handle error
          console.log (error);
          reject ();
        });
    });
  },
  resultGenerateProcess ({commit}, sparam) {
    return new Promise ((resolve, reject) => {
      console.log ('sparam', sparam);
      // loading  Opening
      Axios.get (ResultProgressApi, {
        params: sparam,
      })
        .then (function (response) {
          console.log ('here_', response.data.data);
          commit ('SET_RESULT_GENERATE_PROGRESS_DATA', response.data.data);

          resolve (response.data.data);
        })
        .catch (function (response) {
          commit ('SET_SNACKBAR', {
            msg: response.data.message,
            color: 'red',
          });
          // commit("UNSET_LOADING");
          // console.log(error);
          reject ();
        });
    });
  },
  //result process steps summary & status
  getResultProcessSummary ({commit}, searchParam) {
    return new Promise (function (resolve, reject) {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      // loading  Opening
      Axios.get (ResultProcessSummaryStatusApi, {
        params: searchParam,
      })
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status == 'success') {
            var result = response.data.data;
            console.log ('...', result);
            commit ('SET_RESULT_PROCESS_SUMMARY_DATA', result);
            // commit('SET_SNACKBAR', {
            //     msg: response.data.message,
            //     color: 'green',
            // });
          } else {
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'orange',
            });
          }
          // return state.datalist;
          resolve (response.data.data);
        })
        .catch (function (error) {
          commit ('UNSET_LOADING'); // loading Closing
          // handle error
          console.log (error);
          reject ();
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
