/* eslint-disable prettier/prettier */
import Axios from 'axios';

import { SET_OVERALL_WANTING_DATA } from '../../mutation-types';

import { OverallWantingApi } from '../../api';

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
    datalist: [],
};

const getters = {
    // get  list
    getOverallWantingList(state) {
        return state.datalist;
    },
};
const mutations = {
    //set Viva examinee data
    [SET_OVERALL_WANTING_DATA](state, result) {
        state.datalist = result;
    },
};
const actions = {
    //after search data
    searchOverallWantingData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(OverallWantingApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    commit('SET_OVERALL_WANTING_DATA', result);
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