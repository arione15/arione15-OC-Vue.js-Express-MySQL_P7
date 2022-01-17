<template>
  <v-app id="inspire" app>
    <h2 class="text-center">Posts</h2>
    <v-row v-for="post of posts" class="post" :key="post.id">
      <v-col cols="10">

        <!-- <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
        </v-system-bar>-->

        <v-navigation-drawer v-model="drawer">
          <v-sheet color="grey lighten-4" class="pa-4">
            <v-avatar class="mb-4" color="grey darken-1" size="64">
              <img :src="post.User.photoUrl" alt="Avatar" />
            </v-avatar>
            <div>{{ post.User.firstName }}{{ post.User.familyName }}</div>
            <div>{{ new Date(post.createdAt).toString().substring(0, 24) }}</div>
          </v-sheet>

          <v-divider></v-divider>

          <v-list>
            <v-btn color="#FD2D01" dark :to="{ name: 'Post', params: { postId: post.id } }">View Post</v-btn>
            <v-btn color="#FD2D01" dark :to="{ name: 'Profil', params: { id: post.User.id } }">View Profil</v-btn>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-container class="py-8 px-6" fluid>
            <v-row>
              <v-col>
                <v-card outlined class="mx-auto" height="100%">
                  <v-img class="white--text align-end album-image" height="200px" width="200px" :src="post.attachmentUrl"></v-img>
                  <v-card-title>{{ post.title }}</v-card-title>

                  <v-card-text class="text--primary">
                    <div>{{ post.content }}</div>
                    <!-- <youtube :video-id="post.youtubeId"></youtube> -->
                  </v-card-text>
                  <div>
                    <v-btn class="ma-2" text icon color="blue lighten-2" @click="likePost(post.id)" >
                      <span  class="material-icons green-color">thumb_up</span>
                    </v-btn>
                      <!-- <span v-for="like in post.Likes" :key="like.id"></span>
                       <span v-else class="material-icons">thumb_up</span>
                       <span v-else class="material-icons green-color">thumb_up</span>
                       <span class="material-icons teal-color"> thumb_up</span>
                  -->
  
                  <div class="card p-3 mt-2">
                    <div>
                      <h3>Commentaires</h3>
                      <form action class>
                        <v-row>
                          <v-col>
                            <div class="d-flex panel-footer form-group">
                              <v-text-field required :rules="rules.required" label="Comment" v-model="message" multi-line></v-text-field>
                              <v-btn color="light-blue" dark @click="publishComment(post.id)">Ajouter votre commentaire !!</v-btn>
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col v-for="comment of post.Comments" :key="comment.id">
                            <div class="d-flex align-items-start flex-column form-group">
                              <v-img
                                class="white--text align-end avatar-image"
                                :src="comment.User.photoUrl"
                              ></v-img>
                              <span>{{ comment.User.firstName }}{{ comment.User.familyName }}</span>
                              <div>{{ comment.message }}</div>
                            </div>
                          </v-col>
                        </v-row>
                      </form>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>



<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
import CommentService from "../services/CommentService.js";
import LikeService from "../services/LikeService.js";

//import axios from "axios";

export default {
  components: {
    // Panel
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
      
      //console.log("1xx", this.posts);
      //console.log("2xx", this.likes);

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

