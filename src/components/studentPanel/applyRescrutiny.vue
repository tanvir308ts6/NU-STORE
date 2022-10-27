<template>
  <div>
    <v-toolbar color="black" dark>
      <v-toolbar-title>Selected Papers</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="getSchema.result_details"
      class="elevation-1"
      v-model="selected"
      item-key="paper_code"
      select-all
      hide-actions
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-left">
          {{ `(${props.item.paper_code})` + " " + props.item.paper_name }}
        </td>
        <td class="text-xs-left">{{ props.item.paper_type }}</td>
        <td class="text-xs-left">{{ props.item.gpa }}</td>
        <td class="text-xs-left">{{ props.item.letter_grade }}</td>
        <td class="text-xs-left">
          <span>{{ props.selected ? perPaperFee : 0 }}</span>
        </td>
      </template>

      <template v-slot:footer>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">Total</td>
          <td class="text-xs-left">{{ totalPaperFee }}</td>
        </tr>
      </template>

      <template v-slot:no-data> </template>
    </v-data-table>
    <v-toolbar flat dark>
      <v-toolbar-title>Update Mobile No.</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            name="mobile"
            label="Mobile No."
            v-model="profile.mobile"
            v-validate="'required'"
            :error-messages="errors.collect('mobile')"
            data-vv-name="mobile"
            required
            prepend-icon="edit"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="justify-center layout px-0 mt-2">
          <v-btn
            v-if="selected.length > 0"
            color="primary"
            dark
            @click="resCrutinyApply()"
            >Submit
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10]
    },
    headers: [
      {
        text: "Paper Code & Name",
        align: "left",
        sortable: false,
        value: "paper_code"
      },
      {
        text: "Paper Type",
        align: "left",
        sortable: false,
        value: "paper_type"
      },
      { text: "CGPA", align: "left", sortable: false, value: "cgpa" },
      { text: "Grade", align: "left", sortable: false, value: "letter_grade" },
      { text: "Rs. Fee", align: "left", sortable: false, value: "" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRescrunityPaperList;
    },

    perPaperFee() {
      let data = this.$store.getters.getRescrunityPaperList;
      if (data.student_result) {
        return data.student_result.exam_info.exm_rescrutiny_fee[0].amount;
      }
    },

    totalPaperFee() {
      let total = 0;
      let item = this.perPaperFee;
      this.selected.forEach(function(data) {
        total += parseInt(item);
      });
      return total ? total : 0;
    },
    profile() {
      return this.$store.getters.getStudentProfile;
    }
  },
  created() {
    this.$store.dispatch("getStudentProfile");
  },

  methods: {
    resCrutinyApply() {
      if (this.selected.length > 0) {
        let self = this;
        let paperData = [];
        let stdData = this.getSchema;

        for (let i in this.selected) {
          let item = this.selected[i];
          delete item.papers;
          paperData.push(item);
        }

        const applyData = {
          // 'std_id': this.studentData.std_id,
          // 'reg_no': this.studentData.reg_no,
          mobile: self.profile.mobile,
          result_id: stdData.student_result.id,
          exam_roll: stdData.student_result.exam_roll,
          exam_code: stdData.student_result.exam_code,
          exam_year: stdData.student_result.exam_year,
          paper_code: paperData,
          payment_amount: this.perPaperFee,
          total_fee: this.totalPaperFee
        };

        this.$store
          .dispatch("submitRescrunityPaper", applyData)
          .then(function(data) {
            self.$store.dispatch("fetchRescrunityExamList");
            self.$router.push({ path: "/student/re-scrutiny" });
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchRescrunityExamList");
            self.$router.push({ path: "/student/re-scrutiny" });
          });
      }
    }
  }
};
</script>

<style scoped></style>
