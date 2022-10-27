/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import { RescrutinyMonitoringApi } from '../../api';

// mutation types
import { SET_RESCRUTINY_MONITORING_DATA } from '../../mutation-types';

// // utilities
// import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

// state../../notifyUtil
const state = {
    message: '',
    action_process: false,
    schema: {
        exam_activity_code: '',
        activity_name: '',
        start_date: '',
        end_date: '',
        exam_code: '',
        exam_initiate_id: '',
        year: '',
        exam_name: '',
        subject_code: '',
        subject_name: '',
        paper_code: '',
        paper_name: '',
        total_student: '',
        total_rescrutiner: '',
        exam_status: '',
    },
    datalist: [],
};

// getters
const getters = {
    // get data lsit
    getRescrutinyMonitoringList(state) {
        return state.datalist;
    },
    // get form schema
    getRescrutinyMonitoringSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_RESCRUTINY_MONITORING_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    // get data list
    searchRescrutinyMonitoringData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(RescrutinyMonitoringApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data;
                    // console.log(response.data.data);
                    commit('SET_RESCRUTINY_MONITORING_DATA', result);
                    console.log('response', response.data);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('m..: in catch ');
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