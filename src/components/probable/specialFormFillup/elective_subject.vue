<template>
  <div>
    <div
      v-for="(elective_subject,
      index) in getAdminFormFillUpSubject.elective_subject"
      :key="index"
    >
      <slot
        v-if="
          paper_group_set == null ||
            paper_group_set ===
              elective_subject[0].core_paper.paper_group.paper_group_set
        "
      >
        <v-toolbar flat dark>
          <v-toolbar-title>
            Elective Subject
            <small v-if="elective_subject[0].core_paper.paper_group.show_name"
              >(Group {{ index }})</small
            >
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <span
            >select any
            {{ elective_subject[0].core_paper.paper_group.number_of_paper }} of
            {{ elective_subject.length }}</span
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="elective_subject"
          item-key="paper_code"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:headers="props">
            <tr>
              <th></th>
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
              @click="props.selected = !props.selected"
              v-if="
                !props.item.prev_grade &&
                  props.item.core_paper.paper_type_info.name == 'elective' &&
                  alt_paper_code.indexOf(props.item.paper_code) == -1 &&
                  (!group_wise_no_of_paper[index] ||
                    group_wise_no_of_paper[index].length <
                      props.item.core_paper.paper_group.number_of_paper ||
                    Object.values(group_wise_no_of_paper[index]).indexOf(
                      props.item.paper_code
                    ) != -1)
              "
            >
              <td>
                <v-checkbox
                  :input-value="props.selected"
                  primary
                  hide-details
                  @click="test = 1"
                ></v-checkbox>
              </td>
              <td>{{ props.item.core_paper.paper_name }}</td>
              <td class="text-xs-center">
                {{ props.item.core_paper.paper_code }}
              </td>
              <td class="text-xs-center">
                {{ props.item.core_paper.paper_types.paper_type }}
              </td>
              <td class="text-xs-left my-0 py-0">
                <v-text-field
                  v-model="props.item.incourse_marks"
                  name="incourse_marks"
                  label="Incourse Mark"
                  prepend-icon="edit"
                ></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
      </slot>
    </div>
    <!-- <pre>group_wise_no_of_paper {{ group_wise_no_of_paper }}</pre> -->
    <!-- <pre>{{selected}}</pre> -->
    <!-- <pre>{{pair_paper_data}}</pre>  -->
  </div>
</template>
<script>
export default {
  computed: {
    getAdminFormFillUpSubject() {
      return this.$store.getters.getAdminFormFillUpSubject;
    }
  },
  data: () => ({
    pagination: {},
    selected: [],
    headers: [
      {
        text: "Paper Name",
        align: "left",
        value: "core_paper.paper_name",
        sortable: false
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
        text: "Incourse Mark",
        value: "incourse_mark"
      }
    ],
    paper_group_set: null,
    group_wise_no_of_paper: [],
    alt_paper_code: [],
    no_of_e_paper: null,
    selected_e_paper: null,
    selected_paper_code: [],
    pair_paper_data: {},
    hide: false
  }),
  watch: {
    selected: function(val, oldval) {
      this.selected_paper_code = [];
      this.group_wise_no_of_paper = [];
      this.alt_paper_code = [];
      const prev_subject = JSON.parse(
        localStorage.getItem("admin_form_fill_up_subject")
      );
      /*
      if (val.length) {
        // ==============select pair paper===========
        var new_paper = null;
        val.forEach(element => {
          this.paper_group_set = element.core_paper.paper_group.paper_group_set;
          let group_name = element.core_paper.paper_group.name;
          if (element.core_paper.alt_paper_code) {
            this.alt_paper_code.push(element.core_paper.alt_paper_code);
          }

          if (
            Object.keys(this.group_wise_no_of_paper).indexOf(group_name) === -1
          ) {
            this.group_wise_no_of_paper[group_name] = [element.paper_code];
          } else {
            this.group_wise_no_of_paper[group_name].push(element.paper_code);
          }

          this.selected_paper_code.push(element.paper_code);
          if (Object.values(oldval).indexOf(element) === -1) {
            new_paper = element;
          }
        });

        if (new_paper) {
          var new_pair_paper = null;

          var elective_papers = Object.assign(
            {}
            // Comment to solve paper not selected on compulsory selected array
            // prev_subject.elective_subject[new_paper.core_paper.paper_group.name]
          );
          Object.values(elective_papers).forEach(elective_paper => {
            if (
              elective_paper.paper_code == new_paper.core_paper.pair_paper_code
            ) {
              new_pair_paper = elective_paper;
            }
          });
          if (new_pair_paper) {
            var is_exist = false;
            val.forEach(element => {
              if (element.paper_code == new_pair_paper.paper_code) {
                is_exist = true;
              }
            });
            if (is_exist == false) {
              this.selected_paper_code.push(new_pair_paper.paper_code);
              this.selected.push(new_pair_paper);
            }
          }
        }
        // ==============/select pair paper===========
        // ==============unselect pair paper===========
        var remove_paper = null;
        oldval.forEach(element => {
          if (Object.values(val).indexOf(element) === -1) {
            remove_paper = element;
          }
        });
        if (remove_paper) {
          val.forEach(element => {
            if (element.paper_code == remove_paper.core_paper.pair_paper_code) {
              this.selected.splice(val.indexOf(element), 1);
            }
          });
        }
        // ==============/unselect pair paper===========
        
      } else {
        this.paper_group_set = null;
      }
      */
      // console.log('alt_paper_code',this.alt_paper_code,'group_wise_no_of_paper',this.group_wise_no_of_paper['B'])
      this.$parent.$parent.$parent.selected.elective_subject = val;
    }
  },
  created() {},
  methods: {
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index === "date") {
          if (!isDesc) {
            return compare(a.date, b.date);
          } else {
            return compare(b.date, a.date);
          }
        }
      });
      return items;
    }
  }
};
</script>
