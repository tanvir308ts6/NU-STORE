/* eslint-disable prettier/prettier */
import Axios from "axios";
import {
  Examinfo_FetchUrl,
  Centerinfo_FetchUrl,
  Courseinfo_FetchUrl,
  Teacherinfo_FetchUrl,
  Studentinfo_FetchUrl,
  RegionalCenterinfo_FetchUrl,
  Collegeinfo_FetchUrl,
  Examinerinfo_FetchUrl,
  TMSExaminer_FetchURL,
  UserTypeApi,
  Degreeinfo_FetchUrl,
  Paperinfo_FetchUrl,
  Divisioninfo_FetchUrl,
  Districtinfo_FetchUrl,
  SubjectListUrl,
  PaperListUrl,
  AllYears_FetchUrl,
  practicalVivaCenterList,
  AllSessions_FetchUrl,
  RescrutinyPaperListApi,
  SubByPractical_FetchUrl,
  SubByViva_FetchUrl,
  PaperByPractical_FetchUrl,
  PaperByViva_FetchUrl,
  PraacticalCenterList,
  VivaCenterList,
  CenterByTypeApi,
  SubByPracViva_FetchUrl,
} from "../api";

import {
  SET_EXAM_DATA,
  SET_CENTER_DATA, // center
  SET_COURSE_DATA,
  SET_SUBJECT_DATA,
  SET_TEACHER_DATA,
  SET_STUDENT_DATA,
  SET_REGCENTER_DATA,
  SET_COLLEGE_DATA,
  SET_EXAMINER_DATA,
  SET_EXAMINER_DATA_BY_TYPE,
  SET_USER_TYPE_SCHEMA,
  SET_DEGREE_DATA,
  SET_PAPER_DATA,
  SET_EXAM_WISE_PAPER_DATA,
  SET_DIVISION_DATA,
  SET_DISTRICT_DATA,
  SET_ALL_YEARS,
  SET_PV_CENTER_DATA,
  UN_SET_ALL_YEARS,
  UN_SET_EXAM_DATA,
  SET_ALL_SESSIONS,
  SET_PAPER_BYRESCRUTINER_DATA,
  SET_PAPER_DATA_BY_PRACTICAL,
  SET_PAPER_DATA_BY_VIVA,
  SET_PRACTICAL_CENTER_DATA,
  SET_VIVA_CENTER_DATA,
  SET_THEORY_CENTER_DATA,
  // SET_SUBJECT_DATA
  SET_SUB_DATA_BY_VIVA,
  SET_SUB_DATA_BY_PRACTICAL,
  SET_SUB_DATA_BY_PV,
} from "../mutation-types";

const state = {
  examlist: [],
  centerlist: [],
  courselist: [],
  //subjectlist: [],
  teacherlist: [],
  studentlist: [],
  regCenterlist: [],
  collegelist: [],
  examinerlist: [],
  examinerlistByType: [],
  usertypelist: [],
  degreelist: [],
  paperlist: [],
  //exam wise paper
  examwisepaperlist: [],
  divisionlist: [],
  districtlist: [],
  subjectlist: [],
  allYears: [],
  pvCenterlist: [],
  sessionList: [],
  paperbyrescrutinerList: [],
  paperbyPracticalList: [],
  paperByVivaList: [],
  centerListByPractical: [],
  centerListByViva: [],
  centerListByTheory: [],
  subByPrac: [],
  subByViva: [],
  subByVivaPrac: [],
};

const getters = {
  getExamItem(state) {
    return state.examlist;
  },
  getCenterItems(state) {
    return state.centerlist;
  },
  getCourseItems(state) {
    return state.courselist;
  },
  getTeacherItems(state) {
    return state.teacherlist;
  },
  getStudentItems(state) {
    return state.studentlist;
  },
  getRegCenterItems(state) {
    return state.regCenterlist;
  },
  getCollegeItems(state) {
    return state.collegelist;
  },
  getExaminerItems(state) {
    return state.examinerlist;
  },
  getExaminerItemsByType(state) {
    return state.examinerlistByType;
  },
  getUserTypeItems(state) {
    return state.usertypelist;
  },
  getPaperItems(state) {
    return state.paperlist;
  },
  getDegreeItems(state) {
    return state.degreelist;
  },
  getDivisionItems(state) {
    return state.divisionlist;
  },
  getDistrictItems(state) {
    return state.districtlist;
  },
  getExamWisePaperItems(state) {
    return state.examwisepaperlist;
  },
  getSubjectItems(state) {
    return state.subjectlist;
  },
  getYearItems(state) {
    return state.allYears;
  },
  getPVCenterItems(state) {
    return state.pvCenterlist;
  },

  getSessionItems(state) {
    return state.sessionList;
  },
  getPaperByResItems(state) {
    return state.paperbyrescrutinerList;
  },
  getPaperByPractical(state) {
    return state.paperbyPracticalList;
  },
  getPaperByViva(state) {
    return state.paperByVivaList;
  },
  // these ones
  getTheoryCenterList(state) {
    return state.centerListByTheory;
  },
  getCenterListByPractical(state) {
    return state.centerListByPractical;
  },
  getCenterListByViva(state) {
    return state.centerListByViva;
  },
  getSubByPractical(state) {
    return state.subByPrac;
  },
  getSubByViva(state) {
    return state.subByViva;
  },
  getSubByVivaPrac(state) {
    return state.subByVivaPrac;
  },
};
const mutations = {
  [SET_EXAM_DATA](state, result) {
    state.examlist = result;
  },
  [UN_SET_EXAM_DATA](state, result) {
    console.log("UNSET EXSM dta ");
    state.examlist = [];
  },
  [SET_CENTER_DATA](state, result) {
    state.centerlist = result;
  },
  [SET_COURSE_DATA](state, result) {
    state.courselist = result;
  },
  [SET_SUBJECT_DATA](state, result) {
    state.subjectlist = result;
  },
  [SET_TEACHER_DATA](state, result) {
    state.teacherlist = result;
  },
  [SET_STUDENT_DATA](state, result) {
    state.studentlist = result;
  },
  [SET_REGCENTER_DATA](state, result) {
    state.regCenterlist = result;
  },
  [SET_COLLEGE_DATA](state, result) {
    state.collegelist = result;
  },
  [SET_EXAMINER_DATA](state, result) {
    state.examinerlist = result;
  },
  [SET_EXAMINER_DATA_BY_TYPE](state, result) {
    state.examinerlistByType = result;
  },
  [SET_USER_TYPE_SCHEMA](state, result) {
    state.usertypelist = result;
  },
  [SET_DEGREE_DATA](state, result) {
    state.degreelist = result;
  },
  [SET_PAPER_DATA](state, result) {
    state.paperlist = result;
  },
  //by rescrutiner paper
  [SET_PAPER_BYRESCRUTINER_DATA](state, result) {
    state.paperbyrescrutinerList = result;
  },
  // set exam wise paper list
  [SET_EXAM_WISE_PAPER_DATA](state, result) {
    state.examwisepaperlist = result;
  },
  [SET_DIVISION_DATA](state, result) {
    state.divisionlist = result;
  },
  [SET_DISTRICT_DATA](state, result) {
    state.districtlist = result;
  },
  // [SET_SUBJECT_DATA](state, result) {
  //   state.subjectlist = result;
  // },

  [SET_ALL_YEARS](state, result) {
    state.allYears = result;
  },
  [UN_SET_ALL_YEARS](state, result) {
    // console.log("UNSE T YE");
    state.allYears = [];
  },
  [SET_PV_CENTER_DATA](state, result) {
    state.pvCenterlist = result;
  },

  [SET_ALL_SESSIONS](state, result) {
    state.sessionList = result;
  },

  [SET_SUB_DATA_BY_PRACTICAL](state, result) {
    state.subByPrac = result;
  },
  [SET_SUB_DATA_BY_VIVA](state, result) {
    state.subByViva = result;
  },
  [SET_SUB_DATA_BY_PV](state, result) {
    state.subByVivaPrac = result;
  },
  [SET_PAPER_DATA_BY_PRACTICAL](state, result) {
    state.paperbyPracticalList = result;
  },
  [SET_PAPER_DATA_BY_VIVA](state, result) {
    state.paperByVivaList = result;
  },

  // center data by type

  [SET_PRACTICAL_CENTER_DATA](state, result) {
    state.centerListByPractical = result;
  },
  [SET_VIVA_CENTER_DATA](state, result) {
    state.centerListByViva = result;
  },
  [SET_THEORY_CENTER_DATA](state, result) {
    state.centerListByTheory = result;
  },
};
const actions = {
  fetchUSerTypeData({ commit, state }, searchParam) {
    if (searchParam == undefined) {
      searchParam = {
        limit: -1,
      };
    }
    console.log("Action calling ");
    return new Promise(function(resolve, reject) {
      Axios.get(UserTypeApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_USER_TYPE_SCHEMA", result);
          // console.log("set ", state.usertypelist);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  fetchExamData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(Examinfo_FetchUrl, {
        params: searchParam
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_EXAM_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  // fetchExamData({ commit }) {
  //   console.log("Action calling EEEEEEEE");
  //   return new Promise(function(resolve, reject) {
  //     Axios.get(Examinfo_FetchUrl)
  //       .then(function(response) {
  //         // console.log("response that came", response.data);
  //         var result = response.data.data;
  //         // console.log("fetchExamData -->result", result);
  //         commit("SET_EXAM_DATA", result);
  //         localStorage.setItem("allExams", JSON.stringify(result));

  //         // // console.log("set ", state.examlist);
  //         resolve();
  //       })
  //       .catch(function(error) {
  //         // handle error
  //         // // console.log(error);
  //         reject();
  //       });
  //   });
  // },
  fetchDivisionData({ commit }, limit) {
    // console.log("Action calling ");
    return new Promise(function(resolve, reject) {
      Axios.get(Divisioninfo_FetchUrl, {
        params: limit,
      })
        .then(function(response) {
          // console.log("response that came", response.data);
          var result = response.data.data;
          // console.log("fetchExamData -->result", result);
          commit("SET_DIVISION_DATA", result);
          // // console.log("set ", state.examlist);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },
  fetchDistrictData({ commit }, limit) {
    // console.log("Action calling ");
    return new Promise(function(resolve, reject) {
      Axios.get(Districtinfo_FetchUrl, {
        params: limit,
      })
        .then(function(response) {
          // console.log("response that came", response.data);
          var result = response.data.data;
          // console.log("fetchExamData -->result", result);
          commit("SET_DISTRICT_DATA", result);
          // // console.log("set ", state.examlist);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchDegreeData({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Degreeinfo_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_DEGREE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  // for routine exam wise paper list
  fetchExamWiseData({ commit }, exam_code) {
    return new Promise(function(resolve, reject) {
      // commit("SET_LOADING", {
      //   color: "primary"
      // }); // loading Opening
      Axios.get(Paperinfo_FetchUrl + "?exam_code=" + exam_code)
        .then(function(response) {
          
          var result = response.data.data;
          console.log('result',result);
          commit("SET_EXAM_WISE_PAPER_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          // commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  //others
  fetchPaperData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(Paperinfo_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response.data )
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_PAPER_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },

  //others pv wise pap
  fetchPaperDataByPractical({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // api/auth/report/practical-paper-list?
      Axios.get(PaperByPractical_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          console.log("sp: in fetchPaperDataByPractical", response.data);
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_PAPER_DATA_BY_PRACTICAL", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  fetchPaperDataByViva({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // api/auth/report/practical-paper-list?
      Axios.get(PaperByViva_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("sp: in fetchPaperDataByPractical", response.data);
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_PAPER_DATA_BY_VIVA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //PV wise sub
  fetchSubDataByPV({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // api/auth/report/practical-paper-list?
      Axios.get(SubByPracViva_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          console.log("sp: in fetchSubDataByPractical", response.data);
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_SUB_DATA_BY_PV", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //prac wise sub
  fetchSubDataByPractical({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // api/auth/report/practical-paper-list?
      Axios.get(SubByPractical_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          console.log("sp: in fetchSubDataByPractical", response.data);
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_SUB_DATA_BY_PRACTICAL", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //prac wise sub
  fetchSubDataByViva({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // api/auth/report/practical-paper-list?
      Axios.get(SubByViva_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_SUB_DATA_BY_VIVA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  //rescrutiner papers
  fetchPaperByRescrutinerData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(RescrutinyPaperListApi, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response.data )
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_PAPER_BYRESCRUTINER_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchCourseData({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Courseinfo_FetchUrl)
        .then(function(response) {
          //console.log("response that came", response.data )
          var result = response.data.data;
          //// console.log("result", result)
          commit("SET_COURSE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },
  fetchCenterData({ commit }, searchParam) {
    if (searchParam == undefined) {
      searchParam = {
        limit: -1,
      };
    }
    return new Promise(function(resolve, reject) {
      Axios.get(Centerinfo_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          console.log("Center", result);
          commit("SET_CENTER_DATA", result);
          //handle success
          //return state.centerlist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },

  // this one for all alloc center
  fetchCenterAllocData({ commit }, searchParam) {
    // if (searchParam == undefined) {
    //   searchParam = { limit: -1 };
    // }
    // exam_initiate_id=1&exam_code=3302&year=2017&type=2

    return new Promise(function(resolve, reject) {
      Axios.get(CenterByTypeApi, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data;
          console.log("Center", result);
          commit("SET_CENTER_DATA", result);
          //handle success
          //return state.centerlist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },

  // these ones
  fetchTheoryWiseCenterData({ commit }, searchParam) {
    if (searchParam == undefined) {
      searchParam = {
        type: 1,
      };
    } else {
      searchParam.type = 1;
    }
    return new Promise(function(resolve, reject) {
      Axios.get(CenterByTypeApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          commit("SET_THEORY_CENTER_DATA", result);
          console.log("shanita check", result);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchPracticalWiseCenterData({ commit }, searchParam) {
    console.log("sp sp sp ::", searchParam);

    if (searchParam == undefined) {
      searchParam = {
        type: 2,
      };
    } else {
      searchParam.type = 2;
    }
    // exam_initiate_id=1&exam_code=3302&year=2017&type=2

    return new Promise(function(resolve, reject) {
      Axios.get(CenterByTypeApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          console.log("in practical -->", result);
          // console.log("PV Center", result);
          commit("SET_PRACTICAL_CENTER_DATA", result);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchVivaWiseCenterData({ commit }, searchParam) {
    if (searchParam == undefined) {
      searchParam = {
        type: 2,
      };
    } else {
      searchParam.type = 2;
    }
    return new Promise(function(resolve, reject) {
      Axios.get(CenterByTypeApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          console.log("PV Center", result);
          commit("SET_VIVA_CENTER_DATA", result);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  fetchRegCenterData({ commit }, searchParam) {
    // console.log("-------------------------", searchParam);
    if (searchParam == undefined) {
      searchParam = {
        limit: -1,
      };
    }
    return new Promise(function(resolve, reject) {
      Axios.get(RegionalCenterinfo_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          // // console.log("......?result", result);
          commit("SET_REGCENTER_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },
  // fetchSubjectData({
  //     commit
  // }) {
  //     return new Promise(function (resolve, reject) {
  //         Axios.get(SubjectListUrl)
  //             .then(function (response) {
  //                 //console.log("response that came", response )
  //                 var result = response.data.data;
  //                 //// console.log("result", result )
  //                 commit('SET_SUBJECT_DATA', result);
  //                 //handle success
  //                 //return state.courselist;
  //                 resolve();
  //             })
  //             .catch(function (error) {
  //                 // handle error
  //                 // // console.log(error);
  //                 reject();
  //             });
  //     });
  // },

  fetchSubjectData({ commit }, searchParam) {
    console.log("fdfdfd", JSON.stringify(searchParam));
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(SubjectListUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));
          commit("SET_SUBJECT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  fetchAllSubjects({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(SubjectListUrl)
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          // console.log("----> subject", result);
          //// console.log("result", result )
          commit("SET_SUBJECT_DATA", result);
          //handle success
          //return state.courselist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },
  fetchTeachertData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Teacherinfo_FetchUrl)
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          //// console.log("result", result )
          commit("SET_TEACHER_DATA", result);
          //handle success
          //return state.teacherlist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },
  fetchStudentData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(Studentinfo_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_STUDENT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },
  fetchCollegeData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Collegeinfo_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_COLLEGE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },
  //college code wise
  fetchCollegeCodewiseData({ commit }, code) {
    let url = `${Collegeinfo_FetchUrl}?college_code=${code}`;
    return new Promise(function(resolve, reject) {
      Axios.get(url)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_COLLEGE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  fetchCollegeWithStudentCount({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Collegeinfo_FetchUrl + "?student_count")
        .then(function(response) {
          var result = response.data.data;
          commit("SET_COLLEGE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },

  fetchExaminerData({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(Examinerinfo_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_EXAMINER_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },

  fetchExaminerByTypeData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(TMSExaminer_FetchURL, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_EXAMINER_DATA_BY_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },

  fetchYearData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(AllYears_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          commit("SET_ALL_YEARS", result.data);
          localStorage.setItem("allYears", JSON.stringify(result.data));
          // console.log("in fetchYearData", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          reject();
        });
    });
  },
  fetchPVCenterData({ commit }, searchParam) {
       if (searchParam == undefined) {
         searchParam = {
           type: 1, // for PV
         };
       } else {
         searchParam.type = 1;
       }
    return new Promise(function(resolve, reject) {
      Axios.get(practicalVivaCenterList, {
        params: searchParam,
      })
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          console.log("PV Center", result);
          commit("SET_PV_CENTER_DATA", result);
          //handle success
          //return state.centerlist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          // // console.log(error);
          reject();
        });
    });
  },

  fetchAllSessionData({ commit }, searchParam) {
    if (searchParam == undefined) {
      searchParam = {
        limit: -1,
      };
    }
    return new Promise(function(resolve, reject) {
      Axios.get(AllSessions_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          // console.log("result", response);
          commit("SET_ALL_SESSIONS", result.data);
          //   localStorage.setItem("allYears", JSON.stringify(result.data));
          // console.log("in fetchYearData", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
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
