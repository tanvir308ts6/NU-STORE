/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {SET_GRACE_CALCULATED_DATA} from '../../mutation-types';

import {GraceGetDataApi} from '../../api';

const state = {
  schema: {
    grace_mark: '',
    passed_percentage: '',
    target_percentage: '',
    target_students: '',
    total_failed: '',
    total_passed: '',
    total_students: '',
  },
  datalist: [],
};
const getters = {
  // get data lsit
  getGraceSchema (state) {
    return state.schema;
  },
  getGraceData (state) {
    console.log ('scma d', state.datalist);
    return state.datalist;
  },
};
// mutations
const mutations = {
  [SET_GRACE_CALCULATED_DATA] (state, result) {
    //console.log('mu', result);
    state.schema = result;
  },
};
// Actions
const actions = {
  // get data list
  getGraceData ({commit}, searchParam) {
    return new Promise (function (resolve, reject) {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      // loading  Opening
      Axios.get (GraceGetDataApi, {params: searchParam})
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status == 'success') {
            var result = response.data.data;
            console.log ('...', result);
            commit ('SET_GRACE_CALCULATED_DATA', result);
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
