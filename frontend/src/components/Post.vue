<template>
  <div class="post">
    <!-- Le user qui a posté -->
    <v-container>
      <v-layout row wrap>
        <v-flex sm10 md8 lg6>
          <v-card flat class="text-xs-center ma-3">
            
            <v-responsive>
              <v-avatar size="100" class="grey lighten-2">
              <v-img alt="user" :src="`${$store.state.localUrl}/${post.User.photoUrl}`"></v-img>
              </v-avatar>
                <v-menu left bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <span class="material-icons">more_vert</span>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-if="post.User.id === $store.state.user.id" :to="{ name: 'Post', params: { postId: post.id } }">
                      <v-list-item-title>Voir le post</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'Profil', params: { id: post.User.id } }"><v-list-item-title>Voir le profil</v-list-item-title>
                    </v-list-item>
                    <slot name="delPost"></slot>
                  </v-list>
                </v-menu>
            </v-responsive>

            <v-card-text>
              <div class="font-weight-black">{{ post.User.firstName }} {{ post.User.familyName }}</div>
              <div class="grey--text">Posté le : {{ dateFormat(post.createdAt) }}</div>
            </v-card-text>

            <v-flex>
                <v-icon v-if="ifLiked" color="green" @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
                <v-icon v-else @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
                <slot name="likes" />
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Le post -->
    <v-container>
      <v-layout row wrap>
        <v-flex sm10 md8 lg6>
          <v-card flat class="text-xs-center ma-3">
            <v-responsive>
              <v-img v-if="post.attachmentUrl" :src="`${$store.state.localUrl}/${post.attachmentUrl}`"></v-img>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ post.title }}</div>
              <div>{{ post.content }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Les commentaires -->
    <v-container>
      <v-layout row wrap>
        <v-flex sm10 md8 lg6>
          <v-card flat class="text-xs-center ma-3">
            <v-card-text>
              
              <div class="subheading">
                <slot name="publishComment"></slot>
              </div>
              
              <div class="subheading">
                <slot name="comments"></slot>
              </div>

              
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider class="mx-4 my-5"></v-divider>
  </div>
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
      type: Object,
    },
  },
  data() {
    return {
      comments: {},
      message: "",
      error: null,
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
.image-attached {
  width: 70%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
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
  font-weight: 800;
}
</style>

