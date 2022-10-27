/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_FORM_FILLUP_DATA,
    UNSET_FORM_FILLUP_DATA,
    SET_FORM_FILLUP_COLLEGEWISE_DATA,
    UNSET_FORM_FILLUP_COLLEGEWISE_DATA,
    SET_FORM_FILLUP_CURRENT_ITEM_DETAILS,
    SET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS,
    UNSET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS,
    SET_COLLEGEWISE_STD_COUNT_DATA,
    UNSET_COLLEGEWISE_STD_COUNT_DATA,
} from '../../mutation-types';

import {
    FormFillUpFetchUrl,
    FormFillUpCollegeWiseFetchUrl,
    FormFillUpAllUrl,
    FormFillUpColWiseMainUrl,
    FormFillUpColWiseDetailsUrlUrl,
    CollegeListDetailsUrl,
} from '../../api';
//
const state = {
    datalist: [],
    // main
    dataListColWise: [],
    // details
    dataListColWiseDetails: [],
    // current
    detailCurrentItem: {},
    //for center allocation
    collegeList: [],
};

const getters = {
    getFormFillupItem(state) {
        return state.datalist;
    },
    getFormFillupCollgeWiseItem(state) {
        return state.dataListColWise;
    },
    getFormFillupCollgeWiseDetailsItem(state) {
        return state.dataListColWiseDetails;
    },
    getCurrentDetailItem(state) {
        return state.detailCurrentItem;
    },
    getCollegeWiseStdCount(state) {
        return state.collegeList;
    },
};
const mutations = {
    [SET_FORM_FILLUP_DATA](state, result) {
        state.datalist = result;
    },
    [UNSET_FORM_FILLUP_DATA](state) {
        state.datalist = [];
    },
    // MAIN
    [SET_FORM_FILLUP_COLLEGEWISE_DATA](state, result) {
        state.dataListColWise = result;
    },
    [UNSET_FORM_FILLUP_COLLEGEWISE_DATA](state) {
        state.dataListColWise = [];
    },
    // DETAILS
    [SET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS](state, result) {
        state.dataListColWiseDetails = result;
    },
    [UNSET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS](state) {
        state.dataListColWiseDetails = [{}];
    },
    // CURRENT
    [SET_FORM_FILLUP_CURRENT_ITEM_DETAILS](state, item) {
        state.detailCurrentItem = item;
    },
    [SET_COLLEGEWISE_STD_COUNT_DATA](state, collegList) {
        state.collegeList = collegList;
    },
    [UNSET_COLLEGEWISE_STD_COUNT_DATA](state) {
        state.collegeList = [];
    },
};
const actions = {
    searchFormFillup({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(FormFillUpAllUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_FORM_FILLUP_DATA', result);
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

    searchFormFillupCollegeWise({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(FormFillUpColWiseMainUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('˜˜˜˜', response.data.data);
                    commit('SET_FORM_FILLUP_COLLEGEWISE_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    searchFormFillupCollegeWiseDetails({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            // commit("SET_LOADING", {
            //   color: "primary"
            // });
            // loading  Opening
            console.log(
                'FormFillUpColWiseDetailsUrlUrl::',
                FormFillUpColWiseDetailsUrlUrl
            );
            Axios.get(FormFillUpColWiseDetailsUrlUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // commit("UNSET_LOADING"); // loading Closing
                    var result = response.data.data;
                    console.log('˜˜details-response˜˜', response);
                    commit('SET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    fetchFormFillupCollegeWiseSubjectWiseCount({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(CollegeListDetailsUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('˜˜˜˜', response.data.data);
                    commit('SET_COLLEGEWISE_STD_COUNT_DATA', result);
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