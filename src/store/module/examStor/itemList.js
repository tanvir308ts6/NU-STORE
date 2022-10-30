import Axios from 'axios'
import {ExamItemList,ExamStoreItemUnitList}  from '../../api'
import {GET_EXAM_STORE_ITEM,GET_EDIT_EXAM_STORE_ITEM,GET_EXAM_STORE_ITEM_UNIT_LIST} from '../../mutation-types'


const state = {
    examStoreItemList: [],
    editExamStoreItemList: {},
    itemListData:{}
};

const getters = {
    getExamStoreItemListData(state) {
      return state.examStoreItemList;
    },
    getEditExamStoreItemListData(state){
      return state.editExamStoreItemList;
    },
    getExamStoreItemUnitList(state){
      return state.itemListData;
    }
  };
  // mutations
  const mutations = {
    [GET_EXAM_STORE_ITEM](state, response) {
      state.examStoreItemList = response;
    },
    [GET_EDIT_EXAM_STORE_ITEM](state, response){
      state.editExamStoreItemList =response;
    },
    [GET_EXAM_STORE_ITEM_UNIT_LIST](state, response){
      state.itemListData = response;
    }

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

    fetchEditExamStoreItem({ commit }, id){
      return Axios.get(ExamItemList + '/' + id)
      .then(function(response){
        var editlist = response.data.data;
        commit("GET_EDIT_EXAM_STORE_ITEM",editlist);
        return response.data.message
      })
    },

    fetchEditExamStoreItemsUnit({ commit }, searchParam){
      return Axios.get(ExamStoreItemUnitList)
      .then(function(response){
        var unitlist = response.data.data;
        commit("GET_EXAM_STORE_ITEM_UNIT_LIST",unitlist)
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