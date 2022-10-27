<template>
  <v-container grid-list-md>
    <div>
      <ProfileEditFormModal
        :dialogStatus.sync="dialogStatus"
        :dialogData.sync="authStudent"
      ></ProfileEditFormModal>
    </div>
    <v-layout row wrap v-if="authStudent">
      <v-flex xs8 sm8 md8 layout>
        <div class="mx-4 my-2">
          <h3>
            <span class="display-1">{{ authStudent.name }}</span>
          </h3>
          
          <div>ID:{{ authStudent.std_id }}</div>
          <div>REG. No:{{ authStudent.reg_no }}</div>
          <div>Roll No:{{ authStudent.admission_roll }}</div>
          <div v-if="authStudent.hasOwnProperty('student_types')">
            Student Type:{{ authStudent.student_types.student_type }}
          </div>
        </div>
      </v-flex>
      <v-flex xs4 sm4 md4 layout>
        <v-layout>
          <v-avatar
            lass="mr-4"
            :tile="tile"
            :size="avatarSize"
            color="grey lighten-4"
          >
            <img
              :src="
                authStudent.photo_url
                  ? authStudent.photo_url
                  : 'https://via.placeholder.com/1000'
              "
              alt="avatar"
            />
          </v-avatar>
        </v-layout>
        <div>
          <v-btn small color="info" @click="openMudal">
            <v-icon left dark>edit</v-icon>Edit
          </v-btn>
        </div>

        <!-- <v-switch v-model="tile" label="Tile"></v-switch> -->
      </v-flex>
      <!-- <v-flex xs1 sm1 md1 layout align-start>
        <v-btn color="primary" :right="true">
          <v-icon left dark>edit</v-icon>Edit
        </v-btn>
      </v-flex>-->
    </v-layout>
    <!-- <pre>{{authStudent}}</pre> -->
  </v-container>
</template>
<script>
import ProfileEditFormModal from "@/components/studentPanel/profileEditForm.vue";
export default {
  components: { ProfileEditFormModal },
  data() {
    return {
      slider: 156,
      tile: true,
      dialogStatus: false
    };
  },

  computed: {
    authStudent() {
      return this.$store.getters.getStudentProfile;
    },
    avatarSize() {
      return `${this.slider}px`;
    }
  },
  methods: {
    openMudal() {
      this.dialogStatus = true;
      console.log("openMudal call>>>");
    }
  }
};
</script>
