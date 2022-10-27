<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog
        v-model="editAt"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Edit Student Attachment</v-toolbar-title>
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
                    <td class="text-xs-center">
                      {{ props.item.degree.degree_name }}
                    </td>
                    <td class="text-xs-center" id="reg_no">
                      {{ props.item.reg_no }}
                    </td>
                    <td class="text-xs-center">{{ props.item.ac_session }}</td>
                    <td class="text-xs-center">{{ props.item.remarks }}</td>
                    <td class="text-xs-center">{{ props.item.status }}</td>
                    <td class="text-xs-center">
                      <table width="100%">
                        <tr
                          v-for="(attachment, aindex) in props.item.attachment"
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
                              :data-index="index"
                              :data-aindex="aindex"
                              name="attachment_file"
                              @change="OnFileSelected($event)"
                            />
                            <v-btn color="success" @click="update(attachment)"
                              >Update</v-btn
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td></td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <!-- <pre>{{profile}}</pre> -->
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
  props: ["editAt", "editData"],
  data() {
    return {
      attachment: {
        id: "",
        reg_no: "",
        attachment_name: "",
        attachment_file: ""
      },
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
    this.cv_students = this.editData;
  },
  methods: {
    update(attachment) {
      var reg_no = document.getElementById("reg_no").innerHTML;
      let self = this;
      self.attachment.id = attachment.id;
      self.attachment.reg_no = reg_no;
      self.attachment.attachment_name = attachment.attachment_name;
      self.$store.dispatch("updateCV", self.attachment).then(() => {
        self.$store.dispatch("fetchCvData");
      });
    },
    OnFileSelected(event) {
      let index = event.target.dataset.index;
      let aindex = event.target.dataset.aindex;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        // this.getCVStudentSchema[index].attachment[aindex].attachment_file =
        //   event.target.result;
        this.attachment.attachment_file = event.target.result;
        console.log(event.target.result);
      };
      reader.readAsDataURL(file);
    },
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
    close() {
      this.$emit("update:editAt", false);
    }
  }
};
</script>
