/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RegAsDistToNuApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_REG_AS_DIST_TO_NU_DATA,
    ADD_REG_AS_DIST_TO_NU_DATA,
    SET_REG_AS_DIST_TO_NU_SCHEMA,
    UNSET_REG_AS_DIST_TO_NU_SCHEMA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        script_qty: '',
        comment: '',
        date: '',
        exam_code: '',
        exam_initiate_id: '',
        extra_packet_size: '',
        extra_quantity: 0,
        main_packet_size: '',
        main_quantity: '',
        reg_center_code: '',
        sender_id: '',
        status: 1,
        total_packet: '',
        user_id: '',
        year: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRegAsDistToNuDataList(state) {
        return state.datalist;
    },
    // get form schema
    getRegAsDistToNuSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_REG_AS_DIST_TO_NU_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_REG_AS_DIST_TO_NU_DATA](state, jschema) {
        state.datalist.push(jschema);
    },
    // set action process
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    // unset action process
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    // set form schema
    [SET_REG_AS_DIST_TO_NU_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.exam_id = parseInt(state.schema.exam_id);
        //state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
    },
    // unset form schema
    [UNSET_REG_AS_DIST_TO_NU_SCHEMA](state) {
        // Object.keys(state.schema).forEach(param => {
        //   state.schema[param] = "";
        // });
        state.schema = {
            id: state.schema.id,
            script_qty: '',
            comment: '',
            date: '',
            exam_code: '',
            exam_initiate_id: '',
            extra_packet_size: '',
            extra_quantity: 0,
            main_packet_size: '',
            main_quantity: '',
            reg_center_code: '',
            sender_id: '',
            status: 1,
            total_packet: '',
            user_id: '',
            year: '',
        };
    },
};

const actions = {
    //search for future requiremet
    searchRegAsDistToNuData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });

            Axios.get(RegAsDistToNuApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;

                    commit('SET_REG_AS_DIST_TO_NU_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    // get data list
    callRegAsDistToNuData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(RegAsDistToNuApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_REG_AS_DIST_TO_NU_DATA', result);
                    // return state.datalist;
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
    // delete data
    deleteRegAsDistToNuItem({ commit }, item) {
        let url = `${RegAsDistToNuApi}/${item}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.delete(url)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('SET_SNACKBAR', {
                            msg: deleteMsg,
                            color: 'green',
                        });
                        resolve('done');
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    // save data
    saveRegAsDistToNuData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        data['status'] = 2;
        console.log('in action', data);
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(RegAsDistToNuApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_REG_AS_DIST_TO_NU_DATA', schema);
                        commit('SET_SNACKBAR', {
                            msg: saveMsg,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    // edit/update data
    editRegAsDistToNuData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        const url = `${RegAsDistToNuApi}/${data.id}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.put(url, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('SET_SNACKBAR', {
                            msg: updateMsg,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
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