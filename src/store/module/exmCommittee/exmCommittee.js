import Axios from "axios";
import {
  GET_SCHEMA_DATA,
  GET_SCHEMA_GENDER_DATA,
  GET_SCHEMA_ORGANIZATION_DATA,
  GET_SCHEMA_DESIGNATION_DATA,
  GET_SCHEMA_REG_TYPE_DATA,
  SET_SCHEMA_FORM_DATA,
  GET_EXAM_COMMITTEE_SCHEMA_DATA,
  GET_EXAM_COMMITTEE_MEMBER_DATA,
  GET_SUBJECT_WISE_MEMBER_DATA,
  GET_MEETING_DATA,
  SET_SCHEMA_EDIT_DATA,
  GET_EC_WISE_MEMBER_DATA,
  SET_EXM_COMMITTEE_EDIT_DATA,
  GET_SCHEMA_PROF_DESIGNATION_DATA,
  GET_SCHEMA_REG_ORG_DATA
} from "../../mutation-types";
import {
  exmCommittee,
  exmCommitteeMembers,
  exmCommitteeMemberApi,
  subjectWiseEcMembers,
  exmCommitteeMemberEdit,
  exmCommitteeMeeting,
  ecWiseMember,
  ecmMemberDetail,
  exportExamCommittee,
  exportEcmMeeting
} from "../../api";
import { saveMsg, updateMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],

  // array item
  genderArr: [
    { id: "1", name: "Male" },
    { id: "2", name: "FeMale" }
  ],

  orgTypeArr: [
    { id: "1", name: "Govt" },
    { id: "2", name: "Non Govt" }
  ],

  designationArr: [
    { id: "1", name: "PRINCIPLE" },
    { id: "2", name: "PROFESSOR" },
    { id: "3", name: "OFFICE ASSISTENCE" },
    { id: "4", name: "DEPT. HEAD" }
  ],

  profDesignationArr: [
    { id: "1", name: "Controller" },
    { id: "2", name: "Ict Director" },
    { id: "3", name: "Programmer" },
    { id: "4", name: "Moderator" }
  ],

  examCommiteeRoles: [
    { id: "1", name: "Chairman" },
    { id: "2", name: "Moderator" },
    { id: "3", name: "Question Setter" },
    { id: "4", name: "Member" }
  ],

  regTypeArr: [
    { id: "1", name: "Teacher" },
    { id: "2", name: "Member" }
  ],

  regOrgArr: [{ id: "1", name: "National University" }],

  // committee member
  schemaData: {
    id: "",
    name: "",
    father_name: "",
    gender: "",
    date_of_birth: "",
    nid_no: "",
    joining_date: "",
    organization_type: "",
    jod_present_deg: "",
    designation: "",
    subject_code: "",
    index_no: "",
    photo: "",
    signature: "",

    division_id: "",
    district_id: "",
    thana_id: "",
    college_code: "",

    teacher_organization: "",
    teacher_designation: "",

    present_address: "",
    permanent_address: "",
    email: "",
    mobile: "",
    phone: "",
    office_phone: "",
    reg_type: "",
    username: ""
  },

  // Exam committee
  exmCommitteeList: [],
  exmCommitteeMemberDetail: [],
  subjectWiseMember: [],
  editCommitteeSchemaData: {
    id: "",
    committee_name: "",
    subject_code: "",
    member_designation: "",
    selected: []
  },
  // Exam Meeting
  examMeetingList: [],
  ecWiseMemberList: [],
  editSchemaData: {
    id: "",
    exam_code: 0,
    exam_committee_id: "",
    meeting_name: "",
    place: "",
    agenda: "",
    decision: "",
    meeting_start: "",
    meeting_date: "",
    meeting_time: "",
    selected: []
  }
};

const getters = {
  getSchemaList(state) {
    return state.schema;
  },

  getSchemaFormData(state) {
    return state.schemaData;
  },

  getSchemaEditData(state) {
    return state.editSchemaData;
  },

  getSchemaGender(state) {
    return state.genderArr;
  },
  getSchemaOrgType(state) {
    return state.orgTypeArr;
  },
  getSchemaDesignation(state) {
    return state.designationArr;
  },
  getCommiteeRoles(state) {
    return state.examCommiteeRoles;
  },
  getSchemaOrganization(state) {
    return state.regOrgArr;
  },
  getSchemaProfDesignation(state) {
    return state.profDesignationArr;
  },
  getSchemaRegType(state) {
    return state.regTypeArr;
  },

  getExmCommitteeList(state) {
    return state.exmCommitteeList;
  },
  getExmCommitteeMemberList(state) {
    return state.exmCommitteeMemberDetail;
  },
  getSubjectWiseMemberList(state) {
    return state.subjectWiseMember;
  },
  getExamCommitteeEditData(state) {
    return state.editCommitteeSchemaData;
  },
  getMeetingList(state) {
    return state.examMeetingList;
  },
  getEcMemberList(state) {
    return state.ecWiseMemberList;
  }
};

const mutations = {
  //get data from api
  [GET_SCHEMA_DATA](state, result) {
    state.schema = result;
  },
  [SET_SCHEMA_FORM_DATA](state, result) {
    state.schemaData = result;
  },
  [SET_SCHEMA_EDIT_DATA](state, result) {
    state.editSchemaData = result;
  },
  [GET_SCHEMA_GENDER_DATA](state, result) {
    state.genderArr = result;
  },
  [GET_SCHEMA_ORGANIZATION_DATA](state, result) {
    state.orgTypeArr = result;
  },
  [GET_SCHEMA_DESIGNATION_DATA](state, result) {
    state.designationArr = result;
  },
  [GET_SCHEMA_PROF_DESIGNATION_DATA](state, result) {
    state.profDesignationArr = result;
  },
  [GET_SCHEMA_REG_TYPE_DATA](state, result) {
    state.regTypeArr = result;
  },
  [GET_SCHEMA_REG_ORG_DATA](state, result) {
    state.regOrgArr = result;
  },

  [GET_EXAM_COMMITTEE_SCHEMA_DATA](state, result) {
    state.exmCommitteeList = result;
  },
  [GET_EXAM_COMMITTEE_MEMBER_DATA](state, result) {
    state.exmCommitteeMemberDetail = result;
  },
  [GET_SUBJECT_WISE_MEMBER_DATA](state, result) {
    state.subjectWiseMember = result;
  },
  [GET_MEETING_DATA](state, result) {
    state.examMeetingList = result;
  },
  [GET_EC_WISE_MEMBER_DATA](state, result) {
    state.ecWiseMemberList = result;
  },
  [SET_EXM_COMMITTEE_EDIT_DATA](state, result) {
    state.editCommitteeSchemaData = result;
  }
};

const actions = {
  fetchExmCommitteeMemberList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(exmCommitteeMemberApi, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_SCHEMA_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  saveExmCommittee({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(exmCommitteeMemberApi, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  updateEcMember({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema.formData;
    const url = `${exmCommitteeMemberEdit}/${schema.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
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
  },

  // ======================== Exam Committee ==================================
  fetchExmCommitteeList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(exmCommittee, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_EXAM_COMMITTEE_SCHEMA_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchExamCommitteeMember({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(exmCommitteeMembers, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_EXAM_COMMITTEE_MEMBER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchSubjectWiseMember({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(subjectWiseEcMembers, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_SUBJECT_WISE_MEMBER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  saveExmCommitteeAllocatedMember({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(exmCommittee, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  updateExmCommitteeAllocatedMember({ commit }, schema) {
    let data = schema;
    const url = `${exmCommittee}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  exportExamCommitteeDetail({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: exportExamCommittee,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          if (response.data) {
            const fileURL = window.URL.createObjectURL(
              new Blob([response.data])
            );
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "ec_" + Date.now() + ".pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
          } else {
            commit("SET_SNACKBAR", {
              msg: "Data not found",
              color: "red"
            });
            reject();
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  //================================= Meeting ====================================================
  fetchExmCommitteeMeetingList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(exmCommitteeMeeting, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_MEETING_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchEcWiseMembers({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ecWiseMember, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data;
          //console.log(result);
          commit("GET_EC_WISE_MEMBER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchEecmMemberDetail({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ecmMemberDetail, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_EXAM_COMMITTEE_MEMBER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  exportExamCommitteeMeetingDetail({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: exportEcmMeeting,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          if (response.data) {
            const fileURL = window.URL.createObjectURL(
              new Blob([response.data])
            );
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "meeting_" + Date.now() + ".pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
          } else {
            commit("SET_SNACKBAR", {
              msg: "Data not found",
              color: "red"
            });
            reject();
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  saveEcmMember({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(exmCommitteeMeeting, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  updateEcmMember({ commit }, schema) {
    let data = schema;
    const url = `${exmCommitteeMeeting}/${data.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
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
