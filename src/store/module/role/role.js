/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RoleApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_ROLE_DATA,
    ADD_ROLE_FROM_DATA,
    SET_ROLE_SCHEMA,
    UNSET_ROLE_DATA_SCHEMA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        role_name: '',
        description: '',
        status: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRoleList(state) {
        return state.datalist;
    },
    // get form schema
    getRoleSchema(state) {
        return state.schema;
    },
    // // get message
    // getRegBsCollFromNuMessage(state) {
    //   return state.message;
    // }
};

// mutations
const mutations = {
    // set data list
    [SET_ROLE_DATA](state, result) {
        state.datalist = result;
    },
    //set item to datalist
    [ADD_ROLE_FROM_DATA](state, jschema) {
        state.datalist.push(jschema);
    },
    // set message
    // [SET_MESSAGE](state, Msg) {
    //   state.message = Msg;
    // },
    // unset message
    // [UNSET_MESSAGE](state) {
    //   state.message = "";
    // },
    // set action process
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    // unset action process
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    // set form schema
    [SET_ROLE_SCHEMA](state, schemaData) {
        state.schema = schemaData;
    },
    // unset form schema
    [UNSET_ROLE_DATA_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            role_name: '',
            description: '',
            status: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        };
    },
};

const actions = {
    // get data list
    callRoleData({ commit }, limit) {
        return new Promise(function(resolve, reject) {
            // let url = `${RoleApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.get(RoleApi, { params: limit })
                .then(function(response) {
                    commit('UNSET_LOADING');
                    var result = response.data.data;
                    commit('SET_ROLE_DATA', result);
                    // return state.datalist;
                    resolve(response.data);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    // delete data
    deleteRoleItem({ commit }, item) {
        console.log('delete called');
        let url = `${RoleApi}/${item}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.delete(url)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        console.log('in action delete');
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        resolve(response.data.message);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                            timeout: 10000,
                        });
                        reject(response.data.message);
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    console.log('in state : ', error);
                    reject();
                });
        });
    },
    // save data
    saveRoleData({ commit }, schema) {
        console.log('action schema', schema);
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        // data['status'] = 1;
        // commit("SET_ACTION_PROCESS");
        console.log('action data', data);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.post(RoleApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        console.log('in action save');
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');
                        resolve(response.data.message);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                            timeout: 10000,
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject(response.data.message);
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    console.log('in state : ', error);
                    reject();
                });
        });
    },
    // edit/update data
    editRoleData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        const url = `${RoleApi}/${data.id}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.put(url, data)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        console.log('in action edit');
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');
                        resolve(response.data.message);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                            timeout: 10000,
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject(response.data.message);
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    console.log('in state : ', error);
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