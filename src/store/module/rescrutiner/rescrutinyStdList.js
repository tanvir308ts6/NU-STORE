/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RescrutinyStdApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_RESCRUTINY_STD_DATA,
    UNSET_RESCRUTINY_STD_DATA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        paper_code: '',
        paper_name: '',
        rescrutiner_id: '',
        rescrutiner_name: '',
        student_count: '',
        students: [],
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRescrutinyStdList(state) {
        return state.datalist;
    },
    // get form schema
    getRescrutinyStdSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINY_STD_DATA](state, result) {
        state.datalist = result;
    },
    // set data list
    [UNSET_RESCRUTINY_STD_DATA](state) {
        state.datalist = [];
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
    fetchRescrutinyStdData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(RescrutinyStdApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_RESCRUTINY_STD_DATA', result);
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
    // // delete data
    // deleteRescrutinyStdItem({ commit }, item) {
    //     console.log('delete ac', item);
    //     let url = `${RescrutinyStdApi}/${item}`;
    //     return new Promise((resolve, reject) => {
    //         commit('SET_LOADING', {
    //             color: 'primary',
    //         }); // loading Opening
    //         Axios.delete(url)
    //             .then(function(response) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 if (response.data.status === 'success') {
    //                     commit('SET_SNACKBAR', {
    //                         msg: deleteMsg,
    //                         color: 'green',
    //                     });
    //                     resolve('done');
    //                 } else {
    //                     commit('SET_SNACKBAR', {
    //                         msg: response.data.message,
    //                         color: 'red',
    //                     });
    //                     reject();
    //                 }
    //             })
    //             .catch(function(error) {
    //                 console.log(error);
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 commit('SET_SNACKBAR', {
    //                     msg: failedMsg,
    //                     color: 'red',
    //                 });
    //                 reject();
    //             });
    //     });
    // },
    // save data
    saveRescrutinyStdData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        data['status'] = 1;
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(RescrutinyStdApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        //commit('ADD_MISSING_SCRIPT_DATA', schema);
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
    //after search data
    searchRescrutinyStdData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(RescrutinyStdApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(response.data.data);
                    commit('SET_RESCRUTINY_STD_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('searchFormFillup: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    // // edit/update data
    // editRescrutinyStdData({ commit }, schema) {
    //     commit('SET_ACTION_PROCESS');
    //     let data = schema;
    //     console.log('DATA ACTION ', data);
    //     //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    //     const url = `${RescrutinyStdApi}/${data.id}`;
    //     console.log(RescrutinyStdApi + ' bef url', url);

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