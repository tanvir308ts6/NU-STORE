<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="mt-5">
          <v-data-table
            :headers="headers"
            :items="detailsItem"
            class="elevation-1"
            :loading="loading"
            hide-actions
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ 1 + props.index }}</td>
              <td class="text-xs-left" nowrap="true">
                {{ props.item.paper_code }} - {{ props.item.paper_name }}
              </td>
              <td class="text-xs-center">
                {{ props.item.credit }}
              </td>
              <td class="text-xs-center">{{ props.item.present_or_absent }}</td>
              <td class="text-xs-center">
                {{ props.item.theory_mark }}
              </td>
              <td class="text-xs-center">
                {{ props.item.incourse_mark }}
              </td>
              <td class="text-xs-center">{{ props.item.total_mark }}</td>
              <td class="text-xs-left">
                {{ props.item.letter_grade }}
              </td>
              <td class="text-xs-center">
                {{ getpoint(props.item.grade_ponit) }}
              </td>
              <td class="text-xs-center">
                {{ props.item.previous_marks }}
              </td>
              <td class="text-xs-center">
                {{ props.item.grace_mark }}
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
export default {
  mixins: [commonGet, common_login_getters],
  props: ["detailsItem", "detailsDialog"],
  data() {
    return {
      dialog: false,
      loading: false,
      headers: [
        {
          text: "SL.",
          value: "sl",
          width: "1%",
          sortable: false,
          align: "left",
        },
        {
          text: "Paper",
          value: "college_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Credit ",
          value: "credit",
          align: "center",
          sortable: false,
        },
        {
          text: "Present/Absent",
          value: "present_or_absent",
          align: "center",
          sortable: false,
        },
        {
          text: "Theory Mark ",
          value: "theory_mark",
          align: "center",
          sortable: false,
        },
        {
          text: "Incourse Mark ",
          value: "incourse_mark",
          align: "center",
          sortable: false,
        },
        {
          text: "Total Mark ",
          value: "total_mark",
          align: "center",
          sortable: false,
        },
        {
          text: "Letter Grade ",
          value: "letter_grade",
          align: "center",
          sortable: false,
        },
        {
          text: "Grade Ponit ",
          value: "grade_ponit",
          align: "center",
          sortable: false,
        },
        {
          text: "Previous Marks ",
          value: "previous_marks",
          align: "center",
          sortable: false,
        },
        {
          text: "Grace Mark ",
          value: "grace_mark",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    detailsDialog(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  methods: {
    getpoint(item) {
      let item2 = parseFloat(item);
      // console.log("item1", item2);
      return item2.toFixed(2);
    },
    close() {
      this.$emit("update:detailsDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
