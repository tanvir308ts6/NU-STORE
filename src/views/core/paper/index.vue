<template>
  <v-container fluid>
    <div>
      <paperDetails
        :dialogStatus.sync="detailsDialog"
        :detailData="detailData"
      ></paperDetails>
      <v-container fluid>
        <v-layout row>
          <v-expansion-panel focusable>
            <v-expansion-panel-content class="mycustomExpansionPanel">
              <template v-slot:actions>
                <v-icon large color="primary">$vuetify.icons.expand</v-icon>
              </template>
              <template v-slot:header>
                <div>
                  <v-icon color="primary">search</v-icon>
                  <span class="pl-2 subheading">Custom Search Panel</span>
                </div>
              </template>
              <v-layout row wrap align-center>
                <v-flex>
                  <v-card class="px-3">
                    <v-layout row wrap align-center class="py-3">
                      <v-select
                        name="degree_group_code"
                        label="Degree Group"
                        v-model="searchParam.degree_group_code"
                        :items="getAllDegreeGroup"
                        :item-text="
                          item =>
                            item.degree_group_code +
                            '-' +
                            item.degree_group_name
                        "
                        item-value="degree_group_code"
                        v-validate="'required'"
                        data-vv-name="degree_group_code"
                        prepend-icon="edit"
                        @change="getSubjectData"
                        clearable
                      ></v-select>
                      <v-select
                        v-if="searchParam.degree_group_code"
                        name="subject_code"
                        label="Subject"
                        v-model="searchParam.subject_code"
                        :items="getSubject"
                        :item-text="
                          item => item.subject_code + '-' + item.subject_name
                        "
                        item-value="subject_code"
                        v-validate="'required'"
                        data-vv-name="subject_code"
                        required
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-text-field
                        class="ma-2"
                        name="paper_code"
                        label="Paper Code"
                        v-model="searchParam.paper_code"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>

                      <v-select
                        name="paper_type"
                        label="Paper Type"
                        v-model="searchParam.paper_type"
                        :items="getAllPaperType"
                        item-text="paper_type"
                        item-value="id"
                        v-validate="'required'"
                        data-vv-name="paper_type"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-select
                        name="paper_type_info_id"
                        label="SIF Type"
                        v-model="searchParam.paper_type_info_id"
                        :items="getAllPaperTypeInfo"
                        item-text="name"
                        item-value="id"
                        v-validate="'required'"
                        data-vv-name="paper_type_info_id"
                        prepend-icon="edit"
                        clearable
                      ></v-select>

                      <v-flex xs12 sm12 md12 style="margin-top: 40px">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="getDataFromApi">
                            Search
                          </v-btn>
                          <v-btn color="error  white--text" large @click="reset"
                            >Reset</v-btn
                          >
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
        <br />
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedData="editedItem"
            :indexEdited.sync="editedIndex"
          ></formDialog>
          <br />
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.3em"
                    class="elevation-0"
                    v-if="getSchema.length > 0"
                    >{{ getSchema.length }}</v-btn
                  >
                </template>
                <v-card-text class="title">Paper List</v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
          style="white-space: nowrap"
        >
          <template v-slot:items="props">
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.degree">
                {{ props.item.degree.degree_code }}-
                {{ props.item.degree.degree_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.degree_group">
                {{ props.item.degree_group.degree_group_code }}-
                {{ props.item.degree_group.degree_group_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.subject">
                {{ props.item.subject.subject_code }}-
                {{ props.item.subject.subject_name }}
              </v-chip>
              <v-chip v-else>N/A</v-chip>
            </td>

            <td class="text-xs-left font-weight-bold">
              <v-chip>
                {{ `${props.item.paper_code}-` + " " + props.item.paper_name }}
              </v-chip>
            </td>
            <td class="text-xs-left">
              {{
                props.item.paper_types ? props.item.paper_types.paper_type : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.paper_type_info
                  ? props.item.paper_type_info.name
                  : "" | capitalize
              }}
            </td>
            <td class="text-xs-left">
              <span v-if="props.item.paper_type_info_id == 2"
                >{{ props.item.paper_group.id }}-{{
                  props.item.paper_group.name
                }}</span
              >
            </td>

            <td class="text-xs-left">
              {{ props.item.pair_paper_code ? props.item.pair_paper_code : "" }}
            </td>

            <td class="text-xs-left">
              {{ props.item.alt_paper_code ? props.item.alt_paper_code : "" }}
            </td>
            <td>
              <v-edit-dialog
                :return-value.sync="props.item.regulation_session_start"
                large
                lazy
                persistent
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ props.item.regulation_session_start }}
                <template v-slot:input>
                  <v-autocomplete
                    v-model="props.item.regulation_session_start"
                    :items="getAcSessionData"
                    item-text="ac_session"
                    item-value="ac_session"
                    label="Select Regulation From"
                    autofocus
                    @change="change(props.item)"
                  >
                  </v-autocomplete>
                </template>
              </v-edit-dialog>
            </td>
            <td>
              <v-edit-dialog
                :return-value.sync="props.item.regulation_session_end"
                large
                lazy
                persistent
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ props.item.regulation_session_end }}
                <template v-slot:input>
                  <v-autocomplete
                    v-model="props.item.regulation_session_end"
                    :items="getAcSessionData"
                    item-text="ac_session"
                    item-value="ac_session"
                    label="Select Regulation From"
                    autofocus
                    @change="change(props.item)"
                  >
                  </v-autocomplete>
                </template>
              </v-edit-dialog>
            </td>

            <td class="justify-center px-0">
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <!--<v-btn fab dark small color="red">
                                <v-icon dark>delete</v-icon>
                            </v-btn>-->
              <v-btn
                fab
                dark
                small
                color="warning"
                @click="showDetails(props.item)"
              >
                <v-icon dark>list</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import formDialog from "@/components/core/paper/paperForm.vue";
import paperDetails from "@/components/core/paper/paperDetails.vue";

export default {
  components: {
    formDialog, paperDetails
  },

  data() {
    return {
      dialog: false,
      formDialogStatus: false,
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      loading: true,
      searchParam: {},
      search: "",
      modifiedpaper: {},

      headers: [
        { text: "Degree Code & Name", align: "left", value: "degree_code" },
        {
          text: "Degree Group Code & Name",
          align: "left",
          value: "degree_group_code"
        },
        { text: "Subject Code & Name", align: "left", value: "subject_code" },
        { text: "Paper Code & Name", align: "left", value: "paper_name" },
        { text: "Paper Type", align: "left", value: "paper_type" },
        { text: "SIF Type", align: "left", value: "paper_type_info" },
        { text: "Paper Group", align: "left", value: "paper_group.name" },
        { text: "Pair Paper Code", align: "left", value: "pair_paper_code" },
        {
          text: "Alternative Paper Code",
          align: "left",
          value: "alt_paper_code"
        },
        {
          text: "Regulation From",
          align: "left",
          value: "regulation_session_start"
        },
        {
          text: "Regulation To",
          align: "left",
          value: "regulation_session_end"
        },
        { text: "Actions", align: "left  ", sortable: false }
      ],

      editedIndex: -1,
      editedItem: this.unSetEditedData(),
      detailsDialog: false,
      detailData: {}
    };
  },

  computed: {
    getAcSessionData() {
      return this.$store.getters.getAcSessionData;
    },
    getSchema() {
      return this.$store.getters.getPaperData;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getAllDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getAllPaperType(state) {
      return this.$store.getters.getAllPaperType;
    },
    getAllPaperTypeInfo(state) {
      return this.$store.getters.getAllPaperTypeInfo;
    },

    getSubject() {
      return this.$store.getters.getAllSubject;
    }
  },

  created() {
    //this.$store.dispatch("fetchPaperList");
    this.$store.dispatch("fetchSessionData");
  },

  methods: {
    searchCourse() {
      // this.loading = true;
      //this.setLimit();
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.$store.dispatch("fetchPaperList", this.searchParam).then(() => {
        // this.loading = false;
      });
    },
    reset() {
      this.searchParam = {};
    },
    getSubjectData(degree_group_code) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: { degree_group_code: degree_group_code }
      });
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        paper_code: "",
        paper_name: "",
        paper_type: "",
        degree_code: "",
        degree_group_code: "",
        subject_code: "",
        exam_code: "",
        paper_type_info_id: "",
        paper_group_id: "",
        credit: "",
        full_marks: "",
        theory_full_marks: "",
        theory_pass_marks: "",
        non_theory_full_marks: "",
        non_theory_pass_marks: "",
        incourse_marks: "",
        minimum_incourse_marks: "",
        practical_full_marks: "",
        practical_pass_marks: "",
        regulation_session_start: "",
        regulation_session_end: "",
        status: ""
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },

    newItem() {
      this.$store.dispatch("fetchAllDegreeData", {
        params: { degree_code: this.getLoggedInDegree.code }
      });
      this.unSetEditedData();
      this.dialogOpen();
    },

    editItem(item) {
      //this.$store.dispatch("fetchAllDegreeGroupData");
      this.$store.dispatch("fetchAllDegreeData", {
        params: { degree_code: this.getLoggedInDegree.code }
      });
      this.$store.dispatch("fetchAllExamData");
      this.$store.dispatch("getPaperGroup", {
        exam_code: item.exam_code,
        subject_code: item.subject_code
      });
      // console.log("edit core paper", item);
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    },

    showDetails(item) {
      this.detailData = item;
      this.detailsDialog = true;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.exam_code = this.getLoggedInExam.code;
    },

    getDataFromApi() {
      console.log("getDataFromApi called");
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("fetchPaperList", this.searchParam).then(data => {
        this.loading = false;
        this.pagination.totalItems = data.meta.total;
      });
    },
    save() {
      if (this.modifiedpaper.id) {
        this.$store.dispatch("CorePaperRegulationUpdate", this.modifiedpaper);
      }
    },
    change(core_paper) {
      // this.modifiedpaper = {
      //   id: core_paper.id,
      //   paper_code: core_paper.paper_code,
      //   regulation_session_start: core_paper.regulation_session_start,
      //   regulation_session_end: core_paper.regulation_session_start,
      // };
      // this.modifiedpaper=core_paper.slice('id', 'paper_code','regulation_session_start','regulation_session_end')
      this.modifiedpaper = (({
        id,
        paper_code,
        regulation_session_start,
        regulation_session_end
      }) => ({
        id,
        paper_code,
        regulation_session_start,
        regulation_session_end
      }))(core_paper);
      console.log("Dialog change", core_paper);
    },
    cancel(e) {
      console.log("Dialog cancel", e);
    },
    open(e) {
      this.modifiedpaper = {};
      console.log("Dialog open", e);
    },
    close(e) {
      console.log("Dialog closed", e);
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  mounted() {
    this.$store.dispatch("fetchExamWiseDegreeGroup", this.getLoggedInExam.code);
    this.$store.dispatch("fetchPaperTypeInfo");
    this.$store.dispatch("fetchPaperType");
  }
};
</script>

<style scoped></style>
