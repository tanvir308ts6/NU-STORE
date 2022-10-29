// frontend base url for forget password email link
// local server
//export const frontendBaseUrl = "http://localhost:8080";
//export const baseURL = "http://localhost:8000";

// nu server
//export const frontendBaseUrl = "http://103.113.200.43:8007";
//export const baseURL = 'http://103.113.200.43:8006';

// eatl server
export const frontendBaseUrl = "http://103.4.145.242:8007";
export const baseURL = "http://103.4.145.242:8006";

// export const baseURL = frontendBaseUrl;
export const baseURLPdf = baseURL + "/";

// file path
export const filePath = baseURL + "/file_resource/photo/";
export const API_URL = baseURL;
export const API_END_POINT = API_URL + "/api/";
export const Asset_Url = `${API_URL}/storage`;
// private api prefix
export const prefix = baseURL + "/api/auth/";
// private api prefix
export const prefixRep = prefix + "report/";
// private api prefix
export const prefixPublic = baseURL + "/api/";
// login url
export const loginUrl = prefix + "login";

// login url
export const changePasswordUrl = prefix + "change-password";

// Dashboard
export const adminDashboardUrl = prefix + "admin-dashboard";

// student Login url
export const sendStudentEmail = API_END_POINT + "student/forget-password";
export const resetStudentPassword = API_END_POINT + "student/reset-password";
export const studentLoginUrl = API_END_POINT + "student/login";
export const studentLogoutUrl = API_END_POINT + "student/logout";
export const getStudentProfileUrl = API_END_POINT + "student/me";
export const ChangeStudentPasswordUrl =
  API_END_POINT + "student/change-password";
export const StudentInfoUpdatedUrl = API_END_POINT + "student/update-info";
// college Login url
export const sendCollegeEmail = API_END_POINT + "college/forget-password";
export const resetCollegePassword = API_END_POINT + "college/reset-password";
export const collegeLoginUrl = API_END_POINT + "college/login";
export const collegeLogoutUrl = API_END_POINT + "college/logout";
// college user password reset
export const sendCollegeUserEmail =
  API_END_POINT + "college-user/forget-password";
export const resetCollegeUserPassword =
  API_END_POINT + "college-user/reset-password";

//online certificate register
export const onlineCertificateSignupUrl = prefixPublic + "online-applicant";
export const updateOrganizationProfile =
  prefixPublic + "online-applicant-update";
export const ChangeOrganizationPassword =
  prefixPublic + "change-organization-password";
export const sendOrgEmail = prefixPublic + "org/forget-organization-password";
export const organizationPasswordReset =
  prefixPublic + "org/reset-organization-password";
export const OnlineCertificateAddUrl = prefixPublic + "online-applicant";
export const OnlineCertificateSubmitUrl =
  prefixPublic + "online-applicant/students";
export const OnlineCertificateVerifiedUrl =
  prefixPublic + "online-applicants/get-students";
export const PaidOrganizationMasterUrl =
  prefixPublic + "online-applicants/applicant-wise-count";
export const PaidOrganizationDetailsUrl =
  prefixPublic + "online-applicants/applicant-wise";

//nu
export const prefixNu = baseURL + "/api/auth/nu/";

// invigilator
export const Userinfo_FetchUrl = prefix + "invigilator";
export const Userinfo_SaveUrl = prefix + "invigilator";
export const Userinfo_DeleteUrl = prefix + "invigilator";
export const Userinfo_UpdateUrl = prefix + "invigilator";
export const Userinfo_GetItemUrl = prefix + "Userinfo/GetItem";
export const Userinfo_GetViewUrl = prefix + "Userinfo/GetViewData";
export const InvigilatorProfileinfo_FetchUrl = prefix + "invigilator";

// center-list
export const Centerinfo_FetchUrl = prefix + "center-list";
export const Centerinfo_SaveUrl = prefix + "center-list";
export const Centerinfo_DeleteUrl = prefix + "center-list";
export const Centerinfo_UpdateUrl = prefix + "center-list";

export const CertificateApi = prefix + "certificate-list";
export const chunkApi = prefix + "revise-result";
export const stdApplicationApi = prefix + "std-cust-application";
export const categoryApi = prefix + "std-application-category";
export const stdApplicationPaperApi = prefix + "std-cust-application-details";
export const practicalMarkEntryApi = prefix + "prac-mark-entry-after-app";
export const vivaMarkEntryApi = prefix + "viva-mark-entry-after-app";
export const applicationStatusChangeApi =
  prefix + "std-cust-application-status-change";
//pvDashbord
export const pvDashApi = prefix + "report/practical-dashboard-data";
export const pracCandSumApi =
  prefix + "report/practical-candidate-list-summary";
export const exportPracCandSumApi =
  prefix + "report/practical-candidate-list-summary";
export const vivaDashApi = prefix + "report/viva-dashboard-data";
export const vivaCandApi = prefix + "report/viva-candidate-list-summary";
//certificate
export const addStudent = prefix + "report/certificate";
export const generateCertificate = prefix + "report/generate-certificate";

//marksheet
export const addStudentMarksheet = prefix + "report/mark-sheet";
export const generateMarksheet = prefix + "report/generate-mark-sheet";
//transcript
export const addStudentTranscript = prefix + "report/transcript";
export const generateTranscript = prefix + "report/generate-transcript";

//unused script statement
export const usedScriptApi = prefix + "report/used-script-statement";
export const usSummaryApi = prefix + "report/used-script-summary";

export const offDayApi = prefix + "off-day";
//center profile
export const CenterProfileinfo_FetchUrl = prefix + "center-list";
// center-user
export const CenterUserinfo_FetchUrl = prefix + "center-user";
export const CenterUserinfo_SaveUrl = prefix + "user";
export const CenterUserinfo_DeleteUrl = prefix + "user";
export const CenterUserinfo_UpdateUrl = prefix + "user";
//regional center user
export const RegCenterUserinfo_FetchUrl = prefix + "regional-center-user";
// answer-script-collection
export const AnsCollection_FetchUrl = prefix + "answer-script-collection";
export const AnsCollection_SaveUrl = prefix + "answer-script-collection";
export const AnsCollection_DeleteUrl = prefix + "answer-script-collection";
export const AnsCollection_UpdateUrl = prefix + "answer-script-collection";

// answer-script-Distribution
export const AnsDistribution_FetchUrl = prefix + "answer-script-distribution";
export const AnsDistribution_SaveUrl = prefix + "answer-script-distribution";
export const AnsDistribution_DeleteUrl = prefix + "answer-script-distribution";
export const AnsDistribution_UpdateUrl = prefix + "answer-script-distribution";

// blank-script-collection
export const BlankScriptCollect_FetchUrl = prefix + "blank-script-collection";
export const BlankScriptCollect_SaveUrl = prefix + "blank-script-collection";
export const BlankScriptCollect_DeleteUrl = prefix + "blank-script-collection";
export const BlankScriptCollect_UpdateUrl = prefix + "blank-script-collection";

// blank-script-distribution
export const BlankScriptDistribution_FetchUrl =
  prefix + "blank-script-distribution";
export const BlankScriptDistribution_SaveUrl =
  prefix + "blank-script-distribution";
export const BlankScriptDistribution_DeleteUrl =
  prefix + "blank-script-distribution";
export const BlankScriptDistribution_UpdateUrl =
  prefix + "blank-script-distribution";

// common-api
export const Collegeinfo_FetchUrl = prefix + "college";
export const RegionalCenterinfo_FetchUrl = prefix + "regional-center";
export const Examinfo_FetchUrl = prefix + "exams"; // eexam
export const Courseinfo_FetchUrl = prefix + "course";
export const Teacherinfo_FetchUrl = prefixPublic + "teacher";
export const Studentinfo_FetchUrl = prefixPublic + "student";
export const Degreeinfo_FetchUrl = prefix + "degrees";
export const Paperinfo_FetchUrl = prefix + "papers";
export const CorePaperRegulationUpdate = `${API_END_POINT}core/core-paper-regulation-update`;
export const Divisioninfo_FetchUrl = prefix + "division";
export const Districtinfo_FetchUrl = prefix + "district";
export const Examinerinfo_FetchUrl = prefix + "tms/examiner";
export const TMSExaminer_FetchURL = prefix + "examiner-by-type";
export const DivisionsList = API_END_POINT + "core/division";
export const DistrictsList = API_END_POINT + "core/district";
export const ThanasList = API_END_POINT + "core/thana";

// Practical-viva-exam
export const practicalVivaExam = prefix + "pvexam-mark";
export const practicalVivaCenterList = prefix + "center-list";
export const practicalVivaExam_FetchUrl = prefix + "pvexam-mark";
export const practicalVivaExam_SaveUrl = prefix + "pvexam-mark";
export const practicalVivaExam_DeleteUrl = prefix + "pvexam-mark";
export const practicalVivaExam_UpdateUrl = prefix + "pvexam-mark";
export const practicalMark_SubmitUrl = prefix + "practical-marks";
export const practicalExam_FetchUrl = prefix + "practical-mark/paper-wise";
export const vivaMark_SubmitUrl = prefix + "viva-marks";
export const vivaExam_FetchUrl = prefix + "viva-mark/paper-wise";

// wanting list :

export const practicalWanting_FetchUrl = prefix + "practical-mark/wanting-list";
export const practicalWanting_ByCenter =
  prefix + "practical-wanting-list/center-wise-count";
export const practicalWanting_ByCollege =
  prefix + "practical-wanting-list/college-wise-count";
export const practicalWanting_BySubject =
  prefix + "practical-wanting-list/subject-wise-count";
//overall wanting
export const overallWanting_ByCenter = prefix + "report/wanting-center-wise";
export const overallWanting_ByCollege = prefix + "report/wanting-college-wise";
export const overallWanting_BySubject = prefix + "report/wanting-subject-wise";
export const overallWanting_ByPaper = prefix + "report/wanting-paper-wise";

export const practicalWanting_ByPaper =
  prefix + "practical-wanting-list/paper-wise-count";
export const practicalWanting_ByStd = prefix + "practical-wanting-list";

export const vivaWanting_FetchUrl = prefix + "viva-mark/wanting-list";
export const vivaWanting_ByCenter =
  prefix + "viva-wanting-list/center-wise-count";
export const vivaWanting_ByCollege =
  prefix + "viva-wanting-list/college-wise-count";
export const vivaWanting_ByPaper =
  prefix + "viva-wanting-list/paper-wise-count";
export const vivaWanting_BySubject =
  prefix + "viva-wanting-list/subject-wise-count";

export const vivaWanting_ByStd = prefix + "viva-wanting-list";

export const PracticalCandidateList = prefix + "practical-candidate-list";

export const PracticalCandidateListDownload =
  prefixRep + "practical-candidate-list-download";
export const downloadVivaAttendenceApi =
  prefixRep + "viva-candidate-attendance-list-download";

//practical mark export

export const downloadAttendenceApi =
  prefixRep + "practical-candidate-attendance-list-download";
export const PracticalMarkBlankListDownload =
  prefixRep + "practical-mark-blank-list-download";
export const PracticalMarkListDownload =
  prefixRep + "practical-mark-list-download";
export const PracticalWantingListDownload =
  prefixRep + "practical-wanting-list-download";

export const VivaCandidateList = prefix + "viva-candidate-list";
export const VivaCandidateListDownload =
  prefixRep + "viva-candidate-list-download";
export const VivaMarkBlankListDownload =
  prefixRep + "viva-mark-blank-list-download";
export const VivaMarkListDownload = prefixRep + "viva-mark-list-download";
export const VivaWantingListDownload = prefixRep + "viva-wanting-list-download";
//bulk all
export const downloadCertificateByCollege = prefixRep + "generate-certificate";

//pv routine
export const PVRoutineApi = prefix + "pv-exam-routine";

//examiner stnadurd evaluation
export const examinerStndEvaluationApi = prefix + "tms-examiner";
export const postExaminerEvalutionApi = prefix + "examiner-standard-evaluation";
export const evaluationReportApi =
  prefixRep + "examiner-standard-evaluation-report";

// regional_center
export const ReionalCenter_FetchUrl = prefix + "regional-center";
export const ReionalCenter_DeleteUrl = prefix + "regional-center";
export const ReionalCenter_UpdateUrl = prefix + "regional-center";
export const ReionalCenter_SaveUrl = prefix + "regional-center";

//rescrutiner
export const rescrutinerApi = prefix + "rescrutiner-list";
//scrutiner
export const scrutinerApi = prefix + "scrutinizer";

export const ReionalCenterApi = prefix + "regional-center";
export const divisionApi = prefix + "division";
export const districtApi = prefix + "district";
export const yearApi = prefix + "year";
export const districtControllerApi = prefix + "district-controller";

// Attendance
export const AttendanceListByEYMain =
  prefixRep + "attendance/exam-year-wise-count";
export const AttendanceListByEYDetails =
  prefixRep + "attendance/exam-year-wise";
export const AttendanceListUrlAll = prefixRep + "attendance/all";

// student AttendanceList FetchUrl
export const AttendanceList_FetchUrl = prefix + "invigilator/attendance";
export const StdAttendanceList_FetchUrl =
  prefix + "invigilator/attendance-full";
// export const AttendanceListExportURL = prefix + "examiner-mark-export";
export const AttendanceListExportURL = prefixRep + "attendance/export";
export const CenterListExportURL = prefix + "all-center-list-export";
export const RegCenListExportURL = prefix + "reg-center-list-export";
export const CenterUserListExportURL = prefix + "center-user-list-export";
export const ExamineeAttendanceExportURL = prefixRep + "attendance/all";

export const AttendanceDetailsListExportURL =
  prefix + "invigilator/export-attendance-details/";

// blank-script-collection-from-reg
export const BsCollectionFromReg_FetchUrl = prefix + "center/bs-coll-from-reg";
export const BsCollectionFromReg_SaveUrl = prefix + "center/bs-coll-from-reg";
export const BsCollectionFromReg_DeleteUrl = prefix + "center/bs-coll-from-reg";
export const BsCollectionFromReg_UpdateUrl = prefix + "center/bs-coll-from-reg";

// answer-script-Distribution-to-reg
export const AnsDistributionToReg_FetchUrl = prefix + "center/as-dist-to-reg";
export const AnsDistributionToReg_SaveUrl = prefix + "center/as-dist-to-reg";
export const AnsDistributionToReg_DeleteUrl = prefix + "center/as-dist-to-reg";
export const AnsDistributionToReg_UpdateUrl = prefix + "center/as-dist-to-reg";

// regional center bs-as-coll-dist
export const RegBsCollFromNuApi = prefix + "reg-center/bs-coll-from-nu";
export const RegBsDistToCenApi = prefix + "reg-center/bs-dist-to-cen";
export const RegAsCollFromCenApi = prefix + "reg-center/as-coll-from-cen";
export const RegAsDistToNuApi = prefix + "reg-center/as-dist-to-nu";
// --->
export const RegAsCollFromNuApi = prefix + "reg-center/as-coll-from-nu";
export const RegAsDistToExamApi = prefix + "reg-center/as-dist-to-exam";
export const RegAsCollFromExamApi = prefix + "reg-center/as-coll-from-exam";
export const RegAsDistToNuFinalApi = prefix + "reg-center/as-dist-to-nu-final";

//reg center loose script to Nu
export const LsCollFromCenterApi = prefix + "reg-center/ls-coll-from-cen";
//export const LsCollFromCenterApi = prefix + 'report/used-script-statement';
export const RegLsDistToNuApi = prefix + "reg-center/ls-dist-to-nu";

// center
export const CenBsCollFromRegApi = prefix + "center/bs-coll-from-reg";
export const CenAsDistToRegApi = prefix + "center/as-dist-to-reg";
export const CenLsDistToRegApi = prefix + "center/ls-dist-to-reg";
export const CenStatisticsApi = prefix + "center/1/center-dashboard";
export const AdminStatisticsApi = prefix + "admin-dashboard"; //Statistics
export const CenterDescripSummaryApi =
  prefixRep + "center-descriptive-summary-download"; //Statistics

//Question Requisition
export const QuestionRequisitionApi = prefix + "question-requisition";

// examiner bs-as-coll-dist
export const ExamAsCollFromRegApi = prefix + "examiner/as-coll-from-reg";
export const ExamAsDistToRegApi = prefix + "examiner/as-dist-to-reg";
export const MarksApi = prefix + "examiner/mark";

//nu ans-dist-to-RC
export const AnsDistToRegApi = prefix + "nu/as-dist-to-reg";
export const AnsCollFromRegFinalApi = prefix + "nu/as-coll-from-reg-final";

// admin Statistics
export const AdminStatistics = prefix + "statistics";

// communication
export const EmailApi = prefix + "notification/email";
export const SMSApi = prefix + "notification/sms";

// Navigation slider items
export const NavigationApi = prefix + "setting/menu";

//nu
export const BsDistToRCApi = prefixNu + "bs-dist-to-reg";
export const AnsCollFromRegApi = prefixNu + "as-coll-from-reg";
export const LsCollFromRegApi = prefixNu + "ls-coll-from-reg";

// pdf signer
export const PdfSignerURL = prefix + "pdf-signer";

//menu and submenu
export const MenuListApi = prefix + "menu";
export const SubMenuListApi = prefix + "sub-menu";

//exam Create

export const ExamListApi = prefix + "exams";
//grace summary
export const graceMarkSummaryApi = prefix + "grace-mark-summary";
export const graceMarkSummaryPdfApi =
  prefix + "grace-mark-summary/generate-pdf";
export const gracePassStdDetailsPdfApi = prefix + "pass-std-after-grace-mark";

//exam initiate
export const ExamInitiateApi = prefix + "exam-initiate";
//inv count
export const invCountApi = prefix + "center-wise-invigilator-count";
//role
export const RoleApi = prefix + "role";
export const RoleGrantApi = prefix + "role-grant";
export const RoleDetailsApi = prefix + "role-details";
export const UserWiseRolesApi = prefix + "user-role?user_id";

// log data or Audit
export const LogData = prefix + "activity-log";
export const ExportLogData = prefix + "export-activity-log";
export const AuditActionsURL = prefix + "common/actions";
export const AuditUsersURL = prefix + "common/users";
export const AuditModulesURL = prefix + "common/modules";

//exam committee
export const ExamCommitteeApi = prefix + "exam-committee";

//user type
export const UserApi = prefix + "user";
export const UserTypeApi = prefix + "user-type";

//Degree, Subject , Paper list
export const PaperListUrl = prefix + "papers";
export const DegreeGropuListUrl = prefix + "degree-groups";
export const DegreeListUrl = prefix + "degrees";
export const SubjectListUrl = prefix + "subjects";

// Instruction notice
export const noticeDataApi = API_END_POINT + "instruction/notice";
export const rulesDataApi = API_END_POINT + "instruction/rules";
export const instructionDataApi = API_END_POINT + "instruction/instruction";
export const faqDataApi = API_END_POINT + "instruction/faq";
export const insFaqExamList = API_END_POINT + "instruction/exam-list";

//form-fillup-report
export const FormFillUpUrl = prefixRep + "form-fillup/";
export const FormFillUpAllUrl = FormFillUpUrl + "all";
export const FormFillUpColWiseMainUrl = FormFillUpUrl + "college-wise-count";
export const FormFillUpColWiseDetailsUrlUrl = FormFillUpUrl + "college-wise";
//form-fillup
export const FormFillUpFetchUrl = prefix + "form-fillup";

export const FormFillUpCollegeWiseFetchUrl =
  prefix + "form-fillup-group-by-college";
export const RollGenerateUrl = prefix + "exam-roll-generate";

//center allocation
export const CenterAllocationUrl = prefix + "center-alloc";
export const CenterUnAllocatedUrl = prefix + "unallocated-center-list";
export const CollegeUnAllocatedUrl = prefix + "unallocated-college-list";
export const CollegeSubjectWiseUnAllocatedUrl =
  prefix + "unallocated-college-wise-subject-student-count";
export const AutoPVCenterAllocUrl =
  prefix + "save-practical-viva-center-allocation";
export const ShowPVCenterAllocationUrl =
  prefix + "show-practical-viva-center-allocation";
export const ShowPVUnallocatedCollListUrl = prefix + "pv-unallocated-colleges";
export const PVCollListUrl = prefix + "practical-viva-college";
export const addPVCenterAllocUrl =
  prefix + "add-practical-viva-center-allocation";
export const deletePVCenterAllocUrl =
  prefix + "delete-practical-viva-center-allocation";
export const ExportPVCenterAllocUrl =
  prefix + "show-practical-viva-center-allocation";

// subject wise division wise college list for allocation page
export const CollegeListDetailsUrl =
  prefix + "college/degree-group-subject-wise";

//exam routine
export const ExamRoutineUrl = prefix + "exam-routine";
export const examRoutinePdfApi = prefix + "exam-routine/generate-pdf";
export const ExamRoutineDateUrl = prefix + "exam-routine-date";
export const ExamRoutineDateChangeApi = prefix + "exam-routine-schedule-change";
export const ExamRoutineChangeNoticeApi =
  prefix + "exam-routine-schedule-change-notice";
export const downloadExamCalenderApi = prefix + "exam-routine-calender";

//examiner access
export const ExaminerAccess = prefix + "tms-examiner";
export const ExaminerMonitoringApi = prefix + "tms-examiner";

//In-Course  
export const IncourseApi = prefix + "incourse-marks";
export const IncoursePVWantingListApi = prefix + "incourse-pv-wanting-list";
export const IncoursePVSubjectListApi = prefixRep + "incourse-pv-subject-list";
export const IncoursePVPaperListApi = prefixRep + "incourse-pv-paper-list";
export const IncoursePVMarkSaveApi = prefix + "save-incourse-pv-mark";

//Student List
export const StudentListApi = prefix + "student-list";

//Admit Card List
export const AdmitCardListApi = prefix + "admitcard";
export const GenerateAdmitCardApi = prefix + "admitcard-generate";
export const GenerateAdmitCardCollegeByApi =
  prefix + "admitcard-group-by-college";
export const GenerateAdmitCardApiColWise = prefix + "admitcard-generate";
export const GenerateAdmitCardApiFromTo =
  prefixRep + "generate/admitcard-subject-wise";
export const AdmitcardGenerateProcessURL =
  prefixRep + "pdf-generate-process/admitcard";

// export const AdmitCardPublish_Url = prefix + "admit-card-publish";
export const AdmitCardPublish_Url = prefix + "admit-card-publish";
export const AdmitCardSummary_Url = prefix + "admit-card-generated-ungenerated";

// Admit card new api
export const AdmitCard_pre = prefixRep + "form-fillup/";

export const AdmitCardByColUrl_Main = AdmitCard_pre + "college-wise-count";
export const AdmitCardByColUrl_Details = AdmitCard_pre + "college-wise";

export const AdmitCardUrl_All = AdmitCard_pre + "all";
export const AdmitCardUrl_ByCenter = AdmitCard_pre + "center-wise-count";
export const AdmitCardUrl_ByCollege = AdmitCard_pre + "college-wise-count";
export const AdmitCardUrl_BySubject = AdmitCard_pre + "subject-wise-count";
export const AdmitCardUrl_ByPaper = AdmitCard_pre + "paper-wise-count";

export const downloadAdmit = prefix + "download";

//examiner-group
export const ExaminerGroupApi = prefix + "tms-examiner-group";

//registration List
export const RegistrationListApi = prefix + "registration";

//exam timeline
export const ExamActivitiesUrl = prefix + "exam-activities";
export const ExamResultActivitiesUrl = prefix + "result-process-step";
export const ExamResultActivitiesStatusChangeUrl =
  prefix + "status-change-exam-wise-result-process-step";
export const ExamResultActivitiesSummaryUrl =
  prefix + "summary-exam-wise-result-process-step";

//exam timeline
export const ExamTimeLineUrl = prefix + "exam-timeline";
export const ResultTimeLineUrl = prefix + "exam-wise-result-process-step";
export const ExamTimeLinePostUrl = prefix + "exam-timeline-bulk-update";

//Statement
export const CollegeSTMUrl_subWise = prefix + "form-fillup-group-by-college";
export const QuesStmUrl = prefixRep + "ques-statement";
export const ScriptStmUrl = prefixRep + "script-statement";
export const ScriptStmDownloadURL = prefixRep + "script-statement-download";
export const QuesStmDownloadURL = prefixRep + "ques-statement-download";
export const StmInitialDistributionURL =
  prefixRep + "script-initial-distribution";
export const TopSheetDownloadURL = prefixRep + "top-sheet-download";
export const CenterDescriptiveDownloadURL = prefixRep + "center-descriptive-download";
export const AttendanceSheetDownloadURL = prefixRep + "attendance-sheet-download";

//export const CenterDescriptiveDownloadURL = `${API_END_POINT}college/download-exam-wise-descriptive-roll-sheet`;
//export const AttendanceSheetDownloadURL = `${API_END_POINT}college/download-exam-wise-attendance-sheet`;

export const downLoadStudentListApi = prefixRep + "routine-wise-candidate-list";
//pv marks api
export const editedLogFetchUrl = prefixRep + "practical-activity-log";
export const vivaExamEditedLogApi = prefixRep + "viva-activity-log";

//Trasury statement report
export const TreasuryStmFetchURL = prefixRep + "treasury-collection";
export const TreasuryAnsCountURL = prefixRep + "treasury-data-by-center";
// /api/auth/report/ques-statement
export const QuesStmBySub = prefixRep + "subject-wise-ques-statement";

// year
export const AllYears_FetchUrl = prefix + "year";

// question-paper-entry
export const QuesEntry_FetchUrl = prefix + "question-packet";
export const QuesReceiveCenWise_FetchUrl =
  prefixRep + "ques-distribution-center-wise";
export const ExportQuesReceive_FetchUrl =
  prefixRep + "ques-distribution-center-wise-download";
export const QuesReceive_FetchUrl = prefixRep + "ques-receive";

// SignatureApi
export const Signature_Url = prefix + "signature";

// TMS Varify Api
export const VerifyTMS_Examiner = prefix + "verify-tms-examiner";

// Expel data list
export const ExpelDataList_FetchUrl = prefix + "expel";

// certification
export const Transcript_FetchUrl = prefix + "expel";

//result
export const ResultApi = prefix + "result";
export const AllMarksApi = prefix + "all-marks";
export const CollegewisePassFailApi = prefix + "college-pass-fail-percentage";
export const SubjectwisePassFailApi = prefix + "subject-pass-fail-percentage";
export const PaperwisePassFailApi = prefix + "paper-pass-fail-percentage";
export const ResultDashboardDataApi = prefix + "result-dashboard-data";
export const GraceGetDataApi = prefix + "get-grace-mark";
export const PublishedActivityStatusApi = prefix + "publish";
export const ResultGenerateApi = prefix + "generate-result";
export const ResultProgressApi = prefix + "result-progress";
export const ResultProcessSummaryStatusApi =
  prefix + "summary-exam-wise-result-process-step";
export const ResultLogicApi = prefix + "exam-rules-regulation";
export const ResultTypeApi = prefix + "result-type";
export const hTypeMatchingApi = prefix + "e-h-type-matching";
export const hTypeMatchingStatusApi = prefix + "e-h-type-matching-status";
export const resultTabulationApi = prefix + "result-tabulation"; //tabulation
export const StudentExaminationRecordApi = prefix + "std-examination-record"; //record from tabulation
export const consolidateResultApi = prefix + "consolidate-result";
export const gradingSystemApi = prefix + "grading-system";
export const resultStatisticsApi = prefix + "subject-wise-result-statistics";
export const saveAppStudentData = prefix + "save-revise-result";
export const attendanceEntryApi = prefix + "att-entry-after-app";
//export exam summary
export const examSummaryPdfApi = prefix + "exam-summary/generate-pdf";
//invigilator access
export const InvigilatorAccessApi = prefix + "invigilator-access";
export const InvigilatorAccessApi2 = prefix + "invi-access";

//regional-centerMap
export const RegionalCenterMapApi = prefix + "regional-center-allocation";

//missingScript
export const MissingScriptApi = prefix + "missing-script";

//rescrutiny
export const RescrutinyStdApi = prefix + "rescrutiner-mark";
export const RescrutinyApplicantApi = prefix + "rescrutiner-marks/all";
export const RescrutinyNoticeApi = prefix + "rescrutiner-notice";
export const RescrutinyByPapSummApi =
  prefixRep + "rescrutiner-paper-summary-download";
export const RescrutinyKhataRequisitionApi =
  prefixRep + "script-requisition-download";
export const RescrutinyMarkChangeApi =
  prefixRep + "rescrutiny-marks-change-download";
export const RescrutinyPaperRescrutinerwiseApi =
  prefixRep + "rescrutiny-list-rescrutiner-wise-download";
export const RescrutinyPaperListApi = prefixRep + "rescrutiny-paper-list";
export const RescrutinyMonitoringApi = prefixRep + "rescrutiny-summary-data";
export const RescrutinyDetailsApi = prefix + "rescrutiny-marks-status";
export const RescrutinerBySubPaperApi =
  prefixRep + "rescrutiner-suject-paper-wise";
export const ExportResApplicantApi = prefixRep + "rescrutiny-applicant-list";
export const RescrutinizerCountApi = prefix + "rescrutiner-script-count";
export const RescrutinerCountDLApi =
  prefixRep + "rescrutiner-script-count-download";
export const RescrutinyDashboardSummaryApi =
  prefix + "rescrutiny-dashboard-data";
export const RescrutinyDashboardDLApi = prefix + "rescrutiny-dashboard-pdf";

//result published approval
export const ResultPublishedNoteApi = prefix + "approval-state";
export const ResultPublishedApi = prefix + "approval-state/approve";
export const ExportResultPublishedApi =
  prefix + "current-note-state/generate-pdf";

//amanuensis
export const AmanuensisApi = prefix + "amanuensis";

// AllSessions_FetchUrl
export const AllSessions_FetchUrl = prefix + "session";

// center summary
export const SummarySubPap_FetchUrl =
  prefixRep + "attendance/subject-paper-wise-count";
export const SummaryRoomInvi_FetchUrl =
  prefixRep + "attendance/room-invi-wise-count";
export const SummaryRoomInviDown_FetchUrl =
  prefixRep + "attendance/room-invi-wise-download";
export const SummarySubPapDown_FetchUrl =
  prefixRep + "attendance/subject-paper-wise-download";
export const attendCenterwiseSummary_FetchUrl =
  prefixRep + "attendance/center-wise-summary-info";
export const centerwise_inv_api = prefix + "center-wise-invigilator-count";
export const center_manual_Absent_api = prefix + "center-manual-absent-centry";

// WithHeldReportUrl
export const WithHeldReportUrl = prefix + "reported-with-held";
export const WithHeldReportRevokeUrl = prefix + "reported-with-held-revoke";
export const WithHeldReportStudentAddUrl = prefix + "reported-with-held";
export const exportExplanationApi = prefix + "report/explanation-form";

export const exportExpelledApi = prefix + "report/expelled-form";

//overall
export const MismatchApi = prefixRep + "combine-mismatch-data";
export const OverallWantingApi = prefixRep + "overall-wanting-list";
export const AbsentReportWithheldApi = prefixRep + "reported-withheld-data";
export const AbsentReportWithCenWiseApi =
  prefixRep + "reported-withheld-center-wise";
export const AbsentReportWithCollWiseApi =
  prefixRep + "reported-withheld-college-wise";
export const AbsentReportWithSubWiseApi =
  prefixRep + "reported-withheld-subject-wise";
export const AbsentReportWithPapWiseApi =
  prefixRep + "reported-withheld-paper-wise";

// http://172.104.35.221:8088//api/auth/examiner-by-type?examiner_type=H

//pv wise sub
export const SubByPractical_FetchUrl = prefixRep + "practical-subject-list";
export const SubByViva_FetchUrl = prefixRep + "viva-subject-list";
export const SubByPracViva_FetchUrl = prefixRep + "viva-practical-subject-list";

//pv wise pap
export const PaperByPractical_FetchUrl = prefixRep + "practical-paper-list";
export const PaperByViva_FetchUrl = prefixRep + "viva-paper-list";

export const MarkCountByHEApi = prefix + "examiner/head-examiner-wise-count";
export const MarkCountByEApi = prefix + "examiner/examiner-wise-count";
export const MarkCountByStdApi = prefix + "examiner/mark-list";

export const ExaminerReportApi = prefixRep + "examiner-export";
export const ExaminerMarkReportApi = prefixRep + "examiner-mark-export";

export const HeadExaminerMarkReportApi =
  prefixRep + "head-examiner-mark-export";
export const HEwiseExaminerApi = prefix + "examiner-by-head"; //not needed
export const ExportExaminerHeadwiseApi = prefixRep + "examiner-list-head-wise";
export const RevisedMarkRequestApi =
  prefixRep + "revise-marks-script-request-getall";
export const AcceptRejectRevisedMarkReqApi =
  prefixRep + "revise-marks-script-request-accept";

//scrutinize
export const ExportHeadExaminerScrutinizeApi =
  prefixRep + "head-examiner-scrutinize-script";
export const ExportExaminerScrutinizeApi =
  prefixRep + "examiner-scrutinize-script";

export const PraacticalCenterList = prefix + "practical-center-list";
export const VivaCenterList = prefix + "viva-center-list";

export const CollegeWiseBasicBiInfoURL = prefix + "bi/basic-college-wise-bi";
export const BiResultDataURL = prefix + "bi/result";

export const rcMappingSubmitURL = prefix + "rc-mapping";
export const rcMappingSummaryURL = prefix + "rc-mapping-summary";
export const rcMappingCenterListURL = prefix + "rc-mapping-center-list";
export const rcMappedCenterDetailsURL = prefix + "rc-mapping-detail";
export const rcMappingReportUrl = prefixRep + "rc-mapping-report";
export const rcMappingRevokeURL = prefix + "remove-rc-mapping";

export const rcWiseDistributionSummaryURL =
  prefixRep + "regional-center-script-summary";
export const rcWiseChallanDistributionURL =
  prefixRep + "dist-challan-blank-script-reg";
export const rcWiseDistributionDataURL =
  prefixRep + "regional-center-script-distribution";

export const CenterWiseDistributionDataURL =
  prefixRep + "center-script-distribution";

export const recieveBsByRegCenterAPI = prefixRep + "bs-reg-coll-from-nu";
export const rcToCenterDistributionURL_ = prefixRep + "bs-reg-dist-to-center";
export const rcToCenterDistributionURL =
  prefixRep + "dist-challan-blank-script-cen";
export const bsCollInCenter = prefixRep + "bs-coll-in-center";

// Ans Script
export const UsedScriptStatement = prefixRep + "used-script-statement"; // get and post
export const AnsScriptStatement = prefixRep + "ans-script-statement"; // get
export const AS_CenterToTreasury = prefixRep + "ans-script-send-to-treasury"; // post
export const AS_CenterToRc = prefixRep + "ans-script-send-to-rc"; // post
export const AS_RcToCenterRecieve = prefixRep + "ans-script-coll-from-center"; // post
export const AS_RcToNu = prefixRep + "ans-script-dist-to-nu"; // get and post
export const AS_NuToRcRecieve = prefixRep + "ans-script-coll-from-rc"; // post

export const AS_NU_RC_EXAMINER = prefixRep + "exmainer-ans-script-statement"; // get
export const AS_NU_TO_RC = prefixRep + "exmainer-ans-script-send-to-rc"; // post
export const AS_RC_TO_NU_RECIEVE =
  prefixRep + "exmainer-ans-script-coll-from-nu"; // post
export const AS_RC_TO_EXAMINER =
  prefixRep + "exmainer-ans-script-send-to-examiner"; // post

export const QueDistDataURL_GET =
  prefixRep + "ques-distribution-center-wise-groupby";

export const QueDistDataURL_POST = prefixRep + "ques-distribution-center-wise";

// blank script pdf api section:
export const scriptStatementDownload = prefixRep + "script-statement-download";

export const centerScriptDistributionDownloadAllotmentReport =
  prefixRep + "center-script-distribution-download-allotment-report";

export const regionalcenterScriptDistributionDownloadAllotmentReport =
  prefixRep + "regional-center-script-distribution-download-allotment-report";

// ans script pdf api section:

export const ansScriptStmReportDownload =
  prefixRep + "ans-script-statement-report-download";

// export const ansScriptStmReportDownload =
//   prefixRep + "date-wise-ans-script-statement-report-download";

export const ansScriptStickerDownload = prefixRep + "sticker-download";

export const ansScriptDistToNuReportList =
  prefixRep + "ans-script-dist-to-nu-report-list";

export const nuAnsScriptDistNuToRegReportApi =
  prefixRep + "nu-ans-dist-to-nu-report-list";

export const regAnsScriptCollectionRegRecieveApi =
  prefixRep + "reg-ans-collect-from-nu-report";

export const centerAllocCentersApi = prefix + "center-alloc-centers";

export const ActivityPublish_Url = prefix + "activity-publish";

export const CenterByTypeApi = prefix + "centers";

export const AdmitCardSummaryDelete_Url = prefix + "admitcard-delete";

export const regCenAnsScriptCollFromCenDownload =
  prefixRep + "reg-cen-ans-script-coll-from-cen-download";

export const quesDistributionCenterWiseGroupbyDownload =
  prefixRep + "ques-distribution-center-wise-groupby-download";

export const SaveSendQueDistDataURL =
  prefixRep + "save-ques-distribution-center-wise";

export const QuesSortingReportDownloadURL =
  prefixRep + "ques-distribution-center-wise-download";

export const QuesDistributionSamaryURL =
  prefixRep + "ques-distribution-center-wise-groupby-download";

export const ExmainerAnsScriptAllotmentSave =
  prefixRep + "exmainer-ans-script-save-allotment";

export const RoutineWiseStudentCount = prefixRep + "routine-wise-student-count";

//as panel reg receive from nu
export const ansChalanwiseReceiveFromNu =
  prefixRep + "exmainer-ans-script-challan-wise";
export const ReceiveansChalanwiseReceiveFromNu =
  prefixRep + "exmainer-ans-script-receive-by-rc"; // receive api

export const allotmentRepApi =
  prefixRep + "nu-ans-dist-to-reg-head-examiner-wise-examiner";
// status-change-exam-wise-result-process-step

export const challanNumberApi = prefix + "ans-script-challan-numbers";

export const nuAnsDistToRegChallanApi =
  prefixRep + "nu-ans-dist-to-reg-challan";

export const requestForRemoveAnsScriptAllotment =
  prefixRep + "request-for-remove-allotment";

export const removeAnsScriptAllotment_oldApi =
  prefixRep + "remove-ans-script-allotment";
export const removeAnsScriptAllotment =
  prefixRep + "transfer-ans-script-allotment";

export const nuAnsDistToRegHeadExaminerWiseExaminer =
  prefixRep + "nu-ans-dist-to-reg-head-examiner-wise-examiner";
export const exHeadMonitorSum = prefix + "summary";

export const addExamWiseResultProcessStep =
  prefix + "add-exam-wise-result-process-step";

export const ansScriptDeliveryNuToRegSummary =
  prefixRep + "ans-script-delivery-nu-to-reg-summary";

export const ansScriptDeliveryNuToRegSummaryPDF =
  prefixRep + "ans-script-delivery-nu-to-reg-summary-pdf";

export const ansScriptChallanNumners = prefix + "ans-script-challan-numbers";
export const addNewChallanApi = prefix + "add-challan-number";

export const ansScriptAddChallan = prefixRep + "answer-script-add-challan";
export const ansScriptRemoveChallan =
  prefixRep + "answer-script-remove-challan";

export const nuToRegAnsScriptDistApi = prefixRep + "nu-to-reg-ans-script-dist";

export const deliveryOptionsUrl = prefix + "delivery-options";
export const deliveryOptionsExamWiseUrl = prefix + "exam-delivery-options";

export const centerChallanApi = prefixRep + "center-ans-script-challans";

export const addToCenterChallanApi = prefixRep + "add-to-challan-ans-script";
export const centerChallanDistributeApi =
  prefixRep + "delivery-center-ans-script";

export const centerChallanDetailsApi =
  prefixRep + "center-ans-script-challan-details";
export const deleteItemFromCenterChallanApi =
  prefixRep + "delete-ans-script-from-challan";
export const saveCenterToScriptDataAllotmentApi =
  prefixRep + "update-ans-script-packet-size";
export const examRoutineDateWise = prefix + "exam-routine-date-wise";

export const BSChallanURL = prefix + "cen-bs-challan-numbers";
export const addToChallanBsNuToRegApi =
  prefixRep + "add-to-challan-reg-blank-script";
export const addToChallanBsNuToCenterApi =
  prefixRep + "add-to-challan-center-blank-script";
export const BsChallanDownloadApi =
  prefixRep + "nu-blank-script-dist-reg-center-challan"; // nu to regcen
export const BSNURChallanURL = prefix + "nu-reg-bs-challan-numbers";
export const BSNUCChallanDistURL = prefixRep + "dist-challan-blank-script-cen";
export const BsGatepassDownloadApi =
  prefixRep + "nu-blank-script-dist-reg-center-challan"; // nu to regcen

export const BsCenterChallanDownloadApi =
  prefixRep + "nu-blank-script-dist-center-challan"; // nu to center
export const BsCenterGatepassDownloadApi =
  prefixRep + "nu-blank-script-dist-center-challan"; // nu to center

export const BsRCtoCenterChallanDownloadApi =
  prefixRep + "reg-center-blank-script-dist-center-challan"; // reg to center
export const BsRCtoCenterGatepassDownloadApi =
  prefixRep + "reg-center-blank-script-dist-center-challan"; // reg to center

//======================================= Bigm ============================
export const RegistrationBasics = API_END_POINT + "reg/students";
export const RegCardCorrection = API_END_POINT + "reg/reg-correction";
export const ExportRegCardCor = API_END_POINT + "reg/reg-card-dup-down";
// Exam Committee Module
export const exmComCommonData =
  API_END_POINT + "admin/exm-commitee-member-common-data";
export const exmCommittee = API_END_POINT + "admin/exm-committee";
export const exmCommitteeMembers = API_END_POINT + "admin/committee-member";
export const subjectWiseEcMembers = API_END_POINT + "admin/sub-wise-member";

export const exmCommitteeMemberApi =
  API_END_POINT + "admin/exm-committee-member";
export const exmCommitteeMemberEdit = API_END_POINT + "admin/edit-member";

export const exmCommitteeMeeting = API_END_POINT + "admin/exm-meeting";
export const ecWiseMember = API_END_POINT + "admin/ec-wise-member";
export const ecmMemberDetail = API_END_POINT + "admin/meeting-member";

export const exportExamCommittee = API_END_POINT + "admin/export-committee";
export const exportEcmMeeting = API_END_POINT + "admin/export-meeting";

// nu service
export const certificateVerificationList = API_END_POINT + "service/std-cv";
export const cvStudentList = API_END_POINT + "service/cv-students";
export const organizationList = API_END_POINT + "service/get-org";
export const studentRemark = API_END_POINT + "service/student_wise_remark";

// export const certificateVerificationList = API_END_POINT + "service/std-cv";
// export const cvStudentList = API_END_POINT + "service/cv-students";
// export const organizationList = API_END_POINT + "service/get-org";
// export const organizationCVlist = API_END_POINT + "service/std-cv";
// export const organizationCVlist = API_END_POINT + "org/organization-cv";

//college module
export const CollegeInfoList = API_END_POINT + "admin/college-list";
export const CollegeProfileUpdate = API_END_POINT + "college/college-profile";
export const CollegeAffiliation = API_END_POINT + "college-aff";
export const RegCorrectionCorrection = API_END_POINT + "reg/reg-correction";
//college module
// export const CollegeInfoList = API_END_POINT + "college";
// syllabus and regulation
export const DegreeDataApi = API_END_POINT + "core/degree";
export const DegreeGroupApi = API_END_POINT + "core/degree-group";
export const PaperDataApi = API_END_POINT + "core/paper";
export const customPaperSearch = API_END_POINT + "core/custom-search";
export const SubjectDataApi = API_END_POINT + "core/subject";
export const SubjectByDegree = API_END_POINT + "core/subject_by_degree";
//settings
export const CollegeMgtType = API_END_POINT + "core/mgt-type";
export const CollegeType = API_END_POINT + "core/college-type";
export const PaperType = API_END_POINT + "core/paper-type";
export const PaperGroup = API_END_POINT + "core/paper_group";
export const ExamType = API_END_POINT + "core/exam-type";
export const StudentType = API_END_POINT + "core/student-type";

//================== Generate Probable Data ======================================
//generate Probable slot CriteriaUrl
export const getSlotAcSession = API_END_POINT + "ff/get-slot-ac-session";
export const getResultType = API_END_POINT + "ff/get-result-type";
export const generateProbableCriteriaUrl =
  API_END_POINT + "ff/probable-slot-create";
export const generateProbableCriteriaListUrl =
  API_END_POINT + "ff/probable-slot-list";
export const executeProbableSlotQueueUrl =
  API_END_POINT + "ff/probable-slot-job-execute";
export const examActivityStatus = API_END_POINT + "exam-activity-status";
//exam initiate
export const GenerateProbableData = API_END_POINT + "ff/generate-pbl";

//Generate probable for masters final
export const GenerateProbableMasters = API_END_POINT + "ff/pbl-masters-final";
export const GetAllAcSession = API_END_POINT + "core/ac-session";
export const GetAllExam = API_END_POINT + "core/exam-year";
export const GetAllFeeHeads = API_END_POINT + "core/fee-heads";
// Generate Probable BEd professional first semester
export const bedProfSemesterOne =
  API_END_POINT + "ff/pbl-degree-bed-first-semester";
export const bedProfSemesterTwo =
  API_END_POINT + "ff/pbl-degree-bed-second-semester";
export const bedProfSemesterThree =
  API_END_POINT + "ff/pbl-degree-bed-second-semester";
// Generate Probable Honours Part -1
export const honoursPartOne = API_END_POINT + "ff/pbl-onus-first-year";
export const honoursPartTwo = API_END_POINT + "ff/pbl-onus-second-year";
export const honoursPartThree = API_END_POINT + "ff/pbl-onus-third-year";

//probable list details
export const formFillUpInfo = API_END_POINT + "ff/form-fillup-info";
export const detailsProbable = API_END_POINT + "ff/form-fillup";
export const detailSlotWiseProbable = API_END_POINT + "ff/probable-details";
export const probableStudentDetails =
  API_END_POINT + "ff/probable-student-list";
export const probableStatusChange = API_END_POINT + "ff/pbl-status-update";
export const deleteProbableSlot = API_END_POINT + "ff/form-fillup-delete";
export const confirmProbableSlot = API_END_POINT + "ff/probable-slot-confirm";
export const probableSlotStatus = API_END_POINT + "ff/pbl-slot-status";
//probable summery
export const ProbableCollegeWise = API_END_POINT + "ff/college-wise";
export const ProbableSubjectWise = API_END_POINT + "ff/subject-wise";
export const ProbablePaperWise = API_END_POINT + "ff/paper-wise";
export const GetExamColleges = API_END_POINT + "ff/get-colleges";
export const GetExamSubjects = API_END_POINT + "ff/get-subject";
export const GetExamPapers = API_END_POINT + "ff/get-papers";
export const GetExamSession = API_END_POINT + "ff/get-session";
//Special FormFillup
export const getPblStudent = API_END_POINT + "ff/probable-student";
export const adminFormFillupSubject =
  API_END_POINT + "ff/admin-form-fillup-subject";
export const formFillUpByAdminUrl = API_END_POINT + "ff/confirm-form-fill-up";
//==================== end Probable =====================================================

//=========================== utility helper ===========================================
export const GetAllCollege = API_END_POINT + "admin/get-college";
export const GetAllDegree = API_END_POINT + "core/degree";
export const GetAllDegreeGroup = API_END_POINT + "core/get-degree-group";
export const examWiseDegreeGroup =
  API_END_POINT + "core/exam-wise-degree-group";
export const GetAllSubject = API_END_POINT + "core/get-subject";
export const GetAllGroupBySubject = API_END_POINT + "core/subject-group";
export const GetAllPaper = API_END_POINT + "core/get-paper";
export const GetAllExams = API_END_POINT + "core/exam-by-degree";
export const GetAllExamByCourse = API_END_POINT + "core/course-info";
export const GetAllPaperType = API_END_POINT + "core/paper-type";
export const GetAllPaperInfo = API_END_POINT + "core/paper-info";
export const GetAllPaperGroup = API_END_POINT + "core/paper-group";
export const GetAllExamType = API_END_POINT + "core/exam-type";
export const GetCandidateType = API_END_POINT + "core/candidate-type";

//======================================== STUDENT PANEL ================================
export const GetRescrutinyExamList =
  API_END_POINT + "student/std-rescunity-list";
export const GetRescrutinyPaperList =
  API_END_POINT + "student/std-rescunity-papers";
export const applyRescrutiny = API_END_POINT + "student/std-rescunity-apply";
export const rescrutinyDetails = API_END_POINT + "student/std-rescunity-detail";
export const getResultList = API_END_POINT + "std-result/result";
export const getResultDetail = API_END_POINT + "std-result/result-detail";
export const getConsolidatedResult =
  API_END_POINT + "std-result/consolidated_result";
export const downloadResultDetail =
  API_END_POINT + "std-result/download-result-detail";
export const downloadConsolidateResult =
  API_END_POINT + "std-result/download-consolidate-result";

// Correction result
export const correctionExamList =
  API_END_POINT + "student/correction-exam-list";
export const resultCorrectionPaperCodes =
  API_END_POINT + "student/correction-papers";
export const resultCorrectionAppCategory =
  API_END_POINT + "student/correction-categories";
export const studentCorrectionApply =
  API_END_POINT + "student/correction-apply";
export const studentCorrectionUpdate =
  API_END_POINT + "student/correction-update";
export const correctionAppliedList =
  API_END_POINT + "student/correction-applied-list";
export const resultCorrectionDetail =
  API_END_POINT + "student/result-correction-details";
export const deletePaper = API_END_POINT + "student/delete-paper";
// Faq part
export const stuAllNotice = API_END_POINT + "student/all-notice";
export const stuFaqList = API_END_POINT + "student/faq-list";
export const submitQuestion = API_END_POINT + "student/submit-question";
export const stuGenIns = API_END_POINT + "student/general-instruction";

//all Exam Master
// export const examMasterData = API_END_POINT + "examination/exam-master";
//probable list generate
// export const GenerateProbableMasters = API_END_POINT + "ff/pbl-masters-final";
// export const DeleteProbableMastersSlot = API_END_POINT + "ff/form-fillup-delete";
// export const GetAllAcSession = API_END_POINT + "core/ac-session";
// export const GetAllExam = API_END_POINT + "core/exam-year";
// export const GetAllFeeHeads = API_END_POINT + "core/fee-heads";
//form fillup details
export const FormFillupDetails = API_END_POINT + "ff/form-fillup-details";
// utility helper
/*export const GetAllDegree = API_END_POINT + "core/degree";
 export const GetAllDegreeGroup = API_END_POINT + "core/get-degree-group";
 export const GetAllSubject = API_END_POINT + "core/get-subject";
 export const GetAllPaper = API_END_POINT + "core/get-paper";
 export const GetAllExams = API_END_POINT + "core/exam-by-degree";
 export const GetAllPaperType = API_END_POINT + "core/paper-type";
 export const GetAllExamType = API_END_POINT + "core/exam-type";*/
//Student Form Fill Up=======================
export const studentFormFillUpOptionsUrl = `${API_END_POINT}student/ff/student_form_fill_up_option`;
export const studentFormFillUpSubjectUrl = `${API_END_POINT}student/ff/student_form_fill_up_subject`;
export const pairPaperData = `${API_END_POINT}student/ff/pair_paper`;
export const formFillUpByStudentUrl = `${API_END_POINT}student/ff/form_fill_up_confirm_by_student`;
export const calculateFeePerStudent = `${API_END_POINT}student/ff/calculate_fee_per_student`;
export const getFormFillUpStudentConfirmedDetailsUrl = `${API_END_POINT}student/ff/show`;
export const getStudentFormFillUpFeeHistoryUrl = `${API_END_POINT}student/ff/fee_show`;
// ============================Exam Master Fee============================
export const updateExmMasterFeeUrl = `${API_END_POINT}examination/exam_master_fee_setup`;
// ========================College Panel===========================
export const getExmMasterUrl = `${API_END_POINT}college/examination/exm-master-list`;
export const getDegreeWiseDegreeGroupUrl = `${API_END_POINT}college/core/degree_wise_degree_group`;
export const getSubjectUrl = `${API_END_POINT}college/admin/subject`;
export const createCollegeUserUrl = `${API_END_POINT}college/admin/create-user`;
export const getAllCollegeUserUrl = `${API_END_POINT}college/admin/college-user`;
export const editCollegeUserUrl = `${API_END_POINT}college/update-user`;
export const deleteCollegeUserUrl = `${API_END_POINT}college/delete-user`;
export const CollegeChangePasswordUrl = `${API_END_POINT}college/change-password`;
export const resultCorrectionList = `${API_END_POINT}college/correction-applicaitn-list`;
// ========================College Panel/FormFillUp===========================
export const getCollegeFeeSummeryUrl = `${API_END_POINT}admin-user/ff/fee_statement`;
export const collegeFeeSummeryDownloadPdfUrl = `${API_END_POINT}admin-user/ff/pdf/fee_statement`;
export const createCollegeUserPrivilegeUrl = `${API_END_POINT}college/ff/create-privilege`;
export const updateCollegeUserPrivilegeStatusUrl = `${API_END_POINT}college/ff/update-privilege`;
export const getCollegeUserPrivilegeUrl = `${API_END_POINT}college/ff/get-privilege`;
// =========================College User Panel==================================
// ======================Login============================
export const collegeUserLoginUrl = `${API_END_POINT}college-user/login`;
export const logoutCollegeUserUrl = `${API_END_POINT}college-user/logout`;
export const getCollegeUserProfileUrl = `${API_END_POINT}college-user/me`;
export const collegeUserProfileUpdate =
  API_END_POINT + "college-user/clg-user-profile";
export const collegeUserFFShowUrl = `${API_END_POINT}college-user/ff/show`;
export const CollegeUserChangePasswordUrl = `${API_END_POINT}college-user/change-password`;
// ===================Probable List ===========================
export const fetchCollageUserStudentUrl = `${API_END_POINT}college-user/ff/probable-list`;
export const ffConfirmByCollegeUserUrl = `${API_END_POINT}college-user/ff/confirm-paper`;
export const fetchCollageUserConfirmDataUrl = `${API_END_POINT}college-user/ff/confirm-data`;
export const getProbableDataUrl = `${API_END_POINT}college-user/ff/get-probable-list`;
export const ProbableDataDownloadPdf = `${API_END_POINT}college-user/ff/pdf/get-probable-list`;
export const getCuAdmitCard = `${API_END_POINT}college-user/ff/get-cu-admit-card`;
export const cancelConfirmationUrl = `${API_END_POINT}college-user/ff/cancel-confirmation`;
export const cancelApplicationUrl = `${API_END_POINT}college-user/ff/cancel-application`;
export const fetchCollageUserFeeStatementUrl = `${API_END_POINT}college-user/ff/fee_statement`;
export const clgUserFeeStatementPdfUrl = `${API_END_POINT}college-user/ff/pdf/fee_statement`;
export const getCollegeUserWiseConfirmCandidateUrl = `${API_END_POINT}college-user/ff/user_wise_candidate`;
// ==================Core Exam Fee Head=====================
export const CoreExamFeeHeadUrl = `${API_END_POINT}core/exam-fee-head`;
// ==================Result Correction=====================
export const resultCorrectionApplicationList = `${API_END_POINT}college-user/correction-applicaitn-list`;
export const applicationDetails = `${API_END_POINT}college-user/application-details`;
export const getStudentResult = `${API_END_POINT}college-user/student-result`;
export const approveApplicaiton = `${API_END_POINT}college-user/approve-application`;
export const cuFaqList = `${API_END_POINT}college-user/faq-list`;
export const cuFaqExamList = `${API_END_POINT}college-user/cu-faq-exam-list`;
export const cuSubmitQuestion = `${API_END_POINT}college-user/submit-question`;
export const cuUpdateQuestion = `${API_END_POINT}college-user/update-question`;
export const cuDeleteFaq = `${API_END_POINT}college-user/delete-question`;
export const cuAllNotice = `${API_END_POINT}college-user/all-notice`;
export const cuAllFaq = `${API_END_POINT}college-user/all-faq`;
export const cuAllInstruction = `${API_END_POINT}college-user/instruction`;

// =================CollegePanel/Examination/ExamMaster========================
export const getCollegeExamMasterListUrl = `${API_END_POINT}college/examination/all_exam_master`;
export const getAllOpenExamMasterListUrl = `${API_END_POINT}college/examination/all_open_exam_master`;
// =================CollegePanel/Core/DegreeGroup========================
export const getCollegeDegreeWiseDegreeGroupUrl = `${API_END_POINT}college/core/degree_group`;
export const getCollegeAllDegreeGroupUrl = `${API_END_POINT}college/core/all_degree_group`;
// =================CollegePanel/Core/Subject========================
export const getCollegeDegreeGroupWiseSubjectUrl = `${API_END_POINT}college/core/subject`;
export const getCollegeAllSubjectUrl = `${API_END_POINT}college/core/all-subject`;
// =================CollegePanel/Form fill up/Form fill up========================
export const getCollegeProbableListUrl = `${API_END_POINT}college/ff/all-student`;
export const getCollegeProbableListPdfUrl = `${API_END_POINT}college/ff/pdf/all-student`;
// ======================Organization Panel ====================
export const orgLoginUrl = `${API_END_POINT}org/login`;
export const orgLogoutUrl = `${API_END_POINT}org/logout`;
export const getAllDegreeUrl = `${API_END_POINT}core/degree`;
export const getAllDegreeNameUrl = `${API_END_POINT}core/degree-name`;
export const storeCertificateVerificationUrl = `${API_END_POINT}service/std-cv`;
export const storeCertificateVerification = `${API_END_POINT}org/organization-cv`;
export const updateCertificateVerification = `${API_END_POINT}org/organization-cv`;
export const organizationCVlist = API_END_POINT + "org/organization-cv";
export const removeRequestStudent = `${API_END_POINT}org/request-stu-remove`;
export const removeStudentAt = `${API_END_POINT}org/stu-at-remove`;
export const organizationCVUpdate = `${API_END_POINT}org/organization-cv-update`;
export const updateRequest = `${API_END_POINT}org/update_request`;
export const generatePaySlip = API_END_POINT + "organization/pdf/pay-slip";

export const getClgExamWiseResultUrl = `${API_END_POINT}college/result/exam_wise`;
export const getConsolidateResultUrl = `${API_END_POINT}college/result/consolidated_result`;
export const getConsolidateResultDownloadPdfUrl = `${API_END_POINT}college/result/consolidated_result_pdf`;
export const getClgExamWiseResultDownloadPdfUrl = `${API_END_POINT}college/result/exam-wise-pdf`;

export const collegeNotice = `${API_END_POINT}college/college-notice`;
export const collegeFaq = `${API_END_POINT}college/all-faq`;
export const collegeInstruction = `${API_END_POINT}college/instruction`;
export const downloadExamWiseAdmit = `${API_END_POINT}college/download-exam-wise-admit`;
export const downloadExamWiseAttendanceSheet = `${API_END_POINT}college/download-exam-wise-attendance-sheet`;
export const downloadExamWiseDescriptiveRollSheet = `${API_END_POINT}college/download-exam-wise-descriptive-roll-sheet`;

export const examWiseAttendanceSheet = `${API_END_POINT}download-exam-wise-attendance-sheet`;
export const examWiseDescriptiveRollSheet = `${API_END_POINT}download-exam-wise-descriptive-roll-sheet`;

// =================Exam Store Item/ Receive Item List/ Unit List========================
export const ExamItemList = prefix+"store-item";
export const ExamReceivedItemList = prefix+"store-item-receive";
