
  <template>
  <v-row justify="center">
    <v-badge left overlap>
      <v-dialog v-model="dialogUlzangh" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            class="ma-1 pa-0"
            small
            color="indigo white--text"
            dark
            v-bind="attrs"
            v-on="on"
            @click="
              updateItem(itemid);
              dialogUlzangh = true;
            "
          >
            <v-icon dark>edit</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar>
            <v-badge left overlap>
              <v-card-text class="title"
                >Edit Item {{ statmassdata }}</v-card-text
              >
            </v-badge>
            <v-spacer />
            <v-card-actions>
              <v-btn
                fab
                class="ma-1 pa-0"
                small
                color="indigo white--text"
                @click="dialogUlzangh = false"
              >
                X
              </v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Item Name*"
                  value="item_name"
                  required
                  v-model="updateItemList.item_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Item Code*"
                  value="item_code"
                  type="number"
                  v-model="updateItemList.item_code"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="getExamStoreUnitList"
                  label="Unit In*"
                  item-text="unit_name"
                  item-value="id"
                  v-model="updateItemList.unit_id"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="itemStatusList"
                  label="Status*"
                  item-text="value"
                  item-value="id"
                  v-model="updateItemList.item_status"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo white--text"
              text
              @click="
                (dialog = true),
                  edititemlist(
                    itemid.id,
                    updateItemList.item_code,
                    updateItemList.item_name,
                    updateItemList.unit_id,
                    updateItemList.item_status
                  )
              "
            >
              UPDATE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-badge>
  </v-row>
</template>


<script>
import itemList from "./itemList.vue";
export default {
  components: {
    itemList,
  },
  props: ["itemid"],
  data() {
    return {
      updateItemList: {
        item_name: "",
        item_code: "",
        item_status: "",
        unit_id: "",
      },
      dialogUlzangh: false,
      itemStatusList: [
        {
          id: 1,
          value: "Active",
        },
        {
          id: 0,
          value: "Inactive",
        },
      ],
    };
  },
  computed: {
    getExamStoreUnitList() {
      return this.$store.getters.getExamStoreItemUnitList
        ? this.$store.getters.getExamStoreItemUnitList
        : [];
    },

    statmassdata() {
      return this.$store.getters.statmass ? this.$store.getters.statmass : [];
    },
  },
  methods: {
    //get Exam Store Item Data by ID
    updateItem(item) {
      this.updateItemList = {
        ...item,
        unit_id: Number(item.unit_id),
        item_status: Number(item.item_status),
      };
      console.log("tobola", item);
      console.log("sunsuni", item.id);
      this.$store.dispatch("fetchEditExamStoreItem", item.id);
    },

    //Put Exam Store Item Data
    edititemlist(id, item_code, item_name, unit_id, item_status) {
      console.log(id, item_code, item_name, unit_id, item_status);
      this.$store
        .dispatch("putExamStoreItem", {
          id,
          item_code: item_code,
          item_name: item_name,
          unit_id: unit_id,
          item_status: item_status,
        })
        .then(() => {
          this.$store.dispatch("fetchExamStoreItemList");
        });
      console.log("Tuntuni");
    },
  },
};
</script>

<style>
</style>