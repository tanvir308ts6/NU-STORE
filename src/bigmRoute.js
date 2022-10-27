// @ts-nocheck
import layoutAdmin from "./layouts/layoutAdmin.vue";

import layoutStudent from "./layouts/layoutStudent.vue";
import StudentLoginRegister from "./views/util/StudentLoginRegister.vue";
import StudentForgetPassword from "./views/util/StudentForgetPassword.vue";
import StudentResetPassword from "./views/util/StudentResetPassword.vue";

export default [
  {
    path: "/student-login",
    component: StudentLoginRegister
  },
  {
    path: "/student-forget-password",
    component: StudentForgetPassword
  },
  {
    path: "/student-reset-password/:reset_code",
    component: StudentResetPassword
  },
  {
    path: "/c-login",
    component: () => import("@/views/util/CollegeLoginRegister")
  },
  {
    path: "/c-forget-password",
    component: () => import("@/views/util/collegeForgetPassword")
  },
  {
    path: "/c-reset-password/:reset_code",
    component: () => import("@/views/util/CollegeResetPassword")
  },
  {
    path: "/cu-login",
    component: () => import("@/views/util/CollegeUserLoginRegister")
  },
  {
    path: "/cu-forget-password",
    component: () => import("@/views/util/CollegeUserForgetPassword")
  },
  {
    path: "/cu-reset-password/:reset_code",
    component: () => import("@/views/util/CollegeUserResetPassword")
  },
  {
    path: "/org-login",
    component: () => import("@/views/util/OrganizationLoginRegister")
  },
  {
    path: "/org-forget-password",
    component: () => import("@/views/util/OrganizationForgetPassword")
  },
  {
    path: "/org-reset-password/:reset_code",
    component: () => import("@/views/util/OrganizationResetPassword")
  },
  {
    path: "/org-register",
    component: () => import("@/views/util/OrganizationRegister")
  },

  {
    path: "/student/",
    component: layoutStudent,
    meta: {
      StudentLoggedIn: true
    },
    children: [
      {
        path: "dashboard",
        // component: () => import("@/views/student/dashboard/index")
        component: () => import("@/views/student/dashboard")
        // component: () => import("@/views/admin/adminDashboard/adminDashboard")
      },
      {
        path: "profile",
        component: () => import("@/views/student/profile")
      },
      {
        path: "ff/from_fill_up_option",
        component: () =>
          import("@/views/probableList/student_from_fill_up_option")
      },
      {
        path: "ff/student_form_fill_up/:form_fill_up_id",
        component: () =>
          import("@/views/probableList/student_form_fill_up_subject")
      },
      {
        path: "ff/form_fill_up_details/:form_fill_up_id",
        component: () =>
          import("@/views/probableList/student_form_fill_up_details")
      },
      {
        path: "results",
        component: () => import("@/views/studentPanel/result/index")
      },
      {
        path: "results-details/:result_id",
        component: () => import("@/views/studentPanel/result/resultDetails")
      },
      {
        path: "consolidated-results",
        component: () =>
          import("@/views/studentPanel/result/consolidated-results")
      },
      {
        path: "re-scrutiny",
        component: () => import("@/views/studentPanel/rescrutiny/index")
      },
      {
        path: "re-scrutiny-apply",
        name: "re-scrutiny-apply",
        component: () =>
          import("@/views/studentPanel/rescrutiny/rescrutinyApply")
      },
      {
        path: "re-scrutiny-details",
        component: () =>
          import("@/views/studentPanel/rescrutiny/rescrutinyDetails")
      },
      {
        path: "result-correction",
        component: () => import("@/views/studentPanel/resultCorrection/index")
      },
      {
        path: "result-correction-apply",
        name: "result-correction-apply",
        component: () =>
          import("@/views/studentPanel/resultCorrection/correctionApply")
      },
      {
        path: "correction-application-details/:application_id",
        component: () =>
          import("@/views/studentPanel/resultCorrection/correctionDetails")
      },
      {
        path: "edit-applicaiton/:application_id",
        component: () =>
          import("@/views/studentPanel/resultCorrection/editApplicaiton")
      },
      {
        path: "notices",
        component: () => import("@/views/studentPanel/help_desk/notices")
      },
      {
        path: "faqs",
        component: () => import("@/views/studentPanel/help_desk/faqs")
      },
      {
        path: "general-instructions",
        component: () =>
          import("@/views/studentPanel/help_desk/general_instructions")
      },
      {
        path: "special-instructions",
        component: () =>
          import("@/views/studentPanel/help_desk/special_instructions")
      },
      {
        path: "change-password",
        component: () => import("@/views/studentPanel/changePassword")
      }
    ]
  },

  // syllabus and regulation
  {
    path: "/syl-reg/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "degrees",
        component: () => import("@/views/core/degree/index")
      },
      {
        path: "degree-group",
        component: () => import("@/views/core/degreeGroup/index")
      },
      {
        path: "paper",
        component: () => import("@/views/core/paper/index")
      },
      {
        path: "subject",
        component: () => import("@/views/core/subject/index")
      }
    ]
  },
  // admin settings
  {
    path: "/core/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "mgt-type",
        component: () => import("@/views/core/management/index")
      },
      {
        path: "college-type",
        component: () => import("@/views/core/collegetype/index")
      },
      {
        path: "student-type",
        component: () => import("@/views/core/studenttype/index")
      },
      {
        path: "paper-type",
        component: () => import("@/views/core/papertype/index")
      },
      {
        path: "paper-group",
        component: () => import("@/views/core/papergroup/index")
      },
      {
        path: "exam-type",
        component: () => import("@/views/core/examtype/index")
      },
      {
        path: "exam-fee-head-list",
        component: () => import("@/views/core/examFeeHead/examFeeHeadList")
      }
    ]
  },

  {
    path: "/prob/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "generate",
        component: () =>
          import(
            /* webpackChunkName: "generate-probable" */ "@/views/probableList/generateProbable"
          )
      },
      {
        path: "pbl-slot-wise",
        component: () => import("@/views/probableList/formFillupDetails")
      },
      {
        path: "pbl-student-detail",
        component: () => import("@/views/probableList/formFillupStudentDetails")
      },
      {
        path: "special-form-fill-up",
        component: () => import("@/views/probableList/spFormFillupApply")
        // component: () => import("@/views/probableList/spFormFillupStdList")
      },
      {
        path: "pbl-college-wise",
        component: () =>
          import("@/views/probableList/reports/probableCollegeWise")
      },
      {
        path: "pbl-subject-wise",
        component: () =>
          import("@/views/probableList/reports/probableSubjectWise")
      },
      {
        path: "pbl-paper-wise",
        component: () =>
          import("@/views/probableList/reports/probablePaperWise")
      }
    ]
  },

  {
    path: "/service/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "cv",
        component: () => import("@/views/certificateVerification/index")
      },
      {
        path: "verified",
        component: () => import("@/views/certificateVerification/verifiedList")
      },
      {
        path: "pre-approve",
        component: () =>
          import("@/views/certificateVerification/preApproveList")
      },
      {
        path: "approve",
        component: () => import("@/views/certificateVerification/approvedList")
      }
    ]
  },

  {
    path: "/college/",
    component: () => import("@/layouts/layoutCollege.vue"),
    meta: {
      CollegeLoggedIn: true
    },
    children: [
      {
        path: "dashboard",
        // component: () => import("@/views/student/dashboard/index")
        component: () => import("@/views/collegePanel/dashboard")
      },
      {
        path: "profile",
        component: () => import("@/views/collegePanel/profile")
      },
      {
        path: "change-password",
        component: () => import("@/views/collegePanel/changePassword")
      },
      {
        path: "ff/confirm-application",
        component: () => import("@/views/collegePanel/ConfirmApplication")
      },
      {
        path: "ff/probable-candidate",
        component: () => import("@/views/collegePanel/ProbableCandidate")
      },
      {
        path: "ff/applied-candidate",
        component: () => import("@/views/collegePanel/AppliedCandidate")
      },
      {
        path: "ff/confirm-candidate",
        component: () => import("@/views/collegePanel/ConfirmCandidate")
      },
      {
        path: "ff/fee_statement",
        component: () => import("@/views/collegePanel/FeeStatement")
      },
      {
        path: "exam_sheet",
        component: () => import("@/views/collegePanel/ExamSheet")
      },
      {
        path: "admit_card",
        component: () => import("@/views/collegePanel/AdmitCard")
      },
      {
        path: "user",
        component: () => import("@/views/collegePanel/CollegeUser")
      },
      {
        path: "result/exam_wise",
        component: () =>
          import("@/views/collegePanel/Result/ExamWiseResult.vue")
      },
      {
        path: "result/consolidate",
        component: () =>
          import("@/views/collegePanel/Result/ConsolidatedResult.vue")
      },
      {
        path: "result-correction-application",
        component: () =>
          import("@/views/collegePanel/result-correction/applicationLists.vue")
      },
      {
        path: "notices",
        component: () => import("@/views/collegePanel/help_desk/notices")
      },
      {
        path: "faqs",
        component: () => import("@/views/collegePanel/help_desk/faqs")
      },
      {
        path: "general-instructions",
        component: () =>
          import("@/views/collegePanel/help_desk/general_instructions")
      },
      {
        path: "special-instructions",
        component: () =>
          import("@/views/collegePanel/help_desk/special_instructions")
      }
    ]
  },
  {
    path: "/cu/",
    component: () => import("@/layouts/layoutCollegeUser.vue"),
    meta: {
      CollegeUserLoggedIn: true
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/collegeUserPanel/dashboard")
      },
      {
        path: "profile",
        component: () => import("@/views/collegeUserPanel/profile")
      },
      {
        path: "ff/probable-list",
        component: () => import("@/views/probableList/collegeUserProbableList")
      },
      {
        path: "ff/probable-data",
        component: () =>
          import(
            "@/views/collegeUserPanel/probableList/subjectWiseProbableData"
          )
      },
      {
        path: "ff/pending-student-data",
        component: () =>
          import(
            "@/views/collegeUserPanel/probableList/subjectWiseProbablePendingData"
          )
      },
      {
        path: "ff/confirm-student-data",
        component: () =>
          import(
            "@/views/collegeUserPanel/probableList/subjectWiseAppliedCandidateList"
          )
      },
      {
        path: "ff/confirm-data",
        component: () =>
          import(
            "@/views/collegeUserPanel/probableList/subjectWiseProbableConfirmedCandidateList"
          )
      },
      {
        path: "ff/admit-card",
        component: () =>
          import("@/views/collegeUserPanel/probableList/admitCard")
      },
      {
        path: "ff/fee_statement",
        component: () =>
          import("@/views/collegeUserPanel/probableList/feeStatement")
      },
      {
        path: "result-correction-application",
        component: () =>
          import("@/views/collegeUserPanel/result-correction/requestList")
      },
      {
        path: "application-details/:application_id",
        component: () =>
          import(
            "@/views/collegeUserPanel/result-correction/applicationDetails"
          )
      },
      {
        path: "notices",
        component: () => import("@/views/collegeUserPanel/help_desk/notices")
      },
      {
        path: "faqs",
        component: () => import("@/views/collegeUserPanel/help_desk/faqs")
      },
      {
        path: "general-instructions",
        component: () =>
          import("@/views/collegeUserPanel/help_desk/general_instructions")
      },
      {
        path: "special-instructions",
        component: () =>
          import("@/views/collegeUserPanel/help_desk/special_instructions")
      },
      {
        path: "support",
        component: () => import("@/views/collegeUserPanel/faq/faqLists")
      },
      {
        path: "change-password",
        component: () => import("@/views/collegeUserPanel/changePassword")
      }
    ]
  },

  {
    path: "/college/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "college-list",
        component: () => import("@/views/college/index")
      },
      {
        path: "course-list",
        component: () => import("@/views/collegeAffiliation/index")
      }
    ]
  },

  // exam committee
  {
    path: "/exm/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "committee",
        component: () => import("@/views/exmCommittee/index")
      },
      {
        path: "meeting",
        component: () => import("@/views/exmCommittee/meeting/index")
      },
      {
        path: "committee-member",
        component: () => import("@/views/exmCommittee/member/index")
      }
    ]
  },
  // Organization
  {
    path: "/org/",
    component: () => import("@/layouts/layoutOrganization.vue"),
    meta: {
      OrgLoggedIn: true
    },
    children: [
      {
        path: "dashboard",
        // component: () => import("@/views/student/dashboard/index")
        component: () => import("@/views/OrganizationPanel/dashboard")
      },
      {
        path: "profile",
        component: () => import("@/views/OrganizationPanel/profile")
      },
      {
        path: "change-password",
        component: () => import("@/views/OrganizationPanel/changePassword")
      },
      {
        path: "cv",
        component: () =>
          import(
            "@/views/OrganizationPanel/CertificateVerification/CertificateVerification"
          )
      },
      {
        path: "cv/request_list",
        component: () =>
          import(
            "@/views/OrganizationPanel/CertificateVerification/RequestList"
          )
      }
    ]
  },

  {
    path: "/instruction/",
    component: layoutAdmin,
    meta: {
      loggedIn: true
    },
    children: [
      {
        path: "notice",
        component: () => import("@/views/instruction/notice")
      },
      {
        path: "rules",
        component: () => import("@/views/instruction/rules")
      },
      {
        path: "general_instruction",
        component: () => import("@/views/instruction/general_instruction")
      },
      // {
      //   path: "general_instruction_form",
      //   name: "general_instruction_form",
      //   component: () => import("@/views/instruction/general_instruction_form")
      // },
      {
        path: "special_instruction",
        component: () => import("@/views/instruction/special_instruction")
      },
      {
        path: "faq",
        component: () => import("@/views/instruction/faq")
      }
    ]
  }
];

// in testing
