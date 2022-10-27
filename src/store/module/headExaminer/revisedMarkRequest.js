/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    RevisedMarkRequestApi,
    AcceptRejectRevisedMarkReqApi
} from '../../api';

// mutation types
import {
    SET_REVISED_MARK_REQ_DATA,
} from '../../mutation-types';

// utilities
import {
    saveMsg,
    failedMsg
} from '../../erpUtil';

// state
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        script_qty: '',
        date: '',
        reg_center_code: '',
        reg_center_name: '',
        examiner_code: '',
        exam_name: '',
        exam_code: '',
        status: 0,
        created_at: '',
        updated_at: '',
        deleted_at: '',
        examiner_name: '',
        comment: '',
        exam_initiate_id: '',
        extra_packet_size: '',
        extra_quantity: 0,
        main_packet_size: '',
        main_quantity: '',
        sender_id: '',
        total_packet: '',
        user_id: '',
        year: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRevisedMarkReqData(state) {
        return state.datalist;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_REVISED_MARK_REQ_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    // get data list
    fetchRevisedMarkReqData({
        commit
    }, searchParam) {
        return new Promise(function (resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(RevisedMarkRequestApi, {
                    params: searchParam,
                })
                .then(function (response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_REVISED_MARK_REQ_DATA', result);
                    // return state.datalist;
                    resolve(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    commit('UNSET_LOADING'); // loading Closing
                    reject();
                });
        });
    },

    // save data
    saveRevisedMarkReqData({
        commit
    }, schema) {
        let data = schema;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(AcceptRejectRevisedMarkReqApi, data)
                .then(function (response) {
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
                .catch(function (error) {
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

};

export default {
    state,
    getters,
    actions,
    mutations,
};