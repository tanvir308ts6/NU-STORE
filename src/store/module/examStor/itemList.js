import Axios from 'axios'
import {ExamItemList,ExamStoreItemUnitList}  from '../../api'
import {GET_EXAM_STORE_ITEM,GET_EDIT_EXAM_STORE_ITEM,GET_EXAM_STORE_ITEM_UNIT_LIST,GET_EXAM_STORE_ADD_ITEM_MESSAGE,POST_EXAM_STORE_EDIT_ITEM_MESSAGE,TOTAL_ITEM_LENGTH} from '../../mutation-types'


const state = {
    examStoreItemList: [],
    editExamStoreItemList: {},
    itemListData:{},
    statmass:{},
    itemLength:{},
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
    },
    statmass(state){
      return state.statmass;
    },
    lengthAlu(state){
      return state.itemLength
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
    },
    [POST_EXAM_STORE_EDIT_ITEM_MESSAGE](state, response){
      state.statmass = response
    },
    [TOTAL_ITEM_LENGTH](state, response){
      state.itemLength = response
    },

  };
  // Actions
  const actions = {
    fetchExamStoreItemList({ commit }, searchParam){
        return Axios.get(ExamItemList)
        .then(function(response){
            var list = response.data.data.data;
            commit("GET_EXAM_STORE_ITEM",list);
            var length = response.data.data.total;
            commit("TOTAL_ITEM_LENGTH",length);
            console.warn("kunkuni",response.data.data.total)
            return response.data.total
        })
    },

    postExamStoreItem({commit},item){
      return Axios.post(ExamItemList,item)
      .then(function(response){
        var mass = response.data.message;
        commit("GET_EXAM_STORE_ADD_ITEM_MESSAGE",mass);
      })
    },

    putExamStoreItem({commit},item){
      console.log(item, 'kkkllkk')
      return Axios.put(ExamItemList +'/'+item.id, item)
      .then((response)=>{
        var statmass = response.data.message;
        commit("POST_EXAM_STORE_EDIT_ITEM_MESSAGE",statmass)
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

    fetchDeleteExamStoreItem({ commit }, id){
      return Axios.delete(ExamItemList + '/' + id)
      // .then(function(response){
      //   var deltada = response.data.message;
      //   commit("GET_EDIT_EXAM_STORE_ITEM",deltada);
      // })
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