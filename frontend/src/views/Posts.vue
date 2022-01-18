<template>
  <v-app id="inspire" app>
    <h2 class="text-center">Partagez votre post !</h2>

<!-- <v-container class="my-5"> -->
    <v-row>
      <v-col cols="10">
        <div class="container">
          <div class="card">
            <div class="card-body">
              <form action class>
                <div class="d-flex align-items-start flex-column form-group">
                  <v-text-field required :rules="rules.required" label="Titre" v-model="post.title">Ajoutez un titre</v-text-field>
                  <v-text-field required :rules="rules.required" label="Contenu" v-model="post.content" multi-line>Ajoutez un texte</v-text-field>
                  <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                  <input name="image" type="file" v-on:change="selectedFile($event)" />
                  <v-text-field label="YoutubeID" v-model="post.youtubeId">Ajoutez une vidéo</v-text-field>
                </div>
                <div class="d-flex panel-footer form-group">
                  <v-btn color="light-green" dark @click="publishPost()">Créez votre post !!</v-btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- </v-container> -->
    <!-- <v-row v-for="post of posts" class="post" :key="post.id"> -->
    <v-row >
      <v-col cols="10">

      <post v-for="post of posts" class="post" @likePost="likePost(post.id)" :post="post" :key="post.id">
        <template v-slot:publishComment>




          <!-- <create-comment :message="message" v-on:comment-sent="updateCommentBody"> -->
          <v-text-field label="commenter" v-model="message"></v-text-field>
          <v-btn color="green" type="submit" v-on:click.prevent="publishComment(post.id, message)" dark class="mb-5">Envoyer</v-btn>
          <!-- </create-comment> -->
        </template>

        <template v-slot:likes>{{ post.Likes.length }}</template>
      </post>

      </v-col>
    </v-row>
  </v-app>
</template>



<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";
import Post from "../components/Post.vue";
//import CreateComment from "../components/CreateComment.vue";
//import AddPost from "../components/AddPost.vue";

export default {
  name: "Posts",
  components: {
    Post,
    //CreateComment
  },
  data() {
    return {
      posts: {},
      post: {
        title: "",
        content: "",
        attachmentUrl: "",
        youtubeId: "",
        userId: ""
      },
      //videoId: "",
      comments: {},
      message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'View Post'],
        ['mdi-send', 'View Profil'],
        // ['mdi-delete', 'Trash'],
        // ['mdi-alert-octagon', 'Spam'],
      ],
      likes:{},
    };
  },
  methods: {
    async publishPost() {
      this.error = null;
      // const areAllFieldsFilledIn = Object.keys(this.post).every(key => !!this.post[key])
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Veuillez remplir tous les champs !'
      //   return
      // }

      try {
        const formData = new FormData();
        if (this.post.attachmentUrl || this.post.content) {
          formData.append("image", this.post.attachmentUrl);
          formData.append("title", this.post.title);
          formData.append("content", this.post.content);
          formData.append("youtubeId", this.post.youtubeId);
          await PostService.createPost(formData);
          this.get();
          this.post.title = "";
          this.post.content = "";
          this.post.attachmentUrl = "";
          this.post.youtubeId = "";
          this.post.userId = "";
          //this.$router.push({ name: "Posts" });
        }
        else {
          console.log("please select a file or enter text");
        }
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    selectedFile(event) {
      this.post.attachmentUrl = event.target.files[0];
    },
    async get() {
      this.posts = (await PostService.getAllPosts()).data;
      
      console.log("posts", this.posts);
      //console.log("likes", this.likes);

    },
    async publishComment(id, message) { // id du post et message preovenant de updateBody
      try {
        if (message) {
          await CommentService.createComment(id, message);
          this.get();
          this.message="";
        }
        else {
          console.log("please select a file or enter text");
        }
      } catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },
async likePost(id){
  try{
    await LikeService.createLike(id);
    this.get();
        console.log("11111like", id);
    
  }catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
},
// updateCommentBody(data){ //fonction qui stocke la valeur de l'input provenant de l'enfant
// //this.message="";
// this.message=data.message;
// console.log(this.message);
// //data.message="";
// }

  },
  created() {
    document.cookie = "snToken" + "=" + sessionStorage.getItem("token") + ";" + 24 * 60 * 60 * 1000 + ";path=/"
  },
  mounted() {
    // try {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
  .green-color {
        color:green;
    }
</style>

