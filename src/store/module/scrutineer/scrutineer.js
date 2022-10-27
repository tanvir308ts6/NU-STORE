/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    scrutinerApi,
    RescrutinerBySubPaperApi
} from '@/store/api';

// mutation types
import {
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_SCRUTINER_LIST_DATA,
    ADD_SCRUTIER_DATA,
    SET_SCRUTINER_SCHEMA,
    UNSET_SCRUTINER_SCHEMA,
} from '../../mutation-types';

// utilities
import {
    saveMsg,
    updateMsg,
    deleteMsg,
    failedMsg
} from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        exam_code: "",
        exam_year: "",
        name: "",
        designation_id: "",
        subject_code: "",
        subject_name: "",
        college_code: "",
        dist_code: "",
        h_ex_tmis_id: "",
        h_examiner_code: "",
        bank_name: "",
        branch_name: "",
        account_no: "",
        tmis_id: "",
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getScrutinerDataList(state) {
        return state.datalist;
    },
    getScrutinerSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_SCRUTINER_LIST_DATA](state, result) {
        state.datalist = result;
    },
    // set item to datalist
    [ADD_SCRUTIER_DATA](state, jschema) {
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
    [SET_SCRUTINER_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        state.schema.designation_id = schemaData.designation_id.toString();
    },
    // unset form schema
    [UNSET_SCRUTINER_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            exam_code: "",
            exam_year: "",
            name: "",
            designation_id: "",
            subject_code: "",
            subject_name: "",
            college_code: "",
            dist_code: "",
            h_ex_tmis_id: "",
            h_examiner_code: "",
            bank_name: "",
            branch_name: "",
            account_no: "",
            tmis_id: "",
        };
    },
};

const actions = {
    searchScrutineer({
        commit
    }, searchParam) {
        console.log('fdfdfd', JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(scrutinerApi, {
                    params: searchParam,
                })
                .then(function (response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_SCRUTINER_LIST_DATA', result);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('searchFormFillup: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    // get data list
    fetchScrutinerData({
        commit
    }, limit) {
        return new Promise(function (resolve, reject) {
            let url = `${scrutinerApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.get(url)
                .then(function (response) {
                    commit('UNSET_LOADING');
                    var result = response.data.data;
                    commit('SET_SCRUTINER_LIST_DATA', result);
                    resolve(response.data);
                })
                .catch(function (error) {
                    commit('UNSET_LOADING');
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    // delete data
    deleteScrutinerItem({
        commit
    }, item) {
        let url = `${scrutinerApi}/${item}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.delete(url)
                .then(function (response) {
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
                .catch(function (error) {
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
    saveScrutinerData({
        commit
    }, schema) {
        let data = schema;
        ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);

        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(scrutinerApi, data)
                .then(function (response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('ADD_SCRUTIER_DATA', schema);
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
                .catch(function (error) {
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
    editScrutinerData({
        commit
    }, schema) {
        commit('SET_ACTION_PROCESS');
        let data = schema;
        //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
        const url = `${scrutinerApi}/${data.id}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.put(url, data)
                .then(function (response) {
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
                .catch(function (error) {
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
    // //export
    // exportRescrutinerBySubPap({ commit }, searchParam) {
    //     commit('SET_LOADING', {
    //         color: 'primary',
    //     });
    //     // script-statement-download
    //     return new Promise((resolve, reject) => {
    //         Axios({
    //                 url: RescrutinerBySubPaperApi,
    //                 method: 'GET',
    //                 params: searchParam,
    //             })
    //             .then(response => {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 let url = response.data.data;
    //                 console.log(url);

    //                 // showing on a new tab
    //                 var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
    //                 fileLink.href = url; // assigning url to that
    //                 fileLink.download =
    //                     'rescrutinersubpaperwiseList_' + Date.now() + '.pdf'; // giving it a name
    //                 fileLink.target = '_blank'; // ensuring that it goes to the new tab
    //                 //After all that is done
    //                 document.body.appendChild(fileLink); // attaching the <a> tag to the document body
    //                 fileLink.click(); // finally clicking it
    //             })
    //             .catch(function(error) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 console.log('I am in error', error);
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