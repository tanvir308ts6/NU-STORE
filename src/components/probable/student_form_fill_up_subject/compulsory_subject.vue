<template>
  <div
    v-if="
      Object.keys(getStudentFormFillUpSubject.compulsory_subject).length > 0
    "
  >
    <v-toolbar flat dark>
      <v-toolbar-title>Compulsory Subject</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>
          <span v-if="$parent.$parent.confirm_by_student.length"
            >Selected Paper Code -[</span
          >
          <slot v-for="(selected, index) in $parent.$parent.confirm_by_student">
            <span :key="index" v-if="index">,{{ selected.paper_code }}</span>
            <span :key="index" v-else>{{ selected.paper_code }}</span>
          </slot>
          <span v-if="$parent.$parent.confirm_by_student.length">]</span>
        </v-btn>
      </v-toolbar-items>
      <!-- <v-divider class="mx-4" inset vertical></v-divider>
      <small v-if="$parent.$parent.confirm_by_student.length">Selected Paper Code -[</small>
      <slot v-for="(selected, index) in $parent.$parent.confirm_by_student">
        <small :key="index" v-if="index">,{{selected.paper_code}}</small>
        <small :key="index" v-else>{{selected.paper_code}}</small>
      </slot>
      <small v-if="$parent.$parent.confirm_by_student.length">]</small>
      <v-spacer></v-spacer>-->
    </v-toolbar>
    <v-data-table
      dense
      v-model="selected"
      :headers="headers"
      :items="getStudentFormFillUpSubject.compulsory_subject"
      select-all
      item-key="paper_code"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:headers="props">
        <tr>
          <!-- <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>-->
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="[
              'column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : ''
            ]"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr
          :active="props.selected"
          @click="props.selected = props.selected"
          v-if="
            (!props.item.prev_grade &&
              props.item.core_paper.paper_type_info.name == 'compulsory') ||
              //props.item.ff_type == 'F'
              props.item.ff_type == 1
          "
        >
          <!-- <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>-->
          <td class="my-0 py-0">{{ props.item.core_paper.paper_name }}</td>
          <td class="text-xs-center my-0 py-0">
            {{ props.item.core_paper.paper_code }}
          </td>
          <td class="text-xs-center my-0 py-0">
            {{ props.item.core_paper.paper_types.paper_type }}
          </td>
          <td class="text-xs-center my-0 py-0">{{ props.item.prev_grade }}</td>
          <!-- <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>-->
        </tr>
      </template>
    </v-data-table>
    <!-- <pre>{{$parent.$parent.confirm_by_student}}</pre> -->
  </div>
</template>
<script>
export default {
  computed: {
    getStudentFormFillUpSubject() {
      return this.$store.getters.getStudentFormFillUpSubject;
    },
    getLoading() {
      return this.$store.getters.getLoading;
    }
  },
  data: () => ({
    selected: [],
    pagination: {},
    headers: [
      {
        text: "Paper Name",
        align: "left",
        value: "core_paper.paper_name"
      },
      {
        text: "Paper Code",
        value: "core_paper.paper_code"
      },
      {
        text: "Paper Type",
        value: "core_paper.paper_types.paper_type"
      },
      {
        text: "prev. Grade",
        value: "prev_grade"
      }
    ]
  }),
  created() {
    this.toggleAll();
  },
  watch: {
    getLoading: function(val, oldval) {
      if (!val) {
        // this.toggleAll();
      }
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else
        this.selected = this.getStudentFormFillUpSubject.compulsory_subject.slice();
      this.$parent.$parent.selected.compulsory_subject = this.selected;
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },
  mounted() {
    // this.toggleAll();
  }
};
</script>
