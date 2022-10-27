<template>
  <v-container fluid class="mt-3 mr-3 ml-3">
    <v-flex xs12>
      <v-autocomplete
        v-if="!ifInvigilatorUser"
        class="ma-2"
        v-model="searchParam.invigilator_id"
        item-text="name"
        item-value="id"
        :items="getInvigilatorList"
        menu-props="auto"
        label="Select Invigilator"
        hide-details
        prepend-inner-icon="face"
        outline
        @change="onInvSelect"
      >
        <template v-slot:selection="data">
          <v-chip :selected="data.selected" class="chip--select-multi">{{
            data.item.name
          }}</v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-card class="mt-5 mr-5 ml-5">
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="getInvigilatorSchema"
        :indexEdited.sync="editedIndex"
        :profileMode="profileMode"
      ></formDialog>
    </v-card>
    <!-- <pre>  {{getAuthUser}} </pre> -->
  </v-container>
</template>
<script>
import formDialog from "@/components/invigilator/invigilatorForm.vue";
import commonLoginGetters from "../../mixin/common_login_getters";
import commonGetters from "../../mixin/common_getters_mixin";
export default {
  mixins: [commonLoginGetters, commonGetters],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 25
      },
      profileMode: true,
      formDialogStatus: true,
      editedIndex: 1,
      editedItem: {},
      searchParam: {}
    };
  },
  created() {
    if (!this.$store.getters.getInvigilatorItem.length) {
      this.$store.dispatch("callInvigilatorData");
    }
    if (this.ifInvigilatorUser) {
      this.searchParam.invigilator_id = this.getAuthUser.invigilator.id;
      this.getInvProfiledata();
    }

    this.$store.commit("UNSET_FORMNOTIFY");
    // this.formDialogStatus = true;
    console.log("center profile data fetch called");
  },
  computed: {
    getInvigilatorSchema() {
      return this.$store.getters.getInvigilatorSchema;
    }
  },
  methods: {
    onInvSelect() {
      console.log("ok");
      this.getInvProfiledata();
    },
    getInvProfiledata() {
      console.log(this.searchParam);
      this.$store.dispatch("fetchInvigilatorProfileData", this.searchParam);
    }
    // dialogOpen() {
    //   this.formDialogStatus = true;
    // },
    // newItem() {
    //   this.unSetEditedData();
    //   this.dialogOpen();
    // }
  }
};
</script>
