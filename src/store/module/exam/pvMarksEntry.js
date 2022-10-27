/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_PRACTICAL_MARK_DATA,
    SET_PRACTICAL_EXAM_DATA,
    SET_VIVA_MARK_DATA,
    SET_VIVA_EXAM_DATA,
    SET_EDITED_LOG_DATA,
    SET_VIVA_EDITED_LOG_DATA,
    UNSET_PRACTICAL_MARK_DATA,
    UNSET_VIVA_MARK_DATA,
} from '@/store/mutation-types';

import {
    practicalMark_SubmitUrl,
    practicalExam_FetchUrl,
    vivaMark_SubmitUrl,
    vivaExam_FetchUrl,
    editedLogFetchUrl,
    vivaExamEditedLogApi,
    PracticalMarkListDownload,
    VivaMarkListDownload,
} from '@/store/api';
import {
    failedMsg,
    loadMsg,
    saveMsg,
    updateMsg,
    deleteMsg,
} from '@/store/erpUtil';

// initial state

const state = {
    schema: {
        id: 2,
        reg_no: '',
        std_id: '',
        exam_roll: '',
        college_code: '',
        college_name: '',
        center_code: '',
        center_name: '',
        subject_code: '',
        subject_name: '',
        paper_code: '',
        paper_name: '',
        mark: '',
        full_marks: '',
        exam_initiate_id: '',
        exam_code: '',
        exam_name: '',
        year: '',
        student_name: '',
    },
    datalist: [],
    marklist: [],
    vexamlist: [],
    vmarklist: [],
    editedDatalist: [],
    vivaEditedDatalist: [],
};
const getters = {
    getMarkList(state) {
        return state.marklist;
    },
    getDataList(state) {
        return state.datalist;
    },
    getEditedDataList(state) {
        return state.editedDatalist;
    },
    getVivaEditedDataList(state) {
        return state.vivaEditedDatalist;
    },
    getSchema(state) {
        return state.schema;
    },
    getVMarkList(state) {
        return state.vmarklist;
    },
    getVDataList(state) {
        return state.vexamlist;
    },
};
// mutations
const mutations = {
    // set mark list
    [SET_PRACTICAL_MARK_DATA](state, result) {
        state.marklist = result;
    },
    [UNSET_PRACTICAL_MARK_DATA](state) {
        state.marklist = [];
    },
    // set data list
    [SET_PRACTICAL_EXAM_DATA](state, result) {
        state.datalist = result;
    },
    // set mark list
    [SET_VIVA_MARK_DATA](state, result) {
        state.vmarklist = result;
    },
    [UNSET_VIVA_MARK_DATA](state) {
        state.vmarklist = [];
    },
    // set data list
    [SET_VIVA_EXAM_DATA](state, result) {
        state.vexamlist = result;
    },
    [SET_EDITED_LOG_DATA](state, result) {
        state.editedDatalist = result;
    },
    [SET_VIVA_EDITED_LOG_DATA](state, result) {
        state.vivaEditedDatalist = result;
    },
};
// Actions
const actions = {
    //after search data
    searchPracticalExamData({ commit }, searchParam) {
        console.log('search Action: searchPracticalExamData', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(practicalExam_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_PRACTICAL_EXAM_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    fetchEditedLogData({ commit }, searchParam) {
        console.log('search Action: fetchEditedLogData', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(editedLogFetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_EDITED_LOG_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    submitPVMarks({ commit }, pvMarks) {
        console.log('action: submitPVMarks', pvMarks);

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', { color: 'primary' }); // loading Opening
            Axios.post(practicalMark_SubmitUrl, pvMarks)
                .then(function(response) {
                   if (response.data.message === "Mark uploaded successfully! But skipped 1 scripts") {
                    console.log("error")
                    commit("SET_SNACKBAR", {
                        msg: "invalid marks unchaged",
                        color: "red"
                  });
                }
                    //console.log(response)
                    commit('UNSET_LOADING'); // loading Closing
                    //   if (response.data.status == "success") {
                    //   console.log("in submitPVMarks if");
                    // commit('SET_SNACKBAR', {
                    //     msg: response.data.message,
                    //     color: 'green',
                    // });
                    resolve();

                    //   }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    console.log('in submitPVMarks error');
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    searchPracticalMarks({ commit }, searchParam) {
        console.log('action ; searchPracticalMarks', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', { color: 'primary' }); // loading Opening
            Axios.get(practicalMark_SubmitUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    //console.log(response)
                    commit('UNSET_LOADING'); // loading Closing

                    var result = response.data.data;
                    commit('SET_PRACTICAL_MARK_DATA', result);
                    // commit('SET_SNACKBAR', {
                    //     msg: response.data.message,
                    //     color: 'green',
                    // });
                    console.log('RETUR Data..', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    console.log('in submitP error');
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },

    //Viva part
    //after search data
    searchVivaExamData({ commit }, searchParam) {
        console.log('search Action: searchVivaExamData', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(vivaExam_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_VIVA_EXAM_DATA', result);
                    // commit('SET_SNACKBAR', {
                    //     msg: 'SUCCESSFUL SEARCH',
                    //     color: 'green',
                    // });
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    fetchVivaEditedLogData({ commit }, searchParam) {
        console.log('search Action: fetchVivaEditedLogData', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(vivaExamEditedLogApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_VIVA_EDITED_LOG_DATA', result);
                    // commit('SET_SNACKBAR', {
                    //     msg: 'SUCCESSFUL SEARCH',
                    //     color: 'green',
                    // });
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    //submit mark
    submitVivaMarks({ commit }, pvMarks) {
        // console.log("mitu submit v mark", pvMarks);
        //const token = JSON.parse(sessionStorage.getItem('data'));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', { color: 'primary' }); // loading Opening
            Axios.post(vivaMark_SubmitUrl, pvMarks)
                // , {
                //     headers: { Authorization: `Bearer ${token}` },
                // }
                .then(function(response) {
                    commit('UNSET_LOADING'); 
                    if (response.data.message === "Mark uploaded successfully! But skipped 1 scripts") {
                    console.log("error")
                    commit("SET_SNACKBAR", {
                        msg: "invalid marks unchaged",
                        color: "red"
                  });
                }
                    // loading Closing
                    // if (response.data.status == "success") {
                    // console.log("in submit if");
                   
                    resolve(response.data.message);
                    // }
                    // else {
                    //   console.log("in submit else");
                    //   commit("SET_SNACKBAR", {
                    //     msg: response.data.message,
                    //     color: "red",
                    //     timeout: 10000,
                    //   });
                    //   reject();
                    // }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    console.log('in submit error');
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    submitFinalVivaMarks({ commit }, pvMarks) {
        // console.log("mitu submit v mark", pvMarks);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', { color: 'primary' }); // loading Opening
            Axios.post(vivaMark_SubmitUrl, pvMarks)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    // if (response.data.status == "success") {
                    // console.log("in submit if");
                    commit('SET_SNACKBAR', {
                        msg: response.data.message,
                        color: 'green',
                    });
                    resolve(response.data);
                    // }
                    // else {
                    //   console.log("in submit else");
                    //   commit("SET_SNACKBAR", {
                    //     msg: response.data.message,
                    //     color: "red",
                    //     timeout: 10000,
                    //   });
                    //   reject();
                    // }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    console.log('in submit error');
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    //export practical mark
    downloadPracticalMarksListData({ commit }, searchParam) {
        console.log('api  SUCCESSFUL');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(PracticalMarkListDownload, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing

                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');

                    fileLink.href = url;
                    fileLink.download = 'PVMarkList_' + Date.now() + '.pdf';
                    fileLink.target = '_blank';
                    document.body.appendChild(fileLink);
                    fileLink.click();

                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    downloadVivaMarksListData({ commit }, searchParam) {
        console.log('api  SUCCESSFUL');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(VivaMarkListDownload, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing

                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');

                    fileLink.href = url;
                    fileLink.download = 'PVMarkList_' + Date.now() + '.pdf';
                    fileLink.target = '_blank';
                    document.body.appendChild(fileLink);
                    fileLink.click();

                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //get marks
    searchVivaMarks({ commit }, searchParam) {
        console.log('mitu viva in Marks', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', { color: 'primary' }); // loading Opening
            Axios.get(vivaMark_SubmitUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    //console.log(response)
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('in submitv if');
                    var result = response.data.data;
                    commit('SET_VIVA_MARK_DATA', result);
                    // commit('SET_SNACKBAR', {
                    //     msg: response.data.message,
                    //     color: 'green',
                    // });
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    console.log('in submitP error');
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
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