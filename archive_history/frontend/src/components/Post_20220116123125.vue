<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
     

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="user" :src="post.User.photoUrl">
            </v-avatar>
            <p class="ml-3 red">{{ post.User.firstName }}{{ post.User.familyName }}</p>
          </v-card-title>

                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-img class="white--text align-end album-image" :src="post.attachmentUrl"></v-img>
                    <div>{{ post.content }}</div>
                    <youtube :video-id="post.youtubeId" player-width="400" player-height="287"></youtube>

                  <v-card-text class="text--primary">
                   </v-card-text>


        <v-card-text>
          <!-- <div class="font-weight-bold ml-8 mb-2">Today</div> -->

          <v-timeline align-top dense>
            <v-timeline-item v-for="comment in comments" :key="comment.id" small>
              <div>
                <div class="font-weight-normal">
                  <strong>{{ comment.User.firstName }}{{ comment.User.familyName }}</strong> @{{ comment.createdAt }}
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
      
      console.log("1xx", this.post);
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

