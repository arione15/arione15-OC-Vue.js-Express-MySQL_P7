<template>
  <div class="post">

    <!-- L'utilisateur qui a posté -->
    <v-container>
      <v-card class="d-flex justify-space-between" shaped elevation="4">
          <div sm12 md10 lg8>
            <v-avatar size="50" class="mx-2 my-2" color="grey lighten-2">
              <v-img alt="user" :src="`${$store.state.localUrl}/${post.User.photoUrl}`"></v-img>
            </v-avatar>
            <div class="d-flex flex-column justify-start pl-2"> 
              <span class="font-span font-weight-black">{{ post.User.firstName }} {{ post.User.familyName }}</span>
              <span class="font-span font-weight-medium">Posté le : {{ dateFormat(post.createdAt) }}</span>
            </div>
        </div>
        <div>
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <span class="material-icons">more_vert</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="{ name: 'Post', params: { postId: post.id } }">
                <v-list-item-title class="font-span font-weight-medium">Voir le post</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'Profil', params: { id: post.User.id } }">
                <v-list-item-title class="font-span font-weight-medium">Voir le profil</v-list-item-title>
              </v-list-item>
              <slot name="delPost"></slot>
            </v-list>
          </v-menu>
        </div>
      </v-card>
    </v-container>

    <!-- Le post -->
    <v-container>
      <v-card outlined class="d-flex flex-column" elevation="2">
        <div>
            <v-responsive class="pa-2">
              <v-img v-if="post.attachmentUrl" :src="`${$store.state.localUrl}/${post.attachmentUrl}`"></v-img>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ post.title }}</div>
              <div class="post-content">{{ post.content }}</div>
            </v-card-text>
        </div>
        <div class="my-8">
          <v-icon v-if="ifLiked" color="green" @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
          <v-icon v-else @click="likePost(post.id)" class="material-icons">thumb_up</v-icon>
          <slot name="likes" />
        </div>
      </v-card>
    </v-container>

    <!-- Les commentaires -->
    <v-container>
      <v-card outlined class="d-flex flex-column" elevation="2">
            <v-card-text>
              <div class="subheading">
                <slot name="publishComment"></slot>
              </div>
              <div class="subheading">
                <slot name="comments"></slot>
              </div>
            </v-card-text>
          </v-card>
    </v-container>

    <v-divider class="mx-4 my-5"></v-divider>

  </div>
</template>

<script>
import PostService from "../services/PostService.js";

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
<style>
.font-span {
  font-size: 1.2vw
}
.subheading{
  font-weight: 800;
}
.post-content{
  text-align: justify;
}
</style>

