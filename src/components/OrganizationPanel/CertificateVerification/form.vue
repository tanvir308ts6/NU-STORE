<template>
  <div id="CertificateVerificationForm">
    <v-container fluid>
      <v-card>
        <v-card-text>
          <ul>
            <li>Please attach valid supporting document.</li>
            <li>Certificate</li>
            <li>
              Valid File Type : pdf, png, jpg, jpeg. Maximum File Size:1MB
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card>
        <v-form>
          <table width="100%" class="elevation-1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reg No.</th>
                <th>Session</th>
                <th>Roll No.</th>
                <th>Attachment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in getCVStudentSchema" :key="index">
                <td>
                  <v-select
                    v-model="student.degree_code"
                    :items="getAllDegreeList"
                    item-text="degree_name"
                    item-value="degree_code"
                    label="Select Degree"
                  ></v-select>
                </td>

                <td>
                  <v-text-field
                    name="reg_no"
                    label="Reg No"
                    v-model="student.reg_no"
                    v-validate="'required'"
                    data-vv-name="reg_no"
                    prepend-icon="edit"
                    required
                  ></v-text-field>
                </td>
                <td>
                  <!-- <v-select
                        v-model="getSchema.irregular_ac_session"
                        :items="getSchemaSession"
                        item-text="ac_session"
                        item-value="ac_session"
                        label="Select Academic Session"
                        multiple
                    ></v-select>-->
                  <!-- <v-text-field
                        name="reg_no"
                        label="Session"
                        v-model="student.ac_session"
                        v-validate="'required'"
                        data-vv-name="reg_no"
                        prepend-icon="edit"
                        required
                    ></v-text-field>-->
                  <v-select
                    v-model="student.ac_session"
                    :items="getSchemaSession"
                    item-text="ac_session"
                    item-value="ac_session"
                    label="Select Session"
                  ></v-select>
                </td>
                <td>
                  <v-text-field
                    name="roll"
                    label="Roll No"
                    v-model="student.roll"
                    v-validate="'required'"
                    data-vv-name="roll"
                    prepend-icon="edit"
                    required
                  ></v-text-field>
                </td>
                <td>
                  <table width="100%">
                    <tr
                      v-for="(attachment, aindex) in student.attachment"
                      :key="aindex"
                    >
                      <td>
                        <v-text-field
                          name="attachment_name"
                          label="Document Name"
                          v-model="attachment.attachment_name"
                          v-validate="'required'"
                          data-vv-name="attachment_name"
                          prepend-icon="edit"
                          required
                        ></v-text-field>
                        <input
                          type="file"
                          :data-reg_no="student.reg_no"
                          :data-attachment_name="attachment.attachment_name"
                          :data-index="index"
                          :data-aindex="aindex"
                          name="attachment_file"
                          @change="OnFileSelected($event)"
                        />
                      </td>

                      <td>
                        <v-btn
                          v-if="aindex"
                          fab
                          dark
                          small
                          color="red"
                          @click="student.attachment.splice(aindex, 1)"
                        >
                          <v-icon dark>clear</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </table>

                  <v-btn
                    fab
                    dark
                    small
                    color="info"
                    @click="addMoreAttachment(student.attachment)"
                  >
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    v-if="index"
                    fab
                    dark
                    small
                    color="red"
                    @click="getCVStudentSchema.splice(index, 1)"
                  >
                    <v-icon dark>clear</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>

          <v-layout>
            <div class="justify-left layout px-0">
              <v-btn fab dark small color="info" @click="addMore()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
          </v-layout>
          <v-layout>
            <div class="justify-center layout px-0">
              <v-btn color="success" @click="preceed">Preview</v-btn>
              <v-btn color="warning" @click="reset">Reset</v-btn>
            </div>
          </v-layout>
        </v-form>
      </v-card>

      <!-- <pre>{{dialogData.exm_master_fee}}</pre> -->
    </v-container>
    <!-- <pre>{{getSchemaSession}}</pre> -->
    <!-- <pre>{{getSchemaExamYear}}</pre> -->
    <!-- <pre>{{getAllDegreeList}}</pre> -->
    <!-- <pre>{{ getCVStudentSchema }}</pre> -->
  </div>
</template>

<script>
// import commonExamYear from "@/mixin/exam_year_watch_mixin";
// import commonGet from "@/mixin/org_common_getters_mixin";
export default {
  created() {
    this.$store.dispatch("getAllDegreeList");
    this.$store.dispatch("fetchAcSessionData");
    this.$store.dispatch("fetchExamYearData");
    this.$store.commit("RESET_SELECTED_FILE");
  },
  //   mixins: [commonGet],
  computed: {
    organization() {
      return this.$store.getters.organization;
    },
    getSchemaSession() {
      return this.$store.getters.getAcSession;
    },
    getSchemaExamYear() {
      return this.$store.getters.getExamYear;
    },
    getCVStudentSchema() {
      return this.$store.getters.getCVStudentSchema;
    },
    selectedFile() {
      return this.$store.getters.selectedFile;
    },
    getAllDegreeList() {
      return this.$store.getters.getAllDegreeList;
    }
  },
  data() {
    return {
      attachment: {}
    };
  },
  methods: {
    addMore() {
      this.getCVStudentSchema.push({
        attachment: [
          {
            attachment_name: "Document Name"
          }
        ]
      });
    },
    addMoreAttachment(attachment) {
      attachment.push({
        attachment_name: "Document Name"
      });
    },
    preceed() {
      this.$store.commit("SET_CV_STEP", 2);
    },
    reset() {
      this.$store.commit("UNSET_CV_STUDENT_SCHEMA");
      this.$store.commit("RESET_SELECTED_FILE");
      this.$store.commit("SET_CV_STEP", 1);
    },
    OnPickFile(id) {
      this.$ref[id].click();
    },
    OnFileSelected(event) {
      let index = event.target.dataset.index;
      let aindex = event.target.dataset.aindex;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        this.getCVStudentSchema[index].attachment[aindex].attachment_file =
          event.target.result;
        console.log(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
