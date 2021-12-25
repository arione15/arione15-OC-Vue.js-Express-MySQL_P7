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
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field> -->
    <!-- <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field> -->
    <v-btn color="#FD2D01" dark @click="save">Enregistrez votre post !!</v-btn>
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
      error: null,
      rules: {
      required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async save () {
      this.error = null
      // const areAllFieldsFilledIn = Object
      //   .keys(this.song)
      //   .every(key => !!this.song[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Please fill in all the required fields.'
      //   return
      // }
      const postId = this.$store.state.route.params.postId
      try {
        await PostService.updatePost(this.post)
        this.$router.push({
          name: 'Post',
          params: {
            postId: postId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const postId = this.$store.state.route.params.postId
      this.post = (await PostService.getOnePost(postId)).data.data
    } catch (err) {
      console.log(err)
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

