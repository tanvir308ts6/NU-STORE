/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';
const token = localStorage.getItem('token');
if (token) {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// apis
import {
    onlineCertificateSignupUrl,
    orgLoginUrl,
    updateOrganizationProfile,
    sendOrgEmail,
    ChangeOrganizationPassword, frontendBaseUrl, organizationPasswordReset,
} from '../api'

// mutation types
import { SET_ROLE_DETAILS_DATA } from '../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        password: '',
        username: '',
        name: '',
        organization_name: '',
        address: '',
        email: '',
        mobile: '',
        confirmedPassword: '',
    },
    roleDetailslist: [],
};

// getters
const getters = {
    // get data lsit
    getSignupItems(state) {
        return state.roleDetailslist;
    },
    // get form schema
    getSignupSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    // [SET_ROLE_DETAILS_DATA](state, result) {
    //     state.roleDetailslist = result;
    // },
    // // set item to datalist
    // [ADD_ROLE_DETAILS_DATA](state, jschema) {
    //     state.roleDetailslist.push(jschema);
    // },
};

const actions = {
    // save data
    saveSignupData({ commit }, item) {
        // let url = `${onlineCertificateSignupUrl}?role=${roleItem.role}`;
        // console.log(roleItem);
        let data = item;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(onlineCertificateSignupUrl, data)
                .then(function (response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        //commit('ADD_ROLE_DETAILS_DATA', item);
                        commit('SET_SNACKBAR', {
                            msg: saveMsg,
                            color: 'green',
                        });
                        //commit("UNSET_FORMNOTIFY");
                        resolve(response.data.message);
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

    updateOrganizationProfile(state,data){
        Axios.post(updateOrganizationProfile,data);
    },
    ChangeOrganizationPassword(state,data){
        Axios.post(ChangeOrganizationPassword,data);
    },
    sendOrganizationEmail({commit,state},data){
        var params = new URLSearchParams();
        params.append("email", data.email);
        params.append("base_url", frontendBaseUrl);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(sendOrgEmail,params).then(function (response) {
                commit('UNSET_LOADING'); // loading Closing
                if (response.data.status === 'success') {
                    //commit('ADD_ROLE_DETAILS_DATA', item);
                    commit('SET_SNACKBAR', {
                        msg: saveMsg,
                        color: 'green',
                    });
                    //commit("UNSET_FORMNOTIFY");
                    resolve(response.data.message);
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
    resetOrganizationPassword({commit,state},data){
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
        Axios.post(organizationPasswordReset + '/' + data.reset_code ,data)
        .then(function (response) {
            commit('UNSET_LOADING'); // loading Closing
            if (response.data.status === 'success') {
                //commit('ADD_ROLE_DETAILS_DATA', item);
                commit('SET_SNACKBAR', {
                    msg: saveMsg,
                    color: 'green',
                });
                //commit("UNSET_FORMNOTIFY");
                resolve(response.data.message);
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};