<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="New post">
        <v-text-field required :rules="rules.required" label="Auteur" v-model="post.userId"></v-text-field>
        <v-text-field required :rules="rules.required" label="Titre" v-model="post.title"></v-text-field>
        <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line></v-text-field>
        <input name="image" type="file" v-on:change="selectedFile($event)">
        <!-- <v-text-field label="Image" v-model="post.attachmentUrl"></v-text-field> -->


        <!-- <v-btn color="success" @click="$refs.inputUpload.click()">Success</v-btn>
<input v-show="false" ref="inputUpload" type="file" @change="yourFunction" >
 -->
        <v-text-field required :rules="rules.required" label="Date de création du post" v-model="post.createdAt"></v-text-field>
      </panel>
      <div class="danger-alert" v-if="err">{{ err }}</div>
    </v-flex>
    <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>
    <!-- <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field> -->
    <v-btn color="#FD2D01" dark @click="create">Créez votre post !!</v-btn>
  </v-layout>
</template>

<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";

export default {
  components: {
    //Panel
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
      err: "",
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async create() {
      this.error = null;

      try {
        const formData = new FormData(); 
        if (this.post.attachmentUrl || this.post.content || this.post.title) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("content", this.post.content);
          await PostService.createPost(formData);
          this.$router.push({ name: "Posts" });
        }
        else {
          this.err= "Choisissez un fichier ou entrez un texte !";
        }
      } catch (error) {
          this.err = error.response.data.message;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0]; 
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

