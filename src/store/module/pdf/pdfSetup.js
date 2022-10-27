/* eslint-disable prettier/prettier */
import Axios from 'axios';

import { SET_PDF_SETUP_DATA } from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

import { Signature_Url } from '../../api';

const state = {
    schema: {
        id: '',
        name: '',
        image: '',
        type: '',
        created_at: '',
        updated_at: '',
        seal_no: '',
        designation: '',
        note: '',
    },
    datalist: [],
};

const getters = {
    // get data lsit
    getPDFSetupItem(state) {
        return state.datalist;
    },
    // get form schema
    getPDFSetupSchema(state) {
        return state.schema;
    },
};
const mutations = {
    //set data
    [SET_PDF_SETUP_DATA](state, result) {
        state.datalist = result;
    },
};
const actions = {
    //all data
    fetchPDFSetupData({ commit }) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading Opening
            Axios.get(Signature_Url)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_PDF_SETUP_DATA', result);
                    // console.log(response);
                    resolve(response);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    //save data
    savePDFSetupData({ commit }, formData) {
        console.log('save action ', formData);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading  Opening

            Axios.post(Signature_Url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('SUCCESS!!');
                    console.log('response', response);
                    resolve(response);
                })
                .catch(function() {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('FAILURE!!');
                });

            // get(IncourseApi, fd)
            //   .then(function(response) {
            //     // console.log("search:  in then ??");
            //     commit("UNSET_LOADING"); // loading Closing
            //     var result = response.data.data;
            //     console.log(response.data.data);
            //     commit("SET_PDF_SETUP_DATA", result);
            //     resolve();
            //   })
            //   .catch(function(error) {
            //     console.log("searchFormFillup: in catch ??");
            //     commit("UNSET_LOADING"); // loading Closing
            //     console.log(error);
            //     reject();
            //   });
        });
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};