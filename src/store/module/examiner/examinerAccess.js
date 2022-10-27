/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    ExaminerAccess,
    ExaminerGroupApi,
    ExaminerMonitoringApi,
    ExaminerReportApi,
    ExaminerMarkReportApi,
    HeadExaminerMarkReportApi,
    ExportExaminerHeadwiseApi,
    exHeadMonitorSum,
    ExportHeadExaminerScrutinizeApi,
    ExportExaminerScrutinizeApi
} from '../../api';

// mutation types
import {
    SET_EXAMINER_ACCESS_DATA,
    //  ADD_EXAMINER_ACCESS_DATA,
    SET_EXAMINER_ACCESS_SCHEMA,
    UNSET_EXAMINER_ACCESS_DATA_SCHEMA,
    SET_EXAMINER_ACCESS_GROUP_DATA,
    SET_EXAMINER_MONITORING_DATA,
    SET_EXAMINER_MONITORING_SUMM_DATA
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
        exam_code: '',
        exam_name: '',
        year: '',
        examinerList: [],
    },
    datalist: [],
    examinerMonitoringdata: [],
    examinerMonitoringSum: [],
    schemadashboard: {
        access: false,
        examiner_code: '9641',
        examiner_email: '13051',
        examiner_name: 'MD. SIDDIQUR RAHMAN',
        examiner_type: 'E',
        examiner_username: '13051',
        examiners: [],
        head_examiners: [{
            tims_id: '13050',
            examiner_code: '9640',
            examiner_name: 'AL Masud',
            examiner_username: '13050',
        }, ],
        papers: [],
        script_received_status: null,
        subjects: [{
            code: '10',
            title: 'BANGLA'
        }],
        tims_id: '13051',
        total_scan_qty: 18,
        total_script_qty: null,
    },
};

// getters
const getters = {
    // get data lsit
    getExaminerListItems(state) {
        return state.datalist;
    },
    // get data access list
    getExaminerAccessItems(state) {
        console.log("here in gettres");
        return state.schema.examinerList;
    },
    // get form schema
    getExaminerAccessSchema(state) {
        return state.schema;
    },
    // get data lsit
    getExaminerGroupItems(state) {
        return state.datalist;
    },

    getExaminerMonitoringData(state) {
        return state.examinerMonitoringdata;
    },
    getExaminerSchemaData(state) {
        return state.schemadashboard;
    },
    getExaminerMonitoringSum(state) {
        return state.examinerMonitoringSum;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_EXAMINER_ACCESS_GROUP_DATA](state, result) {
        state.datalist = result;
    },
    [SET_EXAMINER_ACCESS_DATA](state, result) {
        console.log("result state ", result);
        state.schema.examinerList = result;
        // console.log("state ", state.schema);
    },
    // set form schema
    [SET_EXAMINER_ACCESS_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        console.log('..set', schemaData);
        //state.schema.role_id = parseInt(state.schema.role_id);
    },
    // unset form schema
    [UNSET_EXAMINER_ACCESS_DATA_SCHEMA](state) {
        state.schema = {
            exam_code: '',
            year: '',
            examinerList: [],
        };
    },

    [SET_EXAMINER_MONITORING_DATA](state, result) {
        state.examinerMonitoringdata = result;
    },
    [SET_EXAMINER_MONITORING_SUMM_DATA](state, result) {
        state.examinerMonitoringSum = result;
    },
};

const actions = {
    // get data list
    fetchExaminerAccessData({
        commit
    }, searchParam) {
        // let url = `${ExaminerAccess}?exam_code=${data.exam_code}&year=${data.year}`;
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(ExaminerAccess, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('result ', result);
                    commit('SET_EXAMINER_ACCESS_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    // save data
    saveExaminerAccessData({
        commit
    }, accessItem) {
        // let url = `${ExaminerAccess}?role=${accessItem.role}`;
        // let url = `${ExaminerAccess}?exam_code=${accessItem.searchParam.exam_code}&year=${accessItem.searchParam.year}&exam_initiate_id=${accessItem.searchParam.exam_initiate_id}`;
        console.log(JSON.stringify(accessItem));
        //let data = accessItem.data;
        // let searchParam = {
        //     exam_code: accessItem.exam_code,
        //     year: accessItem.year,
        //     exam_initiate_id: accessItem.exam_initiate_id,
        // };
        // [('exam_code', 'year', 'exam_initiate_id')].forEach(e => delete data[e]);
        let data = accessItem;
        console.log(data);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(ExaminerAccess, data)
                .then(function(response) {
                    console.log('..res', response);
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        // commit("ADD_EXAMINER_ACCESS_DATA", accessItem);
                        commit('SET_SNACKBAR', {
                            msg: saveMsg,
                            color: 'green',
                        });
                        //commit("UNSET_FORMNOTIFY");
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        console.log('....else ');
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

    //examiner-group
    //after search data
    searchExaminerGroup({
        commit
    }, searchParam) {
        console.log('search Action --->', searchParam);
        let param = {
            exam_code: searchParam.exam_code,
            year: searchParam.year,
            exam_initiate_id: searchParam.exam_initiate_id,
            exam_type: searchParam.exam_type,
        };
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(ExaminerGroupApi, {
                    params: param,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(response.data.data);
                    commit('SET_EXAMINER_ACCESS_GROUP_DATA', result);
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

    fetchExaminerMonitoringData({
        commit
    }, searchParam) {
        console.log('search Action --->', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(ExaminerMonitoringApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_EXAMINER_MONITORING_DATA', result);
                    resolve(response.data.data);
                })
                .catch(function(error) {
                    console.log('searchFormFillup: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //only for examiner monitoring page
    fetchExaminerMonitoringItem({
        commit
    }, searchParam) {
        console.log('search Action --->', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(ExaminerMonitoringApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_EXAMINER_MONITORING_DATA', result);
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
    //monitoring summary
    fetchExaminerMonitoringSum({
        commit
    }, searchParam) {

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(exHeadMonitorSum, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_EXAMINER_MONITORING_SUMM_DATA', result);
                    resolve(response.data.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //head wise examiner export
    exportExaminerHeadwise({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportExaminerHeadwiseApi,
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
                    fileLink.download = 'examinerheadwise_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    exportHeadExaminerScrutinizewise({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportHeadExaminerScrutinizeApi,
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
                    fileLink.download = 'examinerheadwise_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },

    exportExaminerScrutinizewise({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportExaminerScrutinizeApi,
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
                    fileLink.download = 'examinerheadwise_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    downloadExaminerReport({
        commit
    }, searchParam) {
        // console.log("search Action --->", searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(ExaminerReportApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.setAttribute(
                        'download',
                        'downloadStm_' + Date.now() + '.pdf'
                    );
                    fileLink.setAttribute('target', '_blank');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(function(error) {
                    // console.log("searchFormFillup: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },

    downloadExaminerMarkReport({
        commit
    }, searchParam) {
        // console.log("search Action --->", searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(ExaminerMarkReportApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.setAttribute(
                        'download',
                        'downloadStm_' + Date.now() + '.pdf'
                    );
                    fileLink.setAttribute('target', '_blank');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(function(error) {
                    // console.log("searchFormFillup: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },

    downloadHeadExaminerMarkReport({
        commit
    }, searchParam) {
        searchParam.h_user_id = searchParam.user_id;
        delete searchParam.user_id;
        console.log('search Action --->', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(HeadExaminerMarkReportApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.setAttribute(
                        'download',
                        'downloadStm_' + Date.now() + '.pdf'
                    );
                    fileLink.setAttribute('target', '_blank');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(function(error) {
                    // console.log("searchFormFillup: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
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