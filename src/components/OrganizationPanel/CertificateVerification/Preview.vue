<template>
  <div id="CertificateVerificationPreview">
    <v-container fluid>
      <div class="elevation-1">
        <div class="">
          <table width="100%" class="v-datatable v-table theme--light">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Reg No.</th>
                <th>Session</th>
                <th>Roll No.</th>
                <th>Attachment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in getCVStudentSchema" :key="index">
                <td>{{ getAllDegreeNameList[student.degree_code] }}</td>
                <td>{{ student.reg_no }}</td>
                <td>{{ student.ac_session }}</td>
                <td>{{ student.roll }}</td>
                <td>
                  <slot v-for="(attachment, aindex) in student.attachment">
                    <span v-if="aindex" :key="aindex"
                      >, {{ attachment.attachment_name }}</span
                    >
                    <span v-else :key="aindex">{{
                      attachment.attachment_name
                    }}</span>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <v-layout>
        <div class="justify-center layout px-0">
          <v-btn color="success" @click="submitAttachment">Submit</v-btn>
          <v-btn color="primary" @click="backPreceed">Back</v-btn>
        </div>
      </v-layout>
    </v-container>
    <!-- <pre>{{getCVStudentSchema}}</pre> -->
    <!-- <pre>{{getAllDegreeNameList}}</pre> -->
  </div>
</template>
<script>
export default {
  computed: {
    getCVStudentSchema() {
      return this.$store.getters.getCVStudentSchema;
    },
    getAllDegreeNameList() {
      return this.$store.getters.getAllDegreeNameList;
    }
  },
  created() {
    this.$store.dispatch("getAllDegreeNameList");
  },
  methods: {
    submitAttachment() {
      //this.$parent.submitAttachment();
      this.$store.dispatch("storeCV", this.getCVStudentSchema);
      this.$store.commit("SET_CV_STEP", 3);
      //this.$store.dispatch("generatePaySlip");
    },
    backPreceed() {
      this.$store.commit("SET_CV_STEP", 1);
    }
  }
};
</script>
