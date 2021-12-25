<template>
  <v-layout column>
    <v-flex xs4>
      <panel title="The Wall">
        <!-- <router-link :to="{name: 'post-create'}"> -->
        <v-btn
          slot="action"
          @click="navigateTo({ name: 'Post-create' })"
          class="red accent-1"
          light
          small
          absolute
          right
          middle
          fab
        >
          <!-- <i class="material-icons">add</i> -->
          <v-icon>add</v-icon>
        </v-btn>
        <!-- </router-link> -->
        <div v-if="posts">
        <div v-for="post in posts" class="post" :key="post.id">
          <v-layout>
            <v-flex xs6>
              <div class="post-title">{{ post.title }}</div>
              <div class="post-author">{{ post.userId }}</div>
              <div class="post-createdAt">{{ new Date(post.createdAt).toString().substring(0,15) }}</div>
              <div class="post-content">{{ post.content }}</div>

              <v-btn dark color="red" @click="navigateTo({ name: 'Post', params: { postId: post.id } })">View</v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="post.attachmentUrl" />
            </v-flex>
          </v-layout>
        </div>
        </div>
        <!-- <div v-for="message in posts" :key="message.id" :message="message.content" :title="message.title" ></div> -->
      </panel>
    </v-flex>
    <!-- <v-text-field class="red--text text--darken-1" v-html="post.error"></v-text-field>
    <v-text-field class="green--text text--darken-1" v-html="post.message"></v-text-field>-->
  </v-layout>
</template>

<script>
import Panel from '../components/Panel'
import PostService from "../services/PostService.js";

export default {
  components: {
    Panel
  },
  data() {
    return {
      posts:null
     //response: null
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  async mounted() {
    // try {
    this.posts = (await PostService.getAllPosts()).data.data.sort((a,b)=>new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
    this.message = (await PostService.getAllPosts()).data.message
    //console.log(this.posts)
    //console.log(this.message)
    //  this.posts = response;

    //   this.message = response.message;
    // } catch (err) {
    //   this.error = err.response.error;
  }
}
//   created (){
//     this.allPost();
//   },
//   methods :{
//   allPost: function() {
//       Axios
//       .get ('http://localhost:3000/api/post')
//       .then ((response) => {this.response = response.data;
//       console.log(response.data);
//       })
//       .catch ( error=> console.log(error))
//     }
// }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

