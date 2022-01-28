<template>
  <panel title="User">
    <v-container class="my-5">
      <v-layout>
        <v-flex xs6>
          <div class="user-firstname">{{ user.firstName }}</div>
          <div class="user-familyname">{{ user.familyName }}</div>
          <v-btn
            dark
            v-if="user.id === $store.state.user.id"
            class="cyan"
            :to="{
              name: 'Profil-edit',
              params() {
                return { id: user.id };
              },
            }"
            >Editer</v-btn
          >
          <v-btn
            dark
            v-if="
              user.id === $store.state.user.id ||
              $store.state.user.role === true
            "
            v-on:click="delUser(user.id)"
            class="red"
            >Supprimer</v-btn
          >
          <v-alert type="error" v-if="err">{{ err }}</v-alert>
        </v-flex>
        <v-flex xs6>
          <img
            class="album-image"
            :src="`${$store.state.localUrl}/${user.photoUrl}`"
          />
          <br />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-row>
            <h1>Les posts de {{ user.firstName }}</h1>
            <v-col cols="10" v-for="post of posts" class="post" :key="post.id">
              <v-card outlined class="mx-auto" height="100%">
                <v-img
                  class="white--text align-end album-image"
                  height="200px"
                  :src="`${$store.state.localUrl}/${post.attachmentUrl}`"
                ></v-img>
                <v-card-title>{{ post.title }}</v-card-title>

                <v-card-subtitle class="pb-0">{{
                  post.User.id
                }}</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>
                    {{ new Date(post.createdAt).toString().substring(0, 24) }}
                  </div>

                  <div>{{ post.content }}</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="#FD2D01"
                    dark
                    :to="{ name: 'Post', params: { postId: post.id } }"
                    >View Post</v-btn
                  >
                  <v-btn
                    color="#FD2D01"
                    dark
                    :to="{ name: 'Profil', params: { id: post.User.id } }"
                    >View Profil</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </panel>
</template>

<script>
import UserService from "../services/UserService.js";
import PostService from "../services/PostService.js";
import Panel from '../components/Panel'

export default {
  name: 'ViewProfil',
  components: {
    Panel
  },
  data() {
    return {
      user: {},
      posts:{},
      err:"",
      message:"",
    }
  },
  methods:{
    async getAllOfOne(id){
      this.posts = (await PostService.getUserPosts(id)).data;
    },
    async delUser(id){
      try {
      await UserService.deleteUser(id);
      this.$router.push({ name: 'Home' });
    }catch (error) {
        if (JSON.parse(JSON.stringify(error)).status === 400) {
          this.err = "Ne pas supprimer le dernier Admin !";
        }else if(JSON.parse(JSON.stringify(error)).status === 500) {
          this.err = "Erreur serveur !";
        }
    }
    },
  },
  async mounted() {
    const id = this.$store.state.route.params.id;
    //console.log("zz", UserService.getOneUser(id));
    console.log("zz", id);
    this.user = (await UserService.getOneUser(id)).data.data;
    console.log("user", this.user);
    this.getAllOfOne(id);
    console.log("posts", this.posts);
  }
}
</script>

<style scoped>
.post {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.post-title {
  font-size: 30px;
}
.post-content {
  font-size: 24px;
}
.post-userId {
  font-size: 18px;
}

.post-createdAt {
  font-size: 16px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>