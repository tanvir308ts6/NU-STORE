/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { AmanuensisApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_AMANUENSIS_DATA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        type: '',
        session: '',
        status: '',
        name: '',
        address: '',
        reg_no: '',
        std_id: '',
        exam_roll: '',
        student_name: '',
        college_code: '',
        college_name: '',
        paper_code: '',
        paper_name: '',
        mark: '',
        user_id: '',
        rescrutiner_id: '',
        rescrutiner_name: '',
        exam_code: '',
        exam_name: '',
        year: '',
        exam_initiate_id: '',
    },
    datalist: [{
        id: '1',
        type: '1',
        session: '2014-15',
        status: '0',
        name: 'nameing',
        address: 'dhk-1212',
        reg_no: '13243698',
        std_id: '1',
        exam_roll: '21435',
        student_name: 'nammw',
        college_code: '321',
        college_name: 'giopdfkkd college',
        paper_code: '214',
        paper_name: 'jsdkjf',
        mark: '09',
        user_id: '1',
        rescrutiner_id: '1',
        rescrutiner_name: 'mdmf',
        exam_code: '3302',
        exam_name: 'masters ',
        year: '2017',
        exam_initiate_id: '1',
    }, ],
};

// getters
const getters = {
    // get data lsit
    getAmanuensisList(state) {
        return state.datalist;
    },
    // get form schema
    getAmanuensisSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_AMANUENSIS_DATA](state, result) {
        state.datalist = result;
    },
    // // set item to datalist
    // [ADD_MISSING_SCRIPT_DATA](state, jschema) {
    //     state.datalist.push(jschema);
    // },
    // set action process
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    // unset action process
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    // // set form schema
    // [SET_MISSING_SCRIPT_SCHEMA](state, schemaData) {
    //     state.schema = schemaData;
    //     //state.schema.exam_id = parseInt(state.schema.exam_id);
    // },
    // // unset form schema
    // [UNSET_MISSING_SCRIPT_SCHEMA](state) {
    //     state.schema = {
    //         id: state.schema.id,
    //         script_sl: '',
    //         reg_no: '',
    //         student_name: '',
    //         college_code: '',
    //         college_name: '',
    //         exam_code: '',
    //         exam_name: '',
    //         year: '',
    //         type: '',
    //         exam_initiate_id: '',
    //         status: '',
    //     };
    // },
};

const actions = {
    // get data list
    fetchAmanuensisData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(AmanuensisApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_AMANUENSIS_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    commit('UNSET_LOADING'); // loading Closing
                    reject();
                });
        });
    },
    searchAmanuensisData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AmanuensisApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(response.data.data);
                    commit('SET_AMANUENSIS_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    // // edit/update data
    // editAmanuensisData({ commit }, schema) {
    //     commit('SET_ACTION_PROCESS');
    //     let data = schema;
    //     console.log('DATA ACTION ', data);
    //     //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    //     const url = `${AmanuensisApi}/${data.id}`;
    //     console.log(AmanuensisApi + ' bef url', url);

    //     return new Promise((resolve, reject) => {
    //         commit('SET_LOADING', {
    //             color: 'primary',
    //         }); // loading Opening
    //         Axios.put(url, data)
    //             .then(function(response) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 if (response.data.status === 'success') {
    //                     commit('SET_SNACKBAR', {
    //                         msg: updateMsg,
    //                         color: 'green',
    //                     });
    //                     resolve();
    //                 } else {
    //                     commit('SET_SNACKBAR', {
    //                         msg: response.data.message,
    //                         color: 'red',
    //                     });
    //                     reject();
    //                 }
    //             })
    //             .catch(function(error) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 commit('SET_SNACKBAR', {
    //                     msg: failedMsg,
    //                     color: 'red',
    //                 });
    //                 console.log(error);
    //                 reject();
    //             });
    //     });
    // },
};

export default {
    state,
    getters,
    actions,
    mutations,
};