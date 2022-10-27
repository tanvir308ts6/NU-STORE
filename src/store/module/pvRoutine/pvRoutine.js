/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { PVRoutineApi } from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_PV_ROUTINE_DATA,
    ADD_PV_ROUTINE_DATA,
    SET_PV_ROUTINE_SCHEMA,
    UNSET_PV_ROUTINE_SCHEMA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        date: '',
        end_date: '',
        year: '',
        exam: '',
        exam_name: '',
        seal_no: '',
        type: '2',
        exam_initiate_id: '',
        type_description: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getPVRoutineList(state) {
        return state.datalist;
    },
    // get form schema
    getPVRoutineSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_PV_ROUTINE_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_PV_ROUTINE_DATA](state, jschema) {
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
    [SET_PV_ROUTINE_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        // state.schema.exam_id = schemaData.exam_id.toString();
        // state.schema.center_id = parseInt(state.schema.center_id);
        // state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
    },
    // unset form schema
    [UNSET_PV_ROUTINE_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            date: '',
            end_date: '',
            year: '',
            exam: '',
            exam_name: '',
            seal_no: '',
            type: '2',
            exam_initiate_id: '',
            type_description: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        };
    },
};

const actions = {
    // get data list
    fetchPVRoutineData({ commit }, limit) {
        return new Promise(function(resolve, reject) {
            let url = `${PVRoutineApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.get(url)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    var result = response.data.data;
                    commit('SET_PV_ROUTINE_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING');
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    // delete data
    deletePVRoutineItem({ commit }, item) {
        let url = `${PVRoutineApi}/${item}`;
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
    savePVRoutineData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        data['status'] = 0;
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(PVRoutineApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_PV_ROUTINE_DATA', schema);
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
    editPVRoutineData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${PVRoutineApi}/${data.id}`;
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
    //after search data
    searchPVRoutineData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(PVRoutineApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(response.data.data);
                    commit('SET_PV_ROUTINE_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    console.log('searchFormFillup: in catch ??');
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