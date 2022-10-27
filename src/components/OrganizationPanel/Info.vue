<template>
<div>
    <div>
        <organizationProfileEdit :dialogStatus.sync="dialogStatus" :dialogData.sync="user"></organizationProfileEdit>
    </div>
    <v-layout row wrap v-if="user">
        <v-flex xs9 sm9 md9 layout>
            <div class="mx-4">
                <span class="headline">{{ `${user.name}` }}</span>
                <div v-if="user">
                    <span v-if="user.email">
                        <strong>Email :</strong>
                        {{ user.email }}
                    </span>
                </div>
                <div v-if="user.mobile">
                    <span v-if="user.mobile">
                        <strong>Mobile No. :</strong>
                        {{ user.mobile }}
                    </span>
                </div>
            </div>
        </v-flex>
        <v-btn small color="info" @click="openModal">
            <v-icon left dark>edit</v-icon>Edit
        </v-btn>
    </v-layout>
    <!-- <pre>{{user}}</pre> -->
</div>
</template>

<script>
import organizationProfileEdit from "@/components/OrganizationPanel/OrganizationProfileEdit.vue";

export default {
    components: {
        organizationProfileEdit
    },
    data() {
        return {
            dialogStatus: false
        }
    },
    computed: {
        user() {
            return this.$store.getters.organization;
        }
    },
    methods: {
        openModal() {
            this.dialogStatus = true;
            console.log("openMudal call>>>");
        }
    }
};
</script>
