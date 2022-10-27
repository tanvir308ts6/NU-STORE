/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { addStudentTranscript,generateTranscript } from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_TRANSCRIPT_GEN_STUDENT_LIST_DATA,   
    SET_TRANSCRIPT_LIST_DATA,
 
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        rn: '',
        exam_roll: '',
        reg_no: '',
        session: '',
        name: '',
        father_name: '',
        mother_name: '',
        college: '',
        degree: '',
        degree_group: '',
        subject: '',
        cgpa: '',
        total_credit: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',

    },
    datalist: [],
    studentlist: [],
    
    transcriptList:[]
};

// getters
const getters = {

    getTransGenStudentDataList(state) {
        return state.studentlist;
    },
   
    getTranscriptDataList(state){
       return state.transcriptList;
   }
};

// mutations
const mutations = {

    [SET_TRANSCRIPT_GEN_STUDENT_LIST_DATA](state, result) {
        state.studentlist = result;
    },
  
 
    // set action process
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    // unset action process
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    [SET_TRANSCRIPT_LIST_DATA](state, result) {
        state.transcriptList = result;
    }
};

const actions = {
    searchTranscript({ commit }, searchParam) {

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(addStudentTranscript, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_TRANSCRIPT_LIST_DATA', result);
                    resolve(response.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchTranscriptGenerateStudentData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(addStudentTranscript, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_TRANSCRIPT_GEN_STUDENT_LIST_DATA', result);
                    resolve(response.data.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //
    downloadBulkTranscriptByCollege({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateTranscript,
                    method: 'GET',
                    params: item,
                })
                .then((response) => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'transcriptList_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
       downloadBulkTranscriptBySubject({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateTranscript,
                    method: 'GET',
                    params: item,
                })
                .then((response) => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'transcriptList_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
  //submit
   submitGenerateTranscriptData({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateTranscript,
                    method: 'GET',
                    params: item,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'transcriptList_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
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