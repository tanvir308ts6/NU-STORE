<template>
  <div>
    <!-- {{ rcToCenter }} -->
    <v-container fluid style="padding:10px">
      <v-layout row class="mb-2">
        <v-flex xs12>
          <v-autocomplete
            class="mx-2"
            hide-details
            label="Select Regional Center"
            item-text="center_name"
            item-value="regional_center_code"
            v-model="searchParam.reg_center_code"
            :items="getRegCenList"
            required
            prepend-inner-icon="edit"
            outline
            :disabled="ifRegionalUser"
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

        <v-flex xs2 class="text-xs-center" v-if="!ifRegionalUser">
          <v-btn
            :disabled="searchParam.reg_center_code.length == 0"
            class="primary"
            @click="searchRcWiseDistributionData()"
          >
            <v-icon>search</v-icon>search
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- Regional Center  -->
      <v-container style="padding: 10px" fluid v-if="true">
        <v-card v-if="rcToCenter" color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title"
                >Regional Center Recieving Panel</v-card-text
              >
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <div>
              <v-dialog v-model="reportDialog" width="500">
                <v-card>
                  <v-select
                    class="pa-5"
                    outline
                    :items="['Division', 'District', 'All']"
                    label="Order By"
                    hide-details
                    v-model="downloadScriptStmSelection"
                  ></v-select>
                  <v-divider />
                  <div class="text-xs-center py-3">
                    <v-btn
                      outline
                      color="primary"
                      @click.stop.prevent="downloadScriptStm()"
                      class="erBtn"
                    >
                      <v-icon left>cloud_download</v-icon>Download allotment
                      Report
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
              <!-- <v-btn color="primary" @click="reportDialog = !false">allotment Report</v-btn> -->
            </div>
          </v-layout>
        </v-card>

        <!-- if distribute -->
        <v-card v-else color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">
                Regional Center Distribution
              </v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <div class="text-xs-center py-0">
              <v-btn
                :disabled="searchParam.reg_center_code.length == 0"
                outline
                color="primary"
                @click.stop.prevent="downloadRegDocuments('', {})"
                class="erBtn"
              >
                <v-icon left>cloud_download</v-icon>Download FULL PAGE Report
              </v-btn>
            </div>
            <div v-if="false">
              <v-dialog v-model="reportDialog" width="500">
                <v-card>
                  <v-select
                    class="pa-5"
                    outline
                    :items="['Division', 'District', 'All']"
                    label="Order By"
                    hide-details
                    v-model="downloadScriptStmSelection"
                  ></v-select>
                  <v-divider />
                  <div class="text-xs-center py-3">
                    <v-btn
                      outline
                      color="primary"
                      @click.stop.prevent="downloadScriptStm()"
                      class="erBtn"
                    >
                      <v-icon left>cloud_download</v-icon>Download allotment
                      Report
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
              <v-btn color="primary" @click="reportDialog = !false"
                >allotment Report</v-btn
              >
            </div>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="getRCTableHeaders"
          hide-actions
          :hide-headers="dataAtRCTable"
          :items="currentRC"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">
              <v-chip class="subheading" color="transparent">
                {{ props.item.reg_center_code }} -
                {{ props.item.reg_center_name }}
              </v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.main_packet_size }}</td>
            <td class="text-xs-center">{{ props.item.main_quantity }}</td>
            <td class="text-xs-center">{{ props.item.extra_packet_size }}</td>
            <td class="text-xs-center">{{ props.item.extra_quantity }}</td>
            <td class="text-xs-center">{{ props.item.total_packet }}</td>

            <td
              v-if="!rcToCenter"
              class="text-xs-center"
              style="padding:0px 0px"
            >
              <v-layout align-center justify-center row fill-height>
                <!-- <v-btn
                  small
                  @click="downloadRegDocuments('chalan', props.item)"
                >
                  <span class="caption">Chalan</span>
                </v-btn> -->
                <v-btn small @click="downloadRegDocuments('allot', props.item)">
                  <span class="caption">allotment Details</span>
                </v-btn>
              </v-layout>
            </td>

            <td v-if="!rcToCenter" class="text-xs-center cyan lighten-3">
              <v-chip
                v-if="props.item.receive_status == 1"
                color="white green--text"
              >
                <b>Recieved By RC</b>
              </v-chip>
              <div v-else>
                <v-chip
                  v-if="props.item.distribute_status == 1"
                  color="white green--text"
                >
                  <b>Distributed</b>
                </v-chip>
                <div v-else>
                  <v-chip
                    v-if="props.item.status == 4"
                    color="white green--text"
                  >
                    <b>Recieved</b>
                  </v-chip>
                  <v-chip
                    v-if="props.item.status == 3"
                    color="white green--text"
                  >
                    <b>Distributed</b>
                  </v-chip>
                  <v-chip
                    v-if="props.item.status == 2"
                    color="white orange--text"
                  >
                    <b>AT RC</b>
                  </v-chip>
                  <v-chip
                    v-if="props.item.status == 1"
                    color="white pink--text"
                  >
                    <b>Allocated</b>
                  </v-chip>
                  <v-chip
                    v-if="!props.item.status"
                    color="cyan darken-1 white--text"
                  >
                    <b>status</b>
                  </v-chip>
                </div>
              </div>
            </td>
            <!-- <td
              v-if="!rcToCenter"
              class="justify-center text-xs-center cyan lighten-3"
            >
              <v-btn
                small
                color="primary lighten-2"
                @click="addReceiverInfo(props.item)"
              >
                Add Receiver _
              </v-btn>
            </td> -->
            <td v-if="!rcToCenter">
              <v-btn
                :disabled="props.item.distribute_status == 1"
                small
                color="primary"
                @click="openAddToChallanModal(props.item)"
              >
                Add To Challan
              </v-btn>
            </td>
            <!-- <td
              v-if="!rcToCenter"
              class="justify-center text-xs-center cyan lighten-3"
            >
              <v-btn
                v-if="props.item.distribute_status == 1"
                small
                color="primary"
                disabled
                >Distribute</v-btn
              >
              <v-btn
                v-else
               :disabled="false"
                small
                color="primary"
                @click="distributeBsByRegCenter(props.item)"
                >Distribute</v-btn
              >
            </td> -->

            <td v-if="rcToCenter" class="justify-center text-xs-center">
              <v-chip
                v-if="props.item.receive_status == 1"
                color="white green--text"
              >
                <b>Recieved</b>
              </v-chip>
              <v-btn
                v-else
                small
                color="primary"
                @click="recieveBsByRegCenter(props.item)"
                >Recieve</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </v-container>

      <!-- center  -->
      <v-container fluid style="padding: 10px" v-if="checkIfShow()">
        <v-card flat color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">
                Mapped and Allocated Center list of Regional Center
              </v-card-text>
            </v-card>
            <div v-if="false">
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <v-dialog v-model="reportDialog" width="500">
                <v-card>
                  <v-select
                    class="pa-5"
                    outline
                    :items="['Division', 'District', 'All']"
                    label="Order By"
                    hide-details
                    v-model="downloadScriptStmSelection"
                  ></v-select>
                  <v-divider />
                  <div class="text-xs-center py-3">
                    <v-btn
                      outline
                      color="primary"
                      @click.stop.prevent="downloadScriptStm()"
                      class="erBtn"
                    >
                      <v-icon left>cloud_download</v-icon>Download allotment
                      Report
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
              <v-btn color="primary" @click="reportDialog = !false"
                >allotment Report</v-btn
              >
            </div>
          </v-layout>
        </v-card>

        <v-data-table
          :loading="loading"
          :hide-actions="dataAtRCTable"
          :hide-headers="dataAtRCTable"
          :headers="getCenterTableHeaders"
          :items="getRcWiseDistCenterList"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">
              <v-chip class="subheading" color="transparent">
                {{ props.item.center_code }} - {{ props.item.center_name }},
                {{ props.item.district_name }}
              </v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.main_packet_size }}</td>
            <td class="text-xs-center">{{ props.item.main_quantity }}</td>
            <td class="text-xs-center">{{ props.item.extra_packet_size }}</td>
            <td class="text-xs-center">{{ props.item.extra_quantity }}</td>
            <td class="text-xs-center">{{ props.item.total_packet }}</td>

            <td
              v-if="rcToCenter"
              class="text-xs-center"
              style="padding:0px 0px"
            >
              <v-layout align-center justify-center row fill-height>
                <!-- <v-btn
                  small
                  @click="downloadCenterDocuments('chalan', props.item)"
                >
                  <span class="caption">Chalan</span>
                  sandipon
                </v-btn> -->
                <v-btn
                  small
                  @click="downloadRegtoCenterDocuments('allot', props.item)"
                >
                  <span class="caption">allotment Details</span>
                </v-btn>
              </v-layout>
            </td>

            <td v-if="rcToCenter" class="text-xs-center cyan lighten-3">
              <v-chip
                v-if="props.item.distribute_status == 1"
                color="white green--text"
              >
                <b>Distributed</b>
              </v-chip>
              <div v-else>
                <v-chip v-if="props.item.status == 4" color="white green--text">
                  <b>Recieved</b>
                </v-chip>
                <v-chip v-if="props.item.status == 3" color="white green--text">
                  <b>Distributed</b>
                </v-chip>
                <v-chip
                  v-if="props.item.status == 2"
                  color="white orange--text"
                >
                  <b>AT RC</b>
                </v-chip>
                <v-chip v-if="props.item.status == 1" color="white pink--text">
                  <b>Allocated</b>
                </v-chip>
                <v-chip
                  v-if="!props.item.status"
                  color="cyan darken-1 white--text"
                >
                  <b>status</b>
                </v-chip>
              </div>
            </td>
            <!-- <td
              v-if="rcToCenter"
              class="justify-center text-xs-center cyan lighten-3"
            >
              <v-btn
                small
                color="primary lighten-2"
                @click="addReceiverInfo(props.item)"
                >Add Receiver</v-btn
              >
            </td> -->

            <td
              v-if="rcToCenter"
              class="justify-center text-xs-center cyan lighten-3"
            >
              <v-btn
                :disabled="props.item.distribute_status == 1"
                small
                color="primary"
                @click="openCenterAddToChallanModal(props.item)"
              >
                Add To Challan
              </v-btn>
            </td>
            <!-- <td
              v-if="rcToCenter"
              class="justify-center text-xs-center cyan lighten-3"
            >
              <v-btn
                v-if="props.item.distribute_status == 1"
                small
                color="primary"
                disabled
                >Distribute</v-btn
              >
              <v-btn
                v-else
                :disabled="!props.item.receiver"
                @click="distributeBsByRegCenterToCenter(props.item)"
                small
                color="primary"
              >
                Distribute
              </v-btn>
            </td> -->

            <!-- distribute_status -->
          </template>
        </v-data-table>
      </v-container>
      <!-- <pre> {{getRcWiseDistCenterList}} </pre> -->
      <v-container fluid v-if="!rcToCenter">
        <v-expansion-panel v-model="exp_" class="mt-2">
          <v-expansion-panel-content>
            <template v-slot:header>
              <v-card color="white" flat>
                <v-layout row>
                  <v-card flat>
                    <v-card-text class="title">
                      Summary
                      <span class="subheading">
                        (Regional Center wise Distribution)
                      </span>
                    </v-card-text>
                  </v-card>
                  <v-divider class="my-2" vertical></v-divider>
                  <v-spacer />
                  <v-icon class="mx-3" @click="getSummaryDataRegWiseDist()">
                    refresh
                  </v-icon>
                </v-layout>
              </v-card>
            </template>
            <v-card class="pa-4">
              <!-- <pre> {{getRcWiseDistributionSummary}}</pre> -->
              <v-data-table
                :loading="loading"
                :headers="summaryHeaders"
                :items="getRcWiseDistributionSummary"
                class="elevation-1"
                :total-items="pagination.totalItems"
                :pagination.sync="pagination"
                :rows-per-page-items="pagination.rowsPerPageItems"
                hide-actions
              >
                <template v-slot:items="props">
                  <td>{{ props.index + 1 }}</td>
                  <td class="text-xs">
                    {{ props.item.reg_center_code }} -
                    {{ props.item.regional_center_name }}
                  </td>
                  <td class="text-xs-center">
                    {{ props.item.total_allocated }}
                  </td>
                  <td class="text-xs-center">
                    {{ getDistStatus(props.item.status) }}
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>

      <!-- challan section  -->
      <!-- Bs alloc details & distribution  to Regcenter from NU -->
      <v-container fluid v-if="!rcToCenter">
        <div v-if="forceChalanSummary">
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Challan Summary</v-card-text>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <v-btn color="primary" @click="openCreateNewChallan()"
                >Create New Challan</v-btn
              >
              <v-icon class="mx-3" @click="fetchNUtoREGChallanList()"
                >refresh</v-icon
              >
            </v-layout>
          </v-card>
          <v-card color="white" class="pa-2">
            <v-data-table
              :headers="chalanHeader"
              :items="getBsNURChallanList"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <!-- <tr> -->
                <td class="text-xs" style="padding: 0 10px">
                  {{ props.index + 1 }}
                </td>
                <td class="text-xs-center" style="padding: 0 12px">
                  <v-chip
                    label
                    :color="
                      props.item.distribute_status == 1 ? 'green' : 'pink'
                    "
                    text-color="white"
                    >{{ props.item.challan_no }}
                  </v-chip>
                </td>
                <!-- <td class="text-xs" style="padding: 0 10px;">{{ props.item.challan_type }}</td> -->
                <td class="text-xs" style="padding: 0 12px">
                  {{ getFormatedDate(props.item.challan_date) }}
                  <!-- <div v-if="props.item.challan_date">
                  {{ getFormatedDate(props.item.challan_date) }}
                </div> -->
                </td>
                <td class="text-xs-left" style="padding: 0 12px">
                  Naional University
                </td>
                <td class="text-xs-left" style="padding: 0 12px">
                  {{ props.item.regional_center_code }} -
                  {{ props.item.regional_center_name }}
                </td>

                <!-- <td class="text-xs" style="padding: 0 10px">
                {{ props.item.total_e_type_packet }}
              </td>
              <td class="text-xs" style="padding: 0 10px">
                {{ props.item.total_script_packet }}
              </td> -->
                <td class="text-xs-center" style="padding: 0 10px">
                  {{ props.item.total_packet }}
                </td>
                <!-- <td></td>
              <td></td> 
              distribute_status
              -->
                <td class="text-xs-center" style="padding: 0 5px">
                  <div v-if="props.item.distribute_status == 1">
                    <v-chip color="green white--text">
                      <b>Delivered</b>
                    </v-chip>
                  </div>
                  <div v-else>
                    <v-chip color="red white--text">
                      <b>Not Delivered</b>
                    </v-chip>
                  </div>
                  <!-- {{ props.item.nu_distribute_status }} -->
                </td>
                <td class="text-xs-center" style="padding: 0 10px">
                  <v-btn
                    v-if="props.item.distribute_status == 1"
                    small
                    color="primary"
                    @click="downloadNURChallanByCode(props.item)"
                  >
                    <!-- <v-icon large>insert_drive_file</v-icon> -->
                    <span class="caption">Challan</span>
                  </v-btn>
                  <v-btn
                    small
                    @click="downloadRegDocuments('gp', props.item)"
                    v-if="props.item.distribute_status == 1"
                  >
                    <span class="caption">Gate Pass</span>
                  </v-btn>
                </td>
                <!-- <td class="text-xs-center" style="padding: 0 10px">
                <v-btn
                  small
                  v-if="props.item.distribute_status == 1"
                  color="primary"
                  @click="downloadAnsRequsitonByCode(props.item)"
                >
                  Requsiton letter
                </v-btn>
              </td> -->

                <td class="text-xs-center" style="padding: 0 10px">
                  <div>
                    <v-btn
                      :disabled="props.item.distribute_status == 1"
                      color="primary"
                      @click="addReceiverInfo(props.item)"
                    >
                      Deliver
                    </v-btn>
                  </div>
                  <!-- @click="distributeCenterChallan(props.item)" -->
                </td>

                <!-- <td class="text-xs" style="padding: 0 10px">
                <div>
                  <v-btn
                    color="primary"
                    @click="openCenterChallanDetails(props.item)"
                    >Details</v-btn
                  >
                </div>
              </td> -->
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-container>

      <!-- Bs receive and delivery to center from reg -->
      <v-container fluid v-if="rcToCenter">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title"
                >Challan Summary Reg to Center</v-card-text
              >
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn color="primary" @click="openCenterCreateNewChallan()"
              >Create New Challan for Center
            </v-btn>
            <v-icon class="mx-3" @click="fetchRegtoCenterChallanList()"
              >refresh</v-icon
            >
          </v-layout>
        </v-card>
        <v-card color="white" class="pa-2">
          <v-data-table
            :headers="chalanHeaderRegToCenter"
            :items="getBsChallanList"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <!-- <tr> -->
              <td class="text-xs-left" style="padding: 0 10px">
                {{ props.index + 1 }}
              </td>
              <td class="text-xs-center" style="padding: 0 10px">
                {{ props.item.challan_no }}
              </td>
              <!-- <td class="text-xs" style="padding: 0 10px;">{{ props.item.challan_type }}</td> -->
              <td class="text-xs-center" style="padding: 0 10px">
                <div v-if="props.item.challan_date">
                  {{ getFormatedDate(props.item.challan_date) }}
                </div>
              </td>
              <!-- <td class="text-xs" style="padding: 0 10px">
                {{ props.item.delivery_from_name }}
              </td> -->
              <td class="text-xs-left" style="padding: 0 10px">
                {{ props.item.center_code }} - {{ props.item.center_name }}
              </td>

              <td class="text-xs-center" style="padding: 0 10px">
                {{ props.item.total_packet }}
              </td>

              <td class="text-xs-center" style="padding: 0 10px">
                <div v-if="props.item.distribute_status == 1">
                  <v-chip color="green white--text">
                    <b>Delivered</b>
                  </v-chip>
                </div>
                <div v-else>
                  <v-chip color="red white--text">
                    <b>Not Delivered</b>
                  </v-chip>
                </div>
                <!-- {{ props.item.nu_distribute_status }} -->
              </td>
              <td class="text-xs-center" style="padding: 0 10px">
                <v-btn
                  small
                  v-if="props.item.distribute_status == 1"
                  color="primary"
                  @click="downloadRegToCenChallanByCode(props.item)"
                  >Challan
                  <!-- <v-icon large>insert_drive_file</v-icon> -->
                </v-btn>
                <v-btn
                  small
                  v-if="props.item.distribute_status == 1"
                  @click="downloadRegtoCenterDocuments('gp', props.item)"
                >
                  <span class="caption">Gate Pass</span>
                </v-btn>
              </td>
              <!-- <td class="text-xs-center" style="padding: 0 10px">
                <v-btn
                  small
                  v-if="props.item.distribute_status == 1"
                  color="primary"
                  @click="downloadAnsRequsitonByCode(props.item)"
                >
                  Requsiton letter
                </v-btn>
              </td> -->

              <td class="text-xs-center" style="padding: 0 10px">
                <div>
                  <v-btn
                    :disabled="props.item.distribute_status == 1"
                    color="primary"
                    @click="addReceiverInfo(props.item)"
                    >Deliver</v-btn
                  >
                  <!-- @click="distributeCenterChallan(props.item)" -->
                </div>
              </td>
              <!-- <td class="text-xs" style="padding: 0 10px">
                <div>
                  <v-btn
                    color="primary"
                    @click="openCenterChallanDetails(props.item)"
                    >Details</v-btn
                  >
                </div>
              </td> -->
            </template>
          </v-data-table>
        </v-card>
      </v-container>

      <v-dialog v-model="receiverDialog" width="500" persistent>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="title">Receiver's Info **</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat fab @click="close()">Close</v-btn>
        </v-toolbar>
        <v-card class="pa-2">
          <!-- {{ receiverInfoObj }} -->
          <div class="pb-3">
            <v-text-field
              v-model="receiverInfoObj.name"
              class="pa-2"
              label="Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.title"
              class="pa-2"
              label="Title"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.phone"
              class="pa-2"
              label="Phone"
              outline
              hide-details
              :error="phoneErr"
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.email"
              class="pa-2"
              label="Email"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
          </div>
          <v-divider />
          <div class="text-xs-center py-3">
            <!-- <v-btn outline color="primary" @click="saveReceiverInfo()"> -->
            <!-- distributeBsByRegCenter -->
            <v-btn
              v-if="!rcToCenter"
              outline
              color="primary"
              @click="distributeBsByRegCenter()"
            >
              Distribute_
            </v-btn>
            <v-btn
              v-if="rcToCenter"
              outline
              color="primary"
              @click="distributeBsByRegCenterToCenter()"
            >
              Distribute**
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modalCreateChalan" width="700">
        <v-toolbar dark color="primary" class="mt-0">
          <v-toolbar-title>Create New Challan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="light-blue lighten-1" @click="modalCreateChalan = false"
            >Close</v-btn
          >
        </v-toolbar>
        <v-layout>
          <v-flex xs12 sm12>
            <v-card class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 class="pa-2">
                  <v-autocomplete
                    v-if="regCenterChallan.delivery_to_id == 3"
                    label="Select Regional Center"
                    item-text="center_name"
                    item-value="regional_center_code"
                    v-model="regCenterChallan.regional_center_code"
                    :items="getRegCenList"
                    hide-details
                    prepend-icon="edit"
                    v-validate="'required'"
                    :error-messages="errors.collect('regional_center_code')"
                    data-vv-name="regional_center_code"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="regCenterChallan.regional_center_code = ''"
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
                <v-flex xs6 class="pa-2">
                  <v-layout row wrap>
                    <v-text-field
                      v-model="regCenterChallan.from_name"
                      label="from name"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_name')"
                      data-vv-name="from_name"
                    ></v-text-field>
                    <v-text-field
                      v-model="regCenterChallan.from_designation"
                      label="from designation"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_designation')"
                      data-vv-name="from_designation"
                    ></v-text-field>
                    <v-text-field
                      v-model="regCenterChallan.from_address"
                      label="from address"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_address')"
                      data-vv-name="from_address"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs6 class="pa-2">
                  <v-layout row wrap>
                    <!-- {{ regCenterChallan }} -->
                    <!-- <v-autocomplete
                      v-model="regCenterChallan.delivery_to_id"
                      :items="getDeliveryOptionsData"
                      :item-text="(item) => item.delivery_name"
                      item-value="options.id"
                      label="Select delivery options"
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{ data.item.options.delivery_name }}</v-chip
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
                              v-html="data.item.options.delivery_name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete> -->

                    <v-text-field
                      v-model="regCenterChallan.to_name"
                      label="to name"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_name')"
                      data-vv-name="to_name"
                    ></v-text-field>
                    <v-text-field
                      v-model="regCenterChallan.to_designation"
                      label="to designation"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_designation')"
                      data-vv-name="to_designation"
                    ></v-text-field>
                    <v-text-field
                      v-model="regCenterChallan.to_address"
                      label="to address"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_address')"
                      data-vv-name="to_address"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="validationForm()">
                  <v-icon left large>add</v-icon>Create New Challan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
      <v-dialog v-model="addToChallanModal" width="700">
        <v-card class="pa-4">
          <v-layout>
            <v-flex xs12>
              <v-autocomplete
                class="mt-0"
                v-model="selectedChallan"
                :items="filteredNURChallanList"
                :item-text="(item) => item.challan_no"
                item-value="challan_no"
                label="Select Challan _"
                persistent-hint
                prepend-inner-icon="edit"
                outline
                hide-details
              >
                <template v-slot:selection="data">
                  <b>{{ data.item.challan_no }}</b>
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
                        >{{ data.item.challan_no }} : From: National University
                        - To: {{ data.item.regional_center_name }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-btn
                color="primary"
                style="float: right; margin-top: -47px; margin-right: 50px"
                @click="addToChallan"
                >Add To Challan
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modalCenterCreateChalan" width="700">
        <v-toolbar dark color="primary" class="mt-0">
          <v-toolbar-title>Create New Challan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="light-blue lighten-1"
            @click="modalCenterCreateChalan = false"
            >Close</v-btn
          >
        </v-toolbar>
        <v-layout>
          <v-flex xs12 sm12>
            <v-card class="pa-4">
              <v-form data-vv-scope="form1">
                <v-layout row wrap>
                  <v-flex xs12 class="pa-2">
                    <v-text-field
                      v-model="bsCenterChallan.center_code"
                      label="Center Code"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('form1.center_code')"
                      data-vv-name="center_code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 class="pa-2">
                    <v-layout row wrap>
                      <v-text-field
                        v-model="bsCenterChallan.from_name"
                        label="from name"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.from_name')"
                        data-vv-name="from_name"
                      ></v-text-field>
                      <v-text-field
                        v-model="bsCenterChallan.from_designation"
                        label="from designation"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.from_designation')"
                        data-vv-name="from_designation"
                      ></v-text-field>
                      <v-text-field
                        v-model="bsCenterChallan.from_address"
                        label="from address"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.from_address')"
                        data-vv-name="from_address"
                      ></v-text-field>
                    </v-layout>
                  </v-flex>
                  <v-flex xs6 class="pa-2">
                    <v-layout row wrap>
                      <v-text-field
                        v-model="bsCenterChallan.to_name"
                        label="to name"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.to_name')"
                        data-vv-name="to_name"
                      ></v-text-field>
                      <v-text-field
                        v-model="bsCenterChallan.to_designation"
                        label="to designation"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.to_designation')"
                        data-vv-name="to_designation"
                      ></v-text-field>
                      <v-text-field
                        v-model="bsCenterChallan.to_address"
                        label="to address"
                        prepend-icon="edit"
                        v-validate="'required'"
                        :error-messages="errors.collect('form1.to_address')"
                        data-vv-name="to_address"
                      ></v-text-field>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="createNewCenterChallanValid()">
                  <v-icon left large>add</v-icon>Create New Challan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
      <v-dialog v-model="addToCenterChallanModal" width="700">
        <v-card class="pa-4">
          <v-layout>
            <v-flex xs12>
              <v-autocomplete
                class="mt-0"
                v-model="selectedChallan"
                :items="filteredRCChallanList"
                :item-text="(item) => item.challan_no"
                item-value="challan_no"
                label="Select Challan !.!"
                persistent-hint
                prepend-inner-icon="edit"
                outline
                hide-details
              >
                <template v-slot:selection="data">
                  <b>{{ data.item.challan_no }}</b>
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
                        >{{ data.item.challan_no }} - To:
                        {{ data.item.center_name }} ({{
                          data.item.center_code
                        }})
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-btn
                color="primary"
                style="float: right; margin-top: -47px; margin-right: 50px"
                @click="addToChallanRegC"
                >Add To Challan
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import formNotification from "@/components/utils/formNotification";
import common_login_getters from "@/mixin/common_login_getters";
import * as moment from "moment";
export default {
  $_veeValidate: {
    validator: "new",
  },
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
  },
  props: {
    rcToCenter: Boolean,
  },
  data() {
    return {
      dictionary: {
        custom: {
          center_code: {
            required: () => "Center Code field can not be empty",
          },
          regional_center_code: {
            required: () => "Regional Center Code field can not be empty",
          },
          from_name: {
            required: () => "From name field can not be empty",
          },
          from_designation: {
            required: () => "From Designation field can not be empty",
          },
          from_address: {
            required: () => "From Address field can not be empty",
          },
          to_name: {
            required: () => "To name field can not be empty",
          },
          to_designation: {
            required: () => "To Designation field can not be empty",
          },
          to_address: {
            required: () => "To Address field can not be empty",
          },
        },
      },
      forceChalanSummary: true,
      selectedChallan: "",
      regCenterChallan: {
        delivery_from_id: 21,
        delivery_to_id: 3,
      },
      downloadScriptStmSelection: "",
      phoneErr: false,
      receiverInfoObj: {},
      currentRC: [],
      currentRCForAddToChallan: {
        regional_center_code: -1,
      },
      reportDialog: false,
      selected: [],
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: -1,
      searchParam: {
        reg_center_code: "",
      },
      exp_: 1,
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },
        { text: " Name", value: "center_name", sortable: false, width: "20%" },
        // { text: "District", value: "district_name", sortable: false },

        {
          text: "MS Packet Size",
          value: "main_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "MS Packet Count",
          value: "main_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Size",
          value: "extra_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Count",
          value: "extra_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
        },

        {
          text: "Download",
          align: "center",
          value: "district_code",
          sortable: false,
          width: "5%",
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "cyan lighten-2 white--text subheading",
          width: "5%",
        },
        // {
        //   text: "Receiver Info",
        //   align: "center",
        //   value: "actions",
        //   sortable: false,
        //   class: "cyan lighten-2 white--text subheading",
        //   width: "5%",
        // },
        {
          text: "Distribute",
          align: "center",
          value: "actions",
          sortable: false,
          class: "cyan lighten-2 white--text subheading",
          width: "5%",
        },
      ],
      centerTableHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },
        { text: " Name", value: "center_name", sortable: false, width: "20%" },
        {
          text: "MS Packet Size",
          value: "main_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "MS Packet Count",
          value: "main_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Size",
          value: "extra_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Count",
          value: "extra_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
        },
      ],
      atRcCenterTableHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },
        { text: " Name", value: "center_name", sortable: false, width: "20%" },
        {
          text: "MS Packet Size",
          value: "main_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "MS Packet Count",
          value: "main_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Size",
          value: "extra_packet_size",
          sortable: false,
          width: "5%",
        },
        {
          text: "ES Packet Count",
          value: "extra_quantity",
          sortable: false,
          width: "5%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
        },
        {
          text: "Status",
          value: "total_packet",
          sortable: false,
          align: "center",
          width: "5%",
        },
      ],
      summaryHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Regional Center Name", value: "center_name", sortable: false },
        // { text: "Division", value: "center_code", sortable: false },
        // { text: "District", value: "district_code", sortable: false },
        {
          text: "Allocated Center Count",
          value: "script_count",
          sortable: false,
          align: "center",
        },
        {
          text: "Distribution Status",
          value: "script_count",
          sortable: false,
          align: "center",
        },
      ],
      chalanHeader: [
        {
          text: "Sl",
          value: "challan_no",
          align: "left",
          sortable: false,
          width: "5%",
        },
        {
          text: "Challan No",
          value: "challan_no",
          align: "center",
          sortable: false,
          width: "5%",
        },

        {
          text: "Challan Date",
          value: "challan_date",
          align: "center",
          sortable: false,
          width: "5%",
        },
        {
          text: "Challan From",
          value: "delivery_option",
          align: "center",
          sortable: false,
          width: "5%",
        },
        {
          text: "Challan To",
          value: "delivery_option",
          align: "center",
          sortable: false,
          width: "5%",
        },

        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
        },

        {
          text: "Status",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },
        {
          text: "Download",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Download Requsation Letter",
        //   value: "nu_distribute_status",
        //   align: "left",
        //   sortable: false,
        // },
        {
          text: "Deliver",
          value: "distribute",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Challan Details",
        //   value: "challan_details",
        //   align: "center",
        //   sortable: false,
        // },
      ],
      chalanHeaderRegToCenter: [
        {
          text: "Sl",
          value: "challan_no",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan No",
          value: "challan_no",
          align: "center",
          sortable: false,
        },

        {
          text: "Challan Date",
          value: "challan_date",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Challan From",
        //   value: "delivery_option",
        //   align: "left",
        //   sortable: false,
        //
        // },
        {
          text: "Challan To",
          value: "delivery_option",
          align: "center",
          sortable: false,
        },

        {
          text: "Total Packet",
          value: "total_packet",
          align: "center",
          sortable: false,
        },

        {
          text: "Status",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },
        {
          text: "Download",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Download Requsation Letter",
        //   value: "nu_distribute_status",
        //   align: "left",
        //   sortable: false,
        // },
        {
          text: "Deliver",
          value: "distribute",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Challan Details",
        //   value: "challan_details",
        //   align: "center",
        //   sortable: false,
        // },
      ],
      rcWiseDistSummaryParam: {},
      modalCreateChalan: false,
      modalCenterCreateChalan: false,
      addToChallanModal: false,
      bsCenterChallan: {},
      addToCenterChallanModal: false,
      currentCenter: {},
      currentSelectedChallan: {},
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    this.initialize();
    var limit = {
      page: 1,
      limit: 1000,
    };

    this.$store.dispatch("fetchRegCenterData");
    this.$store.dispatch("callRegionalCenterData", limit);
    // regional-center-script-summary

    this.initialize();

    this.$store.dispatch(
      "fetchRcWiseDistributionSummary",
      this.rcWiseDistSummaryParam
    );
    if (this.ifRegionalUser) {
      this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    }

    this.fetchNUtoREGChallanList();
    this.fetchRegtoCenterChallanList();
    // this.fetchRegtoCenterChallanList();
    // regional-center-script-distribution
  },
  computed: {
    getRCTableHeaders() {
      if (!this.rcToCenter) {
        return this.headers;
      } else {
        return this.atRcCenterTableHeaders;
      }
    },
    getCenterTableHeaders() {
      if (this.rcToCenter) {
        return this.headers;
      } else {
        return this.centerTableHeaders;
      }
    },
    dataAtRCTable() {
      try {
        if (this.currentRC.length != 0) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log(this.currentRC);
        console.log("??");
        return true;
      }
      return true;
    },
    filteredNURChallanList() {
      let arr = [];
      for (var i = 0; i < this.getBsNURChallanList.length; i++) {
        if (
          this.currentRCForAddToChallan.reg_center_code ==
          this.getBsNURChallanList[i].regional_center_code
        ) {
          if (parseInt(this.getBsNURChallanList[i].distribute_status) == 0)
            arr.push(this.getBsNURChallanList[i]);
        }
      }
      return arr;
    },
    filteredChallanList() {
      let arr = [];
      for (var i = 0; i < this.getBsNURChallanList.length; i++) {
        console.log("currentRCForAddToChallan", this.currentRCForAddToChallan);
        arr.push(this.getBsNURChallanList[i]);
      }
      return arr;
    },
    filteredRCChallanList() {
      let arr = [];
      for (var i = 0; i < this.getBsRCChallanList.length; i++) {
        if (
          this.currentCenter.center_code ==
          this.getBsRCChallanList[i].center_code
        ) {
          if (parseInt(this.getBsRCChallanList[i].distribute_status) == 0)
            arr.push(this.getBsRCChallanList[i]);
        }
      }
      return arr;
    },
    getBsChallanList() {
      return this.$store.getters.getBsChallanList;
    },
    getBsNURChallanList() {
      return this.$store.getters.getBsNURChallanList;
    },
    getBsRCChallanList() {
      return this.$store.getters.getBsChallanList;
    },
    //
    getRcWiseDistCenterList() {
      return this.$store.getters.getRcWiseDistCenterList;
    },
    getRcWiseDistributionSummary() {
      return this.$store.getters.getRcWiseDistributionSummary;
    },
    getRegionalCenterList() {
      return this.$store.getters.getRegionalCentertItem;
    },
    ifShowRegSection() {
      // console.log();
      // let x = this.getRegFromSearchParam[0];
      // if (x == undefined) return false;
      // if (x == "") return false;
      // else return true;

      return true;
    },

    getRegFromSearchParam() {
      return [this.searchParam.reg_center_code];
    },
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    getRcDistCenterList() {
      return this.$store.getters.getRcDistCenterList;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
  },

  methods: {
    downloadRegToCenChallanByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;
      param.challan = true;
      this.$root
        .$confirm("Are you sure that you want to download Challan? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_BS_RC_to_CenChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },
    getSummaryDataRegWiseDist() {
      this.$store.dispatch(
        "fetchRcWiseDistributionSummary",
        this.rcWiseDistSummaryParam
      );
      this.exp_ = 1;
    },
    downloadNURChallanByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;
      param.challan = true;
      this.$root
        .$confirm("Are you sure that you want to download Challan? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_BS_ChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },
    getDistStatus(status) {
      if (parseInt(status) == 1) {
        return "Distributed";
      } else {
        return "Not Distributed";
      }
    },
    RcWiseDistributionSummary() {},

    downloadRegDocuments(what, item) {
      console.log("..", item);
      let text = "";
      let self = this;
      let param = { ...this.searchParam };
      param.exam_year = this.searchParam.year;
      if (what == "gp") {
        param.gate_pass = true;
        param.challan_no = item.challan_no;
        text = "gate pass";
        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_gatepass_NUto_reg", param)
                .then(() => {});
            }
          });
      } else {
        if (what == "chalan") {
          param.chalan = 1;
          text = "chalan";
        }
        if (what == "allot") param.indi_allot = 1;

        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_AllotmentReport_ByReg", param)
                .then(() => {});
            }
          });
      }
    },

    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    downloadScriptStm() {
      let param = { ...this.searchParam };
      if (this.downloadScriptStmSelection == "Division") {
        param.div = 1;
      }
      if (this.downloadScriptStmSelection == "District") {
        param.dist = 1;
      }

      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store.dispatch("download_BS_Statement", param).then(() => {
              // console.log("in return then downloadScriptStm");
              // self.searchScriptStm();
            });
          }
        });
    },
    checkIfShow() {
      if (this.rcToCenter) {
        let st = false;
        try {
          st = this.currentRC[0].receive_status != 0;
        } catch (er) {}
        return st;
      } else {
        return !this.rcToCenter;
      }
    },
    // !rcToCenter
    saveReceiverInfo() {
      if (!isNaN(this.receiverInfoObj.phone)) {
        this.phoneErr = false;
        this.receiverDialog = false;
      } else {
        this.phoneErr = true;
      }
    },

    distributeBsByRegCenter() {
      let item = this.currentSelectedChallan;
      item.receiver = JSON.stringify(this.receiverInfoObj);

      let self = this;
      this.$root
        .$confirm("Are you sure that you want to distribute?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("distributeBsByRegCenter", item)
              .then(function() {
                self.fetchNUtoREGChallanList();
                self.receiverDialog = false;
                self.forceChalanSummary = false;
                self.forceChalanSummary = true;
              })
              .catch(function(error) {
                console.log(error);
                self.fetchNUtoREGChallanList();
                self.receiverDialog = false;
                self.forceChalanSummary = false;
                self.forceChalanSummary = true;
              });
          }
        });

      // this.$store.dispatch("distributeBsByRegCenter", item).then((data) => {
      //   this.searchRcWiseDistributionData();
      //   console.log("boom", data);
      // });
    },
    distributeBsByRegCenterToCenter() {
      let item = this.currentSelectedChallan;
      item.receiver = JSON.stringify(this.receiverInfoObj);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to distribute?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("distributeBsByRegCenterToCenter", item)
              .then(function() {
                self.searchRcWiseDistributionData();
                self.receiverDialog = false;
                self.fetchRegtoCenterChallanList();
              })
              .catch(function(error) {
                console.log(error);
                self.searchRcWiseDistributionData();
              });
          }
        });
    },
    recieveBsByRegCenter(item) {
      let param = {};
      try {
        param.id = item.id;
      } catch (err) {}
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Receive?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("recieveBsByRegCenter", param)
              .then(function() {
                self.searchRcWiseDistributionData();
              })
              .catch(function(error) {
                console.log(error);
                self.searchRcWiseDistributionData();
              });
          }
        });
      // item.receiver = this.receiverInfoObj;
      // let param = {};
      // try {
      //   param.id = item.id;
      // } catch (err) {}
      // this.$store.dispatch("recieveBsByRegCenter", param).then((data) => {
      //   this.searchRcWiseDistributionData();
      //   // console.log("boom", data);
      // });
    },
    initialize() {
      this.rcWiseDistSummaryParam.exam_code = this.getLoggedInExam.code;
      this.rcWiseDistSummaryParam.exam_initiate_id = this.getExamInitiateId;
      this.rcWiseDistSummaryParam.year = this.getLoggedInYear.year;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    addReceiverInfo(item) {
      this.currentSelectedChallan = item;
      if (item.receiver === null) {
        item.receiver = {};
        item.receiver.name = "";
        item.receiver.title = "";
        item.receiver.phone = "";
        item.receiver.email = "";
        this.receiverInfoObj = item.receiver;
      } else {
        let isString = typeof item.receiver === "string";
        if (isString) this.receiverInfoObj = JSON.parse(item.receiver);
      }
      this.receiverDialog = true;
    },
    close() {
      this.receiverDialog = false;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchRcWiseDistributionData() {
      if (this.rcToCenter) {
        this.searchParam.distribute_status = 1;
      } else {
        this.searchParam.distribute_status = -1;
      }
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRcWiseDistributionData", this.searchParam)
        .then((data) => {
          this.loading = false;
          console.log("return data", data);
          try {
            this.currentRC = data.data.regional_centers;
            this.sl_count = data.links.from;
            this.pagination.totalItems = data.links.total;
          } catch (err) {
            console.log("er spspspps", err);
          }
        });
    },
    downloadRegtoCenterDocuments(what, item) {
      // console.log("..", item);
      let self = this;
      let text = "";
      let param = { ...this.searchParam };
      param.exam_year = this.searchParam.year;
      if (what == "gp") {
        param.gate_pass = true;
        param.challan_no = item.challan_no;
        text = "gate pass";
        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_gatepass_RCto_cen", param)
                .then(() => {});
            }
          });
      } else {
        if (what == "chalan") {
          param.chalan = 1;
          text = "chalan";
        }
        if (what == "allot") param.indi_allot = 1;
        param.center_code = item.center_code;

        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_AllotmentReport_ByCenter", param)
                .then(() => {});
            }
          });
      }
    },
    // challan
    openCreateNewChallan() {
      this.modalCreateChalan = true;
    },
    openCenterCreateNewChallan() {
      this.modalCenterCreateChalan = true;
    },

    fetchNUtoREGChallanList() {
      let param = {
        limit: -1,
        challan_type: "BSNUR",
      };
      this.$store.dispatch("fetchBSNUtoRChallanList", param).then((result) => {
        console.log(result);
      });
    },
    fetchRegtoCenterChallanList() {
      let param = {
        limit: -1,
        challan_type: "BSRC",
      };
      console.log("am i here ??");
      this.$store.dispatch("fetchBSChallanList", param).then((result) => {
        console.log(result);
      });
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.createNewChallan();
        }
      });
    },
    createNewChallan() {
      this.regCenterChallan.challan_type = "BSNUR";
      this.$root
        .$confirm("Are you sure that you want to create new challan? ")
        .then((confirm) => {
          if (confirm) {
            this.modalCreateChalan = false;
            this.$store
              .dispatch("addNewChallan", this.regCenterChallan)
              .then(() => {
                this.fetchNUtoREGChallanList();
              });
          }
        });
    },
    createNewCenterChallanValid() {
      this.$validator.validateAll('form1').then((isValid) => {
        if (isValid) {
          this.createNewCenterChallan();
        }
      });
    },
    createNewCenterChallan() {
      this.bsCenterChallan.challan_type = "BSRC";
      this.$root
        .$confirm("Are you sure that you want to create new challan? ")
        .then((confirm) => {
          if (confirm) {
            this.modalCenterCreateChalan = false;
            this.$store
              .dispatch("addNewChallan", this.bsCenterChallan)
              .then(() => {
                this.fetchRegtoCenterChallanList();
              });
          }
        });
    },
    openAddToChallanModal(item) {
      this.currentRCForAddToChallan = item;
      this.addToChallanModal = true;
    },
    openCenterAddToChallanModal(item) {
      this.currentCenter = { ...item };
      this.addToCenterChallanModal = true;
    },
    addToChallan() {
      this.currentRC.forEach((obj) => {
        obj.challan_no = this.selectedChallan;
        obj.year = obj.exam_year;
      });
      // addToChallanBsNuToReg
      this.$store.dispatch("addToChallanBsNuToReg", this.currentRC).then(() => {
        this.fetchNUtoREGChallanList();
        this.addToChallanModal = false;
      });
    },
    getFormatedDate(date) {
      if (date == null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    addToChallanRegC() {
      let that = this;
      this.currentCenter.challan_no = this.selectedChallan;
      this.currentCenter.year = this.currentCenter.exam_year;

      this.$store
        .dispatch("addToChallanBsNuToCenter", [this.currentCenter])
        .then(() => {
          that.fetchRegtoCenterChallanList();
          that.addToCenterChallanModal = false;
        });
    },
  },

  watch: {
    pagination() {
      this.searchRcWiseDistributionData();
    },
  },
};
</script>
<style scoped></style>
