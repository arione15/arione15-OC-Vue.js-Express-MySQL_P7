<template>
  <panel title="Post">

      <v-card class="d-flex flex-column justify-space-between" elevation="4">
            <v-responsive>
              <v-img v-if="post.attachmentUrl" :src="`${$store.state.localUrl}/${post.attachmentUrl}`"></v-img>
            </v-responsive>
            <div class="d-flex flex-column justify-start pl-2"> 
              <span class="pa-5 post-title font-span font-weight-black"> {{post.title}}</span>
              <span class="pa-5 post-content font-span font-weight-medium">{{post.content}}</span>
            </div>
      <v-btn v-if="post.User && post.User.id === $store.state.user.id" dark class="green my-5 mx-2" :to="{name: 'Post-edit', params() {return {postId: post.id}}}">Edit</v-btn>
      </v-card>
      
  </panel>
</template>

<script>
import PostService from "../services/PostService.js";
import Panel from '../components/Panel'

export default {
    components: {
    Panel
  },
    data(){
        return{
            post: {
            },
            attachmentUrl:"",
        }
    },
    async mounted () {
      const postId = this.$store.state.route.params.postId;
      this.post = (await PostService.getOnePost(postId)).data;
  },
}
</script>

<style scoped>

</style>