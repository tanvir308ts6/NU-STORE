<template>
  <div class="mt-5">
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-card-text class="title">Regional and Center mapping</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <!-- <v-text-field
          disabled
          v-model="search"
          prepend-inner-icon="search"
          label="Search"
          class="mt-0"
          hide-details
          solo
          flat
          single-line
        ></v-text-field>-->
        <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
          <v-icon dark>search</v-icon>
        </v-btn>-->
        <v-spacer />
      </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="regMapData.regional_centers"
      class="elevation-1"
      :pagination.sync="pagination"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs">
          {{ props.item.regional_center_code }} -
          {{ props.item.regional_center_name }}
        </td>
        <td>
          <v-autocomplete
            multiple
            hide-details
            outline
            class="ma-2"
            :items="getCenterList"
            v-model="props.item.centers"
            :item-text="
              item =>  item.center_code + ' - ' + item.center_name
            "
            item-value="center_code"
            label="Select Center"
            persistent-hint
            prepend-icon="library_books"
            return-object
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="
                  removeCenters(
                    data.item.center_code,
                    props.item.regional_center_code
                  )
                "
                :selected="data.selected"
                class="chip--select-multi"
              >
                {{
                data.item.center_code + " - " + data.item.center_name
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
                       data.item.center_code + ' - ' + data.item.center_name
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </td>
      </template>
    </v-data-table>
    <v-flex xs12 mt-4>
      <v-layout align-center justify-center row fill-height>
        <v-btn large round color="primary" @click="submit">
          Update Settings
          <v-icon right dark>send</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
export default {
  mixins: [commonGet],
  data() {
    return {
      pagination: {
        rowsPerPage: 25,
        rowsPerPageItems: [25],
      },
      searchParam: {},
      search: "",
      regMapData: {
        exam_code: "",
        year: "",
        exam_initiate_id: "",
        regional_centers: [],
      },
      item: {},
      headers: [
        {
          text: "ID",
          align: "left",
          value: "id",
        },
        { text: "Regional Center ", value: "center_name" },
        { text: "Centers", value: "centers" },
      ],
      limit: {},
    };
  },
  created() {
    this.limit = {
      page: 1,
      limit: -1,
    };

    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // console.log("exam code", this.searchParam);
    this.callData(this.searchParam);
  },
  computed: {
    getRegionalCenterList() {
      return this.$store.getters.getRegionalCentertItem;
    },
    getSchema() {
      return this.$store.getters.getregionalCenterMap;
    },
    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
  },

  methods: {
    checkAndUpdateRegionalList() {
      var matches = false;
      for (var i = 0; i < this.getRegionalCenterList.length; i++) {
        matches = false;

        this.regMapData.regional_centers.forEach((e) => {
          if (
            this.getRegionalCenterList[i].regional_center_code ==
            e.regional_center_code
          ) {
            matches = true;
          }
        }); // add newly created regional center for mapping center
        if (!matches) {
          let item = {
            id: this.getRegionalCenterList[i].id,
            regional_center_code: this.getRegionalCenterList[i]
              .regional_center_code,
            regional_center_name: this.getRegionalCenterList[i].center_name,
            centers: [],
          };
          this.regMapData.regional_centers.push(item);
        }
      }
    },

    callData(param) {
      var self = this;
      this.$store
        .dispatch("fetchRegionalCenterMap", param)
        .then(function (data) {
          data.regional_centers.forEach((element) => {
            let item = {
              id: element.id,
              regional_center_code: element.regional_center_code,
              regional_center_name: element.regional_center_name,
              centers: element.centers,
            };
            self.regMapData.regional_centers.push(item);
          });

          self.$store
            .dispatch("callRegionalCenterData", self.limit)
            .then(function (data) {
              self.checkAndUpdateRegionalList();
            });
        });
    },
    submit() {
      this.getSchema.regional_centers = this.regMapData.regional_centers;
      this.getSchema.exam_code = this.getLoggedInExam.code;
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.year = this.getLoggedInYear.year;
      this.item = this.getSchema;
      var self = this;
      this.$store
        .dispatch("submitRegionalCenterMap", this.item)
        .then(function (data) {
          self.$store.dispatch("fetchRegionalCenterMap", self.searchparam);
        });
    },
    removeCenters(item, regional_center_code) {
      var position = -1;
      //position = item.id;
      this.regMapData.regional_centers.forEach(function (e, index) {
        if (e.regional_center_code == regional_center_code) {
          e.centers.forEach(function (cn, position) {
            if (cn.center_code == item) {
              e.centers.splice(position, 1);
            }
          });
        }
      });
    },
  },
};
</script>
