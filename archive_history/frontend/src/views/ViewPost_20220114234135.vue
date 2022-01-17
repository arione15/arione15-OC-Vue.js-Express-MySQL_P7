<template>
  <panel title="Post">
    <v-layout>
      <v-flex xs6>
        <div class="post-title">
          {{post.title}}
        </div>
        <div class="post-author">
          {{post.userId}}
        </div>
        <div class="post-content">
          {{post.content}}
        </div>
        <div>
          {{post.attachmentUrl}}
        </div>
        <div class="post-content">
          {{post.youtubeId}}
        </div>

        <v-btn dark class="cyan" :to="{name: 'Post-edit', params() {return {postId: post.id}}}">Edit</v-btn>

        <!-- <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setAsBookmark">
          Set As Bookmark
        </v-btn> -->

        <!-- <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="cyan"
          @click="unsetAsBookmark">
          Unset As Bookmark
        </v-btn> -->
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="post.attachmentUrl" />
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
              title: "",
              content: "",
            }
        }
    },
    async mounted () {
    const postId = this.$store.state.route.params.postId
    this.post = (await PostService.getOnePost(postId)).data
    // if (this.isUserLoggedIn) {
    //   PostHistoryService.post({
    //     postId: postId
    //   })
    // }
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