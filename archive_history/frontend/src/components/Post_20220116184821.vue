<template>
  <v-container class="d-flex flex-column pa-2">
    <v-row justify="space-around">
      <v-card width="400">
      

    <v-app-bar color="light-blue accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-card-title class="white--text mt-8">
            <span class="ml-3 red">{{ post.User.firstName }} {{ post.User.familyName }}</span>
            <!-- <span class="ml-3 red">{{ post.createdAt }}</span> -->
            <v-avatar size="56">
              <img alt="user" :src="post.User.photoUrl">
            </v-avatar>
    </v-card-title>
      <v-btn icon>
<span class="material-icons" @click="likePost(post.id)">thumb_up</span>
      </v-btn>
<span class="compteur">{{ nbreLike }}</span>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
<span class="material-icons">more_vert</span> 
        </v-btn>
        </template>

        <v-list>
          <v-list-item :to="{ name: 'Post', params: { postId: post.id } }">
            <v-list-item-title>View Post</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Profil', params: { id: post.User.id } }">
            <v-list-item-title>View Profil</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

                  <v-card-text class="yellow">{{ post.title }}</v-card-text>
                  <v-img class="white--text align-end album-image" max-width="400px" max-height="200px" :src="post.attachmentUrl"></v-img>
                    <div>{{ post.content }}</div>
                  <!-- <youtube :video-id="post.youtubeId" player-width="400" player-height="287"></youtube> -->
<v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Today</div>
          <v-timeline align-top dense>
            <v-timeline-item v-for="comment in post.Comments" :key="comment.id" small>
              <div>
                <div class="font-weight-normal">
                  <strong>{{ comment.User.firstName }} {{ comment.User.familyName }}</strong> @{{ comment.createdAt }}
                </div>
                <div>{{ comment.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
  </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";

export default {
  name: "Post",
  components: {

  },
  props: {
    post: {
      type: Object
      } 
  },
  data() {
    return {
      comments: {},
      message: "",
      error: null,
      rules: {
        required: [value => !!value || "Ce champs est requis.."]
      },
      likes:[],
      nbreLike: 0,
      isLiked: false,
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
      //console.log("posts", this.posts);
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
    this.get();
        console.log("11111like", id);
    
  }catch (err) {
        console.log(err);
        //this.error = err.response.data.error;
      }
},
ifLiked(){
this.likes = this.post.Likes.map(like => {

})
}
},
mounted() {
    // try {
      this.nbreLike=this.post.Likes.length;
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
    .madiv{
      width: 30px;
      height: 100px;
      background-color: blue;
    }
</style>

