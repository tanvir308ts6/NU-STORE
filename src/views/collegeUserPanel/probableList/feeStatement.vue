<template>
  <div id="FeeStatement">
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Fee Summary</v-card-text>
          </v-card>
          <!-- <v-divider class="my-2" vertical></v-divider> -->
          <!-- <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
          <v-spacer />
          <v-btn @click="downloadPdf" color="primary" dark>
            Export As PDF
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <FeeStatement :getFeeStatement="getFeeStatement" />
    </v-container>
  </div>
</template>
<script>
import FeeStatement from "@/components/collegeUserPanel/formFillUp/feeStatement";
import commonFun from "@/mixin/college_user_common_function.vue";

export default {
  mixins: [commonFun],
  components: {
    FeeStatement
  },
  computed: {
    getFeeStatement() {
      return this.$store.getters.getFeeStatement;
    }
  },
  created() {
    let current_privilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    this.$store
      .dispatch("fetchFeeStatement", {
        params: {
          current_privilege: current_privilege
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.logout(this.college_user_login_form_url);
        }
      });
  },
  methods: {
    downloadPdf() {
      let current_privilege = JSON.parse(
        localStorage.getItem("current-privilege")
      );
      this.$store.dispatch("clgUserFeeStatementPdf", {
        params: {
          current_privilege: current_privilege
        },
        responseType: "blob"
      });
    }
  }
};
</script>
