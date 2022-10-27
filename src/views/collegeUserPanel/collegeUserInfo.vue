<template>
  <div id="CollegeUserInfo">
    <v-layout row wrap v-if="profile">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4">
          <span class="headline">{{
            `${profile.name} (College Code : ${profile.college_code})`
          }}</span>
          <div v-if="currentPrivilege">
            <span v-if="currentPrivilege.exam_master">
              <strong>Exam :</strong>
              {{ currentPrivilege.exam_master.exam_display_name }}
            </span>
            <span v-if="currentPrivilege.degree">
              <strong>, Degree :</strong>
              {{ currentPrivilege.degree.degree_display_name }}
            </span>
            <span v-if="currentPrivilege.degree_group">
              <strong>, Degree Group :</strong>
              {{ currentPrivilege.degree_group.degree_group_display_name }}
            </span>
            <span v-if="currentPrivilege.subject">
              <strong>, Subject :</strong>
              {{ currentPrivilege.subject.subject_name }}
            </span>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["currentPrivilege"],
  computed: {
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
