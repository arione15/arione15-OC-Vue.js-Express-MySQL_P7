<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="New post">
        <v-text-field required :rules="rules.required" label="Auteur" v-model="post.userId"></v-text-field>
        <v-text-field required :rules="rules.required" label="Titre" v-model="post.title"></v-text-field>
        <v-text-field
          required
          :rules="rules.required"
          label="Contenu"
          v-model="post.content"
          multi-line
        ></v-text-field>


        <!-- <v-btn color="success" @click="$refs.inputUpload.click()">Success</v-btn>
<input v-show="false" ref="inputUpload" type="file" @change="yourFunction" >
 -->

        <input name="image"
          type="file"
          v-on:change="selectedFile($event)"
        >

        <!-- <v-text-field label="Image" v-model="post.attachmentUrl"></v-text-field> -->
        <v-text-field
          required
          :rules="rules.required"
          label="Date de création du post"
          v-model="post.createdAt"
        ></v-text-field>
      </panel>
      <div class="danger-alert" v-if="error">{{ error }}</div>
    </v-flex>
    <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>
    <!-- <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field> -->
    <v-btn color="#FD2D01" dark @click="create">Créez votre post !!</v-btn>
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import PostService from "../services/PostService.js";

export default {
  components: {
    Panel
  },
  data() {
    return {
      post: {
        userId: '',
        title: null,
        content: null,
        attachmentUrl: null,
        createdAt: null,
      },
      //message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async create() {
      this.error = null;
      // const areAllFieldsFilledIn = Object.keys(this.post).every(key => !!this.post[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Veuillez remplir tous les champs !'
      //   return
      // }
     // console.log(this.post);

      try {
        const formData = new FormData(); 
        if (this.post.attachmentUrl || this.post.content) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("userId", this.post.userId);
          formData.append("createdAt", this.post.createdAt);
          formData.append("content", this.post.content);
          await PostService.createPost(formData);
          this.$router.push({ name: "Posts" });
          //console.log(formData);
        }
        else {
          console.log("please select a file or enter text");
        }
        //await PostService.createPost(this.post);
        //this.message = response.data.message;
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0]; 
      //console.log(this.post.attachmentUrl);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
  color: red;
}
</style> 

