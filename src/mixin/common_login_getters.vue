<script>
export default {
  data() {
    return {
      user_type: [
        {
          type: "1",
          name: "Admin",
        },
        {
          type: "2",
          name: "Center",
        },
        {
          type: "3",
          name: "Regional Center",
        },
        {
          type: "4",
          name: "Invigilator",
        },
        {
          type: "5",
          name: "Examiner",
        },
        ,
        {
          type: "6",
          name: "NU",
        },
        { type: "7", name: "Rescrutiner" },
        { type: "8", name: "Programmer/Sr. Programmer" },
        { type: "9", name: "ICT Director" },
        { type: "10", name: "Controller of Examination" },
        { type: "11", name: "Vice Chancellor" },
        { type: "12", name: "Pro VC" },
        { type: "13", name: "Online Applicant" },
        { type: "21", name: "Head Examiner" },
        { type: "22", name: "System Analyst/Sr. System Analyst" },
      ],
    };
  },

  computed: {
    getAuthUserID() {
      return this.$store.getters.getAuthUserID;
    },
    getAuthUserTypeID() {
      return this.$store.getters.getAuthUserTypeID;
    },
    getAuthUserType() {
      return this.$store.getters.getAuthUserType;
    },

    getAuthUser() {
      console.log("mixin getAuthUser", this.$store.getters.getAuthUser.center);
      return this.$store.getters.getAuthUser;
    },
    getAuthCenterUser() {
      let cu = this.$store.getters.getAuthUser.center;
      return cu ? cu : {};
    },
    ifAdminUserType() {
      return parseInt(this.getAuthUserType) == 1 ? true : false;
    },
    ifCenterUser() {
      if (this.getAuthUserType == 2) return true;
      else return false;
    },
    ifRescrutinerUser() {
      if (this.getAuthUserType == 7) return true;
      else return false;
    },
    ifITUser() {
      if (this.getAuthUserType == 8) return true;
      else return false;
    },
    ifSeniorAnalystUser() {
      if (this.getAuthUserType == 22) return true;
      else return false;
    },
    ifDirectorICTUser() {
      if (this.getAuthUserType == 9) return true;
      else return false;
    },
    ifControllerUser() {
      if (this.getAuthUserType == 10) return true;
      else return false;
    },
    ifVcUser() {
      if (this.getAuthUserType == 11) return true;
      else return false;
    },
    ifProvcUser() {
      if (this.getAuthUserType == 12) return true;
      else return false;
    },
    ifOnlineUser() {
      if (this.getAuthUserType == 13) return true;
      else return false;
    },
    ifRegionalUser() {
      if (this.getAuthUserType == 3) return true;
      else return false;
    },
    ifExaminerUser() {
      if (this.getAuthUserType == 5) return true;
      else return false;
    },
    ifHeadExaminerUser() {
      if (this.getAuthUserType == 21) return true;
      else return false;
    },
    ifInvigilatorUser() {
      if (this.getAuthUserType == 4) return true;
      else return false;
    },

    getAuthUserExamInitiates() {
      return this.$store.getters.getAuthUserExamInitiates;
    },
    getUser() {
      this.$store.getters.getUser;
    },
    // getAuthUserExamInitiates
  },
};
</script>
