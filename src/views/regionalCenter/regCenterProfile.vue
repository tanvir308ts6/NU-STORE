<template>
  <v-container fluid class="mt-3 mr-3 ml-3">
    <v-card class="mt-5 mr-5 ml-5">
      <regCenterDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="getCenterSchema"
        :indexEdited.sync="editedIndex"
        :profileMode="profileMode"
      ></regCenterDialog>
    </v-card>
  </v-container>
</template>
<script>
import regCenterDialog from "@/components/regionalCenter/regionalCenterForm.vue";
export default {
  components: {
    regCenterDialog
  },
  data() {
    return {
      profileMode: true,
      formDialogStatus: true,
      editedIndex: 1,
      editedItem: {}
    };
  },
  created() {
    // this.formDialogStatus = true;
    this.$store.dispatch("fetchRegionalCenterProfileData");
  },
  computed: {
    getCenterSchema() {
      return this.$store.getters.getRegionalCenterSchema;
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
