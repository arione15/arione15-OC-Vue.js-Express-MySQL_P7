<template>
  <div>
    <v-card class="mt-8 mb-5" width="600px">
      <v-card-text class="light-blue accent-1" dark>
        <v-container pa-0>
          <v-row align="center">
            <v-col cols="4">
              <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                <v-avatar size="56">
                  <img alt="user" :src="post.User.photoUrl" />
                </v-avatar>
                <span class="infoPost">{{ post.User.firstName }} {{ post.User.familyName }}</span>
            </v-col>

            <v-col cols="4" offset="4">
                <v-btn icon>
                  <v-icon v-if="ifLiked" color="green" @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
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
                    <v-list-item
                      :to="{ name: 'Post', params: { postId: post.id } }"
                    >
                      <v-list-item-title>View Post</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      :to="{ name: 'Profil', params: { id: post.User.id } }"
                    >
                      <v-list-item-title>View Profil</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
                <span class="infoPost"
                  >Posté le : {{ dateFormat(post.createdAt) }}</span
                >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card width="600px">
      <v-row justify="space-around" class="d-flex mb-3">
        <v-col cols="6">
          <v-card-text class="yellow">{{ post.title }}</v-card-text>
        </v-col>
      </v-row>

      <v-row justify="space-around" class="d-flex mb-3">
        <v-col>
          <v-img
            class="white--text align-end album-image"
            max-width="600px"
            max-height="200px"
            :src="post.attachmentUrl"
          ></v-img>
        </v-col>
      </v-row>

      <v-row justify="space-around" class="d-flex mb-3">
        <v-col>
          <div>{{ post.content }}</div>
          <!-- <youtube :video-id="post.youtubeId" player-width="400" player-height="287"></youtube> -->
        </v-col>
      </v-row>

      <v-row justify="space-around" class="d-flex mb-3">
        <v-col>
          <v-card-text>
            <div class="row">
              <div class="col-6">
                <slot name="publishComment"></slot>
              </div>
            </div>
            <div>
              <div v-for="comment in post.Comments" :key="comment.id" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ comment.User.firstName }} {{ comment.User.familyName }}</strong>
                    commenté le : {{ comment.createdAt }}
                  </div>
                  <div>{{ comment.message }}</div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
//import Panel from '../components/Panel'
import PostService from "../services/PostService.js";
//import CommentService from "../services/CommentService.js";
//import LikeService from "../services/LikeService.js";

export default {
  name: "Post",
  components: {},
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      comments: {},
      message: "",
      error: null,
      rules: {
        required: [(value) => !!value || "Ce champs est requis.."],
      },
      likes: [],
      nbreLike: 0,
      isLiked: false,
    };
  },
  computed: {
    ifLiked() {
      if (
        this.post.Likes.map((like) => like.UserId).includes(
          this.$store.state.user.id
        )
      ) {
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
      this.$emit("publishComment", this.post.id);
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    likePost() {
      this.$emit("likePost", this.post.id); //envoi de la fonction likePost au parent
    },
  },
};
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
.infoPost {
  font-size: 0.75rem;
  font-weight: 700;
}
</style>

