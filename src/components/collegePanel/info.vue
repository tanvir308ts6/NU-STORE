<template>
  <v-container grid-list-md>
    <div>
      <collegeProfileEditFormModal
              :dialogStatus.sync="dialogStatus"
              :dialogData.sync="college"
      ></collegeProfileEditFormModal>
    </div>
    <v-layout row wrap v-if="college">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4 my-2">
          <table>
            <thead>
              <tr>
                <th align="left">EIIN Code</th>
                <th></th>
                <th>:</th>
                <th>{{ college.college_eiin }}</th>
              </tr>
              <tr>
                <th align="left">Web Url</th>
                <th></th>
                <th>:</th>
                <th>{{ college.web_url }}</th>
              </tr>
              <tr>
                <th align="left">Email</th>
                <th></th>
                <th>:</th>
                <th>{{ college.email }}</th>
              </tr>
              <tr>
                <th align="left">Mobile</th>
                <th></th>
                <th>:</th>
                <th>{{ college.mobile }}</th>
              </tr>
              <tr>
                <th align="left">Phone</th>
                <th></th>
                <th>:</th>
                <th>{{ college.phone }}</th>
              </tr>
              <tr>
                <th align="left">Fax</th>
                <th></th>
                <th>:</th>
                <th>{{ college.fax }}</th>
              </tr>
            </thead>
          </table>
        </div>

      </v-flex>
      <v-btn small color="info" @click="openModal">
        <v-icon left dark>edit</v-icon>Edit
      </v-btn>
    </v-layout>
    <!-- <pre>{{college}}</pre> -->
    <!-- Modal -->
  </v-container>
</template>
<script>

  import collegeProfileEditFormModal from "@/components/collegePanel/collegeProfileEditForm.vue";
export default {
  components: { collegeProfileEditFormModal },
  data(){
    return {
      dialogStatus: false
    }
  },
  computed: {
    college() {
      return this.$store.getters.getAuthCollege;
    }
  },
  methods: {
    openModal() {
      this.dialogStatus = true;
      console.log("openMudal call>>>");
    }
  }
};
</script>
