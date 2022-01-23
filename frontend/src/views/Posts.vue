<template>
  <v-layout>
    <v-container d-flex flex-column justify-center>

      <panel title="Partager votre post !">
        <form name="register-form" autocomplete="off" enctype="multipart/form-data">
          <v-text-field label="Titre" v-model="post.title"></v-text-field>
          <v-text-field label="Contenu" v-model="post.content" multi-line></v-text-field>
          <img class="d-block" src="https://img.icons8.com/ios-filled/50/000000/attach-resume-male.png" />
          <input class="d-block btn-upload" name="image" type="file" v-on:change="selectedFile($event)" placeholder="Ajoutez une imagr">
          <!-- <v-text-field label="YoutubeID" v-model="post.youtubeId"></v-text-field> -->
        </form>
        <!-- <v-text-field class="red--text text--darken-1" v-html="error"></v-text-field>
        <v-text-field class="green--text text--darken-1" v-html="message"></v-text-field> -->
        <v-btn class="mt-10" color="#FD2D01" dark type="submit" @click="publishPost">Postez !</v-btn>
      </panel>

      <panel title="Forum">
        <v-row >
          <v-col>

            <post v-for="post in posts" v-on:likePost="likePost(post.id)" class="post" :post="post" :key="post.id">
              
              <template v-slot:delPost v-if="post.User.id === $store.state.user.id || $store.state.user.role === '1'">
                <v-list-item @click="removePost(post.id)">
                  <v-list-item-title>Supprimer le post</v-list-item-title>
                </v-list-item>
              </template>

              <template v-slot:publishComment>
                <!-- <create-comment :message="message" v-on:comment-sent="updateCommentBody"> -->
                <v-text-field label="commenter" v-model="message"></v-text-field>
                <v-btn color="green" type="submit" v-on:click.prevent="publishComment(post.id, message)" dark class="mb-5">Commentez !</v-btn>
                <!-- </create-comment> -->
              </template>
              <template v-slot:likes>{{ post.Likes.length }}</template>
            </post>

          </v-col>
        </v-row>
      </panel>
    </v-container>
  </v-layout>
</template>



<script>
import Panel from '../components/Panel'
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
    Panel
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
      user: {}
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
async removePost(id){
      await PostService.deletePost(id);
      const indexPost = this.posts.map(element=>{ // calculer les indices des éléménts puis les comparer avec le id en paramètre : si correspondance, la fonction retourne la valeur de l'index correspondant
        return element.id;}).indexOf(id);
        this.posts.splice(indexPost, 1);
    
  },
  },
  created() {
    document.cookie = "snToken" + "=" + sessionStorage.getItem("token") + ";" + 24 * 60 * 60 * 1000 + ";path=/"
  },
  async mounted() {
    // try {
    this.get();
    console.log("v-if user.id", this.$store.state.user.role)
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

