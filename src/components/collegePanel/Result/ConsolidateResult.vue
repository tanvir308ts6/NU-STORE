<template>
  <div id="ExamWiseResultTable">
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-badge left overlap>
            <template v-slot:badge>
              <v-btn
                round
                color="primary"
                fab
                small
                style="margin-top: -1.3em"
                class="elevation-0"
                v-if="data.total_student > 0"
                >{{ data.total_student }}</v-btn
              >
            </template>
            <v-card-text class="title">Consolidate Result</v-card-text>
          </v-badge>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-text-field
          v-model="search"
          label="Search"
          class="mt-1"
          hide-details
          solo
          flat
          single-line
        ></v-text-field>
        <v-spacer />
        <!-- <v-btn @click="searchList()" class="ml-3" fab small flat dark color="primary">
            <v-icon dark large>search</v-icon>
        </v-btn>-->
        <v-btn @click="downloadPdf" color="primary" dark>
          Export As PDF
          <v-icon right dark>cloud_download</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="data.results"
      :expand="expand"
      :search="search"
      item-key="reg_no"
      class="elevation-1 nowrap"
    >
      <template v-slot:headers>
        <tr>
          <th class="text-xs-left">SL No.</th>
          <!-- <th class="text-xs-left">Roll No.</th> -->
          <th class="text-xs-left">Reg No.</th>
          <th class="text-xs-left">Session</th>
          <th class="text-xs-left">Name of Students</th>
          <slot v-for="(exam, ehlgindex) in data.exam_list">
            <th :key="'hlg'+ehlgindex" class="text-xs-left">
              {{ exam.exam_short_name }} LG
            </th>
          </slot>
          <slot v-for="(exam, ehcgpindex) in data.exam_list">
            <th
              :key="'hcgp'+ehcgpindex"
              class="text-xs-left"
              v-if="data.exam_list.length > 1"
            >
              {{ exam.exam_short_name }} CGPA
            </th>
          </slot>
          <th class="text-xs-right">CGPA</th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.index + 1 }}</td>
          <!-- <td class="text-xs-left">{{ props.item.exam_roll }}</td> -->
          <td class="text-xs-left">{{ props.item.student.reg_no }}</td>
          <td class="text-xs-left">{{ props.item.student.ac_session }}</td>
          <td class="text-xs-left">{{ props.item.student.name }}</td>
          <slot v-for="(dexam, edlgindex) in data.exam_list">
            <td :key="'dlg'+edlgindex" class="text-xs-left">
              <slot
                v-for="(combine_results, rindex) in props.item.combine_results"
              >
                <span
                  v-if="combine_results.exam_code == dexam.exam_code"
                  :key="rindex"
                >
                  <slot
                    v-for="(
                      combine_result_details, pindex
                    ) in combine_results.combine_result_details"
                  >
                    <span v-if="pindex" :key="pindex">{{
                      `, ${combine_result_details.paper_code}=${combine_result_details.letter_grade}`
                    }}</span>
                    <span v-else :key="pindex">{{
                      `${combine_result_details.paper_code}=${combine_result_details.letter_grade}`
                    }}</span>
                  </slot>
                </span>
              </slot>
            </td>
          </slot>
          <slot v-for="(dexam, edcgpindex) in data.exam_list">
            <td
              :key="edcgpindex"
              class="text-xs-right"
              v-if="data.exam_list.length > 1"
            >
              <slot
                v-for="(combine_results, rindex) in props.item.combine_results"
              >
                <span
                  v-if="combine_results.exam_code == dexam.exam_code"
                  :key="rindex"
                  >{{ combine_results.cgpa | toFixed }}</span
                >
              </slot>
            </td>
          </slot>

          <td class="text-xs-right">{{ props.item.cgpa | toFixed }}</td>
        </tr>
      </template>
      <template v-slot:footer v-if="data.total_student > 0">
        <td :colspan="headers.length">
          <v-layout>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Total =</span>
                  <v-chip color="primary" text-color="white">{{
                    data.total_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <!-- <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Absent =</span>
                  <v-chip color="primary" text-color="white">{{
                    data.absent_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Failed =</span>
                  <v-chip color="primary" text-color="white">{{
                    data.failed_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex> -->
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Withheld =</span>
                  <v-chip color="primary" text-color="white">{{
                    data.Withheld_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <!-- <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Others =</span>
                  <v-chip color="primary" text-color="white">{{
                    data.others_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex> -->
          </v-layout>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning"
          >Sorry, nothing to display here 😥</v-alert
        >
      </template>
    </v-data-table>
    <!-- <pre>{{data}}</pre> -->
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      expand: false,
      search: "",
      headers: [
        {
          text: "SL No.",
          align: "canter",
          sortable: false,
          value: "name",
        },
        { text: "Roll No.", value: "exam_roll" },
        { text: "Reg. No.", value: "student.reg_no" },
        { text: "Session", value: "student.ac_session" },
        { text: "Name of Students", value: "student.name" },
        { text: "Obtained GP/Mark", value: "reg_no" },
        { text: "CGPA", value: "cgpa" },
      ],
      pheaders: [
        {
          text: "SL No.",
          align: "canter",
          sortable: false,
          value: "name",
        },
        { text: "Paper Code", value: "paper_code" },
        { text: "Paper Name", value: "paper.paper_name" },
        { text: "Letter Grad", value: "letter_grade" },
        { text: "Obtained GP/Mark", align: "right", value: "total_mark" },
        { text: "Total Mark", align: "right", value: "paper.full_marks" },
      ],
      pdesserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    downloadPdf() {
      this.$parent.$parent.downloadPdf();
      // this.$store.dispatch("collegeProbableListDownloadPdf", {
      //   params: this.getProbableSchema,
      //   responseType: "blob",
      // });
    },
  },
};
</script>
<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>
