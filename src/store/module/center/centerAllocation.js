/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
  SET_CENTER_ALLOCATION_DATA,
  SET_CENTER_ALLOCATION_SCHEMA,
  UNSET_CENTER_ALLOCATION_SCHEMA,
  ADD_CENTER_ALLOCATION_DATA,
  SET_SCHEMA_FOR_CLONE,
  UNSET_CENTER_ALLOCATION_DATA,
  SET_UNALLOCATED_CENTER_DATA,
  SET_UNALLOCATED_CENTER_SCHEMA,
  UNSET_UNALLOCATED_CENTER_SCHEMA,
  SET_UNALLOCATED_COL_SUB_SUM_DATA,
  SET_UNALLOCATED_COL_SUB_SUM_SCHEMA,
  SET_PV_CENTER_ALLOCATION_DATA,
  SET_PV_CENTER_UNALLOC_COLL_DATA,
  SET_PV_COLL_DATA,
} from "../../mutation-types";

// utilities
import {saveMsg, updateMsg, deleteMsg, failedMsg} from '../../erpUtil';

import {
  CenterAllocationUrl,
  CollegeUnAllocatedUrl,
  CollegeSubjectWiseUnAllocatedUrl,
  AutoPVCenterAllocUrl,
  ShowPVCenterAllocationUrl,
  ShowPVUnallocatedCollListUrl,
  PVCollListUrl,
  addPVCenterAllocUrl,
  deletePVCenterAllocUrl,
  ExportPVCenterAllocUrl,
} from "../../api";

const state = {
  schema: {
    id: "",
    center_code: "",
    exam_code: "",
    exam_name: "",
    date: "",
    year: "",
    seal_no: "",
    type: "",
    incharge_officer: "",
    supervising_officer: "",
    division_id: "",
    district_id: "",
    exam_initiate_id: 1,
    center: [],
  },
  datalist: [],
  unallodatalist: [],
  schemaUnallo: {
    count: "",
  },
  unallocollsubdatalist: [],
  schemaUnallosubcoll: {
    count: "",
  },
  pvallocationdatalist: [],
  pvunalloccolllist: [],
  pvcolllist: [],
};

const getters = {
  //get pv allocation data
  getPVCenterAllocationItem(state) {
    return state.pvallocationdatalist;
  },
  // get data lsit
  getCenterAllocationItem(state) {
    return state.datalist;
  },
  // get form schema
  getCenterAllocationSchema(state) {
    return state.schema;
  },
  // get unallo data lsit
  getUnAllocationCenterItem(state) {
    return state.unallodatalist;
  },
  // get unallo schema
  getUnAllocationSchema(state) {
    return state.schemaUnallo;
  },
  // get unalloc coll sub  data lsit
  getUnAllocationCollSubItem(state) {
    return state.unallocollsubdatalist;
  },
  // get unallo schema
  getUnAllocationCollSubSchema(state) {
    return state.schemaUnallosubcoll;
  },
  getPVUnAllocCollSubList(state) {
    return state.pvunalloccolllist;
  },
  getPVCollList(state) {
    return state.pvcolllist;
  },
};
const mutations = {
  //set PV alloc data
  [SET_PV_CENTER_ALLOCATION_DATA](state, result) {
    state.pvallocationdatalist = result;
  },
  //set data
  [SET_CENTER_ALLOCATION_DATA](state, result) {
    state.datalist = result;
  },
  //unset data
  [UNSET_CENTER_ALLOCATION_DATA](state) {
    state.datalist = [];
  },
  // add item to datalist
  [ADD_CENTER_ALLOCATION_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  //set schema
  [SET_CENTER_ALLOCATION_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    console.log("in mutation", state.schema);
  },
  //set schema for clone
  [SET_SCHEMA_FOR_CLONE](state, schemaData) {
    state.schema = {
      id: "",
      center_code: schemaData.center_code,
      exam_code: schemaData.exam_code,
      exam_name: schemaData.exam_name,
      date: schemaData.date,
      year: schemaData.year,
      seal_no: schemaData.seal_no,
      type: schemaData.type,
      incharge_officer: schemaData.incharge_officer,
      supervising_officer: schemaData.supervising_officer,
      division_id: schemaData.division_id,
      district_id: schemaData.district_id,
      exam_initiate_id: schemaData.exam_initiate_id,
      center: schemaData.center,
    };
  },
  //unset schema
  [UNSET_CENTER_ALLOCATION_SCHEMA](state) {
    state.schema = {
      id: "",
      center_code: "",
      exam_code: "",
      exam_name: "",
      date: "",
      year: "",
      seal_no: "",
      type: "",
      incharge_officer: "",
      supervising_officer: "",
      division_id: "",
      district_id: "",
      exam_initiate_id: 1,
      center: [],
    };
  },
  //set unallocated center data
  [SET_UNALLOCATED_CENTER_DATA](state, result) {
    state.unallodatalist = result;
  },
  //set unalloc schema
  [SET_UNALLOCATED_CENTER_SCHEMA](state, schemaData) {
    state.schemaUnallo.count = schemaData;
    console.log("in mutation", state.schemaUnallo);
  },
  //unset unalloc schema
  [UNSET_UNALLOCATED_CENTER_SCHEMA](state) {
    state.schemaUnallo = {};
  },
  //set unallocated coll sub sum data
  [SET_UNALLOCATED_COL_SUB_SUM_DATA](state, result) {
    state.unallocollsubdatalist = result;
  },
  //set unalloc coll sub sum schema
  [SET_UNALLOCATED_COL_SUB_SUM_SCHEMA](state, schemaData) {
    state.schemaUnallosubcoll.count = schemaData;
    console.log("in mutation", state.schemaUnallosubcoll);
  },
  [SET_PV_CENTER_UNALLOC_COLL_DATA](state, result) {
    state.pvunalloccolllist = result;
  },
  [SET_PV_COLL_DATA](state, result) {
    state.pvcolllist = result;
  },
};
const actions = {
  //export PV center alloc
  exportPVCenterAlloc({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: ExportPVCenterAllocUrl,
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
          fileLink.download = "centerdescriptive_" + Date.now() + ".pdf"; // giving it a name
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
  //delete from pv alloc
  deletePVCenterAlloc({ commit }, deleteditem) {
    //const deleteurl = `${CenterAllocationUrl}/${deleteditem}`;
    console.log(" In action ", deleteditem);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(deletePVCenterAllocUrl, deleteditem)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in delete action : ", error);
          reject();
        });
    });
  },
  //ad to pv alloc
  addPVCenterAlloc({ commit }, schema) {
    console.log("add center-allo", JSON.stringify(schema));
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(addPVCenterAllocUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            //commit("ADD_CENTER_ALLOCATION_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  //Pv college list
  showPVCollListData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PVCollListUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_PV_COLL_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log("searchpv coll: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //unAllocated pv colleges list
  ShowPVUnallocatedCollListData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(ShowPVUnallocatedCollListUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_PV_CENTER_UNALLOC_COLL_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          console.log("searchpv alloc: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //after search PV allocation data list
  searchPVCenterAllocationData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(ShowPVCenterAllocationUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_PV_CENTER_ALLOCATION_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log("searchpv alloc: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //all data
  // fetchCenterAllocationData({ commit }) {
  //   return new Promise(function(resolve, reject) {
  //     commit("SET_LOADING", {
  //       color: "primary",
  //     });
  //     // loading Opening
  //     Axios.get(CenterAllocationUrl)
  //       .then(function(response) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         commit("SET_CENTER_ALLOCATION_DATA", result);
  //         // console.log("am I in then", response);
  //         // return state.datalist;
  //         resolve();
  //       })
  //       .catch(function(error) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // },
  //after search data
  searchCenterAllocationData({ commit }, searchParam) {
    
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      
      // loading  Opening
      Axios.get(CenterAllocationUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_CENTER_ALLOCATION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //delete item
  deleteCenterAllocationItem({ commit }, deleteditem) {
    const deleteurl = `${CenterAllocationUrl}/${deleteditem}`;
    console.log(" In action ", deleteditem);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(deleteurl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in delete action : ", error);
          reject();
        });
    });
  },
  // save data
  saveCenterAllocationData({ commit }, schema) {
    console.log("save center-allo", JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    //data["status"] = 0;
    console.log("param dat ", data);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(CenterAllocationUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_CENTER_ALLOCATION_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  // edit/update data
  editCenterAllocationData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${CenterAllocationUrl}/${data.id}`;
    console.log(CenterAllocationUrl + " bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },
  //unallocated college list
  fetchUnAllocatedCenterData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(CollegeUnAllocatedUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          var count = response.data.count;
          console.log(response.data.data);
          commit("SET_UNALLOCATED_CENTER_DATA", result);
          commit("SET_UNALLOCATED_CENTER_SCHEMA", count);
          resolve();
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //unallocated college-subject wise count list
  fetchUnAllocatedCenterSubjectWiseData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(CollegeSubjectWiseUnAllocatedUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          var count = response.data.count;
          console.log(response.data.data);
          commit("SET_UNALLOCATED_COL_SUB_SUM_DATA", result);
          commit("SET_UNALLOCATED_COL_SUB_SUM_SCHEMA", count);
          resolve();
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // save data
  saveAutoPVCenterAlloc({ commit }, schema) {
    console.log("save center-allo", JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(AutoPVCenterAllocUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            //commit("ADD_CENTER_ALLOCATION_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
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
