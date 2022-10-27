<template>
  <div id="AssignPrivilege">
    <v-dialog v-model="dialogStatus" persistent>
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">Assign Privilege</span>
            <v-spacer></v-spacer>
            <v-btn
              fab
              class="ma-0 pa-0"
              small
              color="white black--text "
              @click="close"
            >
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <!-- <formNotification /> -->
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form v-model="valid" ref="form" v-on:submit.prevent="submit">
              <v-layout
                class="justify-center"
                row
                wrap
                v-for="(privilege, index) in AssignPrivilege"
                :key="index"
              >
                <v-flex md4>
                  <v-autocomplete
                    :return-object="true"
                    v-model="privilege.exam_master"
                    :items="getExamMasterList"
                    item-text="exam_display_name"
                    item-value="id"
                    label="Select Exam"
                    data-vv-name="exam_initiate_id"
                    :error-messages="errors.collect('exam_master')"
                    required
                    prepend-icon="edit"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md3>
                  <v-autocomplete
                    v-if="privilege.exam_master"
                    v-model="privilege.degree_group_code"
                    :items="
                      getCollegeAllDegreeGroup[
                        privilege.exam_master.core_exam.degree_code
                      ]
                    "
                    item-text="degree_group_display_name"
                    item-value="degree_group_code"
                    label="Degree Group"
                    data-vv-name="degree_group_code"
                    :error-messages="errors.collect('degree_group_code')"
                    required
                    prepend-icon="edit"
                  ></v-autocomplete>
                  <!-- <v-text-field
                    v-if="privilege.exam_master"
                    name="degree_group_code"
                    label="Degree Group"
                    v-model="privilege.degree_group_code"
                    :error-messages="errors.collect('degree_group_code')"
                    data-vv-name="degree_group_code"
                    prepend-icon="edit"
                  ></v-text-field>-->
                </v-flex>
                <v-flex md4>
                  <v-select
                    v-if="
                      privilege.exam_master &&
                        privilege.degree_group_code &&
                        valid_degree_code.includes(
                          Number(privilege.exam_master.core_exam.degree_code)
                        )
                    "
                    v-model="privilege.subject_code"
                    :items="getCollegeAllSubject[privilege.degree_group_code]"
                    item-text="subject_name"
                    item-value="subject_code"
                    label="Subject"
                    data-vv-name="subject_code"
                    :error-messages="errors.collect('subject_code')"
                    :rules="[validationRules.required(privilege.subject_code)]"
                    required
                    prepend-icon="edit"
                  ></v-select>
                  <!-- <v-text-field
                    v-if="privilege.exam_master&& privilege.degree_group_code && valid_degree_code.includes(Number(privilege.exam_master.degree_code))"
                    name="subject_code"
                    label="Subject"
                    v-model="privilege.subject_code"
                    :error-messages="errors.collect('subject_code')"
                    data-vv-name="subject_code"
                    prepend-icon="edit"
                  ></v-text-field>-->
                </v-flex>
                <v-flex md1>
                  <v-btn
                    v-if="index"
                    fab
                    dark
                    small
                    color="red"
                    @click="AssignPrivilege.splice(index, 1)"
                  >
                    <v-icon dark>clear</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row>
                <div class="justify-left layout px-0">
                  <v-btn fab dark small color="info" @click="addMore()">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </div>
              </v-layout>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary  white--text"
              :class="{ red: !valid, green: valid }"
              @click.stop.prevent="submit()"
              >Submit</v-btn
            >
            <v-btn color="error  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
        <v-container fluid>
          <v-data-table
            :headers="headers"
            :items="getCollegeUserPrivilege"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <td class="text-xs-left">
                {{ props.item.exam_master.exam_display_name }}
              </td>
              <td class="text-xs-left">{{ props.item.degree.degree_name }}</td>
              <td class="text-xs-left">
                <span v-if="props.item.degree_group">{{
                  props.item.degree_group.degree_group_name
                }}</span>
              </td>
              <td class="text-xs-left">
                <span v-if="props.item.subject">{{
                  props.item.subject.subject_name
                }}</span>
              </td>
              <td class="text-xs-left">
                <span v-if="props.item.client_info">{{
                  props.item.client_info.REMOTE_ADDR
                }}</span>
              </td>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.item.status"
                  large
                  lazy
                  persistent
                  @save="statusSave(props.item)"
                  @cancel="statusCancel"
                  @open="statusOpen"
                  @close="statusClose"
                >
                  {{ props.item.status ? "Active" : "Inactive" }}
                  <template v-slot:input>
                    <!-- <v-text-field v-model="props.item.status" label="Edit" single-line counter></v-text-field> -->
                    <v-select
                      single-line
                      v-model="props.item.status"
                      :items="status"
                      item-text="text"
                      item-value="value"
                      label="Status"
                      data-vv-name="status"
                      :error-messages="errors.collect('status')"
                      prepend-icon="subject"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <!-- <pre>{{AssignPrivilege}}</pre> -->
        <!-- <pre>{{getExamMasterList}}</pre> -->
        <!-- <pre>{{getSchema}}</pre> -->
        <!-- <pre>{{AssignPrivilege}}</pre> -->
        <!-- <pre>{{getCollegeUserPrivilege}}</pre> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import commonGet from "@/mixin/college_common_getters_mixin";
export default {
  mixins: [commonGet],
  created() {
    this.$store.dispatch("getCollegeExamMasterList");
    this.$store.dispatch("getCollegeAllDegreeGroup");
    this.$store.dispatch("getCollegeAllSubject");

    // this.$store.commit("INITIATE_PRIVILEGE");
  },
  props: ["dialogStatus", "Data"],
  computed: {
    getSchema() {
      return this.$store.getters.getPrivilegeSchema;
    },
    getCollegeUserPrivilege() {
      return this.$store.getters.getCollegeUserPrivilege;
    },
    AssignPrivilege() {
      return this.$store.getters.getAssignPrivilege;
    }
  },
  data() {
    return {
      valid: true,
      valid_degree_code: [2, 3, 4, 5, 6, 7, 8],
      validationRules: {
        required(value) {
          return (value || "") >= !!value || `Minimum mark ${min} `;
        }
      },
      headers: [
        {
          text: "SL",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Exam", value: "exam_initiate_id" },
        { text: "Degree", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },
        { text: "Subject", value: "subject_code" },
        { text: "IP", value: "client_info.REMOTE_ADDR" },
        { text: "Status", value: "status" }
      ],
      status: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 }
      ]
    };
  },
  methods: {
    addMore() {
      this.AssignPrivilege.push({ subject_code: null });
    },
    close() {
      // this.$store.commit("UNSET_COLLEGE_USER_SCHEMA");
      // this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      //   setTimeout(() => {
      //     this.$emit("update:indexEdited", -1);
      //   }, 300);
      this.clear();
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      // this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      //   this.$store.commit("UNSET_COLLEGE_USER_SCHEMA");
      //   this.$store.commit("UNSET_DEGREE_WISE_DEGREE_GROUP");
      //   this.$store.commit("UNSET_SUBJECT");
      this.$store.commit("INITIATE_PRIVILEGE");
      this.$validator.reset();
    },
    validationForm() {},
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("createCollegeUserPrivilege", this.Data)
          .then(response => {
            this.$store.dispatch("getAllCollegeUser");
            this.$store.dispatch("getCollegeUserPrivilege", this.Data);
          })
          .catch(error => {})
          .then(always => {
            this.clear();
          });
      } else {
        console.log("error");
      }
    },
    statusSave(obj) {
      this.$store.dispatch("updateCollegeUserPrivilegeStatus", obj);
      console.log("save calling >>>>>>>>");
      // console.log(obj);
    },
    statusCancel() {
      console.log("cancel calling >>>>>>>>");
    },
    statusOpen() {
      console.log("open calling >>>>>>>>");
    },
    statusClose() {
      console.log("statusClose calling >>>>>>>>");
    }
  },
  mounted() {}
};
</script>
