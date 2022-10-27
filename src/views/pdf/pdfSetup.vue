<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title class="headline">PDF Settings</v-card-title>
      <!-- {{ getPDFSetupItem }} -->
    </v-card>
    <v-card>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 offset-sm0>
          <v-card class="pl-3">
            <v-card-title class="headline">Admit Card</v-card-title>
            <v-layout row wrap align-center>
              <textEditor ref="texteditor"></textEditor>
              <v-flex xs12 md4 lg6>
                <v-text-field
                  class="ml-2 mr-2"
                  name="sealName"
                  label="Seal Name"
                  v-model="admitcard_seal_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('admitcard_seal_name')"
                  data-vv-name="admitcard_seal_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
                lg6
                class="text-xs-center text-md-center text-lg-center"
              >
                <v-layout row wrap align-center>
                  <v-flex>
                    <img
                      :src="admitcard_imageUrl"
                      height="150"
                      width="160"
                      v-if="admitcard_imageUrl"
                    />
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      class="mt-5 ml-2"
                      name="image"
                      label="Upload Your Image "
                      @click="$refs.inputUpload1.click()"
                      append-icon="attach_file"
                      outline
                      v-model="admitcard_imageName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-btn fab flat>
                      <v-icon
                        fab
                        large
                        color="success"
                        @click="$refs.inputUpload1.click()"
                        >cloud_upload</v-icon
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
                <input
                  v-show="false"
                  ref="inputUpload1"
                  type="file"
                  accept="image/*"
                  @click="$refs.inputUpload1.value = null"
                  @change="onFilePicked1($event)"
                />
              </v-flex>
            </v-layout>
            <v-flex xs12 sm12 md12 class="pr-3 mr-3">
              <v-layout justify-center row fill-height align-center>
                <v-spacer></v-spacer>

                <v-btn color="primary" @click="admitCardSetting()" dark
                  >Submit</v-btn
                >
                <v-btn color="red" @click="admitCardCancel()" dark
                  >Cancel</v-btn
                >
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-spacer class="ma-4"></v-spacer>
    <v-card>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 offset-sm0>
          <v-card class="pl-3">
            <v-card-title class="headline">Marksheet</v-card-title>
            <v-layout row wrap align-center>
              <v-flex xs12 md4 lg6>
                <v-text-field
                  class="ml-2 mr-2"
                  name="sealName"
                  label="Seal Name"
                  v-model="marksheet_seal_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('marksheet_seal_name')"
                  data-vv-name="marksheet_seal_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
                lg6
                class="text-xs-center text-md-center text-lg-center"
              >
                <v-layout row wrap align-center>
                  <v-flex>
                    <img
                      :src="marksheet_imageUrl"
                      height="150"
                      width="160"
                      v-if="marksheet_imageUrl"
                    />
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      class="mt-5 ml-2"
                      name="image2"
                      label="Upload Your Image "
                      @click="$refs.inputUpload2.click()"
                      append-icon="attach_file"
                      outline
                      v-model="marksheet_imageName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-btn fab flat>
                      <v-icon
                        fab
                        large
                        color="success"
                        @click="$refs.inputUpload2.click()"
                        >cloud_upload</v-icon
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
                <input
                  v-show="false"
                  ref="inputUpload2"
                  type="file"
                  accept="image/*"
                  @click="$refs.inputUpload2.value = null"
                  @change="onFilePicked2"
                />
              </v-flex>
            </v-layout>
            <v-flex xs12 sm12 md12 class="pr-3 mr-3">
              <v-layout justify-center row fill-height align-center>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="marksheetSetting()" dark
                  >Submit</v-btn
                >
                <v-btn color="red" @click="marksheetCancel()" dark
                  >Cancel</v-btn
                >
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-spacer class="ma-4"></v-spacer>
    <v-card>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 offset-sm0>
          <v-card class="pl-3">
            <v-card-title class="headline">Certificate</v-card-title>
            <v-layout row wrap align-center>
              <v-flex xs12 md4 lg6>
                <v-text-field
                  class="ml-2 mr-2"
                  name="sealName"
                  label="Seal Name"
                  v-model="certificate_seal_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('certificate_seal_name')"
                  data-vv-name="certificate_seal_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
                lg6
                class="text-xs-center text-md-center text-lg-center"
              >
                <v-layout row wrap align-center>
                  <v-flex>
                    <img
                      :src="certificate_imageUrl"
                      height="150"
                      width="160"
                      v-if="certificate_imageUrl"
                    />
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      class="mt-5 ml-2"
                      name="image3"
                      label="Upload Your Image "
                      @click="$refs.inputUpload3.click()"
                      append-icon="attach_file"
                      outline
                      v-model="certificate_imageName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-btn fab flat>
                      <v-icon
                        fab
                        large
                        color="success"
                        @click="$refs.inputUpload3.click()"
                        >cloud_upload</v-icon
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
                <input
                  v-show="false"
                  ref="inputUpload3"
                  type="file"
                  accept="image/*"
                  @change="onFilePicked3"
                  @click="$refs.inputUpload3.value = null"
                />
              </v-flex>
            </v-layout>
            <v-flex xs12 sm12 md12 class="pr-3 mr-3">
              <v-layout justify-center row fill-height align-center>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="certificateSetting()" dark
                  >Submit</v-btn
                >
                <v-btn color="red" @click="certificateCancel()" dark
                  >Cancel</v-btn
                >
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-spacer class="ma-4"></v-spacer>
    <v-card>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 offset-sm0>
          <v-card class="pl-3">
            <v-card-title class="headline">Transcript</v-card-title>
            <v-layout row wrap align-center>
              <v-flex xs12 md4 lg6>
                <v-text-field
                  class="ml-2 mr-2"
                  name="sealName"
                  label="Seal Name"
                  v-model="transcript_seal_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('transcript_seal_name')"
                  data-vv-name="transcript_seal_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
                lg6
                class="text-xs-center text-md-center text-lg-center"
              >
                <v-layout row wrap align-center>
                  <!-- {{transcript_imageUrl}} -->
                  <v-flex>
                    <img
                      :src="transcript_imageUrl"
                      height="150"
                      width="160"
                      v-if="transcript_imageUrl"
                    />
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      class="mt-5 ml-2"
                      name="image4"
                      label="Upload Your Image "
                      @click="$refs.inputUpload4.click()"
                      append-icon="attach_file"
                      outline
                      v-model="transcript_imageName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-btn fab flat>
                      <v-icon
                        fab
                        large
                        color="success"
                        @click="$refs.inputUpload4.click()"
                        >cloud_upload</v-icon
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
                <input
                  v-show="false"
                  ref="inputUpload4"
                  type="file"
                  accept="image/*"
                  @change="onFilePicked4"
                  @click="$refs.inputUpload4.value = null"
                />
              </v-flex>
            </v-layout>
            <v-flex xs12 sm12 md12 class="pr-3 mr-3">
              <v-layout justify-center row fill-height align-center>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="transcriptSetting()" dark
                  >Submit</v-btn
                >
                <v-btn color="red" @click="transcriptCancel()" dark
                  >Cancel</v-btn
                >
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import textEditor from "@/components/pdf/textEditor.vue";
import { baseURLPdf } from "@/store/api";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: { textEditor },
  data() {
    return {
      filechanged: false,
      val: "",
      admitImage: "",
      markImage: "",
      certificateImage: "",
      transcriptImage: "",
      admitcard_seal_name: "",
      admitcard_imageName: "",
      admitcard_imageUrl: "",
      admitcard_imageFile: "",

      marksheet_seal_name: "",
      marksheet_imageName: "",
      marksheet_imageUrl: "",
      marksheet_imageFile: "",

      certificate_seal_name: "",
      certificate_imageName: "",
      certificate_imageUrl: "",
      certificate_imageFile: "",

      transcript_seal_name: "",
      transcript_imageName: "",
      transcript_imageUrl: "",
      transcript_imageFile: "",

      dictionary: {
        custom: {
          exam_code: {
            required: () => "Select Exam "
          },
          admitcard_seal_name: {
            required: () => "Seal no. field can not be empty "
          },
          marksheet_seal_name: {
            required: () => "Seal no. field can not be empty "
          },
          certificate_seal_name: {
            required: () => "Seal no. field can not be empty "
          },
          transcript_seal_name: {
            required: () => "Seal no. field can not be empty "
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    var self = this;
    this.$store.dispatch("fetchPDFSetupData").then(function() {
      self.setSettingData();
    });
  },
  computed: {
    getPDFSetupItem() {
      return this.$store.getters.getPDFSetupItem;
    }
  },
  methods: {
    setSettingData() {
      this.getPDFSetupItem.forEach(element => {
        if (element.type == "0") {
          this.admitcard_seal_name = element.name;
          this.admitcard_imageName = element.image;
          this.admitcard_imageUrl = baseURLPdf + element.image;
          this.admitcard_imageFile = element.image;
          this.$refs.texteditor.content = element.note;
          this.admitImage = element.image;
        }
        if (element.type == "1") {
          this.marksheet_seal_name = element.name;
          this.marksheet_imageName = element.image;
          this.marksheet_imageUrl = baseURLPdf + element.image;
          this.marksheet_imageFile = element.image;
          this.markImage = element.image;
        }
        if (element.type == "2") {
          this.certificate_seal_name = element.name;
          this.certificate_imageName = element.image;
          this.certificate_imageUrl = baseURLPdf + element.image;
          this.certificate_imageFile = element.image;
          this.certificateImage = element.image;
        }
        if (element.type == "3") {
          //
          this.transcript_seal_name = element.name;
          this.transcript_imageName = element.image;
          this.transcript_imageUrl = baseURLPdf + element.image;
          this.transcript_imageFile = element.image;
          this.transcriptImage = element.image;
        }
      });
    },
    onFilePicked1(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.admitcard_imageName = files[0].name;
        // // console.log("before", files[0]);
        if (this.admitcard_imageName.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.admitcard_imageUrl = fr.result;
          this.admitcard_imageFile = files[0]; // this is an image file that can be sent to server...
          // // console.log("after", this.admitcard_imageFile);
          this.filechanged = true;
        });
      } else {
        this.admitCardCancel();
      }
    },
    onFilePicked2(e) {
      // // console.log(e.target.files);
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.marksheet_imageName = files[0].name;
        if (this.marksheet_imageName.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.onload = e => {
          this.marksheet_imageUrl = fr.result;
          this.marksheet_imageFile = files[0]; // this is an image file that can be sent to server...
        };
      } else {
        this.marksheetCancel();
      }
    },
    onFilePicked3(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.certificate_imageName = files[0].name;
        if (this.certificate_imageName.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.certificate_imageUrl = fr.result;
          this.certificate_imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.certificateCancel();
      }
    },
    onFilePicked4(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.transcript_imageName = files[0].name;
        if (this.transcript_imageName.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.transcript_imageUrl = fr.result;
          this.transcript_imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.transcriptCancel();
      }
    },
    admitCardSetting() {
      let formData = new FormData();
      formData.append("name", this.admitcard_seal_name);
      formData.append("seal_no", 0);
      formData.append("designation", this.admitcard_seal_name);
      formData.append("type", 0); // 0 for admit card
      formData.append("note", this.$refs.texteditor.delta);
      // if (this.filechanged) {
      formData.append("image", this.admitcard_imageFile);
      // } else {
      //   formData.append("image", "");
      // }
      //console.log("form data ", formData.get("image"));
      var self = this;
      this.$store
        .dispatch("savePDFSetupData", formData)
        .then(() => {
          self.$store.dispatch("fetchPDFSetupData");
          self.filechanged = false;
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchPDFSetupData");
        });
      // console.log("here ?? form data -->", formData.get("file"));
      // console.log("admitcard_seal_name: ", this.admitcard_seal_no);
      // console.log("admitcard_imageFile: ", this.admitcard_imageFile);
    },

    marksheetSetting() {
      let formData = new FormData();
      formData.append("name", this.marksheet_seal_name);
      formData.append("seal_no", 0);
      formData.append("designation", this.marksheet_seal_name);
      formData.append("type", 1); // 1 for marksheet
      formData.append("image", this.marksheet_imageFile);
      formData.append("note", "");
      console.log("form data ", formData.get("designation"));

      var self = this;
      this.$store
        .dispatch("savePDFSetupData", formData)
        .then(() => {
          self.$store.dispatch("fetchPDFSetupData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchPDFSetupData");
        });
    },

    certificateSetting() {
      let formData = new FormData();
      formData.append("name", this.certificate_seal_name);
      formData.append("seal_no", 0);
      formData.append("designation", this.certificate_seal_name);
      formData.append("type", 2); // 2 for certificate
      formData.append("image", this.certificate_imageFile);
      formData.append("note", "");
      console.log("form data ", formData.get("note"));

      var self = this;
      this.$store
        .dispatch("savePDFSetupData", formData)
        .then(() => {
          self.$store.dispatch("fetchPDFSetupData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchPDFSetupData");
        });
    },

    transcriptSetting() {
      let formData = new FormData();

      formData.append("name", this.transcript_seal_name);
      formData.append("seal_no", 0);
      formData.append("designation", this.transcript_seal_name);
      formData.append("type", 3); // 3 for transcript
      formData.append("image", this.transcript_imageFile);
      formData.append("note", "");
      var self = this;
      this.$store
        .dispatch("savePDFSetupData", formData)
        .then(() => {
          self.$store.dispatch("fetchPDFSetupData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchPDFSetupData");
        });
    },
    admitCardCancel() {
      this.filechaged = false;
      if (this.admitcard_imageFile != this.admitImage) {
        this.admitcard_imageFile = this.admitImage;
        this.admitcard_imageUrl = this.admitImage;
        this.admitcard_imageName = this.admitImage;
      } else {
        this.admitcard_imageName = "";
        this.admitcard_imageUrl = "";
        this.admitcard_imageFile = "";
      }
    },
    marksheetCancel() {
      this.filechaged = false;
      if (this.marksheet_imageFile != this.markImage) {
        this.marksheet_imageFile = this.markImage;
        this.marksheet_imageUrl = this.markImage;
        this.marksheet_imageName = this.markImage;
      } else {
        this.marksheet_imageName = "";
        this.marksheet_imageFile = "";
        this.marksheet_imageUrl = "";
      }
    },
    certificateCancel() {
      this.filechaged = false;
      if (this.certificate_imageFile != this.certificateImage) {
        this.certificate_imageFile = this.certificateImage;
        this.certificate_imageUrl = this.certificateImage;
        this.certificate_imageName = this.certificateImage;
      } else {
        this.certificate_imageName = "";
        this.certificate_imageFile = "";
        this.certificate_imageUrl = "";
      }
    },
    transcriptCancel() {
      this.filechaged = false;
      if (this.transcript_imageFile != this.transcriptImage) {
        this.transcript_imageFile = this.transcriptImage;
        this.transcript_imageUrl = this.transcriptImage;
        this.transcript_imageName = this.transcriptImage;
      } else {
        this.transcript_imageName = "";
        this.transcript_imageFile = "";
        this.transcript_imageUrl = "";
      }
    }
  }
};
</script>
