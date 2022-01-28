<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="New post">
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
        
      </panel>
      <v-alert type="error" v-if="err">{{ err }}</v-alert>
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
      err: "",
      rules: {
      required: [value => !!value || "Ce champs est requis.."]
      },
    };
  },
  methods: {
    async save () {
      this.error = null
      this.message = ""
      const postId = this.$store.state.route.params.postId;
      const userId= this.post.UserId; 
      const title= this.post.title; 
      const content= this.post.content; 
      const createdAt= this.post.createdAt;
      const newPost = {userId: userId, title: title, content: content, createdAt: createdAt};
      console.log(newPost);
      try {
        if(this.post.title == "" || this.post.content == ""){
          this.err="Rensigner les champs !"
        }else{
          await PostService.updatePost(postId, newPost)
          this.$router.push({
            name: 'Post',
            params: {
              postId: postId
            }
          });
        }
      }  catch (error) {
          this.err = error.response.data.message;
            setInterval(()=>{
            this.err=""
          }, 2000)
    }
    },
    async selectedFile(event) {
      let postId = this.$store.state.route.params.postId
      this.post.attachmentUrl = event.target.files[0]; 
      const formData = new FormData();
      console.log("name",this.post.attachmentUrl);
      formData.append("image", this.post.attachmentUrl);
      
      try {
        await PostService.updatePost(postId, formData)
      } catch (error) {
          this.err = error.response.data.message;
      }
    }
  },
  async mounted () {
    try {
      let postId = this.$store.state.route.params.postId
      this.post = (await PostService.getOnePost(postId)).data
    } catch (error) {
          this.err = error.response.data.message;
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

