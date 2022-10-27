/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { AnsCollFromRegFinalApi } from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_NU_AS_COLL_FROM_REG_FINAL_DATA,
    ADD_NU_AS_COLL_FROM_REG_FINAL_DATA,
    SET_NU_AS_COLL_FROM_REG_FINAL_SCHEMA,
    UNSET_NU_AS_COLL_FROM_REG_FINAL_SCHEMA,
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
        nu_as_dist_to_reg_id: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
        reg_center_code: '',
        reg_center_name: '',
        exam_name: '',
        exam_code: '',
        status: 0,
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
    getNuAsCollFromRegFinalDataList(state) {
        return state.datalist;
    },
    // get form schema
    getNuAsCollFromRegFinalSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_NU_AS_COLL_FROM_REG_FINAL_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_NU_AS_COLL_FROM_REG_FINAL_DATA](state, jschema) {
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
    [SET_NU_AS_COLL_FROM_REG_FINAL_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.exam_id = parseInt(state.schema.exam_id);
        // state.schema.regional_center_id = parseInt(
        //     state.schema.regional_center_id
        // );
    },
    // unset form schema
    [UNSET_NU_AS_COLL_FROM_REG_FINAL_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            script_qty: '',
            date: '',
            nu_as_dist_to_reg_id: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
            reg_center_code: '',
            reg_center_name: '',
            exam_name: '',
            exam_code: '',
            status: 0,
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
    fetchNuAsCollFromRegFinalData({ commit }, searchParam) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(AnsCollFromRegFinalApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_NU_AS_COLL_FROM_REG_FINAL_DATA', result);
                    resolve(response.data);
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
    deleteNuAsCollFromRegFinalItem({ commit }, item) {
        let url = `${AnsCollFromRegFinalApi}/${item}`;
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
    saveNuAsCollFromRegFinalData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);
        data['status'] = 0;
        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(AnsCollFromRegFinalApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_NU_AS_COLL_FROM_REG_FINAL_DATA', schema);
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
    // edit/update data
    editNuAsCollFromRegFinalData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${AnsCollFromRegFinalApi}/${data.id}`;
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