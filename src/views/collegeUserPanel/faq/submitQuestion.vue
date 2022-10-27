<template>
  <v-container fluid fill-weight>
    <template>
      <v-layout justify-center>
        <v-flex xs12 md12>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Frequently Asked Questions</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card>
            <v-layout row wrap>
                <v-flex md12>
                    <v-form style="padding-left: 20px;padding-right: 20px;">
                        <v-layout row wrap>
                            <!--
                            <v-flex md12>
                                <v-select
                                    name="question_type"
                                    label="Select Question Type"
                                    v-model="form.data.question_type"
                                    :items="getQuestionTypeList"
                                    item-text="type_name"
                                    item-value="type_id"
                                    id="question_type"
                                    data-vv-name="question_type"
                                    required
                                    prepend-icon="subject"
                                    clearable
                                ></v-select>
                            </v-flex>
                            -->
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                v-model="form.data.question"
                                name="question"
                                label="Question"
                                type="text"
                                data-vv-name="question"
                                prepend-icon="edit"
                                required
                                v-validate="'required'"
                                :error-messages="errors.collect('question')"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout justify-left row fill-height wrap>
                            <v-flex xs12 sm12 md12>
                                <v-btn color="primary" large 
                                @click.stop.prevent="validationForm()">
                                    Submit
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <!--<pre>{{form.data}}</pre> -->
  </v-container>
</template>

<script>
import moment from "moment";

export default {
    $_veeValidate: {
        validator: "new"
    },
  data() {
    return {
      form: {
        data: {
          //question_type: '',  
          question: "",
        },
      },
      dictionary: {
      custom: {
        question: {
          required: () => "Question Field Is Required",
        }
      },
    },
     
    };
  },

  computed: {
    getQuestionTypeList(){
        return [
            {'type_id':1,'type_name':'Form Fillup'}
        ];
    },
    
  },

  methods: {
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
            this.cuSubmitQuestion();
        }
      });
    },
    cuSubmitQuestion(){
      let self = this;
      self.$store
        .dispatch("cuSubmitQuestion", self.form.data)
        .then(function(response) {
            self.$router.push({ path: response.data.path });
        })
        .catch(function(error) {
        console.log(error);
        });
    }, 
    
  },

  created() {
    
  }
};
</script>

<style scoped>
.v-card__title--primary {
  padding-top: 0;
}

.v-card__title {
  padding-bottom: 16px;
}

input {
  margin-left: 30px;
}
</style>
