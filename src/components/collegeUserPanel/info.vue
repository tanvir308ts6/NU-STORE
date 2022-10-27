<template>
  <v-container grid-list-md>
    <div>
      <collegeUserProfileEditFormModal
        :dialogStatus.sync="dialogStatus"
        :dialogData.sync="collegeUser"
      ></collegeUserProfileEditFormModal>
    </div>
    <v-layout row wrap v-if="collegeUser">
      
      <v-flex xs7 sm7 md7 layout>
        <div class="mx-4 my-2">
          <table>
            <thead>
              <tr>
                <th align="left">College Code</th>
                <th></th>
                <th>:</th>
                <th>{{ collegeUser.college_code }}</th>
              </tr>
              <tr>
                <th align="left">Name</th>
                <th></th>
                <th>:</th>
                <th>{{ collegeUser.name }}</th>
              </tr>
              <tr>
                <th align="left">User Name</th>
                <th></th>
                <th>:</th>
                <th>{{ collegeUser.username }}</th>
              </tr>
              <tr>
                <th align="left">Mobile</th>
                <th></th>
                <th>:</th>
                <th>{{ collegeUser.mobile }}</th>
              </tr>
              <tr>
                <th align="left">Email</th>
                <th></th>
                <th>:</th>
                <th>{{ collegeUser.email }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </v-flex>
      <v-flex xs3 sm3 md3 layout v-if="profile.hasOwnProperty('photo_url')">
        <v-avatar
          lass="mr-4"
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img
            :src="
              profile.photo_url
                ? getBaseUrl + '/' + profile.photo_url
                : 'https://via.placeholder.com/1000'
            "
            alt="avatar"
          />
        </v-avatar>
      </v-flex>
      <v-flex xs2 sm2 md2 mt-0 layout>
        <v-btn  small color="info" @click="openModal">
          <v-icon left dark>edit</v-icon>Edit
        </v-btn>
      </v-flex>
    </v-layout>
    <!-- <pre>{{college}}</pre> -->
    <!-- Modal -->
  </v-container>
</template>
<script>
import collegeUserProfileEditFormModal from "@/components/collegeUserPanel/collegeUserProfileEdit.vue";
export default {
  components: { collegeUserProfileEditFormModal },
  data() {
    return {
      slider: 156,
      tile: true,
      test: "test",
      dialogStatus: false
    };
  },
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    collegeUser() {
      return this.$store.getters.getAuthCollegeUser;
    },
    profile() {
      return this.$store.getters.getCollegeUserProfile;
    },
    avatarSize() {
      return `${this.slider}px`;
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
