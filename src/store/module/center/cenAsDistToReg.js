/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { CenAsDistToRegApi, TreasuryAnsCountURL } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_CEN_AS_DIST_TO_REG_DATA,
    ADD_CEN_AS_DIST_TO_REG_DATA,
    SET_CEN_AS_DIST_TO_REG_SCHEMA,
    UNSET_CEN_AS_DIST_TO_REG_SCHEMA,
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
        date: '',
        reg_center_code: '',
        reg_center_name: '',
        center_name: '',
        exam_name: '',
        exam_code: '',
        status: 0,
        created_at: '',
        updated_at: '',
        deleted_at: '',
        center_code: '',
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
    getCenAsDistToRegDataList(state) {
        return state.datalist;
    },
    // get form schema
    getCenAsDistToRegSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_CEN_AS_DIST_TO_REG_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_CEN_AS_DIST_TO_REG_DATA](state, jschema) {
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
    [SET_CEN_AS_DIST_TO_REG_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.center_id = parseInt(state.schema.center_id);
        //state.schema.reg_center_code = parseInt(state.schema.reg_center_code);
    },
    // unset form schema
    [UNSET_CEN_AS_DIST_TO_REG_SCHEMA](state) {
        // Object.keys(state.schema).forEach(param => {
        //   state.schema[param] = "";
        // });
        state.schema = {
            id: state.schema.id,
            script_qty: '',
            date: '',
            reg_center_code: '',
            reg_center_name: '',
            center_name: '',
            exam_name: '',
            exam_code: '',
            status: 0,
            created_at: '',
            updated_at: '',
            deleted_at: '',
            center_code: '',
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
        };
    },
};

const actions = {
    // get data list
    callCenAsDistToRegData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(CenAsDistToRegApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_CEN_AS_DIST_TO_REG_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    //search for future requiremet
    searchASDistToRegData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });

            Axios.get(CenAsDistToRegApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;

                    commit('SET_CEN_AS_DIST_TO_REG_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    //search for future requiremet
    searchAStreasuryData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });

            Axios.get(TreasuryAnsCountURL, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;

                    //commit('SET_CEN_AS_DIST_TO_REG_DATA', result);
                    resolve(result);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    // delete data
    deleteCenAsDistToRegItem({ commit }, item) {
        let url = `${CenAsDistToRegApi}/${item}`;
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
                    console.log(error);
                    reject();
                });
        });
    },
    // save data
    saveCenAsDistToRegData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        data['status'] = 2;
        console.log('in save action', data);
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(CenAsDistToRegApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_CEN_AS_DIST_TO_REG_DATA', schema);
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
                    console.log(error);
                    reject();
                });
        });
    },
    // edit/update data
    editCenAsDistToRegData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        const url = `${CenAsDistToRegApi}/${data.id}`;
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