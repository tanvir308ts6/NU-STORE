<template>
  <div>
    <!--Full width header Start-->
    <Header :fromHome="false"></Header>
    <!--Full width header End-->

    <!-- Main content Start -->
    <div class="main-content">
      <!-- Breadcrumbs Start -->
      <div class="rs-breadcrumbs breadcrumbs-overlay">
        <div class="breadcrumbs-img">
          <img :src="require('@/assets/images/breadcrumbs/1.jpg')" alt="Breadcrumbs Image" />
        </div>
        <div class="breadcrumbs-text white-color">
          <h1 class="page-title">About Us</h1>
          <ul>
            <li>
              <a class="active" href="index.html">Home</a>
            </li>
            <li>About Us</li>
          </ul>
        </div>
      </div>
      <!-- Breadcrumbs End -->

      <!-- About Section Start -->
      <div id="rs-about" class="rs-about style2 pt-50 pb-50 ">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="sec-title">
                <!-- <div class="sub-title">About NU (EMS)</div> -->
                <h3 class="title mb-2">Examination Management System (EMS)</h3>
                <div class=" mb-4">
                  The envisioned Examination Management System hereafter referred to as EMS is to
                  manage the various functions of Examination Division of National University with a
                  vision to enhance the overall efficiency.
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 ">
              <div class="">
                <p>
                  The broad objectives of the envisaged System are:
                </p>

                <ul class="ul_li_color">
                  <li>
                    To automate the entire process of the Examination Division to provide better
                    services in a paperless environment to serve the Students and Staffs of the
                    University.
                  </li>
                  <li>
                    To speed up the information flow among different sectors/sections of Examination
                    Division for better Transparency, reliability and timely execution of the work
                    Process.
                  </li>
                  <li>
                    To share and get the information optimally in a better way for efficient
                    decision- making with increased accountability.
                  </li>
                  <li>
                    Better and timely addressing of the grievances of the Students and Colleges.
                  </li>
                  <li>
                    To integrate with the existing Enterprise Resource Planning (ERP) and to make it
                    compatible with Mobile Environment.
                  </li>
                  <li>
                    To eliminate the needs of operating OMR based examination processing system like
                    OMR form receiving, Sorting and Scanning, Data capturing, Correction and
                    solving, exam script distribution, mark capturing etc. and maintenance of costly
                    hardware and other resources like OMR machine, its spare parts, Human
                    Resources(HR) etc.
                  </li>
                  <li>
                    To introduce state of the art data logging for all event points and maintain
                    intelligent system for assisting NU for the overall process beyond answer sheet
                    tracking and error manageability.
                  </li>
                  <li>
                    To make the process real time at site and to automate the script distribution to
                    reduce current logistics and resources pressure.
                  </li>
                  <li>To minimize data loss in legitimate work both by student and examiner.</li>
                  <li>To reduce the result processing time to a minimum level.</li>
                  <li>
                    To ensure secured data transfer at all points of the EMS with proper encryption
                    techniques.
                  </li>
                  <li>
                    To implement the result approval and correction system with highest level of
                    security
                  </li>
                  <li>
                    To integrate the current payment system and also ensuring options for future
                    charging mechanism and payment environment.
                  </li>
                  <li>
                    Identify the processes running in manual and breakdown those processes into sub-
                    processes in order to optimize the processing times.
                  </li>
                  <li>
                    Clearly indentify the stakeholders, tasks and roles. And bridging the
                    stakeholders through the product.
                  </li>
                  <li>
                    Incorporate service Service Level Agreement (SLA) in order to reduce processing
                    time and unnecessary bureaucratic manner from stakeholders.
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6">
              <p>
                Some of the functional objectives of the EMS are given below:
              </p>
              <ul class="ul_li_color">
                <li>
                  To create a robust secured system which should be able to manage pre-examination,
                  post examination, result and other activities of Examination division for timely
                  completion of academic session.
                </li>
                <li>
                  To facilitate proper and accurate report generation for the Vice-Chancellor,
                  senior administrative authorities and other users for monitoring and quick
                  decision making.
                </li>
                <li>Induction of transparency and accountability in operations.</li>
                <li>Reduction of redundant workload of department employees.</li>
                <li>Electronic security and control of confidential data.</li>
                <li>Fast disposal of stakeholder grievances.</li>
                <li>Dissemination of information as per public requirements.</li>
                <li>Protecting the interest of all the stakeholders.</li>
                <li>
                  Providing interfaces to all stakeholders for communicating with the University
                  (i.e. Student Portal, Employee Portal, College Portal and Regional Center portal
                  for various report generation).
                </li>
                <li>Unified platform to provide ease of functioning.</li>
                <li>
                  To bring Improvement in the internal processes of Universities to achieve
                  efficiency.
                </li>
                <li>To improve existing legacy manual system wherever feasible.</li>
                <li>Resource optimization.</li>
                <li>Reduce the time and cost and change the day to day working fusion.</li>
                <li>Reduce workload and making easy of working environments.</li>
                <li>Highly quality product with user friendly interfaces.</li>
                <li>Increased the visibility and liabilities.</li>
              </ul>
              <!-- <div class="img-part">
                            <img class="" src="assets/images/about/about2orange.png" alt="About Image">
                        </div> -->
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <h3 class="title mb-2 mt-2">Key modules:</h3>

              <ol type="1">
                <div class="row">
                  <div class="col-lg-6">
                    <li>
                      College Affiliation & Information Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>College Code generation</li>
                          <li>College Information</li>
                          <li>College wise course and subject affiliation information</li>
                          <li>Course /Subject wise Seat capacity</li>
                          <li>Renewed college</li>
                          <li>Canceled college</li>
                          <li>
                            Integration with existing Integrated Software (College Inspection
                            Module)
                          </li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Syllabus & Regulation Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Syllabus and Regulation Information</li>
                          <li>Academic council decision incorporation</li>
                          <li>Course code generation</li>
                          <li>Subject code generation</li>
                          <li>Paper code generation</li>
                          <li>Session /Course /subject wise marks and credit distribution</li>
                          <li>
                            Integration with existing Integrated Software (College Inspection
                            Module)
                          </li>
                          <li>Course/Group/Subject/paper validation</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Registration Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Integration with University Admission System</li>
                          <li>
                            Registration data sync (admission database and examination database)
                          </li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Examination Committee
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Course and examination Wise committee formation</li>
                          <li>Question Setter and moderator information</li>
                          <li>Remuneration / Billing system</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Form fill-up Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Publish notice for form fill-up</li>
                          <li>
                            Probable List Generation with eligible subject and paper code as per
                            valid registration (as per published notice)
                          </li>
                          <li>Online form fill-up by student</li>
                          <li>College Confirmation</li>
                          <li>Pay Slip generation for college (Sonali Sheba)</li>
                          <li>Special form fill-up</li>
                          <li>Special pay slip generation</li>
                          <li>Fees collection</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Center Management Module (NU)
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Probable exam center information</li>
                          <li>Course and Exam wise center setup</li>
                          <li>Update center list</li>
                          <li>Create Center user and password</li>
                          <li>Send email and SMS to respective college/center</li>
                          <li>User Authentication</li>
                          <li>Attendance Sheet generation</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Center Management Module (College/Center)
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Exam committee setup</li>
                          <li>Invigilator setup</li>
                          <li>Seat plan</li>
                          <li>Attendance data collection and send to NU</li>
                          <li>Absent/expelled/reported list send to NU</li>
                          <li>Receive Examination script from NU</li>
                          <li>Send undistributed script to NU</li>
                          <li>Receive Question</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Invigilator panel
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Log in /log out</li>
                          <li>Authentication</li>
                          <li>Attendance data collection and send to NU</li>
                          <li>Absent/expelled/reported list send to NU</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Student Panel
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>
                            Integration with existing integrated software (student services- login)
                          </li>
                          <li>Form fill up</li>
                          <li>Admit card Download</li>
                          <li>Result view</li>
                          <li>Academic Report view</li>
                          <li>Re-scrutiny application</li>
                          <li>Pay slip download</li>
                          <li>
                            Application for exam related services (duplicate admit card, admit
                            correction etc.)
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      College Panel
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Integration with existing integrated software (college- login)</li>
                          <li>Confirm Form fill up data</li>
                          <li>Download Pay slip</li>
                          <li>Send practical/viva/in course marks to NU</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Admit card Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Admit card generation with photo</li>
                          <li>Digital signature insertion</li>
                          <li>QR Code insertion</li>
                          <li>Admit card correction</li>
                          <li>Duplicate Admit card print</li>
                          <li>Integration with existing Integrated software</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Question preparation and distribution module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>College wise, Subject wise, Paper wise question packet list</li>
                          <li>Center wise paper wise question requisition</li>
                          <li>Question statement</li>
                          <li>Treasury statement</li>
                          <li>Special Report generation as per requirement</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Regional Center module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Automation of existing functions of regional centers</li>
                          <li>Blank script and other items distribution to centers</li>
                          <li>Collection of unused blank script from centers</li>
                          <li>Collection of answer script from centers</li>
                          <li>Distribution of answer script to the examiners</li>
                          <li>Collection of answer script from examiners (for re-scrutinizing)</li>
                          <li>Special Report generation as per requirement</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Script Distribution and Collection module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>
                            Center wise blank script distribution through NU and Regional centers
                          </li>
                          <li>Collection of unused blank Script from centers</li>
                          <li>Reminder/notification (SMS/email) to the concern centers</li>
                          <li>Collection of Answer script from Centers</li>
                          <li>
                            Distribution of Answer Script to Examiners through Regional centers
                          </li>
                          <li>
                            Reminder/notification (SMS/email) to the concern examiners/head
                            examiners
                          </li>
                          <li>Special Report generation as per requirement</li>
                          <li>Integration with existing TMIS Software</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Head Examiner/Examiner module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Integration with existing TMIS module</li>
                          <li>Send marks to Head examiner/send marks to NU server</li>
                          <li>Send comments to NU</li>
                          <li>Send bill to NU</li>
                          <li>Receive Bill from NU</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                  </div>
                  <div class="col-lg-6">
                    <li>
                      Practical/Viva exam module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>User (College, external examiner etc.) authentication</li>
                          <li>Send marks to NU (online)</li>
                          <li>Print report</li>
                          <li>send signed hard copy to NU</li>
                          <li>Publish Notice to related website</li>
                          <li>Send notification (sms/email) to the concerns</li>
                          <li>Probable list generation</li>
                          <li>Practical/Viva Center generation</li>
                          <li>External Examiner appointment</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Result Module
                      <div class="pl-3">
                        <ol type="a">
                          <li>
                            Result processing sub-module
                            <ul class="ul_li_color pl-4">
                              <li>
                                Compilation of Internal/External/Practical Marks. Result processing
                                on the basis of rules and regulations of the University.
                              </li>
                              <li>Rollback of result process if any problem arises at runtime.</li>
                              <li>Locking marks once it is finalized, so it cannot be changed.</li>
                              <li>Online publication of results.</li>
                              <li>
                                Real Time graphical representation and statistical report of the
                                results (in the form of graphs, charts etc.).
                              </li>
                              <li>
                                Short-listing of students for next semester, back log students, year
                                back students etc.
                              </li>
                              <li>
                                Various MIS reports like College-wise result report, Branch-wise
                                result report, Subject-wise result report.
                              </li>
                              <li>
                                Facility for students to view their previous semester results,
                                grades and marks obtained on student self-service portal.
                              </li>
                              <li>Generating/Printing log.</li>
                              <li>Audit trail.</li>
                              <li>Others</li>
                            </ul>
                          </li>
                          <li>
                            Certificate/Mark sheet/Transcript printing sub-module
                            <ul class="ul_li_color pl-4">
                              <li>
                                Printing of certificate/mark sheets/Transcript in specified format
                                (it can vary for degree program wise).
                              </li>
                              <li>
                                Mark sheets should have student photograph, and other student
                                details along with their marks/grades.
                              </li>
                              <li>
                                Suitable Security features on the mark sheets such as barcode,
                                unique number etc.
                              </li>
                              <li>
                                Generation of various certificates such as migration certificate,
                                eligibility certificate and provisional certificates from the
                                system.
                              </li>
                              <li>
                                System provides facility of generating duplicate mark
                                sheets/certificates/Transcript.
                              </li>
                              <li>Generating/Printing log</li>
                              <li>Audit trail</li>
                              <li>Others</li>
                            </ul>
                          </li>
                          <li>
                            Certificate/Mark Sheet dispatch sub-module
                            <div class="pl-3">
                              <ul class="ul_li_color pl-4">
                                <li>Dispatch schedule/notification</li>
                                <li>Register maintenance</li>
                                <li>Others</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            Result/Certificate verification sub-module
                            <ul class="ul_li_color pl-4">
                              <li>
                                Receive Online Application for Result Verification (Home and Abroad)
                              </li>
                              <li>Receive app fee (BDT /USD)</li>
                              <li>Send verification report</li>
                              <li>online certificate verification</li>
                              <li>Others</li>
                            </ul>
                          </li>
                          <li>
                            Result/Certificate verification sub-module
                            <div class="pl-3">
                              <ul class="ul_li_color pl-4">
                                <li>
                                  Online application submission from student for
                                  correction/challenge
                                </li>
                                <li>Necessary process for internal approval</li>
                                <li>
                                  Unlocking of the result of the student for change/edit/correction
                                </li>
                                <li>Approval from authority</li>
                                <li>Publication of edited result and locking it</li>
                              </ul>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </li>
                    <li>
                      Exam Store module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Item information</li>
                          <li>Receive Items</li>
                          <li>Issue Items</li>
                          <li>Stock register</li>
                          <li>College wise/Center wise stock report</li>
                          <li>Dead item list</li>
                          <li>Aging Report</li>
                          <li>Integration with Existing Software</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      BI Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Dashboard for Top Management</li>
                          <li>Generation of different types of Statistical report</li>
                          <li>Variable report</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Admin module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>User/department levels of access to information</li>
                          <li>Multiple information back-up solutions in the system</li>
                          <li>Customize formats for issuing / printing of documents</li>
                          <li>set-up/configuration features</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Old data migration module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Relevant old data migration to proposed new system</li>
                          <li>Data migration report</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      PDF signer Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>
                            The main function of PDF Signer module is to sign PDF documents using
                            X.509 digital certificates or better. This module should be capable of
                            quickly sign multiple PDF files (bulk sign) by selecting input and
                            output directory.
                          </li>
                          <li>
                            PDF Signer should provide a fully configurable appearance for its
                            digital signatures. The positioning of the signature appearance should
                            be configurable, plus on which pages of the document it should appear
                            (first page, last page or all pages).
                          </li>
                          <li>
                            PDF Signer should be completely PKI neutral and should work with PM
                            components from any vendor (this includes CAs, certificates, CRLs,
                            smartcards, etc.).
                          </li>
                          <li>Timestamps should be incorporated.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      File Sending Module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>
                            This module will gather the scanned OMR and any other document or sheet
                            (in image format)
                          </li>
                          <li>It will also read/store the OMR data</li>
                          <li>
                            It will be able to interact with internet facility and send the image
                            and data over internet to a central server location
                          </li>
                          <li>
                            The Central server location can be varied folders but will always be
                            stored in the same local network of National University Database (under
                            supervised IP address)
                          </li>
                          <li>
                            The images and data can be stored in the device too in case of no
                            internet connectivity and will have the scope of sending the information
                            to central database as soon as internet connectivity is available
                          </li>
                          <li>The module will be encrypted end to end and password protected</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Payment Gateway module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Customized Payment gateway integration</li>
                          <li>Multi-support payment gateway solutions</li>
                          <li>Multi-currency conversions</li>
                          <li>Secured payment</li>
                          <li>Real-time instant information about account</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      Backup and Restore module
                      <div class="pl-3">
                        <ul class="ul_li_color">
                          <li>Settings</li>
                          <li>Backups</li>
                          <li>Restores</li>
                          <li>Servers/Storage (DC-DR)</li>
                          <li>Reports</li>
                          <li>Others</li>
                        </ul>
                      </div>
                    </li>
                  </div>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- About Section End -->

      <!-- Counter Section Start -->
      <!-- <div id="rs-counter" class="rs-counter style2-about  pt-50 pb-50">
			<div class="container">
				<div class="row couter-area">
					<div class="col-md-4 sm-mb-30">
						<div class="counter-item text-center">
							<div class="counter-bg">
								<img src="assets/images/counter/bg1.png" alt="Counter Image">
							</div>
							<div class="counter-text">
								<h2 class="rs-count kplus">2</h2>
								<h4 class="title mb-0">Students</h4>
							</div>
						</div>
					</div>
					<div class="col-md-4 sm-mb-30">
						<div class="counter-item text-center">
							<div class="counter-bg">
								<img src="assets/images/counter/bg2.png" alt="Counter Image">
							</div>
							<div class="counter-text">
								<h2 class="rs-count">3.50</h2>
								<h4 class="title mb-0">Average CGPA</h4>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="counter-item text-center">
							<div class="counter-bg">
								<img src="assets/images/counter/bg3.png" alt="Counter Image">
							</div>
							<div class="counter-text">
								<h2 class="rs-count percent">95</h2>
								<h4 class="title mb-0">Graduates</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
      <!-- Counter Section End -->
    </div>
    <!-- Main content End -->

    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/views/util/footer.vue";
import Header from "@/views/util/header.vue";
export default {
  components: {
    // carousel
    Footer,
    Header,
  },
  mounted() {
    const script0 = document.createElement("script");
    script0.setAttribute(":src", require("@/assets/js/main.js"));
    script0.setAttribute("type", "text/babel");
    script0.async = true;
    document.head.appendChild(script0);
    const script1 = document.createElement("script");
    script1.setAttribute(":src", require("@/assets/js/jquery.min.js"));
    script1.setAttribute("type", "text/babel");
    script1.async = true;
    document.head.appendChild(script1);
    const script2 = document.createElement("script");
    script2.setAttribute(":src", require("@/assets/js/bootstrap.min.js"));
    script2.setAttribute("type", "text/babel");
    script2.async = true;
    document.head.appendChild(script2);
    const script3 = document.createElement("script");
    script3.setAttribute(":src", require("@/assets/js/rsmenu-main.js"));
    script3.setAttribute("type", "text/babel");
    script3.async = true;
    document.head.appendChild(script3);
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goAbout() {
      this.$router.push("/about");
    },
    goHome() {
      this.$router.push("/");
    },
    goManual() {
      this.$router.push("/user-manual");
    },
    goContact() {
      this.$router.push("/contact");
    },
  },
};
</script>
<style scoped src="@/assets/css/bootstrap.min.css"></style>
<style scoped src="@/assets/css/font-awesome.min.css"></style>
<style scoped src="@/assets/css/animate.css"></style>
<style scoped src="@/assets/css/rsmenu-main.css"></style>
<style scoped src="@/assets/css/style.css"></style>
<style scoped src="@/assets/css/responsive.css"></style>
