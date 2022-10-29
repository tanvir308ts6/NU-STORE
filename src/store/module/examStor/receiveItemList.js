import Axios from 'axios'
import {ExamReceivedItemList} from '../../api'
import {GET_EXAM_STORE_RECEVIED_ITEM_LIST} from '../../mutation-types'


const state ={
    examReceiveitems:[],
};

const getters = {
    getExaMRexeivedItemsList(state){
        return state.examReceiveitems;
    }
};

const mutations ={
    [GET_EXAM_STORE_RECEVIED_ITEM_LIST](state, response){
        state.examReceiveitems = response;
    }
};

const actions ={
    fetchExamStoreReceivedItemList({commit}, searchParam){
        return Axios.get(ExamReceivedItemList)
        .then(function(response){
            var receivedList = response.data.data.data;
            commit("GET_EXAM_STORE_RECEVIED_ITEM_LIST",receivedList);
        })
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}