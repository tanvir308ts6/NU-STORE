/* eslint-disable prettier/prettier */
import Axios from 'axios';
import { UserApi, RegCenterUserinfo_FetchUrl } from '../../api';
import {
    SET_REGIONAL_CENTER_USER_DATA,
    ADD_REGIONAL_CENTER_USER_DATA,
    SET_MESSAGE,
    UNSET_MESSAGE,
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_REGIONAL_CENTER_USER_SCHEMA,
    UNSET_REGIONAL_CENTER_USER_SCHEMA,
} from '../../mutation-types';
import {
    // saveMsg,
    // updateMsg,
    // deleteMsg,
    failedMsg,
} from '../../erpUtil';

const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        name: '',
        email: '',
        password: '',
        username: '',
        user_type: '3',
        regional_center_id: '',
        // confirmedPassword: "",
        created_at: '',
        updated_at: '',
        deleted_at: '',
        created_by: '',
        updated_by: '',
        deleted_by: '',
    },
    datalist: [],
};

const getters = {
    getRegionalCentertUserItem(state) {
        return state.datalist;
    },
    getRegionalCenterUserSchema(state) {
        return state.schema;
    },
    getRegionalCenterUserMessage(state) {
        return state.message;
    },
};
const mutations = {
    [SET_REGIONAL_CENTER_USER_DATA](state, result) {
        state.datalist = result;
    },
    [ADD_REGIONAL_CENTER_USER_DATA](state, jschema) {
        state.datalist.push(jschema);
    },
    [SET_MESSAGE](state, Msg) {
        state.message = Msg;
    },
    [UNSET_MESSAGE](state) {
        state.message = '';
    },
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    [SET_REGIONAL_CENTER_USER_SCHEMA](state, schemaData) {
        state.schema = schemaData;
        state.schema.regional_center_id = parseInt(
            state.schema.regional_center_id
        );
    },
    [UNSET_REGIONAL_CENTER_USER_SCHEMA](state) {
        state.schema = {
            id: state.schema.id,
            name: '',
            email: '',
            password: '',
            username: '',
            regional_center_id: '',
            // confirmedPassword: "",
            // created_at: "",
            // updated_at: "",
            deleted_at: '',
            created_by: '',
            updated_by: '',
            deleted_by: '',
            created_at: '',
            updated_at: '',
        };
    },
};
const actions = {
    callRegionalCenterUserData({ commit }, searchparam) {
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(RegCenterUserinfo_FetchUrl, {
                    params: searchparam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    //console.log("response that came", response )
                    var result = response.data.data;
                    //console.log("result", result )
                    commit('SET_REGIONAL_CENTER_USER_DATA', result);
                    resolve(result);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    // callRegionalCenterUserData({ commit, state }, payLoad) {
    //   console.log("payload", payLoad);
    //   let url = `${RegCenterUserinfo_FetchUrl+ "?" + payLoad.reg_center_id_url}&limit=${
    //     payLoad.limit.limit
    //   }&page=${payLoad.limit.page}&search=${payLoad.limit.search}`;
    //   console.log("action center_id", url);

    //   return new Promise(function(resolve, reject) {
    //     commit("SET_LOADING", {
    //       color: "primary"
    //     });
    //     Axios.get(url)
    //       .then(function(response) {
    //         commit("UNSET_LOADING");
    //         //console.log("response that came", response )
    //         var result = response.data.data;
    //         //console.log("result", result )
    //         commit("SET_REGIONAL_CENTER_USER_DATA", result);
    //         resolve();
    //       })
    //       .catch(function(error) {
    //         // handle error
    //         console.log(error);
    //         reject();
    //       });
    //   });
    // },

    //search
    searchRegCenUserData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.get(RegCenterUserinfo_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;

                    commit('SET_REGIONAL_CENTER_USER_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    // fetchRegionalCenterProfileData({
    //   commit
    // }) {
    //   //get user type
    //   var user = JSON.parse(localStorage.getItem("user"))
    //   console.log("reg center profile called", user);
    //   var reg_center_id = user.reg_center.id

    //   return new Promise((resolve, reject) => {
    //     Axios.get(UserApi + "/" + reg_center_id)
    //       .then(function (response) {
    //         console.log("res-------", response);
    //         var result = response.data.data;
    //         commit("SET_REGIONAL_CENTER_USER_SCHEMA", result);
    //         resolve();
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //         reject();
    //       });
    //   });
    // },

    deleteRegionalCenterUserItem({ commit, state }, deleteditem) {
        console.log(' In action ', deleteditem);
        const deleteurl = `${UserApi}/${deleteditem}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });

            Axios.delete(deleteurl)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        console.log('in action delete');
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        resolve(response.data.message);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    reject();
                });
        });
    },
    saveRegionalCenterUserData({ commit }, schema) {
        console.log('in state : ', schema);
        var param = new URLSearchParams();
        param.append('name', schema.name);
        param.append('email', schema.email);
        param.append('password', schema.password);
        param.append('username', schema.username);
        param.append('user_type', schema.user_type);
        param.append('regional_center_id', schema.regional_center_id);

        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.post(UserApi, param)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        commit('ADD_REGIONAL_CENTER_USER_DATA', schema);
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');

                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                            timeout: 10000,
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject(response.data.message);
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });

                    reject();
                });
        });
    },

    editRegionalCenterUsertData({ commit, state }, schema) {
        // console.log("sdsddsd");
        const updateurl = `${UserApi}/${schema.item.id}`;
        var param = new URLSearchParams();
        param.append('id', schema.item.id);
        param.append('name', schema.item.name);
        param.append('email', schema.item.email);
        param.append('password', schema.item.password);
        param.append('username', schema.item.username);
        param.append('regional_center_id', schema.item.regional_center_id);
        // param.append("mobile", schema.item.mobile);
        // param.append("center_list_id", schema.item.center_list_id);
        // param.append("username", schema.item.username);
        // param.append("password", schema.item.password);
        param.append('created_at', schema.item.created_at);
        param.append('updated_at', schema.item.updated_at);
        param.append('deleted_at', schema.item.deleted_at);
        param.append('created_by', schema.item.created_by);
        param.append('updated_by', schema.item.updated_by);
        param.append('deleted_by', schema.item.deleted_by);

        commit('SET_ACTION_PROCESS');
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios.put(updateurl, param)
                .then(function(response) {
                    commit('UNSET_LOADING');
                    if (response.data.status == 'success') {
                        console.log('in action edit');
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });

                        commit('UNSET_FORMNOTIFY');

                        resolve(response.data.message);
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                            timeout: 10000,
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject(response.data.message);
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    console.log('in state : ', error);
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