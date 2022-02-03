<template>
  <panel title="Utilisateur">

    <v-card class="d-flex flex-column align-center" elevation="4">
      <v-avatar size="100" class="mx-2 my-2" color="grey lighten-2">
        <v-img v-if="user.photoUrl" alt="user" :src="`${$store.state.localUrl}/${user.photoUrl}`"></v-img>
      </v-avatar>
      <span class="post-title font-span font-weight-black"> {{ user.firstName }} {{ user.familyName }}</span>
      <v-btn v-if="user.id === $store.state.user.id" dark class="green mt-2" :to="{name: 'Profil-edit', params() {return { id: user.id }; },}">Editer</v-btn>
      <v-btn v-if=" user.id === $store.state.user.id || $store.state.user.role === true" v-on:click="delUser(user.id)" dark class="red my-3">Supprimer</v-btn>
      <v-alert type="error" v-if="err">{{ err }}</v-alert>
    </v-card>

    <v-container class="mt-10 grey lighten-5">
      <v-toolbar flat dense color="#FD2D01" dark>
        <v-toolbar-title><span class="font-panel">Les posts de {{ user.firstName }}</span></v-toolbar-title>
      </v-toolbar>
      <div v-for="post of posts" :key="post.id">
        <v-card outlined class="d-flex flex-column">
          <v-responsive class="pa-2">
            <v-img v-if="post.attachmentUrl" :src="`${$store.state.localUrl}/${post.attachmentUrl}`"></v-img>
          </v-responsive>
          <v-card-text class="text--primary">
          <div class="subheading">{{ post.title }}</div>
            <span>{{ dateFormat(post.createdAt) }}</span>
          <div class="pt-2 post-content">{{ post.content }}</div>
          </v-card-text>
        </v-card>
      </div>
        <!-- <div class="pa-4">
          <post v-for="post in posts" :post="post" :key="post.id"></post>
        </div> -->
    </v-container>

  </panel>
</template>

<script>
import UserService from "../services/UserService.js";
import PostService from "../services/PostService.js";
import Panel from '../components/Panel';
// import Post from "../components/Post.vue";


export default {
  name: 'ViewProfil',
  components: {
    Panel,
    // Post,
  },
  data() {
    return {
      user: {},
      posts:{},
      err:"",
      message:"",
      post: {
        title: "",
        content: "",
        attachmentUrl: "",
        userId: "",
      },
    }
  },
  methods:{
    async getAllOfOne(id){
      this.posts = (await PostService.getUserPosts(id)).data;
    },
    async getUser(id){
      this.user = (await UserService.getOneUser(id)).data.data;
    },
    async delUser(id){
      try {
      await UserService.deleteUser(id);
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.state.isUserLoggedIn = false;
      sessionStorage.clear();
      this.$router.push({ name: 'Home' });
    }catch (error) {
          this.err = error.response.data.message;
        }
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
    },
  mounted() {
    const id = this.$store.state.route.params.id;
    this.getAllOfOne(id);
    this.getUser(id);
    }
}
</script>

<style scoped>

</style>