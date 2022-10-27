/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RescrutinyNoticeApi, ExamTimeLineUrl } from '@/store/api';

// mutation types
import {
    SET_TIMELINE_SETUP_DATA,
    SET_TIMELINE_SETUP_SCHEMA,
    UNSET_TIMELINE_SETUP_SCHEMA,
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
        year: '',
        activity_id: '',
        notice: '',
        start_date: '',
        end_date: '',
        notice_url: '',
        name: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getTimelineSetupData(state) {
        return state.datalist;
    },
    getTimelineSetupSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_TIMELINE_SETUP_DATA](state, result) {
        state.datalist = result;
    },

    // set form schema
    [SET_TIMELINE_SETUP_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        //state.schema.exam_code = schemaData.exam_code.toString();
        state.schema.activity_id = parseInt(state.schema.activity_id);
    },
    // unset form schema
    [UNSET_TIMELINE_SETUP_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            exam_code: '',
            year: '',
            activity_id: '',
            notice: '',
            start_date: '',
            end_date: '',
            notice_url: '',
            name: '',
        };
    },
};

const actions = {
    //all data
    searchExamTimeLineData({ commit }, param) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            });

            // loading Opening
            Axios.get(ExamTimeLineUrl, {
                    params: param,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('timeline-setup-->', result);
                    commit('SET_TIMELINE_SETUP_DATA', result);
                    // console.log("am I in then", response);
                    // return state.datalist;
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    //resolve ();
                    reject();
                });
        });
    },
    // delete data
    deleteRescrutinyNoticeItem({ commit }, item) {
        let url = `${RescrutinyNoticeApi}/${item}`;
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
    saveTimelineSetUpData({ commit }, formData) {
        //let data = formData;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(ExamTimeLineUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
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
    editTimelineSetUpData({ commit }, schema) {
        // let data = schema.item;
        // // let l = data.get('id');
        // //let l = data.getAll('id');
        // for (var value of schema.form.values ()) {
        //   console.log (value);
        // }
        // // const url = `${ExamTimeLineUrl}/${data.id}`;

        // let form = new FormData ();
        // // var n = schema.form.get ('name');
        // var f = schema.form.get ('notice_url');
        // //console.log (n);
        // // form.set ('name', n);
        // form.set ('notice_url', f);
        // form.append ('activity_id', data.activity_id);
        // form.append ('notice', data.notice);
        // form.append ('start_date', data.start_date);
        // form.append ('end_date', data.end_date);
        // // form.append ('exam_code', data.exam_code);
        // // form.append ('year', data.year);
        // form.append ('exam_initiate_id', data.exam_initiate_id);
        // // form.append ('_method', 'PATCH');
        // console.log (...form);
        let data = schema;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(ExamTimeLineUrl, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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