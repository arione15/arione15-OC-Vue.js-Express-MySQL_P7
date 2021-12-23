<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="New post">
        <v-text-field required :rules="rules.required" label="Auteur" v-model="post.userId"></v-text-field>
        <v-text-field required :rules="rules.required" label="Titre" v-model="post.title"></v-text-field>
        <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line></v-text-field>
        <v-text-field label="Image" v-model="post.attachmentUrl"></v-text-field>
        <v-text-field required :rules="rules.required" label="Date de création du post" v-model="post.createdAt"></v-text-field>
      </panel>
      <div class="danger-alert" v-if="error"> {{ error }} </div>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>-->
    <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field>
    <v-btn color="#FD2D01" dark @click="create">Postez !!</v-btn>
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
        error: null,
        message: ""
      },
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      }
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object
        .keys(this.post)
        .every(key => !!this.post[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Veuillez remplir tous les champs !'
        return
      }
      try {
        const response = await PostService.createPost(this.post);
        this.$router.push({ name: "Posts" });
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.error;
      }
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

