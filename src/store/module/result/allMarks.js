/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {AllMarksApi} from '../../api';

// mutation types
import {SET_ALL_MARKS_DATA} from '../../mutation-types';

// // utilities
// import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
  message: '',
  action_process: false,
  schema: {
    exam_activity_code: '',
    activity_name: '',
    start_date: '',
    end_date: '',
    exam_code: '',
    exam_initiate_id: '',
    year: '',
    exam_name: '',
    subject_code: '',
    subject_name: '',
    paper_code: '',
    paper_name: '',
    total_student: '',
    total_rescrutiner: '',
    exam_status: '',
  },
  datalist: [],
};

// getters
const getters = {
  // get data lsit
  getAllMarksList (state) {
    return state.datalist;
  },
  // get form schema
  getAllMarksSchema (state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_ALL_MARKS_DATA] (state, result) {
    state.datalist = result;
  },
};

const actions = {
  // get data list
  searchAllMarksData ({commit}, searchParam) {
    console.log ('search Action', searchParam);
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      // loading  Opening
      Axios.get (AllMarksApi, {
        params: searchParam,
      })
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          var result = response.data.data;
          // console.log(response.data.data);
          commit ('SET_ALL_MARKS_DATA', result);
          console.log ('response', response.data.data);
          resolve (response.data);
        })
        .catch (function (error) {
          console.log ('m..: in catch ');
          commit ('UNSET_LOADING'); // loading Closing
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
