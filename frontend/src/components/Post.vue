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
              <img alt="user" :src="post.User.photoUrl" />
            </v-avatar>
          </v-card-title>
          
          <!-- <v-btn icon>
            <span v-if="ifLiked" class="material-icons" @click="likePost(post.id)">thumb_up</span>
            <span v-else class="material-icons" @click="likePost(post.id)">thumb_up</span>
          </v-btn> -->

<v-btn icon><v-icon v-if="ifLiked" color="green" @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
              <v-icon v-else @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
            </v-btn>

         <slot name="likes" />

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
        <v-img
          class="white--text align-end album-image"
          max-width="400px"
          max-height="200px"
          :src="post.attachmentUrl"
        ></v-img>
        <div>{{ post.content }}</div>
        <!-- <youtube :video-id="post.youtubeId" player-width="400" player-height="287"></youtube> -->



        <v-card-text>
          <div class="row">
            <div class="col-12">
          <slot name="publishComment"></slot></div></div>
          <div class="font-weight-bold ml-8 mb-2">Today</div>
          <div>
            <div v-for="comment in post.Comments" :key="comment.id" small>
              <div>
                <div class="font-weight-normal">
                  <strong>{{ comment.User.firstName }} {{ comment.User.familyName }}</strong>
                  @{{ comment.createdAt }}
                </div>
                <div>{{ comment.message }}</div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
//import CommentService from "../services/CommentService.js";
//import LikeService from "../services/LikeService.js";

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
      likes: [],
      nbreLike: 0,
      isLiked: false,
    };
  },
 computed: {
    ifLiked() {
      if (this.post.Likes.map((like) => like.UserId).includes(this.$store.state.user.id)) {
        return true;
      } else {
        return false;
      }
    },
  },
    methods: {
      async get() {
        this.posts = (await PostService.getAllPosts()).data;
        //console.log("posts", this.posts);
      },
      publishComment() {
        this.$emit("publishComment", this.post.id)
      },
      dateFormat(date) {
        const event = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return event.toLocaleDateString('fr-FR', options);
      },
      likePost() {
        this.$emit("likePost", this.post.id); //envoi de la fonction likePost au parent
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-image {
  width: 10%;
  /* margin: auto; */
}
.green-color {
  background-color: green;
}
.madiv {
  width: 30px;
  height: 100px;
  background-color: blue;
}
i.v-icon.v-icon {
  color: green;
} 
</style>

