<script>
export default {
  data() {
    return {
      deleteDialogStatus: false,
      deleteActionStatus: false,
      user_type: [
        {
          type: "1",
          name: "Admin"
        },
        {
          type: "2",
          name: "Center"
        },
        {
          type: "3",
          name: "Regional Center"
        },
        {
          type: "4",
          name: "Invigilator"
        },
        {
          type: "5",
          name: "Examiner"
        },
        {
          type: "6",
          name: "NU"
        },
        {
          type: "7",
          name: "Rescrutiner"
        }
      ]
    };
  },
  methods: {
    deleteFunctionCall() {
      this.deleteActionStatus = true;
      console.log("in mixin type ", this.deleteActionStatus);
    },
    getUserType(type = "") {
      // console.log(":this.usertype- ", this.user_type);
      try {
        if (type.length < 1)
          type = JSON.parse(localStorage.getItem("user")).user_type;

        this.user_type.forEach(function(item) {
          // console.log(type + "  - ", item.type);
          if (type == item.type) type = item.name;
        });
      } catch (ex) {
        console.log("ex", ex);
      }
      console.log("TYPE Length ", type);
      return type;
    },
    getCenterId() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.center.id;
    },
    getCenterCode() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.center.center_code;
    },
    getInvigilatorId() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.invigilator.id;
    },
    getRegionalCenterId() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.regional_center.id;
      //return data.id;
    },
    getRegionalCenterCode() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.regional_center.regional_center_code;
      //return data.id;
    },
    getExaminerId() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.examiner.id;
    },
    getExaminerCode() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.examiner.examiner_code;
    },
    getUserTypeId() {
      var data = JSON.parse(localStorage.getItem("user"));
      return data.type;
    },
    getCenterUserType() {
      for (var i = 0; i < this.user_type.length; i++) {
        if ("Center" == this.user_type[i].name) {
          return this.user_type[i].type;
        }
      }
    },
    getRegCenterUserType() {
      for (var i = 0; i < this.user_type.length; i++) {
        if ("Regional Center" == this.user_type[i].name) {
          return this.user_type[i].type;
        }
      }
    },
    getInvigilatorUserType() {
      for (var i = 0; i < this.user_type.length; i++) {
        if ("Invigilator" == this.user_type[i].name) {
          console.log("..mmixin invi type get", this.user_type[i].type);
          return this.user_type[i].type;
        }
      }
    },
    getRescrutinyUserType() {
      for (var i = 0; i < this.user_type.length; i++) {
        if ("Rescrutiner" == this.user_type[i].name) {
          return this.user_type[i].type;
        }
      }
    }
    // getType(){
    //   var data = JSON.parse(localStorage.getItem("user"));
    // },
    // getTypeId() {
    //   var data = JSON.parse(localStorage.getItem("user"));
    //   return data.type;
    // }
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
    ifAdminUserType() {
      return parseInt(this.$store.getters.getAuthUserType) == 1 ? true : false;
    }
  }
};
</script>
