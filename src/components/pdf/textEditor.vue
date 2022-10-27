<template>
  <v-container fluid>
    <v-card flat>
      <v-card-text>
        <quill-editor
          id="writeQuill"
          v-if="!this.comment"
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-validate="'required'"
          :error-messages="errors.collect('content')"
          data-vv-name="content"
          required
        />
        <!-- for result approval flow comment show -->
        <quill-editor
          id="commntQuill"
          v-if="this.comment"
          v-model="note"
          ref="mycommentQuillEditor"
          :options="editOption"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
export default {
  props: ["comment", "notevalue"],
  components: {
    quillEditor
  },
  data() {
    return {
      dictionary: {
        custom: {
          content: {
            required: () => "Select w...."
          }
        }
      },
      note: "",
      content: "",
      editorOption: {
        debug: "info",
        placeholder: "Type your post...",
        theme: "snow"
      },
      editOption: {
        //for result approval flow comment show
        modules: { toolbar: false },
        //debug: "info",
        placeholder: "Type your post...",
        readOnly: true,
        theme: "snow"
      },
      delta: undefined
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    content(val) {
      //this.delta = this.$refs.myQuillEditor.quill.getContents();
      this.delta = val;
      this.$emit("update:notevalue", val); //to hide/show send button
      // console.log("delta watch", this.delta);
    },
    note(val) {
      console.log("hurr", val);
      if (val) {
        this.$refs.mycommentQuillEditor.quill.enable(false);
      }
    }
  },
  created() {
    this.note = this.comment;
    //this.$refs.myQuillEditor.quill.focus();
  },
  methods: {
    focusQ() {
      this.$refs.myQuillEditor.quill.focus();
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    }
  }
};
</script>
<style>
#commntQuill .ql-editor {
  height: 10vh;
  font-size: 1.5em;
}
#writeQuill .ql-editor {
  height: 30vh;
  font-size: 1.5em;
  overflow-y: auto;
  white-space: normal;
}
</style>
