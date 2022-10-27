<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <!-- {{currentItem}} -->
        <template>
          <v-container class="grey lighten-5">
            <template>
              <div class="whole-border">
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs3>
                      <v-layout column>
                        <v-img :src="getQrCodeUrl(currentItem.qr_code)" aspect-ratio="1"></v-img>
                      </v-layout>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs5>
                      <h1 align="center">National University</h1>
                      <h3 align="center">Gazipur - 1704,Bangladesh</h3>
                      <h3 align="center">
                        {{ currentItem.exam_code }} - {{ currentItem.exam_name }}
                        - {{ currentItem.year }}
                      </h3>
                      <br />
                      <br />
                      <v-flex xs12>
                        <h2 align="center">Admit Card</h2>
                      </v-flex>
                    </v-flex>
                    <v-flex xs3></v-flex>
                  </v-layout>
                  <table class="b" style="margin-left:0px; margin-right:0px;" >
                      <tr>
                        <th class="a" width="1000" align="left" >
                          <h3 style="margin-left:10px; margin-right:0px;">
                            Subject Code and Name                           
                         </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.subject_code }} -
                            {{ currentItem.subject_name }}</p>
                        </td>
                        <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <h3 style="margin-left:10px; margin-right:50px;">Examination Code</h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.exam_code }}</p>
                        </td>
                      </tr>
                      <tr>
                        <th class="a" width="1000" align="left" >
                          <h3 style="margin-left:10px; margin-right:0px;">
                            Name of the Examinee

                          </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.student_name }}</p>
                        </td>
                        <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <h3 style="margin-left:10px; margin-right:50px;">Roll No</h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.exam_roll }}</p>
                        </td>
                      </tr>
                      <tr>
                        <th class="a" width="1000" align="left" >
                          <h3 style="margin-left:10px; margin-right:50px;">
                            Father's Name
                          </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.father_name }}</p>
                        </td>
                        <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <h3 style="margin-left:10px; margin-right:50px;">
                          Registration No</h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px">{{ currentItem.reg_no }}</p>
                        </td>
                      </tr>
                      <tr>
                        <th class="a" width="1000" align="left" >
                          <h3 style="margin-left:10px; margin-right:50px;">Mother's Name</h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          
                          <p style="margin-left:10px; margin-right:50px; ">{{ currentItem.mother_name }}</p>
                        </td>
                        <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <h3 style="margin-left:10px; margin-right:50px;">Session & Type</h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                         
                          <p style="margin-left:10px; margin-right:50px; ">{{ currentItem.session_year }}/{{ currentItem.student_type }}</p>
                        </td>
                      </tr>
                      
                    </table>
                   
                  <br />
                   <table class="b" style="margin-left:0px; margin-right:0px;" >
                      <tr>
                        <th class="a" width="500" align="left" >
                          <h3 style="margin-left:10px; margin-right:0px;">
                            College Code & Name                          
                         </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.college_code }} - {{currentItem.college_name}}</p>
                        </td>

                      </tr>
                      <tr>
                        <th class="a" width="500" align="left" >
                          <h3 style="margin-left:10px; margin-right:0px;">
                            Center Code & Name                          
                          </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ currentItem.center_code }} - {{ currentItem.center_name }}</p>
                        </td>

                      </tr>
                   </table>
        
                  <br />
                  <table>
                    <tr>
                      <th  width="1000" align="left" >
                        <h3 style="margin-left:10px; margin-right:0px;">
                          Subject Code & Title                          
                        </h3>
                      </th>
                    </tr>
                  </table>
                  <br>

                     <table class="b" style="margin-left:0px; margin-right:0px;" >
                      <tr v-for="item in currentItem.details" :key="item.paper_code">
                        <th class="a" width="500" align="left" >
                          <h3 style="margin-left:10px; margin-right:0px;">
                            {{ item.paper_code }}                         
                         </h3>
                        </th>
                        <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
                          <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{ item.paper_name }}</p>
                        </td>

                      </tr>
                      
                   </table>
         
                </v-container>
              </div>
            </template>
          </v-container>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { baseURL } from "@/store/api";
export default {
  props: ["dialogStatus", "currentItem"],
  data: () => ({
    dialog: false,
  }),

  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {},
  methods: {
    close() {
      this.$emit("update:dialogStatus", false);
    },
    getQrCodeUrl(url) {
      if (url == undefined) {
        return baseURL;
      } else return baseURL + url;
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
.whole-border {
  flex-wrap: wrap;
  padding-top: 1px;
  padding-left: 1px;
  box-sizing: border-box;

  margin: auto;
  box-shadow: inset 0 0 0 1px #8c8c8c;
}
.catalog-list {
  flex-wrap: wrap;
  padding-top: 1px;
  padding-left: 1px;
  box-sizing: border-box;

  margin: auto;
  box-shadow: inset 0 0 0 1px #8c8c8c;
}
.a {
  border: 1px solid black;
}
.b{
  border-collapse: collapse;
}
</style>
