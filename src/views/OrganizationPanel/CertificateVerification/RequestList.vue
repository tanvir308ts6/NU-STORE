<template>
  <v-container grid-list-md>
    <div>
      <CvStudent
        v-if="dialogStatus"
        :dialogStatus.sync="dialogStatus"
        :dialogData.sync="dialogData"
      ></CvStudent>
    </div>
    <div>
      <EditRequest
        v-if="editRequest"
        :editRequest.sync="editRequest"
        :editData.sync="editRequestData"
        :cvid.sync="cvid"
      ></EditRequest>
    </div>
    <div>
      <EditAt
        v-if="editAt"
        :editAt.sync="editAt"
        :editData.sync="editData"
      ></EditAt>
    </div>
    <div id="RequestList">
      <v-data-table :headers="headers" :items="getCVData" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-center">
            {{ props.item.track_no }}
          </td>
          <td class="text-xs-center" style="display: flex;width: 150px;">
            {{ props.item.created_at | dateFormat }}
          </td>
          <td class="text-xs-center">
            {{ props.item.bank_transaction_id }}
          </td>
          <td class="text-xs-center">
            <span v-if="props.item.payment_status == 1">
              {{ "Paid" }}
            </span>
            <span v-else>
              {{ "Un Paid" }}
            </span>
          </td>
          <td class="text-xs-center">
            <span v-if="props.item.payment_status == 1">
              {{ props.item.payment_date | dateFormat }}
            </span>
            <span v-else>Not paid yet</span>
          </td>
          <td class="text-xs-center">{{ props.item.remarks }}</td>
          <td>
            <p style="width: 250px;text-align: justify;"
              v-if="
                props.item.verification_status == 'pending' &&
                  props.item.payment_status == '0'
              "
            >
              Your application has been saved. Now you are Instructed to pay TK.
              "amount" as certificaiton verificaiton processig fee using 'Sonali
              Sheba' of Sonali Bank.
            </p>
            <p style="width: 250px;text-align: justify;"
              v-else-if="
                props.item.verification_status == 'pending' &&
                  props.item.payment_status == '1'
              "
            >
              Your payment of TK. 146 has been received. Now your application is
              under process for approval
            </p>
            <p style="width: 250px;text-align: justify;"
              v-else-if="
                props.item.verification_status == 'send' &&
                  props.item.send_back == '1'
              "
            >
              Your application is send back to you
            </p>
          </td>
          <!-- <td class="text-xs-center">{{ props.item.status }}</td> -->
          <td class="text-xs-center" style="display: flex;">
            <v-btn
              small
              color="success"
              @click="viewStudent(props.item.cv_students)"
            >
              View
            </v-btn>
            <v-btn
              v-if="props.item.payment_status == 0"
              small
              color="primary"
              @click="editRequestStudent(props.item.cv_students, props.item.id)"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="
                props.item.payment_status == 1 &&
                  props.item.send_back == 1 &&
                  props.item.verification_status == 'send'
              "
              small
              color="info"
              @click="editAttachment(props.item.cv_students)"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="props.item.payment_status == 1"
              small
              color="info"
              @click="payslip"
            >
              Payslip
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <!-- <pre>{{ getCVData }}</pre> -->
    </div>
  </v-container>
</template>
<script>
import CvStudent from "@/components/OrganizationPanel/CertificateVerification/viewCvStudent.vue";
import EditRequest from "@/components/OrganizationPanel/CertificateVerification/EditRequest.vue";
import EditAt from "@/components/OrganizationPanel/CertificateVerification/EditAt.vue";
export default {
  components: { CvStudent, EditAt, EditRequest },
  data() {
    return {
      dialogStatus: false,
      dialogData: null,
      verification_id: "",
      cvid: "",
      editRequest: false,
      editRequestData: null,
      editAt: false,
      editData: null,
      headers: [
        { text: "SL", align: "center", sortable: false, value: "sl" },
        {
          text: "Tracking No.",
          align: "center",
          sortable: false,
          value: "Tracking No."
        },
        {
          text: "Apply Date",
          align: "center",
          sortable: false,
          value: "Apply Date"
        },
        {
          text: "Bank TransID",
          align: "center",
          sortable: false,
          value: "Bank Trans Is"
        },
        { text: "Payment Status", value: "payment_status" },
        { text: "Payment Date", value: "payment_date" },
        { text: "Remarks", value: "remarks" },
        { text: "Instruction", value: "instruction" },
        // { text: "Status", value: "status" },
        { align: "center", text: "Action", value: "" }
      ],
      desserts: []
    };
  },
  created() {
    this.$store.dispatch("fetchCvData");
  },

  computed: {
    getCVData() {
      return this.$store.getters.getCVData;
    }
  },
  methods: {
    payslip() {
      this.$store.dispatch("generatePaySlip", {
        params: {},
        responseType: "blob"
      });
    },
    viewStudent(obj) {
      this.dialogData = obj;
      this.dialogStatus = true;
    },

    editRequestStudent(object, cvid) {
      this.cvid = cvid;
      this.editRequestData = object;
      this.editRequest = true;
    },
    editAttachment(object) {
      this.editData = object;
      this.editAt = true;
    }
  }
};
</script>
