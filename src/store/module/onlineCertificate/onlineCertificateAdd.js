/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    OnlineCertificateAddUrl,
    OnlineCertificateSubmitUrl,
    OnlineCertificateVerifiedUrl,
} from '@/store/api';

// mutation types
import {
    SET_ONLINE_CERTIFICATE_ADD_DATA,
    UNSET_ONLINE_CERTIFICATE_ADD_DATA,
    SET_ONLINE_CERTIFICATE_DATA,
    UNSET_ONLINE_CERTIFICATE_DATA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        exam_roll: '7021788',
        reg_no: '15316800024',
        student_name: 'NAJMUNNAHAR',
        session_year: '2015-16',
        college_code: '0101',
        college_name: 'GOVT. P. C. COLLEGE',
    },

    studentlist: [],
    certificateList: [],
};

// getters
const getters = {
    getOnlineCertificateAddList(state) {
        return state.studentlist;
    },
    getOnlineCertificateDataList(state) {
        return state.certificateList;
    },
};

// mutations
const mutations = {
    [SET_ONLINE_CERTIFICATE_ADD_DATA](state, result) {
        state.studentlist.push(result);
    },
    [UNSET_ONLINE_CERTIFICATE_ADD_DATA](state) {
        state.studentlist = [];
    },
    [SET_ONLINE_CERTIFICATE_DATA](state, result) {
        state.certificateList = result;
    },
    [UNSET_ONLINE_CERTIFICATE_DATA](state) {
        console.log('..m calling');
        state.certificateList = [];
    },
};

const actions = {
    searchOnlineCertificateAddData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading  Opening
            Axios.get(OnlineCertificateAddUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.message === 'Data found.') {
                        // commit('SET_SNACKBAR', {
                        //     msg: saveMsg,
                        //     color: 'green',
                        // });
                        var result = response.data.data;
                        commit('SET_ONLINE_CERTIFICATE_ADD_DATA', result);
                        resolve(response.data.data);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        commit('UNSET_LOADING'); // loading Closing
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    //add student
    submitOnlineData({ commit }, schema) {
        let data = schema;

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(OnlineCertificateSubmitUrl, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('SET_SNACKBAR', {
                            msg: saveMsg,
                            color: 'green',
                        });
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },

    //get verified certificate
    searchOnlineCertificateData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading  Opening
            Axios.get(OnlineCertificateVerifiedUrl, { params: searchParam })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_ONLINE_CERTIFICATE_DATA', result);
                    resolve(response.data.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
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