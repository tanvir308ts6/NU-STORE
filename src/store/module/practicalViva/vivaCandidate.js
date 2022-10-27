/* eslint-disable prettier/prettier */
import Axios from 'axios';

import { SET_VIVA_CANDI_DATA, UNSET_VIVA_CANDI_DATA } from '../../mutation-types';

import {
    FormFillUpAllUrl,
    VivaCandidateList,
    downloadVivaAttendenceApi,
} from '../../api';

const state = {
    schema: {
        id: '',
        reg_no: '',
        admission_roll: '',
        name: '',
        name_bn: '',
        father_name: '',
        father_name_bn: '',
        mother_name: '',
        mother_name_bn: '',
        session_year: '',
        session_year_expire: '',
        degree_code: '',
        degree_group_code: '',
        college_code: '',
        subject_code: '',
        exam_code: '',
        exam_name: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        student_type: '',
        gender: '',
        photo_url: '',
        admission_score: '',
        merit_position: '',
        created_by: '',
        updated_by: '',
        deleted_by: '',
        created_at: '',
        updated_at: '',
        exam_title: '',
        college_name: '',
        session: '',
        year: '',
        total: '',
    },
    vivacandilist: [],
};

const getters = {
    // get  Viva candidate lsit
    getVivaCandiList(state) {
        return state.vivacandilist;
    },
};
const mutations = {
    //set Viva examinee data
    [SET_VIVA_CANDI_DATA](state, result) {
        state.vivacandilist = result;
    },
    //set Viva examinee data
    [UNSET_VIVA_CANDI_DATA](state) {
        state.vivacandilist = [];
    },
};
const actions = {
    downloadVivaAttendenceSheet({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(downloadVivaAttendenceApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing

                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a');

                    fileLink.href = url;
                    fileLink.download = 'VivaAttendence_' + Date.now() + '.pdf';
                    fileLink.target = '_blank';
                    document.body.appendChild(fileLink);
                    fileLink.click();

                    resolve();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

    //after search data
    searchVivaCandData({ commit }, searchParam) {
        // let url = `${StudentListApi}?final=${true}`;
        // loading  Opening
        // console.log("final:: Search Action", searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(VivaCandidateList, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_VIVA_CANDI_DATA', result);
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