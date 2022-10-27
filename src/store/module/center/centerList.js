/* eslint-disable prettier/prettier */
import Axios from 'axios';
import {
    Centerinfo_FetchUrl,
    Centerinfo_DeleteUrl,
    Centerinfo_UpdateUrl,
    Centerinfo_SaveUrl,
    CenterProfileinfo_FetchUrl,
    CenterListExportURL,
} from '../../api';
import {
    SET_CENTER_DATA,
    ADD_CENTER_DATA,
    SET_ACTION_PROCESS,
    UNSET_ACTION_PROCESS,
    SET_CENTER_SCHEMA_DATA,
    UNSET_CENTER_SCHEMA_DATA,
} from '../../mutation-types';
import { saveMsg, updateMsg, deleteMsg, failedMsg } from '../../erpUtil';

const state = {
    message: '',
    action_process: false,
    schema: {
        id: '',
        center_name: '',
        college_code: '',
        center_code: '',
        address: '',
        phone: '',
        email: '',
        mobile: '',
        type: 1,
        student_capacity: '',
        district_code: '',
        responsible_person: '',
        // username: "",
        // password: "",
        created_at: '',
        updated_at: '',
        deleted_at: '',
        created_by: '',
        updated_by: '',
        deleted_by: '',
        active: 1,
    },
    datalist: [],
};

const getters = {
    getCenterItem(state) {
        return state.datalist;
    },
    getCenterSchema(state) {
        return state.schema;
    },
};
const mutations = {
    [SET_CENTER_DATA](state, result) {
        state.datalist = result;
    },

    [ADD_CENTER_DATA](state, jschema) {
        state.datalist.push(jschema);
    },
    [SET_ACTION_PROCESS](state) {
        state.action_process = true;
    },
    [UNSET_ACTION_PROCESS](state) {
        state.action_process = false;
    },
    [SET_CENTER_SCHEMA_DATA](state, schemaData) {
        state.schema = schemaData;
        // state.schema.active = parseInt(state.schema.active);
    },
    [UNSET_CENTER_SCHEMA_DATA](state) {
        // eslint-disable-next-line no-self-assign
        (state.schema.id = state.schema.id), (state.schema.center_name =
            ''), (state.schema.college_code = ''), (state.schema.center_code =
            ''), (state.schema.address = ''), (state.schema.phone =
            ''), (state.schema.email = ''), (state.schema.mobile =
            ''), (state.schema.student_capacity = ''), (state.schema.district_code =
            ''), (state.schema.responsible_person =
            ''), (state.schema.type = 1), (state.schema.active = 1); // (state.schema.username = ""), // (state.schema.center_list_id = ""),
    },
};
const actions = {
    downloadCenterList({ commit }, searchParam) {
        commit("SET_LOADING", {
          color: "primary",
        });
        return new Promise((resolve, reject) => {
          Axios({
            url: Centerinfo_FetchUrl,
            method: "GET",
            params: searchParam,
          })
            .then((response) => {
              commit("UNSET_LOADING"); // loading Closing
              let url = response.data.data;
              console.log(url);

              // showing on a new tab
              var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
              fileLink.href = url; // assigning url to that
              fileLink.download = "centerList_" + Date.now() + ".pdf"; // giving it a name
              fileLink.target = "_blank"; // ensuring that it goes to the new tab
              //After all that is done
              document.body.appendChild(fileLink); // attaching the <a> tag to the document body
              fileLink.click(); // finally clicking it  .
            })
            .catch(function(error) {
              commit("UNSET_LOADING"); // loading Closing
              console.log("I am in error", error);
            });
        });
      },
    callCenterData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.get(Centerinfo_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('res come', response);
                    var result = response.data.data;
                    console.log('result come', result);
                    commit('SET_CENTER_DATA', result);
                    console.log('cllcen', result);
                    resolve(result);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    commit('UNSET_LOADING'); // loading Closing
                    reject();
                });
        });
    },
    searchCenterListData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(Centerinfo_FetchUrl, {
                    params: searchParam,
                })
                .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    // console.log(response.data.data);
                    commit('SET_CENTER_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('searchFormFillup: in catch ??');
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    exportCenterList({ commit }) {
        return new Promise(resolve => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            Axios({
                    url: CenterListExportURL,
                    method: 'GET',
                    responseType: 'arraybuffer',
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute(
                        'download',
                        'CenterList_' + Date.now() + '.pdf'
                    );
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
    fetchCenterProfileData({ commit }) {
        //get user type
        var user = JSON.parse(localStorage.getItem('user'));
        var center_id = user.center.id;

        return new Promise((resolve, reject) => {
            console.log('center profile called');
            Axios.get(CenterProfileinfo_FetchUrl + '/' + center_id)
                .then(function(response) {
                    console.log('res-------', response);
                    var result = response.data.data;
                    commit('SET_CENTER_SCHEMA_DATA', result);
                    resolve();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    reject();
                });
        });
    },
    saveCenterData({ commit }, schema) {
        console.log('in save', schema);
        var param = new URLSearchParams();
        param.append('center_name', schema.center_name);
        param.append('college_code', schema.college_code);
        param.append('center_code', schema.center_code);
        param.append('mobile', schema.mobile);
        param.append('address', schema.address);
        param.append('phone', schema.phone);
        param.append('email', schema.email);
        param.append('student_capacity', schema.student_capacity);
        param.append('district_code', schema.district_code);
        param.append('responsible_person', schema.responsible_person);
        param.append('active', schema.active);
        if (schema.type) {
            param.append('type', schema.type);
        }

        commit('SET_ACTION_PROCESS');
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.post(Centerinfo_SaveUrl, param)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'success') {
                        commit('SET_SNACKBAR', {
                            msg: saveMsg,
                            color: 'green',
                        });
                        commit('ADD_CENTER_DATA', schema);
                        commit('UNSET_FORMNOTIFY');
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    // handle error
                    commit('SET_SNACKBAR', {
                        msg: failedMsg,
                        color: 'red',
                    });
                    console.log(error);
                    reject();
                });
        });
    },
    deleteCenterItem({ commit }, deleteditem) {
        const deleteurl = `${Centerinfo_DeleteUrl}/${deleteditem}`;
        //console.log(" In action ", deleteditem);
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.delete(deleteurl)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'success') {
                        //state.datalist.splice(deleteditem, 1);
                        commit('SET_SNACKBAR', {
                            msg: deleteMsg,
                            color: 'green',
                        });
                        resolve();
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
                    console.log('in delete action : ', error);
                    reject();
                });
        });
    },

    editCenterData({ commit }, schema) {
        const updatedurl = `${Centerinfo_UpdateUrl}/${schema.item.id}`;
        var param = new URLSearchParams();
        param.append('id', schema.item.id);
        param.append('center_name', schema.item.center_name);
        param.append('email', schema.item.email);
        param.append('mobile', schema.item.mobile);
        param.append('phone', schema.item.phone);
        param.append('address', schema.item.address);
        param.append('college_code', schema.item.college_code);
        param.append('center_code', schema.item.center_code);
        param.append('student_capacity', schema.item.student_capacity);
        param.append('district_code', schema.item.district_code);
        param.append('responsible_person', schema.item.responsible_person);
        param.append('active', schema.item.active);
        if (schema.item.type) {
            param.append('type', schema.item.type);
        }
        // param.append("created_at", schema.item.created_at);
        // param.append("updated_at", schema.item.updated_at);
        // param.append("deleted_at", schema.item.deleted_at);
        // param.append("created_by", schema.item.created_by);
        // param.append("updated_by", schema.item.updated_by);
        // param.append("deleted_by", schema.item.deleted_by);

        commit('SET_ACTION_PROCESS');
        return new Promise(function(resolve, reject) {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Openingred
            Axios.put(updatedurl, param)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status == 'success') {
                        commit('SET_SNACKBAR', {
                            msg: updateMsg,
                            color: 'green',
                        });
                        commit('UNSET_FORMNOTIFY');
                        //state.datalist.splice(schema.indexEdited, 1, schema.item);
                        resolve();
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        commit('SET_FORMNOTIFY', {
                            type: 'error', // success, info, warning, error
                            msg: response.data.message,
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
                    // handle error
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