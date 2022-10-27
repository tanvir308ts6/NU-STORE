/* eslint-disable prettier/prettier */
import Axios from 'axios';

import { SET_TOTAL_CENTER_STATUS_IN } from '../../mutation-types';

import { CenStatisticsApi, CenterDescripSummaryApi } from '../../api';

const state = {
    totalStatus: {
        // centers: -1,
        // exainers: -1,
        // invigilators: -1,
        // regCenters: -1,
        // users: -1
        // eslint-disable-next-line prettier/prettier
        total_center_user: '',
        // eslint-disable-next-line prettier/prettier
        total_exam_committee: '',
        total_invigilator: '',
        total_attendance: '',
        question: {
            total_questions: '',
        },
        blank_script: {
            total_collection: '',
        },
        answer_script: {
            total_distribution: '',
        },
        loose_script: {
            total_distribution: '',
        },
    },
};
const getters = {
    getTotalCenterStatus(state) {
        return state.totalStatus;
    },
};
// mutations
const mutations = {
    [SET_TOTAL_CENTER_STATUS_IN](state, response) {
        // console.log("in SET_TOTAL_STATUS_IN", response);
        state.totalStatus = response;
    },
};
// Actions
const actions = {
    collectTotalCenterStatistics({ commit }) {
        // console.log("in CollectTotalStatistics");

        // var params = new URLSearchParams();
        // params.append("email", authUser.email);
        // params.append("password", authUser.password);

        return new Promise((resolve, reject) => {
            // console.log("in CollectTotalStatistics in promise");
            Axios.get(CenStatisticsApi)
                .then(function(response) {
                    // console.log("in CollectTotalStatistics in then");
                    // console.log("response.data", response.data);
                    // console.log("success");
                    console.log('res', response);
                    var result = response.data.data;
                    commit('SET_TOTAL_CENTER_STATUS_IN', result);
                    resolve();

                    // var token = response.data.token;
                    // var expires = response.data.expires;
                    // localStorage.setItem("token", token);
                    // localStorage.setItem("expires", expires);

                    // commit("SET_LOGGED_IN");
                    // commit("SET_AUTH_USER", {
                    //   email: authUser.email,
                    //   password: authUser.password
                    // });
                    // commit("SET_USER_TOKEN", token);
                    // resolve();
                })
                .catch(function(error) {
                    // localStorage.setItem("token", "");
                    // localStorage.setItem("expires", "");

                    // commit("UNSET_LOGGED_IN");
                    // commit("UNSET_AUTH_USER");/
                    // commit("UNSET_USER_TOKEN");
                    // console.log("in CollectTotalStatistics in error", error);
                    console.log(error);
                    reject();
                });
        });
    },
    exportCenterDescripSummaryApi({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: CenterDescripSummaryApi,
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
                    fileLink.download = 'centerdescriptive_' + Date.now() + '.pdf'; // giving it a name
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