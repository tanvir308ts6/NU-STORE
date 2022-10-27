<template>
  <div id="choosePrivilege">
    <v-container fluid v-if="userData">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.3em;"
                  class="elevation-0"
                  v-if="userData.privilege"
                  >{{ userData.privilege.length }}</v-btn
                >
              </template>
              <v-card-text class="title"
                >Select your desired subject/course</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
          <!-- <v-spacer />
          <v-btn @click="downloadPdf" color="primary" dark>
            Export As PDF
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>-->
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="userData.privilege"
        class="elevation-1"
        :search="search"
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
          <td class="justify-center layout px-0">
            <v-btn
              color="primary"
              fab
              small
              dark
              @click="setCurrentPrivilegeId(props.item)"
            >
              <v-icon>dashboard</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <!-- <pre>{{userData}}</pre> -->
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["userData"],
  data() {
    return {
      search: null,
      headers: [
        {
          text: "SL",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Exam", value: "exam_master.exam_display_name" },
        { text: "Degree", value: "degree.degree_name" },
        { text: "Degree Group", value: "degree_group.degree_group_name" },
        { text: "Subject", value: "subject.subject_name" },
        { text: "Actions", align: "center", value: "name", sortable: false }
      ]
    };
  },
  methods: {
    setCurrentPrivilegeId(obj) {
      //   console.log(obj);
      localStorage.setItem("current-privilege", JSON.stringify(obj));
      this.$store.commit("SET_COLLEGE_USER_CURRENT_PRIVILEGE", obj);
    }
  }
};
</script>
