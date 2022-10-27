/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    RescrutinizerCountApi,
    RescrutinerCountDLApi
} from '../../api';

// mutation types
import {
    SET_RESCRUTINY_COUNT_DATA
} from '../../mutation-types';

// // utilities
// import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        email: '',
        id: '',
        mobile: '',
        name: '',
        total_scripts: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRescrutinyCountList(state) {
        return state.datalist;
    },
    // get form schema
    getRescrutinyCountSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINY_COUNT_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    // get data list
    searchRescrutinyCountData({
        commit
    }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(RescrutinizerCountApi, {
                    params: searchParam,
                })
                .then(function (response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(response.data.data);
                    commit('SET_RESCRUTINY_COUNT_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('m..: in catch ');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    exportRescrutinerCount({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        // script-statement-download
        return new Promise((resolve, reject) => {
            Axios({
                    url: RescrutinerCountDLApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then((response) => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'rescrutinerCountList_' + Date.now() + '.pdf'; // giving it a name
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};