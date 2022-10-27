/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    PaidOrganizationMasterUrl,
    PaidOrganizationDetailsUrl,
} from '@/store/api';

// mutation types
import {
    SET_PAID_ORGANIZATION_DATA,
    SET_PAID_ORGANIZATION_DETAILS_DATA,
} from '../../mutation-types';

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        organization_name: '',
        total_amount: '',
        total_count: '',
    },

    studentlist: [],
    certificateList: [],
};

// getters
const getters = {
    getPaidOrganizationList(state) {
        return state.certificateList;
    },
    getPaidOrganizationDetailsList(state) {
        return state.studentlist;
    },
};

// mutations
const mutations = {
    [SET_PAID_ORGANIZATION_DATA](state, result) {
        state.certificateList = result;
    },
    [SET_PAID_ORGANIZATION_DETAILS_DATA](state, result) {
        state.studentlist = result;
    },
};

const actions = {
    searchPaidOrganizationData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading  Opening
            Axios.get(PaidOrganizationMasterUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_PAID_ORGANIZATION_DATA', result);
                    resolve(response.data.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    //get verified certificate
    searchPaidOrganizationDetailsData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading  Opening
            Axios.get(PaidOrganizationDetailsUrl, { params: searchParam })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_PAID_ORGANIZATION_DETAILS_DATA', result);
                    resolve(response.data.data);
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