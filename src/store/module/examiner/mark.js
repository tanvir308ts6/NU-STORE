/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    MarksApi,
    MarkCountByHEApi,
    MarkCountByEApi,
    MarkCountByStdApi,
} from '../../api';

// mutation types
import {
    SET_MARK_DATA,
    SET_MARK_COUNT_BY_HE,
    SET_MARK_COUNT_BY_E,
    UNSET_MARK_COUNT_BY_E,
    SET_MARK_COUNT_BY_STD,
    UNSET_MARK_COUNT_BY_STD,
} from '../../mutation-types';

const state = {
    datalist: [],
    markCountListByHeadExaminer: [],
    markCountListByExaminer: [],
    markCountListByStd: [],
};

// getters
const getters = {
    // get data lsit
    getMarksList(state) {
        return state.datalist;
    },
    getMarkCountListByHeadExaminer(state) {
        return state.markCountListByHeadExaminer;
    },
    getMarkCountListByExaminer(state) {
        return state.markCountListByExaminer;
    },
    getMarkCountListByStd(state) {
        return state.markCountListByStd;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_MARK_DATA](state, result) {
        state.datalist = result;
    },
    [SET_MARK_COUNT_BY_HE](state, result) {
        state.markCountListByHeadExaminer = result;
    },
    [SET_MARK_COUNT_BY_E](state, result) {
        state.markCountListByExaminer = result;
    },
    [UNSET_MARK_COUNT_BY_E](state, result) {
        state.markCountListByExaminer = [];
    },
    [SET_MARK_COUNT_BY_STD](state, result) {
        state.markCountListByStd = result;
    },
    [UNSET_MARK_COUNT_BY_STD](state, result) {
        state.markCountListByStd = [];
    },
};

const actions = {
    // get data list
    callMarksData({ commit, state }, searchParam) {
        // console.log("ddsdsd");
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise(function(resolve, reject) {
            Axios.get(MarksApi, { params: searchParam })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_MARK_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchMarks({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(MarksApi, {
                    params: searchParam,
                })
                // Axios.post(LogData, params)
                .then(function(response) {
                    console.log('searchMarks:  in then ??');
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('searchMarks--->', response.data.data);
                    commit('SET_MARK_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    // console.log("searchMarks: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },
    fetchMarkCountByHeadExaminer({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(MarkCountByHEApi, {
                    params: searchParam,
                })
                // Axios.post(LogData, params)
                .then(function(response) {
                    // console.log("searchMarks:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log("searchMarks--->", response.data.data);
                    commit('SET_MARK_COUNT_BY_HE', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    // console.log("searchMarks: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },
    fetchMarkCountByExaminer({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(MarkCountByEApi, {
                    params: searchParam,
                })
                // Axios.post(LogData, params)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'error') {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                    }

                    var result = response.data.data;
                    commit('SET_MARK_COUNT_BY_E', result);
                    resolve();
                })
                .catch(function(error) {
                    // console.log("searchMarks: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },
    fetchMarkCountByStd({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(MarkCountByStdApi, {
                    params: searchParam,
                })
                // Axios.post(LogData, params)git
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'error') {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                    }
                    console.log('then', response);
                    var result = response.data.data;
                    commit('SET_MARK_COUNT_BY_STD', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    //console.log('err', response);
                    // console.log("searchMarks: in catch ??");
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    reject();
                });
        });
    },
    //
};

export default {
    state,
    getters,
    actions,
    mutations,
};