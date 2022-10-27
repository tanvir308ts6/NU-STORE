<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog
        v-model="insStatus"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title
              >Instruction</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="close">Close</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="cv_students"
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td>{{ props.index + 1 }}</td>
                    <td>
                      {{ props.item.degree.degree_name }}
                    </td>
                    <td>{{ props.item.reg_no }}</td>
                    <td>{{ props.item.ac_session }}</td>
                    <td>{{ props.item.remarks }}</td>
                    <td>{{ props.item.status }}</td>
                    <td>
                      <v-btn
                        small
                        color="success"
                        @click="viewCVAttachment(props.item.attachment)"
                      >
                        View Attachment
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <!-- <pre>{{profile}}</pre> -->
            <!-- <pre>{{dialogData}}</pre> -->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import CvStudentAttachment from "@/components/OrganizationPanel/CertificateVerification/viewCvStudentAt.vue";

export default {
  props: ["dialogStatus", "dialogData"],
  components: { CvStudentAttachment },
  data() {
    return {
      dialog: true,
      atModal: false,
      atData: null,
      headers: [
        {
          text: "SL",
          align: "center",
          sortable: false,
          value: "name"
        },
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
    this.cv_students = this.dialogData;
  },
  methods: {
    viewCVAttachment(object) {
      //this.$parent.viewCVAttachment()
      this.atData = object;
      //this.dialogStatus = false;
      this.atModal = true;
      //this.$emit("update:dialogStatus", false);
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
