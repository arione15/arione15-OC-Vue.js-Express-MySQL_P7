<template>
      <panel title="New post">
          <form name="editPost-form" autocomplete="off" enctype="multipart/form-data">

        <v-text-field required :rules="rules.required" label="Titre" v-model="post.title"></v-text-field>
        <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line></v-text-field>

        <div class="d-flex  justify-start mb-5">
          <label for="files" class="label-file">Choisissez votre fichier </label>
          <span class="file-name"></span>
          <input type="file" id="files" v-on:change="selectedFile($event)" accept="image/png, image/jpeg, image/bmp, image/gif"/>
        </div>
      </form>

      <v-alert type="error" v-if="err">{{ err }}</v-alert>
    <v-btn class="btn green" dark @click="save"><span class="font-btn">Enregistrez</span></v-btn>

      </panel>
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
      formData.append("image", this.post.attachmentUrl);
      const { name: fileName, size } = this.user.photoUrl;
      const fileSize = (size / 1000).toFixed(2);
      const fileNameAndSize = `${fileName} - ${fileSize} KB`;
      document.querySelector('.file-name').textContent = fileNameAndSize;
      
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

