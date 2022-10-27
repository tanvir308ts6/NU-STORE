/* eslint-disable prettier/prettier */
// axios
import Axios from 'axios';

// apis
import {RescrutinyNoticeApi} from '@/store/api';

// mutation types
import {
  SET_RESCRUTINY_NOTICE_LIST_DATA,
  ADD_RESCRUTINY_NOTICE_DATA,
  SET_RESCRUTINY_NOTICE_SCHEMA,
  UNSET_RESCRUTINY_NOTICE_SCHEMA,
} from '../../mutation-types';

// utilities
import {saveMsg, updateMsg, deleteMsg, failedMsg} from '../../erpUtil';

// state../../notifyUtil
const state = {
  message: '',
  action_process: false,
  schema: {
    id: '',
    exam_code: '',
    year: '',
    activity_id: '',
    notice: '',
    from_date: '',
    to_date: '',
  },
  datalist: [],
};

// getters
const getters = {
  // get data lsit
  getRescrutinyNoticeDataList (state) {
    return state.datalist;
  },
  getRescrutinyNoticeSchema (state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_RESCRUTINY_NOTICE_LIST_DATA] (state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_RESCRUTINY_NOTICE_DATA] (state, jschema) {
    state.datalist.push (jschema);
  },
  // set form schema
  [SET_RESCRUTINY_NOTICE_SCHEMA] (state, schemaData) {
    state.schema = schemaData;
    //state.schema.exam_code = schemaData.exam_code.toString();
    state.schema.activity_id = parseInt (state.schema.activity_id);
  },
  // unset form schema
  [UNSET_RESCRUTINY_NOTICE_SCHEMA] (state) {
    state.schema = {
      id: state.schema.id,
      exam_code: '',
      year: '',
      activity_id: '',
      notice: '',
      from_date: '',
      to_date: '',
      name: '',
      file: '',
    };
  },
};

const actions = {
  searchRescrutinyNotice ({commit}, searchParam) {
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      });
      Axios.get (RescrutinyNoticeApi, {
        params: searchParam,
      })
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));
          commit ('SET_RESCRUTINY_NOTICE_LIST_DATA', result);
          resolve (response.data);
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
  deleteRescrutinyNoticeItem ({commit}, item) {
    let url = `${RescrutinyNoticeApi}/${item}`;
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
  saveRescrutinyNoticeData ({commit}, schema) {
    let data = schema;
    // ['created_at', 'updated_at', 'deleted_at'].forEach(e => delete data[e]);

    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.post (RescrutinyNoticeApi, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then (function (response) {
          commit ('UNSET_LOADING'); // loading Closing
          if (response.data.status === 'success') {
            commit ('ADD_RESCRUTINY_NOTICE_DATA', schema);
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
  editRescrutinyNoticeData ({commit}, schema) {
    let data = schema.item;
    // let l = data.get('id');
    //let l = data.getAll('id');
    for (var value of schema.form.values ()) {
      console.log (value);
    }
    const url = `${RescrutinyNoticeApi}/${data.id}`;

    let form = new FormData ();
    var n = schema.form.get ('name');
    var f = schema.form.get ('file');
    console.log (n);
    form.set ('name', n);
    form.set ('file', f);
    form.append ('id', data.id);
    form.append ('activity_id', data.activity_id);
    form.append ('notice', data.notice);
    form.append ('from_date', data.from_date);
    form.append ('to_date', data.to_date);
    form.append ('exam_code', data.exam_code);
    form.append ('year', data.year);
    form.append ('exam_initiate_id', data.exam_initiate_id);
    console.log (...form);
    return new Promise ((resolve, reject) => {
      commit ('SET_LOADING', {
        color: 'primary',
      }); // loading Opening
      Axios.put (url, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
