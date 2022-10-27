/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { MenuListApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_MENU_DATA,
    ADD_MENU_DATA,
    SET_MENU_SCHEMA_DATA,
    UNSET_MENU_SCHEMA_DATA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        menu_name: '',
        sl_no: '',
        status: 1,
        menu_url: '',
        tag_name: '',
        icon: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getMenuDataList(state) {
        return state.datalist;
    },
    // get form schema
    getMenuSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_MENU_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_MENU_DATA](state, jschema) {
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
    [SET_MENU_SCHEMA_DATA](state, schemaData) {
        state.schema = schemaData;
        state.schema.status = parseInt(state.schema.status);
    },
    // unset form schema
    [UNSET_MENU_SCHEMA_DATA](state) {
        state.schema = {
            id: state.schema.id,
            menu_name: '',
            sl_no: '',
            status: 1,
            menu_url: '',
            tag_name: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        };
    },
};

const actions = {
    // get data list
    fetchMenuData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(MenuListApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_MENU_DATA', result);
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
    deleteMenuItem({ commit }, item) {
        let url = `${MenuListApi}/${item}`;
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
    // save data
    saveMenuData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        //data["status"] = 0;
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(MenuListApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_MENU_DATA', schema);
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
    // edit/update data
    editMenuData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        console.log('DATA ACTION ', data);
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${MenuListApi}/${data.id}`;
        console.log(MenuListApi + ' bef url', url);

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