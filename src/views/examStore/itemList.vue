<template>
<v-container>
    <v-row>
        <v-col class="md12">
            <v-card elevation="2">
                <v-card-title class="ma-0 pa-1">
                    <v-col class="md4">
                        <h1>Item List</h1>
                    </v-col>
                    <v-col style="margin-left: 75%;">
                        <spacer />
                        <template>
                            <div class="text-center">
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn class="v-btn theme--dark primary" dark v-bind="attrs" v-on="on">
                                            Primary
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            Add Items
                                            <v-col style="margin-left: 75%;">
                                                <v-btn fab class="ma-1 pa-0" small color="red white--text" @click="dialog = false">
                                                    X
                                                </v-btn>
                                            </v-col>

                                        </v-card-title>

                                        <v-card-text>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="dialog = true">
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </template>
                    </v-col>
                </v-card-title>
                <template>
                    <v-data-table :headers="headers" :items="getExamStoreItemListData" :items-per-page="5" class="elevation-1">
                        <template v-slot:items="props">
                            <tr>
                                <td>{{props.index+1}}</td>
                                <td>{{props.item.item_name}}</td>
                                <td>{{props.item.item_code}}</td>
                                <td v-if="props.item.unit_id == 2">PIC</td>
                                <td v-if="props.item.unit_id == 1">KG</td>
                                <td v-if="props.item.item_status == 1">Active</td>
                                <td v-if="props.item.item_status == 0">Inactive</td>
                                <td align="center" justify="space-around">
                                    <v-btn v-bind="attrs" v-on="on" fab class="ma-1 pa-0" small color="indigo white--text">
                                        <v-icon dark>edit</v-icon>
                                    </v-btn>
                                    <v-btn fab class="ma-1 pa-0" small color="red white--text">
                                        <v-icon dark>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </template>
            </v-card>
        </v-col>
    </v-row>

    <template>

    </template>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            headers: [{
                    text: 'SL',
                    value: ''
                },
                {
                    text: 'Item Name',
                    value: 'item_name'
                },
                {
                    text: 'Item Code',
                    value: 'item_code'
                },
                {
                    text: 'Unit in',
                    value: 'unit_id'
                },
                {
                    text: 'Item Status',
                    value: 'item_status'
                },
                {
                    text: 'Action',
                    value: ''
                },
            ],

            dialog: false,
        }
    },
    created() {
        this.fatchExamStoreItemList();
    },
    computed: {
        getExamStoreItemListData() {
            return this.$store.getters.getExamStoreItemListData ? this.$store.getters.getExamStoreItemListData : [];
        },
    },
    watch: {
        getExamStoreItemListData(cv) {
            console.log('Item List', cv)
        }
    },
    methods: {
        fatchExamStoreItemList() {
            this.$store.dispatch("fetchExamStoreItemList")
        }
    }
}
</script>

<style>

</style>
