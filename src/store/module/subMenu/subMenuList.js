/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {SubMenuListApi} from '../../api';

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_SUBMENU_DATA,
  ADD_SUBMENU_DATA,
  SET_SUBMENU_SCHEMA_DATA,
  UNSET_SUBMENU_SCHEMA_DATA,
} from '../../mutation-types';

// utilities
import {saveMsg, updateMsg, deleteMsg, failedMsg} from '../../erpUtil';

// state../../notifyUtil
const state = {
  message: '',
  action_process: false,
  schema: {
    id: '',
    menu_id: '',
    sub_menu_name: '',
    sl_no: '',
    status: 1,
    tag_name: '',
    menu_url: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
  },
  datalist: [],
};

// getters
const getters = {
  // get data lsit
  getSubMenuDataList (state) {
    return state.datalist;
  },
  // get form schema
  getSubMenuSchema (state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_SUBMENU_DATA] (state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_SUBMENU_DATA] (state, jschema) {
    state.datalist.push (jschema);
  },
  // set action process
  [SET_ACTION_PROCESS] (state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS] (state) {
    state.action_process = false;
  },
  // set form schema
  [SET_SUBMENU_SCHEMA_DATA] (state, schemaData) {
    state.schema = schemaData;
    state.schema.menu_id = parseInt (state.schema.menu_id);
    state.schema.status = parseInt (state.schema.status);
  },
  // unset form schema
  [UNSET_SUBMENU_SCHEMA_DATA] (state) {
    state.schema = {
      id: state.schema.id,
      menu_id: '',
      sub_menu_name: '',
      sl_no: '',
      status: 1,
      tag_name: '',
      menu_url: '',
      created_at: '',
      updated_at: '',
      deleted_at: '',
    };
  },
};

const actions = {
  // get data list
  fetchSubMenuData({commit}) {
    return new Promise (function (resolve, reject) {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.get (SubMenuListApi)
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          var result = response.data.data.data;
          commit ('SET_SUBMENU_DATA', result);
          resolve (response.data.data);
        })
        .catch (function (error) {
          // handle error
          console.log (error);
          commit ('UNSET_LOADING'); // loading Closing
          reject ();
        });
    });
  },
  searchSubmenuData ({commit}, searchParam) {
    console.log ('search Action', searchParam);
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      // loading  Opening
      Axios.get (SubMenuListApi, {
        params: searchParam,
      })
        .then (function (response) {
          // console.log("search:  in then ??");
          commit ('UNSET_LOADING'); // loading Closing
          var result = response.data.data.data;
          console.log (response.data.data);
          commit ('SET_SUBMENU_DATA', result);
          resolve (response.data.data);
        })
        .catch (function (error) {
          console.log ('searchFormFillup: in catch ??');
          commit ('UNSET_LOADING'); // loading Closing
          console.log (error);
          reject ();
        });
    });
  },
  // delete data
  deleteSubMenuItem ({commit}, item) {
    let url = `${SubMenuListApi}/${item}`;
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.delete (url)
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status === 'success') {
            commit ('SET_SNACKBAR', {
              msg: deleteMsg,
              color: 'green',
            });
            resolve ('done');
          } else {
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'red',
            });
            reject ();
          }
        })
        .catch (function (error) {
          console.log (error);
          commit ('UNSET_LOADING'); // loading Closing
          commit ('SET_SNACKBAR', {
            msg: failedMsg,
            color: 'red',
          });
          reject ();
        });
    });
  },
  // save data
  saveSubMenuData ({commit}, schema) {
    let data = schema;

    ['created_at', 'updated_at', 'deleted_at'].forEach (e => delete data[e]);
    data['status'] = 1;
    commit ('SET_ACTION_PROCESS');
    console.log ('data action ', data);
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.post (SubMenuListApi, data)
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status === 'success') {
            commit ('ADD_SUBMENU_DATA', schema);
            commit ('SET_SNACKBAR', {
              msg: saveMsg,
              color: 'green',
            });
            commit ('UNSET_FORMNOTIFY');
            resolve ();
          } else {
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'red',
            });
            commit ('SET_FORMNOTIFY', {
              type: 'error', // success, info, warning, error
              msg: response.data.message,
            });
            reject ();
          }
        })
        .catch (function (error) {
          console.log (error);
          commit ('UNSET_LOADING'); // loading Closing
          commit ('SET_SNACKBAR', {
            msg: failedMsg,
            color: 'red',
          });
          reject ();
        });
    });
  },
  // edit/update data
  editSubMenuData ({commit}, schema) {
    commit ('SET_ACTION_PROCESS');
    let data = schema;
    console.log ('DATA ACTION ', data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${SubMenuListApi}/${data.id}`;
    console.log (SubMenuListApi + ' bef url', url);

    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.put (url, data)
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status === 'success') {
            commit ('SET_SNACKBAR', {
              msg: updateMsg,
              color: 'green',
            });
            commit ('UNSET_FORMNOTIFY');
            resolve ();
          } else {
            commit ('SET_SNACKBAR', {
              msg: response.data.message,
              color: 'red',
            });
            commit ('SET_FORMNOTIFY', {
              type: 'error', // success, info, warning, error
              msg: response.data.message,
            });
            reject ();
          }
        })
        .catch (function (error) {
          commit ('UNSET_LOADING'); // loading Closing
          commit ('SET_SNACKBAR', {
            msg: failedMsg,
            color: 'red',
          });
          console.log (error);
          reject ();
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
