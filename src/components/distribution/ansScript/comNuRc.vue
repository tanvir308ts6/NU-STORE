<template>
  <v-container fluid>
    <!-- <pre> {{rcToNu}} </pre> -->

    <v-dialog v-model="tsDialog">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Varify and Distribute</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="tsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <tokenVerification
          :examiner="currentExaminer"
          :tvDialog="tsDialog"
          :callMethod="callMethod"
        />
      </v-card>
    </v-dialog>

    <!-- {{getCenterList}} -->
    <v-container fluid style="padding: 10px">
      <v-layout v-if="true" row class="mb-2">
        <v-flex xs11 v-if="false">
          <v-autocomplete
            :disabled="ifCenterUser"
            v-model="searchParam.center_code"
            :items="getCenterList"
            :item-text="(item) => item.center_code + ' - ' + item.center_name"
            item-value="center_code"
            label="Select Center"
            persistent-hint
            prepend-inner-icon="edit"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                disabled
                color="#FAFAFA"
                close
                @input="searchParam.center_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >
                {{ data.item.center_code + " - " + data.item.center_name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="
                      data.item.center_code + ' - ' + data.item.center_name
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <!-- {{searchParam.reg_center_code}} -->
        <v-flex xs11 v-if="true">
          <v-autocomplete
            class="mx-2"
            hide-details
            label="Select Regional Center"
            item-text="center_name"
            item-value="regional_center_code"
            v-model="searchParam.reg_center_code"
            :items="getRegCenList"
            v-validate="'required'"
            :error-messages="errors.collect('reg_center_code')"
            data-vv-name="reg_center_code"
            required
            prepend-inner-icon="edit"
            outline
          >
            <template v-slot:selection="data">
              <v-chip
                
                close
                @input="searchParam.reg_center_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
                >{{ data.item.center_name }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.center_name"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs11 v-if="true">
          <v-autocomplete
            class="mx-2"
            outline
            v-model="searchParam.subject_code"
            :items="getSubjectList"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            label="Select Subject"
            persistent-hint
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.subject_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
                >{{ data.item.code + " - " + data.item.title }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.code + ' - ' + data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs11>
          <v-autocomplete
            outline
            class="mx-2"
            v-model="searchParam.paper_code"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            :items="getPaperList"
            menu-props="auto"
            label="Select Course"
            hide-details
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="removePaper(data.item)"
                :selected="data.selected"
                class="chip--select-multi"
                >{{ data.item.code + " - " + data.item.title }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.code + ' - ' + data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs11 v-if="true">
          <v-text-field
            outline
            class="mx-2"
            hide-details
            name="code"
            label="Examiner Code"
            v-model="searchParam.examiner_code"
            prepend-inner-icon="edit"
          ></v-text-field>
        </v-flex>
        <v-flex xs11 v-if="true">
          <v-autocomplete
            class="mx-2"
            outline
            v-model="searchParam.rc_distribute_status"
            :items="[
              { code: -1, title: 'All' },
              { code: 1, title: 'Distributed' },
              { code: 0, title: 'Not Distributed' },
            ]"
            :item-text="(item) => item.title"
            item-value="code"
            label="Select Status"
            persistent-hint
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <b>{{ data.item.title }}</b>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs11 v-if="true">
          <v-autocomplete
            class="mx-2"
            outline
            v-model="searchParam.challan_no"
            :items="getChalanList"
            :item-text="(item) => item.challan_no"
            item-value="challan_no"
            label="Select Challan"
            persistent-hint
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <b>{{ data.item.challan_no }}</b>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.challan_no"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-layout align-center justify-center row fill-height>
            <v-btn
              style="margin-top: -2em"
              fab
              class="primary"
              @click="fetchAsNuToRcToExaminerData()"
            >
              <v-icon>search</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-container fluid style="padding: 0px">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text v-if="!rcToNu" class="title"
                >Ans Script Delivery ( NU to Reg )</v-card-text
              >
              <v-card-text v-if="rcToNu" class="title"
                >Ans Script Delivery To Examiner (Reg to Examiner)</v-card-text
              >
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn v-if="!rcToNu" color="primary" @click="allotmentReport()"
              >Allotment Report</v-btn
            >
            <v-btn
              v-if="!rcToNu"
              color="primary"
              @click="SummaryReportDialog = true"
              >Summary Data</v-btn
            >
            <v-btn v-if="!rcToNu" color="primary" @click="downloadListNUtoREG()"
              >Report Download</v-btn
            >
          </v-layout>
        </v-card>
        <formNotification />
        <v-data-table
          v-model="selected"
          item-key="id"
          select-all
          :loading="loading"
          :headers="getHeaders"
          :items="getAsNuToRcToExaminerData"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <tr>
              <td class="text-xs" style="padding: 0 10px" v-if="!rcToNu">
                <v-icon v-if="props.item.nu_distribute_status == 1"
                  >highlight_alt</v-icon
                >
                <div v-else>
                  <v-checkbox
                    v-if="props.item.total_packet != 0"
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </div>
              </td>
              <td class="text-xs" style="padding: 0 10px" v-else>
                <v-icon
                  v-if="
                    props.item.nu_distribute_status != 1 ||
                    props.item.rc_receive_status == 1
                  "
                  >highlight_alt</v-icon
                >
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                  v-else
                ></v-checkbox>
              </td>
              <td>{{ sl_count + props.index }}</td>
              <td class="text-xs">
                <v-chip color="transparent">
                  {{ props.item.examiner_code }} -
                  {{ props.item.examiner_name }}
                </v-chip>
              </td>
              <td class="text-xs">
                <v-chip color="transparent">
                  {{ props.item.subject_code }} -
                  {{ props.item.subject_name }}
                </v-chip>
              </td>
              <td class="text-xs">
                <v-chip color="transparent">
                  {{ props.item.paper_code }} -
                  {{ props.item.paper_name }}
                </v-chip>
              </td>
              <td
                class="text-xs"
                v-if="!rcToNu && props.item.nu_distribute_status != 1"
              >
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  class="ml-2"
                >
                  <v-flex>
                    <v-icon
                      @click="
                        () => {
                          props.item.total_packet =
                            parseInt(props.item.total_packet) - 1;
                        }
                      "
                      >remove_circle</v-icon
                    >
                  </v-flex>
                  <v-flex class="mx-1">{{ props.item.total_packet }}</v-flex>
                  <v-flex>
                    <v-icon
                      @click="
                        () => {
                          props.item.total_packet =
                            parseInt(props.item.total_packet) + 1;
                        }
                      "
                      >add_circle</v-icon
                    >
                  </v-flex>
                </v-layout>
              </td>
              <td v-else class="text-xs-center">
                {{ props.item.total_packet }}
              </td>
              <td class="text-xs-center" v-if="rcToNu">
                <div v-if="props.item.rc_receive_status == 1">
                  <div v-if="props.item.rc_distribute_status != 1">
                    <v-btn
                      :disabled="
                        props.item.allotment_remove_request_status == 1
                      "
                      color="primary"
                      @click="openRevokeBox(props.item)"
                      >Revoke</v-btn
                    >
                  </div>
                </div>
              </td>
              <td class="text-xs-center">
                <div v-if="props.item.allotment_remove_request_status != 1">
                  <div v-if="props.item.rc_receive_status == 1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-chip disabled v-on="on" color="cyan white--text">
                          <b>Recieved By RC</b>
                        </v-chip>
                      </template>
                      <span>
                        <span>
                          Date:
                          {{ getFormatedDate(props.item.rc_received_at) }}
                        </span>
                      </span>
                    </v-tooltip>
                  </div>
                  <div v-else>
                    <div v-if="props.item.nu_distribute_status == 1">
                      <v-chip disabled color="white orange--text">
                        <b>AT RC</b>
                      </v-chip>
                    </div>
                    <div v-else>
                      <v-chip disabled color="white cyan--text">
                        <b>SEND TO NU</b>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="!rcToNu">
                    <v-btn
                      small
                      color="primary"
                      class="elevation-0"
                      :disabled="parseInt(props.item.total_packet) == 0"
                      v-if="
                        parseInt(props.item.allotment_remove_request_status) ==
                        1
                      "
                      @click="oneExaminerTransferDialog(props.item)"
                      >Transfer Allotment</v-btn
                    >
                  </div>
                  <div v-else class="text-xs-center">
                    <v-chip disabled color="white cyan--text">
                      <b>Revoked</b>
                    </v-chip>
                  </div>
                </div>
              </td>
              <td class="distributeSectionCSS" v-if="rcToNu">
                <div v-if="props.item.allotment_remove_request_status != 1">
                  <div v-if="props.item.nu_distribute_status == 1">
                    <div v-if="props.item.rc_receive_status == 1">
                      <div v-if="props.item.rc_distribute_status == 1">
                        <v-chip disabled color="white blue--text">
                          <b>Distributed To Examiner</b>
                        </v-chip>
                      </div>
                      <div v-else class="text-xs-center">
                        <v-btn
                          color="amber lighten-4"
                          large
                          class="elevation-11"
                          @click="varifyExaminer(props.item)"
                          >Distribute</v-btn
                        >
                      </div>
                    </div>
                    <div v-else class="text-xs-center">
                      <v-chip disabled color="white orange--text">
                        <b>AT RC</b>
                      </v-chip>
                    </div>
                  </div>
                  <div v-else class="text-xs-center">
                    <v-chip disabled color="white cyan--text">
                      <b>SEND TO NU</b>
                    </v-chip>
                  </div>
                </div>
                <div v-else class="text-xs-center">
                  <v-chip disabled color="white cyan--text">
                    <b>Revoked</b>
                  </v-chip>
                </div>
              </td>
              <td class="text-xs-center">
                <v-tooltip bottom v-if="props.item.challan_no">
                  <template v-slot:activator="{ on }">
                    <v-chip
                      v-on="on"
                      :color="props.item.challan_date ? 'green' : 'primary'"
                      text-color="white"
                      >{{ props.item.challan_no }}</v-chip
                    >
                  </template>
                  Date:
                  {{ getFormatedDate(props.item.challan_date) }}
                </v-tooltip>
              </td>
            </tr>
          </template>
          <template v-slot:actions-prepend>
            <v-btn
              v-if="!rcToNu"
              style="margin-right: -10em"
              color="blue white--text"
              @click="postExmainerAnsScriptAllotment()"
              >save Allotment</v-btn
            >
          </template>
        </v-data-table>
      </v-container>

      <v-dialog v-model="receiverDialog" width="500" persistent>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="title">Receiver's Info</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-2">
          <div class="pb-3">
            <v-text-field
              class="pa-2"
              label="Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Title"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Inistitution Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Phone"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Email"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
          </div>
          <v-divider />
          <div class="text-xs-center py-3">
            <v-btn outline color="primary" @click="receiverDialog = false"
              >Save</v-btn
            >
          </div>
        </v-card>
      </v-dialog>

      <v-layout justify-center row fill-height align-center>
        <v-flex v-if="selected.length && rcToNu" class="mx-2">
          <v-layout justify-end row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="mt-3"
              color="primary"
              @click="downloadListNUtoREG()"
              >Download List</v-btn
            >
          </v-layout>
        </v-flex>
        <v-flex v-if="selected.length && rcToNu" class="mx-2">
          <v-layout justify-start row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="mt-3"
              color="success"
              @click="postAnsScriptRcToNuRecieve()"
              >Recieve</v-btn
            >
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider class="mb-3 mt-3" />
      <v-layout justify-center row fill-height align-center v-if="!rcToNu">
        <v-flex xs2 v-if="!rcToNu" class="mx-2">
          <v-layout justify-center row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              class="mr-2"
              color="primary"
              @click="addToChalanBox = true"
              >Add to Chalan</v-btn
            >
            <v-btn
              :disabled="selected.length == 0"
              large
              class="ml-2"
              color="primary"
              @click="removeAnsScriptChallan()"
              >Remove from Challan</v-btn
            >
          </v-layout>
          <!-- <v-layout justify-center row fill-height align-center>
            
          </v-layout>-->
        </v-flex>
      </v-layout>
      <v-divider class="mb-3" />
      <v-btn
        v-if="!rcToNu"
        @click="allotmentReport_RC_Distribute_ExaminerByHeadExaminer()"
        >Distributed: head examiner wise examiner</v-btn
      >
      <v-btn
        v-if="!rcToNu"
        @click="allotmentReport_RC_Undistribute_ExaminerByHeadExaminer()"
        >Undistributed: head examiner wise examiner</v-btn
      >
      <v-divider class="mt-3 mb-3" />
    </v-container>

    <v-dialog v-model="recieverBox" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >Add Reciever and Deliver to Regional Center</v-card-title
        >
        <div class="mt-2 ml-3 title">
          Challan No {{ currentChallanItem.challan_no }} to Deliver
        </div>
        <v-card-text>
          <v-layout column>
            <v-flex xs12 class="ma-2">
              <v-text-field
                outline
                class="mx-2"
                hide-details
                name="code"
                label="Reciever Name"
                v-model="reciever_.name"
                prepend-inner-icon="edit"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-2">
              <v-text-field
                outline
                class="mx-2"
                hide-details
                name="code"
                label="Reciever Designation"
                v-model="reciever_.designation"
                prepend-inner-icon="edit"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-2">
              <v-text-field
                outline
                class="mx-2"
                hide-details
                name="code"
                label="Reciever Phone"
                v-model="reciever_.phone"
                prepend-inner-icon="edit"
              ></v-text-field>
            </v-flex>
            <v-divider class="mt-3 mb-1" />
            <v-flex xs12 class="ma-2">
              <v-autocomplete
                class="mx-2"
                hide-details
                label="Select Regional Center"
                item-text="center_name"
                item-value="regional_center_code"
                v-model="searchParam.reg_center_code"
                :items="getRegCenList"
                v-validate="'required'"
                :error-messages="errors.collect('reg_center_code')"
                data-vv-name="reg_center_code"
                required
                prepend-inner-icon="edit"
                outline
              >
                <template v-slot:selection="data">
                  <v-chip
                    disabled
                    close
                    @input="searchParam.reg_center_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                    >{{ data.item.center_name }}</v-chip
                  >
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="data.item"
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.center_name"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <!--  -->
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-center row fill-height align-center>
            <v-btn
              large
              round
              class="ma-4"
              color="primary"
              @click="postAnsScriptNuToRc()"
              >Deliver to Regional Center</v-btn
            >
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="revokeBox" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >Provide Revoke Reason</v-card-title
        >

        <v-card-text>
          <v-layout column>
            <v-flex xs12 class="ma-2">
              <v-textarea
                outline
                v-model="allotmentRemoveReason"
                auto-grow
                label="Revoke Reason"
                name="Revoke Reason"
                rows="6"
                prepend-icon="edit"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-center row fill-height align-center>
            <v-btn
              large
              round
              class="ma-4"
              color="primary"
              @click="revokeAnsScriptAllotment()"
              >Revoke</v-btn
            >
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addToChalanBox" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >Add to Challan</v-card-title
        >
        <v-card-text>
          <v-layout column>
            <v-flex xs12 class="ma-2">
              <v-select
                outline
                prepend-inner-icon="edit"
                class="ma-2"
                v-model="selectedChallan"
                :items="getDistributedChalanList"
                :item-text="(item) => '' + item.challan_no + ''"
                item-value="challan_no"
                label="Select a Chalan"
                hide-details
              ></v-select>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-center row fill-height align-center>
            <v-btn
              large
              round
              class="ma-4"
              color="primary"
              @click="addAnsScriptChallan()"
              >Add</v-btn
            >
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider class="my-3" />
    <!-- <v-btn
      @click="allotmentReport_examinerByHeadExaminer()"
    >allotment report head examiner wise examiner</v-btn>
    <v-btn
      @click="allotmentReport_RC_ExaminerByHeadExaminer()"
    >( regional center ) head examiner wise examiner</v-btn>
    <v-btn
      @click="allotmentReport_RC_Recieve_ExaminerByHeadExaminer()"
    >( regional center received ) head examiner wise examiner</v-btn>-->

    <!-- <pre> {{getAsNuToRcToExaminerSummaryData}} </pre> -->
    <v-dialog v-model="SummaryReportDialog" width="90%">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Summary</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          outline
          dark
          color="white text-primary"
          @click="downloadAS_DeliveryNuToRegSummaryPDF"
        >
          <span color=" text-primary">Download Report</span>
        </v-btn>
        <v-toolbar-items>
          <v-icon class="mx-3" @click="getAsNuToRcToExaminerDataSummaryData"
            >refresh</v-icon
          >
          <v-btn dark flat @click="SummaryReportDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card color="white" class="pa-2">
        <v-data-table
          v-if="!rcToNu"
          :headers="summaryHeader"
          :items="getAsNuToRcToExaminerSummaryData"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <tr>
              <td
                class="text-xs"
                style="padding: 0 10px"
                v-for="(obj, index) in summaryHeader"
                :key="index"
              >
                {{ props.item[obj.value] }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog v-model="challanDetailsDialog" width="80%">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Challan Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-icon class="mx-3" @click="getAsNuToRcToExaminerDataSummaryData">refresh</v-icon> -->
          <v-btn dark flat @click="challanDetailsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card color="white" class="pa-2">
        <v-data-table
          v-if="!rcToNu"
          :headers="challanDetailsHeader"
          :items="getAnsScriptNuToRcChallanDetails"
          class="elevation-1"
          :loading="challanDetailsLoader"
          hide-actions
        >
          <template v-slot:items="props">
            <td class="text-xs">{{ props.index + 1 }}</td>
            <td class="text-xs">
              {{ props.item.examiner_code }} - {{ props.item.examiner_name }}
            </td>
            <td class="text-xs">
              {{ props.item.subject_code }} - {{ props.item.subject_name }}
            </td>
            <td class="text-xs">
              {{ props.item.paper_code }} - {{ props.item.paper_name }}
            </td>
            <td class="text-xs">{{ props.item.total_packet }}</td>
            <td class="text-xs">
              {{ props.item.reg_center_code }}-{{
                props.item.regional_center_name
              }}
            </td>
          </template>
        </v-data-table>
        <div class="title mx-3 mt-3 mb-2">
          Total Packet Summation:
          {{ getPacketSum(getAnsScriptNuToRcChallanDetails) }}
        </div>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="examinerTransferDialog" width="50%">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title @click="examinerTransferDialog = false"
          >Examiner Transfer</v-toolbar-title
        >
        <v-spacer />
        <v-btn @click="examinerTransferDialog = false">close</v-btn>
      </v-toolbar>
      <v-card color="white" class="pa-4">
        <!-- {{examinerSelectedFromTransfer}} -->
        <!-- {{examinerSelectedFromTransfer.examiner_code}} - {{examinerSelectedFromTransfer.examiner_name}} -->
        <v-flex xs12>
          <div class="title my-3">Transfer From:</div>
          <v-autocomplete
            outline
            disabled
            label="Selected Examiner"
            item-text="examiner_name"
            item-value="examiner_code"
            v-model="examinerSelectedFromTransfer"
            :items="getExaminerList"
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <b style="color: black"
                >{{ data.item.examiner_code }} -
                {{ data.item.examiner_name }}</b
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content>{{
                  data.item.examiner_name
                }}</v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    >{{ data.item.examiner_code }} -
                    {{ data.item.examiner_name }}</v-list-tile-title
                  >
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <div class="title my-3">Transfer To:</div>
          <v-autocomplete
            outline
            label="Select Examiner"
            item-text="examiner_name"
            item-value="examiner_code"
            v-model="examinerSelectedToTransfer"
            :items="getAnsExaminerList"
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="examinerSelectedToTransfer = {}"
                :selected="data.selected"
                class="chip--select-multi"
                >{{ data.item.examiner_code }} -
                {{ data.item.examiner_name }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content>{{
                  data.item.examiner_name
                }}</v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    >{{ data.item.examiner_code }} -
                    {{ data.item.examiner_name }}</v-list-tile-title
                  >
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-btn large color="primary" @click="removeAnsScriptAllotmentFromNu"
            >Transfer</v-btn
          >
        </v-flex>
      </v-card>
    </v-dialog>
    <v-divider />
    <v-card color="white" v-if="!rcToNu">
      <v-layout row>
        <v-card flat>
          <v-card-text class="title">Chalan Summary</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-spacer />
        <v-btn color="primary" @click="createNewChallan()"
          >Create New Chalan</v-btn
        >
        <v-icon class="mx-3" @click="getAnsScriptChallanNumberList()"
          >refresh</v-icon
        >
      </v-layout>
    </v-card>
    <v-card color="white" class="pa-2" v-if="!rcToNu">
      <v-data-table
        v-if="!rcToNu"
        :headers="chalanHeader"
        :items="getChalanList"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <!-- <tr> -->
          <td class="text-xs" style="padding: 0 10px">{{ props.index + 1 }}</td>
          <td class="text-xs" style="padding: 0 10px">
            {{ props.item.challan_no }}
          </td>
          <!-- <td class="text-xs" style="padding: 0 10px;">{{ props.item.challan_type }}</td> -->
          <td class="text-xs" style="padding: 0 10px">
            {{ getFormatedDate(props.item.challan_date) }}
          </td>
          <td class="text-xs" style="padding: 0 10px">
            {{ props.item.reg_center_code }} -
            {{ props.item.regional_center_name }}
          </td>
          <td class="text-xs" style="padding: 0 10px">
            {{ props.item.total_packet }}
          </td>
          <td class="text-xs" style="padding: 0 10px">
            <div v-if="props.item.nu_distribute_status == 1">
              <v-chip color="green white--text">
                <b>Distributed</b>
              </v-chip>
            </div>
            <div v-else>
              <v-chip color="red white--text">
                <b>Not Distributed</b>
              </v-chip>
            </div>
            <!-- {{ props.item.nu_distribute_status }} -->
          </td>
          <td class="text-xs-center" style="padding: 0 10px">
            <v-btn
              small
              fab
              flat
              v-if="props.item.nu_distribute_status == 1"
              color="primary"
              @click="downloadAnsChallanByCode(props.item)"
            >
              <v-icon large>insert_drive_file</v-icon>
            </v-btn>
          </td>
          <td class="text-xs" style="padding: 0 10px">
            <div>
              <v-btn
                v-if="
                  props.item.nu_distribute_status != 1 &&
                  props.item.total_packet > 0
                "
                color="primary"
                @click="openRecieverBox(props.item)"
                >Distribute</v-btn
              >
            </div>
          </td>
          <td class="text-xs" style="padding: 0 10px">
            <v-btn
              v-if="props.item.total_packet > 0"
              color="primary"
              @click="openChallanDetailsDialog(props.item)"
              >Details</v-btn
            >
          </td>
        </template>
      </v-data-table>
    </v-card>
    <!-- <pre> {{ getChalanList }} </pre> -->
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import formNotification from "@/components/utils/formNotification";
import toDayScript from "@/views/center/treasury.vue";
import moment from "moment";
import tokenVerification from "@/views/tokenVerification/tokenVerification.vue";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
    toDayScript,
    tokenVerification,
  },
  props: {
    rcToNu: Boolean,
    examiner: Boolean,
  },
  data() {
    return {
      challanDetailsLoader: false,
      selectedChallan: "",
      SummaryReportDialog: false,
      new_challan_no: "",
      currentExaminer: {},
      downParam: {},
      tsDialog: false,
      selected: [],
      reportDialog: false,
      ifRc: false,
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: 1,
      searchParam: {
        reg_center_code: "",
      },
      rcHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },

        {
          text: "Examiner",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        {
          text: "Subject",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        { text: "Course", value: "center_name", sortable: false, width: "20%" },

        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
        {
          text: "Revoke",
          value: "status",
          sortable: false,
          align: "center",
          width: "30%",
        },

        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "30%",
        },
        {
          text: "Distribute",
          value: "status",
          sortable: false,
          align: "center",
          width: "30%",
          class: "distributeSectionCSS",
        },
        {
          text: "Chalan",
          value: "challan_no",
          sortable: false,
          align: "center",
          width: "30%",
        },
      ],
      nuHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },
        {
          text: "Examiner",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        {
          text: "Subject",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        { text: "Course", value: "center_name", sortable: false, width: "20%" },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "8%",
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%",
        },
        {
          text: "Chalan",
          value: "challan_no",
          sortable: false,
          align: "center",
          width: "10%",
        },
      ],
      summaryHeader: [
        {
          text: "Reg center code",
          value: "reg_center_code",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Regional Center Name",
          value: "regional_center_name",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Subject Code",
          value: "subject_code",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Subject Name",
          value: "subject_name",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Course Code",
          value: "paper_code",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Course Name",
          value: "paper_name",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Packet",
          value: "no_of_packet",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Course Name",
          value: "paper_name",
          align: "left",
          sortable: false,
          width: "5%",
        },
      ],
      chalanHeader: [
        {
          text: "Sl",
          value: "challan_no",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan No",
          value: "challan_no",
          align: "left",
          sortable: false,
        },

        {
          text: "Challan Date",
          value: "challan_date",
          align: "left",
          sortable: false,
        },

        {
          text: "Regional Center",
          value: "regional_center_name",
          align: "left",
          sortable: false,
        },

        {
          text: "Total Packet",
          value: "total_packet",
          align: "left",
          sortable: false,
        },
        {
          text: "Status",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Download Challan",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Distribute To",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Action",
          value: "total_packet",
          align: "left",
          sortable: false,
        },
      ],
      challanDetailsHeader: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },
        {
          text: "Examiner",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        {
          text: "Subject",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        { text: "Course", value: "center_name", sortable: false, width: "20%" },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
        {
          text: "Regional Center",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
      ],
      addToChalanBox: false,
      recieverBox: false,
      reciever_: {},
      allotmentRemoveReason: "reason",
      revokeBox: false,
      currentRevokeItem: {},
      challanDetailsDialog: false,
      currentChallanItem: {},
      examinerTransferDialog: false,
      examinerSelectedToTransfer: {},
      examinerSelectedFromTransfer: {},
      challanToDistribute: {},
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.exam_year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;

    // center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }

    this.initialize();
    this.$store.dispatch("fetchRegCenterData");
    if (this.ifRegionalUser) {
      this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    }
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }

    this.$store.dispatch("fetchExaminerData");

    this.getAnsScriptChallanNumberList();
    this.getAsNuToRcToExaminerDataSummaryData();
  },
  computed: {
    getAnsScriptNuToRcChallanDetails() {
      return this.$store.getters.getAnsScriptNuToRcChallanDetails;
    },
    getChalanList() {
      return this.$store.getters.getAnsChallanNumberList;

      // return [
      //   {
      //     id: 5,
      //     challan_no: "AS-1001",
      //     challan_type: "AS",
      //     is_used: "1",
      //     created_at: "2020-08-19 18:05:53",
      //     updated_at: "2020-08-19 18:05:54",
      //   },
      // ];
    },
    getDistributedChalanList() {
      return this.getChalanList.filter((obj) => {
        return parseInt(obj.nu_distribute_status) != 1;
      });
    },
    getAsNuToRcToExaminerData() {
      return this.$store.getters.getAsNuToRcToExaminerData;
    },
    getHeaders() {
      if (this.rcToNu) {
        return this.rcHeaders;
      } else {
        return this.nuHeaders;
      }
    },

    ifShowRegSection() {
      console.log();
      let x = this.getRegFromSearchParam[0];
      if (x == undefined) return false;
      if (x == "") return false;
      else return true;
    },

    getRegFromSearchParam() {
      return [this.searchParam.reg_center_code];
    },
    getCenterWiseDistCenterList() {
      return [
        { id: 1, status: 2 },
        { id: 2, status: 2 },
        { id: 3, status: 5 },
        { id: 4, status: 2 },
        { id: 5, status: 5 },
      ];
      //   return this.$store.getters.getCenterWiseDistCenterList;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
    getAsNuToRcToExaminerSummaryData() {
      return this.$store.getters.getAsNuToRcToExaminerSummaryData;
    },
    getAnsExaminerList() {
      return this.$store.getters.getAnsExaminerList.filter((obj) => {
        return parseInt(obj.nu_distribute_status) != 1;
      });
    },
  },

  methods: {
    oneExaminerTransferDialog(item) {
      this.examinerTransferDialog = true;
      this.examinerSelectedFromTransfer = item;
      // let param = this.getParam();
      // param.challan_no = item.challan_no;
      // param.page = 1;
      // param.limit = -1;
      // this.challanDetailsLoader = true;
      // this.$store.dispatch("fetchAsNuToRcChallanDetails", param).then(() => {
      //   this.challanDetailsLoader = false;
      // });
    },
    removePaper(){
        this.searchParam.paper_code = "";
    },
    openChallanDetailsDialog(item) {
      this.challanDetailsDialog = true;
      let param = this.getParam();
      param.challan_no = item.challan_no;
      param.page = 1;
      param.limit = -1;
      this.challanDetailsLoader = true;
      this.$store.dispatch("fetchAsNuToRcChallanDetails", param).then(() => {
        this.challanDetailsLoader = false;
        // this.fetchAsNuToRcToExaminerData();
      });
    },
    addAnsScriptChallan() {
      // this.selectedChallan
      let param = [...this.selected];
      param.forEach((item) => {
        item.challan_no = this.selectedChallan;
      });
      this.$store.dispatch("addAnsScriptChallan", param).then(() => {
        this.addToChalanBox = false;
        this.getAnsScriptChallanNumberList();
        this.fetchAsNuToRcToExaminerData();
      });
    },
    removeAnsScriptChallan() {
      // item console.log("item:", item);
      this.$store.dispatch("removeAnsScriptChallan", this.selected).then(() => {
        // this.getAnsScriptChallanNumberList();
        this.getAnsScriptChallanNumberList();
        this.fetchAsNuToRcToExaminerData();
      });
    },
    createNewChallan() {
      this.$root
        .$confirm("Are you sure that you want to create new challan? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("addNewChallan", { challan_type: "AS" })
              .then(() => {
                this.getAnsScriptChallanNumberList();
              });
          }
        });
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      param.exam_year = this.getLoggedInYear.year;
      return param;
    },
    downloadChalan() {
      let param = this.getParam();
      param.reg_center_code = this.searchParam.reg_center_code;
      param.chalan = 1;
      this.$root
        .$confirm("Are you sure that you want to download? ")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (parseInt(obj.nu_distribute_status) != 1) {
                arr.push(obj.examiner_code);
              }
            });
            // console.log("testing", arr);
            param.examiner_code = arr;

            if (arr.length != 0) {
              this.$store
                .dispatch("nuAnsScriptDistNuToRegReportApi", param)
                .then((res) => {});
            } else {
              this.$store.commit("SET_SNACKBAR", {
                msg: "No data",
                color: "red",
              });
            }
            console.log("sandipon:: param.center_code = arr", param);
          }
        });
    },
    downloadListNUtoREG() {
      let arr = [];
      let paper_arr = [];
      this.selected.forEach((obj) => {
        if (parseInt(obj.nu_distribute_status) != 1) {
          arr.push(obj.examiner_code);
          paper_arr.push(obj.paper_code);
        }
      });

      // if (arr.length != 0) {
      let param = this.getParam();
      param.reg_center_code = this.searchParam.reg_center_code;

      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            param.examiner_code = arr;
            param.paper_code = paper_arr;
            this.$store
              .dispatch("nuAnsScriptDistNuToRegReportApi", param)
              .then((res) => {});
          }
        });
      // } else {
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "No data",
      //     color: "red",
      //   });
      // }
    },
    allotmentReport() {
      this.$store.dispatch("downloadAllotmentReport", this.downParam);
    },
    allotmentReport_examinerByHeadExaminer() {
      let param = this.getParam();
      this.$store.dispatch("downloadAllotmentReport", param);
    },
    allotmentReport_RC_ExaminerByHeadExaminer() {
      let param = this.getParam();
      if (this.searchParam.reg_center_code) {
        param.reg_center_code = this.searchParam.reg_center_code;
        this.$store.dispatch("downloadAllotmentReport", param);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Reg Center Selected",
          color: "red",
        });
      }
    },
    allotmentReport_RC_Recieve_ExaminerByHeadExaminer() {
      let param = this.getParam();
      if (this.searchParam.reg_center_code) {
        param.reg_center_code = this.searchParam.reg_center_code;
        param.rc_receive_status = 1;
        this.$store.dispatch("downloadAllotmentReport", param);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Reg Center Selected",
          color: "red",
        });
      }
    },
    allotmentReport_RC_Distribute_ExaminerByHeadExaminer() {
      let param = this.getParam();
      if (this.searchParam.reg_center_code) {
        param.reg_center_code = this.searchParam.reg_center_code;
        // param.rc_receive_status = 1;
        param.nu_distribute_status = 1;
        this.$store.dispatch("downloadAllotmentReport", param);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Reg Center Selected",
          color: "red",
        });
      }
    },
    allotmentReport_RC_Undistribute_ExaminerByHeadExaminer() {
      let param = this.getParam();
      if (this.searchParam.reg_center_code) {
        param.reg_center_code = this.searchParam.reg_center_code;
        // param.rc_receive_status = 1;
        // param.rc_distribute_status = 1;
        param.nu_distribute_status = 0;
        this.$store.dispatch("downloadAllotmentReport", param);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Reg Center Selected",
          color: "red",
        });
      }
    },

    downloadAS_DeliveryNuToRegSummaryPDF() {
      let param = this.getParam();
      this.$store.dispatch("downloadAnsScriptDeliveryNuToRegSummaryPDF", param);
    },

    varifyExaminer(item) {
      this.currentExaminer = item;
      this.tsDialog = true;
      
    },
    postAnsScriptRcToNuRecieve() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              try {
                if (parseInt(obj.nu_distribute_status) == 1) {
                  arr.push(obj);
                }
              } catch (er) {
                console.error("here ?/");
              }
            });
            // console.log("arr::;", arr);
            if (arr.length == 0) {
              this.$store.commit("SET_SNACKBAR", {
                msg: "No data",
                color: "red",
              });
            } else {
              this.selected = arr;

              this.$store
                .dispatch("postAnsScriptRcToNuRecieve", this.selected)
                .then((res) => {
                  console.log("in ----/// --- return then", res);
                  this.fetchAsNuToRcToExaminerData();
                  // self.fetchTreasuryData();
                });
            }
          }
        });
    },
    postAnsScriptNuToRc() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];

            this.selected.forEach((obj) => {
              if (obj.nu_distribute_status != 1) {
                obj.reg_center_code = this.searchParam.reg_center_code;
                arr.push(obj);
              }
            });
            this.selected = arr;

            let payLoad = {};
            payLoad.receiver_designation = this.reciever_.designation;
            payLoad.receiver_name = this.reciever_.name;
            payLoad.receiver_phone = this.reciever_.phone;
            payLoad.reg_center_code = this.searchParam.reg_center_code;
            payLoad.challan_no = this.currentChallanItem.challan_no;
            this.$store
              .dispatch("nuToRegAnsScriptDistApi", payLoad)
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.fetchAsNuToRcToExaminerData();
                this.getAnsScriptChallanNumberList();
                this.recieverBox = false;
              });
          }
        });
    },
    postExmainerAnsScriptAllotment() {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to save?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (obj.nu_distribute_status != 1) {
                obj.reg_center_code = this.searchParam.reg_center_code;
                arr.push(obj);
              }
            });
            this.selected = arr;
            this.$store
              .dispatch(
                "postExmainerAnsScriptAllotment",
                this.getAsNuToRcToExaminerData
              )
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.fetchAsNuToRcToExaminerData();
                // self.fetchTreasuryData();
              });
          }
        });
    },

    calculateTotalPacket(item) {
      if (item.total_script.length && item.packet_size.length) {
        if (parseInt(item.total_script) >= parseInt(item.packet_size)) {
          item.total_packet = item.total_script / item.packet_size;
        } else {
          item.total_packet = 0;

          this.$store.commit("SET_SNACKBAR", {
            msg: "'Total Script' must be greater or equal to 'Packet Size'   ",
            color: "red",
          });
        }
      } else {
        item.total_packet = 0;
        this.$store.commit("SET_SNACKBAR", {
          msg: "Empty Value",
          color: "red",
        });
      }

      if (item.total_packet == NaN) {
        item.total_packet = 0;
        this.$store.commit("SET_SNACKBAR", {
          msg: "total_packet == NaN",
          color: "red",
        });
      }
      // console.log("item.total_packet˜˜˜", item.total_packet);
      if (item.total_packet == Infinity) {
        item.total_packet = 0;
        this.$store.commit("SET_SNACKBAR", {
          msg: "total_packet == Infinity",
          color: "red",
        });
      }
      item.total_packet = Math.ceil(item.total_packet);
      return item.total_packet;
    },

    calculateTotalScript(item) {
      item.total_script = item.total_packet * item.packet_size;

      // if (item.total_script.length && item.packet_size.length) {
      //   if (parseInt(item.total_script) >= parseInt(item.packet_size)) {
      //     item.total_script = item.total_packet * item.packet_size;
      //   } else {
      //     item.total_packet = 0;

      //     this.$store.commit("SET_SNACKBAR", {
      //       msg: "'Total Script' must be greater or equal to 'Packet Size'   ",
      //       color: "red",
      //     });
      //   }
      // } else {
      //   item.total_packet = 0;
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "Empty Value",
      //     color: "red",
      //   });
      // }

      // if (item.total_packet == NaN) {
      //   item.total_packet = 0;
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "total_packet == NaN",
      //     color: "red",
      //   });
      // }
      // // console.log("item.total_packet˜˜˜", item.total_packet);
      // if (item.total_packet == Infinity) {
      //   item.total_packet = 0;
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "total_packet == Infinity",
      //     color: "red",
      //   });
      // }
      // item.total_packet = Math.ceil(item.total_packet);
      return item.total_script;
    },

    getFormatedDate(date) {
      if (date === null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    addReceiverInfo(item) {
      item.receiver = {};
      item.receiver.name = "";
      item.receiver.title = "";
      item.receiver.phone = "";
      item.receiver.email = "";
      this.receiverDialog = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    fetchAsNuToRcToExaminerData() {
      if (this.rcToNu) {
        this.searchParam.nu_distribute_status = 1;
        this.searchParam.rc_receive_status = 1;
      } else {
        // this.searchParam.nu_distribute_status = 0;
        // this.searchParam.rc_receive_status = 0;
      }

      // console.log("fetchAsNuToRcToExaminerData -1");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAsNuToRcToExaminerData", this.searchParam)
        .then((data) => {
          // console.log("fetchAsNuToRcToExaminerData -2", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
          this.selected = [];
          this.tsDialog = false;
          this.revokeBox = false;
          this.examinerTransferDialog = false;
          this.setDefaultPacketSize();
        });
    },
    fetchAsNuToRcChallanDetails() {
      // console.log("fetchAsNuToRcToExaminerData -1");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAsNuToRcToExaminerData", this.searchParam)
        .then((data) => {
          // console.log("fetchAsNuToRcToExaminerData -2", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
          this.selected = [];
          this.tsDialog = false;
          this.revokeBox = false;
          this.setDefaultPacketSize();
        });
    },
    setDefaultPacketSize() {
      this.getAsNuToRcToExaminerData.forEach((obj) => {
        // console.log("obj:", obj);
        if (!(parseInt(obj.nu_distribute_status) == 1)) {
          obj.packet_size = 50;
        }
      });
    },
    callMethod() {
      this.fetchAsNuToRcToExaminerData();
    },
    openRecieverBox(item) {
      this.recieverBox = true;
      this.currentChallanItem = item;
      // this.challanToDistribute
    },

    getAnsScriptChallanNumberList() {
      this.$store
        .dispatch("fetchAnsScriptChallanNumberList", { challan_type: "AS" })
        .then((data) => {
          // console.log(data);
        });
      // this.fetchAnsScriptChallanNumberList
    },
    downloadAnsChallanByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;

      this.$root
        .$confirm("Are you sure that you want to download? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_AS_ChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },

    // download_AS_nuAnsDistToRegHeadExaminerWiseExaminer
    downloadNuAnsDistToRegHeadExaminerWiseExaminer(item) {
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;

      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch(
                "download_AS_nuAnsDistToRegHeadExaminerWiseExaminer",
                param
              )
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },
    openRevokeBox(item) {
      this.revokeBox = true;
      this.currentRevokeItem = item;
    },
    revokeAnsScriptAllotment() {
      this.currentRevokeItem.allotment_remove_request_reason = this.allotmentRemoveReason;
      this.$root
        .$confirm("Are you sure that you want to Revoke? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("postForRemoveAnsScriptAllotment", [
                this.currentRevokeItem,
              ])
              .then((res) => {
                this.currentRevokeItem = {};
                console.log("res:", res);
                this.revokeBox = false;
                this.fetchAsNuToRcToExaminerData();
              });
          }
        });
    },

    removeAnsScriptAllotmentFromNu() {
      let param = {
        old_examiner_code: this.examinerSelectedFromTransfer.examiner_code,
        new_examiner_code: this.examinerSelectedToTransfer,
        exam_initiate_id: this.examinerSelectedFromTransfer.exam_initiate_id,
        exam_code: this.examinerSelectedFromTransfer.exam_code,
        exam_year: this.examinerSelectedFromTransfer.exam_year,
      };
      // console.log("param:", param);

      this.$root
        .$confirm("Are you sure that you want to Transfer? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("removeRemoveAnsScriptAllotmentFromNu", param)
              .then((res) => {
                this.examinerSelectedFromTransfer = {};
                this.examinerSelectedToTransfer = {};
                this.fetchAsNuToRcToExaminerData();
              });
          }
        });
    },
    //
    getAsNuToRcToExaminerDataSummaryData() {
      if (this.rcToNu) {
      } else {
        // console.log("fetchAsNuToRcToExaminerData -1");
        // this.loading = true;
        this.setLimit();
        let param = { ...this.searchParam };
        param.limit = -1;
        this.$store
          .dispatch("fetchAsNuToRcToExaminerDataSummaryData", param)
          .then((data) => {
            // console.log("fetchAsNuToRcToExaminerData -2", data);
            // this.sumloading = false;
            // this.sl_count = data.from;
            // this.pagination.totalItems = data.total;
            // this.selected = [];
            // this.tsDialog = false;
            // this.revokeBox = false;
            // this.setDefaultPacketSize();
          });
      }
    },

    getPacketSum(data) {
      let totalSum = 0;
      data.forEach((obj) => {
        totalSum += parseInt(obj.total_packet);
      });
      return totalSum;
    },
  },
  watch: {
    pagination() {
      this.fetchAsNuToRcToExaminerData();
    },
    challanDetailsDialog(val) {
      if (!val) {
        this.$store.commit("UNSET_AS_NU_RC_CHALLAN_DETAILS");
      }
    },
    examinerTransferDialog(val) {
      this.examinerSelectedFromTransfer;
      let param = {
        reg_center_code: this.examinerSelectedFromTransfer.reg_center_code,
        exam_initiate_id: this.examinerSelectedFromTransfer.exam_initiate_id,
        exam_code: this.examinerSelectedFromTransfer.exam_code,
        year: this.examinerSelectedFromTransfer.exam_year,
        limit: -1,
        subject_code: this.examinerSelectedFromTransfer.subject_code,
      };
      if (val) {
        this.$store.dispatch("fetchAsNuToRcToExaminerDataList", param);
      }
    },
  },
};
</script>
<style lang="scss">
.distributeSectionCSS {
  // color: red !important;
  background-color: #00838f !important;
}
// .custDTSelection {
// .theme--light .v-table tbody tr[active] {
//   background: pink !important;
// }
// }
</style>
