/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { addStudent, generateCertificate } from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_CER_GEN_STUDENT_LIST_DATA,
    SET_CERTIFICATE_LIST_DATA,
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

    certificateList: [],
    certificatePdfList: [],
};

// getters
const getters = {
    getCerGenStudentDataList(state) {
        return state.studentlist;
    },
    getCertificateSchema(state) {
        return state.schema;
    },
    getCertificateDataList(state) {
        return state.certificateList;
    },
};

// mutations
const mutations = {
    [SET_CER_GEN_STUDENT_LIST_DATA](state, result) {
        state.studentlist = result;
    },

    [SET_CERTIFICATE_LIST_DATA](state, result) {
        state.certificateList = result;
    },

    // set action process
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    // unset action process
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
};

const actions = {
    searchCertificate({ commit }, searchParam) {
        console.log('fdfdfd', JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(addStudent, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_CERTIFICATE_LIST_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchCertificateGenerateStudentData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(addStudent, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_CER_GEN_STUDENT_LIST_DATA', result);
                    commit('SET_SNACKBAR', {
                        msg: response.data.message,
                        color: 'green',
                    });
                    resolve(response.data.data);
                })
                .catch(function(error) {
                    console.log('searchFormFillup: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    submitGenerateCertificateData({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateCertificate,
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
                    fileLink.download = 'certificateList_' + Date.now() + '.pdf'; // giving it a name
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
    downloadCertificateByCollege({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateCertificate,
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
                    fileLink.download = 'certificateList_' + Date.now() + '.pdf'; // giving it a name
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
    
    downloadCertificateBySubject({ commit }, item) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: generateCertificate,
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
                    fileLink.download = 'certificateList_' + Date.now() + '.pdf'; // giving it a name
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};