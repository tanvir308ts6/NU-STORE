<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- <pre>formData{{formData}}</pre> -->
        <!-- <pre>getLoggedInExam{{getLoggedInExam}}</pre> -->
        <!-- <pre>getSubjectData{{getSubjectData.length}}</pre> -->
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Members</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-flex xs12 md12>
            <v-card>
              <v-form ref="form" id="regMemberForm">
                <v-container>
                  <v-layout row wrap>
                    <v-toolbar color="cyan darken-4" class="white--text" dense>
                      <v-toolbar-title class="text-uppercase"
                        >Personal Information
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <!--<v-btn color="info">
                                                Download Report
                                                <v-icon right dark>cloud_download</v-icon>
                                            </v-btn>-->
                    </v-toolbar>

                    <v-flex xs12 sm6 md6>
                      <br />
                      <v-text-field
                        v-model="formData.name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="Name"
                        data-vv-name="name"
                        name="name"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <br />
                      <v-text-field
                        v-model="formData.father_name"
                        v-validate="'required'"
                        :error-messages="errors.collect('father_name')"
                        label="Father Name"
                        data-vv-name="father_name"
                        name="father_name"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-select
                        v-model="formData.gender"
                        :items="genderArrData"
                        item-text="name"
                        item-value="id"
                        label="Select Gender"
                        data-vv-name="gender"
                        v-validate="'required'"
                        :error-messages="errors.collect('gender')"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-menu
                        ref="dateMenu1"
                        v-model="dateMenu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formData.date_of_birth"
                            label="Date of birth"
                            persistent-hint
                            prepend-icon="event"
                            v-validate="'required'"
                            :error-messages="errors.collect('date_of_birth')"
                            data-vv-name="date_of_birth"
                            required
                            readonly
                            name="date_of_birth"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="formData.date_of_birth"
                          no-title
                          @input="dateMenu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-menu
                        ref="dateMenu2"
                        v-model="dateMenu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formData.joining_date"
                            label="Joining Date"
                            persistent-hint
                            prepend-icon="event"
                            v-validate="'required'"
                            :error-messages="errors.collect('joining_date')"
                            data-vv-name="joining_date"
                            required
                            readonly
                            name="joining_date"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="formData.joining_date"
                          no-title
                          @input="dateMenu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.nid_no"
                        v-validate="'required'"
                        :error-messages="errors.collect('nid_no')"
                        label="National ID"
                        data-vv-name="nid_no"
                        name="nid_no"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-select
                        v-model="formData.organization_type"
                        v-validate="'required'"
                        :error-messages="errors.collect('organization_type')"
                        :items="orgTypeArrData"
                        item-text="name"
                        item-value="id"
                        label="Select Organization"
                        data-vv-name="organization_type"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-menu
                        ref="dateMenu3"
                        v-model="dateMenu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formData.jod_present_deg"
                            label="Joining Date in Present Designation"
                            data-vv-name="jod_present_deg"
                            persistent-hint
                            prepend-icon="event"
                            v-validate="'required'"
                            :error-messages="errors.collect('joining_date')"
                            required
                            readonly
                            name="jod_present_deg"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          name="jod_present_deg"
                          v-model="formData.jod_present_deg"
                          no-title
                          @input="dateMenu3 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-select
                        name="degree_group_code"
                        class="ma-2"
                        v-model="formData.degree_group_code"
                        :item-text="
                          item =>
                            item.degree_group_code +
                            '-' +
                            item.degree_group_name
                        "
                        item-value="degree_group_code"
                        :items="$parent.getAllDegreeGroup"
                        menu-props="auto"
                        label="Select Degree Group"
                        @change="$parent.fetchAllSubjectData"
                        data-vv-name="degree_group_code"
                        v-validate="'required'"
                        required
                        :error-messages="errors.collect('degree_group_code')"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-autocomplete
                        v-if="
                          formData.degree_group_code &&
                            Object.keys(getSubjectData).length != 0 &&
                            getLoggedInExam.degree_code != 1
                        "
                        v-model="formData.subject_code"
                        :items="getSubjectData"
                        :item-text="
                          item => item.subject_code + '-' + item.subject_name
                        "
                        item-value="subject_code"
                        label="Select Subject"
                        clearable
                        data-vv-name="subject_code"
                        v-validate="'required'"
                        required
                        :error-messages="errors.collect('subject_code')"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.index_no"
                        v-validate="'required'"
                        :error-messages="errors.collect('index_no')"
                        label="Index No"
                        data-vv-name="index_no"
                        name="index_no"
                        required
                      ></v-text-field>
                    </v-flex>

                    <!-- photo upload -->
                    <v-flex sm4 md4>
                      <v-text-field
                        name="photo"
                        label="Upload Your Photo "
                        @click="$refs.inputUpload1.click()"
                        append-icon="attach_file"
                        v-model="formData.image_name"
                      ></v-text-field>
                    </v-flex>
                    <input
                      v-show="false"
                      ref="inputUpload1"
                      type="file"
                      accept="image/*"
                      @click="$refs.inputUpload1.value = null"
                      @change="onFilePicked1"
                    />

                    <v-flex sm2 md2>
                      <img
                        :src="photo_imageUrl"
                        height="150"
                        width="160"
                        v-if="photo_imageUrl"
                      />
                    </v-flex>
                    <!-- end photo upload -->

                    <!-- signature upload -->
                    <v-flex sm4 md4>
                      <v-text-field
                        name="signature"
                        label="Upload Your Signature "
                        @click="$refs.inputUpload2.click()"
                        append-icon="attach_file"
                        v-model="formData.signature_image"
                      ></v-text-field>
                    </v-flex>
                    <input
                      v-show="false"
                      ref="inputUpload2"
                      type="file"
                      accept="image/*"
                      @click="$refs.inputUpload2.value = null"
                      @change="onFilePicked2"
                    />

                    <v-flex sm3 md2>
                      <img
                        :src="signature_imageUrl"
                        height="150"
                        width="160"
                        v-if="signature_imageUrl"
                      />
                    </v-flex>
                    <!-- end signature upload -->

                    <v-toolbar color="cyan darken-4" class="white--text" dense>
                      <v-toolbar-title class="text-uppercase"
                        >Contact Information
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <!--<v-btn color="info">
                                                Download Report
                                                <v-icon right dark>cloud_download</v-icon>
                                            </v-btn>-->
                    </v-toolbar>

                    <v-flex xs12 sm6 md6>
                      <br />
                      <v-textarea
                        v-model="formData.present_address"
                        data-vv-name="present_address"
                        label="Present Address"
                        name="present_address"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <br />
                      <v-textarea
                        v-model="formData.permanent_address"
                        data-vv-name="permanent_address"
                        label="Permanent Address"
                        name="permanent_address"
                      ></v-textarea>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="Email"
                        type="email"
                        data-vv-name="email"
                        name="email"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.mobile"
                        v-validate="'required|min:11'"
                        :error-messages="errors.collect('mobile')"
                        label="Mobile"
                        data-vv-name="mobile"
                        name="mobile"
                        type="tel"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.phone"
                        label="Home Phone"
                        data-vv-name="phone"
                        name="phone"
                        type="tel"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.office_phone"
                        label="Office Phone"
                        data-vv-name="office_phone"
                        name="office_phone"
                        type="tel"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.username"
                        v-validate="'required'"
                        :error-messages="errors.collect('username')"
                        label="Username"
                        data-vv-name="username"
                        name="username"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-select
                        v-model="formData.reg_type"
                        v-validate="'required'"
                        :error-messages="errors.collect('reg_type')"
                        :items="regTypeArrData"
                        item-text="name"
                        item-value="id"
                        label="Select Registration Type"
                        data-vv-name="reg_type"
                        required
                        @change="getRegTypeData"
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.password"
                        v-validate="'required'"
                        :error-messages="errors.collect('password')"
                        label="Password"
                        type="password"
                        data-vv-name="password"
                        ref="password"
                        name="password"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="formData.confirmed"
                        v-validate="'required|confirmed:password'"
                        :error-messages="errors.collect('confirm')"
                        label="Retype Password"
                        data-vv-name="confirm"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>

                    <slot v-if="college">
                      <v-toolbar
                        color="cyan darken-4"
                        class="white--text"
                        dense
                      >
                        <v-toolbar-title class="text-uppercase"
                          >College (For Teacher)
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>

                      <v-flex xs12 sm6 md4>
                        <br />
                        <v-select
                          v-model="formData.division_id"
                          v-validate="'required'"
                          :error-messages="errors.collect('division_id')"
                          label="Select Division"
                          item-text="division_name"
                          item-value="division_id"
                          :items="getDivisions"
                          data-vv-name="division_id"
                          @change="getDistrictData"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm6 md4>
                        <br />
                        <v-select
                          v-model="formData.district_id"
                          v-validate="'required'"
                          :error-messages="errors.collect('district_id')"
                          label="Select District"
                          item-text="district_name"
                          item-value="district_id"
                          :items="getDistricts"
                          data-vv-name="district_id"
                          @change="getThanaData"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm6 md4>
                        <br />
                        <v-select
                          v-model="formData.thana_id"
                          v-validate="'required'"
                          :error-messages="errors.collect('thana_id')"
                          label="Select Thana"
                          data-vv-name="thana_id"
                          item-text="thana_name"
                          item-value="thana_id"
                          :items="getThanas"
                          @change="getThanaWiseCollege"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm6 md8>
                        <v-autocomplete
                          label="Select College"
                          :item-text="
                            item =>
                              item.college_code + ' - ' + item.college_name
                          "
                          item-value="college_code"
                          v-model="formData.college_code"
                          :items="getCollegeData"
                          data-vv-name="college_code"
                          prepend-inner-icon="edit"
                          v-validate="'required'"
                          :error-messages="errors.collect('college_code')"
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              close
                              @input="formData.college_code = ''"
                              :selected="data.selected"
                              class="chip--select-multi"
                            >
                              {{
                                data.item.college_code +
                                  " - " +
                                  data.item.college_name
                              }}
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-tile-content
                                v-text="data.item"
                              ></v-list-tile-content>
                            </template>
                            <template v-else>
                              <v-list-tile-content>
                                <v-list-tile-title
                                  v-html="
                                    data.item.college_code +
                                      ' - ' +
                                      data.item.college_name
                                  "
                                ></v-list-tile-title>
                              </v-list-tile-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select
                          v-model="formData.designation"
                          v-validate="'required'"
                          :error-messages="errors.collect('designation')"
                          :items="designationArrData"
                          item-text="name"
                          item-value="id"
                          label="Select Designation"
                          data-vv-name="designation"
                          required
                        ></v-select>
                      </v-flex>
                    </slot>

                    <slot v-if="organization">
                      <v-toolbar
                        color="cyan darken-4"
                        class="white--text"
                        dense
                      >
                        <v-toolbar-title class="text-uppercase"
                          >Organization (Other Then Teacher)
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>

                      <v-flex xs12 sm6 md6>
                        <br />
                        <!--
                        <v-text-field
                          v-model="formData.teacher_organization"
                          label="Organization"
                          name="teacher_organization"
                          v-validate="'required'"
                          data-vv-name="teacher_org"
                          :error-messages="errors.collect('teacher_org')"
                        ></v-text-field>
                        -->
                        <v-select
                          v-model="formData.teacher_organization"
                          :items="orgArrData"
                          item-text="name"
                          item-value="id"
                          label="Select Organization"
                          data-vv-name="teacher_org"
                          v-validate="'required'"
                          :error-messages="errors.collect('teacher_org')"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm6 md6>
                        <br />
                        <!--
                        <v-text-field
                          v-model="formData.teacher_designation"
                          label="Designation"
                          name="teacher_designation"
                          v-validate="'required'"
                          data-vv-name="teacher_designation"
                          :error-messages="
                            errors.collect('teacher_designation')
                          "
                        ></v-text-field>
                        -->
                        <v-select
                          v-model="formData.teacher_designation"
                          v-validate="'required'"
                          :error-messages="
                            errors.collect('teacher_designation')
                          "
                          :items="orgDesignationArrData"
                          item-text="name"
                          item-value="id"
                          label="Select Designation"
                          data-vv-name="teacher_designation"
                          required
                        ></v-select>
                      </v-flex>
                    </slot>
                    <v-flex xs12 sm6 md12>
                      <v-checkbox
                        name="exam_code"
                        v-model="formData.exam_code"
                        :label="`Only for ${getLoggedInExam.title}`"
                        :value="getLoggedInExam.code"
                        type="checkbox"
                        color="indigo darken-3"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="formData.status"
                        label="Active"
                        value="1"
                        type="checkbox"
                        color="indigo darken-3"
                      ></v-checkbox>
                    </v-flex>
                    <div class="justify-center layout px-0">
                      <v-btn color="success" @click="save">Save</v-btn>
                      <v-btn color="error" @click="close">Close</v-btn>
                    </div>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  props: ["dialogStatus"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    dateMenu1: false,
    dateMenu2: false,
    dateMenu3: false,
    joiningDate: false,
    // joiningDate: false,
    formData: {},
    photo_imageUrl: "",
    photo_imageFile: "",
    signature_imageUrl: "",
    signature_imageFile: "",
    collegeSearchData: {},
    college: false,
    organization: false
  }),

  computed: {
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getDivisions() {
      return this.$store.getters.getDivision;
    },
    getDistricts() {
      return this.$store.getters.getDistrict;
    },
    getThanas() {
      return this.$store.getters.getThana;
    },
    getCollegeData() {
      return this.$store.getters.getAllCollege;
    },
    getSubjectData() {
      return this.$store.getters.getAllSubject;
    },
    genderArrData() {
      return this.$store.getters.getSchemaGender;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    designationArrData() {
      return this.$store.getters.getSchemaDesignation;
    },
    orgDesignationArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    orgArrData() {
      return this.$store.getters.getSchemaOrganization;
    },
    regTypeArrData() {
      return this.$store.getters.getSchemaRegType;
    }
  },
  methods: {
    // set college or organization by reg type
    getRegTypeData(id) {
      if (id) {
        if (id == 1) {
          this.college = true;
          this.organization = false;
        } else if (id == 2) {
          this.organization = true;
          this.college = false;
        }
      }
    },
    // get district data by division id
    getDistrictData(division_id) {
      if (division_id) {
        this.$store.dispatch("fetchDistricts", division_id);
        this.$store.dispatch("fetchAllCollegeData", { division: division_id });
      }
    },
    // get thana data by district id
    getThanaData(district_id) {
      if (district_id) {
        this.$store.dispatch("fetchThanas", district_id);
        this.$store.dispatch("fetchAllCollegeData", { district: district_id });
      }
    },
    //get thana wise college list
    getThanaWiseCollege(thana_id) {
      if (thana_id) {
        this.$store.dispatch("fetchAllCollegeData", {
          district: this.formData.district_id,
          thana_id: thana_id
        });
      }
    },

    onFilePicked1(e) {
      // // console.log(e.target.files);
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.formData.image_name = files[0].name;
        if (this.formData.image_name.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.onload = () => {
          this.photo_imageUrl = fr.result;
          this.photo_imageFile = files[0]; // this is an image file that can be sent to server...
        };
      }
    },

    onFilePicked2(e) {
      //console.log(e.target.files);
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.formData.signature_image = files[0].name;
        if (this.formData.signature_image.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.onload = () => {
          this.signature_imageUrl = fr.result;
          this.signature_imageFile = files[0]; // this is an image file that can be sent to server...
        };
      }
    },

    save() {
      let self = this;
      let item = this.formData;

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let myForm = document.getElementById("regMemberForm");
          let fd = new FormData(myForm);
          fd.append("photo", this.photo_imageFile);
          fd.append("signature", this.signature_imageFile);
          fd.append("gender", this.formData.gender);
          fd.append("organization_type", this.formData.organization_type);
          fd.append(
            "designation",
            this.formData.designation ? this.formData.designation : 0
          );
          fd.append(
            "subject_code",
            this.formData.subject_code ? this.formData.subject_code : 0
          );
          fd.append(
            "degree_group_code",
            this.formData.degree_group_code
              ? this.formData.degree_group_code
              : 0
          );
          if (this.formData.division_id)
            fd.append("division_id", this.formData.division_id);
          if (this.formData.district_id)
            fd.append("district_id", this.formData.district_id);
          if (this.formData.thana_id)
            fd.append("thana_id", this.formData.thana_id);
          if (this.formData.college_code)
            fd.append("college_code", this.formData.college_code);
          fd.append("reg_type", this.formData.reg_type);
          if (this.formData.teacher_organization)
            fd.append(
              "teacher_organization",
              this.formData.teacher_organization
            );
          if (this.formData.teacher_designation)
            fd.append("teacher_designation", this.formData.teacher_designation);

          this.$store
            .dispatch("saveExmCommittee", fd)
            .then(function() {
              try {
                self.close();
                self.$store.dispatch("fetchExmCommitteeMemberList");
                Object.keys(item).forEach(function(key) {
                  item[key] = "";
                });
                self.$validator.reset();
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function(error) {
              console.log(error);
              self.$store.dispatch("fetchExmCommitteeMemberList");
            });
        }
      });
    },

    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      //this.$store.commit("SET_DEGREE_FORM_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchDivisions");
    this.$store.dispatch("fetchDistricts");
    this.$store.dispatch("fetchThanas");
    //this.$store.dispatch("fetchAllCollegeData");
    //this.$store.dispatch("fetchAllSubjectData");
  },
  beforeDestroy() {
    this.$parent.searchMember();
  }
};
</script>

<style scoped></style>
