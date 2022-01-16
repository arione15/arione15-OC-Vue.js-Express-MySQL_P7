<template>
  <v-app id="inspire">
    <h2 class="text-center">Posts</h2>
   <add-post> </add-post></add-post>


    <!-- <v-row v-for="post of posts" class="post" :key="post.id"> -->
    <v-row >
      <v-col cols="10">
      <Post v-for="post of posts" class="post" :post="post" :key="post.id" />
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
import AddPost from "../components/AddPost.vue";

export default {
  name: "Posts",
  components: {
    Post,
    AddPost,
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

    async publishComment(id) { 
      try {
        if (this.message) {
          await CommentService.createComment(id, this.message);
          this.get();
          this.message = "";
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
        console.log("11111Message");
    
  }catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
},

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

