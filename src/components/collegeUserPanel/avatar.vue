<template>
  <v-container grid-list-md>
    <v-layout row wrap v-if="profile">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4 my-2">
          <h3>
            <span class="display-1">{{ profile.name }}</span>
          </h3>
          <table v-if="profile.hasOwnProperty('college_code')">
            <thead>
              <tr>
                <th align="left">College Code</th>
                <th></th>
                <th>:</th>
                <th>{{ profile.college_code }}</th>
              </tr>
              <tr>
                <th align="left">Name</th>
                <th></th>
                <th>:</th>
                <th>{{ profile.name }}</th>
              </tr>
              <tr>
                <th align="left">User Name</th>
                <th></th>
                <th>:</th>
                <th>{{ profile.username }}</th>
              </tr>
              <tr>
                <th align="left">Mobile</th>
                <th></th>
                <th>:</th>
                <th>{{ profile.mobile }}</th>
              </tr>
              <tr>
                <th align="left">Email</th>
                <th></th>
                <th>:</th>
                <th>{{ profile.email }}</th>
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
    </v-layout>
    <pre>{{ profile }}</pre>
  </v-container>
</template>
<script>
export default {
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    user() {
      return this.$store.getters.getAuthCollegeUser;
    },
    profile() {
      return this.$store.getters.getCollegeUserProfile;
    },
    avatarSize() {
      return `${this.slider}px`;
    }
  },
  data: () => ({
    slider: 156,
    tile: true,
    test: "test"
  }),
  created() {
    this.$store.dispatch("getCollegeUserProfile");
  }
};
</script>
