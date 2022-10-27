// axios
import Axios from "axios";

// apis
import { examinerStndEvaluationApi,postExaminerEvalutionApi,evaluationReportApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_EXAMINER_STADARD_EVALUATION_DATA,
  ADD_EXAMINER_STANDARD_CREATE_DATA,
  SET_EXAMINER_EVALUATION_SCHEMA_DATA,
  UNSET_EXAMINER_EVALUATION_SCHEMA_DATA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
	message: "",
	action_process: false,
	schema: {
		id: "",
		examiners: [
		{
			tims_id: "",
			examiner_code: "",
			examiner_name: "",
			examiner_username: "",
			examiner_email: "",
			examiner_type: "",
			exam_initiate_id: "",
			exam_code: "",
			year: "",
			total_script_qty: "",
			total_scan_qty: "",
			script_received_date: "",
			script_submission_date: "",
			number_of_error: "",
			statement_of_error: "",
			total_day_of_delay: "",
			examiner_standard: "",
			access: "",
			subjects: [
			{
				subject_code: "",
				subject_name: ""
			}
			],
			papers: [
			{
				paper_code: "",
				paper_name: ""
			}
			],
			details: "",
		}
	],
},
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getExamStandardEvaList(state) {
    return state.datalist;
  },
  // get form schema
  // getExaminerEvaluationSchema(state) {
  //   return state.schema.examiners;
  // }
};

// mutations
const mutations = {
  // set data list
  [SET_EXAMINER_STADARD_EVALUATION_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_EXAMINER_STANDARD_CREATE_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_EXAMINER_EVALUATION_SCHEMA_DATA](state, schemaData) {
    state.schema = schemaData;
    
  },
  // unset form schema
  [UNSET_EXAMINER_EVALUATION_SCHEMA_DATA](state) {
    state.schema = {
      	id: "",
		examiners: [
		{
			tims_id: "",
			examiner_code: "",
			examiner_name: "",
			examiner_username: "",
			examiner_email: "",
			examiner_type: "",
			exam_initiate_id: "",
			exam_code: "",
			year: "",
			total_script_qty: "",
			total_scan_qty: "",
			script_received_date: "",
			script_submission_date: "",
			number_of_error: "",
			statement_of_error: "",
			total_day_of_delay: "",
			examiner_standard: "",
			access: "",
			subjects: [
			{
				subject_code: "",
				subject_name: ""
			}
			],
			papers: [
			{
				paper_code: "",
				paper_name: ""
			}
			],
			details: "",
		}
	],
    };
  }
};

const actions = {
  // get data list
  fetchExaminerStandardEvaluationData({ commit }, searchParam) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // loading  Opening
            Axios.get(examinerStndEvaluationApi, {
                    params: searchParam,
                })
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    var result = response.data.data;
                    
                    commit('SET_EXAMINER_STADARD_EVALUATION_DATA', result);
                    resolve(response.data);
                })
                .catch(function(error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

      exportExaminerEvaluationReport({
        commit
    }, searchParam) {
        commit('SET_LOADING', {
            color: 'primary',
        });
        return new Promise((resolve, reject) => {
            Axios({
                    url: evaluationReportApi,
                    method: 'GET',
                    params: searchParam,
                })
                .then(response => {
                    commit('UNSET_LOADING'); // loading Closing
                    let url = response.data.data;
                    console.log(url);

                    // showing on a new tab
                    var fileLink = document.createElement('a'); //  Creating a new <a> tag dynamically
                    fileLink.href = url; // assigning url to that
                    fileLink.download = 'examinerheadwise_' + Date.now() + '.pdf'; // giving it a name
                    fileLink.target = '_blank'; // ensuring that it goes to the new tab
                    //After all that is done
                    document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                    fileLink.click(); // finally clicking it  .
                })
                .catch(function (error) {
                    commit('UNSET_LOADING'); // loading Closing
                    console.log('I am in error', error);
                });
        });
    },
  saveExaminerStandardData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema.data;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    // const url = `${postExaminerEvalutionApi}`;
    // console.log(" bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(postExaminerEvalutionApi, data, {
                    params: schema.searchParam,
                })
        .then(function(response) {
          console.log("after response edit", response.data);
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log(error);
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
