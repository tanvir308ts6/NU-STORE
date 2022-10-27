<template>
  <v-container fluid class="mt-3 mr-3 ml-3">
    <v-card class="mt-5 mr-5 ml-5">
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="getCenterSchema"
        :indexEdited.sync="editedIndex"
        :profileMode="profileMode"
      ></formDialog>
    </v-card>
  </v-container>
</template>
<script>
import formDialog from "@/components/centerList/centerForm.vue";

export default {
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
      editedItem: {}
    };
  },
  created() {
    // this.formDialogStatus = true;
    console.log("center profile data fetch called");
    this.$store.dispatch("fetchCenterProfileData");
  },
  computed: {
    getCenterSchema() {
      return this.$store.getters.getCenterSchema;
    }
  },
  methods: {
    // getActive(active) {
    //   var status = active == 1 ? "Yes" : "No";
    //   return status;
    // },
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
