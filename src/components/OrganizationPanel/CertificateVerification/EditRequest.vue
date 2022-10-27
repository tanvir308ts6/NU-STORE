<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog
        v-model="editRequest"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Edit Student Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="close">Close</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
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
                    <tr v-for="(student, index) in editData" :key="index">
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
                          name="exam_roll_no"
                          label="Roll No"
                          v-model="student.exam_roll_no"
                          v-validate="'required'"
                          data-vv-name="exam_roll_no"
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
                                :data-attachment_name="
                                  attachment.attachment_name
                                "
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
                                @click="removeAtt(attachment.id)"
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
                          @click="removeStudent(student.id, index)"
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
                    <v-btn color="success" @click="updateCVRequest"
                      >Update</v-btn
                    >
                  </div>
                </v-layout>
              </v-form>
            </v-card>
            <!--<pre>{{ editData }}</pre>-->
            <!-- <pre>{{dialogData}}</pre> -->
            <!-- <pre>{{cv_students}}</pre> -->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["editRequest", "editData", "cvid"],
  created() {
    this.$store.dispatch("getAllDegreeList");
    this.$store.dispatch("fetchAcSessionData");
    this.$store.dispatch("fetchExamYearData");
    this.$store.commit("RESET_SELECTED_FILE");
  },
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
      attachment: {},
      dialog: true,
      atModal: false,
      atData: null,
      headers: [
        { text: "Degree", value: "degree.degree_name" },
        { text: "Registration", value: "reg_no" },
        { text: "Session", value: "ac_session" },
        { text: "Remarks", value: "remarks" },
        { text: "Status", value: "status" },
        { text: "Action", value: "" }
      ],
      cv_students: []
    };
  },
  mounted() {
    this.cv_students = this.editRequestData;
  },
  methods: {
    // update(attachment) {
    //   var reg_no = document.getElementById("reg_no").innerHTML;
    //   let self = this;
    //   self.attachment.id = attachment.id;
    //   self.attachment.reg_no = reg_no;
    //   self.attachment.attachment_name = attachment.attachment_name;
    //   self.$store.dispatch("updateRequest", self.attachment).then(() => {
    //     self.$store.dispatch("fetchCvData");
    //   });
    // },
    updateCVRequest() {
      let self = this;
      self.$store.dispatch("updateCVRequestAction", self.editData).then(() => {
        this.$store.dispatch("fetchCvData");
      });
    },
    OnFileSelected(event) {
      let index = event.target.dataset.index;
      let aindex = event.target.dataset.aindex;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        this.editData[index].attachment[aindex].attachment_file =
          event.target.result;
        console.log(event.target.result);
      };
      reader.readAsDataURL(file);
    },

    removeAtt(id) {
      this.$store.dispatch("removeStudentAt", { id: id });
      //this.editData.student.attachment.splice(aindex, 1);
    },

    removeStudent(id, index) {
      this.$store.dispatch("removeStudent", { id: id });
      this.editData.splice(index, 1);
    },
    addMore() {
      this.editData.push({
        certificate_verification_id: this.cvid,
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
    close() {
      this.$emit("update:editRequest", false);
    }
  }
};
</script>
