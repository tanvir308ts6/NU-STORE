/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    RescrutinyApplicantApi,
    RescrutinyByPapSummApi,
    RescrutinyKhataRequisitionApi,
    RescrutinyMarkChangeApi,
    RescrutinyPaperRescrutinerwiseApi,
    ExportResApplicantApi,
} from '../../api';

// mutation types
import { SET_RESCRUTINY_APPLICANT_DATA } from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        college_code: '',
        college_name: '',
        datetime: '',
        exam_code: '',
        exam_initiate_id: '',
        exam_name: '',
        exam_roll: '',
        examiner_code: '',
        examiner_email: '',
        examiner_name: '',
        examiner_type: '',
        head_examiner_code: '',
        head_examiner_email: '',
        head_examiner_name: '',
        head_examiner_type: '',
        id: '',
        new_mark: '',
        old_mark: '',
        paper_code: '',
        paper_name: '',
        payment_amount: '',
        payment_date: '',
        payment_status: '',
        reg_no: '',
        rescrutiner_email: '',
        rescrutiner_id: '',
        rescrutiner_mobile: '',
        rescrutiner_name: '',
        script_qr: '',
        script_sl: '',
        session: '',
        status: '',
        std_id: '',
        student_name: '',
        subject_code: '',
        subject_name: '',
        user_id: '',
        year: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRescrutinyApplicantList(state) {
        return state.datalist;
    },
    // get form schema
    getRescrutinyApplicantSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINY_APPLICANT_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    //after search data
    searchRescrutinyApplicantData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(RescrutinyApplicantApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('mmm', response.data.data);
                    commit('SET_RESCRUTINY_APPLICANT_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('search catch: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    exportRescrutinyByPaperSummary({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinyByPapSummApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'rescrutinypaperwiseList_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    exportRescrutinyByKhataRequisition({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinyKhataRequisitionApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'khatarequisitionList_' + Date.now() + '.pdf'; // giving it a name
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
    exportRescrutinyByMarkchnge({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinyMarkChangeApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'markchngeList_' + Date.now() + '.pdf'; // giving it a name
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
    exportByPaperRescrutiner({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinyPaperRescrutinerwiseApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download =
                        'paperrescrutinerwiseList_' + Date.now() + '.pdf'; // giving it a name
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
    exportRescrutinyApplicantList({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportResApplicantApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'rescrutinyapplicantList_' + Date.now() + '.pdf'; // giving it a name
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