/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { rescrutinerApi, RescrutinerBySubPaperApi } from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_RESCRUTINER_LIST_DATA,
    ADD_RESCRUTINER_DATA,
    SET_RESCRUTINER_SCHEMA,
    UNSET_RESCRUTINER_SCHEMA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        exam_code: '',
        exam_year: '',
        tmis_id: '',
        name: '',
        nid_no: '',
        email: '',
        mobile: '',
        subject_code: '',
        paper_code: '',
        designation: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
        role_id: 42,
        user_type: 42,
        username: '',
        password: '',
        confirmedPassword: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRescrutinerDataList(state) {
        return state.datalist;
    },
    getRescrutinerSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINER_LIST_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_RESCRUTINER_DATA](state, jschema) {
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
    [SET_RESCRUTINER_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.exam_code = schemaData.exam_code.toString();
    },
    // unset form schema
    [UNSET_RESCRUTINER_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            exam_code: '',
            exam_year: '',
            tmis_id: '',
            name: '',
            email: '',
            mobile: '',
            nid_no: '',
            paper_code: '',
            designation: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
            role_id: 42,
            user_type: 42,
            username: '',
            password: '',
            confirmedPassword: '',
        };
    },
};

const actions = {
    searchRescrutiner({ commit }, searchParam) {
        console.log('fdfdfd', JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(rescrutinerApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_RESCRUTINER_LIST_DATA', result);
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
    // get data list
    fetchRescrutinerData({ commit }, limit) {
        return new Promise(function(resolve, reject) {
            let url = `${rescrutinerApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.get(url)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    var result = response.data.data;
                    commit('SET_RESCRUTINER_LIST_DATA', result);
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
    deleteRescrutinerItem({ commit }, item) {
        let url = `${rescrutinerApi}/${item}`;
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
    saveRescrutinerData({ commit }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);

        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(rescrutinerApi, data)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_RESCRUTINER_DATA', schema);
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
    editRescrutinerData({ commit }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${rescrutinerApi}/${data.id}`;
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
    //export
    exportRescrutinerBySubPap({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinerBySubPaperApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download =
                        'rescrutinersubpaperwiseList_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
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