/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {
    QuesReceiveCenWise_FetchUrl,
    ExportQuesReceive_FetchUrl,
    QuesReceive_FetchUrl,
} from '../../api';

// mutation types
import { SET_QUESTION_RECEIVE_DATA } from '../../mutation-types';

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
    getReceiveQuestionList(state) {
        return state.datalist;
    },
    // get form schema
    getReceiveQuestionSchema(state) {
        return state.schema;
    },
};

// mutations
const mutations = {
    // set data list
    [SET_QUESTION_RECEIVE_DATA](state, result) {
        state.datalist = result;
    },
};

const actions = {
    // get data list
    searchReceiveQuestionData({ commit }, searchParam) {
        console.log('search Action', searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(QuesReceiveCenWise_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(response.data.data);
                    commit('SET_QUESTION_RECEIVE_DATA', result);
                    console.log('response', response.data.data);
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
    exportReceiveQuestionData({ commit }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: ExportQuesReceive_FetchUrl,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'error') {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'orange',
                        });
                    } else {
                        let url = response.data.data;
                        console.log(url);

                        // showing on a new tab
                        var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                        fileLink.href = url; // assigning url to that
                        fileLink.download = 'receivequestionList_' + Date.now() + '.pdf'; // giving it a name
                        fileLink.target = '_blank'; // ensuring that it goes to the new tab
                        //After all that is done
                        document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                        fileLink.click(); // finally clicking it  .
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    receiveQuestion({ commit }, param) {
        console.log(JSON.stringify(param));
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading Opening
            Axios.post(QuesReceive_FetchUrl, param)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    console.log(result);
                    commit('SET_SNACKBAR', {
                        msg: response.data.message,
                        color: 'green',
                    });
                    resolve(result);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    commit('SET_SNACKBAR', {
                        msg: 'failed!!',
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