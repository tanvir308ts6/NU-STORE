/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_ABSENT_REPO_WTHLD,
    SET_ABSENT_REPO_WTHLD_CEN,
    SET_ABSENT_REPO_WTHLD_COLL,
    SET_ABSENT_REPO_WTHLD_SUB,
    SET_ABSENT_REPO_WTHLD_PAP,
} from '../../mutation-types';

import {
    AbsentReportWithheldApi,
    AbsentReportWithCenWiseApi,
    AbsentReportWithCollWiseApi,
    AbsentReportWithSubWiseApi,
    AbsentReportWithPapWiseApi,
} from '../../api';

const state = {
    schema: {
        id: '',
        reg_no: '',
        admission_roll: '',
        name: '',
        name_bn: '',
        father_name: '',
        father_name_bn: '',
        mother_name: '',
        mother_name_bn: '',
        session_year: '',
        session_year_expire: '',
        degree_code: '',
        degree_group_code: '',
        college_code: '',
        subject_code: '',
        exam_code: '',
        exam_name: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        student_type: '',
        gender: '',
        photo_url: '',
        admission_score: '',
        merit_position: '',
        created_by: '',
        updated_by: '',
        deleted_by: '',
        created_at: '',
        updated_at: '',
        exam_title: '',
        college_name: '',
        session: '',
        year: '',
        total: '',
    },
    datalist: [],
    cendatalist: [],
    colldatalist: [],
    subdatalist: [],
    papdatalist: [],
};

const getters = {
    // get  list
    getAbsReportedWithheldList(state) {
        return state.datalist;
    },
    // get  list center
    getAbsReportedWithheldCenList(state) {
        return state.cendatalist;
    },
    // get  list coll
    getAbsReportedWithheldCollList(state) {
        return state.colldatalist;
    },
    // get  list sub
    getAbsReportedWithheldSubList(state) {
        return state.subdatalist;
    },
    // get  list pap
    getAbsReportedWithheldPapList(state) {
        return state.papdatalist;
    },
};
const mutations = {
    //set data cen
    [SET_ABSENT_REPO_WTHLD](state, result) {
        state.datalist = result;
    },
    //set data cen
    [SET_ABSENT_REPO_WTHLD_CEN](state, result) {
        state.cendatalist = result;
    },
    //set data col
    [SET_ABSENT_REPO_WTHLD_COLL](state, result) {
        state.colldatalist = result;
    },
    //set data sub
    [SET_ABSENT_REPO_WTHLD_SUB](state, result) {
        state.subdatalist = result;
    },
    //set data pap
    [SET_ABSENT_REPO_WTHLD_PAP](state, result) {
        state.papdatalist = result;
    },
};
const actions = {
    //after search data
    fetchAbsReportedWithheldData({ commit }, searchParam) {
        console.log('act...');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AbsentReportWithheldApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_ABSENT_REPO_WTHLD', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //after search data center wise
    searchAbsReportedWithheldData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AbsentReportWithCenWiseApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_ABSENT_REPO_WTHLD_CEN', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchAbsReportedWithheldDataColl({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AbsentReportWithCollWiseApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('AbsentReportWithCollWiseApi', response.data.data);
                    commit('SET_ABSENT_REPO_WTHLD_COLL', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchAbsReportedWithheldDataSub({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AbsentReportWithSubWiseApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('AbsentReportWithSubWiseApi', response.data.data);
                    commit('SET_ABSENT_REPO_WTHLD_SUB', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchAbsReportedWithheldDataPap({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(AbsentReportWithPapWiseApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('AbsentReportWithPapWiseApi', response.data.data);
                    commit('SET_ABSENT_REPO_WTHLD_PAP', result);
                    resolve(response.data);
                })
                .catch(function(error) {
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