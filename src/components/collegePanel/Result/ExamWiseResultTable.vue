<template>
  <v-container id="ExamWiseResultTable">
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
                style="margin-top: -1.3em;"
                class="elevation-0"
                v-if="data.total_student > 0"
                >{{ data.total_student }}</v-btn
              >
            </template>
            <v-card-text class="title">Exam Wise Result</v-card-text>
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
      item-key="name"
      class="elevation-1 nowrap"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-canter">{{ props.item.exam_roll }}</td>
          <td class="text-xs-canter">{{ props.item.reg_no }}</td>
          <td class="text-xs-canter">{{ props.item.ac_session }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">
            <slot v-for="(paper, pindex) in props.item.details">
              <span v-if="pindex" :key="pindex">{{
                `, ${paper.paper_code}=${paper.letter_grade}`
              }}</span>
              <span v-else :key="pindex">{{
                `${paper.paper_code}=${paper.letter_grade}`
              }}</span>
            </slot>
          </td>
          <td class="text-xs-canter">
            {{ props.item.result_type | getResultType }}
          </td>
        </tr>
      </template>
      <!-- <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>Result Details of {{props.item.name}}</v-card-text>
          <v-data-table
            :headers="pheaders"
            :items="props.item.details"
            class="elevation-1"
            :hide-actions="true"
          >
            <template v-slot:items="props">
              <td>{{ props.index+1 }}</td>
              <td class="text-xs-canter">{{ props.item.paper_code }}</td>
              <td class="text-xs-left">{{ props.item.paper.paper_name }}</td>
              <td class="text-xs-canter">{{ props.item.letter_grade }}</td>
              <td class="text-xs-right">{{ props.item.total_mark }}</td>
              <td class="text-xs-right">{{ props.item.paper.full_marks }}</td>
            </template>
          </v-data-table>
        </v-card>
      </template>-->
      <template v-slot:footer v-if="data.total_student > 0">
        <td :colspan="headers.length">
          <v-layout>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Total</span>
                  <v-chip color="primary" text-color="white">{{
                    data.total_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Promoted</span>
                  <v-chip color="primary" text-color="white">{{
                    data.promoted_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Not Promoted</span>
                  <v-chip color="primary" text-color="white">{{
                    data.not_promoted_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <!-- <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Absent</span>
                  <v-chip color="primary" text-color="white">{{
                    data.absent_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Improved</span>
                  <v-chip color="primary" text-color="white">{{
                    data.improved_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex> -->
            <v-flex>
              <v-card>
                <v-card-title class="title">
                  <span>Others</span>
                  <v-chip color="primary" text-color="white">{{
                    data.others_student
                  }}</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
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
  </v-container>
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
          value: "name"
        },
        { text: "Roll No.", value: "exam_roll" },
        { text: "Reg. No.", value: "reg_no" },
        { text: "Session", value: "ac_session" },
        { text: "Name of Students", value: "name" },
        { text: "Obtained GP/Mark", value: "reg_no" },
        { text: "Result", value: "result_type" }
      ],
      pheaders: [
        {
          text: "SL No.",
          align: "canter",
          sortable: false,
          value: "name"
        },
        { text: "Paper Code", value: "paper_code" },
        { text: "Paper Name", value: "paper.paper_name" },
        { text: "Letter Grad", value: "letter_grade" },
        { text: "Obtained GP/Mark", align: "right", value: "total_mark" },
        { text: "Total Mark", align: "right", value: "paper.full_marks" }
      ],
      pdesserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    downloadPdf() {
      this.$parent.$parent.downloadPdf();
    }
  }
};
</script>
<style scoped>
.nowrap{
  white-space: nowrap;
}
</style>
