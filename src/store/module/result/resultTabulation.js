// axios
import Axios from "axios";

// apis
import { resultTabulationApi } from "../../api";

// mutation types
import { SET_RESULT_TABULATION_DATA } from "../../mutation-types";

const state = {
  schema: {
    id: "",
    examiner: "",
    mark_entry: "",
    mark_re_entry: "",
    script_qr_code: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  resultTabulationData: [],
};

// getters
const getters = {
  // get data lsit
  getresultTabulationData(state) {
    return state.resultTabulationData;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_RESULT_TABULATION_DATA](state, result) {
    state.resultTabulationData = result;
  },
};

const actions = {
  // get data list
  searchresultTabulationData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(resultTabulationApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data.data;
          commit("SET_RESULT_TABULATION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
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
