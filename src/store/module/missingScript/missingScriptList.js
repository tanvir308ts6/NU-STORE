/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { MissingScriptApi } from '../../api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_MISSING_SCRIPT_DATA,
    ADD_MISSING_SCRIPT_DATA,
    SET_MISSING_SCRIPT_SCHEMA,
    UNSET_MISSING_SCRIPT_SCHEMA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        script_sl: '',
        reg_no: '',
        student_name: '',
        college_code: '',
        college_name: '',
        exam_code: '',
        exam_name: '',
        paper_code: '',
        year: '',
        type: '',
        exam_initiate_id: '',
        status: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getMissingScriptList(state) {
        return state.datalist;
    },
    // get form schema
    getMissingScriptSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_MISSING_SCRIPT_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_MISSING_SCRIPT_DATA](state, jschema) {
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
    [SET_MISSING_SCRIPT_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.exam_id = parseInt(state.schema.exam_id);
    },
    // unset form schema
    [UNSET_MISSING_SCRIPT_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            script_sl: '',
            reg_no: '',
            student_name: '',
            college_code: '',
            college_name: '',
            exam_code: '',
            exam_name: '',
            paper_code: '',
            year: '',
            type: '',
            exam_initiate_id: '',
            status: '',
        };
    },
};

const actions = {
    // get data list
    fetchMissingScriptData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(MissingScriptApi)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_MISSING_SCRIPT_DATA', result);
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
    deleteMissingScriptItem({ commit }, item) {
        console.log('delete ac', item);
        let url = `${MissingScriptApi}/${item}`;
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
    saveMissingScriptData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach((e) => delete data[e]);
        data['status'] = 1;
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(MissingScriptApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_MISSING_SCRIPT_DATA', schema);
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
    searchMissingScriptData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(MissingScriptApi, {
                params: searchParam,
            })

            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(response.data.data);
                    commit('SET_MISSING_SCRIPT_DATA', result);
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
    // edit/update data
    editMissingScriptData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        console.log('DATA ACTION ', data);
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${MissingScriptApi}/${data.id}`;
        console.log(MissingScriptApi + ' bef url', url);

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