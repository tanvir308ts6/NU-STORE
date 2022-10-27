/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RescrutinyDetailsApi } from '../../api';

// mutation types
import { SET_RESCRUTINY_DETAILS_DATA } from '../../mutation-types';

// // utilities
// import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

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
        lg: '',
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
        rescrutiner_name: ' ',
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
    getRescrutinyDetailsList(state) {
        return state.datalist;
    },
    // get form schema
    getRescrutinyDetailsSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINY_DETAILS_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    // get data list
    searchRescrutinyDetailsData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(RescrutinyDetailsApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(response.data.data);
                    commit('SET_RESCRUTINY_DETAILS_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('m..: in catch ');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    generateRescrutinyResult({ commit }, searchParam) {
        // pro bro
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening AdmitCardByColUrl_Main
            Axios.get(RescrutinyDetailsApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING');
                    // console.log(response.data);
                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
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