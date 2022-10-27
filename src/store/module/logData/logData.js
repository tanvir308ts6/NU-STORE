/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_LOG_DATA,
    SET_AUDIT_ACTIONS,
    SET_AUDIT_USERS,
    SET_AUDIT_MODULES,
} from '../../mutation-types';

import {
    LogData,
    AuditActionsURL,
    AuditUsersURL,
    AuditModulesURL,
    ExportLogData,
} from '../../api';
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
    logData: [],
    auditActions: [],
    auditUsers: [],
    auditModules: [],
};
const getters = {
    getLogData(state) {
        return state.logData;
    },
    getAuditActions(state) {
        return state.auditActions;
    },
    getAuditUsers(state) {
        return state.auditUsers;
    },
    getAuditModules(state) {
        return state.auditModules;
    },
};
// mutations
const mutations = {
    [SET_LOG_DATA](state, logData) {
        state.logData = logData;
    },

    [SET_AUDIT_ACTIONS](state, actions) {
        state.auditActions = actions;
    },

    [SET_AUDIT_USERS](state, users) {
        state.auditUsers = users;
    },

    [SET_AUDIT_MODULES](state, modules) {
        state.auditModules = modules;
    },
};

// // /api/auth/common/actions
// this.$store.dispatch("getAuditActions");
// // /api/auth/common/users
// this.$store.dispatch("getAuditUsers");
// // /api/auth/common/modules
// this.$store.dispatch("getAuditModuless");

// Actions
const actions = {
    fetchAuditActions({ commit }) {
        return new Promise((resolve, reject) => {
            Axios.get(AuditActionsURL)
                .then(function(response) {
                    commit('SET_AUDIT_ACTIONS', response.data.data);
                    // console.log("AuditActionsURL--->", response.data);
                    resolve();
                })
                .catch(function(error) {
                    reject();
                });
        });
    },
    fetchAuditUsers({ commit }) {
        return new Promise((resolve, reject) => {
            Axios.get(AuditUsersURL)
                .then(function(response) {
                    commit('SET_AUDIT_USERS', response.data.data);
                    // console.log("AUDIT_USERS--->", response.data);
                    resolve();
                })
                .catch(function(error) {
                    reject();
                });
        });
    },
    fetchAuditModules({ commit }) {
        return new Promise((resolve, reject) => {
            Axios.get(AuditModulesURL)
                .then(function(response) {
                    commit('SET_AUDIT_MODULES', response.data.data);
                    // console.log("AUDIT_MODULES--->", response.data);
                    resolve();
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },

    searchLogData({ commit }, searchParam) {
        //
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            console.log('just hit am i here ... ? in searchLogData');
            // loading Opening
            Axios.get(LogData, { params: searchParam })
                // Axios.post(LogData, params)
                .then(function(response) {
                    console.log('am i here ... ? in searchLogData');
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_LOG_DATA', response.data.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    exportLogList({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportLogData,
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
                    fileLink.download = 'log_' + Date.now() + '.pdf'; // giving it a name
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};