import Axios from 'axios'
import {ExamItemList}  from '../../api'
import {GET_EXAM_STORE_ITEM} from '../../mutation-types'


const state = {
    examStoreItemList: [],
};

const getters = {
    getExamStoreItemListData(state) {
      return state.examStoreItemList;
    },
  };
  // mutations
  const mutations = {
    [GET_EXAM_STORE_ITEM](state, response) {
      state.examStoreItemList = response;
    },  
  };
  // Actions
  const actions = {
    fetchExamStoreItemList({ commit }, searchParam){
        return Axios.get(ExamItemList)
        .then(function(response){
            var list = response.data.data.data;
            commit("GET_EXAM_STORE_ITEM",list);
            return response.data.message
        })
    },
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };