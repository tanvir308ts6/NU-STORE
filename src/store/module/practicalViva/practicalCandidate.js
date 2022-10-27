/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_PRACTICAL_CANDI_DATA,
    UNSET_PRACTICAL_CANDI_DATA,
} from '../../mutation-types';

import { FormFillUpAllUrl, PracticalCandidateList } from '../../api';

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
    practicalcandilist: [],
};

const getters = {
    // get  Practical candidate lsit
    getPracticalCandiList(state) {
        return state.practicalcandilist;
    },
};
const mutations = {
    //set Practical examinee data
    [SET_PRACTICAL_CANDI_DATA](state, result) {
        state.practicalcandilist = result;
    },
    //unset Practical examinee data
    [UNSET_PRACTICAL_CANDI_DATA](state) {
        state.practicalcandilist = [];
    },
};
const actions = {
    //Get all Final Examinee data
    // fetchFinalExamineeData({ commit }, data) {
    //     let url = `${StudentListApi}?final=${data}`;
    //     return new Promise(function(resolve, reject) {
    //         commit('SET_LOADING', {
    //             color: 'primary',
    //         });
    //         // loading Opening
    //         Axios.get(url)
    //             .then(function(response) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 var result = response.data.data;
    //                 commit('SET_PRACTICAL_CANDI_DATA', result);

    //                 resolve();
    //             })
    //             .catch(function(error) {
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 // console.log(error);
    //                 reject();
    //             });
    //     });
    // },

    // searchPVFinalExamineeData({ commit }, searchParam) {
    //     let url = `${StudentListApi}?final=${false}&type=2`;
    //     // url = `${StudentListApi}?final=${true}`;
    //     // console.log("search Action", searchParam);
    //     return new Promise((resolve, reject) => {
    //         commit('SET_LOADING', {
    //             color: 'primary',
    //         });
    //         // loading  Opening
    //         Axios.get(url, {
    //                 params: searchParam,
    //             })
    //             .then(function(response) {
    //                 // // console.log("search:  in then ??");
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 var result = response.data.data;
    //                 // console.log(response.data.data);
    //                 commit('SET_PRACTICAL_CANDI_DATA', result);
    //                 resolve();
    //             })
    //             .catch(function(error) {
    //                 // console.log("searchFormFillup: in catch ??");
    //                 commit('UNSET_LOADING'); // loading Closing
    //                 console.log(error);
    //                 reject();
    //             });
    //     });
    // },

    //after search data
    searchPracticalCandData({ commit }, searchParam) {
        // let url = `${StudentListApi}?final=${true}`;
        // loading  Opening
        // console.log("final:: Search Action", searchParam);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(PracticalCandidateList, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    //   console.log(response);
                    var result = response.data.data;
                    commit('SET_PRACTICAL_CANDI_DATA', result);
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