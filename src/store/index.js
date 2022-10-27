/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

import login from "./loginModule/login";
import changePassword from "./module/changePassword/changePassword";
import studentLogin from "./loginModule/studentLogin";
import onlinecertificatesignup from "./loginModule/onlineCertificateSignup";
import onlinecertificateadd from "./module/onlineCertificate/onlineCertificateAdd";
import onlinecertificatepaidorganization from "./module/onlineCertificate/paidOrganizationList";

//dashboard
import dashBoard from "./module/admin/dashBoard";

// import common from "./module/common_";

import invigilator from "./module/invigilator/invigilatorList";
import attendance from "./module/invigilator/attendanceList";

//center
import centerList from "./module/center/centerList";
import centerUser from "./module/center/centerUser";
import centerDashboard from "./module/center/centerDashboard";
import centerDownload from "./module/center/centerDownload";

//invigilator

import answerScriptCollection from "./module/regionalCenter/answerScriptCollectionList";
import answerScriptDistribution from "./module/regionalCenter/answerScriptDistribution";
import blankScriptCollection from "./module/regionalCenter/blankScriptCollection";
import blankScriptDistribution from "./module/regionalCenter/blankScriptDistribution";
import bsCollectionFromReg from "./module/regionalCenter/bsCollectionFromReg";
import ansDistributionToReg from "./module/regionalCenter/ansDistributionToReg";

//role
import role from "./module/role/role";
import roleGrant from "./module/role/roleGrant";
import roleDetails from "./module/role/roleDetails";

import rescrutiner from "./module/rescrutiner/rescrutiner";
import chunkStudentResult from "./module/result/chunkStudentResult";

import scrutineer from "./module/scrutineer/scrutineer";

//exam committee
import examCommittee from "./module/examCommittee/examCommittee";

//exam stand evaluation
import examinerStandEva from "./module/headExaminer/examinerStandEva";

//common
import commonApi from "./module/commonApi";

// practical viva
import pvMarksEntry from "./module/exam/pvMarksEntry";
import pvMarks from "./module/exam/pvMarks";

//pv routine
import pvRoutine from "./module/pvRoutine/pvRoutine";
//communication
import mail from "./module/communication/mail";
import sms from "./module/communication/sms";

//token verify
import tokenVerification from "./module/tokenVerification/tokenVerification";

//util
import notifyUtil from "./util/notifyUtil";
import formNotifyUtil from "./util/formNotifyUtil";
import loadingUtil from "./util/loadingUtil";
import navigation from "./util/navigation";
import notificationType from "./util/notification-types";

// statiscis
import adminStatistics from "./module/admin/statistics";
//pvdashboard

import pvDashboard from "./module/pvDashboard/pvDashboard";
import vivaDash from "./module/pvDashboard/vivaDash";

// regional center
import regionalCenter from "./module/regionalCenter/regionalCenter";
import regCenterUser from "./module/regionalCenter/regCenterUser";
import regBsCollFromNu from "./module/regionalCenter/regBsCollFromNu";
import regBsDistToCen from "./module/regionalCenter/regBsDistToCen";
import regAsCollFromCen from "./module/regionalCenter/regAsCollFromCen";
import regAsDistToNu from "./module/regionalCenter/regAsDistToNu";
import regAsCollFromNu from "./module/regionalCenter/regAsCollFromNu";
import regAsDistToExam from "./module/regionalCenter/regAsDistToExam";
import examAsCollFromReg from "./module/examiner/examAsCollFromReg";
import examAsDistToReg from "./module/examiner/examAsDistToReg";
import regAsCollFromExam from "./module/regionalCenter/regAsCollFromExam";
import regAsDistToNuFinal from "./module/regionalCenter/regAsDistToNuFinal";
import lsDistToNu from "./module/regionalCenter/lsDistToNuList";

//loose script
import lsCollFromCenter from "./module/regionalCenter/lsCollFromCenter";
//unsed Script statement
import unusedScript from "./module/center/unusedScript";

//nu
import ansDistToRegApi from "./module/nu/ansDistToReg";
import ansColltFromRegFinalApi from "./module/nu/ansCollFromRegFinalList";
//Division
import division from "./module/division/division";
//District
import district from "./module/district/district";
//District
import districtController from "./module/districtController/districtController";
//center
import cenBsCollFromReg from "./module/center/cenBsCollFromReg";
import cenAsDistToReg from "./module/center/cenAsDistToReg";
import lsDistToReg from "./module/center/lsDistToRegList";
import examYear from "./module/examYear/examYear";
import offDay from "./module/offDay/offDay";
import revisedmark from "./module/headExaminer/revisedMarkRequest";
import mark from "./module/examiner/mark";
import bsDistToRegCen from "./module/nu/bsDistToRegCen";
import ansCollectionFromReg from "./module/nu/ansCollectionFromReg";
import LsCollFromReg from "./module/nu/LsCollFromReg";

//certificate
import downloadCertificate from "./module/certificate/downloadCertificate";
import generateCertificate from "./module/certificate/generateCertificate";
//import generateCertificate from './module/certificate/generateCertificate';

//menu and submenu
import menulist from "./module/menu/menuList";
import subMenulist from "./module/subMenu/subMenuList";

//exam create
import examlist from "./module/exam/examList";
//exam initiate
import examInitiate from "./module/examInitiate/examInitiate";
//log-Data
import logData from "./module/logData/logData";
//Question Requisition
import questionRequisition from "./module/questionSection/questionRequisition";
import questionDistribution from "./module/questionSection/questionDistribution";
import questionReceive from "./module/questionSection/receiveQuestion";
//user
import user from "./module/user/userList";

//notification
import notification from "./module/notification/notification";
//Routine
import routine from "./module/routine/routine";

//center allocation
import centerAllocation from "./module/center/centerAllocation";

//examiner access
import examinerAccess from "./module/examiner/examinerAccess";

//college list
import collegeList from "./module/admin/collegeList";

//form-fillup
import formFillup from "./module/formFillup/formFillup";

//rollGenerate
import rollGenerate from "./module/formFillup/rollGenerate";

//inCourse
import inCourse from "./module/inCourse/inCourseList";
import inCoursePV from "./module/inCourse/inCoursePV";

//student list
import studentList from "./module/examinee/studentList";
import admitCard from "./module/admitCard/admitCard";
import gradingSystem from "./module/admitCard/gradingSystem";

//Registration list
import registrationList from "./module/registrations/registrationList";

//pdfSetup list
import pdfSetup from "./module/pdf/pdfSetup";

import examActivities from "./module/examMonitor/examActivities";

//exam-time-line
import examTimeLine from "./module/examMonitor/examTimeLine";

//exam-time-line set up
import timelinesetup from "./module/examMonitor/timelineSetup";

//exam-time-line
import stmCol from "./module/examMonitor/stmCol";

// statement
import statement from "./module/statement/statement";

//question-paper-entry
import questionEntry from "./module/questionSection/questionPaperList";

//expalation
import expel from "./module/expel/expel";

//certification
import transcript from "./module/certification/transcriptDownload";
import transcriptGenerate from "./module/transcript/transcriptGenerate";
//marksheet
import marksheet from "./module/marksheet/marksheet";

//result
import result from "./module/result/resultdata";
import resultdashboard from "./module/result/resultDashboard";
import gracemarks from "./module/result/graceMarksCalculator";
import graceMarkSummary from "./module/result/graceMarkSummary";
import publishedactivitystatus from "./module/admin/publishedActivityStatus";
import resultgenerate from "./module/result/resultGenerate";
import resultLogic from "./module/admin/resultLogic";
import ehtypematching from "./module/result/htypeMatching";
import resulttabulation from "./module/result/resultTabulation";
import tabulationresultGenerate from "./module/result/resultGenFromTabulation";

//examination record
import studentexamrecord from "./module/admin/studentExaminationRecord";

//invigilator access
import invigilatorAccess from "./module/invigilator/invigilatorAccess";

//regional-centerMap
import regionalcentermap from "./module/regionalCenter/regionalCenterMap";

//missing Script
import missingscript from "./module/missingScript/missingScriptList";

//rescrutiny
import rescrutinystd from "./module/rescrutiner/rescrutinyStdList";
import rescrutinyapplicant from "./module/rescrutiner/rescrutinyApplicant";
import rescrutinynotice from "./module/rescrutiner/rescrutinyNotice";
import rescrutinymonitoring from "./module/rescrutiner/rescrutinyMonitoring";
import rescrutinydetails from "./module/rescrutiner/rescrutinyDetails";
import rescrutinycount from "./module/rescrutiner/rescrutinyScriptCount";

//rescult
import resultpublished from "./module/result/resultApproval";
import allmarks from "./module/result/allMarks";

//amanuensis
import amanuensis from "./module/amanuensis/amanuensisList";

//practical-Candidate
import practicalcandidate from "./module/practicalViva/practicalCandidate";
import practicalwanting from "./module/practicalViva/practicalWanting";
import overallWantingSummary from "./module/practicalViva/overallWantingSummary";
//viva-Candidate
import vivacandidate from "./module/practicalViva/vivaCandidate";
import vivawanting from "./module/practicalViva/vivaWanting";

//center summary
import centersummary from "./module/center/centerSummary";
import centermanualentry from "./module/center/centerManualAbsent";

// withheldReport
import withheldReport from "./module/examMonitor/withheldReport";

import pvReport from "./module/practicalViva/pvReport";

//overall
import mismatch from "./module/overall/mismatch";
import overallwanting from "./module/overall/overallwanting";
import absentreportwithheld from "./module/overall/absentReportedWithheld";

// Bigm
import bi from "./module/bi/bi";

// rcMapping
import rcMapping from "./module/rcMapping/rcMapping";

import blankScript from "./module/scriptDistribution/blankScript";
import ansScript from "./module/scriptDistribution/ansScript";
import ansScriptCheck from "./module/scriptDistribution/ansScriptCheck";
import deliveryOptions from "./module/scriptDistribution/deliveryOptions";

import asRegReceiveFromNu from "./module/regionalCenter/ansReceiveFromNu";

// ======================= BIgm ======================
import regCorrection from "./module/registration/regCorrection";
import regStudentInfo from "./module/registration/regBasic";
// get college data
import collegeInfo from "./module/college/collegeInfo";
import courseList from "./module/collegeAffiliation/collegeAffiliationInfo";
//syllabus and regulation
import Degrees from "./module/core/degree/CoreDegree";
import DegreeGroup from "./module/core/degreeGroup/CoreDegreeGroup";
import Paper from "./module/core/paper/CorePaper";
import Subject from "./module/core/subject/CoreSubject";
//settings
import Management from "./module/core/management/coreMgtType";
import collegeType from "./module/core/collegeType/coreCollegeType";
import examType from "./module/core/examType/coreExamType";
import paperType from "./module/core/paperType/corePaperType";
import paperGroup from "./module/core/paperGroup/index";
import studentType from "./module/core/studentType/coreStudentType";
// probable for masters
import defaultProbable from "./module/probable/default";
import specialFormFillup from "./module/probable/specialFormFillup";
import ProbableGenerate from "./module/probable/generateProbable";
import pblMasters from "./module/probable/masters/pblMastersFinal";
import pblHonours from "./module/probable/honours/honoursPblGenerate";
import pblBedOneProfessional from "./module/probable/bedProf/bedProfProbable";
import formFillupDetail from "./module/formFillup/formFillupDetails";
import utilityHelper from "./module/utilityHelper";
// Exam Committee
import ExamCommittees from "./module/exmCommittee/exmCommittee";
// Nu Service
import CertificateVerification from "./module/service/certificateVerification";
//student panel
import studentPanel from "./module/studentPanel/student";
import studentResultCorrection from "./module/studentPanel/student-result-correction";
import stuHelpDesk from "./module/studentPanel/help-desk";

//Exam Store
import itemList from "./module/examStor/itemList";
//Student Form Fill Up=======================student_from_fill_up_option
import student_from_fill_up_option from "./module/probableList/student_from_fill_up_option";
import student_form_fill_up_subject from "./module/probableList/student_form_fill_up_subject";

// =============================College Panel Start=========================
import CollegeLogin from "./../store/loginModule/CollegeLogin";
import collegeUser from "./module/collegePanel/collegeUser";
// =============================Organization Panel Start=========================
import OrgLogin from "./../store/loginModule/OrgLogin";
import certificateVerification from "./module/OrganizationPanel/certificateVerification";
import orgcv from "./module/OrganizationPanel/service/index";
// =============================College User Panel Start=========================
import CollegeUserLogin from "./../store/loginModule/CollegeUserLogin";
import probableList from "./module/probableList/probableList";
import confirmDataEntry from "./module/collegeUserPanel/confirmDataEntry";
import feeStatement from "./module/collegeUserPanel/formFullUp/feeStatement";
import resultCorrection from "./module/collegeUserPanel/result-correction";
import cuFaq from "./module/collegeUserPanel/faq";
import cuHelpDesk from "./module/collegeUserPanel/help-desk";
// ================================Core Exam Fee Head==============================
import coreExamFeeHead from "./../store/module/core/examFeeHead/coreExamFeeHead";
// ==================CollegePanel/Examination===============================
import collegeExamMaster from "./../store/module/collegePanel/Examination/ExamMaster";
// ==================CollegePanel/FormFillUP===============================
import CollegeFeeSummery from "./../store/module/collegePanel/FormFillUp/FeeSummary";
// ==================CollegePanel/Result===============================
import ExamWiseResult from "./../store/module/collegePanel/Result/examWiseResult";

import collegeHelpDesk from "./../store/module/collegePanel/helpDesk";

// ==================CollegePanel/Result===============================
import InsNotice from "./module/Instruction/notice";
import InsRules from "./module/Instruction/rules";
import insGenSpecial from "./module/Instruction/instruction";
import InsFaq from "./module/Instruction/faq";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dashBoard,
    centerList,
    invigilator,
    centerUser,
    attendance,
    offDay,
    examYear,
    login,
    changePassword,
    onlinecertificatesignup,
    onlinecertificateadd,
    onlinecertificatepaidorganization,
    studentLogin,
    rescrutiner,
    vivaDash,

    //role
    role,
    roleGrant,
    roleDetails,

    //common
    commonApi,
    marksheet,
    pvDashboard,
    overallWantingSummary,
    scrutineer,

    // practicalViva
    pvMarks,
    examinerStandEva,
    pvMarksEntry,
    answerScriptCollection,
    answerScriptDistribution,
    blankScriptCollection,
    blankScriptDistribution,
    bsCollectionFromReg,
    regionalCenter,
    ansDistributionToReg,
    adminStatistics,
    transcriptGenerate,
    unusedScript,

    //communication
    mail,
    sms,
    chunkStudentResult,

    //notify with snackbar and  // loading
    notifyUtil,
    formNotifyUtil,
    loadingUtil,
    notificationType,
    pvRoutine,

    //exam committee
    examCommittee,

    //navigation
    navigation,
    districtController,

    asRegReceiveFromNu,

    // regional center
    regCenterUser,
    regBsCollFromNu,
    regBsDistToCen,
    regAsCollFromCen,
    regAsDistToNu,
    regAsCollFromNu,
    regAsDistToExam,
    examAsCollFromReg,
    examAsDistToReg,
    lsDistToNu, //loose script

    //nu
    ansDistToRegApi,
    ansColltFromRegFinalApi,

    //center
    lsDistToReg,
    cenBsCollFromReg,
    division,
    district,
    cenAsDistToReg,
    centerDashboard,
    centerDownload,
    // regAsDistToNuFinal
    regAsCollFromExam,
    regAsDistToNuFinal,
    mark,
    revisedmark,
    bsDistToRegCen,
    ansCollectionFromReg,
    LsCollFromReg,
    lsCollFromCenter,

    // downloadCertificate
    downloadCertificate,
    generateCertificate,

    //menu and submenu
    menulist,
    subMenulist,

    //exam create
    examlist,
    examInitiate,

    //log-data
    logData,

    tokenVerification,

    questionRequisition,
    questionDistribution,
    questionReceive,

    //user
    user,
    // notification
    notification,
    //Routine
    routine,

    //form-fillup
    formFillup,
    // rollGenerate
    rollGenerate,

    //center allocation
    centerAllocation,

    //examiner access
    examinerAccess,

    //college list
    collegeList,

    //college list
    courseList,

    //inCourse
    inCourse,
    inCoursePV,

    //student list
    studentList,
    admitCard,
    gradingSystem,

    //registration list
    registrationList,

    //pdfSetup list
    pdfSetup,

    examActivities,
    //exam time line
    examTimeLine,
    stmCol,
    timelinesetup,

    // statement
    statement,
    //question-paper-entry
    questionEntry,

    // expel
    expel,

    //certification
    transcript,

    //result
    result,
    resultdashboard,
    gracemarks,
    graceMarkSummary,
    publishedactivitystatus,
    resultgenerate,
    ehtypematching,
    resulttabulation,
    tabulationresultGenerate,

    //examination record
    studentexamrecord,

    //invigilator access
    invigilatorAccess,

    //regional-centerMap
    regionalcentermap,

    //missing Script
    missingscript,

    //rescrutiny
    rescrutinystd,
    rescrutinyapplicant,
    rescrutinynotice,
    rescrutinymonitoring,
    rescrutinydetails,
    rescrutinycount,

    //result
    resultpublished,
    allmarks,
    resultLogic,

    //amanuensis
    amanuensis,

    //practical Candidate & wanting
    practicalcandidate,
    practicalwanting,

    //viva-Candidate & wanting
    vivacandidate,
    vivawanting,

    //withheldReport
    withheldReport,

    //center summary
    centersummary,
    centermanualentry,

    pvReport,

    //overall
    mismatch,
    overallwanting,
    absentreportwithheld,

    // bi
    bi,
    rcMapping,
    blankScript,
    ansScript,
    ansScriptCheck,
    deliveryOptions,

    //Exam Store
    itemList,

    //===================== Bigm ==============================
    regCorrection,
    regStudentInfo,
    collegeInfo,
    Degrees,
    DegreeGroup,
    Paper,
    Subject,
    Management,
    collegeType,
    paperType,
    paperGroup,
    studentType,
    examType,
    defaultProbable,
    specialFormFillup,
    ProbableGenerate,
    pblMasters,
    pblHonours,
    formFillupDetail,
    utilityHelper,
    studentPanel,
    studentResultCorrection,
    cuFaq,
    student_from_fill_up_option,
    student_form_fill_up_subject,
    CollegeLogin,
    collegeUser,
    CollegeUserLogin,
    probableList,
    coreExamFeeHead,
    confirmDataEntry,
    feeStatement,
    resultCorrection,
    collegeExamMaster,
    CollegeFeeSummery,
    ExamCommittees,
    CertificateVerification,
    ExamWiseResult,
    pblBedOneProfessional,
    OrgLogin,
    certificateVerification,
    // Organization,
    orgcv,
    InsNotice,
    InsRules,
    insGenSpecial,
    InsFaq,
    stuHelpDesk,
    cuHelpDesk,
    collegeHelpDesk,
  },
});

export default store;
