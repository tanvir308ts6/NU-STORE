/* eslint-disable prettier/prettier */
import layoutAdmin from "./layouts/layoutAdmin.vue";

import landingPage from "./views/util/landingPage.vue";
import homePage from "./views/util/homePage.vue";
//dashboard
import dashboard from "./views/util/Dashboard.vue";
import PageNotFound from "./views/util/pageNotFound.vue";
import LoginRegister from "./views/util/LoginRegister.vue";
import ChangePassword from "./views/util/ChangePassword.vue";
import About from "./views/util/About.vue";
import UserManual from "./views/util/UserManual.vue";

import biBasic from "@/views/biModule/biBasic.vue";
import biPassFail from "@/views/biModule/biPassFail.vue";
import biReport from "@/views/biModule/biReport.vue";

import layoutVerification from "./layouts/layoutVerification";

export default [
  {
    path: "/",
    component: landingPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/user-manual",
    component: UserManual,
  },
  {
    path: "/login", 
    component: LoginRegister,
  },
 
  {
    path: "/register",
    component: () => import("@/views/util/onlineCertificateSignup"),
  },
  {
    path: "/online/",
    component: layoutVerification,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "online-certificate-add",
        component: () => import("@/views/onlineCertificate/onlineCertificateAdd"),
      },
      {
        path: "online-certificate-list",
        component: () => import("@/views/onlineCertificate/onlineCertificateList"),
      },
    ],
  },
  {
    path: "/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "home",
        component: homePage,
      },
      {
        path: "dashboard",
        component: dashboard,
      },
      {
        path: "/change-password", 
        component: ChangePassword,
      },
      {
        path: "result",
        component: () => import("@/views/result/resultList"),
      },
      {
        path: "result-logic",
        component: () => import("@/views/admin/resultLogic"),
      },
      {
        path: "result-type",
        component: () => import("@/views/admin/resultType"),
      },
      {
        path: "h-type-matching",
        component: () => import("@/views/result/hTypeMatching"),
      },
      {
        path: "result-tabulation",
        component: () => import("@/views/result/resultTabulation"),
      },
      {
        path: "tabulation-result-generate",
        component: () => import("@/views/result/resultGenerateFromTabulation"),
      },
      {
        path: "student-examination-record",
        component: () => import("@/views/admin/studentExaminationRecord"),
      },
      {
        path: "result-generate",
        component: () => import("@/views/result/resultGenerate"),
      },
      {
        path: "admit-card",
        component: () => import("@/views/admitCard/admitCard"),
      },
      {
        path: "grading-system",
        component: () => import("@/views/admitCard/gradingSystem"),
      },
      {
        path: "admit-card-dd",
        component: () => import("@/views/admitCard/admitCardDD"),
      },
      {
        path: "admitcard-group-by-college",
        component: () => import("@/views/admitCard/admitCardByColMain"),
      },
      {
        path: "admit-card-generate",
        component: () => import("@/views/admitCard/admitGenerate"),
      },
      {
        path: "form-fillup-group-by-college",
        component: () => import("@/views/form_FillUp/formFillupByCol"),
      },
      {
        path: "pdf-setup",
        component: () => import("@/views/pdf/pdfSetup"),
      },
      {
        path: "transcript",
        component: () => import("@/views/certification/transcriptDownload"),
      },
      {
        path: "transcript-list",
        component: () => import("@/views/certification/transcriptList"),
      },
      {
        path: "transcript-lists",
        component: () => import("@/views/transcript/transcriptList"),
      },
      {
        path: "us-statement",
        component: () => import("@/views/center/unusedScriptStatement"),
      },
      {
        path: "marksheet-list",
        component: () => import("@/views/marksheet/marksheetList"),
      },
      {
        path: "practical-dashboard",
        component: () => import("@/views/practicalViva/dashboard"),
      },
      // {
      //   path: "viva-dashboard",
      //   component: () => import("@/views/practicalViva/vivaDashboard"),
      // },
      {
        path: "mark-sheet",
        component: () => import("@/views/certification/marksheetDownload"),
      },
      {
        path: "certificate-design",
        component: () => import("@/views/certificateDesign/certificateDesign"),
      },
      {
        path: "question-entry",
        component: () => import("@/views/questionSection/questionPaperList"),
      },
      // {
      //   path: "exam-routine",
      //   component: () => import("@/views/admin/examRoutine")
      // },
      {
        path: "certificate-verified-list",
        component: () => import("@/views/onlineCertificate/paidOrganizationList"),
      },
      {
        path: "amanuensis-list",
        component: () => import("@/views/amanuensis/amanuensisList"),
      },
      {
        path: "reg-center-map",
        component: () => import("@/views/regionalCenter/regionalCenterMap"),
      },
      {
        path: "grace-calculator",
        component: () => import("@/views/result/graceMarksCalculator"),
      },
      {
        path: "grace-mark-summary",
        component: () => import("@/views/result/graceMarkSummary"),
      },
      {
        path: "published-activity-status",
        component: () => import("@/views/admin/publishedActivityStatus"),
      },
      //if using same file & route param pass // need to create two submenu. link will b /result-approval/result & /result-approval/rescrutiny
      // {
      //   path: "result-approval/:type",
      //   component: () => import("@/views/result/resultApproval"),
      //   props: {
      //     name: "rescrutiny",
      //     type: 2,
      //   },
      // },
      {
        path: "result-approval",
        component: () => import("@/views/result/resultApproval"),
      },
      {
        path: "rescrutiny-approval",
        component: () => import("@/views/rescrutiner/rescrutinyApproval"),
      },
      {
        path: "all-marks",
        component: () => import("@/views/result/allMarksList"),
      },
      {
        path: "chunk-result",
        component: () => import("@/views/result/chunkStudentResult"),
      },
      {
        path: "exam-routine-list",
        component: () => import("@/views/admin/examRoutineList"),
      },
      {
        path: "schedule-change",
        component: () => import("@/views/admin/routineScheduleChange"),
      },
      {
        path: "pv-allocation",
        component: () => import("@/views/practicalViva/pvAllocation"),
      },
      {
        path: "bulk-admit-transcript-marksheet",
        component: () => import("@/views/bulkAll/bulkAll"),
      },
      {
        path: "college-list",
        component: () => import("@/views/admin/collegeList"),
      },
      {
        path: "student-list",
        component: () => import("@/views/examinee/studentList"),
      },
      {
        path: "division-list",
        component: () => import("@/views/division/divisionList"),
      },
      {
        path: "year-list",
        component: () => import("@/views/examYear/examYearList"),
      },
      {
        path: "offday-list",
        component: () => import("@/views/offDay/offDayList"),
      },
      {
        path: "rescrutiner-list",
        component: () => import("@/views/rescrutiner/rescrutinerList"),
      },
      {
        path: "scrutineer-list",
        component: () => import("@/views/scrutineer/scrutineerList"),
      },
      {
        path: "certificate-list",
        component: () => import("@/views/certificate/certificateList"),
      },
      {
        path: "district-list",
        component: () => import("@/views/district/districtList"),
      },
      {
        path: "dc-list",
        component: () => import("@/views/districtController/districtControllerList"),
      },
      {
        path: "center-allocation/:type",
        component: () => import("@/views/center/centerAllocation"),
        props: {
          name: "practical",
          type: 2,
        },
      },
      {
        path: "token-verify",
        component: () => import("@/views/tokenVerification/tokenVerification"),
      },
      // {
      //   path: "create-center-allocation",
      //   component: () => import("@/views/center/createCenterAllocation")
      // },
      {
        path: "missing-script",
        component: () => import("@/views/missingScript/missingScriptList"),
      },
      {
        path: "registration",
        component: () => import("@/views/registrations/registrationList"),
      },
      {
        path: "final-examinee-list",
        component: () => import("@/views/examinee/finalExamineeList"),
      },
      {
        path: "admin-dashboard",
        component: () => import("@/views/admin/adminDashboard/adminDashboard"),
      },
      {
        path: "role",
        component: () => import("@/views/role/roleList"),
      },
      {
        path: "role-grant",
        component: () => import("@/views/role/roleGrant"),
      },
      //role for check
      {
        path: "/role-details",
        component: () => import("@/views/role/roleDetails"),
      },
      {
        path: "exam_committee",
        component: () => import("@/views/examCommittee/examCommittee"),
      },
      {
        path: "exam-initiate",
        component: () => import("@/views/examInitiate/examInitiate"),
      },
      {
        path: "exam-initiate-list",
        component: () => import("@/views/examInitiate/examInitiateList"),
      },
      {
        path: "/PageNotFound",
        component: PageNotFound,
      },
      {
        path: "/log-data",
        component: () => import("@/views/logData/logList"),
      },
      {
        path: "/biBasic",
        component: biBasic,
      },
      {
        path: "/biPassFail",
        component: biPassFail,
      },
      {
        path: "/biReport",
        component: biReport,
      },
      {
        path: "/form-fillup",
        component: () => import("@/views/form_FillUp/form_fillup"),
      },
      {
        path: "/rollGenerate",
        component: () => import("@/views/rollGen/rollGenerateView"),
      },
      {
        path: "invigilator-list",
        component: () => import("@/views/invigilator/invigilatorList"),
      },
      {
        path: "invigilator-list-detail",
        component: () => import("@/views/invigilator/invCenterwise"),
      },
      {
        path: "invigilator-profile",
        component: () => import("@/views/invigilator/invigilatorProfile"),
      },
      {
        path: "invigilator-dashboard",
        component: () => import("@/views/invigilator/invigilatorDashboard"),
      },

      {
        path: "attendance-by-exam-year",
        component: () => import("@/views/attendence/attendanceListByExamYear"),
      },
      {
        path: "std-attendance",
        component: () => import("@/views/attendence/studentAttendanceInfo"),
      },

      {
        path: "regional_center",
        component: () => import("@/views/regionalCenter/regionalCenterList"),
      },
      {
        path: "regional_center_user",
        component: () => import("@/views/regionalCenter/regionalCenterUser"),
      },
      {
        path: "regional-center-dashboard",
        component: () => import("@/views/regionalCenter/rcDashboard/rcDashboard"),
      },

      {
        path: "examiner/as-coll-from-reg",
        component: () => import("@/views/examiner/ExamAsCollFromRegList"),
      },
      {
        path: "examiner/as-dist-to-reg",
        component: () => import("@/views/examiner/ExamAsDistToRegList"),
      },
      {
        path: "examiner/mark",
        component: () => import("@/views/examiner/markList"),
      },

      //examiner access
      {
        path: "examiner-access",
        component: () => import("@/views/examiner/examinerAccess"),
      },

      //invigilator access
      {
        path: "invigilator-access",
        component: () => import("@/views/invigilator/invigilatorAccess"),
      },
      {
        path: "examiner-list",
        component: () => import("@/views/examiner/examinerList"),
      },
      {
        path: "examiner-by-head-examiner",
        component: () => import("@/views/headExaminer/headExaminerwiseExaminer"),
      },
      {
        path: "examiner-standard-evaluation",
        component: () => import("@/views/headExaminer/examinerStandEvaluation"),
      },
      {
        path: "revised-mark-request",
        component: () => import("@/views/headExaminer/revisedMarkReq"),
      },
      {
        path: "examiner-wise-mark",
        component: () => import("@/views/examiner/examinerWiseMark"),
      },
      {
        path: "examiner/examiner-dashboard",
        component: () => import("@/views/examiner/examinerDashboard"),
      },
      //in-course
      {
        path: "in-course",
        component: () => import("@/views/inCourse/inCourseList"),
      },
      {
        path: "in-course-mark",
        component: () => import("@/views/inCourse/InCoursePVMarkList"),
      },
      {
        path: "question-requisition",
        component: () => import("@/views/questionSection/questionRequisitionList"),
      },
      //menu create
      {
        path: "menu-list",
        component: () => import("@/views/menu/menuList"),
      },
      //Submenu create
      {
        path: "submenu-list",
        component: () => import("@/views/subMenu/subMenuList"),
      },

      // exam create
      {
        path: "exam",
        component: () => import("@/views/exam/examList"),
      },

      // user
      {
        path: "users",
        component: () => import("@/views/user/userList"),
      },

      //reg Center profile
      {
        path: "reg-center/reg-center-profile",
        component: () => import("@/views/regionalCenter/regCenterProfile"),
      },

      // (a) Blank Script : National University to RC & RC to Exam Center
      {
        path: "reg-center/bs-coll-from-nu",
        component: () => import("@/views/regionalCenter/a_blankScriptNuToCenter/BsCollFromNuList"),
      },
      {
        path: "reg-center/bs-dist-to-cen",
        component: () => import("@/views/regionalCenter/a_blankScriptNuToCenter/BsDistToCenList"),
      },
      {
        path: "reg-center/ls-coll-from-cen",
        component: () => import("@/views/regionalCenter/looseScript/lsCollFromCenterList"),
      },

      // (b) Answer Script : Exam Center to RC & RC to National University
      // {
      //   path: "reg-center/as-coll-from-cen",
      //   component: () =>
      //     import(
      //       "@/views/regionalCenter/b_answerScriptCenterToNu/AsCollFromCenList"
      //     ),
      // },

      // new reg ans coll from nu
      {
        path: "reg-center/reg-ans-coll-from-nu",
        component: () => import("@/views/regionalCenter/ansReceive/ansReceiveFromNu"),
      },

      {
        path: "reg-center/as-coll-from-cen",
        component: () => import("@/views/scriptSection/asRegToCenRecieve"),
      },
      {
        path: "reg-center/as-dist-to-nu",
        component: () => import("@/views/scriptSection/asRegToNu"),
      },
      // {
      //   path: "reg-center/as-dist-to-nu",
      //   component: () =>
      //     import(
      //       "@/views/regionalCenter/b_answerScriptCenterToNu/AsDistToNuList"
      //     ),
      // },

      // (c) Answer Script : National University to RC & RC to Examiner
      {
        path: "reg-center/as-coll-from-nu",
        component: () => import("@/views/scriptSection/asRcToNuRecieve"),
      },
      {
        path: "reg-center/as-dist-to-exam",
        component: () => import("@/views/regionalCenter/c_answerScriptNuToExaminer/RegAsDistToExamList"),
      },

      // (d) Answer Script : Examiner to RC & RC to National University
      {
        path: "reg-center/as-coll-from-exam",
        component: () => import("@/views/regionalCenter/d_answerScriptExaminerToNu/AsCollFromExamList"),
      },
      {
        path: "reg-center/as-dist-to-nu-final",
        component: () => import("@/views/regionalCenter/d_answerScriptExaminerToNu/AsDistToNuFinalList"),
      },

      // Not Needed

      {
        path: "bs_collection_from_regional",
        component: () => import("@/views/regionalCenter/NotNeeded/bsCollectionFromRegList"), // Not Needed
      },
      {
        path: "ans_distribution_to_regional",
        component: () => import("@/views/regionalCenter/NotNeeded/ansDistributionToRegList"), // Not Needed
      },
      {
        path: "blank_script_collect",
        component: () => import("@/views/regionalCenter/NotNeeded/blankScriptCollectionList"), // Not Needed
      },
      {
        path: "ans_collection",
        component: () =>
          import(
            "@/views/regionalCenter/NotNeeded/answerScriptCollectionList" // Not Needed
          ),
      },
      {
        path: "ans_distribution",
        component: () =>
          import(
            "@/views/regionalCenter/NotNeeded/answerScriptDistributionList" // Not Needed
          ),
      },
      {
        path: "blank_script_distribute",
        component: () =>
          import(
            "@/views/regionalCenter/NotNeeded/blankScriptDistributionList" // Not Needed
          ),
      },
      //loose script
      {
        path: "reg-center/ls-dist-to-nu",
        component: () => import("@/views/regionalCenter/looseScript/lsDistToNuList"),
      },
      //nu
      {
        path: "nu/bs-dist-to-reg",
        component: () => import("@/views/nu/bsDistToRegCen"),
      },
      {
        path: "nu/as-coll-from-reg",
        component: () => import("@/views/scriptSection/asRegToNuRecieve"),
      },
      {
        path: "nu/as-dist-to-reg",
        component: () => import("@/views/scriptSection/asNuToReg"),
      },

      {
        path: "nu/ls-coll-from-reg",
        component: () => import("@/views/nu/lsCollFromRegList"),
      },

      {
        path: "nu/as-coll-from-reg-final",
        component: () => import("@/views/nu/ansCollFromRegFinalList"),
      },

      {
        path: "/reg-cor",
        // component: formView
        component: () => import("@/views/registration/correction/index"),
      },
      {
        path: "/reg-student",
        // component: formView
        component: () => import("@/views/registration/studentinfo/index"),
      },
      {
        path: "/college",
        // component: formView
        component: () => import("@/views/college/index"),
      },
      {
        path: "/report-withheld",
        // component: formView
        component: () => import("@/views/withheld/withheld"),
      },
      {
        path: "/withheld",

        component: () => import("@/views/withheldNew/withheldNew"),
      },
      {
        path: "rescrutiny-std-list",
        component: () => import("@/views/rescrutiner/rescrutinyStdList"),
      },
      {
        path: "rescrutiny-applicant-list",
        component: () => import("@/views/rescrutiner/rescrutinyApplicantList"),
      },
      {
        path: "rescrutiny-notice",
        component: () => import("@/views/rescrutiner/rescrutinyNotice"),
      },
      {
        path: "rescrutiny-monitoring",
        component: () => import("@/views/rescrutiner/rescrutinyMonitoring"),
      },
      {
        path: "rescrutiny-details",
        component: () => import("@/views/rescrutiner/rescrutinyDetails"),
      },
      {
        path: "rescrutiny-script-count",
        component: () => import("@/views/rescrutiner/rescrutinyScriptCount"),
      },
      {
        path: "mismatch-list",
        component: () => import("@/views/overall/mismatchList"),
      },
      {
        path: "overall-wanting-list",
        component: () => import("@/views/overall/overallWantingList"),
      },
      {
        path: "absent-reported-withheld-list",
        component: () => import("@/views/overall/wantReportWithCenWise"),
      },
      {
        path: "absent-report-withheld-std",
        component: () => import("@/views/overall/absentReportedWithheldList"),
      },
      {
        path: "exam-timeline-setup",
        component: () => import("@/views/examMonitor/examTimelineSetup"),
      },
      // .........................................................................
      // {
      //   path: "exam-store/",
      //   component: '',
      //   children: [
      //     {
      //       path: "item-list",
      //       component: () => import("@/views/examStore/itemList"),
      //     },
      //     {
      //       path: "receive-list-list",
      //       component: () => import("@/views/examStore/receiveItemList"),
      //     },
      //   ]
      // },
    ],
  },
  // ...................................................................
  {
    path: "/exam-store/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "item-list",
        component: () => import("@/views/examStore/itemList"),
      },
      {
        path: "receive-list-list",
        component: () => import("@/views/examStore/receiveItemList"),
      },
    ]
  },
  // ...................................................................

  {
    path: "/center/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "bs-coll-from-reg",
        component: () => import("@/views/center/CenBsCollFromRegList"),
      },
      {
        path: "as-dist-to-reg",
        component: () => import("@/views/scriptSection/asCenTo"),
      },

      {
        path: "center-list",
        component: () => import("@/views/center/centerList"),
      },
      {
        path: "center_user",
        component: () => import("@/views/center/centerUserList"),
      },

      {
        path: "center_profile",
        component: () => import("@/views/center/centerProfile"),
      },
      //loose script
      {
        path: "ls-dist-to-reg",
        component: () => import("@/views/center/lsDistToRegList"),
      },

      //dashboard
      {
        path: "center-dashboard",
        component: () => import("@/views/center/dashboard/centerDashboard"),
      },
      {
        path: "treasury",
        component: () => import("@/views/center/treasury"),
      },
      {
        path: "center-summary",
        component: () => import("@/views/center/centerSummary"),
      },
      {
        path: "center-manual-entry",
        component: () => import("@/views/center/centerManualAbsentList"),
      },
    ],
  },
  {
    path: "/singed-pdf/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "certificate",
        component: () => import("@/views/certificates/allCertificates"),
      },
      {
        path: "admitcard",
        component: () => import("@/views/certificates/allCertificates"),
      },
    ],
  },

  // practical viva

  // practical viva
  {
    path: "/practical_viva/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/views/practicalViva/pvExam"),
      },
      {
        path: "pv_exam_list",
        component: () => import("@/views/practicalViva/pvExam"),
      },
      {
        path: "pv_marks_entry",
        component: () => import("@/views/practicalViva/pvMarksEntry"),
      },
      {
        path: "pv-routine",
        component: () => import("@/views/practicalViva/pvRoutineList"),
      },
      {
        path: "practical-candidate",
        component: () => import("@/views/practicalViva/practicalCandidateList"),
      },
      {
        path: "viva-candidate",
        component: () => import("@/views/practicalViva/vivaCandidateList"),
      },
      {
        path: "practical-wanting",
        component: () => import("@/views/practicalViva/practicalWantingList"),
      },
      {
        path: "viva-wanting",
        component: () => import("@/views/practicalViva/vivaWantingList"),
      },
      {
        path: "overall-wanting-summary",
        component: () => import("@/views/practicalViva/overallWantingSummary"),
      },
      {
        path: "subject-wise-passfail",
        component: () => import("@/components/result/subjectWisePassFail"),
      },
      {
        path: "paper-wise-passfail",
        component: () => import("@/components/result/paperWisePassFail"),
      },
      {
        path: "viva-exam-list",
        component: () => import("@/views/practicalViva/vivaExamList"),
      },
      {
        path: "viva-center",
        component: () => import("@/views/practicalViva/vivaCenterList"),
      },
      {
        path: "center-allocation-viva",
        component: () => import("@/views/practicalViva/vivaCenterAllocation"),
      },
      {
        path: "report",
        component: () => import("@/views/practicalViva/pvReport"),
      },
    ],
  },
  {
    path: "/exam_monitor/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "exam-activities-timeline",
        component: () => import("@/views/examMonitor/examTimeline"),
      },
      {
        path: "result-activities-timeline",
        component: () => import("@/views/examMonitor/examResultTimeline"),
      },
      {
        path: "exam-activities",
        component: () => import("@/views/examMonitor/examActivities"),
      },
      {
        path: "exam-result-activities",
        component: () => import("@/views/examMonitor/examResultActivities"),
      },
      {
        path: "stm-col-sub-wise",
        component: () => import("@/views/examMonitor/stmCol_SubWise"),
      },
      {
        path: "stm-col-cour-wise",
        component: () => import("@/views/examMonitor/stmCol_CourWise"),
      },
      {
        path: "stm-col-degG-wise",
        component: () => import("@/views/examMonitor/stmCol_DegGWise"),
      },
      // {
      //   path: "stm-ques",
      //   component: () => import("@/views/examStatement/quesStatement"),
      // },
      {
        path: "question-receive",
        component: () => import("@/views/questionSection/receiveQuestion"),
      },
      {
        path: "question-order",
        component: () => import("@/views/questionSection/quesOrder"),
      },
      {
        path: "question-distribution",
        component: () => import("@/views/questionSection/quesDistribution"),
      },
      // ...
      {
        path: "stm-script",
        component: () => import("@/views/scriptSection/scriptStatement"),
      },
      {
        path: "script-distribution",
        component: () => import("@/views/scriptSection/scriptDistribution"),
      },
      {
        path: "examiner-script-distribution",
        component: () => import("@/views/scriptSection/examinerScriptDistribution"),
      },
      {
        path: "rc-mapping",
        component: () => import("@/views/scriptSection/distributionRCmapping"),
      },
      {
        path: "ans-script-status",
        component: () => import("@/views/scriptSection/asCenToReg"),
      },
      {
        path: "delivery-options",
        component: () => import("@/views/scriptSection/deliveryOptions"),
      },
    ],
  },

  {
    path: "/expelList/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/views/expel/expelList"),
      },
    ],
  },
  {
    path: "/result/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "result-dashboard",
        component: () => import("@/views/result/resultDashboard"),
      },
    ],
  },
  {
    path: "/rc/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "bs-to-center",
        component: () => import("@/views/scriptSection/bsRcToCenter"),
      },
      {
        path: "bs-panel",
        component: () => import("@/views/scriptSection/bsRcToCenter"),
      },
    ],
  },
  {
    path: "/store/",
    component: layoutAdmin,
    meta: {
      loggedIn: true,
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/store/dashboard"),
      },
    ],
  },
];

// in testing
