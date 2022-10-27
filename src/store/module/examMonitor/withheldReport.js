/* eslint-disable prettier/prettier */
import Axios from 'axios';

import { SET_WITHHELD_REPORT_DATA } from '../../mutation-types';

import { WithHeldReportUrl, WithHeldReportRevokeUrl,exportExplanationApi,exportExpelledApi } from '../../api';

const state = {
    datalist: [],
};

const getters = {
    getWithheldReportData(state) {
        return state.datalist;
    },
};
const mutations = {
    [SET_WITHHELD_REPORT_DATA](state, result) {
        state.datalist = result;
    },
};
const actions = {
    //all data
    searchWithHeldReport({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(WithHeldReportUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log('searchWithHeldReport', response.data.data);
                    commit('SET_WITHHELD_REPORT_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
      exportExplanation({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: exportExplanationApi,
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
                .catch(function (error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
         exportExpelledForm({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: exportExpelledApi,
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
                .catch(function (error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    withHeldReportRevoke({ commit }, param) {
        console.log(param);
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading Opening
            Axios.post(WithHeldReportRevokeUrl, param)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    // var result = response.data.data;
                    // console.log("in startRollGenerate response: ", response.data);
                    console.log(response);
                    commit('SET_SNACKBAR', {
                        msg: 'Revoked Successfully',
                        color: 'green',
                    });
                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    commit('SET_SNACKBAR', {
                        msg: 'Revoke Process Not Successful. Process failed',
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    withHeldReportedStudentAdd({ commit }, param) {
        // console.log(param);
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading Opening
            Axios.post(WithHeldReportUrl, param)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('spsp::', response);
                    // var result = response.data.data;
                    // console.log("in startRollGenerate response: ", response.data);
                    if (response.data.status == 'error') {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        reject();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        resolve();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // console.log(error);
                    commit('SET_SNACKBAR', {
                        msg: 'Revoke Process Not Successful. Process failed',
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