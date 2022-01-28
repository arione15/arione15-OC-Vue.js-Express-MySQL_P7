<template>
  <panel title="Post">
    <v-layout>
      <v-flex xs6>
        <div class="post-title">
          {{post.title}}
        </div>
        <div class="post-content">
          {{post.content}}
        </div>

        <v-btn dark class="cyan" :to="{name: 'Post-edit', params() {return {postId: post.id}}}">Edit</v-btn>
      </v-flex>

      <v-flex xs6>
        <!-- <img class="album-image" :src="`${$store.state.localUrl}/${post.attachmentUrl}`" /> -->
            <v-responsive>
              <v-img :src="`${$store.state.localUrl}/${attachmentUrl}`"></v-img>
            </v-responsive>
        <br>
      </v-flex>
    </v-layout>
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
      console.log("viewpost1", this.post);
      
      this.attachmentUrl=this.post.attachmentUrl;
  },
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