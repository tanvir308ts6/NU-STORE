<template>
  <v-container fluid>
    <formDialog :dialogStatus.sync="formDialogStatus" :currentItem="currentItem"></formDialog>

    <v-expansion-panel class="mb-3" inset v-model="custP">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column wrap>
          <v-flex class="mx-3">
            <v-layout v-if="forceRerenderFlag">
              <!-- {{getLoggedInExam}} -->
              <v-flex xs5>
                <v-autocomplete
                disabled
                class="ma-2"
                v-model="searchParam.exam_code"
                :item-text="item => item.code + ' - ' + item.title"
                item-value="code"
                :items="getExamList"
                menu-props="auto"
                label="Select Exam"
                prepend-icon="subject"
                >
                <template v-slot:selection="data">
                  <v-chip
                  close
                  @input="searchParam.exam_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  color="#FAFAFA"
                  >
                  {{
                     data.item.code + " - " + data.item.title
                  }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs3>
            <v-select
            class="ma-2"
            disabled
            v-model="searchParam.year"
            :items="getYearList"
            :item-text="item => '' + item.year + ''"
            item-value="year"
            label="Year"
            ></v-select>
          </v-flex>
          <v-flex xs4>
            <v-text-field
            disabled
            class="ma-2"
            name="code"
            label="College Code"
            v-model="searchParam.college_code"
            prepend-icon="edit"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
          <v-layout row wrap align-center class="py-3">
            <v-text-field
            v-model="searchParam.reg_no"
            class="ma-2"
            name="rg_no"
            label="Registration Number"
            prepend-icon="edit"
            ></v-text-field>
            <v-autocomplete
            class="ma-2"
            hide-details
            v-model="searchParam.session_year"
            :item-text="item => item.session"
            item-value="session_year"
            :items="getSessionList"
            menu-props="auto"
            label="Session Year"
            prepend-icon="list"
            multiple
            >
            <template v-slot:selection="data">
              <v-chip
              close
              @input="removeSession(data.item)"
              :selected="data.selected"
              class="chip--select-multi"
              >{{ data.item.session }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.session"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>

          <v-autocomplete
          class="ma-2"
          v-model="searchParam.center_code"
          :item-text="
          item =>  item.center_code + ' - ' + item.center_name
          "
          item-value="center_code"
          :items="getCenterItems"
          menu-props="auto"
          label="Select Center"
          prepend-icon="list"
          >
          <template v-slot:selection="data">
            <v-chip
            close
            @input="searchParam.center_code = ''"
            :selected="data.selected"
            class="chip--select-multi"
            >
            {{
              data.item.center_code +
              " - " +
              data.item.center_name
            }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title
              v-html="
              data.item.center_code +
              ' - ' +
              data.item.center_name
              "
              ></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>

      <v-autocomplete
      class="ma-2"
      v-model="searchParam.paper_code"
      :items="getPaperList"
      :item-text="item => item.code + ' - ' + item.title"
      item-value="code"
      label="Select paper"
      persistent-hint
      prepend-icon="library_books"
      multiple
      >
      <template v-slot:selection="data">
        <v-chip
        close
        @input="removePaper(data.item)"
        :selected="data.selected"
        class="chip--select-multi"
        >{{  data.item.code + " - " + data.item.title }}</v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    <v-autocomplete
    class="ma-2"
    v-model="searchParam.subject_code"
    :items="getSubjectList"
    :item-text="item => item.code + ' - ' + item.title"
    item-value="code"
    label="Select Subject"
    persistent-hint
    prepend-icon="library_books"
    multiple
    >
    <template v-slot:selection="data">
      <v-chip
      close
      @input="removeSubject(data.item)"
      :selected="data.selected"
      class="chip--select-multi"
      >{{ data.item.code + " - " + data.item.title }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
  <v-autocomplete
  class="ma-2"
  v-model="searchParam.degree_code"
  :item-text="item => item.code + ' - ' + item.title"
  item-value="code"
  :items="getDegreeList"
  menu-props="auto"
  label="Select Degree"
  prepend-icon="list_alt"
  >
  <template v-slot:selection="data">
    <v-chip
    close
    @input="searchParam.degree_code = ''"
    :selected="data.selected"
    class="chip--select-multi"
    >{{ data.item.code + " - " + data.item.title }}</v-chip>
  </template>
  <template v-slot:item="data">
    <template v-if="typeof data.item !== 'object'">
      <v-list-tile-content v-text="data.item"></v-list-tile-content>
    </template>
    <template v-else>
      <v-list-tile-content>
        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
      </v-list-tile-content>
    </template>
  </template>
</v-autocomplete>
<v-autocomplete
class="ma-2"
v-model="searchParam.degree_group_code"
:items="getDegreeGroupList"
color="primary"
label="Select Degree Group"
:item-text="
item =>
'(' +
item.degree_group_code +
') ' +
item.degree_group_name
"
item-value="degree_group_code"
prepend-icon="list_alt"
>
<template v-slot:selection="data">
  <v-chip
  close
  @input="searchParam.degree_group_code = ''"
  :selected="data.selected"
  class="chip--select-multi"
  >
  {{
    "(" +
    data.item.degree_group_code +
    ") " +
    data.item.degree_group_name
  }}
</v-chip>
</template>
<template v-slot:item="data">
  <template v-if="typeof data.item !== 'object'">
    <v-list-tile-content v-text="data.item"></v-list-tile-content>
  </template>
  <template v-else>
    <v-list-tile-content>
      <v-list-tile-title
      v-html="
      '(' +
      data.item.degree_group_code +
      ') ' +
      data.item.degree_group_name
      "
      ></v-list-tile-title>
    </v-list-tile-content>
  </template>
</template>
</v-autocomplete>
<v-checkbox
v-model="searchParam.missmatch"
label="MissMatch Data"
class="mr-2 ml-3"
></v-checkbox>
</v-layout>
</v-card>
<v-flex xs12 sm12 md12 class="my-3">
  <v-layout justify-center row fill-height align-center>
    <v-btn outline round large @click="searchAdmitCardList">
      <v-icon left dark>search</v-icon>Search
    </v-btn>
  </v-layout>
</v-flex>
</v-flex>
</v-layout>
</v-expansion-panel-content>
</v-expansion-panel>

<v-container fluid>
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
            style="margin-top: -1.5em;"
            class="elevation-0"
            v-if="pagination.totalItems"
            >{{ pagination.totalItems }}</v-btn>
          </template>
          <v-card-text class="title">Details</v-card-text>
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
      <v-btn @click="searchAdmitCardList()" class="ml-3" fab small flat dark color="primary">
        <v-icon dark large>search</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
  <v-data-table
  :loading="loading"
  :headers="headers"
  :items="getAdmitCardList"
  class="elevation-1"
  :total-items="pagination.totalItems"
  :pagination.sync="pagination"
  :rows-per-page-items="pagination.rowsPerPageItems"
  >
  <template v-slot:items="props">
    <tr
    v-if="checkDataInItem(props.item)"
    :style="getStyle(props.item.exam_roll,props.item.center_code)"
    >
    <td>{{ props.index + 1 }}</td>
    <td class="text-xs">{{ props.item.examinee_name }}</td>
    <td class="text-xs">{{ props.item.reg_no }}</td>
    <td class="text-xs">
      <span v-if="props.item.exam_code">({{ props.item.exam_code }})</span>
      {{ props.item.exam_name }}
    </td>
    <td class="text-xs">{{ props.item.session_year }}</td>
    <td class="text-xs">
      <span v-if="props.item.college_code">({{ props.item.college_code }})</span>
      {{ props.item.college_name }}
    </td>
    <td class="text-xs">
      <span v-if="props.item.college_code">({{ props.item.center_code }})</span>
      {{ props.item.center_name }}
    </td>
    <td class="text-xs">
      <span v-if="props.item.subject_code">({{ props.item.subject_code }})</span>
      {{ props.item.subject_name }}
    </td>
    <td class="text-xs">
      ({{ props.item.degree_group_code }})
      {{ props.item.degree_group_name }}
    </td>
    <td class="text-xs">({{ props.item.degree_code }}) {{ props.item.degree_name }}</td>

    <td class="justify-center text-xs-center">
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" v-on="on" @click="downloadAdmit(props.item)">Certificate</v-btn>
        </template>
        <span>Download</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" v-on="on" @click="downloadAdmit(props.item)">Transcript</v-btn>
        </template>
        <span>Download</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" v-on="on" @click="downloadAdmit(props.item)">Marksheet</v-btn>
        </template>
        <span>Download</span>
      </v-tooltip>
    </td>

  </td>
</tr>
</template>
</v-data-table>
</v-container>


</v-container>
</template>
<script>
import formDialog from "@/components/admitCard/admitDetail.vue";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import commonGet from "@/mixin/common_getters_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  components: {
    formDialog
  },
  data() {
    return {
      forceRerenderFlag: true,
      custP: -1,
      checkbox1: false,
      formDialogStatus: false,
      dialog: false,
      loading: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }]
      },
      search: "",
      searchParam: {
        full: true,
        admitcard: true,
        final: true
      },
      headers: [
      { text: "SL.", sortable: false, value: "id" },
      { text: "Examinee Name", value: "examinee_name", sortable: false },
      { text: "Registration No.", value: "reg_no", sortable: false },
      { text: "Exam", value: "exam_name", sortable: false },
      { text: "Session ", value: "session", sortable: false },
      { text: "College", value: "college_code", sortable: false },
      { text: "Center", value: "center_name", sortable: false },
      { text: "Subject", value: "subject_name", sortable: false },
      { text: "Degree", value: "degree_code", sortable: false },
      { text: "Degree Group", value: "degree_group_code", sortable: false },
      //{ text: " View", value: "admit_card", sortable: false },
      {
        text: " Download",
        sortable: false,
        align: "center",
        value: "id",
        sortable: false
      }
      ]
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    //center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    //degree group
    this.$store.dispatch("fetchDegreeGroupList");
    //session
    this.$store.dispatch("fetchAllSessionData");
  },
  computed: {
    //all data
    getAdmitCardList() {
      return this.$store.getters.getAdmitCardList;
    },
    // center
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },

    getAdmitCardCurrentDetailItem() {
      return this.$store.getters.getAdmitCardCurrentDetailItem;
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAdmitCardList() {
      this.loading = true;
      this.setLimit();
      this.$store
      .dispatch("searchAdmitCardListData", this.searchParam)
      .then(data => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
      });
    },
    downloadItem(url) {
      this.$store.dispatch("downloadAdmitCard", url).then(() => {
        console.log("success");
      });
    },
    dialogOpen(item) {
      this.currentItem = item;
      this.formDialogStatus = true;
    },
    removePaper(item) {
      console.log("session item", item);
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },

    removeSession(item) {
      console.log("session item", item);
      const index = this.searchParam.session_year.indexOf(item.session);
      console.log("session in", index);
      if (index >= 0) this.searchParam.session_year.splice(index, 1);
    },
    removeSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "removesubject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },

    close() {
      this.$emit("update:dialogStatus", false);
      this.searchParam = {
        subject_code: "",
        paper_code: "",
        college_code: "",
        center_code: ""
      };
    },
    checkDataInItem(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
      ? false
      : true;
    },
    getStyle(roll, center) {
      if (roll === null || center === null) {
        return "background-color: #F8BBD0; ";
      }
    }
  },
  watch: {
    getLoggedInExam(val) {
      console.log("-->", val);
      this.searchParam.exam_code = val.code;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getLoggedInYear(val) {
      this.searchParam.year = val.year;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getAdmitCardCurrentDetailItem(val) {
      this.$store.commit("UNSET_ADMIT_CARD_BY_COL_DETAILS");
      this.pagination.totalItems = 0;
      this.searchParam.exam_code = val.exam_code;
      this.searchParam.year = val.year;
      this.searchParam.college_code = val.college_code;
      //this.searchParam.center_code = val.center_code;
      this.searchParam.subject_code = val.subject_code;
      if (val.paper_code != undefined) {
        this.searchParam.paper_code = [val.paper_code];
      }
      this.searchParam.exam_initiate_id = val.exam_initiate_id;
      this.searchAdmitCardList();
    },
    pagination() {
      let obj = this.getAdmitCardCurrentDetailItem;
      if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
        this.searchAdmitCardList();
      }
    }
  }
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
